"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FiArrowUp } from "react-icons/fi";

/**
 * Mobile-only "go to top" arrow, shown on every page except the homepage
 * (which already has its own button in ContactSection).
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname === "/") return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
      className="scroll-top-btn"
      data-visible={visible}
    >
      <FiArrowUp size={18} />
    </button>
  );
}
