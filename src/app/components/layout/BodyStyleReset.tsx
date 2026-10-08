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
 * Route-specific interaction code can temporarily change body styles.
 * Reset them on every route change so those styles never leak into
 * another page and block native scrolling.
 */
export default function BodyStyleReset() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
  }, [pathname]);

  return null;
}
