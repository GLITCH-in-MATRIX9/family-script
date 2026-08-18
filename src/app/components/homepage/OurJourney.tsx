"use client";

import { useState } from "react";

type JourneyPhoto = "up" | "down" | "none";

interface JourneyStop {
  year: string;
  photo: JourneyPhoto;
  caption?: string;
  captionSide?: "above" | "below";
  labelSide?: "above" | "below" | "on";
}

const JOURNEY_STOPS: JourneyStop[] = [
  {
    year: "2015",
    photo: "none",
    caption:
      "Two friends, Kshitij and Rishi, envisioned bringing memories out of wardrobes to celebrate family legacies, giving birth to Family Script.",
    captionSide: "above",
    labelSide: "above",
  },
  {
    year: "2017",
    photo: "up",
    caption:
      "Incubated at IGDTUW-Anveshan Foundation and formally registered as Prarabdha Info Solutions Private Limited, marking Family Script's first institutional milestone.",
    captionSide: "above",
    labelSide: "below",
  },
  {
    year: "2018",
    photo: "down",
    caption:
      "Selected among India's top 16 from 400 applicants, Family Script received three months of entrepreneurship training and mentorship from the University of Texas at Austin, USA.",
    captionSide: "below",
    labelSide: "above",
  },
  {
    year: "2019",
    photo: "up",
    caption:
      "Our first 8+ analogue projects tested the waters, transforming personal milestones and intimate family memories into meaningful, tangible legacies.",
    captionSide: "above",
    labelSide: "below",
  },
  {
    year: "2020 - 2022",
    photo: "down",
    caption:
      "A period of reflection and family time, amidst difficult circumstances, deepened our belief in preserving oral histories before they are lost.",
    captionSide: "below",
    labelSide: "above",
  },
  {
    year: "2023",
    photo: "up",
    caption:
      "Family Script became a daily pursuit as Meenakshi joined as Director, a young team came together, and Family Script 2.0 was launched.",
    captionSide: "above",
    labelSide: "below",
  },
  {
    year: "2023 - 2026",
    photo: "down",
    caption:
      "28+ projects completed across biographies, memoirs, institutional histories, practice histories, and diverse forms of legacy documentation.",
    captionSide: "below",
    labelSide: "above",
  },
  {
    year: "2024",
    photo: "up",
    caption:
      "Exhibited Family Script projects and Indigo Chronicles, a set of three journals to Create, Cherish and Celebrate life, at DCWA's Diplomatic Bazaar; bringing life documentation and legacy-making to a wider audience.",
    captionSide: "above",
    labelSide: "below",
  },
  {
    year: "2025",
    photo: "down",
    caption:
      "Family Script won the UX India 2025 Design Pitch Competition, emerging among 149 global entries and pitching to leading investors in Hyderabad.",
    captionSide: "below",
    labelSide: "above",
  },
  {
    year: "2026",
    photo: "up",
    caption:
      "Showcased Family Script's Digital Model at the India Impact AI Summit 2026, representing Delhi Government-promoted startups and opening new institutional opportunities.",
    captionSide: "above",
    labelSide: "below",
  },
  {
    year: "Future Vision",
    photo: "none",
    labelSide: "on",
  },
];

const ITEMS_PER_VIEW = 4;
const PHOTO_SIZE = 78;
const CAPTION_COLOR = "#cda06e";

export default function OurJourney() {
  const [startIndex, setStartIndex] = useState(0);

  const maxIndex = JOURNEY_STOPS.length - ITEMS_PER_VIEW;

  const goPrevious = () => {
    setStartIndex((current) => Math.max(0, current - 1));
  };

  const goNext = () => {
    setStartIndex((current) =>
      Math.min(maxIndex, current + 1)
    );
  };

  return (
    <section
      className="relative w-full overflow-hidden py-24 md:py-32"
      style={{
        background:
          "radial-gradient(circle at 50% 0%, rgba(94, 33, 51, 1) 0%, rgba(52, 18, 30, 1) 45%, rgba(22, 9, 14, 1) 100%)",
      }}
    >
      {/* =====================================================
          HEADING
      ===================================================== */}

      <div className="futura-light flex flex-col items-center text-center text-white">
        <div className="uppercase text-[1.1rem] leading-none">
          Our
        </div>

        <h2 className="mt-3 uppercase text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-[0.12em]">
          Journey
        </h2>
      </div>


      {/* =====================================================
          MOBILE
      ===================================================== */}

      <div className="mt-12 space-y-10 px-6 md:hidden">

        {JOURNEY_STOPS.map((stop, index) => (
          <div
            key={`${stop.year}-${index}`}
            className="flex gap-5"
          >

            <div className="flex flex-col items-center">

              <div className="h-2.5 w-2.5 rounded-full bg-white/70" />

              {index < JOURNEY_STOPS.length - 1 && (
                <div className="mt-1 w-px flex-1 bg-white/25" />
              )}

            </div>


            <div className="flex-1 pb-8">

              <span className="futura-light text-[18px] text-white">
                {stop.year}
              </span>

              {stop.photo !== "none" && (
                <div className="mt-3 h-[80px] w-[96px] overflow-hidden rounded-sm shadow-lg">
                  <img
                    src="/assets/homepage/REVA KHANNA.png"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {stop.caption && (
                <p
                  className="futura-light mt-3 max-w-[450px] text-[13px] leading-[1.5]"
                  style={{
                    color: CAPTION_COLOR,
                  }}
                >
                  {stop.caption}
                </p>
              )}

            </div>

          </div>
        ))}

      </div>


      {/* =====================================================
          DESKTOP TIMELINE
      ===================================================== */}

      <div className="relative mx-auto mt-20 hidden h-[500px] w-[86%] max-w-[1500px] md:block">

        {/* ===================================================
            LEFT ARROW
        =================================================== */}

        <button
          type="button"
          onClick={goPrevious}
          disabled={startIndex === 0}
          aria-label="Previous years"
          className="
            absolute
            left-[-55px]
            top-1/2
            z-50
            flex
            h-12
            w-12
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-white/[0.03]
            text-[25px]
            text-white
            backdrop-blur-sm
            transition-all
            duration-300
            hover:border-white/40
            hover:bg-white/10
            disabled:pointer-events-none
            disabled:opacity-20
          "
        >
          ←
        </button>


        {/* ===================================================
            RIGHT ARROW
        =================================================== */}

        <button
          type="button"
          onClick={goNext}
          disabled={startIndex === maxIndex}
          aria-label="Next years"
          className="
            absolute
            right-[-55px]
            top-1/2
            z-50
            flex
            h-12
            w-12
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-white/[0.03]
            text-[25px]
            text-white
            backdrop-blur-sm
            transition-all
            duration-500
            hover:border-white/40
            hover:bg-white/10
            disabled:pointer-events-none
            disabled:opacity-20
          "
        >
          →
        </button>


        {/* ===================================================
            VIEWPORT
            ONLY 4 YEARS ARE VISIBLE
        =================================================== */}

        <div className="absolute inset-0 overflow-hidden">

          {/* ================= AXIS ================= */}

          <div className="absolute left-0 right-0 top-1/2 z-10 h-px bg-white/35" />

          <div className="absolute left-0 top-1/2 z-20 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70" />

          <div className="absolute right-0 top-1/2 z-20 h-2 w-2 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70" />


          {/* =================================================
              MOVING TRACK
          ================================================= */}

          <div
            className="absolute left-0 top-0 flex h-full transition-transform duration-700 ease-in-out"
            style={{
              width: `${(JOURNEY_STOPS.length / ITEMS_PER_VIEW) * 100}%`,
              transform: `translateX(-${
                startIndex * (100 / JOURNEY_STOPS.length)
              }%)`,
            }}
          >

            {JOURNEY_STOPS.map((stop, index) => (

              <div
                key={`${stop.year}-${index}`}
                className="relative h-full shrink-0"
                style={{
                  width: `${100 / JOURNEY_STOPS.length}%`,
                }}
              >

                {/* =========================================
                    CENTER POINT
                ========================================= */}

                <div className="absolute left-1/2 top-1/2 z-30 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70" />


                {/* =========================================
                    PHOTO CONNECTOR
                ========================================= */}

                {stop.photo !== "none" && (
                  <div
                    className="absolute left-1/2 z-20 w-px -translate-x-1/2 bg-white/35"
                    style={
                      stop.photo === "up"
                        ? {
                            bottom: "50%",
                            height: 105,
                          }
                        : {
                            top: "50%",
                            height: 105,
                          }
                    }
                  />
                )}


                {/* =========================================
                    PHOTO
                ========================================= */}

                {stop.photo !== "none" && (
                  <div
                    className="absolute left-1/2 z-30 overflow-hidden rounded-sm shadow-lg"
                    style={
                      stop.photo === "up"
                        ? {
                            bottom: "calc(50% + 115px)",
                            width: PHOTO_SIZE,
                            height: PHOTO_SIZE,
                            transform: "translateX(-50%)",
                          }
                        : {
                            top: "calc(50% + 115px)",
                            width: PHOTO_SIZE,
                            height: PHOTO_SIZE,
                            transform: "translateX(-50%)",
                          }
                    }
                  >
                    <img
                      src="/assets/homepage/REVA KHANNA.png"
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}


                {/* =========================================
                    CAPTION
                ========================================= */}

                {stop.caption && (
                  <p
                    className={`
                      futura-light
                      absolute
                      left-1/2
                      z-20
                      w-[180px]
                      -translate-x-1/2
                      text-center
                      text-[11px]
                      leading-[1.45]
                    `}
                    style={{
                      color: CAPTION_COLOR,
                      ...(stop.captionSide === "below"
                        ? {
                            top: "calc(50% + 215px)",
                          }
                        : {
                            bottom: "calc(50% + 215px)",
                          }),
                    }}
                  >
                    {stop.caption}
                  </p>
                )}


                {/* =========================================
                    YEAR
                ========================================= */}

                <span
                  className={`
                    futura-light
                    absolute
                    left-1/2
                    z-40
                    whitespace-nowrap
                    text-[16px]
                    text-white
                  `}
                  style={
                    stop.labelSide === "above"
                      ? {
                          bottom: "calc(50% + 14px)",
                          transform: "translateX(-50%)",
                        }
                      : stop.labelSide === "below"
                        ? {
                            top: "calc(50% + 14px)",
                            transform: "translateX(-50%)",
                          }
                        : {
                            top: "50%",
                            transform:
                              "translate(-50%, -50%)",
                          }
                  }
                >
                  {stop.year}
                </span>

              </div>

            ))}

          </div>

        </div>


        {/* ===================================================
            PAGINATION
        =================================================== */}

        <div className="absolute bottom-[-25px] left-1/2 flex -translate-x-1/2 items-center gap-2">

          {Array.from({
            length: maxIndex + 1,
          }).map((_, index) => (

            <button
              key={index}
              type="button"
              aria-label={`Timeline position ${index + 1}`}
              onClick={() => setStartIndex(index)}
              className={`
                h-1.5
                rounded-full
                transition-all
                duration-300
                ${
                  index === startIndex
                    ? "w-7 bg-white/80"
                    : "w-1.5 bg-white/25 hover:bg-white/50"
                }
              `}
            />

          ))}

        </div>

      </div>


      {/* =====================================================
          MOBILE ARROWS
      ===================================================== */}

      <div className="mt-8 flex justify-center gap-5 md:hidden">

        <button
          type="button"
          onClick={goPrevious}
          disabled={startIndex === 0}
          className="
            rounded-full
            border
            border-white/20
            px-6
            py-2
            text-white
            transition-all
            disabled:opacity-20
          "
        >
          ←
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={startIndex === maxIndex}
          className="
            rounded-full
            border
            border-white/20
            px-6
            py-2
            text-white
            transition-all
            disabled:opacity-20
          "
        >
          →
        </button>

      </div>

    </section>
  );
}