"use client";

import { useEffect, useRef } from "react";

import {
  FiArrowUp,
  FiChevronDown,
  FiMail,
  FiPhone,
  FiUser,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";

import Link from "next/link";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   CONSTANTS
============================================================ */

const FIELD_BG = "rgba(105, 31, 62, 0.78)";

const FIELD_BORDER = "rgba(105, 31, 62, 0.25)";

const FIELD_OPTION_BG = "#691f3e";

/* ============================================================
   FOOTER DATA
============================================================ */

type FooterLink = {
  label: string;
  href: string;
};

// Plain strings still work everywhere below — only entries that need a real
// destination (like Testimonials) get upgraded to { label, href }.
const COMPANY_LINKS: (string | FooterLink)[] = [
  "About Us",
  "Our Team",
  "Our Story",
  "Awards & Events",
];

const PROJECT_LINKS: (string | FooterLink)[] = [
  "Portfolio Showcase",
  "Videos",
  "Behind The Scenes",
  "Testimonials",
];

const LEGAL_LINKS: (string | FooterLink)[] = [
  "Privacy Policy",
  "Terms & Conditions",
  "FAQs",
  "Contact Us",
];

/* ============================================================
   FORM FIELD
============================================================ */

function FormField({
  icon,
  placeholder,
  type = "text",
}: {
  icon?: React.ReactNode;
  placeholder: string;
  type?: string;
}) {
  return (
    <div
      className="
        contact-field
        group
        flex
        h-[46px]
        items-center
        gap-3
        rounded-[4px]
        border
        px-4
        transition-colors
        duration-200
        focus-within:border-[rgba(105,31,62,0.25)]
      "
      style={{
        backgroundColor: FIELD_BG,
        borderColor: FIELD_BORDER,
      }}
    >
      {icon && (
        <span className="flex shrink-0 items-center justify-center text-white/90">
          {icon}
        </span>
      )}

      <input
        type={type}
        placeholder={placeholder}
        className="
          futura-light
          min-w-0
          w-full
          appearance-none
          border-0
          bg-transparent
          text-[14px]
          tracking-[0.01em]
          text-white
          caret-white
          outline-none
          ring-0
          placeholder:text-white/85
          focus:border-0
          focus:bg-transparent
          focus:text-white
          focus:outline-none
          focus:ring-0
        "
      />
    </div>
  );
}

/* ============================================================
   FORM SELECT
============================================================ */

function FormSelect({ placeholder }: { placeholder: string }) {
  return (
    <div
      className="
        contact-field
        group
        relative
        flex
        h-[46px]
        items-center
        rounded-[4px]
        border
        px-4
        transition-colors
        duration-200
        focus-within:border-[rgba(105,31,62,0.25)]
      "
      style={{
        backgroundColor: FIELD_BG,
        borderColor: FIELD_BORDER,
      }}
    >
      <select
        defaultValue=""
        className="
          futura-light
          min-w-0
          w-full
          cursor-pointer
          appearance-none
          border-0
          bg-transparent
          pr-7
          text-[14px]
          tracking-[0.01em]
          text-white
          outline-none
          ring-0
          focus:border-0
          focus:bg-transparent
          focus:text-white
          focus:outline-none
          focus:ring-0
        "
        style={{
          backgroundColor: "transparent",
          color: "white",
        }}
      >
        <option
          value=""
          disabled
          style={{
            backgroundColor: FIELD_OPTION_BG,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          {placeholder}
        </option>

        <option
          value="memoir"
          style={{
            backgroundColor: FIELD_OPTION_BG,
            color: "white",
          }}
        >
          Memoirs, Anthologies, Biographies
        </option>

        <option
          value="documentary"
          style={{
            backgroundColor: FIELD_OPTION_BG,
            color: "white",
          }}
        >
          Documentaries, Short Films
        </option>

        <option
          value="archive"
          style={{
            backgroundColor: FIELD_OPTION_BG,
            color: "white",
          }}
        >
          Digital Archive Services
        </option>

        <option
          value="exhibition"
          style={{
            backgroundColor: FIELD_OPTION_BG,
            color: "white",
          }}
        >
          Exhibition Design
        </option>

        <option
          value="workshop"
          style={{
            backgroundColor: FIELD_OPTION_BG,
            color: "white",
          }}
        >
          Life Writing Workshops
        </option>

        <option
          value="journals"
          style={{
            backgroundColor: FIELD_OPTION_BG,
            color: "white",
          }}
        >
          Bespoke Journals
        </option>
      </select>

      <FiChevronDown
        size={17}
        className="
          pointer-events-none
          absolute
          right-4
          text-white/90
          transition-transform
          duration-200
          group-focus-within:rotate-180
        "
      />
    </div>
  );
}

/* ============================================================
   MESSAGE FIELD
============================================================ */

function MessageField() {
  return (
    <div
      className="
        contact-message
        col-span-2
        rounded-[4px]
        border
        px-4
        py-3
        transition-colors
        duration-200
        focus-within:border-[rgba(105,31,62,0.25)]
      "
      style={{
        backgroundColor: FIELD_BG,
        borderColor: FIELD_BORDER,
      }}
    >
      <textarea
        placeholder="Message"
        rows={3}
        className="
          futura-light
          block
          w-full
          resize-none
          appearance-none
          border-0
          bg-transparent
          text-[14px]
          leading-[1.4]
          tracking-[0.01em]
          text-white
          caret-white
          outline-none
          ring-0
          placeholder:text-white/85
          focus:border-0
          focus:bg-transparent
          focus:text-white
          focus:outline-none
          focus:ring-0
        "
      />
    </div>
  );
}

/* ============================================================
   FOOTER COLUMN
============================================================ */

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: (string | FooterLink)[];
}) {
  return (
    <div>
      <h3
        className="
          futura-medium
          text-[15px]
          leading-none
          text-white
          md:text-[16px]
        "
      >
        {title}
      </h3>

      <ul className="mt-4 space-y-2.5">
        {links.map((link) => {
          const label = typeof link === "string" ? link : link.label;
          const href = typeof link === "string" ? "#" : link.href;

          return (
            <li key={label}>
              <Link
                href={href}
                className="
                  futura-light
                  text-[13px]
                  leading-none
                  tracking-wide
                  text-white/60
                  transition-colors
                  duration-200
                  hover:text-white
                  md:text-[14px]
                "
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ============================================================
   FOOTER
============================================================ */

function ContactFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
        relative
        z-30
        mt-auto
        w-full
        shrink-0
        bg-[#57233b]
        text-white
      "
    >
      {/* ======================================================
          FULL-WIDTH FOOTER

          NO max-width.

          This stretches from the absolute left edge
          to the absolute right edge of the viewport.
      ====================================================== */}

      <div
        //py-3 from py-5 & md:py-4 from
        className="
          w-full
          px-8
          py-3
          md:px-12
          md:py-4
          lg:px-16
          xl:px-20
        "
      >
        {/* TOP DIVIDER */}

        <div
          //pt-3 from pt-5
          className="
            border-t
            border-white/20
            pt-3
          "
        >
          {/* ==================================================
              FOOTER GRID
          ================================================== */}

          <div
            //gap-y-5 from gap-y-8
            className="
    grid
    grid-cols-2
    gap-x-12
    gap-y-5
    md:grid-cols-[1.35fr_1fr_1fr_1fr]
    md:gap-x-16
    lg:grid-cols-[1.45fr_1fr_1fr_1fr]
    lg:gap-x-24
  "
          >
            {/* ==================================================
                FAMILY SCRIPT
            ================================================== */}

            <div
              className="
                col-span-2
                md:col-span-1
              "
            >
              <h2
                className="
                  futura-medium
                  text-[16px]
                  leading-none
                  text-white
                "
              >
                Family Script
              </h2>

              <p
                className="
                futura-light 
                mt-2 
                max-w-[340px] 
                text-[11px] 
                leading-[1.35] 
                tracking-wide 
                text-white/60 
                md:text-[12px]"
              >
                An offering of M/s Prarabdha Info Solutions Pvt Ltd, Incubated
                under IGDTUW-Anveshan Foundation, Delhi Registered under Startup
                India and MSME Recognised
              </p>

              <p
                className="
                futura-light 
                mt-2 
                text-[11px] 
                leading-[1.35] 
                tracking-wide 
                text-white/60 
                md:text-[12px]"
              >
                Contact Us:
                <br />
                Prarabdha Info Solutions Private Limited,
                <br />
                IGDTUW-Anveshan Foundation Premises,
                <br />
                Kashmere Gate, Delhi-06, India
              </p>

              <p
                className="
                futura-light 
                mt-2 
                text-[11px] 
                leading-[1.35] 
                tracking-wide 
                text-white/60 
                md:text-[12px]"
              >
                Email: info@familyscript.com,
                <br />
                team@familyscript.in
                <br />
                +91 9560283939
              </p>

              {/* SOCIAL ICONS */}

              <div className="mt-3 flex items-center gap-3">
                <Link
                  href="#"
                  aria-label="Instagram"
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/20
                    bg-white/[0.05]
                    text-white/70
                    transition-all
                    duration-300
                    hover:border-white/40
                    hover:bg-white/10
                    hover:text-white
                  "
                >
                  <FiInstagram size={14} />
                </Link>

                <Link
                  href="#"
                  aria-label="LinkedIn"
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/20
                    bg-white/[0.05]
                    text-white/70
                    transition-all
                    duration-300
                    hover:border-white/40
                    hover:bg-white/10
                    hover:text-white
                  "
                >
                  <FiLinkedin size={14} />
                </Link>

                <Link
                  href="#"
                  aria-label="Email"
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/20
                    bg-white/[0.05]
                    text-white/70
                    transition-all
                    duration-300
                    hover:border-white/40
                    hover:bg-white/10
                    hover:text-white
                  "
                >
                  <FiMail size={14} />
                </Link>
              </div>
            </div>

            {/* ==================================================
                COMPANY
            ================================================== */}

            <FooterColumn title="Company" links={COMPANY_LINKS} />

            {/* ==================================================
                PROJECTS
            ================================================== */}

            <FooterColumn title="Projects" links={PROJECT_LINKS} />

            {/* ==================================================
                LEGAL
            ================================================== */}

            <FooterColumn title="Legal" links={LEGAL_LINKS} />
          </div>

          {/* ==================================================
              BOTTOM BAR
          ================================================== */}

          <div
            className="
              mt-3
              border-t
              border-white/20
              pt-2
            "
          >
            <div
              className="
                flex
                flex-col
                gap-2
                md:flex-row
                md:items-center
                md:justify-between
              "
            >
              <p
                className="
                  futura-light
                  text-[10px]
                  tracking-wide
                  text-white/50
                  md:text-[11px]
                "
              >
                © {currentYear} Family Script by Prarabdha Info Solutions Pvt.
                Ltd.
              </p>

              <p
                className="
                  futura-light
                  text-[10px]
                  tracking-wide
                  text-white/50
                  md:text-[11px]
                "
              >
                All rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   SCROLL TO TOP
============================================================ */

function ScrollToTopButton() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      aria-label="Scroll to top"
      className="
        group
        fixed
        bottom-6
        right-6
        z-[100]
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        border
        border-white/30
        bg-[#691f3e]
        text-white
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-white/60
        hover:bg-[#581a34]
        focus:outline-none
        focus:ring-0
        md:bottom-8
        md:right-8
      "
    >
      <FiArrowUp
        size={18}
        className="
          transition-transform
          duration-300
          group-hover:-translate-y-0.5
        "
      />
    </button>
  );
}

/* ============================================================
   CONTACT SECTION
============================================================ */

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const headingRef = useRef<HTMLHeadingElement | null>(null);

  const formRef = useRef<HTMLFormElement | null>(null);

  const submitRef = useRef<HTMLButtonElement | null>(null);

  /* ==========================================================
     GSAP ANIMATION
  ========================================================== */

  useEffect(() => {
    const section = sectionRef.current;

    const heading = headingRef.current;

    const form = formRef.current;

    const submit = submitRef.current;

    if (!section || !heading || !form || !submit) {
      return;
    }

    const fields = form.querySelectorAll<HTMLElement>(".contact-field");

    const message = form.querySelector<HTMLElement>(".contact-message");

    if (!message) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(heading, {
        opacity: 0,
        y: 12,
      });

      gsap.set(fields, {
        opacity: 0,
        y: 10,
      });

      gsap.set(message, {
        opacity: 0,
        y: 10,
      });

      gsap.set(submit, {
        opacity: 0,
        y: 10,
      });

      const timeline = gsap.timeline({
        paused: true,
      });

      timeline.to(heading, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
      });

      timeline.to(
        fields,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.04,
          ease: "power2.out",
        },
        "-=0.18",
      );

      timeline.to(
        message,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.12",
      );

      timeline.to(
        submit,
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
        },
        "-=0.1",
      );

      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",

        onEnter: () => {
          timeline.restart();
        },

        onEnterBack: () => {
          timeline.restart();
        },
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <section
      ref={sectionRef}
      data-home-section="6"
      className="
        relative
        flex
        h-[100svh]
        min-h-[100svh]
        w-full
        flex-col
        
      "
    >
      {/* ======================================================
          BACKGROUND IMAGE

          EXACTLY 100svh.
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          h-[100svh]
          w-full
          
        "
        aria-hidden="true"
      >
        <img
          src="/assets/homepage/GET_YOUR_STORY_SCRIPTED.jpg"
          alt=""
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
          "
        />

        <div
          className="absolute inset-0"
          style={{
            background: "rgba(246, 239, 218, 0.66)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: "rgba(235, 220, 188, 0.12)",
          }}
        />
      </div>

      {/* ======================================================
          MAIN CONTACT CONTENT

          flex-1 means the Footer is pushed to
          the bottom of the 100svh section.
      ====================================================== */}

      <div
        data-ripple-element
        className="
          relative
          z-10
          flex
          min-h-0
          w-full
          flex-1
          flex-col
        "
      >
        {/* ====================================================
            CONTACT FORM
        ==================================================== */}

        <div
          className="
            flex
            w-full
            flex-1
            justify-center
            px-6
            pt-[6vh]
            pb-3
            md:px-10
            md:pt-[7vh]
            lg:px-12
          "
        >
          <div
            className="
              flex
              w-[72%]
              max-w-[1000px]
              flex-col
              items-center
              lg:w-[68%]
              xl:w-[64%]
            "
          >
            {/* TITLE */}

            <h2
              ref={headingRef}
              className="
                futura-light
                mb-5
                text-center
                text-[16px]
                leading-none
                tracking-[0.03em]
                text-[#542338]
                md:text-[17px]
                lg:text-[18px]
              "
            >
              Get your Story <span className="futura-bold">Scripted</span>{" "}
              &gt;&gt;
            </h2>

            {/* FORM */}

            <form
              ref={formRef}
              className="
                grid
                w-full
                grid-cols-2
                gap-x-5
                gap-y-3
              "
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <FormField
                icon={<FiUser size={15} />}
                placeholder="First name*"
              />

              <FormField icon={<FiUser size={15} />} placeholder="Last name" />

              <FormField
                icon={<FiMail size={15} />}
                placeholder="Email*"
                type="email"
              />

              <FormField
                icon={<FiPhone size={15} />}
                placeholder="Phone*"
                type="tel"
              />

              <FormSelect placeholder="What service would you like to avail?*" />

              <FormField placeholder="Documentation purpose" />

              <MessageField />

              <div
                className="
                  col-span-2
                  flex
                  justify-center
                  pt-1
                "
              >
                <button
                  ref={submitRef}
                  type="submit"
                  className="
                    futura-light
                    h-[40px]
                    min-w-[120px]
                    rounded-[4px]
                    border
                    border-[#6b203e]/20
                    bg-[#6b203e]
                    px-8
                    text-[13px]
                    tracking-[0.01em]
                    text-white
                    transition-all
                    duration-200
                    hover:bg-[#581a34]
                    active:scale-95
                  "
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ====================================================
            FOOTER

            mt-auto pushes this to the bottom.

            Footer itself is FULL WIDTH.
        ==================================================== */}

        <ContactFooter />
      </div>

      {/* ======================================================
          SCROLL TO TOP
      ====================================================== */}

      <ScrollToTopButton />
    </section>
  );
}
