"use client";

export default function WhatWeDo() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">

      {/* ================= BACKGROUND IMAGE ================= */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/homepage/WHAT WE DO.JPG')",
        }}
      />

      {/* ================= BURGUNDY OVERLAY ================= */}
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
        className="relative z-10 min-h-screen w-full text-white"
        style={{
          fontFamily: "futura-pt, sans-serif",
        }}
      >

        {/* ================= HEADING ================= */}
        <div
          className="absolute left-[25.5%] top-[12%] flex h-[33%] w-[19%] items-center justify-center text-center"
          style={{
            background: "rgba(150, 95, 38, 0.58)",
          }}
        >
          <h2
            className="uppercase"
            style={{
              fontFamily: "futura-pt, sans-serif",
              fontWeight: 300,
              fontSize: "3.7vw",
              lineHeight: "1.18",
              letterSpacing: "0.03em",
            }}
          >
            WHAT
            <br />
            WE
            <br />
            DO?
          </h2>
        </div>


        {/* ================= RIGHT DESCRIPTION ================= */}
        <div
          className="absolute right-[12.5%] top-[34%] flex h-[33%] w-[37%] items-center justify-center px-12 text-center"
          style={{
            background: "rgba(150, 95, 38, 0.48)",
          }}
        >
          <p
            style={{
              fontFamily: "futura-pt, sans-serif",
              fontWeight: 300,
              fontSize: "1.65vw",
              lineHeight: "1.35",
            }}
          >
            We explore{" "}
            <span style={{ fontWeight: 500 }}>
              Individual and
            </span>
            <br />
            <span style={{ fontWeight: 500 }}>
              Institutional legacies
            </span>{" "}
            through social
            <br />
            and spatial documentation.
          </p>
        </div>


        {/* ================= LEFT DESCRIPTION ================= */}
        <div
          className="absolute bottom-0 left-0 flex h-[44%] w-[38%] items-center justify-center px-[5%] text-center"
          style={{
            background: "rgba(54, 20, 42, 0.52)",
          }}
        >
          <div
            style={{
              fontFamily: "futura-pt, sans-serif",
              fontWeight: 300,
              fontSize: "1.55vw",
              lineHeight: "1.42",
            }}
          >
            <p>
              We develop forward-looking
              <br />
              retrospectives to{" "}
              <span style={{ fontWeight: 500 }}>
                create a legacy
              </span>{" "}
              from
              <br />
              lesser-known histories. Our process is
              <br />
              <span style={{ fontWeight: 500 }}>
                interactive, collaborative and an
              </span>
              <br />
              <span style={{ fontWeight: 500 }}>
                experience worth undertaking.
              </span>
            </p>

            <p className="mt-8">
              We are empathetic listeners,{" "}
              <span style={{ fontWeight: 500 }}>
                We co-
                <br />
                create with you.
              </span>
            </p>
          </div>
        </div>


        {/* ================= CTA ================= */}
        <button
          className="absolute bottom-[5.5%] left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-white/20 px-6 py-[7px] text-white backdrop-blur-sm transition duration-300 hover:bg-white/30"
          style={{
            fontFamily: "futura-pt, sans-serif",
            fontWeight: 300,
            fontSize: "11px",
          }}
        >
          Get your Story{" "}
          <span style={{ fontWeight: 500 }}>
            Scripted
          </span>
          &nbsp;&nbsp;&gt;&gt;
        </button>

      </div>

    </section>
  );
}