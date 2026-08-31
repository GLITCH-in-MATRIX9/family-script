// components/homepage/HomepageNavigator.tsx

"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useRippleNavigation,
} from "./ripple/useRippleNavigation";

/* ============================================================
   TYPES
============================================================ */

interface HomepageNavigatorProps {
  children: React.ReactNode;
}

/* ============================================================
   COMPONENT
============================================================ */

export default function HomepageNavigator({
  children,
}: HomepageNavigatorProps) {
  const rootRef =
    useRef<HTMLDivElement | null>(null);

  const [
    sections,
    setSections,
  ] = useState<HTMLElement[]>([]);

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  /* ==========================================================
     FIND SECTIONS
     
     Every direct child of <main> with
     data-home-section participates in ripple navigation.

     Example:

     <main>
       <section data-home-section="0" />
       <section data-home-section="1" />
       <section data-home-section="2" />
       <section data-home-section="3" />
       <section data-home-section="4" />
       <section data-home-section="5" />
     </main>

     Section 5 can be Contact and may contain Footer.
  ========================================================== */

  const findSections =
    useCallback(() => {
      const root =
        rootRef.current;

      if (!root) {
        return [];
      }

      const main =
        root.querySelector("main");

      if (!main) {
        return [];
      }

      return Array.from(
        main.querySelectorAll<HTMLElement>(
          ":scope > [data-home-section]",
        ),
      ).sort(
        (
          first,
          second,
        ) => {
          const firstIndex =
            Number(
              first.dataset.homeSection ?? 0,
            );

          const secondIndex =
            Number(
              second.dataset.homeSection ?? 0,
            );

          return (
            firstIndex -
            secondIndex
          );
        },
      );
    }, []);

  /* ==========================================================
     KEEP SECTION LIST IN SYNC
  ========================================================== */

  useEffect(() => {
    const updateSections =
      () => {
        const found =
          findSections();

        setSections(
          (previous) => {
            if (
              previous.length ===
                found.length &&
              previous.every(
                (
                  section,
                  index,
                ) =>
                  section ===
                  found[index],
              )
            ) {
              return previous;
            }

            return found;
          },
        );
      };

    updateSections();

    const frame =
      requestAnimationFrame(
        updateSections,
      );

    /*
     * This helps if sections are rendered
     * after the initial React paint.
     */
    const observer =
      new MutationObserver(
        updateSections,
      );

    const root =
      rootRef.current;

    if (root) {
      observer.observe(
        root,
        {
          childList: true,
          subtree: true,
        },
      );
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [
    findSections,
  ]);

  /* ==========================================================
     INDEX CHANGE
  ========================================================== */

  const handleIndexChange =
    useCallback(
      (index: number) => {
        setCurrentIndex(index);
      },
      [],
    );

  /* ==========================================================
     RIPPLE NAVIGATION
  ========================================================== */

  useRippleNavigation({
    sections,
    currentIndex,
    onIndexChange:
      handleIndexChange,
  });

  /* ==========================================================
     INITIAL POSITION
  ========================================================== */

  const initializedRef =
    useRef(false);

  useEffect(() => {
    if (
      sections.length === 0 ||
      initializedRef.current
    ) {
      return;
    }

    initializedRef.current =
      true;

    setCurrentIndex(0);

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [
    sections,
  ]);

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div
      ref={rootRef}
      className="
        relative
        w-full
        min-h-screen
      "
    >
      {children}
    </div>
  );
}