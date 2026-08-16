"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhoAreWe() {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const [countStarted, setCountStarted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const background = backgroundRef.current;
    const gradient = gradientRef.current;
    const content = contentRef.current;
    const heading = headingRef.current;
    const description = descriptionRef.current;
    const stats = statsRef.current;
    const cta = ctaRef.current;

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
        }
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
        }
      );


      /* ==================================================
         CONTENT PARALLAX
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
        }
      );


      /* ==================================================
         HEADING ENTRY
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
        }
      );


      /* ==================================================
         DESCRIPTION ENTRY
         ================================================== */

      gsap.fromTo(
        description,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.15,
          ease: "power3.out",

          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );


      /* ==================================================
         STATISTICS ENTRY
         ================================================== */

      gsap.fromTo(
        stats,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.25,
          ease: "power3.out",

          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );


      /* ==================================================
         CTA ENTRY
         ================================================== */

      gsap.fromTo(
        cta,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.35,
          ease: "power3.out",

          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
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
          backgroundImage: "url('/assets/homepage/Who_are_we.JPG')",
        }}
      />


      {/* ================= BURGUNDY GRADIENT ================= */}
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
        className="relative z-10 flex min-h-screen flex-col items-center text-center text-white"
      >

        <main className="flex w-full flex-1 flex-col items-center px-6 pt-[22vh] pb-12">

          {/* ================= HEADING ================= */}
          <h2
            ref={headingRef}
            className="futura-medium uppercase text-[2.65rem] leading-none tracking-[0.08em]"
          >
            Who Are We?
          </h2>


          {/* ================= DESCRIPTION ================= */}
          <div
            ref={descriptionRef}
            className="futura-light mt-14 max-w-[750px] text-center"
          >

            {/* FIRST PARAGRAPH */}
            <p className="text-[18px] leading-[1.5] md:text-[20px]">

              <span className="futura-medium">
                Family Script (FS)
              </span>{" "}

              is a venture of designers, historians, architects and

              <br className="hidden md:block" />

              educationists who{" "}

              <span className="futura-medium">
                celebrate non-hegemonic histories of individuals and
                collectives.
              </span>

            </p>


            {/* SECOND PARAGRAPH */}
            <p className="mt-7 text-[18px] leading-[1.5] md:text-[20px]">

              The untold stories of leaders, artists and changemakers are the

              <br className="hidden md:block" />

              essence of our work.

            </p>

          </div>


          {/* ================= STATISTICS ================= */}
          <div
            ref={statsRef}
            className="mt-16 flex items-center justify-center text-white"
          >

            {/* ================= 8+ ================= */}
            <Stat
              target={8}
              suffix="+"
              label="Years of Experience"
              started={countStarted}
            />


            {/* DIVIDER */}
            <div className="h-14 w-px bg-white/50" />


            {/* ================= 25+ ================= */}
            <Stat
              target={25}
              suffix="+"
              label="Projects Completed"
              started={countStarted}
            />


            {/* DIVIDER */}
            <div className="h-14 w-px bg-white/50" />


            {/* ================= 5+ ================= */}
            <Stat
              target={5}
              suffix="+"
              label="Regions covered"
              started={countStarted}
            />

          </div>


          {/* ================= CTA ================= */}
          <button
            ref={ctaRef}
            className="futura-light mt-12 rounded-full border border-white/40 bg-white/15 px-10 py-4 text-[15px] tracking-[0.05em] text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/25"
          >

            Get your Story{" "}

            <span className="futura-bold">
              Scripted
            </span>

            <span className="ml-3">
              &gt;&gt;
            </span>

          </button>

        </main>

      </div>

    </section>
  );
}


/* =========================================================
   ANIMATED STATISTIC
   ========================================================= */

function Stat({
  target,
  suffix,
  label,
  started,
}: {
  target: number;
  suffix: string;
  label: string;
  started: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;

    let startTime: number | null = null;

    const duration = 1400;

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(easedProgress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [started, target]);

  return (
    <div className="px-8 text-center md:px-12">

      {/* NUMBER */}
      <div className="futura-bold text-[32px] leading-none md:text-[36px]">
        {count}
        {suffix}
      </div>


      {/* LABEL */}
      <div className="futura-light mt-3 whitespace-nowrap text-[14px] md:text-[15px]">
        {label}
      </div>

    </div>
  );
}