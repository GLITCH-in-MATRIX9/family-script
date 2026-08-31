"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   COMPONENT
============================================================ */

export default function WhatWeDo() {
  /* ============================================================
     REFS
  ============================================================ */

  /*
   * page.tsx owns the actual homepage section:
   *
   * <section data-home-section="2">
   *   <WhatWeDo />
   * </section>
   *
   * Therefore this component uses a DIV as its root.
   */

  const sectionRef = useRef<HTMLDivElement | null>(null);

  const contentRef = useRef<HTMLDivElement | null>(null);

  const titleRef = useRef<HTMLDivElement | null>(null);

  const rightTextRef = useRef<HTMLDivElement | null>(null);

  const leftTextRef = useRef<HTMLDivElement | null>(null);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const topLeftBoxRef = useRef<HTMLDivElement | null>(null);

  const topRightBoxRef = useRef<HTMLDivElement | null>(null);

  const bottomRightBoxRef = useRef<HTMLDivElement | null>(null);

  const bottomLeftBoxRef = useRef<HTMLDivElement | null>(null);

  /* ============================================================
     GSAP
  ============================================================ */

  useEffect(() => {
    const section = sectionRef.current;

    const content = contentRef.current;

    const title = titleRef.current;

    const rightText = rightTextRef.current;

    const leftText = leftTextRef.current;

    const button = buttonRef.current;

    const topLeftBox = topLeftBoxRef.current;

    const topRightBox = topRightBoxRef.current;

    const bottomRightBox = bottomRightBoxRef.current;

    const bottomLeftBox = bottomLeftBoxRef.current;

    if (
      !section ||
      !content ||
      !title ||
      !rightText ||
      !leftText ||
      !button ||
      !topLeftBox ||
      !topRightBox ||
      !bottomRightBox ||
      !bottomLeftBox
    ) {
      return;
    }

    const context = gsap.context(() => {
      /* ==================================================
             INITIAL CONTENT STATE
          ================================================== */

      gsap.set([topLeftBox, topRightBox, bottomRightBox, bottomLeftBox], {
        opacity: 0,
      });

      gsap.set(title, {
        opacity: 0,
        y: 35,
        scale: 0.96,
      });

      gsap.set(rightText, {
        opacity: 0,
        x: 40,
      });

      gsap.set(leftText, {
        opacity: 0,
        x: -40,
      });

      gsap.set(button, {
        opacity: 0,
        y: 20,
        scale: 0.96,
      });

      /* ==================================================
             ENTRANCE TIMELINE
          ================================================== */

      const entrance = gsap.timeline({
        paused: true,
      });

      /* --------------------------------------------------
             TRANSPARENT COMPOSITION BOXES
          -------------------------------------------------- */

      entrance.to([topLeftBox, topRightBox, bottomRightBox, bottomLeftBox], {
        opacity: 1,
        duration: 0.65,
        ease: "power2.out",
        stagger: 0.04,
      });

      /* --------------------------------------------------
             WHAT WE DO TITLE
          -------------------------------------------------- */

      entrance.to(
        title,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.35",
      );

      /* --------------------------------------------------
             RIGHT SIDE TEXT
          -------------------------------------------------- */

      entrance.to(
        rightText,
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.52",
      );

      /* --------------------------------------------------
             LEFT SIDE TEXT
          -------------------------------------------------- */

      entrance.to(
        leftText,
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.62",
      );

      /* --------------------------------------------------
             CTA
          -------------------------------------------------- */

      entrance.to(
        button,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          ease: "power3.out",
        },
        "-=0.45",
      );

      /* ==================================================
             SECTION ENTRANCE
             
             This controls ONLY the content animation.
             
             It does NOT animate the background.
          ================================================== */

      ScrollTrigger.create({
        trigger: section,

        start: "top 85%",

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
         * This avoids fighting with the homepage
         * ripple navigation.
         */
      });

      /* ==================================================
             NO BACKGROUND PARALLAX
             
             The background intentionally has NO GSAP
             animation.
             
             It remains completely fixed.
          ================================================== */

      /* ==================================================
             NO GRADIENT PARALLAX
             
             The colourisation also remains completely fixed.
          ================================================== */

      /* ==================================================
             NO CONTENT PARALLAX
             
             The entrance animation above is sufficient.
             
             Keeping the composition stable makes the
             background appear completely still.
          ================================================== */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

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
        
      "
    >
      {/* ======================================================
          BACKGROUND IMAGE

          EXACT SAME SIZE AS PAGE.TSX SECTION.

          page.tsx owns:

          h-screen
          min-h-screen
          w-full
          

          Therefore this background uses:

          inset-0
          h-full
          w-full

          No oversizing.
          No scaling.
          No movement.
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          h-full
          w-full
          
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage: "url('/assets/Homepage/WHAT_WE_DO.jpg')",

          backgroundSize: "cover",

          backgroundPosition: "center center",

          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
      />

      {/* ======================================================
          STATIC MAROON / BURGUNDY COLOURISATION

          This does NOT move.

          It simply colourises the background image.
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          h-full
          w-full
        "
        style={{
          background:
            "linear-gradient(to bottom, rgba(83, 36, 57, 0.90) 0%, rgba(83, 36, 57, 0.80) 30%, rgba(83, 36, 57, 0.20) 65%, rgba(83, 36, 57, 0.10) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ======================================================
          STATIC DARK OVERLAY
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
          MAIN COMPOSITION

          Ripple transition reveals these elements.

          Background remains independent and static.
      ====================================================== */}

      <div
        ref={contentRef}
        className="
          absolute
          inset-0
          z-10
        "
      >
        {/* ====================================================
            LEFT DARK TRANSPARENT BLOCK
        ==================================================== */}

        <div
          ref={topLeftBoxRef}
          className="
            absolute
            left-0
            top-[23%]
            h-[33%]
            w-[19%]
          "
          style={{
            background: "rgba(18, 15, 32, 0.58)",

            backdropFilter: "blur(1px)",

            WebkitBackdropFilter: "blur(1px)",
          }}
        />

        {/* ====================================================
            TITLE BOX
        ==================================================== */}

        <div
          ref={titleRef}
          data-ripple-element
          className="
            absolute
            left-[25.2%]
            top-[12%]
            flex
            h-[33%]
            w-[19%]
            items-center
            justify-center
            text-center
          "
          style={{
            background: "rgba(164, 103, 40, 0.70)",
          }}
        >
          <h2
            className="
              futura-light
              uppercase
              text-[3.7vw]
              leading-[1.18]
              tracking-[0.02em]
              text-white
            "
          >
            WHAT
            <br />
            WE
            <br />
            DO?
          </h2>
        </div>

        {/* ====================================================
            TOP RIGHT WHITE TRANSPARENT BLOCK
        ==================================================== */}

        <div
          ref={topRightBoxRef}
          className="
            absolute
            right-0
            top-0
            h-[33%]
            w-[19%]
          "
          style={{
            background: "rgba(255, 255, 255, 0.42)",

            backdropFilter: "blur(2px)",

            WebkitBackdropFilter: "blur(2px)",
          }}
        />

        {/* ====================================================
            RIGHT GOLD CONTENT BLOCK
        ==================================================== */}

        <div
          ref={rightTextRef}
          data-ripple-element
          className="
            absolute
            right-[12.7%]
            top-[33.5%]
            flex
            h-[33.5%]
            w-[37%]
            items-center
            justify-center
            px-[4%]
            text-center
          "
          style={{
            background: "rgba(174, 111, 32, 0.62)",
          }}
        >
          <p
            className="
              futura-light
              max-w-[360px]
              text-[15px]
              leading-[1.35]
              text-white
              md:text-[17px]
              lg:text-[18px]
            "
          >
            We explore{" "}
            <span className="futura-medium">
              Individual and
              <br />
              Institutional legacies
            </span>{" "}
            through social
            <br />
            and spatial documentation.
          </p>
        </div>

        {/* ====================================================
            RIGHT BOTTOM WHITE TRANSPARENT BLOCK
        ==================================================== */}

        <div
          ref={bottomRightBoxRef}
          className="
            absolute
            bottom-0
            right-0
            h-[33%]
            w-[19%]
          "
          style={{
            background: "rgba(255, 255, 255, 0.40)",

            backdropFilter: "blur(2px)",

            WebkitBackdropFilter: "blur(2px)",
          }}
        />

        {/* ====================================================
            RIGHT VERTICAL LIGHT PANEL
        ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-[33%]
            h-[34%]
            w-[19%]
          "
          style={{
            background: "rgba(255, 255, 255, 0.12)",
          }}
        />

        {/* ====================================================
            LEFT BOTTOM GOLD CONTENT BLOCK
        ==================================================== */}

        <div
          ref={leftTextRef}
          data-ripple-element
          className="
            absolute
            bottom-0
            left-0
            flex
            h-[44%]
            w-[37.8%]
            flex-col
            justify-center
            px-[5.5%]
            py-8
            text-center
          "
          style={{
            background: "rgba(169, 107, 33, 0.57)",
          }}
        >
          <p
            className="
              futura-light
              text-[15px]
              leading-[1.45]
              text-white
              md:text-[17px]
              lg:text-[18px]
            "
          >
            We develop forward-looking
            <br />
            perspectives to create a legacy from
            <br />
            lesser-known histories. Our process is
            <br />
            interactive, collaborative and an
            <br />
            experience worth undertaking.
          </p>

          <p
            className="
              futura-light
              mt-6
              text-[15px]
              leading-[1.45]
              text-white
              md:text-[17px]
              lg:text-[18px]
            "
          >
            We are empathetic listeners,{" "}
            <span className="futura-medium">
              We co-
              <br />
              create with you.
            </span>
          </p>
        </div>

        {/* ====================================================
            CTA
        ==================================================== */}

        <button
          ref={buttonRef}
          data-ripple-element
          type="button"
          className="
            futura-light
            absolute
            bottom-[5.5%]
            left-[41.8%]
            rounded-full
            border
            border-white/35
            bg-white/15
            px-6
            py-2
            text-[11px]
            tracking-[0.02em]
            text-white
            backdrop-blur-md
            transition-all
            duration-300
            hover:border-white/60
            hover:bg-white/25
            md:px-7
            md:py-2.5
            md:text-[12px]
          "
        >
          Get your Story <span className="futura-bold">Scripted</span>
          <span className="ml-2">&gt;&gt;</span>
        </button>
      </div>
    </div>
  );
}
