"use client";

import { createContext, useContext, useEffect, useMemo, useRef } from "react";

export type RippleSource =
  | { type: "video"; src: string }
  | { type: "videoRef"; ref: React.RefObject<HTMLVideoElement | null> }
  | { type: "image"; src: string }
  | { type: "color"; value: string };

export interface RippleTransitionConfig {
  before: RippleSource;
  after: RippleSource;
  originX?: number;
  originY?: number;
  strength?: number;
  speed?: number;
  duration?: number;
}

interface RippleEngineHandle {
  playTransition: (config: RippleTransitionConfig) => Promise<void>;
}

const RippleEngineContext = createContext<RippleEngineHandle | null>(null);

export function useRippleEngine() {
  const ctx = useContext(RippleEngineContext);
  if (!ctx) {
    throw new Error("RippleTransition must be rendered inside <RippleProvider>.");
  }
  return ctx;
}

const VERTEX_SRC = `#version 300 es
const vec2 verts[3] = vec2[3](
  vec2(-1.0,-1.0),
  vec2(3.0,-1.0),
  vec2(-1.0,3.0)
);
out vec2 vUv;
void main() {
  vec2 pos = verts[gl_VertexID];
  vUv = (pos + 1.0) * 0.5;
  gl_Position = vec4(pos, 0.0, 1.0);
}`;

const FRAGMENT_SRC = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform sampler2D u_texA;
uniform sampler2D u_texB;
uniform vec2 u_texASize;
uniform vec2 u_texBSize;
uniform vec2 u_resolution;
uniform vec2 u_origin;
uniform float u_progress;
uniform float u_time;
uniform float u_strength;
uniform float u_speed;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

vec2 coverUv(vec2 uv, vec2 texSize, vec2 resSize) {
  float texAspect = texSize.x / max(texSize.y, 1.0);
  float resAspect = resSize.x / max(resSize.y, 1.0);

  vec2 scale = texAspect > resAspect
    ? vec2(resAspect / texAspect, 1.0)
    : vec2(1.0, texAspect / resAspect);

  return (uv - 0.5) * scale + 0.5;
}

void main() {
  vec2 uv = vUv;

  vec2 dir = uv - u_origin;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  float dist = length(dir * vec2(aspect, 1.0));

  // A travelling water ring expands from the navigation origin.
  float front = u_progress * 1.55;
  float ring = exp(-pow((dist - front) * 10.0, 2.0));
  float organic = noise(uv * 7.0 + u_time * 0.15) - 0.5;

  float intensity = smoothstep(0.0, 0.28, u_progress)
                  * (1.0 - smoothstep(0.86, 1.0, u_progress));

  float displacement =
    (sin(dist * 22.0 - u_time * u_speed * 5.0) * 0.65 + organic * 0.35)
    * ring
    * intensity
    * u_strength
    * 0.055;

  vec2 displaced = uv + normalize(dir + vec2(0.00001)) * displacement;

  // The next scene is revealed progressively from the ripple outward.
  float revealRadius = front * 1.02;
  float reveal = smoothstep(revealRadius - 0.18, revealRadius + 0.18, dist);
  reveal = 1.0 - reveal;

  // Soft final takeover so there is no flash at the end.
  float finalReveal = smoothstep(0.78, 1.0, u_progress);
  float mixFactor = max(reveal, finalReveal);

  vec2 uvA = coverUv(displaced, u_texASize, u_resolution);
  vec2 uvB = coverUv(displaced, u_texBSize, u_resolution);

  vec4 colA = texture(u_texA, clamp(uvA, 0.0, 1.0));
  vec4 colB = texture(u_texB, clamp(uvB, 0.0, 1.0));

  vec4 col = mix(colA, colB, clamp(mixFactor, 0.0, 1.0));

  fragColor = vec4(col.rgb, 1.0);
}`;

function compileShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Could not create WebGL shader.");

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Ripple shader compile error: ${info}`);
  }

  return shader;
}

function createProgram(gl: WebGL2RenderingContext) {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);

  const program = gl.createProgram();
  if (!program) throw new Error("Could not create WebGL program.");

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    throw new Error(`Ripple program link error: ${info}`);
  }

  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  return program;
}

const imageCache = new Map<string, HTMLImageElement>();
const videoCache = new Map<string, HTMLVideoElement>();

function getImage(src: string) {
  const cached = imageCache.get(src);
  if (cached) return cached;

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = src;
  imageCache.set(src, img);
  return img;
}

function getVideo(src: string) {
  const cached = videoCache.get(src);
  if (cached) return cached;

  const existing = document.querySelector<HTMLVideoElement>(
    `[data-ripple-video="${CSS.escape(src)}"]`,
  );

  if (existing) {
    videoCache.set(src, existing);
    return existing;
  }

  const video = document.createElement("video");
  video.src = src;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.crossOrigin = "anonymous";
  video.preload = "auto";
  video.setAttribute("aria-hidden", "true");
  video.style.position = "fixed";
  video.style.width = "1px";
  video.style.height = "1px";
  video.style.opacity = "0";
  video.style.pointerEvents = "none";
  video.style.left = "-10px";
  document.body.appendChild(video);
  void video.play().catch(() => {});
  videoCache.set(src, video);
  return video;
}

function parseColor(value: string): [number, number, number] {
  const rgba = value.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/
  );

  if (rgba) return [Number(rgba[1]), Number(rgba[2]), Number(rgba[3])];

  if (value.startsWith("#")) {
    const hex = value.slice(1);
    const full = hex.length === 3
      ? hex.split("").map((x) => x + x).join("")
      : hex;
    const num = Number.parseInt(full, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }

  return [0, 0, 0];
}

export function RippleProvider({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    gl: WebGL2RenderingContext;
    program: WebGLProgram;
    vao: WebGLVertexArrayObject;
    texA: WebGLTexture;
    texB: WebGLTexture;
    uniforms: Record<string, WebGLUniformLocation | null>;
  } | null>(null);

  const transitionRef = useRef<{
    config: RippleTransitionConfig;
    startedAt: number;
    resolve: () => void;
  } | null>(null);

  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
    });

    if (!gl) return;

    const program = createProgram(gl);
    const vao = gl.createVertexArray();
    if (!vao) return;

    const uniforms: Record<string, WebGLUniformLocation | null> = {};
    [
      "u_texA",
      "u_texB",
      "u_texASize",
      "u_texBSize",
      "u_resolution",
      "u_origin",
      "u_progress",
      "u_time",
      "u_strength",
      "u_speed",
    ].forEach((name) => {
      uniforms[name] = gl.getUniformLocation(program, name);
    });

    function makeTexture() {
      const texture = gl.createTexture();
      if (!texture) throw new Error("Could not create ripple texture.");

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 0, 255]),
      );

      return texture;
    }

    const texA = makeTexture();
    const texB = makeTexture();

    stateRef.current = {
      gl,
      program,
      vao,
      texA,
      texB,
      uniforms,
    };

    // Preload the visual states used by homepage transitions so the first
    // wheel gesture does not briefly reveal an empty WebGL texture.
    [
      "/assets/Homepage/WHO_WE_ARE.jpg",
      "/assets/Homepage/WHAT_WE_DO.jpg",
      "/assets/Homepage/WHAT_WE_OFFER.jpg",
      "/assets/homepage/GET YOUR STORY SCRIPTED.jpg",
    ].forEach((src) => {
      const img = getImage(src);
      void img.decode?.().catch(() => {});
    });
    void getVideo("/assets/homepage/HOME_PAGE_VIDEO.mp4");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const upload = (
      source: RippleSource,
      texture: WebGLTexture,
    ): [number, number] => {
      // This is the important orientation fix for both <video> and <img>.
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.bindTexture(gl.TEXTURE_2D, texture);

      if (source.type === "videoRef") {
        const video = source.ref.current;
        if (video && video.readyState >= 2) {
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            video,
          );
          return [video.videoWidth || 16, video.videoHeight || 9];
        }
      }

      if (source.type === "video") {
        const video = getVideo(source.src);
        if (video.readyState >= 2) {
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            video,
          );
          return [video.videoWidth || 16, video.videoHeight || 9];
        }
      }

      if (source.type === "image") {
        const img = getImage(source.src);
        if (img.complete && img.naturalWidth > 0) {
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            img,
          );
          return [img.naturalWidth, img.naturalHeight];
        }
      }

      if (source.type === "color") {
        const [r, g, b] = parseColor(source.value);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          1,
          1,
          0,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          new Uint8Array([r, g, b, 255]),
        );
        return [16, 9];
      }

      return [16, 9];
    };

    const render = (now: number) => {
      const transition = transitionRef.current;

      if (!transition) {
        canvas.style.opacity = "0";
        rafRef.current = null;
        return;
      }

      const elapsed = now - transition.startedAt;
      const duration = transition.config.duration ?? 1250;
      const raw = Math.min(elapsed / duration, 1);

      // Smooth, deliberate transition rather than scroll-scrubbing.
      const progress = raw < 0.5
        ? 4 * raw * raw * raw
        : 1 - Math.pow(-2 * raw + 2, 3) / 2;

      const state = stateRef.current;
      if (state) {
        const sizeA = upload(transition.config.before, state.texA);
        const sizeB = upload(transition.config.after, state.texB);

        gl.useProgram(state.program);
        gl.bindVertexArray(state.vao);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, state.texA);
        gl.uniform1i(state.uniforms.u_texA, 0);

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, state.texB);
        gl.uniform1i(state.uniforms.u_texB, 1);

        gl.uniform2f(state.uniforms.u_texASize, sizeA[0], sizeA[1]);
        gl.uniform2f(state.uniforms.u_texBSize, sizeB[0], sizeB[1]);
        gl.uniform2f(
          state.uniforms.u_resolution,
          canvas.width,
          canvas.height,
        );
        gl.uniform2f(
          state.uniforms.u_origin,
          transition.config.originX ?? 0.5,
          transition.config.originY ?? 1,
        );
        gl.uniform1f(state.uniforms.u_progress, progress);
        gl.uniform1f(state.uniforms.u_time, now / 1000);
        gl.uniform1f(
          state.uniforms.u_strength,
          transition.config.strength ?? 1,
        );
        gl.uniform1f(
          state.uniforms.u_speed,
          transition.config.speed ?? 1,
        );

        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.disable(gl.BLEND);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }

      canvas.style.opacity = "1";

      if (raw >= 1) {
        transitionRef.current = null;
        canvas.style.opacity = "0";
        const resolve = transition.resolve;
        resolve();
        rafRef.current = null;
        return;
      }

      rafRef.current = requestAnimationFrame(render);
    };

    const playTransition = (config: RippleTransitionConfig) => {
      if (transitionRef.current) {
        return Promise.resolve();
      }

      canvas.style.opacity = "1";

      return new Promise<void>((resolve) => {
        transitionRef.current = {
          config,
          startedAt: performance.now(),
          resolve,
        };

        rafRef.current = requestAnimationFrame(render);
      });
    };

    (stateRef.current as typeof stateRef.current & {
      playTransition?: typeof playTransition;
    }).playTransition = playTransition;

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);

      for (const video of videoCache.values()) {
        video.pause();
        video.remove();
      }

      gl.deleteTexture(texA);
      gl.deleteTexture(texB);
      gl.deleteProgram(program);
      gl.deleteVertexArray(vao);
      stateRef.current = null;
    };
  }, []);

  const handle = useMemo<RippleEngineHandle>(
    () => ({
      playTransition(config) {
        const state = stateRef.current as typeof stateRef.current & {
          playTransition?: (config: RippleTransitionConfig) => Promise<void>;
        };

        if (state?.playTransition) {
          return state.playTransition(config);
        }

        // WebGL unavailable: keep navigation functional.
        return Promise.resolve();
      },
    }),
    [],
  );

  return (
    <RippleEngineContext.Provider value={handle}>
      {children}

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9999] opacity-0"
      />
    </RippleEngineContext.Provider>
  );
}
