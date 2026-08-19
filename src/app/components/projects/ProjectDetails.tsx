"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import Link from "next/link";

import gsap from "gsap";

import {
  FiFacebook,
  FiInstagram,
  FiYoutube,
} from "react-icons/fi";

import { projects } from "../../../../../data/projects";

type Project = (typeof projects)[number];

type ProjectDetailsProps = {
  project: Project;
};

export default function ProjectDetails({
  project,
}: ProjectDetailsProps) {
  /* =========================================================
     REFS
  ========================================================= */

  const bookRef =
    useRef<HTMLDivElement>(null);

  const galleryTrackRef =
    useRef<HTMLDivElement>(null);

  const galleryContainerRef =
    useRef<HTMLDivElement>(null);

  const currentSlideRef =
    useRef(0);

  const hoverRef =
    useRef(false);


  /* =========================================================
     STATE
  ========================================================= */

  const [isGalleryHovered, setIsGalleryHovered] =
    useState(false);


  /* =========================================================
     CONSTANTS
  ========================================================= */

  const gallery = project.gallery;

  const visibleCount = 4;

  const gap = 12;


  /* =========================================================
     KEEP HOVER REF IN SYNC
  ========================================================= */

  useEffect(() => {
    hoverRef.current =
      isGalleryHovered;
  }, [isGalleryHovered]);


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

    const x =
      event.clientX - rect.left;

    const y =
      event.clientY - rect.top;


    /*
     * Convert cursor position into
     * -1 to +1.
     */

    const normalizedX =
      (x / rect.width - 0.5) * 2;

    const normalizedY =
      (y / rect.height - 0.5) * 2;


    /*
     * Directional tilt.
     *
     * Left cursor  → book tilts left
     * Right cursor → book tilts right
     * Top cursor   → book tilts backward
     * Bottom       → book tilts forward
     */

    gsap.to(book, {
      rotationY:
        normalizedX * 12,

      rotationX:
        normalizedY * -10,

      rotationZ:
        normalizedX * 2,

      x:
        normalizedX * 7,

      y:
        normalizedY * -6,

      scale: 1.025,

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

      x: 0,
      y: 0,

      scale: 1,

      duration: 0.8,

      ease: "power3.out",

      overwrite: true,
    });
  };


  /* =========================================================
     GET SLIDE DISTANCE
  ========================================================= */

  const getSlideDistance = () => {
    const container =
      galleryContainerRef.current;

    if (!container) {
      return 0;
    }

    const containerWidth =
      container.offsetWidth;

    /*
     * Four images visible.
     *
     * There are 3 gaps between 4 images.
     */

    const imageWidth =
      (containerWidth -
        gap * (visibleCount - 1)) /
      visibleCount;

    return imageWidth + gap;
  };


  /* =========================================================
     MOVE SLIDESHOW
  ========================================================= */

  const moveGallery = (
    targetIndex: number,
    duration = 1.2
  ) => {
    const track =
      galleryTrackRef.current;

    if (!track) return;

    const distance =
      getSlideDistance();

    if (!distance) return;

    currentSlideRef.current =
      targetIndex;

    gsap.to(track, {
      x:
        -(targetIndex * distance),

      duration,

      ease: "power3.inOut",

      overwrite: true,
    });
  };


  /* =========================================================
     SMOOTH AUTO SLIDESHOW
  ========================================================= */

  useEffect(() => {
    if (gallery.length <= visibleCount) {
      return;
    }

    let timeoutId:
      ReturnType<typeof setTimeout>;


    const play = () => {
      /*
       * Wait while user is hovering.
       */

      if (hoverRef.current) {
        timeoutId = setTimeout(
          play,
          500
        );

        return;
      }


      const maxSlide =
        gallery.length -
        visibleCount;

      let nextSlide =
        currentSlideRef.current + 1;


      /*
       * Normal movement.
       */

      if (nextSlide <= maxSlide) {
        moveGallery(
          nextSlide,
          1.2
        );
      }

      /*
       * When reaching the end,
       * smoothly return to first slide.
       */

      else {
        nextSlide = 0;

        moveGallery(
          nextSlide,
          1.5
        );
      }


      /*
       * Wait 3 seconds before next movement.
       */

      timeoutId = setTimeout(
        play,
        3000
      );
    };


    /*
     * Initial delay.
     */

    timeoutId = setTimeout(
      play,
      3000
    );


    return () => {
      clearTimeout(timeoutId);

      gsap.killTweensOf(
        galleryTrackRef.current
      );
    };

  }, [gallery.length]);


  /* =========================================================
     RESPONSIVE SLIDESHOW RESIZE
  ========================================================= */

  useEffect(() => {
    const handleResize = () => {
      const track =
        galleryTrackRef.current;

      if (!track) return;

      const distance =
        getSlideDistance();

      if (!distance) return;

      gsap.set(track, {
        x:
          -(
            currentSlideRef.current *
            distance
          ),
      });
    };


    window.addEventListener(
      "resize",
      handleResize
    );


    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);


  /* =========================================================
     GALLERY HOVER
  ========================================================= */

  const handleGalleryEnter = () => {
    hoverRef.current = true;

    setIsGalleryHovered(true);

    gsap.killTweensOf(
      galleryTrackRef.current
    );
  };


  const handleGalleryLeave = () => {
    hoverRef.current = false;

    setIsGalleryHovered(false);
  };


  /* =========================================================
     RENDER
  ========================================================= */

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
          ONE COMPLETE PROJECT SECTION
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

          lg:h-[100svh]
          lg:min-h-0
          lg:overflow-hidden
          lg:pt-[105px]
          lg:pb-0
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
                "linear-gradient(to bottom, rgba(59,20,37,0.08) 0%, rgba(30,18,24,0.30) 55%, rgba(8,8,10,0.90) 100%)",
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

            lg:h-full
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
              RESPONSIVE MAIN GRID
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              gap-10

              md:gap-12

              lg:h-[calc(100%-40px)]
              lg:grid-cols-[45%_55%]
              lg:gap-0
            "
          >


            {/* =================================================
                LEFT SECTION
            ================================================= */}

            <div
              className="
                flex
                flex-col

                lg:h-full
                lg:pr-[8%]
              "
            >


              {/* =================================================
                  LEFT TOP

                  BOTTOM ALIGNED ON DESKTOP
              ================================================= */}

              <div
                className="
                  flex
                  flex-col
                  justify-end

                  lg:h-[42%]
                  lg:pb-5
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
                  LEFT BOTTOM — DESCRIPTION
              ================================================= */}

              <div
                className="
                  mt-8
                  max-w-[620px]

                  lg:mt-0
                  lg:h-[58%]
                  lg:overflow-hidden
                  lg:pt-5
                "
              >

                <div
                  className="
                    space-y-5
                  "
                >

                  {project.description.map(
                    (
                      paragraph,
                      index
                    ) => (

                      <p
                        key={index}
                        className="
                          futura-light
                          text-[12px]
                          leading-[1.55]
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
            ================================================= */}

            <div
              className="
                grid
                grid-rows-[auto_auto]
                gap-8

                lg:h-full
                lg:grid-rows-[60%_40%]
                lg:gap-0
              "
            >


              {/* =================================================
                  RIGHT TOP — BOOK
              ================================================= */}

              <div
                className="
                  flex
                  min-h-[360px]
                  items-center
                  justify-center

                  sm:min-h-[420px]

                  md:min-h-[480px]

                  lg:min-h-0
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
                    relative
                    h-[52vh]
                    max-h-[560px]
                    w-[78vw]
                    max-w-[390px]
                    cursor-pointer
                    will-change-transform

                    sm:h-[56vh]
                    sm:max-w-[440px]

                    md:h-[60vh]
                    md:max-w-[500px]

                    lg:h-[92%]
                    lg:w-[90%]
                    lg:max-w-[560px]

                    xl:h-[98%]
                    xl:w-[94%]
                    xl:max-w-[640px]
                  "
                  style={{
                    perspective:
                      "1200px",

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
                      drop-shadow-[0_22px_30px_rgba(0,0,0,0.55)]
                    "
                  />

                </div>

              </div>


              {/* =================================================
                  RIGHT BOTTOM — SLIDESHOW
              ================================================= */}

              <div
                ref={
                  galleryContainerRef
                }
                className="
                  flex
                  min-h-[120px]
                  w-full
                  items-start
                  overflow-hidden

                  sm:min-h-[140px]

                  md:min-h-[160px]

                  lg:min-h-0
                "
                onMouseEnter={
                  handleGalleryEnter
                }
                onMouseLeave={
                  handleGalleryLeave
                }
              >

                {gallery.length > 0 && (

                  <div
                    ref={
                      galleryTrackRef
                    }
                    className="
                      flex
                      w-full
                      gap-2
                      will-change-transform

                      sm:gap-3
                    "
                  >

                    {gallery.map(
                      (
                        item,
                        index
                      ) => (

                        <div
                          key={`${item.image}-${index}`}
                          className="
                            relative
                            aspect-[1.35/1]
                            shrink-0
                            overflow-hidden
                            bg-black/10
                          "
                          style={{
                            width:
                              "calc((100% - 36px) / 4)",
                          }}
                        >

                          <img
                            src={
                              item.image
                            }
                            alt={`${project.title} gallery image ${
                              index + 1
                            }`}
                            className="
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

                      )
                    )}

                  </div>

                )}

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
            <FiFacebook
              size={17}
            />
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
            <FiInstagram
              size={17}
            />
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
            <FiYoutube
              size={17}
            />
          </Link>

        </div>

      </section>

    </main>
  );
}