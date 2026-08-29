// components/layout/Footer.tsx

"use client";

import Link from "next/link";

/* ============================================================
   DATA
============================================================ */

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

/* ============================================================
   FOOTER COLUMN
============================================================ */

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  return (
    <div>
      {/* ======================================================
          COLUMN TITLE
      ====================================================== */}

      <h3
        className="
          futura-medium
          text-[13px]
          leading-none
          text-white/90
          md:text-[14px]
        "
      >
        {title}
      </h3>

      {/* ======================================================
          LINKS
      ====================================================== */}

      <ul
        className="
          mt-3
          space-y-2.5
        "
      >
        {links.map((label) => (
          <li key={label}>
            <Link
              href="#"
              className="
                futura-light
                text-[11px]
                leading-none
                tracking-wide
                text-white/55
                transition-colors
                duration-200
                hover:text-white/90
              "
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============================================================
   FOOTER
============================================================ */

export default function Footer() {
  const currentYear =
    new Date().getFullYear();

  return (
    <footer
      className="
        w-full
        bg-[#57233b]
        text-white
      "
    >
      {/* ======================================================
          FOOTER CONTAINER
      ====================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1300px]
          px-8
          py-8
          md:px-12
          md:py-9
          lg:px-14
        "
      >
        {/* ====================================================
            TOP DIVIDER
        ==================================================== */}

        <div
          className="
            border-t
            border-white/25
            pt-5
            md:pt-6
          "
        >

          {/* ==================================================
              MAIN FOOTER CONTENT
          ================================================== */}

          <div
            className="
              grid
              grid-cols-2
              gap-x-10
              gap-y-8
              md:grid-cols-4
              md:gap-x-14
              lg:gap-x-20
          "
          >

            {/* ================================================
                FAMILY SCRIPT
            ================================================ */}

            <div
              className="
                col-span-2
                md:col-span-1
              "
            >
              {/* ==============================================
                  TITLE
              ============================================== */}

              <h2
                className="
                  futura-medium
                  text-[13px]
                  leading-none
                  text-white
                  md:text-[14px]
                "
              >
                Family Script
              </h2>

              {/* ==============================================
                  COMPANY DESCRIPTION
              ============================================== */}

              <p
                className="
                  futura-light
                  mt-5
                  max-w-[280px]
                  text-[9px]
                  leading-[1.35]
                  tracking-wide
                  text-white/55
                  md:text-[10px]
                "
              >
                An offering of M/s Prarabdha Info
                Solutions Pvt Ltd,
                <br />
                Incubated under IGDTUW-Anveshan
                Foundation, Delhi
                <br />
                Registered under Startup India
                and MSME Recognised
              </p>

              {/* ==============================================
                  CONTACT US
              ============================================== */}

              <div
                className="
                  mt-4
                "
              >
                <p
                  className="
                    futura-light
                    text-[9px]
                    leading-[1.35]
                    tracking-wide
                    text-white/55
                    md:text-[10px]
                  "
                >
                  Contact Us:
                  <br />
                  Prarabdha Info Solutions Private
                  Limited,
                  <br />
                  IGDTUW-Anveshan Foundation
                  Premises,
                  <br />
                  Kashmere Gate, Delhi-06,
                  India
                </p>
              </div>

              {/* ==============================================
                  EMAIL + PHONE
              ============================================== */}

              <div
                className="
                  mt-3
                "
              >
                <p
                  className="
                    futura-light
                    text-[9px]
                    leading-[1.4]
                    tracking-wide
                    text-white/55
                    md:text-[10px]
                  "
                >
                  Email: info@familyscript.com,
                  team@familyscript.in
                  <br />
                  +91 9560283939
                </p>
              </div>
            </div>

            {/* ================================================
                COMPANY
            ================================================ */}

            <FooterColumn
              title="Company"
              links={
                COMPANY_LINKS
              }
            />

            {/* ================================================
                PROJECTS
            ================================================ */}

            <FooterColumn
              title="Projects"
              links={
                PROJECT_LINKS
              }
            />

            {/* ================================================
                LEGAL
            ================================================ */}

            <FooterColumn
              title="Legal"
              links={
                LEGAL_LINKS
              }
            />
          </div>

          {/* ==================================================
              BOTTOM DIVIDER
          ================================================== */}

          <div
            className="
              mt-6
              border-t
              border-white/25
              pt-3
              md:mt-7
              md:pt-3.5
            "
          >
            {/* ================================================
                COPYRIGHT ROW
            ================================================ */}

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
              {/* ==============================================
                  COPYRIGHT
              ============================================== */}

              <p
                className="
                  futura-light
                  text-[9px]
                  tracking-wide
                  text-white/50
                  md:text-[10px]
                "
              >
                © {currentYear} Family Script
                by Prarabdha Info Solutions
                Pvt. Ltd.
              </p>

              {/* ==============================================
                  RIGHTS
              ============================================== */}

              <p
                className="
                  futura-light
                  text-[9px]
                  tracking-wide
                  text-white/50
                  md:text-[10px]
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