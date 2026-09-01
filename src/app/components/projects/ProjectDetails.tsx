"use client";

import { useRef } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import gsap from "gsap";

import {
  FiFacebook,
  FiInstagram,
  FiYoutube,
} from "react-icons/fi";

import { projects } from "@/data/projects";

type Project = (typeof projects)[number];

type ProjectDetailsProps = {
  project: Project;
};

/* =========================================================
   GALLERY IMAGE
========================================================= */

type GalleryImageProps = {
  item:
    | {
        image: string;
      }
    | undefined;
  title: string;
  index: number;
  className?: string;
};

const GalleryImage = ({
  item,
  title,
  index,
  className = "",
}: GalleryImageProps) => {
  if (!item) {
    return (
      <div
        className={`
          relative
          w-full
          overflow-hidden
          ${className}
        `}
      />
    );
  }

  return (
    <div
      className={`
        relative
        w-full
        overflow-hidden
        ${className}
      `}
    >
      <img
        src={item.image}
        alt={`${title} gallery image ${index + 1}`}
        className="
          block
          h-full
          w-full
          object-cover
          transition-transform
          duration-700
          ease-out
          hover:scale-[1.04]
        "
      />
    </div>
  );
};

export default function ProjectDetails({
  project,
}: ProjectDetailsProps) {
  /* =========================================================
     REFS
  ========================================================= */

  const bookRef = useRef<HTMLDivElement>(null);

  /* =========================================================
     GALLERY
  ========================================================= */

  const gallery = project.gallery ?? [];
  const galleryImages = gallery.slice(0, 8);

  /* =========================================================
     BOOK — DIRECTIONAL 3D TILT
  ========================================================= */

  const handleBookMouseMove = (
    event: MouseEvent<HTMLDivElement>
  ) => {
    const book = bookRef.current;

    if (!book) return;

    const rect =
      event.currentTarget.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const normalizedX =
      (x / rect.width - 0.5) * 2;

    const normalizedY =
      (y / rect.height - 0.5) * 2;

    gsap.to(book, {
      rotationY: normalizedX * 7,
      rotationX: normalizedY * -5,
      rotationZ: normalizedX * 1,
      scale: 1.01,
      duration: 0.35,
      ease: "power2.out",
      overwrite: true,
    });
  };

  /* =========================================================
     BOOK — RESET
  ========================================================= */

  const handleBookMouseLeave = () => {
    const book = bookRef.current;

    if (!book) return;

    gsap.to(book, {
      rotationY: 0,
      rotationX: 0,
      rotationZ: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
      overwrite: true,
    });
  };

  return (
    <main
      className="
        relative
        w-full
        overflow-hidden
        bg-[#32141f]
        text-white
      "
    >
      {/* =====================================================
          PROJECT SECTION
      ===================================================== */}

      <section
        className="
          relative
          min-h-[100svh]
          w-full
          overflow-hidden
          pt-[80px]
          pb-8
          sm:pt-[90px]
          md:pt-[100px]
          lg:min-h-[100svh]
          lg:h-auto
          lg:overflow-hidden
          lg:pt-[105px]
          lg:pb-8
        "
      >
        {/* ===================================================
            BACKGROUND IMAGE
        =================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-0
          "
        >
          <img
            src={
              project.coverImage ||
              `https://picsum.photos/1920/1080?random=${project.slug}-background`
            }
            alt=""
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
          />

          {/* MAROON OVERLAY */}

          <div
            className="
              absolute
              inset-0
              bg-[#3b1425]/55
            "
          />

          {/* DARK OVERLAY */}

          <div
            className="
              absolute
              inset-0
              bg-black/30
            "
          />

          {/* BOTTOM GRADIENT */}

          <div
            className="
              absolute
              inset-0
            "
            style={{
              background:
                "linear-gradient(to bottom, rgba(83, 36, 57,0.9) 0%, rgba(83, 36, 57,0.2) 55%, rgba(83, 36, 57,0.1) 100%)",
            }}
          />
        </div>

        {/* ===================================================
            MAIN CONTENT
        =================================================== */}

        <div
          className="
            relative
            z-10
            mx-auto
            w-full
            max-w-[1500px]
            px-5
            sm:px-8
            md:px-[5%]
          "
        >
          {/* =================================================
              BREADCRUMB
          ================================================= */}

          <div
            className="
              mb-6
              flex
              flex-wrap
              items-center
              gap-2
              sm:mb-7
              lg:mb-5
            "
          >
            <Link
              href="/"
              className="
                futura-light
                text-[9px]
                uppercase
                tracking-wide
                text-white/40
                transition-colors
                duration-300
                hover:text-white/80
                sm:text-[10px]
              "
            >
              Home
            </Link>

            <span className="text-[9px] text-white/30">
              &gt;&gt;
            </span>

            <Link
              href="/projects"
              className="
                futura-light
                text-[9px]
                uppercase
                tracking-wide
                text-white/40
                transition-colors
                duration-300
                hover:text-white/80
                sm:text-[10px]
              "
            >
              Projects
            </Link>

            <span className="text-[9px] text-white/30">
              &gt;&gt;
            </span>

            <Link
              href="/projects/biographical"
              className="
                futura-light
                text-[9px]
                uppercase
                tracking-wide
                text-white/40
                transition-colors
                duration-300
                hover:text-white/80
                sm:text-[10px]
              "
            >
              Biographical
            </Link>

            <span className="text-[9px] text-white/30">
              &gt;&gt;
            </span>

            <span
              className="
                futura-light
                max-w-[180px]
                truncate
                text-[9px]
                uppercase
                tracking-wide
                text-white/45
                sm:max-w-none
                sm:text-[10px]
              "
            >
              {project.title}
            </span>
          </div>

          {/* =================================================
              MAIN TWO-COLUMN GRID
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              gap-10
              md:gap-12
              lg:min-h-[calc(100svh-220px)]
              lg:grid-cols-[45%_55%]
              lg:gap-0
            "
          >
            {/* =================================================
                LEFT SECTION
            ================================================= */}

            <div
              className="
                grid
                h-full
                -translate-y-6
                grid-rows-[0.55fr_0.9fr_1fr]
                lg:pr-[8%]
              "
            >
              {/* EMPTY ROW */}

              <div />

              {/* TITLE */}

              <div
                className="
                  flex
                  flex-col
                  justify-end
                  pb-4
                "
              >
                <h1
                  className="
                    futura-light
                    text-[clamp(34px,4vw,64px)]
                    uppercase
                    leading-[0.92]
                    tracking-[0.01em]
                    text-[#e7ad55]
                  "
                >
                  {project.title}
                </h1>

                <div
                  className="
                    mt-3
                    flex
                    flex-wrap
                    gap-x-8
                    gap-y-1
                  "
                >
                  <p
                    className="
                      futura-light
                      text-[10px]
                      uppercase
                      tracking-[0.08em]
                      text-white/85
                      sm:text-xs
                    "
                  >
                    {project.subtitle}
                  </p>

                  {project.location && (
                    <p
                      className="
                        futura-light
                        text-[10px]
                        uppercase
                        tracking-[0.08em]
                        text-white/65
                        sm:text-xs
                      "
                    >
                      {project.location}
                    </p>
                  )}
                </div>
              </div>

              {/* DESCRIPTION */}

              <div
                className="
                  flex
                  flex-col
                  justify-start
                  pt-4
                "
              >
                <div
                  className="
                    max-w-[620px]
                    space-y-0
                  "
                >
                  {project.description.map(
                    (paragraph, index) => (
                      <p
                        key={index}
                        className="
                          futura-light
                          text-[12px]
                          leading-[1.5]
                          tracking-[0.01em]
                          text-white/85
                          sm:text-[13px]
                          md:text-[14px]
                          lg:text-[0.9vw]
                        "
                      >
                        {paragraph}
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT SECTION — GALLERY
            ================================================= */}

            <div
              className="
                relative
                w-full
                lg:pl-[4%]
              "
            >
              {/* =================================================
                  DESKTOP GALLERY
              ================================================= */}
<div
  className="
    hidden
    w-full
    lg:grid
    lg:grid-cols-3
    lg:grid-rows-[130px_155px_155px_120px]
    lg:gap-x-4
    lg:gap-y-4
  "
>
                {/* PHOTO 1 */}

                <GalleryImage
                  item={galleryImages[0]}
                  title={project.title}
                  index={0}
                  className="
                    col-start-1
                    row-start-1
                    aspect-[1.6/1]
                  "
                />

                {/* PHOTO 2 */}

                <GalleryImage
                  item={galleryImages[1]}
                  title={project.title}
                  index={1}
                  className="
                    col-start-2
                    row-start-1
                    aspect-[1.6/1]
                  "
                />

                {/* PHOTO 3 */}

                <GalleryImage
                  item={galleryImages[2]}
                  title={project.title}
                  index={2}
                  className="
                    col-start-3
                    row-start-1
                    aspect-[1.6/1]
                  "
                />

                {/* =================================================
                    BOOK
                ================================================= */}

                <div
                  className="
                    relative
                    col-start-1
                    col-span-2
                    row-start-2
                    row-span-2
                    flex
                    items-center
                    justify-center
                    overflow-visible
                  "
                >
                  <div
                    ref={bookRef}
                    onMouseMove={handleBookMouseMove}
                    onMouseLeave={handleBookMouseLeave}
                    className="
                      relative
                      z-30
                      flex
                      h-full
                      w-full
                      cursor-pointer
                      items-center
                      justify-center
                      will-change-transform
                    "
                    style={{
                      perspective: "1200px",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <img
                      src={
                        project.bookImage ||
                        `https://picsum.photos/700/900?random=${project.slug}-book`
                      }
                      alt={project.title}
                      className="
                        h-[140%]
                        w-[70%]
                        object-contain
                        drop-shadow-[0_25px_35px_rgba(0,0,0,0.65)]
                      "
                    />
                  </div>
                </div>

                {/* PHOTO 4 */}

                <div
                  className="
                    col-start-3
                    row-start-2
                    flex
                    items-center
                    justify-center
                  "
                >
                  <GalleryImage
                    item={galleryImages[3]}
                    title={project.title}
                    index={3}
                    className="
                      aspect-square
                      h-full
                      w-full
                    "
                  />
                </div>

                {/* PHOTO 5 */}

                <div
                  className="
                    col-start-3
                    row-start-3
                    flex
                    items-center
                    justify-center
                  "
                >
                  <GalleryImage
                    item={galleryImages[4]}
                    title={project.title}
                    index={4}
                    className="
                      aspect-square
                      h-full
                      w-full
                    "
                  />
                </div>

                {/* PHOTO 6 */}

                <GalleryImage
                  item={galleryImages[5]}
                  title={project.title}
                  index={5}
                  className="
                    col-start-1
                    row-start-4
                    aspect-[1.6/1]
                  "
                />

                {/* PHOTO 7 */}

                <GalleryImage
                  item={galleryImages[6]}
                  title={project.title}
                  index={6}
                  className="
                    col-start-2
                    row-start-4
                    aspect-[1.6/1]
                  "
                />

                {/* PHOTO 8 */}

                <GalleryImage
                  item={galleryImages[7]}
                  title={project.title}
                  index={7}
                  className="
                    col-start-3
                    row-start-4
                    aspect-[1.6/1]
                  "
                />
              </div>

              {/* =================================================
                  MOBILE / TABLET
              ================================================= */}

              <div
                className="
                  grid
                  grid-cols-2
                  gap-4
                  lg:hidden
                "
              >
                {galleryImages.map((item, index) => (
                  <GalleryImage
                    key={index}
                    item={item}
                    title={project.title}
                    index={index}
                    className="aspect-[1.25/1]"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            SOCIAL ICONS
        ===================================================== */}

        <div
          className="
            fixed
            bottom-5
            right-5
            z-50
            flex
            flex-col
            items-center
            gap-4
            text-white
            sm:bottom-7
            sm:right-7
            sm:gap-5
          "
        >
          <Link
            href="#"
            aria-label="Facebook"
            className="
              transition-opacity
              duration-300
              hover:opacity-60
            "
          >
            <FiFacebook size={17} />
          </Link>

          <Link
            href="#"
            aria-label="Instagram"
            className="
              transition-opacity
              duration-300
              hover:opacity-60
            "
          >
            <FiInstagram size={17} />
          </Link>

          <Link
            href="#"
            aria-label="YouTube"
            className="
              transition-opacity
              duration-300
              hover:opacity-60
            "
          >
            <FiYoutube size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}