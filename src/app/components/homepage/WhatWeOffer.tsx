"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhatWeOffer() {
  const sectionRef = useRef<HTMLElement>(null);

  const backgroundRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const background = backgroundRef.current;
    const gradient = gradientRef.current;
    const content = contentRef.current;

    const heading = headingRef.current;
    const intro = introRef.current;
    const services = servicesRef.current;

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
        }
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
        }
      );


      /* ==================================================
         INTRO TEXT ENTRANCE
         ================================================== */

      gsap.fromTo(
        intro,
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
         SERVICES GRID ENTRANCE
         ================================================== */

      gsap.fromTo(
        services,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
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
         INDIVIDUAL SERVICE BOXES
         ================================================== */

      const boxes = services.querySelectorAll(".service-box");

      gsap.fromTo(
        boxes,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",

          scrollTrigger: {
            trigger: services,
            start: "top 75%",
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
          backgroundImage: "url('/assets/homepage/WHAT WE OFFER.jpg')",
        }}
      />


      {/* ================= BURGUNDY OVERLAY ================= */}
      <div
        ref={gradientRef}
        className="absolute inset-[-4%]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(59, 20, 37, 0.78) 0%, rgba(59, 20, 37, 0.62) 35%, rgba(59, 20, 37, 0.52) 70%, rgba(59, 20, 37, 0.62) 100%)",
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
        <h2
          ref={headingRef}
          className="futura-light absolute left-0 right-0 top-[22%] text-center text-[3.6vw] uppercase leading-none tracking-[0.04em]"
        >
          WHAT WE OFFER?
        </h2>


        {/* ================= INTRO TEXT ================= */}
        <div
          ref={introRef}
          className="futura-light absolute left-0 right-0 top-[37%] text-center text-[1.55vw] leading-[1.5]"
        >

          <p>
            A nonlinear, open-ended process
          </p>

          <p>
            Recording Oral History and Material Memory
          </p>

          <p>
            Driving a{" "}
            <span className="futura-medium">
              “Moving Methodology”
            </span>
          </p>

        </div>


        {/* ================= SERVICES GRID ================= */}
        <div
          ref={servicesRef}
          className="absolute left-1/2 top-[56%] grid w-[75%] -translate-x-1/2 grid-cols-3 gap-x-[15%] gap-y-10"
        >

          {/* ================= ROW 1 ================= */}

          <Link href="#" className="block">
            <ServiceBox>
              Memoirs, Anthologies,
              <br />
              Biographies
            </ServiceBox>
          </Link>


          <Link href="#" className="block">
            <ServiceBox>
              Documentaries,
              <br />
              Short Films
            </ServiceBox>
          </Link>


          <Link href="#" className="block">
            <ServiceBox>
              Digital Archive Services
            </ServiceBox>
          </Link>


          {/* ================= ROW 2 ================= */}

          <Link href="#" className="block">
            <ServiceBox>
              Exhibition Design
            </ServiceBox>
          </Link>


          <Link href="#" className="block">
            <ServiceBox>
              Life Writing Workshops
            </ServiceBox>
          </Link>


          <Link href="/products" className="block">
            <ServiceBox>
              Bespoke Journals
            </ServiceBox>
          </Link>

        </div>

      </div>

    </section>
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
    <div className="service-box futura-light flex h-[100px] items-center justify-center rounded-[10px] bg-[rgba(72,58,70,0.55)] px-5 text-center text-[1.15vw] leading-[1.35] transition-all duration-300 hover:bg-[rgba(72,58,70,0.7)]">
      {children}
    </div>
  );
}