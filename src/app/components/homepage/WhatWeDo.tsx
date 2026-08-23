"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLElement>(null);

  const backgroundRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const headingRef = useRef<HTMLDivElement>(null);
  const rightDescriptionRef = useRef<HTMLDivElement>(null);
  const leftDescriptionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const background = backgroundRef.current;
    const gradient = gradientRef.current;
    const content = contentRef.current;

    const heading = headingRef.current;
    const rightDescription = rightDescriptionRef.current;
    const leftDescription = leftDescriptionRef.current;
    const cta = ctaRef.current;

    if (
      !section ||
      !background ||
      !gradient ||
      !content ||
      !heading ||
      !rightDescription ||
      !leftDescription ||
      !cta
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      /* ==================================================
         BACKGROUND PARALLAX
         ================================================== */

      gsap.fromTo(
        background,
        {
          yPercent: -8,
          scale: 1.08,
        },
        {
          yPercent: 8,
          scale: 1.08,
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        },
      );

      /* ==================================================
         BURGUNDY GRADIENT PARALLAX
         ================================================== */

      gsap.fromTo(
        gradient,
        {
          yPercent: -4,
        },
        {
          yPercent: 4,
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        },
      );

      /* ==================================================
         MAIN CONTENT PARALLAX
         ================================================== */

      gsap.fromTo(
        content,
        {
          y: 35,
        },
        {
          y: -35,
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        },
      );

      /* ==================================================
         HEADING ENTRANCE
         ================================================== */

      gsap.fromTo(
        heading,
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",

          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      /* ==================================================
         RIGHT DESCRIPTION ENTRANCE
         ================================================== */

      gsap.fromTo(
        rightDescription,
        {
          opacity: 0,
          x: 45,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.15,
          ease: "power3.out",

          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );

      /* ==================================================
         LEFT DESCRIPTION ENTRANCE
         ================================================== */

      gsap.fromTo(
        leftDescription,
        {
          opacity: 0,
          x: -45,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",

          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        },
      );

      /* ==================================================
         CTA ENTRANCE
         ================================================== */

      gsap.fromTo(
        cta,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.3,
          ease: "power3.out",

          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* ================= BACKGROUND IMAGE ================= */}
      <div
        ref={backgroundRef}
        className="absolute inset-[-8%] bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/homepage/WHAT_WE_DO.jpg')",
        }}
      />

      {/* ================= BURGUNDY OVERLAY ================= */}
      <div
        ref={gradientRef}
        className="absolute inset-[-4%]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(59, 20, 37, 0.78) 0%, rgba(59, 20, 37, 0.58) 30%, rgba(59, 20, 37, 0.38) 65%, rgba(59, 20, 37, 0.28) 100%)",
        }}
      />

      {/* ================= DARK OVERLAY ================= */}
      <div className="absolute inset-0 bg-black/10" />

      {/* ================= MAIN CONTENT ================= */}
      <div
        ref={contentRef}
        className="relative z-10 min-h-screen w-full text-white"
      >
        {/* ================= HEADING ================= */}
        <div
          ref={headingRef}
          className="absolute left-[25.5%] top-[12%] flex h-[33%] w-[19%] items-center justify-center text-center"
          style={{
            background: "rgba(150, 95, 38, 0.58)",
          }}
        >
          <h2 className="futura-light uppercase text-[3.7vw] leading-[1.18] tracking-[0.03em]">
            WHAT
            <br />
            WE
            <br />
            DO?
          </h2>
        </div>

        {/* ================= RIGHT DESCRIPTION ================= */}
        <div
          ref={rightDescriptionRef}
          className="absolute right-[12.5%] top-[34%] flex h-[33%] w-[37%] items-center justify-center px-12 text-center"
          style={{
            background: "rgba(150, 95, 38, 0.48)",
          }}
        >
          <p className="futura-light text-[1.65vw] leading-[1.35]">
            We explore <span className="futura-medium">Individual and</span>
            <br />
            <span className="futura-medium">Institutional legacies</span>{" "}
            through social
            <br />
            and spatial documentation.
          </p>
        </div>

        {/* ================= LEFT DESCRIPTION ================= */}
        <div
          ref={leftDescriptionRef}
          className="absolute bottom-0 left-0 flex h-[44%] w-[38%] items-center justify-center px-[5%] text-center"
          style={{
            background: "rgba(54, 20, 42, 0.52)",
          }}
        >
          <div className="futura-light text-[1.55vw] leading-[1.42]">
            <p>
              We develop forward-looking
              <br />
              retrospectives to{" "}
              <span className="futura-medium">create a legacy</span> from
              <br />
              lesser-known histories. Our process is
              <br />
              <span className="futura-medium">
                interactive, collaborative and an
              </span>
              <br />
              <span className="futura-medium">
                experience worth undertaking.
              </span>
            </p>

            <p className="mt-8">
              We are empathetic listeners,{" "}
              <span className="futura-medium">
                We co-
                <br />
                create with you.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
