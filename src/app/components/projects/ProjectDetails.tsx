// app/components/projects/ProjectDetails.tsx
"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import type { Project } from "../../../data/projects";
import { splitHeadingLines } from "../../utils/splitHeading";

type ProjectDetailsProps = {
  project: Project;
  animateEntrance?: boolean;
};

export default function ProjectDetails({
  project,
  animateEntrance = false,
}: ProjectDetailsProps) {
  const gallery = project.gallery;

  // Read more / read less. Keyed by slug so the state resets when
  // navigating between projects (same component instance is reused).
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const expanded = expandedSlug === project.slug;
  const hasMore = project.description.length > 1;
  const toggleExpanded = () => setExpandedSlug(expanded ? null : project.slug);

  return (
    <main
      className={`
        relative
        min-h-screen
        w-full
        overflow-x-hidden
        bg-[#3c1a26]
        text-white
        md:bg-transparent
        ${animateEntrance ? "biographical-appear" : ""}
      `}
    >
      {/* =========================================================
          DESKTOP BACKGROUND ONLY
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 z-0 hidden md:block">
        <img
          src={project.coverImage}
          alt=""
          className="h-full w-full object-cover"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(38,2,21,0.86) 0%, rgba(53,3,25,0.84) 40%, rgba(64,3,31,0.9) 75%, rgba(72,4,36,0.94) 100%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(72,4,36,0.18) 0%, rgba(35,2,20,0.18) 100%)",
          }}
        />
      </div>

      {/* =========================================================
          DESKTOP VERSION
      ========================================================= */}

      <section
        className={`
          relative
          z-10
          mx-auto
          hidden
          min-h-screen
          w-full
          max-w-[1350px]
          px-6
          pb-10
          pt-24
          sm:px-8
          sm:pt-28
          lg:flex
          lg:flex-col
          lg:px-[6%]
          lg:pt-28
          ${animateEntrance ? "biographical-appear-item" : ""}
        `}
      >
        {/* BREADCRUMB */}

        <div className="mb-6 flex items-center gap-2 md:mb-7">
          <Link
            href="/"
            className="
              futura-light
              text-[10px]
              uppercase
              tracking-wide
              text-white/45
              transition-colors
              hover:text-white
              md:text-[13px]
            "
          >
            Home
          </Link>

          <span className="futura-light text-[10px] text-white/25 md:text-[13px]">
            &gt;&gt;
          </span>

          <Link
            href="/projects"
            className="
      futura-light
      text-[10px]
      uppercase
      tracking-wide
      text-white/45
      transition-colors
      hover:text-white
      md:text-[13px]
    "
          >
            Projects
          </Link>

          <span className="futura-light text-[10px] text-white/25 md:text-[13px]">
            &gt;&gt;
          </span>

          <Link
            href={`/projects/${project.category.toLowerCase()}`}
            className="
      futura-light
      text-[10px]
      uppercase
      tracking-wide
      text-white/45
      transition-colors
      hover:text-white
      md:text-[13px]
    "
          >
            {project.category}
          </Link>

          <span className="futura-light text-[10px] text-white/25 md:text-[13px]">
            &gt;&gt;
          </span>

          <span
            className="
      futura-light
      text-[10px]
      uppercase
      tracking-wide
      text-white
      md:text-[13px]
    "
          >
            {project.title}
          </span>
        </div>

        {/* DESKTOP CONTENT */}

        <div
          className={`
            flex
            w-full
            flex-col
            gap-10
            lg:flex-1
            lg:flex-row
            lg:items-stretch
            lg:gap-12
            ${animateEntrance ? "biographical-appear-item" : ""}
          `}
        >
          {/* LEFT SIDE */}

          <div
            className="
              mt-12
              flex
              w-full
              shrink-0
              flex-col
              justify-end
              md:mt-12
              lg:mt-0
              lg:w-[42%]
              lg:pt-0
            "
          >
            <h1
              className="
                futura-semibold
                max-w-auto
                text-[20px]
                uppercase
                leading-[0.92]
                tracking-[0.015em]
                text-[#e3a94f]
                sm:text-[40px]
                md:text-[42px]
                lg:text-[50px]
                xl:text-[40px]
              "
            >
              {splitHeadingLines(project.title).map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <div
              className="
    mt-5
    flex
    flex-row
    items-center
    justify-between
    lg:mt-6
  "
            >
              <span
                className="
      futura-light
      text-[10px]
      uppercase
      tracking-wide
      text-white/75
      md:text-[14px]
      lg:text-[12px]
    "
              >
                {project.subtitle}
              </span>

              {project.location && (
                <span
                  className="
        futura-light
        text-[10px]
        uppercase
        tracking-wide
        text-white/75
        md:text-[14px]
        lg:text-[12px]
      "
                >
                  {project.location}
                </span>
              )}
            </div>

            <div
              className="
                mt-7
                max-w-auto
                space-y-5
                lg:mt-8
                lg:space-y-5
              "
            >
              {project.description[0] && (
                <p
                  className="
                    futura-light
                    text-[11px]
                    leading-[1.5]
                    tracking-wide
                    text-white/80
                    sm:text-[12px]
                    md:text-[17px]
                    lg:text-[14px]
                  "
                >
                  {project.description[0]}
                </p>
              )}

              {hasMore && (
                <div
                  className={`grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-500 ease-out ${
                    expanded
                      ? "mt-5 grid-rows-[1fr] opacity-100"
                      : "mt-0 grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0 space-y-5">
                    {project.description.slice(1).map((paragraph, index) => (
                      <p
                        key={`${paragraph}-${index}`}
                        className="
                          futura-light
                          text-[11px]
                          leading-[1.5]
                          tracking-wide
                          text-white/80
                          sm:text-[12px]
                          md:text-[17px]
                          lg:text-[14px]
                        "
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {hasMore && (
              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={toggleExpanded}
                  aria-expanded={expanded}
                  className="
                    futura-light
                    text-[12px]
                    tracking-wide
                    text-white/60
                    transition-colors
                    duration-300
                    hover:text-white
                    cursor-pointer
                  "
                >
                  {expanded ? "Read less <<" : "Read more >>"}
                </button>
              </div>
            )}
          </div>

          {/* DESKTOP GALLERY */}

          <div className="w-full lg:w-[58%]">
            <div
              className={`
                mx-auto
                grid
                w-full
                grid-cols-3
                gap-2
                md:gap-2.5
                lg:gap-3
                ${animateEntrance ? "biographical-appear-gallery" : ""}
              `}
            >
              <GalleryImage
                src={gallery[0]?.image}
                alt={`${project.title} - 1`}
                className="
                  col-start-1
                  row-start-1
                  aspect-[1.40/0.87]
                "
              />

              <GalleryImage
                src={gallery[1]?.image}
                alt={`${project.title} - 2`}
                className="
                  col-start-2
                  row-start-1
                  aspect-[1.40/0.87]
                "
              />

              <GalleryImage
                src={gallery[2]?.image}
                alt={`${project.title} - 3`}
                className="
                  col-start-3
                  row-start-1
                  aspect-[1.40/0.87]
                "
              />

              <div
                className="
                  col-start-1
                  col-span-2
                  row-span-2
                  row-start-2
                  min-h-[360px]
                  flex
                  items-center
                  justify-center
                  overflow-hidden
                "
              >
                {project.bookImage && (
                  <BookTilt className="h-full w-full">
                    <img
                      src={project.bookImage}
                      alt={`${project.title} book`}
                      className="h-full w-full max-h-full max-w-full object-contain drop-shadow-[0_12px_15px_rgba(0,0,0,0.45)]"
                    />
                  </BookTilt>
                )}
              </div>

              <GalleryImage
                src={gallery[3]?.image}
                alt={`${project.title} - 4`}
                className="
                  col-start-3
                  row-start-2
                  aspect-[1.2/0.9]
                "
              />

              <GalleryImage
                src={gallery[4]?.image}
                alt={`${project.title} - 5`}
                className="
                  col-start-3
                  row-start-3
                  aspect-[1.2/0.9]
                "
              />

              <GalleryImage
                src={gallery[5]?.image}
                alt={`${project.title} - 6`}
                className="
                  col-start-1
                  row-start-4
                  aspect-[1.40/0.87]
                "
              />

              <GalleryImage
                src={gallery[6]?.image}
                alt={`${project.title} - 7`}
                className="
                  col-start-2
                  row-start-4
                  aspect-[1.40/0.87]
                "
              />

              <GalleryImage
                src={gallery[7]?.image}
                alt={`${project.title} - 8`}
                className="
                  col-start-3
                  row-start-4
                  aspect-[1.40/0.87]
                "
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MOBILE VERSION
      ========================================================= */}

      <section
        className={`
          relative
          z-10
          block
          min-h-screen
          w-full
          overflow-hidden
          lg:hidden
          ${animateEntrance ? "biographical-appear-item" : ""}
        `}
        style={{
          background: `linear-gradient(
            to bottom,
            #260215 0%,
            #350319 40%,
            #40031f 75%,
            #480424 100%
          )`,
        }}
      >
        {/* SPACE FOR EXISTING NAVBAR */}

        <div className="h-[58px] w-full" />

        {/* MOBILE CONTENT */}

        <div
          className={`
            relative
            z-10
            w-full
            px-[30px]
            md:px-[8%]
            pb-8
            pt-[48px]
            md:pt-14
            ${animateEntrance ? "biographical-appear-item" : ""}
          `}
        >
          {/* BOOK NAME - TOP */}

          <div className="mb-[10px]">
            <h1
              className="
                futura-light
                text-[40px]
                uppercase
                leading-[1.02]
                tracking-[0.05em]
                text-[#e3a94f]
                md:text-[52px]
              "
            >
              {splitHeadingLines(project.title).map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </div>

          {/* PERSON NAME + LOCATION */}

          <div className="mb-[18px]">
            <div className="flex items-center gap-[80px]">
              <span
                className="
                  futura-light
                  text-[12px]
                  uppercase
                  tracking-[0.1em]
                  text-white/80
                  md:text-[15px]
                "
              >
                {project.subtitle}
              </span>

              {project.location && (
                <span
                  className="
                    futura-light
                    text-[10px]
                    uppercase
                    tracking-[0.08em]
                    text-white/65
                    md:text-[13px]
                  "
                >
                  {project.location}
                </span>
              )}
            </div>
          </div>

          {/* DESCRIPTION (first paragraph; rest on "Read more") */}

          {project.description.length > 0 && (
            <div className="mb-[13px]">
              <div className="space-y-[11px]">
                {project.description[0] && (
                  <p
                    className="
                      futura-light
                      text-[12px]
                      leading-[1.5]
                      tracking-[0.01em]
                      text-white/85
                      md:text-[16px]
                    "
                  >
                    {project.description[0]}
                  </p>
                )}

                {hasMore && (
                  <div
                    className={`grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-500 ease-out ${
                      expanded
                        ? "mt-[11px] grid-rows-[1fr] opacity-100"
                        : "mt-0 grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0 space-y-[11px]">
                      {project.description.slice(1).map((paragraph, index) => (
                        <p
                          key={`${paragraph}-${index}`}
                          className="
                            futura-light
                            text-[12px]
                            leading-[1.5]
                            tracking-[0.01em]
                            text-white/85
                            md:text-[16px]
                          "
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {hasMore && (
                <button
                  type="button"
                  onClick={toggleExpanded}
                  aria-expanded={expanded}
                  className="
                    futura-light
                    mt-[10px]
                    text-[11px]
                    tracking-wide
                    text-white/60
                    md:text-[13px]
                    transition-colors
                    duration-300
                    hover:text-white
                  "
                >
                  {expanded ? "Read less <<" : "Read more >>"}
                </button>
              )}
            </div>
          )}

          {/* BOOK IMAGE */}

          {project.bookImage && (
            <div
              className="
                my-[18px]
                flex
                w-full
                items-center
                justify-center
              "
            >
              <BookTilt>
                <img
                  src={project.bookImage}
                  alt={`${project.title} book`}
                  className={`
                    h-auto
                    w-[260px]
                    max-w-full
                    md:w-[400px]
                    object-contain
                    drop-shadow-[0_8px_10px_rgba(0,0,0,0.45)]
                  `}
                />
              </BookTilt>
            </div>
          )}

          {/* MOBILE GALLERY */}

          <div
            className={`mt-[18px] grid grid-cols-2 gap-[9px] md:gap-4 ${
              animateEntrance ? "biographical-appear-gallery" : ""
            }`}
          >
            {gallery.map((item, index) => (
              <div
                key={`${item.image}-${index}`}
                className="
                  group
                  relative
                  aspect-[1.55/1]
                  w-full
                  overflow-hidden
                "
              >
                <img
                  src={item.image}
                  alt={`${project.title} - ${index + 1}`}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-[1.04]
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-black/5
                    transition-colors
                    duration-500
                    group-hover:bg-transparent
                  "
                />
              </div>
            ))}
          </div>

          {/* GET STARTED */}

          <div className="mt-7 flex justify-center">
            <Link
              href="/"
              className="
                futura-light
                rounded-full
                border
                border-white/20
                px-4
                py-[5px]
                text-[6px]
                tracking-[0.08em]
                text-white/70
                transition-colors
                duration-300
                hover:bg-white/10
              "
            >
              Get your Story Started
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

type BookTiltProps = {
  children: ReactNode;
  className?: string;
};

function BookTilt({ children, className = "" }: BookTiltProps) {
  const tiltRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const element = tiltRef.current;
    if (!element) return;

    const bounds = element.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;

    element.style.transform = `perspective(1000px) rotateX(${-offsetY * 10}deg) rotateY(${offsetX * 10}deg) scale(1.015)`;
  };

  const resetTilt = () => {
    if (tiltRef.current) {
      tiltRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
  };

  return (
    <div
      ref={tiltRef}
      className={`book-tilt-hover ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      {children}
    </div>
  );
}

/* =============================================================
   GALLERY IMAGE COMPONENT
============================================================= */

type GalleryImageProps = {
  src?: string;
  alt: string;
  className?: string;
};

function GalleryImage({ src, alt, className = "" }: GalleryImageProps) {
  if (!src) {
    return (
      <div
        className={`
          overflow-hidden
          bg-white/5
          ${className}
        `}
      />
    );
  }

  return (
    <div
      className={`
        group
        relative
        overflow-visible
        ${className}
      `}
    >
      <img
        src={src}
        alt={alt}
        className="
          h-full
          w-full
          object-cover
          transition-transform
          duration-700
          ease-out
          group-hover:scale-[1.04]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-black/5
          transition-colors
          duration-500
          group-hover:bg-transparent
        "
      />
    </div>
  );
}
