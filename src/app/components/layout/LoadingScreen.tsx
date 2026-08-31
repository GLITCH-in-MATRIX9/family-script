"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function LoadingScreen() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const loader = loaderRef.current;
    const logo = logoRef.current;

    if (!loader || !logo) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      /* ============================================
         INITIAL STATE

         Logo is completely hidden.
         The clipping starts at the bottom.
         ============================================ */

      gsap.set(logo, {
        clipPath: "inset(0 0 100% 0)",
      });

      /* ============================================
         LOGO LOADING

         Reveals the SAME logo from:
         TOP → BOTTOM
         ============================================ */

      timeline.to(logo, {
        clipPath: "inset(0 0 0% 0)",
        duration: 2.8,
        ease: "power2.inOut",
      });

      /* ============================================
         SMALL PAUSE
         ============================================ */

      timeline.to(
        {},
        {
          duration: 0.4,
        },
      );

      /* ============================================
         FADE LOADER OUT
         ============================================ */

      timeline.to(loader, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",

        onComplete: () => {
          loader.style.visibility = "hidden";
          loader.style.pointerEvents = "none";
        },
      });
    }, loaderRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center  bg-[#3b1425]"
    >
      {/* ============================================
          SINGLE LOGO
          ============================================ */}

      <div ref={logoRef} className="relative">
        <img
          src="/assets/homepage/FS_logo.png"
          alt="Family Script"
          className="h-[150px] w-[150px] object-contain brightness-0 invert md:h-[190px] md:w-[190px]"
        />
      </div>
    </div>
  );
}
