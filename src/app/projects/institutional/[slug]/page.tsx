// app/projects/institutional/[slug]/page.tsx

import { notFound } from "next/navigation";
import Link from "next/link";

import { projects } from "../../../../data/projects";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const project = projects.find(
    (item) =>
      item.slug === slug &&
      item.category === "institutional"
  );

  if (!project) {
    notFound();
  }

  const backgroundImage =
    project.coverImage ||
    `https://picsum.photos/1920/1080?random=${slug}-background`;

  const mainImage =
    project.bookImage ||
    `https://picsum.photos/700/900?random=${slug}-main`;

  return (
    <main className="relative w-full bg-[#32141f] text-white">

      {/* =========================================================
          PROJECT SECTION
          ========================================================= */}

      <section
        className="
          relative
          min-h-screen
          w-full
          overflow-hidden
          pt-[150px]
          lg:pt-[125px]
        "
      >

        {/* =====================================================
            BACKGROUND
            ===================================================== */}

        <div className="pointer-events-none absolute inset-0 z-0">

          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[#3b1425]/55" />

          <div className="absolute inset-0 bg-black/30" />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(59,20,37,0.08) 0%, rgba(30,18,24,0.30) 55%, rgba(8,8,10,0.90) 100%)",
            }}
          />

        </div>


        {/* =====================================================
            PAGE CONTENT
            ===================================================== */}

        <div className="relative z-10 mx-auto min-h-[calc(100vh-150px)] w-full max-w-[1500px]">


          {/* ===================================================
              BREADCRUMB
              =================================================== */}

          <div className="mb-8 flex items-center gap-2 px-[5%]">

            <Link
              href="/"
              className="futura-light text-[11px] uppercase tracking-wide text-white/40 transition-colors duration-300 hover:text-white/80"
            >
              Home
            </Link>

            <span className="futura-light text-[10px] text-white/30">
              &gt;&gt;
            </span>

            <Link
              href="/projects"
              className="futura-light text-[11px] uppercase tracking-wide text-white/40 transition-colors duration-300 hover:text-white/80"
            >
              Projects
            </Link>

            <span className="futura-light text-[10px] text-white/30">
              &gt;&gt;
            </span>

            <Link
              href="/projects/institutional"
              className="futura-light text-[11px] uppercase tracking-wide text-white/40 transition-colors duration-300 hover:text-white/80"
            >
              Institutional
            </Link>

            <span className="futura-light text-[10px] text-white/30">
              &gt;&gt;
            </span>

            <span className="futura-light text-[11px] uppercase tracking-wide text-white/45">
              {project.title}
            </span>

          </div>


          {/* ===================================================
              TWO MAIN DIVISIONS
              =================================================== */}

          <div className="grid min-h-[calc(100vh-190px)] grid-cols-1 lg:grid-cols-[46%_54%]">


            {/* =================================================
                LEFT — TEXT
                ================================================= */}

            <div className="relative flex items-center px-[6%] lg:pr-[5%]">

              <div className="w-full max-w-[650px]">

                {/* TITLE */}

                <h1 className="futura-light text-[3.1vw] uppercase leading-none tracking-[0.02em] text-[#e7ad55]">
                  {project.title}
                </h1>


                {/* SUBTITLE + LOCATION */}

                <div className="mt-4 flex flex-wrap gap-x-12 gap-y-1">

                  <p className="futura-light text-[1vw] uppercase tracking-[0.05em] text-white/85">
                    {project.subtitle}
                  </p>

                  {project.location && (
                    <p className="futura-light text-[1vw] uppercase tracking-[0.05em] text-white/65">
                      {project.location}
                    </p>
                  )}

                </div>


                {/* DESCRIPTION */}

                <div className="mt-12 max-w-[620px] space-y-7">

                  {project.description.map(
                    (paragraph, index) => (
                      <p
                        key={index}
                        className="futura-light text-[1.02vw] leading-[1.5] tracking-[0.02em] text-white/85"
                      >
                        {paragraph}
                      </p>
                    )
                  )}

                </div>

              </div>

            </div>


            {/* =================================================
                RIGHT — IMAGE COMPOSITION
                ================================================= */}

            <div className="relative min-h-[650px] overflow-hidden">


              {/* =================================================
                  MAIN IMAGE
                  ================================================= */}

              <div className="absolute left-[2%] top-[27%] z-30 w-[48%]">

                <img
                  src={mainImage}
                  alt={project.title}
                  className="h-auto w-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.55)]"
                />

              </div>


              {/* =================================================
                  GALLERY
                  ================================================= */}

              {project.gallery.map(
                (item, index) => {

                  const galleryImage =
                    item.image ||
                    `https://picsum.photos/500/400?random=${slug}-gallery-${index + 1}`;

                  const positions = [
                    "left-[2%] top-[2%]",
                    "left-[35%] top-[2%]",
                    "right-[1%] top-[2%]",

                    "right-[1%] top-[23%]",
                    "right-[1%] top-[44%]",
                    "right-[1%] top-[65%]",

                    "left-[2%] bottom-[2%]",
                    "left-[35%] bottom-[2%]",
                    "right-[1%] bottom-[2%]",
                  ];

                  return (
                    <div
                      key={`${galleryImage}-${index}`}
                      className={`
                        absolute
                        ${positions[index % positions.length]}
                        z-20
                        h-[16%]
                        w-[27%]
                        overflow-hidden
                        bg-black/10
                      `}
                    >

                      <img
                        src={galleryImage}
                        alt={`${project.title} ${index + 1}`}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-700
                          ease-out
                          hover:scale-[1.04]
                        "
                      />

                    </div>
                  );
                }
              )}

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}