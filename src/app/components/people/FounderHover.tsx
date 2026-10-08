"use client";

import { useState } from "react";

export type Founder = {
  name: string;
  role: string;
  description: string[];
  image: string;
  bio: string[];
  position: "left" | "right";
};

type FounderHoverProps = {
  founders: Founder[];
};

export default function FounderHover({ founders }: FounderHoverProps) {
  const [activeFounder, setActiveFounder] = useState<number | null>(null);

  const handleEnter = (index: number) => {
    if (activeFounder !== null) return;
    setActiveFounder(index);
  };

  const handleLeave = () => {
    setActiveFounder(null);
  };

  return (
    <>
      {/* =========================================================
          MOBILE / TABLET LAYOUT
          
          Mobile:
          - Single column
          - Large image
          - Role/description near top
          - Name directly below image
          
          Tablet:
          - Two columns
          - Larger images
          - Role/description near head
          - Name close to bottom of image
          - Tap to expand bio
          
          Desktop layout starts at lg
      ========================================================= */}

      <div className="mx-auto w-full px-5 py-10 lg:hidden">
        <div
          className="
            mx-auto
            grid
            w-full
            max-w-[1100px]
            grid-cols-1
            gap-16
            md:grid-cols-2
            md:gap-4
          "
        >
          {founders.map((founder, index) => {
            const isOpen = activeFounder === index;

            return (
              <div
                key={founder.name}
                className={`
                  relative
                  flex
                  min-h-[620px]
                  flex-col
                  items-center
                  text-center
                  md:min-h-[650px]
                  ${
                    index % 2 === 0
                      ? "max-md:items-start max-md:text-left"
                      : "max-md:items-end max-md:text-right"
                  }
                `}
              >
                {/* =========================================
                    IMAGE AREA
                ========================================= */}

                <button
                  type="button"
                  onClick={() =>
                    setActiveFounder((current) =>
                      current === index ? null : index,
                    )
                  }
                  className={`
                    relative
                    flex
                    h-[500px]
                    w-full
                    items-end
                    justify-center
                    md:h-[560px]
                    ${
                      index % 2 === 0
                        ? "max-md:justify-start"
                        : "max-md:justify-end"
                    }
                  `}
                  aria-expanded={isOpen}
                  aria-label={`View ${founder.name}`}
                >
                  {/* IMAGE */}

                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="
                      h-full
                      w-auto
                      max-w-[95%]
                      object-contain
                      object-bottom
                      transition-transform
                      duration-500
                      md:max-w-[100%]
                    "
                  />

                  {/* =====================================
                      ROLE + DESCRIPTION
                      Near the person's head
                  ===================================== */}

                  <div
                    className={`
                      pointer-events-none
                      absolute
                      left-1/2
                      top-[6%]
                      w-[90%]
                      -translate-x-1/2
                      text-center
                      md:top-[7%]
                      md:w-[95%]
                      ${
                        index % 2 === 0
                          ? "max-md:left-0 max-md:translate-x-0 max-md:text-left"
                          : "max-md:left-auto max-md:right-0 max-md:translate-x-0 max-md:text-right"
                      }
                    `}
                  >
                    {/* ROLE */}

                    <p
                      className="
                        futura-light
                        text-[13px]
                        text-[#e7ad55]
                        md:text-[14px]
                      "
                    >
                      {founder.role}
                    </p>

                    {/* DESCRIPTION */}

                    <div
                      className="
                        futura-light
                        mt-2
                        text-[12px]
                        leading-[1.35]
                        text-white
                        md:text-[13px]
                      "
                    >
                      {founder.description.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                </button>

                {/* =========================================
                    NAME
                    Kept very close to bottom of image
                ========================================= */}

                <h2
                  className="
                    futura-bold
                    mt-1
                    text-[14px]
                    tracking-[0.01em]
                    text-[#e7ad55]
                    md:mt-1
                    md:text-[15px]
                  "
                >
                  {founder.name}
                </h2>

                {/* =========================================
                    BIO TOGGLE
                ========================================= */}

                <button
                  type="button"
                  onClick={() =>
                    setActiveFounder((current) =>
                      current === index ? null : index,
                    )
                  }
                  className="
                    futura-light
                    mt-4
                    text-[12px]
                    uppercase
                    tracking-[0.05em]
                    text-white/70
                    underline
                    underline-offset-4
                  "
                >
                  {isOpen ? "Show less" : "Read bio"}
                </button>

                {/* =========================================
                    BIO CONTENT
                ========================================= */}

                <div
                  className={`
                    grid
                    w-full
                    overflow-hidden
                    transition-[max-height,opacity,margin]
                    duration-500
                    ease-out
                    ${
                      isOpen
                        ? "mt-5 max-h-[800px] opacity-100"
                        : "pointer-events-none mt-0 max-h-0 opacity-0"
                    }
                  `}
                >
                  <div
                    className="
                      min-h-0
                      w-full
                      futura-light
                      text-[13px]
                      leading-[1.5]
                      tracking-[0.01em]
                      text-white/85
                      md:text-[14px]
                    "
                  >
                    {founder.bio.map((paragraph, pIndex) => (
                      <p key={pIndex} className="mb-4 whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================
          DESKTOP LAYOUT
          
          lg and above:
          Original hover-based absolute positioned layout.
      ========================================================= */}

      <div
        onMouseLeave={handleLeave}
        className="
          relative
          mx-auto
          hidden
          h-[560px]
          w-full
          max-w-[1100px]
          lg:block
        "
      >
        {/* =========================================================
            DEFAULT BORDER
        ========================================================= */}

        <div
          className={`absolute bottom-[5%] left-0 right-0 h-[48%] border-0 transition-opacity duration-500 lg:border lg:border-white/30 ${
            activeFounder !== null ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* =========================================
              LEFT DEFAULT INFO
          ========================================= */}

          <div className="absolute left-[1.2%] top-[2%] lg:top-[9%]">
            <p className="futura-light text-[14px] text-[#e7ad55] md:text-[15px]">
              {founders[0].role}
            </p>

            <div className="futura-light mt-5 text-[14px] leading-[1.45] text-white md:text-[15px]">
              {founders[0].description.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          {/* =========================================
              RIGHT DEFAULT INFO
          ========================================= */}

          <div className="absolute right-[1.2%] top-[2%] text-right lg:top-[9%]">
            <p className="futura-light text-[14px] text-[#e7ad55] md:text-[15px]">
              {founders[1].role}
            </p>

            <div className="futura-light mt-5 text-[14px] leading-[1.45] text-white md:text-[15px]">
              {founders[1].description.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================
            LEFT PERSON IMAGE
        ========================================================= */}

        <div
          onMouseEnter={() => handleEnter(0)}
          className={`absolute bottom-[3%] left-[12%] z-30 h-[92%] w-[36%] overflow-visible lg:bottom-[5%] lg:left-[16%] lg:h-[72%] lg:w-[30%] ${
            activeFounder === 1 ? "pointer-events-none" : "cursor-pointer"
          }`}
        >
          <img
            src={founders[0].image}
            alt={founders[0].name}
            className={`absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain transition-all duration-700 ${
              activeFounder === 0
                ? "scale-[1.04] opacity-100"
                : activeFounder === 1
                  ? "scale-[0.95] opacity-0"
                  : "scale-100 opacity-100"
            }`}
          />
        </div>

        {/* =========================================================
            RIGHT PERSON IMAGE
        ========================================================= */}

        <div
          onMouseEnter={() => handleEnter(1)}
          className={`absolute bottom-[3%] right-[12%] z-30 h-[92%] w-[36%] overflow-visible lg:bottom-[5%] lg:right-[16%] lg:h-[72%] lg:w-[30%] ${
            activeFounder === 0 ? "pointer-events-none" : "cursor-pointer"
          }`}
        >
          <img
            src={founders[1].image}
            alt={founders[1].name}
            className={`absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain transition-all duration-700 ${
              activeFounder === 1
                ? "scale-[1.04] opacity-100"
                : activeFounder === 0
                  ? "scale-[0.95] opacity-0"
                  : "scale-100 opacity-100"
            }`}
          />
        </div>

        {/* =========================================================
            LEFT PERSON HOVER

            POSITION → IMAGE → PARAGRAPH
        ========================================================= */}

        <div
          className={`absolute inset-0 z-40 flex flex-col items-center transition-opacity duration-500 lg:block ${
            activeFounder === 0
              ? "pointer-events-auto founder-tablet-bio opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          {/* =========================================
              POSITION — LEFT
          ========================================= */}

          <div className="static order-1 mx-auto w-[90%] text-center lg:absolute lg:left-[1.2%] lg:top-[18%] lg:mx-0 lg:w-[25%] lg:text-left">
            <p className="futura-light text-[14px] text-[#e7ad55] md:text-[15px]">
              {founders[0].role}
            </p>

            <div className="futura-light mt-5 text-center text-[14px] leading-[1.45] text-white md:text-[15px] lg:text-left">
              {founders[0].description.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          {/* =========================================
              PARAGRAPH — RIGHT / LEFT ALIGNED
          ========================================= */}

          <div className="static order-2 mx-auto mt-8 w-[90%] lg:absolute lg:left-auto lg:right-[1%] lg:top-[17%] lg:mt-0 lg:w-[43%]">
            <div className="futura-light text-center text-[14px] leading-[1.35] tracking-[0.015em] text-white/85 md:text-[15px] lg:text-left">
              {founders[0].bio.map((paragraph, index) => (
                <p key={index} className="mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* =========================================
              NAME
          ========================================= */}

          <h2 className="futura-bold absolute -bottom-[5%] left-[16%] text-[14px] tracking-[0.01em] text-[#e7ad55] md:text-[15px] lg:-bottom-[2%]">
            {founders[0].name}
          </h2>
        </div>

        {/* =========================================================
            RIGHT PERSON HOVER

            PARAGRAPH → IMAGE → POSITION
        ========================================================= */}

        <div
          className={`absolute inset-0 z-40 flex flex-col items-center transition-opacity duration-500 lg:block ${
            activeFounder === 1
              ? "pointer-events-auto founder-tablet-bio opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          {/* =========================================
              PARAGRAPH — LEFT / RIGHT ALIGNED
          ========================================= */}

          <div className="static order-2 mx-auto mt-8 w-[90%] lg:absolute lg:left-[1%] lg:top-[17%] lg:mt-0 lg:w-[47%]">
            <div className="futura-light text-center text-[14px] leading-[1.35] tracking-[0.015em] text-white/85 md:text-[15px] lg:text-right">
              {founders[1].bio.map((paragraph, index) => (
                <p key={index} className="mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* =========================================
              POSITION — RIGHT
          ========================================= */}

          <div className="static order-1 mx-auto w-[90%] text-center lg:absolute lg:left-auto lg:right-[1.2%] lg:top-[18%] lg:mx-0 lg:w-[25%] lg:text-right">
            <p className="futura-light text-[14px] text-[#e7ad55] md:text-[15px]">
              {founders[1].role}
            </p>

            <div className="futura-light mt-5 text-right text-[14px] leading-[1.45] text-white md:text-[15px]">
              {founders[1].description.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          {/* =========================================
              NAME
          ========================================= */}

          <h2 className="futura-bold absolute -bottom-[5%] right-[18%] text-[14px] tracking-[0.01em] text-[#e7ad55] md:text-[15px] lg:-bottom-[2%]">
            {founders[1].name}
          </h2>
        </div>

        {/* =========================================================
            DEFAULT NAMES
        ========================================================= */}

        <div
          className={`absolute -bottom-[5%] left-0 right-0 z-50 flex justify-center transition-opacity duration-400 lg:-bottom-[2%] ${
            activeFounder !== null
              ? "pointer-events-none opacity-0"
              : "opacity-100"
          }`}
        >
          <div className="flex w-[58%] justify-between">
            <h2 className="futura-bold text-[14px] tracking-[0.01em] text-[#e7ad55] md:text-[15px]">
              {founders[0].name}
            </h2>

            <h2 className="futura-bold text-[14px] tracking-[0.01em] text-[#e7ad55] md:text-[15px]">
              {founders[1].name}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
