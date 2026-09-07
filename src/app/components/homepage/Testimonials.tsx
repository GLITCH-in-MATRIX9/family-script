"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BACKDROP_PHOTO = "/assets/testimonials/testimonials-bg.png";

type Testimonial = {
  quote: string;
  name: string;
  project: string;
  photo: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Varun & Elina",
    project: "The Wedding Hamper Project",
    photo: "/assets/testimonials/varun-elina.png",
    quote:
      'We are so grateful to the entire FS team for making our wedding so special and memorable. The hamper you created for us was amazing and unique. It had the traditional elements and also a hint of what we love. All of our guests were really delighted and impressed by the contents of the basket. They appreciated how you chose sustainable and eco-friendly products. The stories behind each of the items made it so much more personal and the "fun facts" about the both of us was such a nice touch too!\n\nYou all really put a lot of thought and effort into it. Thank you so much for all your patience, creativity and energy that went into making this a highlight of our wedding!',
  },
  {
    name: "Sucharita Hota",
    project: "The Graduation Book",
    photo: "/assets/testimonials/sucharita-hota.png",
    quote:
      "Dear Team Family Script,\n\nThis is a small note of appreciation for the wonderful graduation book you helped me create for my daughter. It was the perfect gift and the best surprise ever for her. Thank you for so beautifully weaving the threads of her life into such a beautiful tapestry. The time and effort your team put in, responding to my every message, voice note and email was exemplary. Your attention to detail was executed to near perfection. I could not have found a better team to work with and I’m so glad I chose you for something so personal and close to me. You made it so easy to put my trust in your team with your positive attitude and friendliness. For that you guys have my heart.\n\nWishing you all success in all your endeavours.\n\nI will always choose you as my “go-to” team.",
  },
  {
    name: "Romonika Sharan",
    project: "Colombo Colours: Photo Book",
    photo: "/assets/testimonials/romonika-sharan.png",
    quote:
      "Thankyou, FS for crafting this mosaic of memorable moments from our holiday with the parivar in Colombo, Dec 2022. It was an absolute privilege to host 18 people from across the world and experience Sri Lanka together. It was thanks to the patience and professionalism of Faria and the FS team that later helped me select special moments from our family occasions to craft a permanent pathway that we can travel through and renew the warp and weft of family bonds.",
  },
  {
    name: "Vimlendra and Romonika D Sharan",
    project: "Graduation Journeys: Photo Book",
    photo: "/assets/testimonials/vimlendra-romonika-sharan.png",
    quote:
      "Holding on and letting go are intrinsic elements of most close relationships especially the precious one between a parent and a child. FS played a key role in celebrating the graduation of our son from the University of Toronto, Canada and the post graduation of our daughter from the Institute of development Studies, Sussex, UK. These books produced by FS provide our family with a recording of some of the moments of preparation, adventure, trepidation and of course celebration that we shared as a family across 4 different cities and 3 different time zones over the last few years.\n\nWe shall always be grateful to the team at FS for their empathetic support and professional expertise in curating these personalised academic journeys as our children step out into the world.",
  },
  {
    name: "Nikita Gupta",
    project: "The Wedding Book",
    photo: "/assets/testimonials/nikita-gupta.png",
    quote:
      "The Wedding Book is a real treasure for me, the right treasure I got at the right time. It’s the legacy of my family I carry with me, and the link which commences my new journey with Mrigank’s family.\n\nWhen we were finally presented with the book, it was such a lovely surprise - looking through it and all our stories! But even more beautiful thing about the Wedding Book is that it keeps getting more interesting with time. Everytime it is opened, we get to know new things about our own families.",
  },
];

type SidePreset = {
  boxLeft: number;
  photoLeft: number;
  quoteLeft: number;
  quoteAlign: "left" | "right";
  nameLeft: number;
  nameAlign: "left" | "right";
};

const LEFT_PRESET: SidePreset = {
  boxLeft: 309,
  photoLeft: 204,
  quoteLeft: 421,
  quoteAlign: "left",
  nameLeft: 1024,
  nameAlign: "left",
};

const RIGHT_PRESET: SidePreset = {
  boxLeft: 204,
  photoLeft: 1054,
  quoteLeft: 321,
  quoteAlign: "right",
  nameLeft: 270,
  nameAlign: "left",
};

const MIN_BOX_HEIGHT = 208;

// Gap between every testimonial in the normal-flow list — kept generous
// (matches the old "pause between pairs" breathing room) now that there's
// no viewport/pair concept left to distinguish "within" vs "between" gaps.
const TESTIMONIAL_GAP = 60;

// Testimonial list starts here, matching the original Figma-measured
// position (298px below the canvas top) — everything below is normal
// document flow, so it grows naturally to fit however tall the real
// content is instead of being clipped to one fixed viewport.
const LIST_TOP = 298;

function TestimonialBox({
  testimonial,
  preset,
}: {
  testimonial: Testimonial;
  preset: SidePreset;
}) {
  const quoteMeasureRef = useRef<HTMLParagraphElement>(null);
  const [boxHeight, setBoxHeight] = useState(MIN_BOX_HEIGHT);

  const quoteWidth = 654;
  const quoteTop = 45;
  const nameTop = 162;
  const nameWidth = 217;

  useEffect(() => {
    const measure = () => {
      if (!quoteMeasureRef.current) return;

      const textHeight = quoteMeasureRef.current.scrollHeight;
      const requiredHeight = Math.max(MIN_BOX_HEIGHT, quoteTop + textHeight + 20);

      setBoxHeight(requiredHeight);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    if (quoteMeasureRef.current) {
      resizeObserver.observe(quoteMeasureRef.current);
    }

    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [testimonial.quote]);

  return (
    <div className="relative" style={{ width: 1440, height: boxHeight }}>
      {/* Hidden measuring text */}
      <p
        ref={quoteMeasureRef}
        aria-hidden="true"
        className="futura-medium pointer-events-none absolute whitespace-pre-line text-[20px] leading-[30px] tracking-[0.05em]"
        style={{
          width: quoteWidth,
          height: "auto",
          top: quoteTop,
          left: preset.quoteLeft,
          visibility: "hidden",
        }}
      >
        {testimonial.quote}
      </p>

      {/* Rectangle */}
      <div
        className="absolute rounded-[15px]"
        style={{
          width: 902,
          height: boxHeight,
          top: 0,
          left: preset.boxLeft,
          border: "0.5px solid #FFFFFF",
          transition: "height 0.25s ease",
        }}
      />

      {/* Quote */}
      <p
        className="futura-medium absolute whitespace-pre-line text-[20px] leading-[30px] tracking-[0.05em]"
        style={{
          width: quoteWidth,
          height: "auto",
          top: quoteTop,
          left: preset.quoteLeft,
          color: "#FFF5E5",
          textAlign: preset.quoteAlign,
          opacity: 1,
        }}
      >
        {testimonial.quote}
      </p>

      {/* Name */}
      <p
        className="futura-medium absolute text-[12px] leading-[20px] tracking-normal"
        style={{
          width: nameWidth,
          height: 20,
          top: nameTop,
          left: preset.nameLeft,
          color: "#FFF5E5",
          textAlign: preset.nameAlign,
          opacity: 1,
        }}
      >
        {testimonial.name}
      </p>

      {/* Project */}
      <p
        className="futura-light absolute text-[12px] leading-[20px] tracking-normal"
        style={{
          width: nameWidth,
          height: 20,
          top: nameTop + 20,
          left: preset.nameLeft,
          color: "#D2C6B2",
          textAlign: preset.nameAlign,
          opacity: 1,
        }}
      >
        {testimonial.project}
      </p>

      {/* Photo */}
      <div
        className="absolute rounded-[15px]"
        style={{
          width: 158,
          height: 183,
          top: 12,
          left: preset.photoLeft,
          backgroundImage: `url("${testimonial.photo}")`,
          backgroundSize: "250px 333px",
          backgroundPosition: "-46px -37px",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}

export default function Testimonials() {
  const headingRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      [headingRef.current, descriptionRef.current].forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      boxRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full bg-[#460A26]">
      {/* =====================================================
          FIXED-HEIGHT BACKDROP BAND

          Stays exactly 823px tall behind the heading/description,
          matching the original Figma artwork. The testimonial list
          below flows naturally past this band as needed — it is no
          longer clipped to a single viewport.
          ===================================================== */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{ width: "100%", height: 823, zIndex: 0 }}
      >
        <img
          src={BACKDROP_PHOTO}
          alt=""
          className="absolute inset-0 h-full w-full"
          style={{
            width: "100%",
            height: 823,
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />

        {/* Group 41 */}
        {[
          { width: 1455.93, height: 834, top: -13, left: 2.02 },
          { width: 1456.94, height: 830.85, top: -9.85, left: 1.01 },
          { width: 1455.93, height: 834, top: -13, left: 2.02 },
          { width: 1459.97, height: 394.45, top: 426.55, left: 2.02 },
          { width: 1457.95, height: 830.85, top: -9.85, left: 2.02 },
        ].map((rect, i) => (
          <div
            key={`group41-${i}`}
            className="absolute"
            style={{
              ...rect,
              opacity: 0.26,
              background:
                "linear-gradient(356.76deg, rgba(0, 0, 0, 1) 2.81%, rgba(102, 102, 102, 0) 71.6%)",
            }}
          />
        ))}

        {/* Gradient layers */}
        {[
          { width: 1436, height: 813, top: 8, left: 1 },
          { width: 1436, height: 813, top: 8, left: 1 },
          { width: 1436, height: 813, top: 8, left: 1 },
          { width: 1436, height: 384, top: 437, left: 1 },
          { width: 1436, height: 384, top: 437, left: 1 },
        ].map((rect, i) => (
          <div
            key={`gradient-${i}`}
            className="absolute"
            style={{
              ...rect,
              opacity: 0.26,
              background:
                "linear-gradient(356.76deg, rgba(0, 0, 0, 0.5) 2.81%, rgba(102, 102, 102, 0) 71.6%)",
            }}
          />
        ))}
      </div>

      {/* =====================================================
          CONTENT CANVAS

          Retains the original 1440px coordinate system for the
          heading/description; grows naturally in height (no fixed
          823 clip) so the normal-flow testimonial list below can
          extend past the backdrop band.
          ===================================================== */}
      <div
        className="relative mx-auto"
        style={{ width: 1440, zIndex: 1, paddingTop: LIST_TOP }}
      >
        {/* Heading */}
        <div
          ref={headingRef}
          className="absolute"
          style={{ width: 624, height: 147, top: 75, left: 411, opacity: 1 }}
        >
          <h2
            className="futura-medium w-full text-[50px] leading-[75px] tracking-[0.05em] text-white"
            style={{ textAlign: "center" }}
          >
            TESTIMONIALS
          </h2>
        </div>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="futura-light absolute text-center text-[15px] leading-[20px] tracking-[0.05em] text-white"
          style={{
            width: 737.5399169921875,
            height: 60.22304916381836,
            top: 162,
            left: 351,
            opacity: 1,
          }}
        >
          This is a tribute to our friends at Family Script, who have been
          unwavering pillars of support throughout our journey, alongside many
          others who have also played pivotal roles in our endeavors.
        </p>

        {/* Testimonial list — normal document flow, alternating
            photo-left/photo-right styling by index. */}
        <div>
          {TESTIMONIALS.map((testimonial, i) => (
            <div
              key={testimonial.name}
              ref={(el) => {
                boxRefs.current[i] = el;
              }}
              style={{ marginBottom: i === TESTIMONIALS.length - 1 ? 0 : TESTIMONIAL_GAP }}
            >
              <TestimonialBox
                testimonial={testimonial}
                preset={i % 2 === 0 ? LEFT_PRESET : RIGHT_PRESET}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
