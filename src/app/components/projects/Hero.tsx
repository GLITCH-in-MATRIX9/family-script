"use client";

import Link from "next/link";
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";

const projects = [
  {
    title: "BIOGRAPHICAL",
    image: "/assets/PROJECTS/BIOGRAPHICAL.png",
    href: "/projects/biographical",
  },
  {
    title: "INSTITUTIONAL",
    image: "/assets/projects/INSTITUTIONAL.png",
    href: "/projects/institutional",
  },
  {
    title: "EVENTS",
    image: "/assets/projects/EVENTS.png",
    href: "/projects/events",
  },
];

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#32141f] text-white">
      {/* =========================================================
          BACKGROUND
          ========================================================= */}

      <div className="pointer-events-none absolute inset-0">
        {/* Top burgundy */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #431827 0%, #3b1724 38%, #2b1821 72%, #171319 100%)",
          }}
        />

        {/* Subtle center glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(119,57,65,0.12), transparent 55%)",
          }}
        />

        {/* Bottom darkness */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 55%, rgba(10,8,10,0.32) 100%)",
          }}
        />
      </div>

      {/* =========================================================
          MAIN CONTENT
          ========================================================= */}

      <section className="relative z-10 mx-auto min-h-screen w-full max-w-[1500px] px-8 pb-24 pt-28 md:px-[6%] md:pt-[7%]">
        {/* =====================================================
            BREADCRUMB
            ===================================================== */}

        <div className="mb-10 flex items-center gap-2">
          <Link
            href="/"
            className="futura-light text-[12px] uppercase tracking-wide text-white/35 transition-colors duration-300 hover:text-white/70 md:text-[13px]"
          >
            Home
          </Link>

          <span className="futura-light text-[12px] text-white/30 md:text-[13px]">
            &gt;&gt;
          </span>

          <span className="futura-light text-[12px] uppercase tracking-wide text-white/35 md:text-[13px]">
            Projects
          </span>
        </div>

        {/* =====================================================
            INTRO
            ===================================================== */}

        <div className="max-w-[650px]">
          {/* BEYOND THE */}
          <p className="futura-light text-[14px] uppercase tracking-[0.48em] text-white/90 md:text-[18px]">
            Beyond The
          </p>

          {/* PROJECTS */}
          <h1 className="futura-bold mt-3 text-[52px] uppercase leading-none tracking-[0.01em] text-[#e7ad55] md:text-[64px] lg:text-[68px]">
            Projects
          </h1>

          {/* DESCRIPTION */}
          <p className="futura-light mt-9 max-w-[620px] text-[17px] leading-[1.6] tracking-wide text-white/65 md:text-[19px]">
            From concept to completion, we preserve the people, purpose, and
            journey of every project.
          </p>
        </div>

        {/* =====================================================
            PROJECT GRID
            ===================================================== */}

        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-3 md:gap-x-[6%] md:gap-y-0">
          {projects.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              className="group block"
            >
              {/* IMAGE */}
              <div className="relative aspect-[1.35/1] w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                />

                {/* Subtle image overlay */}
                <div className="absolute inset-0 bg-black/5 transition-colors duration-500 group-hover:bg-black/0" />
              </div>

              {/* TITLE */}
              <div className="mt-5 text-center">
                <h2 className="futura-light text-[18px] uppercase tracking-[0.35em] text-white md:text-[20px]">
                  {project.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
