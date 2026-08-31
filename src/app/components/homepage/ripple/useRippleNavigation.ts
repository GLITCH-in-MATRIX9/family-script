// components/homepage/ripple/useRippleNavigation.ts

"use client";

import {
  useCallback,
  useEffect,
  useRef,
} from "react";

import {
  useRipple,
} from "./RippleProvider";

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

  onIndexChange: (
    index: number,
  ) => void;
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

  /*
   * TRUE only while the user is physically
   * inside the final Contact section.
   *
   * FALSE means ripple navigation controls
   * the full-screen sections.
   */
  const normalScrollModeRef =
    useRef(false);

  /*
   * Prevent the scroll listener from interpreting
   * our intentional scrollTo() as user navigation.
   */
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
     PREPARE SECTION HEIGHTS
     
     IMPORTANT:
     
     Every section EXCEPT the final section is
     exactly one viewport.
     
     The final section is:
     
       min-height: 100svh
       height: auto
     
     This allows Contact + Footer to extend naturally.
  ========================================================== */

  useEffect(() => {
    if (
      sections.length === 0
    ) {
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

        if (
          isFinalSection
        ) {
          /*
           * Contact:
           *
           * At least one viewport tall,
           * but allowed to grow beyond it.
           */
          section.style.minHeight =
            "100svh";

          section.style.height =
            "auto";

          return;
        }

        /*
         * All normal ripple sections.
         */
        section.style.minHeight =
          "100svh";

        section.style.height =
          "100svh";
      },
    );
  }, [
    sections,
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
     IS FINAL SECTION
  ========================================================== */

  const isFinalSection =
    useCallback(
      (index: number) => {
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
     IS TESTIMONIALS SECTION

     Testimonials is always the section immediately BEFORE
     the final (Contact) section — same "derived, not
     hardcoded" style as isFinalSection, so this keeps
     working if the section count changes again later.
  ========================================================== */

  const isTestimonialsSection =
    useCallback(
      (index: number) => {
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
     IS AT TOP OF FINAL SECTION
  ========================================================== */

  const isAtFinalSectionTop =
    useCallback(() => {
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
    }, [
      sections,
      getSectionTop,
    ]);

  /* ==========================================================
     NAVIGATE
     
     Normal sections:
       wheel/touch/keyboard
         ↓
       ripple
         ↓
       target section
     
     Final section:
       ripple into Contact
         ↓
       native document scrolling
  ========================================================== */

  const navigate =
    useCallback(
      async (
        direction: 1 | -1,
      ) => {
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
           
           Once Contact is active:
           
           - scrolling down = native
           - scrolling up from Contact top = ripple
        ==================================================== */

        if (
          isFinalSection(
            fromIndex,
          )
        ) {
          /*
           * If we are anywhere inside Contact,
           * native scrolling owns the page.
           */
          if (
            normalScrollModeRef.current
          ) {
            return;
          }

          /*
           * At the very top of Contact:
           *
           * DOWN:
           * allow native browser scrolling.
           *
           * UP:
           * navigate back to Our Journey
           * using ripple.
           */
          if (
            direction === 1
          ) {
            normalScrollModeRef.current =
              true;

            return;
          }

          /*
           * direction === -1
           *
           * Go back to previous ripple section.
           */
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

        /* ====================================================
           GET SECTIONS
        ==================================================== */

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
             PREPARE TARGET
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
             RIPPLE ORIGIN
          ================================================== */

          const {
            x,
            y,
          } =
            getRippleOrigin(
              direction,
            );

          /* ==================================================
             PLAY RIPPLE
          ================================================== */

          await playTransition({
            beforeElement:
              currentSection,

            afterElement:
              nextSection,

            originX: x,

            originY: y,

            strength: 1.05,

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
             
             This is especially important for Contact.
             
             We move to Contact's REAL DOM position,
             rather than assuming it is one viewport away.
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

          /*
           * Landing on Testimonials: resume on the last pair
           * when arriving from Contact (direction -1),
           * otherwise start fresh on the first pair.
           */
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

          /*
           * Contact is now native-scroll territory.
           */
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

          /*
           * Fallback:
           * still move to the actual DOM section.
           */
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
    useCallback(() => {
      void navigate(1);
    }, [
      navigate,
    ]);

  /* ==========================================================
     PREVIOUS
  ========================================================== */

  const previous =
    useCallback(() => {
      void navigate(-1);
    }, [
      navigate,
    ]);

  /* ==========================================================
     DETECT NATIVE CONTACT MODE
     
     Contact is native once the browser has moved
     below the top of the final section.
  ========================================================== */

  useEffect(() => {
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

        /*
         * Contact is the final section.
         *
         * At its top we keep ripple navigation
         * available for scrolling back upward.
         *
         * Once the user moves into it,
         * native document scrolling takes over.
         */
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
    sections,
    isFinalSection,
    isAtFinalSectionTop,
  ]);

  /* ==========================================================
     WHEEL
  ========================================================== */

  useEffect(() => {
    const handleWheel =
      (
        event: WheelEvent,
      ) => {
        /* ====================================================
           HORIZONTAL
        ==================================================== */

        if (
          Math.abs(event.deltaX) >
          Math.abs(event.deltaY)
        ) {
          return;
        }

        /* ====================================================
           TINY MOVEMENT
        ==================================================== */

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
           FINAL CONTACT SECTION
        ==================================================== */

        if (
          onFinalSection
        ) {
          /*
           * Scrolling DOWN inside Contact:
           *
           * Always let the browser scroll naturally.
           */
          if (
            scrollingDown
          ) {
            normalScrollModeRef.current =
              true;

            return;
          }

          /*
           * Scrolling UP inside Contact:
           *
           * If we're not at the top yet,
           * let native scrolling continue.
           */
          if (
            scrollingUp &&
            !isAtFinalSectionTop()
          ) {
            normalScrollModeRef.current =
              true;

            return;
          }

          /*
           * We're at the top of Contact
           * and the user wants to go back.
           *
           * Ripple back to Our Journey.
           */
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
           TESTIMONIALS SECTION

           One wheel tick steps one testimonial pair while
           inside this section; only at the first/last pair
           does a wheel tick hand off to normal ripple
           navigation (into Our Journey / Contact).
        ==================================================== */

        if (
          isTestimonialsSection(
            index,
          )
        ) {
          const controller =
            testimonialsStepRef.current;

          if (
            controller
          ) {
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

          /*
           * Controller not yet mounted — fall through to
           * normal section-jump behavior below so the user
           * isn't stranded.
           */
        }

        /* ====================================================
           NORMAL RIPPLE SECTIONS
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
    sections.length,
    next,
    previous,
    isAtFinalSectionTop,
    isTestimonialsSection,
  ]);

  /* ==========================================================
     TOUCH
  ========================================================== */

  useEffect(() => {
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

    const handleTouchMove =
      (
        event: TouchEvent,
      ) => {
        /*
         * Never prevent native Contact scrolling.
         */
        if (
          currentIndexRef.current ===
          sections.length - 1
        ) {
          return;
        }

        /*
         * Only stop native movement during
         * an active ripple.
         */
        if (
          animatingRef.current &&
          event.cancelable
        ) {
          event.preventDefault();
        }
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

        const endY =
          event.changedTouches[0]
            ?.clientY;

        if (
          endY === undefined
        ) {
          return;
        }

        const delta =
          startY - endY;

        if (
          Math.abs(delta) <
          TOUCH_THRESHOLD
        ) {
          return;
        }

        const index =
          currentIndexRef.current;

        const lastIndex =
          sections.length - 1;

        const onFinalSection =
          index === lastIndex;

        const swipingUp =
          delta > 0;

        const swipingDown =
          delta < 0;

        /* ====================================================
           CONTACT
        ==================================================== */

        if (
          onFinalSection
        ) {
          /*
           * Swiping upward while not at the top:
           * browser owns it.
           */
          if (
            swipingUp &&
            !isAtFinalSectionTop()
          ) {
            return;
          }

          /*
           * Swiping down:
           * native browser scrolling.
           */
          if (
            swipingDown
          ) {
            normalScrollModeRef.current =
              true;

            return;
          }

          /*
           * At Contact top + swipe up:
           * ripple back.
           */
          if (
            swipingUp &&
            isAtFinalSectionTop()
          ) {
            normalScrollModeRef.current =
              false;

            previous();

            return;
          }

          return;
        }

        /* ====================================================
           NORMAL RIPPLE SECTIONS
        ==================================================== */

        if (
          animatingRef.current
        ) {
          return;
        }

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

    window.addEventListener(
      "touchstart",
      handleTouchStart,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "touchmove",
      handleTouchMove,
      {
        passive: false,
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
        "touchmove",
        handleTouchMove,
      );

      window.removeEventListener(
        "touchend",
        handleTouchEnd,
      );
    };
  }, [
    sections.length,
    next,
    previous,
    isAtFinalSectionTop,
  ]);

  /* ==========================================================
     KEYBOARD
  ========================================================== */

  useEffect(() => {
    const handleKeyDown =
      (
        event: KeyboardEvent,
      ) => {
        const target =
          event.target as HTMLElement | null;

        /*
         * Never hijack form fields.
         */
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
          /*
           * ArrowDown/PageDown:
           *
           * Let native scrolling handle Contact + Footer.
           */
          if (
            event.key ===
              "ArrowDown" ||
            event.key ===
              "PageDown"
          ) {
            return;
          }

          /*
           * ArrowUp/PageUp:
           *
           * If we're still inside Contact,
           * let the browser scroll upward.
           */
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

          /*
           * At Contact's top:
           * ripple back to Our Journey.
           */
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