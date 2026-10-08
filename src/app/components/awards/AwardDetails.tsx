import Link from "next/link";
import Image from "next/image";
import type { AwardItem } from "../../../data/awards";
import { splitHeadingLines } from "../../utils/splitHeading";
import EventDescription from "../projects/events/EventDescription";

type AwardDetailsProps = {
  award: AwardItem;
};

export default function AwardDetails({
  award,
}: AwardDetailsProps) {
  return (
    <main
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-[#32141f]
        text-[rgb(233_231_218)]
      "
    >
      {/* ========================================================
          BACKGROUND
          Cover image under the Events-page gradient.
      ======================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Cover image, kept faint */}
        <Image
          src={award.coverImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.28]"
        />

        {/* Events-page burgundy gradient, translucent so the cover shows through */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(67,24,39,0.80) 0%, rgba(59,23,36,0.84) 38%, rgba(43,24,33,0.90) 72%, rgba(23,19,25,0.97) 100%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(119,57,65,0.12), transparent 55%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 55%, rgba(10,8,10,0.32) 100%)",
          }}
        />
      </div>

      {/* ========================================================
          CONTENT CONTAINER
      ======================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          min-h-screen
          w-full
          max-w-[1550px]
          px-5
          pb-12
          pt-[112px]
          sm:px-7
          sm:pb-14
          sm:pt-[125px]
          md:px-[5%]
          md:pb-16
          md:pt-[145px]
          lg:px-[6%]
        "
      >

        {/* ======================================================
            BREADCRUMB
        ====================================================== */}

        <div
          className="
            mb-7
            flex
            flex-wrap
            items-center
            gap-2
            sm:mb-8
            md:mb-10
          "
        >
          <Link
            href="/"
            className="
              futura-light
              text-[9px]
              uppercase
              tracking-wide
              text-[rgb(233_231_218)]/40
              transition-colors
              duration-300
              hover:text-[rgb(233_231_218)]/75
              sm:text-[10px]
            "
          >
            Home
          </Link>

          <span className="text-[9px] text-[rgb(233_231_218)]/30 sm:text-[10px]">
            &gt;&gt;
          </span>

          <Link
            href="/awards"
            className="
              futura-light
              text-[9px]
              uppercase
              tracking-wide
              text-[rgb(233_231_218)]/40
              transition-colors
              duration-300
              hover:text-[rgb(233_231_218)]/75
              sm:text-[10px]
            "
          >
            Awards
          </Link>

          <span className="text-[9px] text-[rgb(233_231_218)]/30 sm:text-[10px]">
            &gt;&gt;
          </span>

          <span
            className="
              futura-light
              max-w-[55%]
              truncate
              text-[9px]
              uppercase
              tracking-wide
              text-[rgb(233_231_218)]/45
              sm:text-[10px]
            "
          >
            {award.title}
          </span>
        </div>

        {/* ======================================================
            MAIN AWARD LAYOUT

            Mobile:
              info
              ↓
              3 stacked images

            Desktop:
              info | gallery
        ====================================================== */}

        <div
          className="
            grid
            min-h-0
            grid-cols-1
            gap-10
            sm:gap-12
                        lg:grid-cols-[45%_55%]
            lg:gap-6
          "
        >

          {/* ====================================================
              LEFT — AWARD INFORMATION
          ==================================================== */}

          <div
            className="
              flex
              items-start
            "
          >
            <div
              className="
                w-full
                max-w-[650px]
              "
            >

              {/* AWARD TITLE */}

              <h1
                className="
                  futura-light
                  max-w-[95%]
                  text-[clamp(34px,8.5vw,46px)]
                  uppercase
                  leading-[0.98]
                  tracking-[0.015em]
                  text-[rgb(203_163_86)]
                  sm:text-[clamp(38px,5vw,52px)]
                  lg:text-[clamp(38px,3.1vw,58px)]
                "
              >
                {splitHeadingLines(award.title).map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>

              {/* DESCRIPTION */}

              <EventDescription
                key={award.slug}
                paragraphs={award.description}
              />
            </div>
          </div>

          {/* ====================================================
              RIGHT — AWARD IMAGE GALLERY

              Three equal-size horizontal images, stacked vertically.
          ==================================================== */}

          <div
            className="
              flex
              items-start
              lg:justify-center
            "
          >
            <div
              className="
                flex
                w-full
                max-w-[560px]
                flex-col
                gap-4
                sm:gap-5
                md:gap-6
                lg:gap-7
              "
            >
              {award.images
                .slice(0, 3)
                .map((image, index) => (
                  <div
                    key={`${award.slug}-${index}`}
                    className="
                      group
                      relative
                      aspect-[2.1/1]
                      w-full
                      overflow-hidden
                      border
                      border-[rgb(233_231_218)]/80
                      bg-[rgb(56_44_59)]/40
                    "
                  >
                    <Image
                      src={image}
                      alt={`${award.title} ${index + 1}`}
                      fill
                      sizes="
                        (max-width: 1024px) 90vw,
                        560px
                      "
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-[1.035]
                      "
                    />

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-[rgb(83_36_57)]/10
                        transition-colors
                        duration-500
                        group-hover:bg-transparent
                      "
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}