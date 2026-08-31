// components/layout/BodyStyleReset.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Safety net.
 *
 * <body> persists across client-side navigations in the
 * App Router (only the page content under <main> swaps out).
 *
 * HomepageNavigator / useRippleNavigation temporarily sets
 *   document.body.style.overflow = "hidden"
 *   document.body.style.touchAction = "none"
 * while a ripple transition is animating, then restores it.
 *
 * If the user navigates away mid-transition (or in rare
 * dev-only React Strict Mode double-invoke edge cases), that
 * restore can be skipped, leaving <body> permanently locked
 * with overflow: hidden — which blocks native wheel/trackpad
 * scrolling on every other page for the rest of the session.
 *
 * This component forces a clean slate on every route change,
 * regardless of what the homepage ripple code did or didn't
 * clean up after itself.
 */
export default function BodyStyleReset() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
  }, [pathname]);

  return null;
}