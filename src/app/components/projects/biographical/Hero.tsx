"use client";

import Link from "next/link";

const people = [
  {
    name: "AKHIL BAKSHI",
    image: "/assets/projects/biographical/AKHIL BAKSHI.png",
    href: "/projects/biographical/akhil-bakshi",
  },
  {
    name: "REVA KHANNA",
    image: "/assets/projects/biographical/REVA KHANNA.png",
    href: "/projects/biographical/reva-khanna",
  },
  {
    name: "DR. V KUTTY",
    image: "/assets/projects/biographical/DRVKKUTTY.png",
    href: "/projects/biographical/dr-v-kutty",
  },
  {
    name: "RENU MEHRA",
    image: "/assets/projects/biographical/RENU MEHRA.png",
    href: "/projects/biographical/renu-mehra",
  },
  {
    name: "SUDHA GUPTA",
    image: "/assets/projects/biographical/SUDHA GUPTA.png",
    href: "/projects/biographical/sudha-gupta",
  },
  {
    name: "SUDHA RAINA",
    image: "/assets/projects/biographical/SUDHA RAINA.png",
    href: "/projects/biographical/sudha-raina",
  },
  {
    name: "VINOD KUMAR KHANNA",
    image: "/assets/projects/biographical/VINOD KUMAR KHANNA.png",
    href: "/projects/biographical/vinod-kumar-khanna",
  },
  {
    name: "BELA DEVI",
    image: "/assets/projects/biographical/BELA DEVI.png",
    href: "/projects/biographical/bela-devi",
  },
  {
    name: "SULAKHYANA PATTANAYAK",
    image: "/assets/projects/biographical/SULAKHYANA PATTANAYAK.png",
    href: "/projects/biographical/sulakhyana-pattanayak",
  },
  {
    name: "DR. K D BHARGAVA",
    image: "/assets/projects/biographical/DR K D BHARGAVA.png",
    href: "/projects/biographical/dr-k-d-bhargava",
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#32141f] text-white">

      {/* ================= BACKGROUND ================= */}
      <div className="pointer-events-none absolute inset-0">

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #431827 0%, #3b1724 38%, #2b1821 72%, #171319 100%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(119,57,65,0.12), transparent 55%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 55%, rgba(10,8,10,0.32) 100%)",
          }}
        />

      </div>


      {/* ================= MAIN CONTENT ================= */}
      <section className="relative z-10 mx-auto min-h-screen w-full max-w-[1500px] px-8 pb-24 pt-28 md:px-[6%] md:pt-[7%]">

        {/* ================= BREADCRUMB ================= */}
        <div className="mb-10 flex items-center gap-2">

          <Link
            href="/"
            className="futura-light text-[12px] uppercase tracking-wide text-white/35 transition-colors duration-300 hover:text-white/70 md:text-[13px]"
          >
            Home
          </Link>

          <span className="futura-light text-[12px] text-white/30 md:text-[13px]">
            &gt;&gt;
          </span>

          <Link
            href="/projects"
            className="futura-light text-[12px] uppercase tracking-wide text-white/35 transition-colors duration-300 hover:text-white/70 md:text-[13px]"
          >
            Projects
          </Link>

          <span className="futura-light text-[12px] text-white/30 md:text-[13px]">
            &gt;&gt;
          </span>

          <span className="futura-light text-[12px] uppercase tracking-wide text-white/35 md:text-[13px]">
            Biographical
          </span>

        </div>


        {/* ================= INTRO ================= */}
        <div className="max-w-[650px]">

          <h1 className="futura-bold text-[52px] uppercase leading-none tracking-[0.01em] text-[#e7ad55] md:text-[64px] lg:text-[68px]">
            Biographical
          </h1>

          <p className="futura-light mt-9 max-w-[620px] text-[17px] leading-[1.6] tracking-wide text-white/65 md:text-[19px]">
            From memories and archives to beautifully crafted biographies,
            <br className="hidden md:block" />
            we preserve stories that matter.
          </p>

        </div>


        {/* ================= PEOPLE GRID ================= */}
        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-5 md:gap-x-[4.5%] md:gap-y-8">

          {people.map((person) => (
            <Link
              key={person.name}
              href={person.href}
              className="group block"
            >

              {/* IMAGE */}
              <div className="relative aspect-[1.35/1] w-full overflow-hidden">

                <img
                  src={person.image}
                  alt={person.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                />

                <div className="absolute inset-0 bg-black/5 transition-colors duration-500 group-hover:bg-black/0" />

              </div>


              {/* NAME */}
              <div className="mt-5 text-center">

                <h2 className="futura-light text-[18px] uppercase tracking-[0.20em] text-white md:text-[20px]">
                  {person.name}
                </h2>

              </div>

            </Link>
          ))}

        </div>

      </section>

    </section>
  );
}