"use client";

export default function OurJourney() {
  return (
    <section
      className="relative w-full overflow-hidden py-24 md:py-32"
      style={{
        background:
          "radial-gradient(circle at 50% 0%, rgba(94, 33, 51, 1) 0%, rgba(52, 18, 30, 1) 45%, rgba(22, 9, 14, 1) 100%)",
      }}
    >
      {/* ================= HEADING ================= */}
      <div className="futura-light flex flex-col items-center text-center text-white">
        <div className="uppercase text-[1.1rem] leading-none">
          Our
        </div>

        <h2 className="mt-3 uppercase text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-[0.12em]">
          Journey
        </h2>
      </div>


      {/* ================= TIMELINE — MOBILE ================= */}
      <div className="mt-10 space-y-10 px-6 md:hidden">

        {JOURNEY_STOPS.map((stop, index) => (
          <div
            key={`${stop.year}-mobile-${index}`}
            className="flex gap-4"
          >

            <div className="flex flex-col items-center pt-1">
              <div className="h-2 w-2 rounded-full bg-white/60" />

              {index < JOURNEY_STOPS.length - 1 && (
                <div className="mt-1 w-px flex-1 bg-white/25" />
              )}
            </div>


            <div className="flex-1 pb-2">

              {/* YEAR */}
              <span className="futura-light text-[1.05rem] text-white">
                {stop.year}
              </span>


              {/* PHOTO */}
              {stop.photo !== "none" && (
                <img
                  src="/assets/homepage/REVA KHANNA.png"
                  alt=""
                  className="mt-2 h-[80px] w-[96px] rounded-sm object-cover shadow-lg"
                />
              )}


              {/* CAPTION */}
              {stop.caption && (
                <p
                  className="futura-light mt-2"
                  style={{
                    fontSize: "0.78rem",
                    lineHeight: 1.5,
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


      {/* ================= TIMELINE — DESKTOP ================= */}
      <div className="relative mx-auto mt-16 hidden h-[420px] w-[82%] max-w-[1700px] md:mt-20 md:block">

        {/* ================= AXIS ================= */}
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/40" />


        {/* LEFT END DOT */}
        <div
          className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70"
          style={{
            width: 5,
            height: 5,
          }}
        />


        {/* RIGHT END DOT */}
        <div
          className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70"
          style={{
            width: 5,
            height: 5,
          }}
        />


        {/* ================= JOURNEY STOPS ================= */}
        {JOURNEY_STOPS.map((stop, index) => {

          const gap = stop.gap ?? AXIS_GAP;

          const captionSide =
            stop.caption == null
              ? null
              : (stop.captionSide ??
                (stop.photo === "down" ? "below" : "above"));


          const captionVertical =
            stop.photo === "none"
              ? captionSide === "above"
                ? { bottom: NONE_CAPTION_GAP }
                : { top: NONE_CAPTION_GAP }
              : stop.photo === "up"
                ? { bottom: gap + PHOTO_SIZE / 2 }
                : { top: gap + PHOTO_SIZE / 2 };


          const labelSide = stop.labelSide ?? "on";


          return (
            <div
              key={`${stop.year}-${index}`}
              className="absolute"
              style={{
                left: `${stop.xPercent}%`,
                top: "50%",
              }}
            >

              {/* ================= CONNECTOR + PHOTO ================= */}
              {stop.photo !== "none" && (
                <>

                  {/* CONNECTOR LINE */}
                  <div
                    className="absolute left-0 w-px -translate-x-1/2 bg-white/40"
                    style={
                      stop.photo === "up"
                        ? {
                            bottom: 0,
                            height: gap,
                          }
                        : {
                            top: 0,
                            height: gap,
                          }
                    }
                  />


                  {/* PHOTO */}
                  <div
                    className="absolute left-0 -translate-x-1/2 overflow-hidden rounded-sm shadow-lg"
                    style={{
                      width: PHOTO_SIZE,
                      height: PHOTO_SIZE,

                      ...(stop.photo === "up"
                        ? { bottom: gap + PHOTO_LIFT }
                        : { top: gap + PHOTO_LIFT }),
                    }}
                  >
                    <img
                      src="/assets/homepage/REVA KHANNA.png"
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>


                  {/* CONNECTOR END DOT */}
                  <div
                    className="absolute left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70"
                    style={{
                      width: 5,
                      height: 5,

                      ...(stop.photo === "up"
                        ? { bottom: gap }
                        : { top: gap }),
                    }}
                  />

                </>
              )}


              {/* ================= CAPTION ================= */}
              {stop.caption && captionSide && (
                <p
                  className="futura-light absolute text-center"
                  style={{
                    ...((stop.captionAlign ?? "left") === "right"
                      ? {
                          left:
                            PHOTO_SIZE / 2 +
                            12 +
                            (stop.captionOffset ?? 0),
                        }
                      : {
                          right:
                            PHOTO_SIZE / 2 +
                            12 -
                            (stop.captionOffset ?? 0),
                        }),

                    ...captionVertical,

                    width: CAPTION_WIDTH,
                    fontSize: "0.66rem",
                    lineHeight: 1.4,
                    color: CAPTION_COLOR,
                  }}
                >
                  {stop.caption}
                </p>
              )}


              {/* ================= YEAR LABEL ================= */}
              <span
                className="futura-light absolute inline-flex items-center whitespace-nowrap text-white"
                style={{
                  left: stop.labelOffset ?? 0,

                  transform:
                    labelSide === "on"
                      ? "translate(-50%, -50%)"
                      : "translateX(-50%)",

                  ...(labelSide === "above"
                    ? { bottom: LABEL_GAP }
                    : labelSide === "below"
                      ? { top: LABEL_GAP }
                      : { top: 0 }),

                  fontSize: "1.05rem",
                  lineHeight: 1,
                }}
              >
                {stop.year}
              </span>

            </div>
          );
        })}

      </div>


    </section>
  );
}


/* ============================================================
   JOURNEY DATA
   ============================================================ */

type JourneyPhoto = "up" | "down" | "none";

interface JourneyStop {
  year: string;
  xPercent: number;
  photo: JourneyPhoto;
  caption?: string;
  captionOffset?: number;
  captionAlign?: "left" | "right";
  captionSide?: "above" | "below";
  gap?: number;
  labelSide?: "above" | "below" | "on";
  labelOffset?: number;
}


/* ============================================================
   CONSTANTS
   ============================================================ */

const AXIS_GAP_LONG = 108;
const AXIS_GAP_SHORT = 58;

const CAPTION_COLOR = "#cda06e";

const PHOTO_SIZE = 78;
const CAPTION_WIDTH = 130;

const AXIS_GAP = 42;
const NONE_CAPTION_GAP = 34;
const PHOTO_LIFT = 10;
const LABEL_GAP = 2;


/* ============================================================
   JOURNEY STOPS
   ============================================================ */

const JOURNEY_STOPS: JourneyStop[] = [
  {
    year: "2015",
    xPercent: 5,
    photo: "none",
    caption:
      "Two friends, Kshitij and Rishi, envisioned bringing memories out of wardrobes to celebrate family legacies, giving birth to Family Script.",
    captionOffset: 25,
    captionAlign: "left",
    captionSide: "above",
    labelSide: "above",
    labelOffset: -40,
  },

  {
    year: "2017",
    xPercent: 12,
    photo: "up",
    caption:
      "Incubated at IGDTUW-Anveshan Foundation and formally registered as Prarabdha Info Solutions Private Limited, marking Family Script's first institutional milestone.",
    captionOffset: 5,
    captionAlign: "left",
    labelSide: "below",
    gap: 112,
  },

  {
    year: "2018",
    xPercent: 21,
    photo: "down",
    caption:
      "Selected among India's top 16 from 400 applicants, Family Script received three months of entrepreneurship training and mentorship from the University of Texas at Austin, USA.",
    captionOffset: 5,
    captionAlign: "left",
    labelSide: "above",
    gap: AXIS_GAP_LONG,
  },

  {
    year: "2019",
    xPercent: 32,
    photo: "up",
    caption:
      "Our first 8+ analogue projects tested the waters, transforming personal milestones and intimate family memories into meaningful, tangible legacies.",
    captionOffset: 9,
    captionAlign: "left",
    labelSide: "below",
    gap: AXIS_GAP_SHORT,
  },

  {
    year: "2020 - 2022",
    xPercent: 41,
    photo: "down",
    caption:
      "A period of reflection and family time, amidst difficult circumstances, deepened our belief in preserving oral histories before they are lost.",
    captionOffset: 5,
    captionAlign: "left",
    labelSide: "above",
    gap: AXIS_GAP_SHORT,
  },

  {
    year: "2023",
    xPercent: 51,
    photo: "up",
    caption:
      "Family Script became a daily pursuit as Meenakshi joined as Director, a young team came together, and Family Script 2.0 was launched.",
    captionOffset: 5,
    captionAlign: "left",
    labelSide: "below",
    gap: AXIS_GAP_LONG,
  },

  {
    year: "2023 - 2026",
    xPercent: 61,
    photo: "down",
    caption:
      "28+ projects completed across biographies, memoirs, institutional histories, practice histories, and diverse forms of legacy documentation.",
    captionOffset: 5,
    captionAlign: "left",
    labelSide: "above",
    gap: AXIS_GAP_LONG,
  },

  {
    year: "2024",
    xPercent: 73,
    photo: "up",
    caption:
      "Exhibited Family Script projects and Indigo Chronicles, a set of three journals to Create, Cherish and Celebrate life, at DCWA's Diplomatic Bazaar; bringing life documentation and legacy-making to a wider audience.",
    captionOffset: 9,
    captionAlign: "left",
    labelSide: "below",
    gap: AXIS_GAP_SHORT,
  },

  {
    year: "2025",
    xPercent: 83,
    photo: "down",
    caption:
      "Family Script won the UX India 2025 Design Pitch Competition, emerging among 149 global entries and pitching to leading investors in Hyderabad.",
    captionOffset: 5,
    captionAlign: "right",
    labelSide: "above",
    gap: AXIS_GAP_SHORT,
  },

  {
    year: "2026",
    xPercent: 92,
    photo: "up",
    caption:
      "Showcased Family Script's Digital Model at the India Impact AI Summit 2026, representing Delhi Government-promoted startups and opening new institutional opportunities.",
    captionOffset: 5,
    captionAlign: "right",
    labelSide: "below",
    gap: AXIS_GAP_LONG,
  },

  {
    year: "Future Vision",
    xPercent: 104,
    photo: "none",
    labelSide: "on",
  },
];