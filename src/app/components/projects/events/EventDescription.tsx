"use client";

import { useState } from "react";

type EventDescriptionProps = {
  paragraphs: string[];
};

/**
 * Shows the first paragraph only; "Read more" reveals the rest.
 * Single-paragraph (or empty) descriptions get no toggle.
 *
 * The parent should pass key={event.slug} so the expanded state
 * resets when navigating between events.
 */
export default function EventDescription({
  paragraphs,
}: EventDescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  if (paragraphs.length === 0) return null;

  const hasMore = paragraphs.length > 1;
  return (
    <div
      className="
        mt-8
        max-w-[600px]
        sm:mt-10
        lg:mt-12
      "
    >
      <div className="space-y-5 sm:space-y-6">
        <p
          className="
            futura-light
            text-[12px]
            leading-[1.48]
            tracking-[0.02em]
            text-[rgb(233_231_218)]/80
            sm:text-[13px]
            md:text-[14px]
            lg:text-[clamp(14px,1vw,17px)]
            lg:leading-[1.5]
          "
        >
          {paragraphs[0]}
        </p>

        {hasMore && (
          <div
            className={`grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-500 ease-out ${
              expanded
                ? "mt-5 grid-rows-[1fr] opacity-100"
                : "mt-0 grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="min-h-0 space-y-5">
              {paragraphs.slice(1).map((paragraph, index) => (
                <p
                  key={`${paragraph}-${index}`}
                  className="
              futura-light
              text-[12px]
              leading-[1.48]
              tracking-[0.02em]
              text-[rgb(233_231_218)]/80
              sm:text-[13px]
              md:text-[14px]
              lg:text-[clamp(14px,1vw,17px)]
              lg:leading-[1.5]
            "
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {hasMore && (
        <div className="mt-4 flex justify-end sm:mt-5">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            className="
              futura-light
              cursor-pointer
              text-[12px]
              tracking-wide
              text-[rgb(233_231_218)]/60
              transition-colors
              duration-300
              hover:text-[rgb(203_163_86)]
            "
          >
            {expanded ? "Read less <<" : "Read more >>"}
          </button>
        </div>
      )}
    </div>
  );
}
