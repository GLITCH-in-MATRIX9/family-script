"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRippleEngine, type RippleSource } from "./RippleEngine";

const TRANSITION_MS = 1250;
const INPUT_LOCK_MS = 1450;

interface SectionConfig {
  selector: string;
  before: RippleSource;
  after?: RippleSource;
}

interface HomepageNavigatorProps {
  children: React.ReactNode;
}

export default function HomepageNavigator({
  children,
}: HomepageNavigatorProps) {
  const engine = useRippleEngine();

  const rootRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef(0);
  const animatingRef = useRef(false);
  const touchStartY = useRef<number | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  /*
   * These are the actual visual sources used by the transition.
   * The DOM sections remain completely untouched; WebGL is only
   * visible while a navigation transition is happening.
   */
  const sections = useRef<SectionConfig[]>([
    {
      selector: '[data-home-section="0"]',
      before: {
        type: "video",
        src: "/assets/homepage/HOME_PAGE_VIDEO.mp4",
      },
      after: {
        type: "image",
        src: "/assets/homepage/WHO_WE_ARE.jpg",
      },
    },
    {
      selector: '[data-home-section="1"]',
      before: {
        type: "image",
        src: "/assets/homepage/WHO_WE_ARE.jpg",
      },
      after: {
        type: "image",
        src: "/assets/homepage/WHAT_WE_DO.jpg",
      },
    },
    {
      selector: '[data-home-section="2"]',
      before: {
        type: "image",
        src: "/assets/homepage/WHAT_WE_DO.jpg",
      },
      after: {
        type: "image",
        src: "/assets/Homepage/WHAT_WE_OFFER.jpg",
      },
    },
    {
      selector: '[data-home-section="3"]',
      before: {
        type: "image",
        src: "/assets/Homepage/WHAT_WE_OFFER.jpg",
      },
      after: {
        type: "color",
        value: "#351420",
      },
    },
    {
      selector: '[data-home-section="4"]',
      before: {
        type: "color",
        value: "#351420",
      },
      after: {
        type: "image",
        src: "/assets/homepage/GET YOUR STORY SCRIPTED.jpg",
      },
    },
    {
      selector: '[data-home-section="5"]',
      before: {
        type: "image",
        src: "/assets/homepage/GET YOUR STORY SCRIPTED.jpg",
      },
    },
  ]);

  const getSectionElements = useCallback(() => {
    const root = rootRef.current;
    if (!root) return [];

    return sections.current
      .map((section) => root.querySelector<HTMLElement>(section.selector))
      .filter((element): element is HTMLElement => Boolean(element));
  }, []);

  const goTo = useCallback(
    async (targetIndex: number, direction: 1 | -1) => {
      if (animatingRef.current) return;

      const elements = getSectionElements();
      const current = currentIndexRef.current;

      if (
        targetIndex < 0 ||
        targetIndex >= elements.length ||
        targetIndex === current
      ) {
        return;
      }

      const target = elements[targetIndex];
      const currentConfig = sections.current[current];

      if (!target || !currentConfig) return;

      animatingRef.current = true;

      // Stop native wheel/touch scrolling for the duration of the transition.
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      try {
        const sourceBefore = currentConfig.before;

        const sourceAfter = direction === 1
          ? currentConfig.after
          : sections.current[targetIndex].before;

        /*
         * When moving backwards we intentionally swap the visual direction:
         * the previous section is revealed from the top, so the motion reads
         * naturally as an upward ripple.
         */
        if (sourceAfter) {
          const transitionPromise = engine.playTransition({
            before: sourceBefore,
            after: sourceAfter,
            originX: 0.5,
            originY: direction === 1 ? 1 : 0,
            strength: 1.15,
            speed: 1,
            duration: TRANSITION_MS,
          });

          // Keep the current section visible while the ripple begins.
          await new Promise<void>((resolve) =>
            window.setTimeout(resolve, 220),
          );

          // Snap instantly — never let the user scrub the transition.
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY,
            behavior: "auto",
          });

          await transitionPromise;
        } else {
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY,
            behavior: "auto",
          });
        }

        currentIndexRef.current = targetIndex;
        setCurrentIndex(targetIndex);
      } finally {
        document.body.style.overflow = previousOverflow;
        window.setTimeout(() => {
          animatingRef.current = false;
        }, INPUT_LOCK_MS - TRANSITION_MS);
      }
    },
    [engine, getSectionElements],
  );

  const goNext = useCallback(() => {
    const next = currentIndexRef.current + 1;
    if (next < sections.current.length) {
      void goTo(next, 1);
    }
  }, [goTo]);

  const goPrevious = useCallback(() => {
    const previous = currentIndexRef.current - 1;
    if (previous >= 0) {
      void goTo(previous, -1);
    }
  }, [goTo]);

  useEffect(() => {
    const elements = getSectionElements();
    if (!elements.length) return;

    const updateIndexFromPosition = () => {
      if (animatingRef.current) return;

      const scrollY = window.scrollY;
      let closest = 0;
      let closestDistance = Infinity;

      elements.forEach((element, index) => {
        const distance = Math.abs(element.offsetTop - scrollY);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = index;
        }
      });

      currentIndexRef.current = closest;
      setCurrentIndex(closest);
    };

    const onWheel = (event: WheelEvent) => {
      if (animatingRef.current) {
        event.preventDefault();
        return;
      }

      if (Math.abs(event.deltaY) < 12) return;

      event.preventDefault();

      if (event.deltaY > 0) {
        goNext();
      } else {
        goPrevious();
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      touchStartY.current = event.touches[0].clientY;
    };

    const onTouchMove = (event: TouchEvent) => {
      // Touch/swipe is a navigation gesture, never a scroll scrub.
      event.preventDefault();
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (touchStartY.current === null || animatingRef.current) return;

      const endY = event.changedTouches[0]?.clientY;
      if (endY === undefined) return;

      const delta = touchStartY.current - endY;
      touchStartY.current = null;

      if (Math.abs(delta) < 45) return;

      if (delta > 0) {
        goNext();
      } else {
        goPrevious();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        goNext();
      }

      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        goPrevious();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", updateIndexFromPosition, {
      passive: true,
    });

    updateIndexFromPosition();

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", updateIndexFromPosition);
    };
  }, [getSectionElements, goNext, goPrevious]);

  const isLast = currentIndex >= sections.current.length - 1;

  return (
    <div ref={rootRef} className="relative">
      {children}

      {!isLast && (
        <button
          type="button"
          aria-label="Go to next section"
          onClick={goNext}
          className="
            fixed
            bottom-7
            left-1/2
            z-[10000]
            flex
            h-11
            w-11
            -translate-x-1/2
            items-center
            justify-center
            rounded-full
            border
            border-white/40
            bg-black/15
            text-xl
            text-white
            backdrop-blur-md
            transition-all
            duration-300
            hover:-translate-x-1/2
            hover:translate-y-1
            hover:border-white/70
            hover:bg-black/25
            active:scale-95
          "
        >
          ↓
        </button>
      )}
    </div>
  );
}
