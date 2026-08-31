"use client";

import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { testimonialsStepRef } from "../ripple/testimonialsStepBridge";

const QUOTE =
  "“It was thanks to the patience and professionalism of the FS team that later helped me select special moments from our family occasions to craft a permanent pathway that we can travel through and renew the warp and weft of family bonds.”";

const NAME = "Dr. Kshitij Kumar Sinha";

const TESTIMONIAL_PHOTO = "/assets/testimonials/KKS founder.jpg";
// Pre-faded/tinted export, not a raw photo — do NOT also apply an opacity
// reduction to it, or it stacks with the fade already baked in and ends up
// far too faint.
const BACKDROP_PHOTO = "/assets/testimonials/testimonials-bg.png";

// "Book" weight (400) per spec — the globals.css @font-face set only
// declares 300/500/700, so this falls back to the nearest defined weight
// per standard CSS font-matching (still literally what the spec asked for).
const fontBook = { fontFamily: "Futura", fontWeight: 400 } as const;
const fontLight = { fontFamily: "Futura", fontWeight: 300 } as const;

type Testimonial = { quote: string; name: string; photo: string };

// PLACEHOLDER CONTENT — replace with real testimonials when available.
// Repeated 6x (3 pairs) so multiple step transitions are demonstrable.
const TESTIMONIALS: Testimonial[] = Array.from({ length: 6 }, () => ({
  quote: QUOTE,
  name: NAME,
  photo: TESTIMONIAL_PHOTO,
}));

type Slot = "upper" | "lower";

// Local coordinates inside one pair-block. The block itself is rendered
// inside a window whose own `top: 298` puts local 0 at the original upper
// boxTop (298) and local 238 at the original lower boxTop (536).
const SLOT_TOP: Record<Slot, number> = { upper: 0, lower: 238 };

type SidePreset = {
  boxLeft: number;
  photoLeft: number;
  quoteLeft: number;
  quoteAlign: "left" | "right";
  nameLeft: number;
  nameAlign: "left" | "right";
};

const LEFT_PRESET: SidePreset = {
  boxLeft: 309,
  photoLeft: 204,
  quoteLeft: 421,
  quoteAlign: "left",
  nameLeft: 1024,
  nameAlign: "left",
};

const RIGHT_PRESET: SidePreset = {
  boxLeft: 204,
  photoLeft: 1054,
  quoteLeft: 321,
  quoteAlign: "right",
  nameLeft: 270,
  nameAlign: "left",
};

type PairSlot = { testimonial: Testimonial; preset: SidePreset };
type Pair = { upper: PairSlot; lower: PairSlot };

// Global odd/even alternation by absolute testimonial position: since a
// pair's upper slot always takes the list's even-indexed item and the
// lower slot always takes the odd-indexed item, "1st=left, 2nd=right,
// 3rd=left, 4th=right…" collapses to a fixed assignment — upper is always
// photo-left, lower is always photo-right, for every pair.
function buildPairs(items: Testimonial[]): Pair[] {
  const pairs: Pair[] = [];
  for (let i = 0; i < items.length; i += 2) {
    const lower = items[i + 1] ?? items[i]; // defensive: odd-length array
    pairs.push({
      upper: { testimonial: items[i], preset: LEFT_PRESET },
      lower: { testimonial: lower, preset: RIGHT_PRESET },
    });
  }
  return pairs;
}

const PAIRS = buildPairs(TESTIMONIALS);

// One pair's own footprint — span from the top of the upper box to the
// bottom of the lower box (208 box height + 30 gap + 208 box height).
// This is also the clipping window's height: it always shows at most one
// full pair (its own 30px internal gap included) at rest.
const PAIR_HEIGHT = 536 + 208 - 298;

// Extra pause between one pair exiting and the next entering — separate
// from the 30px gap within a pair, which stays untouched.
const PAIR_GAP = 60;

// Distance pair-blocks are stacked/translated by. Since this is larger
// than PAIR_HEIGHT, there's a brief moment mid-transition where the
// (still PAIR_HEIGHT-tall) window shows neither box — a visible pause
// between testimonials.
const PAIR_STEP = PAIR_HEIGHT + PAIR_GAP;

function TestimonialBox({
  testimonial,
  preset,
  slot,
}: {
  testimonial: Testimonial;
  preset: SidePreset;
  slot: Slot;
}) {
  const boxTop = SLOT_TOP[slot];
  const photoTop = boxTop + 12;
  const quoteWidth = 654;
  const quoteHeight = 117;
  const quoteTop = boxTop + 45;
  const nameTop = boxTop + 162;
  const nameWidth = 217;

  return (
    <div>
      {/* Box — purely decorative border now; quote/name are positioned
          independently at their own exact coordinates below. */}
      <div
        className="absolute rounded-[15px]"
        style={{
          width: 902,
          height: 208,
          top: boxTop,
          left: preset.boxLeft,
          border: "0.5px solid #FFFFFF",
        }}
      />

      {/* Quote — exact box per spec: 654×117. */}
      <p
        className="absolute text-[20px] leading-[30px] tracking-[0.05em]"
        style={{
          ...fontBook,
          width: quoteWidth,
          height: quoteHeight,
          top: quoteTop,
          left: preset.quoteLeft,
          color: "#FFF5E5",
          textAlign: preset.quoteAlign,
          opacity: 1,
        }}
      >
        {testimonial.quote}
      </p>

      {/* Name — exact box per spec (upper box: 217×20 at (1024, 460);
          letter-spacing 0%, i.e. normal). */}
      <p
        className="absolute text-[12px] leading-[20px] tracking-normal"
        style={{
          ...fontBook,
          width: nameWidth,
          height: 20,
          top: nameTop,
          left: preset.nameLeft,
          color: "#D2C6B2",
          textAlign: preset.nameAlign,
          opacity: 1,
        }}
      >
        {testimonial.name}
      </p>

      {/* Photo — overlaps the box's near edge, sits on top of it.
          Cropped via background-image (not object-fit: cover) so we can
          zoom into the face/upper-body the way the Figma reference does —
          plain cover on this box barely crops the source photo at all,
          leaving too much wall space and the subject looking small. */}
      <div
        className="absolute overflow-hidden rounded-[15px]"
        style={{
          width: 158,
          height: 183,
          top: photoTop,
          left: preset.photoLeft,
          backgroundImage: `url("${testimonial.photo}")`,
          backgroundSize: "250px 333px",
          backgroundPosition: "-46px -37px",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}

export default function Testimonials() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pairIndexRef = useRef(0);
  const tweenAnimatingRef = useRef(false);

  // Instant, untweened jump — used only when the ripple system moves the
  // user directly into this section (from either direction), so the track
  // is already in the right place before the section becomes visible.
  const snapTo = useCallback((index: number) => {
    if (!trackRef.current) return;
    pairIndexRef.current = index;
    gsap.set(trackRef.current, { y: -index * PAIR_STEP });
  }, []);

  // Tweened step — used while the user is wheel-navigating within the
  // section, one pair at a time.
  const goToPair = useCallback((nextIndex: number) => {
    if (!trackRef.current) return;
    if (nextIndex < 0 || nextIndex >= PAIRS.length) return;
    if (tweenAnimatingRef.current) return;

    tweenAnimatingRef.current = true;
    pairIndexRef.current = nextIndex;
    gsap.to(trackRef.current, {
      y: -nextIndex * PAIR_STEP,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        tweenAnimatingRef.current = false;
      },
    });
  }, []);

  useEffect(() => {
    testimonialsStepRef.current = {
      getPairIndex: () => pairIndexRef.current,
      getPairCount: () => PAIRS.length,
      isAnimating: () => tweenAnimatingRef.current,
      stepForward: () => goToPair(pairIndexRef.current + 1),
      stepBackward: () => goToPair(pairIndexRef.current - 1),
      enterFromStart: () => snapTo(0),
      enterFromEnd: () => snapTo(PAIRS.length - 1),
    };

    return () => {
      testimonialsStepRef.current = null;
    };
  }, [goToPair, snapTo]);

  return (
    <section className="relative w-full overflow-hidden bg-[#460A26]">
      <div
        ref={canvasRef}
        className="relative mx-auto"
        style={{ width: 1440, height: 823 }}
      >
        {/* Backdrop — literal Figma spec, not a borrowed pattern. Five
            duplicate "Gradient" layers, each linear-gradient(356.76deg,
            rgba(0,0,0,0.5) 2.81%, rgba(102,102,102,0) 71.6%) at 26% div
            opacity: three at (1436×813, top:8, left:1) and two at
            (1436×384, top:437, left:1). Stacking near-identical layers
            concentrates the darkening near the bottom of each box (356.76deg
            is ~"to top", so the 2.81% stop lands near that box's bottom
            edge) rather than fading uniformly top-to-bottom the way
            ProjectDetails.tsx's pattern does — that borrowed pattern was
            tried and rejected; this is the actual spec. */}
        <img
          src={BACKDROP_PHOTO}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Group 41 — sits behind the 5 named "Gradient" layers below, per
            the layer-panel stacking order. Dev-mode Colors panel confirmed
            #000000 → #666666@0% and 26% opacity for each, matching the 5
            below exactly, but didn't expose the gradient's angle or stop
            percentages — carried over from the 5 below (356.76deg, 2.81%,
            71.6%) since duplicating-and-repositioning without touching the
            fill is the normal Figma workflow, and it visually matches. The
            one confirmed difference: no opacity annotation on the first
            stop here (unlike the 0.5 alpha below), so it's full-opacity
            black. */}
        {[
          { width: 1455.93, height: 834, top: -13, left: 2.02 },
          { width: 1456.94, height: 830.85, top: -9.85, left: 1.01 },
          { width: 1455.93, height: 834, top: -13, left: 2.02 },
          { width: 1459.97, height: 394.45, top: 426.55, left: 2.02 },
          { width: 1457.95, height: 830.85, top: -9.85, left: 2.02 },
        ].map((rect, i) => (
          <div
            key={`group41-${i}`}
            className="absolute"
            style={{
              ...rect,
              opacity: 0.26,
              background:
                "linear-gradient(356.76deg, rgba(0, 0, 0, 1) 2.81%, rgba(102, 102, 102, 0) 71.6%)",
            }}
          />
        ))}
        {[
          { width: 1436, height: 813, top: 8, left: 1 },
          { width: 1436, height: 813, top: 8, left: 1 },
          { width: 1436, height: 813, top: 8, left: 1 },
          { width: 1436, height: 384, top: 437, left: 1 },
          { width: 1436, height: 384, top: 437, left: 1 },
        ].map((rect, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              ...rect,
              opacity: 0.26,
              background:
                "linear-gradient(356.76deg, rgba(0, 0, 0, 0.5) 2.81%, rgba(102, 102, 102, 0) 71.6%)",
            }}
          />
        ))}

        {/* Heading — exact box per spec: 624×147 at (411, 75). The box is
            ~2 line-heights tall for a single line of text, so it's
            top-anchored (Figma default), not vertically centered — centering
            it made the text sit low enough to collide with the description.
            Stays untransformed, so it remains fixed while the testimonial
            track below it steps between pairs. */}
        <div
          data-ripple-element
          className="absolute"
          style={{ width: 624, height: 147, top: 75, left: 411, opacity: 1 }}
        >
          <h2
            className="w-full text-[50px] leading-[75px] tracking-[0.05em] text-white"
            style={{ ...fontBook, textAlign: "center" }}
          >
            TESTIMONIALS
          </h2>
        </div>

        {/* Description — exact box per spec: 737.54×60.22 at (351, 162). */}
        <p
          data-ripple-element
          className="absolute text-center text-[15px] leading-[20px] tracking-[0.05em] text-white"
          style={{
            ...fontLight,
            width: 737.5399169921875,
            height: 60.22304916381836,
            top: 162,
            left: 351,
            opacity: 1,
          }}
        >
          This is a tribute to our friends at Family Script, who have been
          unwavering pillars of support throughout our journey, alongside
          many others who have also played pivotal roles in our endeavors.
        </p>

        {/* Testimonial viewport window — clips everything except the pair
            currently occupying the upper/lower slots. Positioned at the
            original upper boxTop (298) so slot-local coordinate 0 maps to
            page-absolute 298, matching the original layout exactly. */}
        <div
          data-ripple-element
          className="absolute overflow-hidden"
          style={{ top: 298, left: 0, width: 1440, height: PAIR_HEIGHT }}
        >
          <div
            ref={trackRef}
            className="absolute inset-x-0 top-0"
            style={{ willChange: "transform" }}
          >
            {PAIRS.map((pair, i) => (
              <div
                key={i}
                className="absolute inset-x-0"
                style={{ top: i * PAIR_STEP, height: PAIR_HEIGHT }}
              >
                <TestimonialBox
                  testimonial={pair.upper.testimonial}
                  preset={pair.upper.preset}
                  slot="upper"
                />
                <TestimonialBox
                  testimonial={pair.lower.testimonial}
                  preset={pair.lower.preset}
                  slot="lower"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
