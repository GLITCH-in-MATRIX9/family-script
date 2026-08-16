"use client";

import Image from "next/image";

const team = [
  {
    name: "SHREYAS V BHATT",
    role: "Founder | Design | Architect",
    image: "/assets/People/OurTeam/Shreyas.png",
  },
  {
    name: "ANJAL SHANIMA",
    role: "Visual Design | Architect | Designer",
    image: "/assets/People/OurTeam/AnjalShanima.png",
  },
  {
    name: "Ar. FARIA CHOUDHRY",
    role: "Business Strategist | Management Professional",
    image: "/assets/People/OurTeam/Faria.png",
  },
];

const friends = [
  {
    name: "Dr. Anu Kumar Sinha",
    image: "/assets/People/Friends/1.png",
  },
  {
    name: "Hina Zula",
    image: "/assets/People/Friends/2.png",
  },
  {
    name: "Dilip Choudhary",
    image: "/assets/People/Friends/3.png",
  },
  {
    name: "Himanshu Mehta",
    image: "/assets/People/Friends/4.png",
  },
  {
    name: "Anamika Damodgar",
    image: "/assets/People/Friends/5.png",
  },
  {
    name: "Mukul Sharma",
    image: "/assets/People/Friends/6.png",
  },
  {
    name: "Sukhchain Dubey",
    image: "/assets/People/Friends/7.png",
  },
  {
    name: "Rohit Singh",
    image: "/assets/People/Friends/8.png",
  },
  {
    name: "Madhu Sinha",
    image: "/assets/People/Friends/9.png",
  },
  {
    name: "Chitra Sinha",
    image: "/assets/People/Friends/10.png",
  },
  {
    name: "Kanchan Sinha",
    image: "/assets/People/Friends/11.png",
  },
  {
    name: "Karan Sinha",
    image: "/assets/People/Friends/12.png",
  },
  {
    name: "Anand Rai",
    image: "/assets/People/Friends/13.png",
  },
  {
    name: "Nidhi Arora",
    image: "/assets/People/Friends/14.png",
  },
  {
    name: "Lalita Goyal",
    image: "/assets/People/Friends/15.png",
  },
  {
    name: "A. K. Jindal",
    image: "/assets/People/Friends/16.png",
  },
  {
    name: "Dinesh Kothari",
    image: "/assets/People/Friends/17.png",
  },
  {
    name: "Jawaharlal Foundation",
    image: "/assets/People/Friends/18.png",
  },
];

export default function TeamFriends() {
  return (
    <section className="relative min-h-[160vh] w-full overflow-hidden bg-[#171319] text-white">
      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0">
        {/* Darker outer gradient to merge with previous Hero */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #171319 0%, #21151b 12%, #2b1821 35%, #26171f 65%, #171319 100%)",
          }}
        />

        {/* Very subtle center glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(92,43,52,0.10), transparent 58%)",
          }}
        />

        {/* Dark edges */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(8,8,10,0.18) 0%, transparent 18%, transparent 82%, rgba(8,8,10,0.18) 100%)",
          }}
        />
      </div>

      {/* ================= CONTENT ================= */}

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 pb-32 pt-24 md:px-8 md:pt-28">
        {/* =====================================================
            OUR TEAM
        ===================================================== */}

        <div className="text-center">
          <h2 className="futura-light text-[32px] uppercase tracking-[0.05em] text-white md:text-[40px] lg:text-[44px]">
            Our Team
          </h2>
        </div>

        {/* =====================================================
            TEAM
        ===================================================== */}

        <div className="relative mx-auto mt-14 w-full max-w-[1250px]">
          {/* ================= RECTANGLE ================= */}

          <div className="relative h-[260px] border border-white/25">
            {/* ================= PEOPLE ================= */}

            <div className="absolute inset-x-0 bottom-0 flex h-full items-end">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="relative flex h-full w-1/3 items-end justify-center"
                >
                  <div className="relative h-[290px] w-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="33vw"
                      className="object-contain object-bottom"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* =================================================
              NAMES + POSITIONS
          ================================================= */}

          <div className="grid grid-cols-3">
            {team.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center pt-6 text-center"
              >
                <h3 className="futura-light text-[12px] uppercase tracking-[0.07em] text-[#e7ad55] md:text-[15px]">
                  {member.name}
                </h3>

                <p className="futura-light mt-2 max-w-[240px] text-[9px] leading-[1.5] text-white/80 md:text-[15px]">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================
            SPACE BETWEEN SECTIONS
        ===================================================== */}

        <div className="h-[20vh]" />

        {/* =====================================================
            FRIENDS TITLE
        ===================================================== */}

        <div className="text-center">
          <h2 className="futura-light text-[22px] uppercase tracking-[0.06em] text-white md:text-[28px] lg:text-[30px]">
            Friends of Family Script
          </h2>

          <p className="futura-light mx-auto mt-5 max-w-[850px] text-[15px] leading-[1.7] tracking-[0.02em] text-white/65 md:text-[15px]">
            This is a place to thank the friends who have lent their voices,
            experiences and expertise throughout our journey. Our work is made
            richer by the people who have shared their stories and trusted us
            with their memories.
          </p>
        </div>

        {/* =====================================================
            FRIENDS GRID
        ===================================================== */}

        <div className="mx-auto mt-16 grid w-full max-w-[1250px] grid-cols-3 gap-x-8 gap-y-14 sm:grid-cols-4 md:grid-cols-6 md:gap-x-12 md:gap-y-16">
          {friends.map((friend) => (
            <div
              key={friend.name}
              className="group flex flex-col items-center text-center"
            >
              {/* ================= IMAGE ================= */}

              <div className="relative aspect-square w-[95px] overflow-hidden rounded-full md:w-[115px] lg:w-[125px]">
                <Image
                  src={friend.image}
                  alt={friend.name}
                  fill
                  sizes="125px"
                  className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>

              {/* ================= NAME ================= */}

              <p className="futura-light mt-5 max-w-[160px] text-[11px] leading-[1.4] text-white/90 md:text-[13px] lg:text-[14px]">
                {friend.name}
              </p>
            </div>
          ))}
        </div>

        {/* ================= BOTTOM SPACE ================= */}

        <div className="h-[15vh]" />
      </div>
    </section>
  );
}
