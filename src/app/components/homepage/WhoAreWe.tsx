
"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";

import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";

gsap.registerPlugin(
  ScrollTrigger,
);

/* ============================================================
   TYPES
============================================================ */

interface StatProps {
  target: number;
  suffix: string;
  label: string;
  started: boolean;
}

/* ============================================================
   COMPONENT
============================================================ */

export default function WhoAreWe() {
  /*
   * IMPORTANT:
   *
   * page.tsx owns the actual homepage section:
   *
   * <section data-home-section="1">
   *   <WhoAreWe />
   * </section>
   *
   * Therefore this component must NOT create another
   * <section>.
   */

  const sectionRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const backgroundRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const gradientRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const contentRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const headingRef =
    useRef<HTMLHeadingElement | null>(
      null,
    );

  const descriptionRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const statsRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const ctaRef =
    useRef<HTMLButtonElement | null>(
      null,
    );

  const [
    countStarted,
    setCountStarted,
  ] = useState(false);

  /* ==========================================================
     SECTION ANIMATION
  ========================================================== */

  useEffect(() => {
    const section =
      sectionRef.current;

    const background =
      backgroundRef.current;

    const gradient =
      gradientRef.current;

    const content =
      contentRef.current;

    const heading =
      headingRef.current;

    const description =
      descriptionRef.current;

    const stats =
      statsRef.current;

    const cta =
      ctaRef.current;

    if (
      !section ||
      !background ||
      !gradient ||
      !content ||
      !heading ||
      !description ||
      !stats ||
      !cta
    ) {
      return;
    }

    const context =
      gsap.context(
        () => {
          /* ==================================================
             BACKGROUND
             
             IMPORTANT:
             
             The background is completely static.
             
             No:
             - yPercent
             - scale animation
             - parallax
             - scrub
             
             It exactly fills the page.tsx section.
          ================================================== */

          gsap.set(
            background,
            {
              x: 0,
              y: 0,
              scale: 1,
            },
          );

          gsap.set(
            gradient,
            {
              x: 0,
              y: 0,
              scale: 1,
            },
          );

          /* ==================================================
             INITIAL CONTENT STATE
          ================================================== */

          gsap.set(
            [
              heading,
              description,
              stats,
              cta,
            ],
            {
              opacity: 0,
              y: 35,
            },
          );

          gsap.set(
            cta,
            {
              scale: 0.96,
            },
          );

          /* ==================================================
             ENTRANCE TIMELINE
          ================================================== */

          const entrance =
            gsap.timeline({
              paused: true,
            });

          /* --------------------------------------------------
             HEADING
          -------------------------------------------------- */

          entrance.to(
            heading,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            },
          );

          /* --------------------------------------------------
             DESCRIPTION
          -------------------------------------------------- */

          entrance.to(
            description,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.55",
          );

          /* --------------------------------------------------
             STATS
          -------------------------------------------------- */

          entrance.to(
            stats,
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: "power3.out",

              onStart: () => {
                setCountStarted(
                  true,
                );
              },
            },
            "-=0.5",
          );

          /* --------------------------------------------------
             CTA
          -------------------------------------------------- */

          entrance.to(
            cta,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.4",
          );

          /* ==================================================
             SECTION ENTER
             
             ScrollTrigger controls ONLY content.
             
             It does NOT animate the background.
          ================================================== */

          ScrollTrigger.create({
            trigger: section,

            start: "top 80%",

            onEnter: () => {
              entrance.restart();
            },

            onEnterBack: () => {
              entrance.restart();
            },

            /*
             * IMPORTANT:
             *
             * No onLeaveBack reset.
             *
             * Ripple navigation can move directly between
             * sections without normal browser scrolling.
             */
          });

          /* ==================================================
             NO BACKGROUND PARALLAX
             
             Intentionally empty.
             
             The image must stay completely still.
          ================================================== */

          /* ==================================================
             NO GRADIENT PARALLAX
             
             The colourisation remains completely static.
          ================================================== */

          /* ==================================================
             NO CONTENT PARALLAX
             
             The content entrance is enough.
             
             This keeps the whole section stable and avoids
             making the section look like the background is
             moving.
          ================================================== */

          /* ==================================================
             REFRESH
          ================================================== */

          requestAnimationFrame(
            () => {
              ScrollTrigger.refresh();
            },
          );
        },
        section,
      );

    return () => {
      context.revert();
    };
  }, []);

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div
      ref={sectionRef}
      className="
        relative
        h-full
        min-h-full
        w-full
        overflow-hidden
      "
    >
      {/* ======================================================
          BACKGROUND IMAGE

          EXACT SAME SIZE AS PAGE.TSX

          page.tsx:

          h-screen
          min-h-screen
          w-full
          overflow-hidden

          Therefore this is:

          inset-0
          h-full
          w-full

          NO oversizing.
          NO movement.
          NO animation.
      ====================================================== */}

      <div
        ref={backgroundRef}
        data-ripple-background
        className="
          pointer-events-none
          absolute
          inset-0
          h-full
          w-full
          overflow-hidden
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage:
            "url('/assets/Homepage/WHO_WE_ARE.jpg')",

          backgroundSize:
            "cover",

          backgroundPosition:
            "center center",

          backgroundRepeat:
            "no-repeat",
        }}
        aria-hidden="true"
      />

      {/* ======================================================
          MAROON / BURGUNDY COLOURISATION

          STATIC.

          The colour does not move.
          The colour does not fade.
          The colour does not parallax.

          It simply sits over the image.
      ====================================================== */}

      <div
        ref={gradientRef}
        className="
          pointer-events-none
          absolute
          inset-0
          h-full
          w-full
        "
        style={{
          background:
            "linear-gradient(to bottom, rgba(83,36,57,0.88) 0%, rgba(83,36,57,0.70) 32%, rgba(83,36,57,0.30) 65%, rgba(59,20,37,0.10) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ======================================================
          VERY LIGHT DARK OVERLAY

          STATIC.
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          h-full
          w-full
          bg-black/10
        "
        aria-hidden="true"
      />

      {/* ======================================================
          CONTENT
          
          The content participates in the ripple transition.
          
          The background remains independent and static.
      ====================================================== */}

      <div
        ref={contentRef}
        className="
          relative
          z-10
          flex
          h-full
          min-h-full
          w-full
          flex-col
          items-center
          text-center
          text-white
        "
      >
        {/* ====================================================
            CONTENT CONTAINER
        ==================================================== */}

        <div
          className="
            flex
            h-full
            w-full
            flex-1
            flex-col
            items-center
            px-6
            pb-12
            pt-[22vh]
          "
        >
          {/* ==================================================
              HEADING
          ================================================== */}

          <h2
            ref={headingRef}
            data-ripple-element
            className="
              futura-medium
              uppercase
              text-[2.65rem]
              leading-none
              tracking-[0.08em]
            "
          >
            Who Are We?
          </h2>

          {/* ==================================================
              DESCRIPTION
          ================================================== */}

          <div
            ref={descriptionRef}
            data-ripple-element
            className="
              futura-light
              mt-14
              max-w-[750px]
            "
          >
            <p
              className="
                text-[18px]
                leading-[1.5]
                md:text-[20px]
              "
            >
              <span className="futura-medium">
                Family Script (FS)
              </span>{" "}
              is a venture of designers,
              historians, architects and
              <br className="hidden md:block" />
              educationists who{" "}
              <span className="futura-medium">
                celebrate non-hegemonic
                histories of individuals
                and collectives.
              </span>
            </p>

            <p
              className="
                mt-7
                text-[18px]
                leading-[1.5]
                md:text-[20px]
              "
            >
              The untold stories of leaders,
              artists and changemakers are
              the
              <br className="hidden md:block" />
              essence of our work.
            </p>
          </div>

          {/* ==================================================
              STATS
          ================================================== */}

          <div
            ref={statsRef}
            data-ripple-element
            className="
              mt-16
              flex
              items-center
              justify-center
              text-white
            "
          >
            <Stat
              target={8}
              suffix="+"
              label="Years of Experience"
              started={
                countStarted
              }
            />

            <div
              className="
                h-14
                w-px
                bg-white/50
              "
              aria-hidden="true"
            />

            <Stat
              target={25}
              suffix="+"
              label="Projects Completed"
              started={
                countStarted
              }
            />

            <div
              className="
                h-14
                w-px
                bg-white/50
              "
              aria-hidden="true"
            />

            <Stat
              target={5}
              suffix="+"
              label="Regions covered"
              started={
                countStarted
              }
            />
          </div>

          {/* ==================================================
              CTA
          ================================================== */}

          <button
            ref={ctaRef}
            data-ripple-element
            type="button"
            className="
              futura-light
              mt-12
              rounded-full
              border
              border-white/40
              bg-white/15
              px-10
              py-4
              text-[15px]
              tracking-[0.05em]
              text-white
              backdrop-blur-sm
              transition-colors
              duration-300
              hover:bg-white/25
            "
          >
            Get your Story{" "}
            <span className="futura-bold">
              Scripted
            </span>

            <span className="ml-3">
              &gt;&gt;
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   STAT
============================================================ */

function Stat({
  target,
  suffix,
  label,
  started,
}: StatProps) {
  const [
    count,
    setCount,
  ] = useState(0);

  useEffect(() => {
    if (!started) {
      setCount(0);
      return;
    }

    let startTime:
      number | null = null;

    let animationFrame =
      0;

    const duration =
      1200;

    const animate = (
      timestamp: number,
    ) => {
      if (
        startTime === null
      ) {
        startTime =
          timestamp;
      }

      const progress =
        Math.min(
          (timestamp -
            startTime) /
            duration,
          1,
        );

      const eased =
        1 -
        Math.pow(
          1 - progress,
          3,
        );

      setCount(
        Math.floor(
          eased * target,
        ),
      );

      if (
        progress < 1
      ) {
        animationFrame =
          requestAnimationFrame(
            animate,
          );
      } else {
        setCount(
          target,
        );
      }
    };

    animationFrame =
      requestAnimationFrame(
        animate,
      );

    return () => {
      cancelAnimationFrame(
        animationFrame,
      );
    };
  }, [
    started,
    target,
  ]);

  return (
    <div
      className="
        px-8
        text-center
        md:px-12
      "
    >
      <div
        className="
          futura-bold
          text-[32px]
          leading-none
          md:text-[36px]
        "
      >
        {count}
        {suffix}
      </div>

      <div
        className="
          futura-light
          mt-3
          whitespace-nowrap
          text-[14px]
          md:text-[15px]
        "
      >
        {label}
      </div>
    </div>
  );
}

