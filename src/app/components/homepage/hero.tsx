export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* ================= BACKGROUND VIDEO ================= */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="/assets/homepage/HOME_PAGE_VIDEO.mp4"
          type="video/mp4"
        />
      </video>


      {/* ================= DARK OVERLAY ================= */}
      <div className="absolute inset-0 bg-black/30" />


      {/* ================= HERO CONTENT ================= */}
      <div
        className="relative z-10 flex h-full flex-col items-center justify-end pb-[5vh] text-center text-white"
        style={{
          fontFamily: "futura-pt, sans-serif",
        }}
      >

        {/* ================= LOGO ================= */}
        <div className="mb-1">
          <img
            src="/assets/homepage/FS_logo.png"
            alt="Family Script"
            className="h-[110px] w-[110px] object-contain brightness-0 invert"
          />
        </div>


        {/* ================= RECORD YOUR STORY ================= */}
        <h1
          className="uppercase tracking-[0.10em]"
          style={{
            fontFamily: "futura-pt, sans-serif",
            fontWeight: 300,
            fontSize: "2.25rem",
            lineHeight: "1.15",
          }}
        >
          Record Your Story
        </h1>


        {/* ================= CREATE A LEGACY ================= */}
        <h2
          className="mt-3 uppercase tracking-[0.10em]"
          style={{
            fontFamily: "futura-pt, sans-serif",
            fontWeight: 300,
            fontSize: "2.25rem",
            lineHeight: "1.15",
          }}
        >
          Create a{" "}
          <span
            style={{
              fontFamily: "futura-pt, sans-serif",
              fontWeight: 500,
            }}
          >
            Legacy
          </span>
        </h2>


        {/* ================= CTA BUTTON ================= */}
        <button
          className="mt-5 rounded-full border border-white/30 bg-white/15 px-6 py-[6px] text-[10px] tracking-[0.03em] backdrop-blur-sm transition-all duration-300 hover:bg-white/25"
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

      </div>
    </section>
  );
}