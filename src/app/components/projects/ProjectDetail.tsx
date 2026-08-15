import PageShell from "./PageShell";
import type { BreadcrumbItem } from "./Breadcrumb";

interface ProjectDetailProps {
  name: string;
  subtitle: string;
  location?: string;
  leadLine: string;
  body: string[];
  bookCoverSrc?: string;
  backdropSrc: string;
  gallery: string[];
  side: "left" | "right";
  breadcrumb: BreadcrumbItem[];
}

const fontBase = { fontFamily: "futura-pt, sans-serif" } as const;
const TILE_WIDTH = 210;
const TILE_HEIGHT = 130;

// leadLine is a plain string prop (so per-page content stays plain data, not
// JSX), but the design calls for select phrases in a heavier weight — **text**
// marks those phrases inline, same convention as markdown bold.
function renderEmphasis(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <span key={i} style={{ fontWeight: 500 }}>
        {part.slice(2, -2)}
      </span>
    ) : (
      part
    ),
  );
}

// Splits `count` images into at most 3 rows (1 row up to 3 images, 2 rows up
// to 6, 3 rows for 7-8), as evenly as possible, extra images going to the
// outer rows first so a 3-row gallery reads as "loose" (smaller middle row)
// rather than mechanically even. Used only by the fallback gallery below.
function splitIntoRows(count: number): number[] {
  const rows = count <= 3 ? 1 : count <= 6 ? 2 : 3;
  const base = Math.floor(count / rows);
  let remainder = count % rows;
  const result = new Array(rows).fill(base);
  const fillOrder = rows === 3 ? [0, 2, 1] : [0, 1, 2];
  let i = 0;
  while (remainder > 0) {
    result[fillOrder[i % fillOrder.length]]++;
    remainder--;
    i++;
  }
  return result;
}

function Tile({ src }: { src: string }) {
  return (
    <div style={{ width: TILE_WIDTH, height: TILE_HEIGHT }} className="overflow-hidden shadow-md">
      <img src={src} alt="" className="h-full w-full object-cover" />
    </div>
  );
}

// How many images go in the top row, the right-hand stack, and the bottom
// row. 9 images gives an even 3/3/3 split; 8 gives the Figma's 3/2/3; fewer
// images shrink the stack first (it's the accent, not the anchor) and then
// split the rest evenly between top and bottom, top getting any odd one out.
function ringSplit(count: number): { top: number; stack: number; bottom: number } {
  const stack = count >= 9 ? 3 : count >= 7 ? 2 : count >= 4 ? 1 : 0;
  const remaining = count - stack;
  const top = Math.max(1, Math.ceil(remaining / 2));
  const bottom = remaining - top;
  return { top, stack, bottom };
}

// The "ring" gallery: a top row, a bottom row, a stack of images filling the
// right-hand column between them, and the book cover in the gap that leaves
// on the left of that stack — confined to a flex-1 slot next to the stack's
// fixed-width column, so it can never overlap a photo or the text column.
// At exactly 8 images + a book this reproduces the Figma pixel-for-pixel
// (3/2/3 split); at other counts (e.g. a person with only 5 photos) it's the
// same structure, just with a smaller stack/top/bottom per `ringSplit`.
function RingGallery({ gallery, bookCoverSrc }: { gallery: string[]; bookCoverSrc?: string }) {
  const { top: topCount, stack: stackCount } = ringSplit(gallery.length);
  const top = gallery.slice(0, topCount);
  const stack = gallery.slice(topCount, topCount + stackCount);
  const bottom = gallery.slice(topCount + stackCount);
  // Grows to fit however many stack tiles there are (up to 3 now, not just
  // 2), but never shrinks below 300 — the book needs that much room even
  // when the stack is short.
  const bandHeight = Math.max(300, stackCount * TILE_HEIGHT + Math.max(stackCount - 1, 0) * 16);

  return (
    <div className="flex h-full w-full items-center justify-end">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          {top.map((src, i) => (
            <Tile key={`top-${i}`} src={src} />
          ))}
        </div>

        {(bookCoverSrc || stackCount > 0) && (
          <div className="flex items-stretch gap-4" style={{ height: bandHeight }}>
            {bookCoverSrc && (
              <div className="flex flex-1 items-center justify-center">
                {/* ~340px wide, the design's focal point — bounded by both
                    height and width so it's guaranteed to stay inside its
                    own flex-1 slot (with margin for the slight tilt) and
                    never touch the stack beside it. aspect-[4/3]
                    (landscape), not [4/5]: a short, compact footprint keeps
                    the whole middle band shorter than a portrait crop would. */}
                <div className="aspect-[4/3] max-h-[95%] w-[340px] max-w-[90%] -rotate-2 overflow-hidden shadow-2xl">
                  <img src={bookCoverSrc} alt="" className="h-full w-full object-cover" />
                </div>
              </div>
            )}
            {stackCount > 0 && (
              <div className="flex flex-col items-center justify-center gap-4">
                {stack.map((src, i) => (
                  <Tile key={`stack-${i}`} src={src} />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex gap-4">
          {bottom.map((src, i) => (
            <Tile key={`bot-${i}`} src={src} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Generic fallback for any count/book combination other than the exact
// 8-image ring above (e.g. a person with only 4-5 photos, or no book at
// all) — same footprint-filling row logic as before. When a book IS given
// here, it's inserted as its own row right after the first image row
// (rather than reserving a fixed grid cell like RingGallery does), since
// row counts and sizes vary too much across people to hand-tune a shared
// layout — this just needs to not overlap anything, not match a specific
// Figma.
function FallbackGallery({ gallery, bookCoverSrc }: { gallery: string[]; bookCoverSrc?: string }) {
  const rows = splitIntoRows(gallery.length);
  let cursor = 0;
  const galleryRows = rows.map((rowCount) => {
    const row = gallery.slice(cursor, cursor + rowCount);
    cursor += rowCount;
    return row;
  });

  return (
    <div className="flex h-full flex-col gap-2">
      {galleryRows.map((row, rowIndex) => (
        <div key={rowIndex} className="contents">
          <div className="flex flex-1 gap-2">
            {row.map((src, imgIndex) => (
              <div key={imgIndex} className="h-full flex-1 overflow-hidden shadow-md">
                <img src={src} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          {rowIndex === 0 && bookCoverSrc && (
            <div className="flex flex-1 items-center justify-center">
              <div className="aspect-[4/3] max-h-full w-[280px] max-w-[70%] -rotate-2 overflow-hidden shadow-2xl">
                <img src={bookCoverSrc} alt="" className="h-full w-full object-cover" />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ProjectDetail({
  name,
  subtitle,
  location,
  leadLine,
  body,
  bookCoverSrc,
  backdropSrc,
  gallery,
  side,
  breadcrumb,
}: ProjectDetailProps) {
  const galleryOnRight = side === "right";
  const useRing = gallery.length >= 4 && !!bookCoverSrc;

  const textColumn = (
    <div className="relative z-10 flex flex-col justify-center gap-2 px-6 pb-4 pt-24 lg:flex-1 lg:px-10">
      <h1
        className="max-w-[280px] uppercase leading-[1.1] tracking-[0.04em]"
        style={{
          ...fontBase,
          fontWeight: 400,
          fontSize: "clamp(1.4rem, 1.8vw, 2rem)",
          color: "#e0b566",
        }}
      >
        {name}
      </h1>

      {/* Wider than the paragraph column below — location sits on its own,
          independently-anchored row, not clamped to the lead paragraph's
          width, so it reads further right than the text block's own edge. */}
      <div className="flex max-w-[420px] flex-nowrap items-baseline justify-between gap-x-4 text-white">
        <span className="whitespace-nowrap text-[11px] uppercase tracking-[0.08em]" style={fontBase}>
          {subtitle}
        </span>
        {location && (
          <span className="whitespace-nowrap text-[11px] uppercase tracking-[0.08em]" style={fontBase}>
            {location}
          </span>
        )}
      </div>

      <p className="max-w-[380px] text-[13px] leading-snug text-white" style={{ ...fontBase, fontWeight: 300 }}>
        {renderEmphasis(leadLine)}
      </p>

      {body.map((paragraph, index) => (
        <p
          key={index}
          className="max-w-[380px] text-[12px] leading-snug text-white/80"
          style={{ ...fontBase, fontWeight: 300 }}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );

  const galleryColumn = (
    <div className="relative z-10 h-full w-full px-6 py-4 lg:flex-1 lg:py-4 lg:pl-8 lg:pr-4">
      {useRing ? (
        <RingGallery gallery={gallery} bookCoverSrc={bookCoverSrc} />
      ) : (
        <FallbackGallery gallery={gallery} bookCoverSrc={bookCoverSrc} />
      )}
    </div>
  );

  return (
    <PageShell breadcrumbItems={breadcrumb}>
      {/* Full-viewport backdrop, independent of this block's own height — low
          opacity, tinted toward the page's maroon, faded on every edge via a
          radial vignette so it never shows a hard boundary against the
          surrounding page (including the navbar/breadcrumb area above it).
          MUST be z-0, not a negative z-index: PageShell's root establishes
          its own stacking context (it's `position: relative` with a
          background), so a negative-z child paints *behind that root's own
          background* — i.e. behind the opaque maroon gradient, invisible
          regardless of opacity. z-0 keeps it above the root's background but
          below the z-10 text/gallery columns and the z-40/z-50 navbar chrome. */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <img src={backdropSrc} alt="" className="h-full w-full object-cover opacity-40" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 35%, rgba(22,9,14,0.88) 100%)",
          }}
        />
      </div>

      <div className="-mx-7 flex w-full flex-col lg:flex-row">
        {galleryOnRight ? (
          <>
            {textColumn}
            {galleryColumn}
          </>
        ) : (
          <>
            {galleryColumn}
            {textColumn}
          </>
        )}
      </div>
    </PageShell>
  );
}
