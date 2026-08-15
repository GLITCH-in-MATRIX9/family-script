"use client";

import SocialIcos from "../layout/SocialIcos";

interface PersonStoryProps {
  name: string;
  subtitle?: string;
  location?: string;
  description: React.ReactNode;
  backgroundImage: string;
  photos: string[];
  featuredImage?: string;
  descriptionSide?: "left" | "right";
}

export default function PersonStory({
  name,
  subtitle,
  location,
  description,
  backgroundImage,
  photos,
  featuredImage,
  descriptionSide = "left",
}: PersonStoryProps) {
  const descriptionIsLeft = descriptionSide === "left";

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#21131b] text-white">

      {/* ========================================================= */}
      {/* BACKGROUND IMAGE */}
      {/* ========================================================= */}

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("${backgroundImage}")`,
        }}
      />

      {/* ========================================================= */}
      {/* BURGUNDY OVERLAY */}
      {/* ========================================================= */}

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(76, 20, 42, 0.88) 0%, rgba(76, 20, 42, 0.72) 45%, rgba(20, 13, 18, 0.95) 100%)",
        }}
      />

      {/* ========================================================= */}
      {/* DARK OVERLAY */}
      {/* ========================================================= */}

      <div className="absolute inset-0 bg-black/10" />

      {/* ========================================================= */}
      {/* PAGE CONTENT */}
      {/* ========================================================= */}

      <div
        className="relative z-10 min-h-screen"
        style={{
          fontFamily: "futura-pt, sans-serif",
        }}
      >

        {/* ===================================================== */}
        {/* FAMILY SCRIPT HEADER */}
        {/* ===================================================== */}

        <header className="relative flex h-[72px] items-center px-6 md:px-8">

          {/* ================================================= */}
          {/* LOGO */}
          {/* ================================================= */}

          <div className="absolute left-5 top-1 md:left-8 md:top-1">
            <img
              src="/assets/homepage/FS_logo.png"
              alt="Family Script"
              className="h-9 w-9 object-contain brightness-0 invert md:h-[60px] md:w-[60px]"
            />
          </div>

          {/* ================================================= */}
          {/* CENTER FAMILY SCRIPT */}
          {/* ================================================= */}

          <div className="absolute left-1/2 top-4 -translate-x-1/2 text-center">

            <h1
              className="whitespace-nowrap uppercase text-white"
              style={{
                fontFamily: "futura-pt, sans-serif",
                fontWeight: 500,
                fontSize: "17px",
                letterSpacing: "0.28em",
                lineHeight: "1",
              }}
            >
              Family Script
            </h1>

            <p
              className="mt-1 whitespace-nowrap uppercase text-white"
              style={{
                fontFamily: "futura-pt, sans-serif",
                fontWeight: 300,
                fontSize: "8px",
                letterSpacing: "0.18em",
                lineHeight: "1",
              }}
            >
              Create a{" "}
              <span style={{ fontWeight: 500 }}>
                Legacy
              </span>

              {" | "}

              Record Your{" "}
              <span style={{ fontWeight: 500 }}>
                Story
              </span>
            </p>

          </div>

          {/* ================================================= */}
          {/* HAMBURGER MENU */}
          {/* ================================================= */}

          <button
            type="button"
            aria-label="Open menu"
            className="absolute right-6 top-6 flex flex-col gap-[5px] md:right-8"
          >
            <span className="block h-[1px] w-[17px] bg-white/70" />
            <span className="block h-[1px] w-[17px] bg-white/70" />
            <span className="block h-[1px] w-[17px] bg-white/70" />
          </button>

        </header>

        {/* ===================================================== */}
        {/* BREADCRUMB */}
        {/* ===================================================== */}

        <div className="absolute left-8 top-[62px] md:left-[100px]">

          <p
            className="text-white/30"
            style={{
              fontFamily: "futura-pt, sans-serif",
              fontWeight: 300,
              fontSize: "7px",
              letterSpacing: "0.08em",
            }}
          >
            HOME &gt;&gt; PROJECTS &gt;&gt; BIOGRAPHICAL &gt;&gt; {name}
          </p>

        </div>

        {/* ===================================================== */}
        {/* MAIN CONTENT */}
        {/* ===================================================== */}

        <section className="relative min-h-[calc(100vh-72px)] w-full">

          {/* ================================================= */}
          {/* PERSON INFORMATION */}
          {/* ================================================= */}

          <div
            className={`
              absolute
              top-[55%]
              z-20
              w-[38%]
              max-w-[390px]
              -translate-y-1/2

              ${
                descriptionIsLeft
                  ? "left-[8%]"
                  : "right-[8%]"
              }
            `}
          >

            {/* ================================================= */}
            {/* PERSON NAME */}
            {/* ================================================= */}

            <h2
              className="uppercase text-[#efbd4c]"
              style={{
                fontFamily: "futura-pt, sans-serif",
                fontWeight: 500,
                fontSize: "30px",
                lineHeight: "1",
                letterSpacing: "0.04em",
              }}
            >
              {name}
            </h2>

            {/* ================================================= */}
            {/* SUBTITLE + LOCATION */}
            {/* ================================================= */}

            {(subtitle || location) && (
              <div className="mt-3 flex items-center gap-16">

                {subtitle && (
                  <p
                    className="text-white/70"
                    style={{
                      fontFamily: "futura-pt, sans-serif",
                      fontWeight: 500,
                      fontSize: "12px",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {subtitle}
                  </p>
                )}

                {location && (
                  <p
                    className="text-white/70"
                    style={{
                      fontFamily: "futura-pt, sans-serif",
                      fontWeight: 500,
                      fontSize: "12px",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {location}
                  </p>
                )}

              </div>
            )}

            {/* ================================================= */}
            {/* DESCRIPTION */}
            {/* ================================================= */}

            <div
              className="mt-8 max-w-[390px] text-white/75"
              style={{
                fontFamily: "futura-pt, sans-serif",
                fontWeight: 300,
                fontSize: "13px",
                lineHeight: "1.5",
                letterSpacing: "0.025em",
              }}
            >
              {description}
            </div>

          </div>

          {/* ================================================= */}
          {/* PHOTO COLLAGE */}
          {/* ================================================= */}

          <div
            className={`
              absolute
              top-[9%]
              hidden
              md:block
              ${
                photos.length === 5
                  ? "w-[40%] max-w-[800px]"
                  : photos.length === 6
                  ? "w-[32%] max-w-[650px]"
                  : "w-[40%] max-w-[800px]"
              }

              ${
                descriptionIsLeft
                  ? "right-[8%]"
                  : "left-[8%]"
              }
            `}
          >

            {/* ================================================= */}
            {/* 5 PHOTO COLLAGE */}
            {/*
            
              DESCRIPTION ON LEFT:

              PHOTO 1      PHOTO 2
                               
                         PHOTO 3

              PHOTO 4      PHOTO 5


              DESCRIPTION ON RIGHT:

              PHOTO 1      PHOTO 2

              PHOTO 3

              PHOTO 4      PHOTO 5

            */}
            {/* ================================================= */}

            {photos.length === 5 && (
              <div className="grid grid-cols-2 gap-x-5 gap-y-6">

                {/* --------------------------------------------- */}
                {/* PHOTO 1 */}
                {/* --------------------------------------------- */}

                <div className="col-start-1 row-start-1 h-[115px] w-full overflow-hidden">
                  <img
                    src={photos[0]}
                    alt={`${name} photo 1`}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* --------------------------------------------- */}
                {/* PHOTO 2 */}
                {/* --------------------------------------------- */}

                <div className="col-start-2 row-start-1 h-[115px] w-full overflow-hidden">
                  <img
                    src={photos[1]}
                    alt={`${name} photo 2`}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* --------------------------------------------- */}
                {/* PHOTO 3 — SWITCHES SIDES */}
                {/* --------------------------------------------- */}

                <div
                  className={`
                    row-start-2
                    h-[115px]
                    w-full
                    overflow-hidden

                    ${
                      descriptionIsLeft
                        ? "col-start-2"
                        : "col-start-1"
                    }
                  `}
                >
                  <img
                    src={photos[2]}
                    alt={`${name} photo 3`}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* --------------------------------------------- */}
                {/* PHOTO 4 */}
                {/* --------------------------------------------- */}

                <div className="col-start-1 row-start-3 h-[115px] w-full overflow-hidden">
                  <img
                    src={photos[3]}
                    alt={`${name} photo 4`}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* --------------------------------------------- */}
                {/* PHOTO 5 */}
                {/* --------------------------------------------- */}

                <div className="col-start-2 row-start-3 h-[115px] w-full overflow-hidden">
                  <img
                    src={photos[4]}
                    alt={`${name} photo 5`}
                    className="h-full w-full object-cover"
                  />
                </div>

              </div>
            )}

            {/* ================================================= */}
            {/* 6 PHOTO COLLAGE */}
            {/* ================================================= */}

            {photos.length === 6 && (
              <div className="grid grid-cols-2 gap-x-5 gap-y-6">

                {/* PHOTO 1 */}
                <div className="col-start-1 row-start-1 h-[90px] w-full overflow-hidden">
                  <img
                    src={photos[0]}
                    alt={`${name} photo 1`}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* PHOTO 2 */}
                <div className="col-start-2 row-start-1 h-[90px] w-full overflow-hidden">
                  <img
                    src={photos[1]}
                    alt={`${name} photo 2`}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* PHOTO 3 */}
                <div className="col-start-1 row-start-2 h-[90px] w-full overflow-hidden">
                  <img
                    src={photos[2]}
                    alt={`${name} photo 3`}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* PHOTO 4 */}
                <div className="col-start-1 row-start-3 h-[90px] w-full overflow-hidden">
                  <img
                    src={photos[3]}
                    alt={`${name} photo 4`}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* PHOTO 5 */}
                <div className="col-start-1 row-start-4 h-[90px] w-full overflow-hidden">
                  <img
                    src={photos[4]}
                    alt={`${name} photo 5`}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* PHOTO 6 */}
                <div className="col-start-2 row-start-4 h-[90px] w-full overflow-hidden">
                  <img
                    src={photos[5]}
                    alt={`${name} photo 6`}
                    className="h-full w-full object-cover"
                  />
                </div>

              </div>
            )}

            {/* ================================================= */}
            {/* OTHER PHOTO COUNTS */}
            {/* ================================================= */}

            {photos.length !== 5 && photos.length !== 6 && (
              <div className="grid grid-cols-3 gap-6">

                {photos.map((photo, index) => (
                  <div
                    key={`${photo}-${index}`}
                    className="h-[140px] w-full overflow-hidden"
                  >
                    <img
                      src={photo}
                      alt={`${name} photo ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}

              </div>
            )}

          </div>

          {/* ================================================= */}
          {/* FEATURED IMAGE */}
          {/* ================================================= */}

          {featuredImage && (
            <div
              className={`
                absolute
                top-[38%]
                z-10
                hidden
                w-[245px]
                rotate-[-8deg]
                md:block

                ${
                  descriptionIsLeft
                    ? "right-[21%]"
                    : "left-[21%]"
                }
              `}
            >
              <img
                src={featuredImage}
                alt={`${name} featured`}
                className="w-full object-contain drop-shadow-[0_15px_18px_rgba(0,0,0,0.55)]"
              />
            </div>
          )}

          {/* ================================================= */}
          {/* CTA BUTTON */}
          {/* ================================================= */}

          <div className="absolute bottom-[22px] left-1/2 z-30 -translate-x-1/2">

            <button
              className="rounded-full border border-white/30 bg-white/15 px-6 py-[6px] text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/25"
              style={{
                fontFamily: "futura-pt, sans-serif",
                fontWeight: 300,
                fontSize: "10px",
                letterSpacing: "0.03em",
              }}
            >
              Get your Story{" "}

              <span
                style={{
                  fontFamily: "futura-pt, sans-serif",
                  fontWeight: 500,
                }}
              >
                Scripted
              </span>

              &nbsp;&nbsp;&gt;&gt;
            </button>

          </div>

        </section>

        {/* ===================================================== */}
        {/* SOCIAL ICONS */}
        {/* ===================================================== */}

        <div className="fixed bottom-6 right-5 z-30">
          <SocialIcos />
        </div>

      </div>

    </main>
  );
}