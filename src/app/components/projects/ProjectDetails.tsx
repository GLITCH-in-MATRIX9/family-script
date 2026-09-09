"use client";

import Link from "next/link";
import type { Project } from "../../../data/projects";
import PageGradientBackground from "../layout/PageGradientBackground";

type ProjectDetailsProps = {
  project: Project;
};

export default function ProjectDetails({
  project,
}: ProjectDetailsProps) {
  const gallery = project.gallery;

  return (
    <main className="relative min-h-screen w-full overflow-visible text-white">
      <div className="pointer-events-none fixed inset-0 z-0">
        <img
          src={project.coverImage}
          alt=""
          className="h-full w-full object-cover"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(83,36,57,0.82) 0%, rgba(83,36,57,0.78) 28%, rgba(56,44,59,0.86) 68%, rgba(56,44,59,0.97) 100%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(83,36,57,0.12) 0%, rgba(56,44,59,0.10) 45%, rgba(56,44,59,0.22) 100%)",
          }}
        />

        {/* Same top/bottom darkening rects as every other non-homepage
            page — no base-color layer here, so the cover photo (and
            the tint layers above) stay visible underneath. */}
        <PageGradientBackground includeBase={false} />
      </div>

      <section
        className="
          relative
          z-10
          mx-auto
          min-h-screen
          w-full
          max-w-[1350px]
          px-5
          pb-10
          pt-24
          sm:px-7
          sm:pt-28
          md:px-8
          md:pt-28
          lg:px-10
          lg:pt-28
        "
      >
        <div
          className="
            mb-6
            flex
            items-center
            gap-2
            md:mb-7
          "
        >
          <Link
            href="/"
            className="
              futura-light
              text-[9px]
              uppercase
              tracking-wide
              text-white/45
              transition-colors
              hover:text-white
              md:text-[11px]
            "
          >
            Home
          </Link>

          <span className="futura-light text-[9px] text-white/25 md:text-[11px]">
            &gt;&gt;
          </span>

          <Link
            href="/projects"
            className="
              futura-light
              text-[9px]
              uppercase
              tracking-wide
              text-white/45
              transition-colors
              hover:text-white
              md:text-[11px]
            "
          >
            Projects
          </Link>

          <span className="futura-light text-[9px] text-white/25 md:text-[11px]">
            &gt;&gt;
          </span>

          <span
            className="
              futura-light
              text-[9px]
              uppercase
              tracking-wide
              text-white/30
              md:text-[11px]
            "
          >
            {project.category}
          </span>
        </div>

        <div
          className="
            flex
            w-full
            flex-col
            gap-10
            lg:flex-row
            lg:items-start
            lg:gap-12
          "
        >
          <div
            className="
              flex
              w-full
              shrink-0
              flex-col
              justify-start
              mt-8
              md:mt-12
              lg:mt-6
              lg:w-[42%]
              lg:pt-10
            "
          >
            <h1
              className="
                futura-light
                max-w-[470px]
                text-[32px]
                uppercase
                leading-[0.92]
                tracking-[0.015em]
                text-[#e3a94f]
                sm:text-[40px]
                md:text-[46px]
                lg:text-[50px]
                xl:text-[54px]
              "
            >
              {project.title}
            </h1>

            <div
              className="
                mt-5
                flex
                flex-col
                gap-2
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
                  md:text-[11px]
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
                    md:text-[11px]
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
                max-w-[480px]
                space-y-5
                lg:mt-8
                lg:space-y-5
              "
            >
              {project.description.map((paragraph, index) => (
                <p
                  key={index}
                  className="
                    futura-light
                    text-[11px]
                    leading-[1.5]
                    tracking-wide
                    text-white/80
                    sm:text-[12px]
                    md:text-[13px]
                    lg:text-[14px]
                  "
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-6">
              <span
                className="
                  futura-light
                  text-[9px]
                  tracking-wide
                  text-white/45
                "
              >
                Read more &gt;&gt;
              </span>
            </div>
          </div>

          <div className="w-full lg:w-[58%]">
            <div
              className="
                mx-auto
                grid
                w-full
                grid-cols-3
                gap-2
                md:gap-2.5
                lg:gap-3
              "
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
                  row-span-2
                  row-start-2
                  flex
                  items-center
                  justify-center
                  overflow-visible
                "
              >
                {project.bookImage && (
                  <img
                    src={project.bookImage}
                    alt={`${project.title} book`}
                    className={`
                      h-full
                      w-full

                      ${
                        project.slug === "dr-v-k-kutty"
                          ? "scale-[3]"
                          : project.slug === "vinod-kumar-khanna"
                          ? "scale-[1.35]"
                          : project.slug === "vasant-valley-school"
                          ? "scale-[1.85]"
                          : project.slug === "stapati-architects"
                          ? "scale-[2]"
                          : "scale-[1.40]"
                      }

                      translate-x-[50%]
                      object-contain
                      drop-shadow-[0_12px_15px_rgba(0,0,0,0.45)]
                      transition-transform
                      duration-700
                      ease-out
                      hover:-translate-y-2
                      hover:translate-x-[50%]
                    `}
                  />
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

      <div
        className="
          fixed
          bottom-5
          right-4
          z-30
          flex
          flex-col
          items-center
          gap-3
          text-white
          md:bottom-6
          md:right-6
        "
      >
        <span className="text-[12px]">f</span>
        <span className="text-[12px]">◎</span>
        <span className="text-[12px]">▶</span>
      </div>
    </main>
  );
}

type GalleryImageProps = {
  src?: string;
  alt: string;
  className?: string;
};

function GalleryImage({
  src,
  alt,
  className = "",
}: GalleryImageProps) {
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