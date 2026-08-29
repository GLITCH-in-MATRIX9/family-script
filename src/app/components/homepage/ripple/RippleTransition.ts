

"use client";

import type {
  RippleCanvasHandle,
  RippleCanvasTransitionOptions,
} from "./RippleCanvas";

import {
  captureSectionPair,
  type RippleTexturePair,
} from "./RippleTextures";

/* ============================================================
   TYPES
============================================================ */

export interface RippleTransitionOptions
  extends RippleCanvasTransitionOptions {
  beforeElement: HTMLElement;
  afterElement: HTMLElement;
}

/* ============================================================
   CONSTANTS
============================================================ */

export const RIPPLE_DURATION = 1250;

/*
 * Maximum time we allow a single image to block
 * navigation.
 *
 * This is deliberately short because a failed image
 * should NEVER prevent the user from reaching the
 * next homepage section.
 */
const IMAGE_LOAD_TIMEOUT = 1500;

/*
 * Maximum time we allow video preparation to block
 * navigation.
 */
const VIDEO_LOAD_TIMEOUT = 1200;

/* ============================================================
   RIPPLE ORIGIN
============================================================ */

export function getRippleOrigin(
  direction: 1 | -1,
) {
  return {
    x: 0.5,
    y:
      direction === 1
        ? 1
        : 0,
  };
}

/* ============================================================
   WAIT FOR IMAGE
============================================================ */

function waitForImage(
  image: HTMLImageElement,
) {
  return new Promise<void>(
    (resolve) => {
      /*
       * Already loaded.
       */
      if (
        image.complete &&
        image.naturalWidth > 0
      ) {
        /*
         * Decode when available, but never let
         * decoding failure block navigation.
         */
        if (
          "decode" in image
        ) {
          image
            .decode()
            .catch(() => {})
            .finally(() => {
              resolve();
            });

          return;
        }

        resolve();
        return;
      }

      let finished =
        false;

      const finish =
        () => {
          if (finished) {
            return;
          }

          finished = true;

          window.clearTimeout(
            timeout,
          );

          image.removeEventListener(
            "load",
            finish,
          );

          image.removeEventListener(
            "error",
            finish,
          );

          resolve();
        };

      /*
       * IMPORTANT:
       *
       * A broken/unavailable image must not
       * permanently block navigation.
       */
      const timeout =
        window.setTimeout(
          finish,
          IMAGE_LOAD_TIMEOUT,
        );

      image.addEventListener(
        "load",
        finish,
        {
          once: true,
        },
      );

      image.addEventListener(
        "error",
        finish,
        {
          once: true,
        },
      );
    },
  );
}

/* ============================================================
   WAIT FOR VIDEO
============================================================ */

function waitForVideo(
  video: HTMLVideoElement,
) {
  return new Promise<void>(
    (resolve) => {
      /*
       * Already ready.
       */
      if (
        video.readyState >= 2
      ) {
        resolve();
        return;
      }

      let finished =
        false;

      const finish =
        () => {
          if (finished) {
            return;
          }

          finished = true;

          window.clearTimeout(
            timeout,
          );

          video.removeEventListener(
            "loadeddata",
            finish,
          );

          video.removeEventListener(
            "canplay",
            finish,
          );

          video.removeEventListener(
            "error",
            finish,
          );

          resolve();
        };

      const timeout =
        window.setTimeout(
          finish,
          VIDEO_LOAD_TIMEOUT,
        );

      video.addEventListener(
        "loadeddata",
        finish,
        {
          once: true,
        },
      );

      video.addEventListener(
        "canplay",
        finish,
        {
          once: true,
        },
      );

      video.addEventListener(
        "error",
        finish,
        {
          once: true,
        },
      );
    },
  );
}

/* ============================================================
   PREPARE SECTION
============================================================ */

export async function prepareRippleSection(
  section: HTMLElement,
) {
  /*
   * Don't allow a missing/broken asset to stop
   * homepage navigation.
   */

  try {
    /* ========================================================
       IMAGES
    ======================================================== */

    const images =
      Array.from(
        section.querySelectorAll<HTMLImageElement>(
          "img",
        ),
      );

    await Promise.all(
      images.map(
        (image) =>
          waitForImage(
            image,
          ),
      ),
    );

    /* ========================================================
       VIDEOS
    ======================================================== */

    const videos =
      Array.from(
        section.querySelectorAll<HTMLVideoElement>(
          "video",
        ),
      );

    await Promise.all(
      videos.map(
        (video) =>
          waitForVideo(
            video,
          ),
      ),
    );

    /*
     * Give the browser two frames to finish
     * layout/paint before capturing the section.
     */
    await new Promise<void>(
      (resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            resolve();
          });
        });
      },
    );
  } catch (error) {
    /*
     * NEVER let asset preparation trap navigation.
     */
    console.warn(
      "Ripple asset preparation warning:",
      error,
    );
  }
}

/* ============================================================
   PREPARE ELEMENTS
============================================================ */

function prepareSectionElements(
  section: HTMLElement,
) {
  const elements =
    section.querySelectorAll<HTMLElement>(
      "[data-ripple-element]",
    );

  elements.forEach(
    (element) => {
      element.style.opacity =
        "0";

      element.style.transform =
        "translate3d(0, 32px, 0) scale(0.985)";

      element.style.willChange =
        "opacity, transform";

      element.style.transition =
        "none";
    },
  );
}

/* ============================================================
   REVEAL ELEMENTS
============================================================ */

export function revealSectionContent(
  section: HTMLElement,
) {
  const elements =
    section.querySelectorAll<HTMLElement>(
      "[data-ripple-element]",
    );

  elements.forEach(
    (
      element,
      index,
    ) => {
      const delay =
        Math.min(
          index * 80,
          320,
        );

      element.style.transition =
        [
          `opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
          `transform 900ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        ].join(",");

      requestAnimationFrame(
        () => {
          element.style.opacity =
            "1";

          element.style.transform =
            "translate3d(0, 0, 0) scale(1)";
        },
      );
    },
  );
}

/* ============================================================
   RUN TRANSITION
============================================================ */

export async function runRippleTransition(
  canvas: RippleCanvasHandle,
  options: RippleTransitionOptions,
) {
  const {
    beforeElement,
    afterElement,
    originX = 0.5,
    originY = 1,
    strength = 1.05,
    duration =
      RIPPLE_DURATION,
  } = options;

  /* ==========================================================
     PREPARE TARGET
  ========================================================== */

  await prepareRippleSection(
    afterElement,
  );

  /*
   * Hide only explicitly marked content.
   *
   * The section itself stays visible.
   */
  prepareSectionElements(
    afterElement,
  );

  let pair:
    | RippleTexturePair
    | null = null;

  /* ==========================================================
     CAPTURE SECTION TEXTURES
  ========================================================== */

  try {
    pair =
      await captureSectionPair(
        beforeElement,
        afterElement,
      );
  } catch (error) {
    console.error(
      "Unable to capture ripple textures:",
      error,
    );

    /*
     * IMPORTANT:
     *
     * Do NOT throw here.
     *
     * The navigation layer needs to be able
     * to continue to the actual DOM section.
     *
     * Reveal the target content and resolve.
     */
    revealSectionContent(
      afterElement,
    );

    return;
  }

  /*
   * Extra safety.
   */
  if (!pair) {
    revealSectionContent(
      afterElement,
    );

    return;
  }

  /* ==========================================================
     PLAY WEBGL TRANSITION
  ========================================================== */

  try {
    await canvas.renderTransition(
      pair,
      {
        originX,
        originY,
        strength,
        duration,
      },
    );
  } catch (error) {
    /*
     * WebGL failure should NEVER trap
     * the user on the previous section.
     */
    console.error(
      "Ripple render error:",
      error,
    );
  }

  /* ==========================================================
     REVEAL REAL DOM CONTENT
  ========================================================== */

  revealSectionContent(
    afterElement,
  );
}

/* ============================================================
   CANCEL
============================================================ */

export function cancelRippleTransition(
  canvas: RippleCanvasHandle,
) {
  canvas.cancelTransition();
}

