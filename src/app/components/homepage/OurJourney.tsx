type JourneyPhoto = "up" | "down" | "none";

interface JourneyStop {
  year: string;
  /** Horizontal position along the timeline, 0-100. Intentionally uneven —
   * see JOURNEY_STOPS comment below — never auto-distributed. */
  xPercent: number;
  /** Which side of the axis the photo/connector line sits on. */
  photo: JourneyPhoto;
  caption?: string;
  /**
   * Horizontal offset (px) of the caption's own center from the tick's
   * center. The caption is NOT centered on the photo — it has its own,
   * independent horizontal anchor, shifted toward the timeline's outer
   * edge (negative = left, on the early/left half; positive = right, on
   * the later/right half). This is the defining visual trait of the
   * reference design and must stay a separate anchor from the photo's.
   */
  captionOffset?: number;
  /** Which side of the photo/tick the caption block sits on. Default "left". */
  captionAlign?: "left" | "right";
  /** Which side of the axis the caption sits on. Defaults to the photo's
   * side (up→above, down→below); only 2015 needs an explicit override,
   * since it has no photo but its caption still sits above the axis. */
  captionSide?: "above" | "below";
  /** Connector line length (px) for this stop only. Falls back to AXIS_GAP. */
  gap?: number;
  /** Which side of the axis LINE the year label itself sits on — separate
   * from `photo`'s above/below pattern. Defaults to "on" (centered on the
   * line, the original behavior); only "Future Vision" keeps that default. */
  labelSide?: "above" | "below" | "on";
  /** Horizontal offset (px) of the label's own center from the tick's
   * center — only 2015 needs this, whose label sits slightly left of its
   * tick rather than centered on it. */
  labelOffset?: number;
}

// Alternating connector-line lengths, set explicitly per stop below instead
// of relying on the AXIS_GAP fallback.
const AXIS_GAP_LONG = 68;
const AXIS_GAP_SHORT = 38;

// Shared with the mobile caption color below, so the two layouts can't drift apart.
const CAPTION_COLOR = "#cda06e";

/**
 * Timeline copy mirrors the design mock as given: most stops repeat the same
 * placeholder line, with two real captions (2017 registration, the Top 19
 * startup mention) standing out. Swap the placeholder text for real copy
 * per-year when it's available — see Decisions.md for why it was kept as-is.
 *
 * xPercent spacing is intentionally uneven (wide through 2015-2019 so the
 * "2020 - 2022" range label has room, then tightening slightly before
 * widening again toward Future Vision) and captionOffset intentionally
 * splits left/right down the middle of the timeline — both hand-tuned
 * against the reference image, not derived from an even/centered formula.
 * See Decisions.md.
 */
const JOURNEY_STOPS: JourneyStop[] = [
  {
    year: "2015",
    xPercent: 8,
    photo: "none",
    caption:
      "The beginning of a dream, where ideas sparked into purpose and our journey began",
    captionOffset: 5,
    captionAlign: "left",
    captionSide: "above",
    labelSide: "above",
    labelOffset: -15,
  },
  {
    year: "2017",
    xPercent: 12,
    photo: "up",
    caption:
      "23rd October 2017, the company was registered under the name Prarabdha Info Solutions Private Limited",
    captionOffset: 5,
    captionAlign: "left",
    labelSide: "below",
    gap: AXIS_GAP_LONG,
  },
  {
    year: "2018",
    xPercent: 21,
    photo: "down",
    caption:
      "Shortlisted among the Top 19 startup ideas in India by Nexus Startup Hub and The University of Texas at Austin, USA.",
    captionOffset: 5,
    captionAlign: "left",
    labelSide: "above",
    gap: AXIS_GAP_LONG,
  },
  {
    year: "2019",
    xPercent: 30,
    photo: "up",
    caption:
      "The beginning of a dream, where ideas sparked into purpose and our journey began",
    captionOffset: 5,
    captionAlign: "left",
    labelSide: "below",
    gap: AXIS_GAP_SHORT,
  },
  {
    year: "2020 - 2022",
    xPercent: 41,
    photo: "down",
    caption:
      "The beginning of a dream, where ideas sparked into purpose and our journey began",
    captionOffset: 5,
    captionAlign: "left",
    labelSide: "above",
    gap: AXIS_GAP_SHORT,
  },
  {
    year: "2023",
    xPercent: 52,
    photo: "up",
    caption:
      "The beginning of a dream, where ideas sparked into purpose and our journey began",
    captionOffset: 5,
    captionAlign: "left",
    labelSide: "below",
    gap: AXIS_GAP_LONG,
  },
  {
    year: "2024",
    xPercent: 61,
    photo: "down",
    caption:
      "The beginning of a dream, where ideas sparked into purpose and our journey began",
    captionOffset: 5,
    captionAlign: "left",
    labelSide: "above",
    gap: AXIS_GAP_LONG,
  },
  {
    year: "2024",
    xPercent: 70,
    photo: "up",
    caption:
      "The beginning of a dream, where ideas sparked into purpose and our journey began",
    captionOffset: 5,
    captionAlign: "left",
    labelSide: "below",
    gap: AXIS_GAP_SHORT,
  },
  {
    year: "2025",
    xPercent: 79,
    photo: "down",
    caption:
      "The beginning of a dream, where ideas sparked into purpose and our journey began",
    captionOffset: 5,
    captionAlign: "right",
    labelSide: "above",
    gap: AXIS_GAP_SHORT,
  },
  {
    year: "2026",
    xPercent: 87,
    photo: "up",
    caption:
      "The beginning of a dream, where ideas sparked into purpose and our journey began",
    captionOffset: 5,
    captionAlign: "right",
    labelSide: "below",
    gap: AXIS_GAP_LONG,
  },
  {
    year: "Future Vision",
    xPercent: 104,
    photo: "none",
    labelSide: "on",
  },
];

// Fixed, uniform photo size — every photo is the same size regardless of
// position (unlike the earlier viewport-scaled version). See Decisions.md
// for the fidelity-vs-responsiveness trade-off this reintroduces.
const PHOTO_SIZE = 78;
const CAPTION_WIDTH = 130;

// Distance (px) from the axis to the near edge of a stop's photo. The
// caption's own near-edge distance is derived from this plus the photo size.
const AXIS_GAP = 42;
const NONE_CAPTION_GAP = 34;
// Distance (px) a non-"on" year label sits from the axis line. Kept tiny —
// combined with LABEL_STYLE's lineHeight: 1 below, this is what keeps labels
// sitting almost flush against the line instead of forming a visibly
// separate row (the line-height's own leading was adding invisible padding
// on top of this gap).
const LABEL_GAP = 2;

const CAPTION_STYLE = {
  fontFamily: "futura-pt, sans-serif",
  fontWeight: 300,
  fontSize: "0.66rem",
  lineHeight: 1.4,
  color: CAPTION_COLOR,
  width: CAPTION_WIDTH,
} as const;

const LABEL_STYLE = {
  fontFamily: "futura-pt, sans-serif",
  fontWeight: 600,
  fontSize: "1.05rem",
  lineHeight: 1,
} as const;

export default function OurJourney() {
  return (
    <section
      className="relative w-full overflow-hidden py-24 md:py-32"
      style={{
        background:
          "radial-gradient(circle at 50% 0%, rgba(94, 33, 51, 1) 0%, rgba(52, 18, 30, 1) 45%, rgba(22, 9, 14, 1) 100%)",
      }}
    >
      {/* ================= HEADING ================= */}
      <div
        className="text-center text-white"
        style={{ fontFamily: "futura-pt, sans-serif" }}
      >
        <div
          className="uppercase tracking-[0.3em]"
          style={{ fontWeight: 300, fontSize: "1.1rem" }}
        >
          Our
        </div>
        <h2
          className="mt-2 uppercase tracking-[0.12em]"
          style={{ fontWeight: 300, fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
        >
          Journey
        </h2>
      </div>

      {/* ================= TIMELINE (mobile) =================
          The desktop layout below needs real horizontal room (fixed-size
          photos and independently-offset captions across 11 stops) that
          only reads correctly on a wide canvas, matching the source design.
          Below md it collapses into a simple vertical list instead of
          squeezing everything into overlapping text. */}
      <div className="mt-10 space-y-10 px-6 md:hidden">
        {JOURNEY_STOPS.map((stop, index) => (
          <div key={`${stop.year}-mobile-${index}`} className="flex gap-4">
            <div className="flex flex-col items-center pt-1">
              <div className="h-2 w-2 rounded-full bg-white/60" />
              {index < JOURNEY_STOPS.length - 1 && (
                <div className="mt-1 w-px flex-1 bg-white/25" />
              )}
            </div>
            <div className="flex-1 pb-2">
              <span
                className="text-white"
                style={{ fontFamily: "futura-pt, sans-serif", fontWeight: 300, fontSize: "1.05rem" }}
              >
                {stop.year === "Future Vision" ? "→ Future Vision" : stop.year}
              </span>
              {stop.photo !== "none" && (
                <img
                  src="/assets/homepage/REVA KHANNA.png"
                  alt=""
                  className="mt-2 h-[80px] w-[96px] rounded-sm object-cover shadow-lg"
                />
              )}
              {stop.caption && (
                <p
                  className="mt-2"
                  style={{
                    fontFamily: "futura-pt, sans-serif",
                    fontWeight: 300,
                    fontSize: "0.78rem",
                    lineHeight: 1.5,
                    color: CAPTION_COLOR,
                  }}
                >
                  {stop.caption}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ================= TIMELINE (desktop) ================= */}
      <div className="relative mx-auto mt-16 hidden h-[420px] w-[82%] max-w-[1700px] md:mt-20 md:block">
        {/* axis: a single straight line, full width, one consistent y */}
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/40" />

        {JOURNEY_STOPS.map((stop, index) => {
          const gap = stop.gap ?? AXIS_GAP;
          const captionSide =
            stop.caption == null
              ? null
              : (stop.captionSide ?? (stop.photo === "down" ? "below" : "above"));
          // A caption sits BESIDE its photo, roughly centered on the
          // photo's vertical midpoint (bottom/top: gap + PHOTO_SIZE/2)
          // rather than flush with the photo's near edge (gap alone) —
          // flush-with-the-edge anchoring let short captions float low and
          // long ones spill past the photo's far edge. 2015 has no photo,
          // so it keeps its own separate, unrelated gap.
          const captionVertical =
            stop.photo === "none"
              ? captionSide === "above"
                ? { bottom: NONE_CAPTION_GAP }
                : { top: NONE_CAPTION_GAP }
              : stop.photo === "up"
                ? { bottom: gap + PHOTO_SIZE / 2 }
                : { top: gap + PHOTO_SIZE / 2 };
          const labelSide = stop.labelSide ?? "on";

          return (
            <div
              key={`${stop.year}-${index}`}
              className="absolute"
              style={{ left: `${stop.xPercent}%`, top: "50%" }}
            >
              {/* connector line + photo — always centered on the tick;
                  the caption below has its own, independent anchor. */}
              {stop.photo !== "none" && (
                <>
                  <div
                    className="absolute left-0 w-px -translate-x-1/2 bg-white/40"
                    style={
                      stop.photo === "up"
                        ? { bottom: 0, height: gap }
                        : { top: 0, height: gap }
                    }
                  />
                  {/* Fixed-size frame holding the photo, so the <img> itself
                      only ever gets a `w-full h-full` box to fill — setting
                      pixel width/height directly on the <img> distorted its
                      aspect ratio instead of cropping it. */}
                  <div
                    className="absolute left-0 -translate-x-1/2 overflow-hidden rounded-sm shadow-lg"
                    style={{
                      width: PHOTO_SIZE,
                      height: PHOTO_SIZE,
                      ...(stop.photo === "up" ? { bottom: gap } : { top: gap }),
                    }}
                  >
                    <img
                      src="/assets/homepage/REVA KHANNA.png"
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                </>
              )}

              {stop.caption && captionSide && (
                <p
                  className="absolute text-center"
                  style={{
                    ...((stop.captionAlign ?? "left") === "right"
                      ? { left: PHOTO_SIZE / 2 + 12 + (stop.captionOffset ?? 0) }
                      : { right: PHOTO_SIZE / 2 + 12 - (stop.captionOffset ?? 0) }),
                    ...captionVertical,
                    ...CAPTION_STYLE,
                  }}
                >
                  {stop.caption}
                </p>
              )}

              {/* year label — its above/below/on-the-line placement is a
                  separate alternation from the photo's up/down pattern.
                  inline-flex + items-center (rather than the arrow span's
                  old -translate-y-px nudge) is what keeps the arrow glyph
                  and the text vertically centered as one unit — the nudge
                  was throwing "Future Vision" off the axis's true center. */}
              <span
                className="absolute inline-flex items-center whitespace-nowrap text-white"
                style={{
                  left: stop.labelOffset ?? 0,
                  transform: labelSide === "on" ? "translate(-50%, -50%)" : "translateX(-50%)",
                  ...(labelSide === "above"
                    ? { bottom: LABEL_GAP }
                    : labelSide === "below"
                      ? { top: LABEL_GAP }
                      : { top: 0 }),
                  ...LABEL_STYLE,
                }}
              >
                {stop.year === "Future Vision" ? (
                  <>
                    <span aria-hidden className="mr-2">
                      &#8594;
                    </span>
                    {stop.year}
                  </>
                ) : (
                  stop.year
                )}
              </span>
            </div>
          );
        })}
      </div>

      {/* ================= CTA ================= */}
      <div className="mt-16 flex justify-center">
        <button
          className="rounded-full border border-white/20 bg-white/20 px-6 py-[7px] text-white backdrop-blur-sm transition duration-300 hover:bg-white/30"
          style={{
            fontFamily: "futura-pt, sans-serif",
            fontWeight: 300,
            fontSize: "11px",
          }}
        >
          Get your Story{" "}
          <span style={{ fontWeight: 500 }}>Scripted</span>
          &nbsp;&nbsp;&gt;&gt;
        </button>
      </div>
    </section>
  );
}
