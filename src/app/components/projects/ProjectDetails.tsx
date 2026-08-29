"use client";

import { useRef } from "react";
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
  item: {
    image: string;
  } | undefined;
  title: string;
  index: number;
};

const GalleryImage = ({
  item,
  title,
  index,
}: GalleryImageProps) => {

  if (!item) {
    return (
      <div
        className="
          h-full
          w-full
          min-h-0
        "
      />
    );
  }

  return (
    <div
      className="
        relative
        h-full
        w-full
        min-h-0
        overflow-hidden
      "
    >
      <img
        src={item.image}
        alt={`${title} gallery image ${
          index + 1
        }`}
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

  /*
   * RIGHT SIDE LAYOUT:
   *
   * ┌──────────┬──────────┬──────────┐
   * │ IMAGE 1  │ IMAGE 2  │ IMAGE 3  │
   * ├─────────────────────┼──────────┤
   * │                     │ IMAGE 4  │
   * │        BOOK         ├──────────┤
   * │                     │ IMAGE 5  │
   * ├──────────┬──────────┼──────────┤
   * │ IMAGE 6  │ IMAGE 7  │ IMAGE 8  │
   * └──────────┴──────────┴──────────┘
   */

  const galleryImages = gallery.slice(0, 8);

  /* =========================================================
     BOOK — DIRECTIONAL 3D TILT
  ========================================================= */

  const handleBookMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
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

    /*
     * Only tilt.
     * No x/y movement so the book stays in place.
     */

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

            <span
              className="
                text-[9px]
                text-white/30
              "
            >
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

            <span
              className="
                text-[9px]
                text-white/30
              "
            >
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

            <span
              className="
                text-[9px]
                text-white/30
              "
            >
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

              REDUCED OVERALL HEIGHT
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

                ROW 1 → EMPTY / SMALL
                ROW 2 → TITLE
                ROW 3 → DESCRIPTION
            ================================================= */}

            <div
              className="
                grid
                h-full

                grid-rows-[0.55fr_0.9fr_1fr]

                lg:pr-[8%]
              "
            >
              {/* =================================================
                  LEFT ROW 1 — EMPTY
              ================================================= */}

              <div />

              {/* =================================================
                  LEFT ROW 2 — TITLE + SUBTITLE
              ================================================= */}

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

                {/* SUBTITLE / LOCATION */}

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

              {/* =================================================
                  LEFT ROW 3 — DESCRIPTION
              ================================================= */}

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
                    space-y-4
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
                RIGHT SECTION

                ROW 1 → SMALL
                ROW 2 → SMALLER THAN BEFORE
                ROW 3 → LARGEST

                1st and 2nd rows are intentionally reduced.
            ================================================= */}

            <div
              className="
                relative
                w-full

                lg:h-full
                lg:pl-[4%]
              "
            >
              <div
                className="
                  relative
                  grid

                  h-full
                  min-h-0
                  w-full

                  grid-cols-3

                  grid-rows-[176px_247px_176px]

                  gap-10

                  sm:gap-4
                "
              >
                {/* =================================================
                    ROW 1 — 3 IMAGES
                ================================================= */}

                <GalleryImage
                  item={galleryImages[0]}
                  title={project.title}
                  index={0}
                />

                <GalleryImage
                  item={galleryImages[1]}
                  title={project.title}
                  index={1}
                />

                <GalleryImage
                  item={galleryImages[2]}
                  title={project.title}
                  index={2}
                />

                {/* =================================================
                    ROW 2 — BOOK
                    FIRST TWO COLUMNS
                ================================================= */}

                <div
                  className="
                    relative
                    col-span-2

                    h-full
                    min-h-0
                    w-full

                    items-center
                    justify-center

                    overflow-visible
                  "
                >
                  <div
                    ref={bookRef}
                    onMouseMove={
                      handleBookMouseMove
                    }
                    onMouseLeave={
                      handleBookMouseLeave
                    }
                    className="
                      absolute
                      left-1/2
                      top-1/2

                      z-30

                      flex

                      h-[90%]
                      w-[82%]

                      -translate-x-1/2
                      -translate-y-1/2

                      cursor-pointer
                      items-center
                      justify-center

                      will-change-transform
                    "
                    style={{
                      perspective: "1200px",
                      transformStyle:
                        "preserve-3d",
                    }}
                  >
                    <img
                      src={
                        project.bookImage ||
                        `https://picsum.photos/700/900?random=${project.slug}-book`
                      }
                      alt={project.title}
                      className="
                        h-full
                        w-full
                        object-contain

                        drop-shadow-[0_25px_35px_rgba(0,0,0,0.65)]
                      "
                    />
                  </div>
                </div>

                {/* =================================================
                    ROW 2 — RIGHT SIDE

                    TWO STACKED IMAGES
                ================================================= */}

                <div
                  className="
                    flex
                    h-full
                    min-h-0
                    w-full
                    flex-col
                    gap-3

                    sm:gap-4
                  "
                >
                  {/* TOP IMAGE */}

                  <div
                    className="
                      min-h-0
                      flex-1
                    "
                  >
                    <GalleryImage
                  item={galleryImages[3]}
                  title={project.title}
                  index={3}
                />
                  </div>

                  {/* BOTTOM IMAGE */}

                  <div
                    className="
                      min-h-0
                      flex-1
                    "
                  >
                    <GalleryImage
                  item={galleryImages[4]}
                  title={project.title}
                  index={4}
                />
                  </div>
                </div>

                {/* =================================================
                    ROW 3 — 3 IMAGES
                ================================================= */}

                <GalleryImage
                  item={galleryImages[5]}
                  title={project.title}
                  index={5}
                />

                <GalleryImage
                  item={galleryImages[6]}
                  title={project.title}
                  index={6}
                />

                <GalleryImage
                  item={galleryImages[7]}
                  title={project.title}
                  index={7}
                />
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