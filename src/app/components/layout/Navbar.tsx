"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="absolute left-0 top-0 z-[999] w-full">
      <nav className="flex items-center justify-between px-7 pt-4 pb-4 text-white">

        {/* ================= LOGO ================= */}
        <Link
          href="/"
          className="shrink-0"
          aria-label="Family Script Home"
        >
          <img
            src="/assets/homepage/FS_logo.png"
            alt="Family Script"
            className="h-[78px] w-[78px] object-contain brightness-0 invert"
          />
        </Link>


        {/* ================= NAVIGATION ================= */}
        <div className="hidden items-center gap-12 md:flex">

          <Link
            href="/people"
            className="futura-light text-[16px] tracking-wide transition-opacity duration-300 hover:opacity-60"
          >
            PEOPLE
          </Link>

          <Link
            href="/projects"
            className="futura-light text-[16px] tracking-wide transition-opacity duration-300 hover:opacity-60"
          >
            PROJECT
          </Link>

          <Link
            href="/purpose"
            className="futura-light text-[16px] tracking-wide transition-opacity duration-300 hover:opacity-60"
          >
            PURPOSE
          </Link>

          <Link
            href="/process"
            className="futura-light text-[16px] tracking-wide transition-opacity duration-300 hover:opacity-60"
          >
            PROCESS
          </Link>

          <Link
            href="/philosophy"
            className="futura-light text-[16px] tracking-wide transition-opacity duration-300 hover:opacity-60"
          >
            PHILOSOPHY
          </Link>

          <Link
            href="/products"
            className="futura-light text-[16px] tracking-wide transition-opacity duration-300 hover:opacity-60"
          >
            PRODUCTS
          </Link>

        </div>


        
        {/* <button
          type="button"
          aria-label="Open menu"
          className="ml-6 flex h-8 w-8 shrink-0 flex-col items-center justify-center gap-[5px] rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.12]"
        >
          <span className="block h-[1px] w-[18px] bg-white" />
          <span className="block h-[1px] w-[18px] bg-white" />
          <span className="block h-[1px] w-[18px] bg-white" />
        </button> */}

      </nav>
    </header>
  );
}