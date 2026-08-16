"use client";

import Link from "next/link";
import {
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiArrowUpRight,
} from "react-icons/fi";

const COMPANY_LINKS = [
  "About Us",
  "Our Team",
  "Our Story",
  "Awards & Events",
];

const PROJECT_LINKS = [
  "Portfolio Showcase",
  "Videos",
  "Behind The Scenes",
  "Testimonials",
];

const LEGAL_LINKS = [
  "Privacy Policy",
  "Terms & Conditions",
  "FAQs",
  "Contact Us",
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  return (
    <div>
      <h3 className="futura-medium text-[16px] tracking-wide text-white">
        {title}
      </h3>

      <ul className="mt-5 space-y-3">
        {links.map((label) => (
          <li key={label}>
            <Link
              href="#"
              className="futura-light group inline-flex items-center text-[14px] tracking-wide text-white/65 transition-all duration-300 hover:text-white"
            >
              {label}

              <FiArrowUpRight
                size={12}
                className="ml-1 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-70"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-[#3b1425] text-white">

      <div className="mx-auto max-w-7xl px-7 py-14 md:px-10 md:py-16 lg:px-12">

        {/* ================= TOP DIVIDER ================= */}
        <div className="border-t border-white/20 pt-10">

          {/* ================= MAIN FOOTER GRID ================= */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-12 md:grid-cols-4 md:gap-x-16 lg:gap-x-24">

            {/* ================= FAMILY SCRIPT ================= */}
            <div className="col-span-2 md:col-span-1">

              {/* LOGO */}
              <Link
                href="/"
                className="inline-block"
              >
                <img
                  src="/assets/homepage/FS_logo.png"
                  alt="Family Script"
                  className="h-[95px] w-[95px] object-contain brightness-0 invert"
                />
              </Link> 

              {/* DESCRIPTION */}
              <p className="futura-light mt-5 max-w-[240px] text-[13px] leading-[1.6] tracking-wide text-white/60">
                Preserving memories, celebrating legacies, and bringing
                untold stories to life.
              </p>

              {/* SOCIAL ICONS */}
              <div className="mt-6 flex items-center gap-3">

                <Link
                  href="#"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/[0.05] text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  <FiInstagram size={16} />
                </Link>

                <Link
                  href="#"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/[0.05] text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  <FiLinkedin size={16} />
                </Link>

                <Link
                  href="#"
                  aria-label="Email"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/[0.05] text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  <FiMail size={16} />
                </Link>

              </div>

            </div>


            {/* ================= COMPANY ================= */}
            <FooterColumn
              title="Company"
              links={COMPANY_LINKS}
            />


            {/* ================= PROJECTS ================= */}
            <FooterColumn
              title="Projects"
              links={PROJECT_LINKS}
            />


            {/* ================= LEGAL ================= */}
            <FooterColumn
              title="Legal"
              links={LEGAL_LINKS}
            />

          </div>


          {/* ================= CONTACT / CTA STRIP ================= */}
          <div className="mt-14 flex flex-col gap-5 border-y border-white/15 py-6 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="futura-light text-[12px] uppercase tracking-[0.25em] text-white/50">
                Have a story to tell?
              </p>

              <p className="futura-light mt-1 text-[15px] text-white/85">
                Let&apos;s create something meaningful together.
              </p>
            </div>

            <Link
              href="#"
              className="futura-light group inline-flex w-fit items-center rounded-full border border-white/30 bg-white/[0.08] px-7 py-3 text-[13px] tracking-wide text-white backdrop-blur-md transition-all duration-300 hover:bg-white/[0.15]"
            >
              Get your Story{" "}

              <span className="futura-bold ml-1">
                Scripted
              </span>

              <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                &gt;&gt;
              </span>
            </Link>

          </div>


          {/* ================= BOTTOM BAR ================= */}
          <div className="mt-7 flex flex-col gap-3 text-white/50 md:flex-row md:items-center md:justify-between">

            <p className="futura-light text-[12px] tracking-wide">
              &copy; {new Date().getFullYear()} Family Script by Prarabdha
              Info Solutions Pvt. Ltd.
            </p>

            <p className="futura-light text-[12px] tracking-wide">
              All rights reserved
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}