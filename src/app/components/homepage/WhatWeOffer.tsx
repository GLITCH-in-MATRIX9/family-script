// components/homepage/WhatWeOffer.tsx

"use client";

import Link from "next/link";

import {
  useEffect,
  useRef,
} from "react";

import gsap from "gsap";

import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";

gsap.registerPlugin(
  ScrollTrigger,
);

/* ============================================================
   COMPONENT
============================================================ */

export default function WhatWeOffer() {
  /*
   * IMPORTANT:
   *
   * page.tsx owns the actual homepage section:
   *
   * <section data-home-section="3">
   *   <WhatWeOffer />
   * </section>
   *
   * Therefore this component uses a DIV as its root.
   *
   * DO NOT add data-home-section here.
   */

  const sectionRef =
    useRef<HTMLDivElement>(
      null,
    );

  const backgroundRef =
    useRef<HTMLDivElement>(
      null,
    );

  const gradientRef =
    useRef<HTMLDivElement>(
      null,
    );

  const contentRef =
    useRef<HTMLDivElement>(
      null,
    );

  const headingRef =
    useRef<HTMLHeadingElement>(
      null,
    );

  const introRef =
    useRef<HTMLDivElement>(
      null,
    );

  const servicesRef =
    useRef<HTMLDivElement>(
      null,
    );

  /* ==========================================================
     GSAP
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

    const intro =
      introRef.current;

    const services =
      servicesRef.current;

    if (
      !section ||
      !background ||
      !gradient ||
      !content ||
      !heading ||
      !intro ||
      !services
    ) {
      return;
    }

    /*
     * Find service cards.
     */

    const boxes =
      services.querySelectorAll<HTMLElement>(
        ".service-box",
      );

    const ctx =
      gsap.context(
        () => {
          /* ==================================================
             INITIAL STATES
          ================================================== */

          /*
           * IMPORTANT:
           *
           * The background itself is NOT animated.
           *
           * It stays exactly where it is and exactly
           * the same size as the page.tsx section.
           */

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
            },
          );

          /*
           * Content animation.
           */

          gsap.set(
            heading,
            {
              opacity: 0,
              y: 45,
              scale: 0.98,
            },
          );

          gsap.set(
            intro,
            {
              opacity: 0,
              y: 35,
            },
          );

          /*
           * Keep the service container visible.
           *
           * Individual cards animate instead.
           */

          gsap.set(
            services,
            {
              opacity: 1,
            },
          );

          gsap.set(
            boxes,
            {
              opacity: 0,
              y: 30,
              scale: 0.97,
            },
          );

          /* ==================================================
             ENTRANCE TIMELINE
          ================================================== */

          const entrance =
            gsap.timeline({
              paused: true,
            });

          /*
           * --------------------------------------------------
           * HEADING
           * --------------------------------------------------
           */

          entrance.to(
            heading,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
            },
          );

          /*
           * --------------------------------------------------
           * INTRO
           * --------------------------------------------------
           */

          entrance.to(
            intro,
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
            },
            "-=0.58",
          );

          /*
           * --------------------------------------------------
           * SERVICE BOXES
           * --------------------------------------------------
           */

          entrance.to(
            boxes,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              stagger: {
                each: 0.09,
                from: "start",
              },
              ease: "power3.out",
            },
            "-=0.35",
          );

          /* ==================================================
             SECTION ENTRANCE TRIGGER
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
             * Don't reset everything to the invisible
             * starting state when navigating backwards.
             *
             * Ripple navigation can bring this section
             * into view without a normal browser scroll.
             */
          });

          

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
        overflow-hidden
      "
    >
      {/* ======================================================
          BACKGROUND IMAGE
          
          EXACTLY MATCHES PAGE.TSX SECTION
          
          page.tsx:
          
          h-screen
          min-h-screen
          w-full
          overflow-hidden
          
          Therefore:
          
          inset-0
          w-full
          h-full
          
          No oversizing.
          No movement.
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
            "url('/assets/Homepage/WHAT_WE_OFFER.jpg')",

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
          COLOURISATION / MAROON GRADIENT
          
          STATIC.
          
          This is what gives the image the burgundy /
          maroon colourised appearance.
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
            "linear-gradient(to bottom, rgba(83, 36, 57, 0.78) 0%, rgba(83, 36, 57, 0.80) 35%, rgba(83, 36, 57, 0.10) 70%, rgba(83, 36, 57, 0.10) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ======================================================
          SUBTLE DARK OVERLAY
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
          MAIN CONTENT
          
          data-ripple-element allows the ripple transition
          to reveal the actual content.
      ====================================================== */}

      <div
        ref={contentRef}
        data-ripple-element
        className="
          relative
          z-10
          h-full
          min-h-full
          w-full
          text-white
        "
      >
        {/* ====================================================
            HEADING
        ==================================================== */}

        <h2
          ref={headingRef}
          className="
            futura-light
            absolute
            left-0
            right-0
            top-[22%]
            text-center
            text-[3.6vw]
            uppercase
            leading-none
            tracking-[0.04em]
          "
        >
          WHAT WE OFFER?
        </h2>

        {/* ====================================================
            INTRO TEXT
        ==================================================== */}

        <div
          ref={introRef}
          className="
            futura-light
            absolute
            left-0
            right-0
            top-[37%]
            text-center
            text-[1.55vw]
            leading-[1.5]
          "
        >
          <p>
            A nonlinear, open-ended
            process
          </p>

          <p>
            Recording Oral History and
            Material Memory
          </p>

          <p>
            Driving a{" "}
            <span
              className="
                futura-medium
                font-black
                text-[#E9C892]
              "
            >
              “Moving Methodology”
            </span>
          </p>
        </div>

        {/* ====================================================
            SERVICES GRID
        ==================================================== */}

        <div
          ref={servicesRef}
          className="
            absolute
            left-1/2
            top-[56%]
            grid
            w-[75%]
            -translate-x-1/2
            grid-cols-3
            gap-x-[15%]
            gap-y-10
          "
        >
          {/* ==================================================
              ROW 1
          ================================================== */}

          {/* --------------------------------------------------
              MEMOIRS
          -------------------------------------------------- */}

          <div>
            <ServiceBox>
              Memoirs, Anthologies,
              <br />
              Biographies
            </ServiceBox>
          </div>

          {/* --------------------------------------------------
              DOCUMENTARIES
          -------------------------------------------------- */}

          <div>
            <ServiceBox>
              Documentaries,
              <br />
              Short Films
            </ServiceBox>
          </div>

          {/* --------------------------------------------------
              DIGITAL ARCHIVE
          -------------------------------------------------- */}

          <div>
            <ServiceBox>
              Digital Archive
              Services
            </ServiceBox>
          </div>

          {/* ==================================================
              ROW 2
          ================================================== */}

          {/* --------------------------------------------------
              EXHIBITION
          -------------------------------------------------- */}

          <div>
            <ServiceBox>
              Exhibition Design
            </ServiceBox>
          </div>

          {/* --------------------------------------------------
              WORKSHOPS
          -------------------------------------------------- */}

          <div>
            <ServiceBox>
              Life Writing
              Workshops
            </ServiceBox>
          </div>

          {/* --------------------------------------------------
              BESPOKE JOURNALS
          -------------------------------------------------- */}

          <Link
            href="/products"
            className="
              block
              cursor-pointer
            "
          >
            <ServiceBox>
              Bespoke Journals
            </ServiceBox>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SERVICE BOX
============================================================ */

function ServiceBox({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        service-box
        futura-light
        flex
        h-[100px]
        items-center
        justify-center
        rounded-[10px]
        bg-[rgba(72,58,70,0.55)]
        px-5
        text-center
        text-[1.15vw]
        leading-[1.35]
        transition-all
        duration-300
        hover:bg-[rgba(72,58,70,0.7)]
      "
    >
      {children}
    </div>
  );
}