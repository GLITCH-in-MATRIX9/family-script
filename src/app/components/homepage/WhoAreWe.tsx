"use client";

export default function WhoAreWe() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">

      {/* ================= BACKGROUND IMAGE ================= */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/homepage/Who_are_we.JPG')",
        }}
      />

      {/* ================= BURGUNDY GRADIENT ================= */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(59, 20, 37, 0.78) 0%, rgba(59, 20, 37, 0.58) 30%, rgba(59, 20, 37, 0.38) 65%, rgba(59, 20, 37, 0.28) 100%)",
        }}
      />

      {/* ================= DARK OVERLAY ================= */}
      <div className="absolute inset-0 bg-black/10" />

      {/* ================= MAIN CONTENT ================= */}
      <div
        className="relative z-10 flex min-h-screen flex-col items-center text-center text-white"
        style={{
          fontFamily: "futura-pt, sans-serif",
        }}
      >

        <main className="flex w-full flex-1 flex-col items-center px-6 pt-[22vh] pb-12">

          {/* ================= HEADING ================= */}
          <h2
            className="uppercase tracking-[0.08em]"
            style={{
              fontFamily: "futura-pt, sans-serif",
              fontWeight: 500,
              fontSize: "2.65rem",
              lineHeight: "1",
            }}
          >
            Who Are We?
          </h2>


          {/* ================= DESCRIPTION ================= */}
          <div
            className="mt-14 max-w-[750px] text-center"
            style={{
              fontFamily: "futura-pt, sans-serif",
              fontWeight: 300,
            }}
          >

            {/* FIRST PARAGRAPH */}
            <p className="text-[18px] leading-[1.5] md:text-[20px]">

              <span
                style={{
                  fontWeight: 500,
                }}
              >
                Family Script (FS)
              </span>{" "}

              is a venture of designers, historians, architects and

              <br className="hidden md:block" />

              educationists who{" "}

              <span
                style={{
                  fontWeight: 500,
                }}
              >
                celebrate non-hegemonic histories of individuals and
                collectives.
              </span>

            </p>


            {/* SECOND PARAGRAPH */}
            <p className="mt-7 text-[18px] leading-[1.5] md:text-[20px]">

              The untold stories of leaders, artists and changemakers are the

              <br className="hidden md:block" />

              essence of our work.

            </p>

          </div>


          {/* ================= STATISTICS ================= */}
          <div className="mt-14 flex items-center justify-center text-white">

            {/* ================= 8+ ================= */}
            <div className="px-6 text-center md:px-8">

              <div
                style={{
                  fontFamily: "futura-pt, sans-serif",
                  fontWeight: 700,
                  fontSize: "21px",
                  lineHeight: "1",
                }}
              >
                8+
              </div>

              <div
                className="mt-2 whitespace-nowrap text-[10px] md:text-[12px]"
                style={{
                  fontFamily: "futura-pt, sans-serif",
                  fontWeight: 300,
                }}
              >
                Years of Experience
              </div>

            </div>


            {/* DIVIDER */}
            <div className="h-11 w-px bg-white/50" />


            {/* ================= 25+ ================= */}
            <div className="px-6 text-center md:px-8">

              <div
                style={{
                  fontFamily: "futura-pt, sans-serif",
                  fontWeight: 700,
                  fontSize: "21px",
                  lineHeight: "1",
                }}
              >
                25+
              </div>

              <div
                className="mt-2 whitespace-nowrap text-[10px] md:text-[12px]"
                style={{
                  fontFamily: "futura-pt, sans-serif",
                  fontWeight: 300,
                }}
              >
                Projects Completed
              </div>

            </div>


            {/* DIVIDER */}
            <div className="h-11 w-px bg-white/50" />


            {/* ================= 5+ ================= */}
            <div className="px-6 text-center md:px-8">

              <div
                style={{
                  fontFamily: "futura-pt, sans-serif",
                  fontWeight: 700,
                  fontSize: "21px",
                  lineHeight: "1",
                }}
              >
                5+
              </div>

              <div
                className="mt-2 whitespace-nowrap text-[10px] md:text-[12px]"
                style={{
                  fontFamily: "futura-pt, sans-serif",
                  fontWeight: 300,
                }}
              >
                Regions covered
              </div>

            </div>

          </div>


          {/* ================= CTA ================= */}
          <button
            className="mt-10 rounded-full border border-white/20 bg-white/20 px-6 py-[7px] text-[10px] text-white transition duration-300 hover:bg-white/30 md:text-[11px]"
            style={{
              fontFamily: "futura-pt, sans-serif",
              fontWeight: 300,
            }}
          >
            Get your Story{" "}

            <span
              style={{
                fontWeight: 500,
              }}
            >
              Scripted
            </span>

            &nbsp;&nbsp;&gt;&gt;
          </button>

        </main>

      </div>

    </section>
  );
}