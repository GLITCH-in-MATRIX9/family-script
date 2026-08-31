"use client";

import {
  useCallback,
  useEffect,
  useRef,
} from "react";

import { useRipple } from "./RippleProvider";

import {
  getRippleOrigin,
  prepareRippleSection,
} from "./RippleTransition";

import {
  testimonialsStepRef,
} from "./testimonialsStepBridge";

/* ============================================================
   TYPES
============================================================ */

export interface RippleNavigationOptions {
  sections: HTMLElement[];

  currentIndex: number;

  onIndexChange: (index: number) => void;
}

/* ============================================================
   SETTINGS
============================================================ */

const WHEEL_THRESHOLD = 2;

const TOUCH_THRESHOLD = 45;

const INPUT_COOLDOWN = 250;

const TRANSITION_DURATION = 1250;

const SECTION_TOLERANCE = 20;

/* ============================================================
   HOOK
============================================================ */

export function useRippleNavigation({
  sections,
  currentIndex,
  onIndexChange,
}: RippleNavigationOptions) {
  const {
    playTransition,
    cancelTransition,
  } = useRipple();

  /* ==========================================================
     REFS
  ========================================================== */

  const currentIndexRef =
    useRef(currentIndex);

  const animatingRef =
    useRef(false);

  const mountedRef =
    useRef(true);

  const touchStartYRef =
    useRef<number | null>(null);

  const cooldownRef =
    useRef<number | null>(null);

  const normalScrollModeRef =
    useRef(false);

  const programmaticScrollRef =
    useRef(false);

  /* ==========================================================
     CURRENT INDEX
  ========================================================== */

  useEffect(() => {
    currentIndexRef.current =
      currentIndex;
  }, [
    currentIndex,
  ]);

  /* ==========================================================
     HOMEPAGE CHECK
  ========================================================== */

  const hasSections =
    sections.length > 0;

  /* ==========================================================
     PREPARE SECTION HEIGHTS
  ========================================================== */

  useEffect(() => {
    if (!hasSections) {
      return;
    }

    sections.forEach(
      (
        section,
        index,
      ) => {
        const isFinalSection =
          index ===
          sections.length - 1;

        section.style.width =
          "100%";

        if (isFinalSection) {
          section.style.minHeight =
            "100svh";

          section.style.height =
            "auto";

          return;
        }

        section.style.minHeight =
          "100svh";

        section.style.height =
          "100svh";
      },
    );
  }, [
    sections,
    hasSections,
  ]);

  /* ==========================================================
     SECTION TOP
  ========================================================== */

  const getSectionTop =
    useCallback(
      (
        section: HTMLElement,
      ) => {
        return (
          section.getBoundingClientRect()
            .top +
          window.scrollY
        );
      },
      [],
    );

  /* ==========================================================
     MOVE TO SECTION
  ========================================================== */

  const moveToSection =
    useCallback(
      (
        section: HTMLElement,
      ) => {
        programmaticScrollRef.current =
          true;

        window.scrollTo({
          top:
            getSectionTop(
              section,
            ),
          behavior: "auto",
        });

        requestAnimationFrame(() => {
          programmaticScrollRef.current =
            false;
        });
      },
      [
        getSectionTop,
      ],
    );

  /* ==========================================================
     FINAL SECTION
  ========================================================== */

  const isFinalSection =
    useCallback(
      (
        index: number,
      ) => {
        return (
          sections.length > 0 &&
          index ===
            sections.length - 1
        );
      },
      [
        sections.length,
      ],
    );

  /* ==========================================================
     TESTIMONIALS SECTION
  ========================================================== */

  const isTestimonialsSection =
    useCallback(
      (
        index: number,
      ) => {
        return (
          sections.length > 1 &&
          index ===
            sections.length - 2
        );
      },
      [
        sections.length,
      ],
    );

  /* ==========================================================
     FINAL SECTION TOP
  ========================================================== */

  const isAtFinalSectionTop =
    useCallback(
      () => {
        if (
          sections.length === 0
        ) {
          return false;
        }

        const finalSection =
          sections[
            sections.length - 1
          ];

        if (!finalSection) {
          return false;
        }

        const finalTop =
          getSectionTop(
            finalSection,
          );

        return (
          window.scrollY <=
          finalTop +
            SECTION_TOLERANCE
        );
      },
      [
        sections,
        getSectionTop,
      ],
    );

  /* ==========================================================
     NAVIGATE
  ========================================================== */

  const navigate =
    useCallback(
      async (
        direction: 1 | -1,
      ) => {
        if (!hasSections) {
          return;
        }

        if (
          animatingRef.current
        ) {
          return;
        }

        if (
          sections.length === 0
        ) {
          return;
        }

        const fromIndex =
          currentIndexRef.current;

        const targetIndex =
          fromIndex +
          direction;

        /* ====================================================
           TOP BOUNDARY
        ==================================================== */

        if (
          targetIndex < 0
        ) {
          return;
        }

        /* ====================================================
           FINAL SECTION
        ==================================================== */

        if (
          isFinalSection(
            fromIndex,
          )
        ) {
          if (
            normalScrollModeRef.current
          ) {
            return;
          }

          if (
            direction === 1
          ) {
            normalScrollModeRef.current =
              true;

            return;
          }
        }

        /* ====================================================
           BOTTOM BOUNDARY
        ==================================================== */

        if (
          targetIndex >=
          sections.length
        ) {
          return;
        }

        const currentSection =
          sections[
            fromIndex
          ];

        const nextSection =
          sections[
            targetIndex
          ];

        if (
          !currentSection ||
          !nextSection
        ) {
          return;
        }

        /* ====================================================
           LOCK INPUT
        ==================================================== */

        animatingRef.current =
          true;

        const previousOverflow =
          document.body.style
            .overflow;

        const previousTouchAction =
          document.body.style
            .touchAction;

        document.body.style.overflow =
          "hidden";

        document.body.style.touchAction =
          "none";

        try {
          /* ==================================================
             PREPARE
          ================================================== */

          await prepareRippleSection(
            nextSection,
          );

          if (
            !mountedRef.current
          ) {
            return;
          }

          /* ==================================================
             ORIGIN
          ================================================== */

          const {
            x,
            y,
          } =
            getRippleOrigin(
              direction,
            );

          /* ==================================================
             RIPPLE
          ================================================== */

          await playTransition({
            beforeElement:
              currentSection,

            afterElement:
              nextSection,

            originX:
              x,

            originY:
              y,

            strength:
              1.05,

            duration:
              TRANSITION_DURATION,
          });

          if (
            !mountedRef.current
          ) {
            return;
          }

          /* ==================================================
             MOVE DOCUMENT
          ================================================== */

          moveToSection(
            nextSection,
          );

          /* ==================================================
             UPDATE INDEX
          ================================================== */

          currentIndexRef.current =
            targetIndex;

          onIndexChange(
            targetIndex,
          );

          /* ==================================================
             TESTIMONIALS
          ================================================== */

          if (
            isTestimonialsSection(
              targetIndex,
            )
          ) {
            if (
              direction === 1
            ) {
              testimonialsStepRef.current?.enterFromStart();
            } else {
              testimonialsStepRef.current?.enterFromEnd();
            }
          }

          /* ==================================================
             CONTACT
          ================================================== */

          if (
            isFinalSection(
              targetIndex,
            )
          ) {
            normalScrollModeRef.current =
              true;
          } else {
            normalScrollModeRef.current =
              false;
          }
        } catch (error) {
          console.error(
            "Ripple navigation error:",
            error,
          );

          if (
            mountedRef.current
          ) {
            moveToSection(
              nextSection,
            );

            currentIndexRef.current =
              targetIndex;

            onIndexChange(
              targetIndex,
            );

            normalScrollModeRef.current =
              isFinalSection(
                targetIndex,
              );
          }
        } finally {
          /*
           * ALWAYS restore body scrolling.
           */
          document.body.style.overflow =
            previousOverflow;

          document.body.style.touchAction =
            previousTouchAction;

          if (
            cooldownRef.current !==
            null
          ) {
            window.clearTimeout(
              cooldownRef.current,
            );
          }

          cooldownRef.current =
            window.setTimeout(
              () => {
                if (
                  mountedRef.current
                ) {
                  animatingRef.current =
                    false;
                }
              },
              INPUT_COOLDOWN,
            );
        }
      },
      [
        hasSections,
        sections,
        playTransition,
        getRippleOrigin,
        moveToSection,
        onIndexChange,
        isFinalSection,
        isTestimonialsSection,
      ],
    );

  /* ==========================================================
     NEXT
  ========================================================== */

  const next =
    useCallback(
      () => {
        if (!hasSections) {
          return;
        }

        void navigate(1);
      },
      [
        hasSections,
        navigate,
      ],
    );

  /* ==========================================================
     PREVIOUS
  ========================================================== */

  const previous =
    useCallback(
      () => {
        if (!hasSections) {
          return;
        }

        void navigate(-1);
      },
      [
        hasSections,
        navigate,
      ],
    );

  /* ==========================================================
     CONTACT NATIVE SCROLL MODE
  ========================================================== */

  useEffect(() => {
    if (!hasSections) {
      return;
    }

    if (
      sections.length === 0
    ) {
      return;
    }

    const handleScroll =
      () => {
        if (
          programmaticScrollRef.current
        ) {
          return;
        }

        const index =
          currentIndexRef.current;

        if (
          !isFinalSection(index)
        ) {
          normalScrollModeRef.current =
            false;

          return;
        }

        normalScrollModeRef.current =
          !isAtFinalSectionTop();
      };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, [
    hasSections,
    sections,
    isFinalSection,
    isAtFinalSectionTop,
  ]);

  /* ==========================================================
     WHEEL
  ========================================================== */

  useEffect(() => {
    if (!hasSections) {
      return;
    }

    if (
      sections.length === 0
    ) {
      return;
    }

    const handleWheel =
      (
        event: WheelEvent,
      ) => {
        if (
          Math.abs(event.deltaX) >
          Math.abs(event.deltaY)
        ) {
          return;
        }

        if (
          Math.abs(event.deltaY) <
          WHEEL_THRESHOLD
        ) {
          return;
        }

        const index =
          currentIndexRef.current;

        const lastIndex =
          sections.length - 1;

        const scrollingDown =
          event.deltaY > 0;

        const scrollingUp =
          event.deltaY < 0;

        const onFinalSection =
          index === lastIndex;

        /* ====================================================
           FINAL CONTACT
        ==================================================== */

        if (
          onFinalSection
        ) {
          if (
            scrollingDown
          ) {
            normalScrollModeRef.current =
              true;

            return;
          }

          if (
            scrollingUp &&
            !isAtFinalSectionTop()
          ) {
            normalScrollModeRef.current =
              true;

            return;
          }

          if (
            scrollingUp &&
            isAtFinalSectionTop()
          ) {
            if (
              event.cancelable
            ) {
              event.preventDefault();
            }

            normalScrollModeRef.current =
              false;

            previous();

            return;
          }

          return;
        }

        /* ====================================================
           TESTIMONIALS
        ==================================================== */

        if (
          isTestimonialsSection(
            index,
          )
        ) {
          const controller =
            testimonialsStepRef.current;

          if (controller) {
            if (
              event.cancelable
            ) {
              event.preventDefault();
            }

            if (
              animatingRef.current ||
              controller.isAnimating()
            ) {
              return;
            }

            const pairIndex =
              controller.getPairIndex();

            const pairCount =
              controller.getPairCount();

            if (
              scrollingDown
            ) {
              if (
                pairIndex <
                pairCount - 1
              ) {
                controller.stepForward();
              } else {
                next();
              }

              return;
            }

            if (
              scrollingUp
            ) {
              if (
                pairIndex > 0
              ) {
                controller.stepBackward();
              } else {
                previous();
              }

              return;
            }

            return;
          }
        }

        /* ====================================================
           NORMAL RIPPLE SECTION
        ==================================================== */

        if (
          event.cancelable
        ) {
          event.preventDefault();
        }

        if (
          animatingRef.current
        ) {
          return;
        }

        if (
          scrollingDown
        ) {
          next();

          return;
        }

        if (
          scrollingUp
        ) {
          previous();
        }
      };

    window.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      },
    );

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel,
      );
    };
  }, [
    hasSections,
    sections.length,
    next,
    previous,
    isAtFinalSectionTop,
    isTestimonialsSection,
  ]);

  /* ==========================================================
     TOUCH SWIPE
     
     THIS IS THE CHANGED SECTION.
     
     Swipe UP   → next
     Swipe DOWN → previous
     
     We only listen to touchstart + touchend.
     No touchmove / preventDefault is needed.
  ========================================================== */

  useEffect(() => {
    if (!hasSections) {
      return;
    }

    if (
      sections.length === 0
    ) {
      return;
    }

    const handleTouchStart =
      (
        event: TouchEvent,
      ) => {
        if (
          event.touches.length !== 1
        ) {
          touchStartYRef.current =
            null;

          return;
        }

        touchStartYRef.current =
          event.touches[0]
            .clientY;
      };

    const handleTouchEnd =
      (
        event: TouchEvent,
      ) => {
        const startY =
          touchStartYRef.current;

        touchStartYRef.current =
          null;

        if (
          startY === null
        ) {
          return;
        }

        if (
          event.changedTouches.length !==
          1
        ) {
          return;
        }

        const endY =
          event.changedTouches[0]
            .clientY;

        const deltaY =
          startY - endY;

        /*
         * Ignore small finger movements.
         */
        if (
          Math.abs(deltaY) <
          TOUCH_THRESHOLD
        ) {
          return;
        }

        /*
         * Don't start another transition
         * while the current one is running.
         */
        if (
          animatingRef.current
        ) {
          return;
        }

        const index =
          currentIndexRef.current;

        const lastIndex =
          sections.length - 1;

        const swipingUp =
          deltaY > 0;

        const swipingDown =
          deltaY < 0;

        /* ====================================================
           FINAL / CONTACT SECTION
        ==================================================== */

        if (
          index === lastIndex
        ) {
          /*
           * Contact + Footer uses native scrolling.
           *
           * Only a downward swipe at the very top of Contact
           * goes back to Testimonials.
           */
          if (
            swipingDown &&
            isAtFinalSectionTop()
          ) {
            previous();
          }

          return;
        }

        /* ====================================================
           TESTIMONIALS
        ==================================================== */

        if (
          isTestimonialsSection(
            index,
          )
        ) {
          const controller =
            testimonialsStepRef.current;

          if (controller) {
            if (
              swipingUp
            ) {
              /*
               * Advance testimonial pair.
               */
              if (
                controller.getPairIndex() <
                controller.getPairCount() - 1
              ) {
                controller.stepForward();
              } else {
                /*
                 * Last testimonial pair → next section.
                 */
                next();
              }

              return;
            }

            if (
              swipingDown
            ) {
              /*
               * Previous testimonial pair.
               */
              if (
                controller.getPairIndex() >
                0
              ) {
                controller.stepBackward();
              } else {
                /*
                 * First testimonial pair → previous section.
                 */
                previous();
              }

              return;
            }
          }
        }

        /* ====================================================
           NORMAL HOMEPAGE SECTIONS
        ==================================================== */

        if (
          swipingUp
        ) {
          next();

          return;
        }

        if (
          swipingDown
        ) {
          previous();
        }
      };

    /*
     * Passive listeners are intentional.
     *
     * We are detecting a completed swipe rather than trying
     * to cancel the browser's touch scrolling during touchmove.
     */
    window.addEventListener(
      "touchstart",
      handleTouchStart,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "touchend",
      handleTouchEnd,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "touchstart",
        handleTouchStart,
      );

      window.removeEventListener(
        "touchend",
        handleTouchEnd,
      );
    };
  }, [
    hasSections,
    sections.length,
    next,
    previous,
    isAtFinalSectionTop,
    isTestimonialsSection,
  ]);

  /* ==========================================================
     KEYBOARD
  ========================================================== */

  useEffect(() => {
    if (!hasSections) {
      return;
    }

    if (
      sections.length === 0
    ) {
      return;
    }

    const handleKeyDown =
      (
        event: KeyboardEvent,
      ) => {
        const target =
          event.target as HTMLElement | null;

        if (
          target?.tagName ===
            "INPUT" ||
          target?.tagName ===
            "TEXTAREA" ||
          target?.tagName ===
            "SELECT" ||
          target?.isContentEditable
        ) {
          return;
        }

        const index =
          currentIndexRef.current;

        const lastIndex =
          sections.length - 1;

        const onFinalSection =
          index === lastIndex;

        /* ====================================================
           CONTACT
        ==================================================== */

        if (
          onFinalSection
        ) {
          if (
            event.key ===
              "ArrowDown" ||
            event.key ===
              "PageDown"
          ) {
            return;
          }

          if (
            (
              event.key ===
                "ArrowUp" ||
              event.key ===
                "PageUp"
            ) &&
            !isAtFinalSectionTop()
          ) {
            return;
          }

          if (
            (
              event.key ===
                "ArrowUp" ||
              event.key ===
                "PageUp"
            ) &&
            isAtFinalSectionTop()
          ) {
            event.preventDefault();

            previous();

            return;
          }

          return;
        }

        /* ====================================================
           NORMAL RIPPLE SECTIONS
        ==================================================== */

        if (
          event.key ===
            "ArrowDown" ||
          event.key ===
            "PageDown"
        ) {
          event.preventDefault();

          if (
            !animatingRef.current
          ) {
            next();
          }

          return;
        }

        if (
          event.key ===
            "ArrowUp" ||
          event.key ===
            "PageUp"
        ) {
          event.preventDefault();

          if (
            !animatingRef.current
          ) {
            previous();
          }
        }
      };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [
    hasSections,
    sections.length,
    next,
    previous,
    isAtFinalSectionTop,
  ]);

  /* ==========================================================
     CLEANUP
  ========================================================== */

  useEffect(() => {
    mountedRef.current =
      true;

    return () => {
      mountedRef.current =
        false;

      animatingRef.current =
        false;

      normalScrollModeRef.current =
        false;

      programmaticScrollRef.current =
        false;

      touchStartYRef.current =
        null;

      if (
        cooldownRef.current !==
        null
      ) {
        window.clearTimeout(
          cooldownRef.current,
        );
      }

      /*
       * Make absolutely sure the homepage ripple cannot leave
       * the document locked when navigating away.
       */
      document.body.style.overflow =
        "";

      document.body.style.touchAction =
        "";

      cancelTransition();
    };
  }, [
    cancelTransition,
  ]);

  /* ==========================================================
     PUBLIC API
  ========================================================== */

  return {
    next,
    previous,
    navigate,
    isAnimating:
      animatingRef,
  };
}

export default useRippleNavigation;