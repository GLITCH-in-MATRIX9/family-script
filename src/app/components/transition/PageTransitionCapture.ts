// components/transition/PageTransitionCapture.ts

"use client";

import { domToCanvas } from "modern-screenshot";

/* ============================================================
   TYPES
============================================================ */

export interface TransitionFrame {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
}

export interface TransitionFramePair {
  before: TransitionFrame;
  after: TransitionFrame;
}

/* ============================================================
   VIEWPORT SNAPSHOT

   Captures the document (via modern-screenshot, which serializes
   real DOM into an SVG foreignObject and lets the browser's own
   engine rasterize it — unlike html2canvas, this correctly handles
   Tailwind v4's oklch()/color-mix() output), then crops to exactly
   the visible viewport at the given scroll offset. This matches what
   the user actually saw on screen.

   Only elements near the viewport are actually rendered — excluding
   an element excludes its whole subtree (fonts, images, nested
   nodes), which is what keeps this fast on very tall pages (the
   homepage is ~8000px).

   The capture is ALSO bounded to an explicit width/height (viewport
   size, plus a small margin, from the top of the document down to
   the bottom of the current scroll position) instead of the full
   document height. modern-screenshot's `width`/`height` options only
   size the SVG viewBox/foreignObject box the clone is rendered into
   — the clone's own CSS layout is untouched, so this can't squish
   flex/grid content — anything below that box is simply never
   rasterized. Without this, every homepage capture still allocated
   and rasterized a canvas the full ~8000px document height even
   though only the visible viewport is ever read out of it, which
   under repeated navigations was measurably costing multi-second
   stalls (and, once one capture fell behind, a cascade of slower
   ones after it).
============================================================ */

const CAPTURE_MARGIN_PX = 200;

// modern-screenshot's first step ("wait until load") scans the ENTIRE
// document for every <img>/<video>, not just the elements our `filter`
// below will end up rendering — so a native lazy-loaded image far off
// screen (which the browser deliberately never fetches until it's
// scrolled near) sits there incomplete and un-erroring forever. Its own
// internal per-image timer is what `timeout` controls, so passing the
// full outer capture budget here means a single stuck image silently
// eats the *entire* budget doing nothing useful, leaving no time for
// the actual clone/serialize/rasterize work that follows. Bounding it
// to a short window instead (same principle the old deleted homepage
// ripple system used for its own IMAGE_LOAD_TIMEOUT) means a stuck
// image just renders as a blank gap instead of stalling the whole
// capture.
const IMAGE_LOAD_TIMEOUT_MS = 800;

function isNearViewport(el: Element): boolean {
  const rect = el.getBoundingClientRect();
  // A zero-size rect (display:none, or an element with no box at all)
  // isn't "off-screen content" in the sense this filter cares about —
  // exclude it so it doesn't fail the range check below.
  if (rect.width === 0 && rect.height === 0) return true;
  return (
    rect.bottom >= -CAPTURE_MARGIN_PX &&
    rect.top <= window.innerHeight + CAPTURE_MARGIN_PX
  );
}

async function captureFullDocument(
  timeoutMs: number,
  scrollY: number,
): Promise<HTMLCanvasElement | null> {
  try {
    const captureWidth = window.innerWidth;
    const captureHeight = Math.min(
      document.documentElement.scrollHeight,
      scrollY + window.innerHeight + CAPTURE_MARGIN_PX,
    );

    const capture = domToCanvas(document.documentElement, {
      backgroundColor: null,
      timeout: IMAGE_LOAD_TIMEOUT_MS,
      width: captureWidth,
      height: captureHeight,
      filter: (node) => {
        if (!(node instanceof Element)) return true;
        // Exclude our own overlay layers — capturing them would
        // recursively bake a stale frozen frame into the new
        // screenshot.
        if (node.hasAttribute("data-page-transition-overlay")) {
          return false;
        }
        return isNearViewport(node);
      },
    });

    const timeout = new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), timeoutMs);
    });

    const result = await Promise.race([capture, timeout]);
    return result ?? null;
  } catch (error) {
    console.error("[page-transition] capture failed:", error);
    return null;
  }
}

function cropToViewport(
  full: HTMLCanvasElement,
  scrollY: number,
): TransitionFrame | null {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // The capture above was requested at an explicit width/height (see
  // captureFullDocument), so `full`'s pixel dimensions already line
  // up 1:1 with the CSS-pixel region we asked for — no scaling or
  // DPR conversion needed here.
  const sourceX = 0;
  const sourceY = Math.max(0, Math.round(scrollY));
  const sourceWidth = Math.min(full.width, viewportWidth);
  const sourceHeight = Math.min(full.height - sourceY, viewportHeight);

  if (sourceWidth <= 0 || sourceHeight <= 0) return null;

  const cropped = document.createElement("canvas");
  cropped.width = viewportWidth;
  cropped.height = viewportHeight;

  const ctx = cropped.getContext("2d");
  if (!ctx) return null;

  // drawImage can throw synchronously (e.g. SecurityError if the
  // captured canvas got "tainted" by a cross-origin image without
  // CORS headers) — this must never propagate, or the caller's async
  // chain dies silently right after preventDefault() already fired,
  // leaving the click looking like it did nothing at all.
  try {
    ctx.drawImage(
      full,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      viewportWidth,
      viewportHeight,
    );
  } catch (error) {
    console.error("[page-transition] crop failed:", error);
    return null;
  }

  return { canvas: cropped, width: viewportWidth, height: viewportHeight };
}

/**
 * Captures the current page as it visually appears in the viewport
 * right now. Resolves to `null` (never throws) on timeout or any
 * capture error — callers must treat `null` as "skip the effect,
 * never block navigation on this."
 */
export async function captureViewportSnapshot(
  timeoutMs: number,
  scrollY: number = window.scrollY,
): Promise<TransitionFrame | null> {
  try {
    const full = await captureFullDocument(timeoutMs, scrollY);
    if (!full) return null;
    return cropToViewport(full, scrollY);
  } catch (error) {
    console.error("[page-transition] captureViewportSnapshot failed:", error);
    return null;
  }
}

/* ============================================================
   GL TEXTURE HELPERS

   Ported verbatim from the deleted RippleTextures.ts — these are
   fully generic canvas-to-GPU-texture utilities with no coupling
   to how the source canvas was produced.
============================================================ */

export function createRippleTexture(gl: WebGL2RenderingContext): WebGLTexture {
  const texture = gl.createTexture();
  if (!texture) {
    throw new Error("Unable to create WebGL texture.");
  }

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  // Transparent initial pixel — prevents an uninitialized texture from
  // becoming a black frame.
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([255, 255, 255, 0]),
  );

  gl.bindTexture(gl.TEXTURE_2D, null);
  return texture;
}

export function uploadCanvasToTexture(
  gl: WebGL2RenderingContext,
  canvas: HTMLCanvasElement,
  texture: WebGLTexture,
) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
  gl.bindTexture(gl.TEXTURE_2D, null);
}

export function uploadFramePair(
  gl: WebGL2RenderingContext,
  pair: TransitionFramePair,
  beforeTexture: WebGLTexture,
  afterTexture: WebGLTexture,
) {
  uploadCanvasToTexture(gl, pair.before.canvas, beforeTexture);
  uploadCanvasToTexture(gl, pair.after.canvas, afterTexture);
}

export function disposeTexture(
  gl: WebGL2RenderingContext,
  texture: WebGLTexture | null,
) {
  if (texture) {
    gl.deleteTexture(texture);
  }
}
