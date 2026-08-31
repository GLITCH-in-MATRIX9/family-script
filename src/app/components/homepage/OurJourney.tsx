// components/homepage/OurJourney.tsx

"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   TYPES
============================================================ */

interface JourneyStop {
  year: string;
  content: string;
}

/* ============================================================
   JOURNEY DATA
============================================================ */

const JOURNEY_STOPS: JourneyStop[] = [
  {
    year: "2015",
    content: "Year 1",
  },
  {
    year: "2018",
    content: "Year 2",
  },
  {
    year: "2020",
    content: "Year 3",
  },
  {
    year: "2023",
    content: "Year 4",
  },
  {
    year: "2023 - 2026",
    content: "Year 5",
  },
  {
    year: "2024",
    content: "Year 6",
  },
  {
    year: "2025",
    content: "Year 7",
  },
  {
    year: "2026",
    content: "Year 8",
  },
  {
    year: "Future Vision",
    content: "Year 9",
  },
];

/* ============================================================
   CONSTANTS
============================================================ */

const CAPTION_COLOR = "#cda06e";

/* ============================================================
   COMPONENT
============================================================ */

export default function OurJourney() {
  /* ==========================================================
     REFS
  ========================================================== */

  const sectionRef = useRef<HTMLDivElement | null>(null);

  const headingRef = useRef<HTMLDivElement | null>(null);

  const contentRef = useRef<HTMLDivElement | null>(null);

  const timelineRef = useRef<HTMLDivElement | null>(null);

  /* ==========================================================
     STATE
  ========================================================== */

  const [activeIndex, setActiveIndex] = useState(0);

  /* ==========================================================
     ACTIVE ITEM
  ========================================================== */

  const activeJourney = JOURNEY_STOPS[activeIndex];

  /* ==========================================================
     CHANGE TIMELINE ITEM
  ========================================================== */

  const handleDotClick = (index: number) => {
    if (index === activeIndex) {
      return;
    }

    setActiveIndex(index);
  };

  /* ==========================================================
     CONTENT ANIMATION
  ========================================================== */

  useEffect(() => {
    const content = contentRef.current;

    if (!content) {
      return;
    }

    gsap.fromTo(
      content,
      {
        opacity: 0,
        y: 15,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power3.out",
      },
    );
  }, [activeIndex]);

  /* ==========================================================
     ENTRANCE ANIMATION
  ========================================================== */

  useEffect(() => {
    const section = sectionRef.current;

    const heading = headingRef.current;

    const content = contentRef.current;

    const timeline = timelineRef.current;

    if (!section || !heading || !content || !timeline) {
      return;
    }

    const ctx = gsap.context(() => {
      /* ----------------------------------------------------
           INITIAL STATE
        ---------------------------------------------------- */

      gsap.set(heading, {
        opacity: 1,
        y: 0,
      });

      gsap.set(content, {
        opacity: 1,
        y: 0,
      });

      gsap.set(timeline, {
        opacity: 1,
        y: 0,
      });

      /* ----------------------------------------------------
           ENTRANCE TIMELINE
        ---------------------------------------------------- */

      const entrance = gsap.timeline({
        paused: true,
      });

      entrance.fromTo(
        heading,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
      );

      entrance.fromTo(
        content,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.35",
      );

      entrance.fromTo(
        timeline,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
        },
        "-=0.3",
      );

      /* ----------------------------------------------------
           SCROLL TRIGGER
        ---------------------------------------------------- */

      ScrollTrigger.create({
        trigger: section,

        start: "top 85%",

        onEnter: () => {
          entrance.restart();
        },

        onEnterBack: () => {
          entrance.restart();
        },
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div
      ref={sectionRef}
      className="
        relative
        h-full
        min-h-full
        w-full
        
        px-6
        py-10
        md:px-10
        md:py-12
        lg:px-16
        lg:py-14
      "
      style={{
        background:
          "radial-gradient(circle at 50% 0%, rgba(94, 33, 51, 1) 0%, rgba(52, 18, 30, 1) 45%, rgba(22, 9, 14, 1) 100%)",
      }}
    >
      {/* ======================================================
          ATMOSPHERIC GLOW
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          opacity-40
        "
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(150, 70, 90, 0.18), transparent 55%)",
        }}
        aria-hidden="true"
      />

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          flex
          h-full
          min-h-0
          flex-col
        "
      >
        {/* ====================================================
            HEADING
        ==================================================== */}

        <div
          ref={headingRef}
          data-ripple-element
          className="
            futura-light
            flex
            shrink-0
            flex-col
            items-center
            text-center
            text-white
          "
        >
          <div
            className="
              uppercase
              text-[0.9rem]
              leading-none
              md:text-[1.1rem]
            "
          >
            Our
          </div>

          <h2
            className="
              mt-2
              uppercase
              text-[clamp(2.5rem,6vw,4.5rem)]
              leading-none
              tracking-[0.12em]
            "
          >
            Journey
          </h2>
        </div>

        {/* ====================================================
            SELECTED CONTENT
        ==================================================== */}

        <div
          ref={contentRef}
          data-ripple-element
          className="
            mt-8
            flex
            flex-1
            min-h-0
            flex-col
            items-center
            justify-center
            text-center
          "
        >
          {/* SMALL YEAR */}

          <div
            className="
              futura-light
              uppercase
              text-[14px]
              tracking-[0.18em]
              text-white/70
              md:text-[16px]
            "
          >
            {activeJourney.year}
          </div>

          {/* MAIN CONTENT */}

          <div
            className="
              futura-light
              mt-3
              text-[clamp(2rem,5vw,4rem)]
              uppercase
              tracking-[0.08em]
              text-white
            "
          >
            {activeJourney.content}
          </div>

          {/* SMALL CAPTION */}

          <div
            className="
              futura-light
              mt-4
              text-[11px]
              uppercase
              tracking-[0.12em]
              md:text-[12px]
            "
            style={{
              color: CAPTION_COLOR,
            }}
          >
            Click a point on the timeline
          </div>
        </div>

        {/* ====================================================
            DESKTOP TIMELINE
        ==================================================== */}

        <div
          ref={timelineRef}
          data-ripple-element
          className="
            relative
            mx-auto
            mb-8
            hidden
            w-[86%]
            max-w-[1500px]
            md:block
          "
        >
          {/* ==================================================
              TIMELINE LINE
          ================================================== */}

          <div
            className="
              absolute
              left-0
              right-0
              top-1/2
              z-0
              h-px
              -translate-y-1/2
              bg-white/25
            "
          />

          {/* ==================================================
              DOTS
          ================================================== */}

          <div
            className="
              relative
              flex
              w-full
              items-center
              justify-between
            "
          >
            {JOURNEY_STOPS.map((stop, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={`${stop.year}-${index}`}
                  type="button"
                  onClick={() => handleDotClick(index)}
                  aria-label={`Show ${stop.year}`}
                  aria-pressed={isActive}
                  className="
                      group
                      relative
                      z-10
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      focus:outline-none
                    "
                >
                  {/* ======================================
                        HOVER / ACTIVE CIRCLE
                    ====================================== */}

                  <span
                    className={`
                        pointer-events-none
                        absolute
                        inset-0
                        rounded-full
                        border
                        border-white/50
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? "scale-100 opacity-100"
                            : "scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                        }
                      `}
                  />

                  {/* ======================================
                        DOT
                    ====================================== */}

                  <span
                    className={`
                        relative
                        block
                        rounded-full
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? "h-3 w-3 bg-white"
                            : "h-2 w-2 bg-white/70 group-hover:h-2.5 group-hover:w-2.5 group-hover:bg-white"
                        }
                      `}
                  />

                  {/* ======================================
                        YEAR LABEL
                    ====================================== */}

                  <span
                    className={`
                        futura-light
                        pointer-events-none
                        absolute
                        top-[calc(50%+18px)]
                        left-1/2
                        -translate-x-1/2
                        whitespace-nowrap
                        text-[10px]
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? "text-white"
                            : "text-white/45 group-hover:text-white/80"
                        }
                      `}
                  >
                    {stop.year}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ====================================================
            MOBILE TIMELINE
        ==================================================== */}

        <div
          className="
            relative
            mx-auto
            mb-6
            w-full
            md:hidden
          "
        >
          {/* ==================================================
              MOBILE LINE
          ================================================== */}

          <div
            className="
              absolute
              left-[5%]
              right-[5%]
              top-1/2
              z-0
              h-px
              -translate-y-1/2
              bg-white/25
            "
          />

          {/* ==================================================
              MOBILE DOTS
          ================================================== */}

          <div
            className="
              relative
              flex
              w-full
              items-center
              justify-between
              px-[3%]
            "
          >
            {JOURNEY_STOPS.map((stop, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={`mobile-${stop.year}-${index}`}
                  type="button"
                  onClick={() => handleDotClick(index)}
                  aria-label={`Show ${stop.year}`}
                  aria-pressed={isActive}
                  className="
                      group
                      relative
                      z-10
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                    "
                >
                  {/* ======================================
                        HOVER / ACTIVE RING
                    ====================================== */}

                  <span
                    className={`
                        pointer-events-none
                        absolute
                        inset-0
                        rounded-full
                        border
                        border-white/50
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? "scale-100 opacity-100"
                            : "scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                        }
                      `}
                  />

                  {/* ======================================
                        DOT
                    ====================================== */}

                  <span
                    className={`
                        relative
                        rounded-full
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? "h-2.5 w-2.5 bg-white"
                            : "h-2 w-2 bg-white/70 group-hover:bg-white"
                        }
                      `}
                  />
                </button>
              );
            })}
          </div>

          {/* ==================================================
              MOBILE ACTIVE YEAR
          ================================================== */}

          <div
            className="
              futura-light
              mt-4
              text-center
              text-[11px]
              text-white/60
            "
          >
            {activeJourney.year}
          </div>
        </div>
      </div>
    </div>
  );
}
