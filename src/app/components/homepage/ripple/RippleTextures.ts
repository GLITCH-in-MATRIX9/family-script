// components/homepage/ripple/RippleTextures.ts

"use client";

export interface RippleTextureSource {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
}

export interface RippleTexturePair {
  before: RippleTextureSource;
  after: RippleTextureSource;
}

/* ============================================================
   IMAGE CACHE
============================================================ */

const imageCache =
  new Map<string, HTMLImageElement>();

function loadImage(
  src: string,
): Promise<HTMLImageElement> {
  const cached =
    imageCache.get(src);

  if (
    cached &&
    cached.complete &&
    cached.naturalWidth > 0
  ) {
    return Promise.resolve(
      cached,
    );
  }

  return new Promise(
    (resolve, reject) => {
      const image =
        cached ??
        new Image();

      image.crossOrigin =
        "anonymous";

      image.onload = () => {
        imageCache.set(
          src,
          image,
        );

        resolve(image);
      };

      image.onerror = () => {
        imageCache.delete(
          src,
        );

        reject(
          new Error(
            `Failed to load ripple image: ${src}`,
          ),
        );
      };

      if (!cached) {
        imageCache.set(
          src,
          image,
        );

        image.src =
          src;
      }
    },
  );
}

/* ============================================================
   VIDEO READY
============================================================ */

function waitForVideo(
  video: HTMLVideoElement,
): Promise<void> {
  if (
    video.readyState >= 2 &&
    video.videoWidth > 0 &&
    video.videoHeight > 0
  ) {
    return Promise.resolve();
  }

  return new Promise(
    (resolve) => {
      const finish =
        () => {
          cleanup();
          resolve();
        };

      const cleanup =
        () => {
          video.removeEventListener(
            "loadeddata",
            finish,
          );

          video.removeEventListener(
            "canplay",
            finish,
          );
        };

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

      /*
       * Never allow a missing video event to block
       * the entire navigation system.
       */

      window.setTimeout(
        finish,
        1500,
      );
    },
  );
}

/* ============================================================
   BACKGROUND SOURCE
============================================================ */

export type RippleBackgroundSource =
  | {
      type: "image";
      src: string;
    }
  | {
      type: "video";
      element: HTMLVideoElement;
    }
  | {
      type: "color";
      value: string;
    };

/* ============================================================
   READ SECTION BACKGROUND
============================================================ */

export function getSectionRippleBackground(
  section: HTMLElement,
): RippleBackgroundSource {
  /*
   * Explicit data attribute takes priority.
   *
   * Example:
   *
   * data-ripple-background="/assets/homepage/WHO_WE_ARE.jpg"
   */

  const explicitImage =
    section.dataset
      .rippleBackground;

  if (explicitImage) {
    return {
      type: "image",
      src: explicitImage,
    };
  }

  /*
   * Hero video.
   */

  const video =
    section.querySelector<HTMLVideoElement>(
      "[data-ripple-video]",
    ) ??
    section.querySelector<HTMLVideoElement>(
      "video",
    );

  if (video) {
    return {
      type: "video",
      element: video,
    };
  }

  /*
   * Explicit colour.
   */

  const explicitColor =
    section.dataset
      .rippleColor;

  if (explicitColor) {
    return {
      type: "color",
      value: explicitColor,
    };
  }

  /*
   * CSS background-image.
   *
   * This allows existing section components to work without
   * requiring their implementation to be rewritten.
   */

  const computed =
    getComputedStyle(
      section,
    );

  const backgroundImage =
    computed.backgroundImage;

  if (
    backgroundImage &&
    backgroundImage !==
      "none"
  ) {
    const match =
      backgroundImage.match(
        /url\(\s*["']?(.*?)["']?\s*\)/,
      );

    if (match?.[1]) {
      return {
        type: "image",
        src: match[1],
      };
    }
  }

  /*
   * Finally inspect direct images.
   */

  const image =
    section.querySelector<HTMLImageElement>(
      "img[data-ripple-background]",
    );

  if (
    image?.currentSrc
  ) {
    return {
      type: "image",
      src: image.currentSrc,
    };
  }

  /*
   * Last fallback is the actual computed section colour.
   */

  return {
    type: "color",
    value:
      computed.backgroundColor ||
      "#ffffff",
  };
}

/* ============================================================
   CREATE CANVAS
============================================================ */

function createCanvas(
  width: number,
  height: number,
) {
  const canvas =
    document.createElement(
      "canvas",
    );

  canvas.width =
    width;

  canvas.height =
    height;

  return canvas;
}

/* ============================================================
   GET VIEWPORT SIZE
============================================================ */

function getViewportSize() {
  return {
    width: Math.max(
      1,
      Math.round(
        window.innerWidth *
          Math.min(
            window.devicePixelRatio ||
              1,
            2,
          ),
      ),
    ),

    height: Math.max(
      1,
      Math.round(
        window.innerHeight *
          Math.min(
            window.devicePixelRatio ||
              1,
            2,
          ),
      ),
    ),
  };
}

/* ============================================================
   DRAW COVER
============================================================ */

function drawCover(
  context: CanvasRenderingContext2D,
  source:
    | HTMLImageElement
    | HTMLVideoElement,
  width: number,
  height: number,
) {
  const sourceWidth =
    source instanceof
    HTMLVideoElement
      ? source.videoWidth
      : source.naturalWidth;

  const sourceHeight =
    source instanceof
    HTMLVideoElement
      ? source.videoHeight
      : source.naturalHeight;

  if (
    sourceWidth <= 0 ||
    sourceHeight <= 0
  ) {
    return false;
  }

  const sourceAspect =
    sourceWidth /
    sourceHeight;

  const targetAspect =
    width /
    height;

  let drawWidth =
    width;

  let drawHeight =
    height;

  let x = 0;

  let y = 0;

  /*
   * Same visual behaviour as:
   *
   * background-size: cover
   */

  if (
    sourceAspect >
    targetAspect
  ) {
    drawHeight =
      height;

    drawWidth =
      height *
      sourceAspect;

    x =
      (
        width -
        drawWidth
      ) /
      2;
  } else {
    drawWidth =
      width;

    drawHeight =
      width /
      sourceAspect;

    y =
      (
        height -
        drawHeight
      ) /
      2;
  }

  context.drawImage(
    source,
    x,
    y,
    drawWidth,
    drawHeight,
  );

  return true;
}

/* ============================================================
   DRAW GRAYSCALE
============================================================ */

function makeGrayscale(
  canvas: HTMLCanvasElement,
) {
  const context =
    canvas.getContext(
      "2d",
    );

  if (!context) {
    return;
  }

  const imageData =
    context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height,
    );

  const data =
    imageData.data;

  /*
   * Luminance conversion.
   *
   * This produces actual grayscale rather than simply
   * reducing opacity.
   */

  for (
    let i = 0;
    i < data.length;
    i += 4
  ) {
    const luminance =
      0.2126 * data[i] +
      0.7152 * data[i + 1] +
      0.0722 * data[i + 2];

    data[i] =
      luminance;

    data[i + 1] =
      luminance;

    data[i + 2] =
      luminance;
  }

  context.putImageData(
    imageData,
    0,
    0,
  );
}

/* ============================================================
   DRAW BACKGROUND
============================================================ */

async function drawBackground(
  section: HTMLElement,
  canvas: HTMLCanvasElement,
): Promise<void> {
  const context =
    canvas.getContext(
      "2d",
    );

  if (!context) {
    throw new Error(
      "Unable to create 2D canvas context.",
    );
  }

  const {
    width,
    height,
  } =
    getViewportSize();

  /*
   * Always clear first.
   */

  context.clearRect(
    0,
    0,
    width,
    height,
  );

  /*
   * Never use black as the fallback.
   *
   * We use the actual computed section background.
   */

  const background =
    getSectionRippleBackground(
      section,
    );

  if (
    background.type ===
    "color"
  ) {
    context.fillStyle =
      background.value;

    context.fillRect(
      0,
      0,
      width,
      height,
    );

    return;
  }

  if (
    background.type ===
    "video"
  ) {
    await waitForVideo(
      background.element,
    );

    const drawn =
      drawCover(
        context,
        background.element,
        width,
        height,
      );

    if (!drawn) {
      context.fillStyle =
        getComputedStyle(
          section,
        ).backgroundColor ||
        "#ffffff";

      context.fillRect(
        0,
        0,
        width,
        height,
      );
    }

    return;
  }

  if (
    background.type ===
    "image"
  ) {
    const image =
      await loadImage(
        background.src,
      );

    const drawn =
      drawCover(
        context,
        image,
        width,
        height,
      );

    if (!drawn) {
      context.fillStyle =
        getComputedStyle(
          section,
        ).backgroundColor ||
        "#ffffff";

      context.fillRect(
        0,
        0,
        width,
        height,
      );
    }
  }
}

/* ============================================================
   CAPTURE COLOUR SECTION
============================================================ */

export async function captureColourSection(
  section: HTMLElement,
): Promise<RippleTextureSource> {
  const {
    width,
    height,
  } =
    getViewportSize();

  const canvas =
    createCanvas(
      width,
      height,
    );

  await drawBackground(
    section,
    canvas,
  );

  return {
    canvas,
    width,
    height,
  };
}

/* ============================================================
   CAPTURE GRAYSCALE SECTION
============================================================ */

export async function captureGrayscaleSection(
  section: HTMLElement,
): Promise<RippleTextureSource> {
  const source =
    await captureColourSection(
      section,
    );

  /*
   * Convert ONLY the incoming section to B&W.
   *
   * There is no black overlay.
   */

  makeGrayscale(
    source.canvas,
  );

  return source;
}

/* ============================================================
   CAPTURE SECTION PAIR
============================================================ */

export async function captureSectionPair(
  beforeElement: HTMLElement,
  afterElement: HTMLElement,
): Promise<RippleTexturePair> {
  /*
   * Current section:
   *
   * ORIGINAL COLOUR
   */

  const beforePromise =
    captureColourSection(
      beforeElement,
    );

  /*
   * Next section:
   *
   * ORIGINAL BACKGROUND
   *        ↓
   * GRAYSCALE
   */

  const afterPromise =
    captureGrayscaleSection(
      afterElement,
    );

  const [
    before,
    after,
  ] =
    await Promise.all([
      beforePromise,
      afterPromise,
    ]);

  return {
    before,
    after,
  };
}

/* ============================================================
   CREATE WEBGL TEXTURE
============================================================ */

export function createRippleTexture(
  gl: WebGL2RenderingContext,
): WebGLTexture {
  const texture =
    gl.createTexture();

  if (!texture) {
    throw new Error(
      "Unable to create WebGL texture.",
    );
  }

  gl.bindTexture(
    gl.TEXTURE_2D,
    texture,
  );

  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_WRAP_S,
    gl.CLAMP_TO_EDGE,
  );

  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_WRAP_T,
    gl.CLAMP_TO_EDGE,
  );

  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MIN_FILTER,
    gl.LINEAR,
  );

  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MAG_FILTER,
    gl.LINEAR,
  );

  /*
   * Transparent initial pixel.
   *
   * This prevents an uninitialized texture from becoming
   * a black frame.
   */

  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([
      255,
      255,
      255,
      0,
    ]),
  );

  gl.bindTexture(
    gl.TEXTURE_2D,
    null,
  );

  return texture;
}

/* ============================================================
   UPLOAD CANVAS
============================================================ */

export function uploadCanvasToTexture(
  gl: WebGL2RenderingContext,
  canvas: HTMLCanvasElement,
  texture: WebGLTexture,
) {
  gl.bindTexture(
    gl.TEXTURE_2D,
    texture,
  );

  gl.pixelStorei(
    gl.UNPACK_FLIP_Y_WEBGL,
    true,
  );

  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_WRAP_S,
    gl.CLAMP_TO_EDGE,
  );

  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_WRAP_T,
    gl.CLAMP_TO_EDGE,
  );

  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MIN_FILTER,
    gl.LINEAR,
  );

  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MAG_FILTER,
    gl.LINEAR,
  );

  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    canvas,
  );

  gl.bindTexture(
    gl.TEXTURE_2D,
    null,
  );
}

/* ============================================================
   UPLOAD SECTION PAIR
============================================================ */

export function uploadSectionPair(
  gl: WebGL2RenderingContext,
  pair: RippleTexturePair,
  beforeTexture: WebGLTexture,
  afterTexture: WebGLTexture,
) {
  uploadCanvasToTexture(
    gl,
    pair.before.canvas,
    beforeTexture,
  );

  uploadCanvasToTexture(
    gl,
    pair.after.canvas,
    afterTexture,
  );
}

/* ============================================================
   DISPOSE TEXTURE
============================================================ */

export function disposeTexture(
  gl: WebGL2RenderingContext,
  texture:
    | WebGLTexture
    | null,
) {
  if (texture) {
    gl.deleteTexture(
      texture,
    );
  }
}

/* ============================================================
   PRELOAD
============================================================ */

export async function preloadRippleImage(
  src: string,
) {
  await loadImage(
    src,
  );
}

/* ============================================================
   CACHE CONTROL
============================================================ */

export function clearRippleImageCache() {
  imageCache.clear();
}