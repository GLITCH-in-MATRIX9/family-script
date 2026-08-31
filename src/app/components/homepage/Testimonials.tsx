"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { testimonialsStepRef } from "./ripple/testimonialsStepBridge";

const BACKDROP_PHOTO = "/assets/testimonials/testimonials-bg.png";

const fontBook = {
  fontFamily: "Futura",
  fontWeight: 400,
} as const;

const fontLight = {
  fontFamily: "Futura",
  fontWeight: 300,
} as const;

type Testimonial = {
  quote: string;
  name: string;
  project: string;
  photo: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Varun & Elina",
    project: "The Wedding Hamper Project",
    photo: "/assets/testimonials/varun-elina.png",
    quote:
      'We are so grateful to the entire FS team for making our wedding so special and memorable. The hamper you created for us was amazing and unique. It had the traditional elements and also a hint of what we love. All of our guests were really delighted and impressed by the contents of the basket. They appreciated how you chose sustainable and eco-friendly products. The stories behind each of the items made it so much more personal and the "fun facts" about the both of us was such a nice touch too!\n\nYou all really put a lot of thought and effort into it. Thank you so much for all your patience, creativity and energy that went into making this a highlight of our wedding!',
  },
  {
    name: "Sucharita Hota",
    project: "The Graduation Book",
    photo: "/assets/testimonials/sucharita-hota.png",
    quote:
      "Dear Team Family Script,\n\nThis is a small note of appreciation for the wonderful graduation book you helped me create for my daughter. It was the perfect gift and the best surprise ever for her. Thank you for so beautifully weaving the threads of her life into such a beautiful tapestry. The time and effort your team put in, responding to my every message, voice note and email was exemplary. Your attention to detail was executed to near perfection. I could not have found a better team to work with and I’m so glad I chose you for something so personal and close to me. You made it so easy to put my trust in your team with your positive attitude and friendliness. For that you guys have my heart.\n\nWishing you all success in all your endeavours.\n\nI will always choose you as my “go-to” team.",
  },
  {
    name: "Romonika Sharan",
    project: "Colombo Colours: Photo Book",
    photo: "/assets/testimonials/romonika-sharan.png",
    quote:
      "Thankyou, FS for crafting this mosaic of memorable moments from our holiday with the parivar in Colombo, Dec 2022. It was an absolute privilege to host 18 people from across the world and experience Sri Lanka together. It was thanks to the patience and professionalism of Faria and the FS team that later helped me select special moments from our family occasions to craft a permanent pathway that we can travel through and renew the warp and weft of family bonds.",
  },
  {
    name: "Vimlendra and Romonika D Sharan",
    project: "Graduation Journeys: Photo Book",
    photo: "/assets/testimonials/vimlendra-romonika-sharan.png",
    quote:
      "Holding on and letting go are intrinsic elements of most close relationships especially the precious one between a parent and a child. FS played a key role in celebrating the graduation of our son from the University of Toronto, Canada and the post graduation of our daughter from the Institute of development Studies, Sussex, UK. These books produced by FS provide our family with a recording of some of the moments of preparation, adventure, trepidation and of course celebration that we shared as a family across 4 different cities and 3 different time zones over the last few years.\n\nWe shall always be grateful to the team at FS for their empathetic support and professional expertise in curating these personalised academic journeys as our children step out into the world.",
  },
  {
    name: "Nikita Gupta",
    project: "The Wedding Book",
    photo: "/assets/testimonials/nikita-gupta.png",
    quote:
      "The Wedding Book is a real treasure for me, the right treasure I got at the right time. It’s the legacy of my family I carry with me, and the link which commences my new journey with Mrigank’s family.\n\nWhen we were finally presented with the book, it was such a lovely surprise - looking through it and all our stories! But even more beautiful thing about the Wedding Book is that it keeps getting more interesting with time. Everytime it is opened, we get to know new things about our own families.",
  },
];

type Slot = "upper" | "lower";

const SLOT_TOP: Record<Slot, number> = {
  upper: 0,
  lower: 238,
};

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

type PairSlot = {
  testimonial: Testimonial;
  preset: SidePreset;
};

type Pair = {
  upper: PairSlot;
  lower: PairSlot;
};

function buildPairs(items: Testimonial[]): Pair[] {
  const pairs: Pair[] = [];

  for (let i = 0; i < items.length; i += 2) {
    const lower = items[i + 1] ?? items[i];

    pairs.push({
      upper: {
        testimonial: items[i],
        preset: LEFT_PRESET,
      },
      lower: {
        testimonial: lower,
        preset: RIGHT_PRESET,
      },
    });
  }

  return pairs;
}

const PAIRS = buildPairs(TESTIMONIALS);

const MIN_BOX_HEIGHT = 208;
const SLOT_GAP = 30;
const PAIR_GAP = 60;

/*
 * This is the visible testimonial area.
 * It remains fixed and does not resize.
 */
const VIEWPORT_HEIGHT = 446;

function TestimonialBox({
  testimonial,
  preset,
  onHeightChange,
}: {
  testimonial: Testimonial;
  preset: SidePreset;
  onHeightChange: (height: number) => void;
}) {
  const quoteMeasureRef = useRef<HTMLParagraphElement>(null);

  const [boxHeight, setBoxHeight] = useState(MIN_BOX_HEIGHT);

  const quoteWidth = 654;
  const quoteTop = 45;

  const nameTop = 162;
  const nameWidth = 217;

  useEffect(() => {
    const measure = () => {
      if (!quoteMeasureRef.current) {
        return;
      }

      const textHeight = quoteMeasureRef.current.scrollHeight;

      const requiredHeight = Math.max(
        MIN_BOX_HEIGHT,
        quoteTop + textHeight + 20,
      );

      setBoxHeight(requiredHeight);
      onHeightChange(requiredHeight);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);

    if (quoteMeasureRef.current) {
      resizeObserver.observe(quoteMeasureRef.current);
    }

    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();

      window.removeEventListener("resize", measure);
    };
  }, [testimonial.quote, onHeightChange]);

  return (
    <div
      className="relative"
      style={{
        width: 1440,
        height: boxHeight,
      }}
    >
      {/* Hidden measuring text */}
      <p
        ref={quoteMeasureRef}
        aria-hidden="true"
        className="pointer-events-none absolute whitespace-pre-line text-[20px] leading-[30px] tracking-[0.05em]"
        style={{
          ...fontBook,
          width: quoteWidth,
          height: "auto",
          top: quoteTop,
          left: preset.quoteLeft,
          visibility: "hidden",
        }}
      >
        {testimonial.quote}
      </p>

      {/* Rectangle */}
      <div
        className="absolute rounded-[15px]"
        style={{
          width: 902,
          height: boxHeight,
          top: 0,
          left: preset.boxLeft,
          border: "0.5px solid #FFFFFF",
          transition: "height 0.25s ease",
        }}
      />

      {/* Quote */}
      <p
        className="absolute whitespace-pre-line text-[20px] leading-[30px] tracking-[0.05em]"
        style={{
          ...fontBook,
          width: quoteWidth,
          height: "auto",
          top: quoteTop,
          left: preset.quoteLeft,
          color: "#FFF5E5",
          textAlign: preset.quoteAlign,
          opacity: 1,
        }}
      >
        {testimonial.quote}
      </p>

      {/* Name */}
      <p
        className="absolute text-[12px] leading-[20px] tracking-normal"
        style={{
          ...fontBook,
          width: nameWidth,
          height: 20,
          top: nameTop,
          left: preset.nameLeft,
          color: "#FFF5E5",
          textAlign: preset.nameAlign,
          opacity: 1,
        }}
      >
        {testimonial.name}
      </p>

      {/* Project */}
      <p
        className="absolute text-[12px] leading-[20px] tracking-normal"
        style={{
          ...fontLight,
          width: nameWidth,
          height: 20,
          top: nameTop + 20,
          left: preset.nameLeft,
          color: "#D2C6B2",
          textAlign: preset.nameAlign,
          opacity: 1,
        }}
      >
        {testimonial.project}
      </p>

      {/* Photo */}
      <div
        className="absolute  rounded-[15px]"
        style={{
          width: 158,
          height: 183,
          top: 12,
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

  const testimonialIndexRef = useRef(0);

  const tweenAnimatingRef = useRef(false);

  const [testimonialHeights, setTestimonialHeights] = useState<number[]>(() =>
    TESTIMONIALS.map(() => MIN_BOX_HEIGHT),
  );

  const updateTestimonialHeight = useCallback(
    (index: number, height: number) => {
      setTestimonialHeights((current) => {
        if (current[index] === height) {
          return current;
        }

        const next = [...current];

        next[index] = height;

        return next;
      });
    },
    [],
  );

  /*
   * Calculate the position of every
   * testimonial from the actual height
   * of the testimonials before it.
   */
  const testimonialOffsets: number[] = [];

  let runningOffset = 0;

  for (let i = 0; i < TESTIMONIALS.length; i++) {
    testimonialOffsets.push(runningOffset);

    const height = testimonialHeights[i] ?? MIN_BOX_HEIGHT;

    runningOffset += height + SLOT_GAP;

    /*
     * Keep the original 60px pause
     * after every second testimonial.
     */
    if (i % 2 === 1) {
      runningOffset += PAIR_GAP;
    }
  }

  const getTestimonialOffset = (index: number) => {
    return testimonialOffsets[index] ?? 0;
  };

  /*
   * Snap to a testimonial without animation.
   */
  const snapTo = useCallback(
    (index: number) => {
      if (!trackRef.current) {
        return;
      }

      const safeIndex = Math.max(0, Math.min(index, TESTIMONIALS.length - 1));

      testimonialIndexRef.current = safeIndex;

      const offset = getTestimonialOffset(safeIndex);

      gsap.set(trackRef.current, {
        y: -offset,
      });
    },
    [testimonialHeights],
  );

  /*
   * Move ONE testimonial at a time.
   */
  const goToTestimonial = useCallback(
    (nextIndex: number) => {
      if (!trackRef.current) {
        return;
      }

      if (nextIndex < 0 || nextIndex >= TESTIMONIALS.length) {
        return;
      }

      if (tweenAnimatingRef.current) {
        return;
      }

      tweenAnimatingRef.current = true;

      testimonialIndexRef.current = nextIndex;

      const offset = getTestimonialOffset(nextIndex);

      gsap.to(trackRef.current, {
        y: -offset,
        duration: 0.6,
        ease: "power2.inOut",

        onComplete: () => {
          tweenAnimatingRef.current = false;
        },
      });
    },
    [testimonialHeights],
  );

  /*
   * Re-align the track when text measurement
   * changes, without changing the background.
   */
  useEffect(() => {
    if (!trackRef.current) {
      return;
    }

    const currentIndex = testimonialIndexRef.current;

    const offset = getTestimonialOffset(currentIndex);

    gsap.set(trackRef.current, {
      y: -offset,
    });
  }, [testimonialHeights]);

  /*
   * Ripple bridge.
   */
  useEffect(() => {
    testimonialsStepRef.current = {
      getPairIndex: () => testimonialIndexRef.current,

      getPairCount: () => TESTIMONIALS.length,

      isAnimating: () => tweenAnimatingRef.current,

      stepForward: () => goToTestimonial(testimonialIndexRef.current + 1),

      stepBackward: () => goToTestimonial(testimonialIndexRef.current - 1),

      enterFromStart: () => snapTo(0),

      enterFromEnd: () => snapTo(TESTIMONIALS.length - 1),
    };

    return () => {
      testimonialsStepRef.current = null;
    };
  }, [goToTestimonial, snapTo]);

  return (
    <section className="relative w-full  bg-[#460A26]">
      {/* =====================================================
          FIXED FULL-WIDTH BACKGROUND
          
          This background NEVER moves with the testimonial
          ripple.

          It always occupies the complete width of the
          section and remains exactly 823px tall.
          ===================================================== */}
      <div
        className="absolute inset-x-0 top-0  pointer-events-none"
        style={{
          width: "100%",
          height: 823,
          zIndex: 0,
        }}
      >
        <img
          src={BACKDROP_PHOTO}
          alt=""
          className="absolute inset-0 h-full w-full"
          style={{
            width: "100%",
            height: 823,
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />

        {/* Group 41 */}
        {[
          {
            width: 1455.93,
            height: 834,
            top: -13,
            left: 2.02,
          },
          {
            width: 1456.94,
            height: 830.85,
            top: -9.85,
            left: 1.01,
          },
          {
            width: 1455.93,
            height: 834,
            top: -13,
            left: 2.02,
          },
          {
            width: 1459.97,
            height: 394.45,
            top: 426.55,
            left: 2.02,
          },
          {
            width: 1457.95,
            height: 830.85,
            top: -9.85,
            left: 2.02,
          },
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

        {/* Gradient layers */}
        {[
          {
            width: 1436,
            height: 813,
            top: 8,
            left: 1,
          },
          {
            width: 1436,
            height: 813,
            top: 8,
            left: 1,
          },
          {
            width: 1436,
            height: 813,
            top: 8,
            left: 1,
          },
          {
            width: 1436,
            height: 384,
            top: 437,
            left: 1,
          },
          {
            width: 1436,
            height: 384,
            top: 437,
            left: 1,
          },
        ].map((rect, i) => (
          <div
            key={`gradient-${i}`}
            className="absolute"
            style={{
              ...rect,
              opacity: 0.26,
              background:
                "linear-gradient(356.76deg, rgba(0, 0, 0, 0.5) 2.81%, rgba(102, 102, 102, 0) 71.6%)",
            }}
          />
        ))}
      </div>

      {/* =====================================================
          CONTENT CANVAS
          
          The testimonial layout retains the original
          1440px coordinate system.
          ===================================================== */}
      <div
        ref={canvasRef}
        className="relative mx-auto"
        style={{
          width: 1440,
          height: 823,
          zIndex: 1,
        }}
      >
        {/* Heading */}
        <div
          data-ripple-element
          className="absolute"
          style={{
            width: 624,
            height: 147,
            top: 75,
            left: 411,
            opacity: 1,
          }}
        >
          <h2
            className="w-full text-[50px] leading-[75px] tracking-[0.05em] text-white"
            style={{
              ...fontBook,
              textAlign: "center",
            }}
          >
            TESTIMONIALS
          </h2>
        </div>

        {/* Description */}
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
          unwavering pillars of support throughout our journey, alongside many
          others who have also played pivotal roles in our endeavors.
        </p>

        {/* ===================================================
            TESTIMONIAL VIEWPORT

            Fixed dimensions.
            Only the track inside moves.
            =================================================== */}
        <div
          data-ripple-element
          className="absolute "
          style={{
            top: 298,
            left: 0,
            width: 1440,
            height: VIEWPORT_HEIGHT,
          }}
        >
          <div
            ref={trackRef}
            className="absolute left-0 top-0"
            style={{
              width: 1440,
              willChange: "transform",
            }}
          >
            {PAIRS.map((pair, pairIndex) => {
              const upperIndex = pairIndex * 2;

              const lowerIndex = pairIndex * 2 + 1;

              const upperHeight =
                testimonialHeights[upperIndex] ?? MIN_BOX_HEIGHT;

              const lowerHeight =
                testimonialHeights[lowerIndex] ?? MIN_BOX_HEIGHT;

              const pairTop = testimonialOffsets[upperIndex] ?? 0;

              const pairHeight = upperHeight + SLOT_GAP + lowerHeight;

              return (
                <div
                  key={pairIndex}
                  className="absolute left-0"
                  style={{
                    top: pairTop,
                    width: 1440,
                    height: pairHeight,
                  }}
                >
                  {/* Upper testimonial */}
                  <TestimonialBox
                    testimonial={pair.upper.testimonial}
                    preset={pair.upper.preset}
                    onHeightChange={(height) =>
                      updateTestimonialHeight(upperIndex, height)
                    }
                  />

                  {/* Lower testimonial */}
                  <div
                    className="absolute left-0"
                    style={{
                      top: upperHeight + SLOT_GAP,
                      width: 1440,
                    }}
                  >
                    <TestimonialBox
                      testimonial={pair.lower.testimonial}
                      preset={pair.lower.preset}
                      onHeightChange={(height) =>
                        updateTestimonialHeight(lowerIndex, height)
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
