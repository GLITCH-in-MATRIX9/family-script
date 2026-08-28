"use client";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* ================= BACKGROUND VIDEO ================= */}
      <video
        autoPlay
        muted
        loop
        playsInline
        crossOrigin="anonymous"
        data-ripple-video="/assets/homepage/HOME_PAGE_VIDEO.mp4"
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
      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-[5vh] text-center text-white">

        {/* ================= LOGO ================= */}
        <div className="mb-1">
          <img
            src="/assets/homepage/FS_logo.png"
            alt="Family Script"
            className="h-[130px] w-[130px] object-contain brightness-0 invert"
          />
        </div>

        {/* ================= RECORD YOUR STORY ================= */}
        <h1 className="futura-light uppercase text-[2.25rem] leading-[1.15] tracking-[0.10em]">
          Record Your Story
        </h1>

        {/* ================= CREATE A LEGACY ================= */}
        <h2 className="futura-bold mt-3 uppercase text-[2.25rem] leading-[1.15] tracking-[0.10em]">
          Create a Legacy
        </h2>

        {/* ================= CTA BUTTON ================= */}
        <button className="futura-light mt-7 rounded-full border border-white/40 bg-white/15 px-10 py-4 text-[15px] tracking-[0.05em] backdrop-blur-sm transition-all duration-300 hover:bg-white/25">
          Get your Story{" "}
          <span className="futura-bold">
            Scripted
          </span>
          <span className="ml-3">&gt;&gt;</span>
        </button>

      </div>


    </section>
  );
}