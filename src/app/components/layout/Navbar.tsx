import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <nav className="flex items-start justify-between px-7 pt-8 text-white">

        {/* ================= LOGO ================= */}
        <Link
          href="/"
          className="shrink-0 -translate-y-4"
          style={{
            fontFamily: "futura-pt, sans-serif",
            fontStyle: "normal",
          }}
        >
          {/* FAMILY SCRIPT */}
          <div
            className="text-[27px] tracking-[5px]"
            style={{
              fontFamily: "futura-pt, sans-serif",
              fontWeight: 500,
              fontStyle: "normal",
            }}
          >
            FAMILY SCRIPT
          </div>

          {/* TAGLINE */}
          <div
            className="mt-1 text-[7.5px] tracking-[1.5px] opacity-90"
            style={{
              fontFamily: "futura-pt, sans-serif",
              fontWeight: 300,
              fontStyle: "normal",
            }}
          >
            LIFE WRITING&nbsp;&nbsp; | &nbsp;&nbsp;ORAL HISTORY&nbsp;&nbsp; | &nbsp;&nbsp;STORYTELLING
          </div>
        </Link>


        {/* ================= NAVIGATION LINKS ================= */}
        <div
          className="hidden items-center gap-12 md:flex"
          style={{
            fontFamily: "futura-pt, sans-serif",
            fontStyle: "normal",
          }}
        >

          {/* PEOPLE */}
          <Link
            href="/people"
            className="text-[14px] tracking-wide transition-opacity hover:opacity-60"
            style={{
              fontFamily: "futura-pt, sans-serif",
              fontWeight: 300,
              fontStyle: "normal",
            }}
          >
            PEOPLE
          </Link>


          {/* PROJECT */}
          <Link
            href="/project"
            className="text-[14px] tracking-wide transition-opacity hover:opacity-60"
            style={{
              fontFamily: "futura-pt, sans-serif",
              fontWeight: 300,
              fontStyle: "normal",
            }}
          >
            PROJECT
          </Link>


          {/* PURPOSE */}
          <Link
            href="/purpose"
            className="text-[14px] tracking-wide transition-opacity hover:opacity-60"
            style={{
              fontFamily: "futura-pt, sans-serif",
              fontWeight: 300,
              fontStyle: "normal",
            }}
          >
            PURPOSE
          </Link>


          {/* PROCESS */}
          <Link
            href="/process"
            className="text-[14px] tracking-wide transition-opacity hover:opacity-60"
            style={{
              fontFamily: "futura-pt, sans-serif",
              fontWeight: 300,
              fontStyle: "normal",
            }}
          >
            PROCESS
          </Link>


          {/* PHILOSOPHY */}
          <Link
            href="/philosophy"
            className="text-[14px] tracking-wide transition-opacity hover:opacity-60"
            style={{
              fontFamily: "futura-pt, sans-serif",
              fontWeight: 300,
              fontStyle: "normal",
            }}
          >
            PHILOSOPHY
          </Link>


          {/* PRODUCTS */}
          <Link
            href="/products"
            className="text-[14px] tracking-wide transition-opacity hover:opacity-60"
            style={{
              fontFamily: "futura-pt, sans-serif",
              fontWeight: 300,
              fontStyle: "normal",
            }}
          >
            PRODUCTS
          </Link>

        </div>


        {/* ================= HAMBURGER ================= */}
        <button
          type="button"
          aria-label="Open menu"
          className="ml-6 flex h-7 w-7 flex-col items-center justify-center gap-[5px]"
        >
          <span className="block h-[1px] w-[17px] bg-white" />
          <span className="block h-[1px] w-[17px] bg-white" />
          <span className="block h-[1px] w-[17px] bg-white" />
        </button>

      </nav>
    </header>
  );
}