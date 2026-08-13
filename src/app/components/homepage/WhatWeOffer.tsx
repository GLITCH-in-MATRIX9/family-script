"use client";

export default function WhatWeOffer() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">

      {/* ================= BACKGROUND IMAGE ================= */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/homepage/WHAT WE OFFER.jpg')",
        }}
      />

      {/* ================= BURGUNDY OVERLAY ================= */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(59, 20, 37, 0.78) 0%, rgba(59, 20, 37, 0.62) 35%, rgba(59, 20, 37, 0.52) 70%, rgba(59, 20, 37, 0.62) 100%)",
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
        <h2
          className="absolute left-0 right-0 top-[22%] text-center uppercase"
          style={{
            fontFamily: "futura-pt, sans-serif",
            fontWeight: 300,
            fontSize: "3.6vw",
            lineHeight: "1",
            letterSpacing: "0.04em",
          }}
        >
          WHAT WE OFFER?
        </h2>


        {/* ================= INTRO TEXT ================= */}
        <div
          className="absolute left-0 right-0 top-[37%] text-center"
          style={{
            fontFamily: "futura-pt, sans-serif",
            fontWeight: 300,
            fontSize: "1.55vw",
            lineHeight: "1.5",
          }}
        >
          <p>
            A nonlinear, open-ended process
          </p>

          <p>
            Recording Oral History and Material Memory
          </p>

          <p>
            Driving a{" "}
            <span style={{ fontWeight: 500 }}>
              “Moving Methodology”
            </span>
          </p>
        </div>


        {/* ================= SERVICES GRID ================= */}
        <div
          className="absolute left-1/2 top-[56%] grid w-[75%] -translate-x-1/2 grid-cols-3 gap-x-[15%] gap-y-10"
        >

          {/* ================= ROW 1 ================= */}

          <ServiceBox>
            Memoirs, Anthologies,
            <br />
            Biographies
          </ServiceBox>

          <ServiceBox>
            Documentaries,
            <br />
            Short Films
          </ServiceBox>

          <ServiceBox>
            Digital Archive Services
          </ServiceBox>


          {/* ================= ROW 2 ================= */}

          <ServiceBox>
            Exhibition Design
          </ServiceBox>

          <ServiceBox>
            Life Writing Workshops
          </ServiceBox>

          <ServiceBox>
            Bespoke Journals
          </ServiceBox>

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


/* ============================================================
   SERVICE BOX
   ============================================================ */

function ServiceBox({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex h-[100px] items-center justify-center rounded-[10px] px-5 text-center"
      style={{
        background: "rgba(72, 58, 70, 0.55)",
        fontFamily: "futura-pt, sans-serif",
        fontWeight: 300,
        fontSize: "1.15vw",
        lineHeight: "1.35",
      }}
    >
      {children}
    </div>
  );
}