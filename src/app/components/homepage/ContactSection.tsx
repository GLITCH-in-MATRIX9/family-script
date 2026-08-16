"use client";

import {
  FiChevronDown,
  FiMail,
  FiPhone,
  FiUser,
  FiArrowRight,
} from "react-icons/fi";

const FIELD_BG = "rgba(59, 20, 37, 0.55)";
const FIELD_BORDER = "rgba(255, 255, 255, 0.18)";

function FormField({
  icon,
  placeholder,
  type = "text",
  className = "",
}: {
  icon?: React.ReactNode;
  placeholder: string;
  type?: string;
  className?: string;
}) {
  return (
    <div
      className={`group flex min-h-[52px] items-center gap-3 rounded-xl border px-5 transition-all duration-300 focus-within:border-white/40 focus-within:bg-[rgba(59,20,37,0.68)] ${className}`}
      style={{
        background: FIELD_BG,
        borderColor: FIELD_BORDER,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {icon && (
        <span className="shrink-0 text-white/70 transition-colors duration-300 group-focus-within:text-white">
          {icon}
        </span>
      )}

      <input
        type={type}
        placeholder={placeholder}
        className="futura-light w-full bg-transparent text-[15px] tracking-[0.03em] text-white outline-none placeholder:text-white/75"
      />
    </div>
  );
}

function FormSelect({
  placeholder,
}: {
  placeholder: string;
}) {
  return (
    <div
      className="group flex min-h-[52px] items-center gap-3 rounded-xl border px-5 transition-all duration-300 focus-within:border-white/40 focus-within:bg-[rgba(59,20,37,0.68)]"
      style={{
        background: FIELD_BG,
        borderColor: FIELD_BORDER,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <select
        defaultValue=""
        className="futura-light w-full cursor-pointer appearance-none bg-transparent text-[15px] tracking-[0.03em] text-white outline-none"
      >
        <option value="" disabled className="text-black">
          {placeholder}
        </option>

        <option value="memoir" className="text-black">
          Memoirs, Anthologies, Biographies
        </option>

        <option value="documentary" className="text-black">
          Documentaries, Short Films
        </option>

        <option value="archive" className="text-black">
          Digital Archive Services
        </option>

        <option value="exhibition" className="text-black">
          Exhibition Design
        </option>

        <option value="workshop" className="text-black">
          Life Writing Workshops
        </option>

        <option value="journals" className="text-black">
          Bespoke Journals
        </option>
      </select>

      <FiChevronDown className="shrink-0 text-white/70 transition-transform duration-300 group-focus-within:rotate-180" />
    </div>
  );
}

export default function ContactSection() {
  return (
    <section className="relative w-full overflow-hidden py-14 md:py-16">

      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0">

        <img
          src="/assets/homepage/GET YOUR STORY SCRIPTED.JPG"
          alt=""
          className="h-full w-full object-cover"
        />

        {/* ================= DARK CINEMATIC OVERLAY ================= */}
        <div className="absolute inset-0 bg-black/35" />

        {/* ================= BURGUNDY TINT ================= */}
        <div className="absolute inset-0 bg-[#3b1425]/25" />

        {/* ================= BOTTOM / EDGE DARKENING ================= */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,8,14,0.20) 0%, rgba(59,20,37,0.18) 45%, rgba(25,8,16,0.48) 100%)",
          }}
        />

        {/* ================= SOFT VIGNETTE ================= */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 15%, rgba(20,8,14,0.38) 100%)",
          }}
        />
      </div>


      {/* ================= CONTENT ================= */}
      <div className="relative z-10 mx-auto w-[90%] max-w-5xl">

        {/* ================= HEADING ================= */}
        <div className="text-center">

          <p className="futura-light mb-2 text-[11px] uppercase tracking-[0.35em] text-white/80">
            Start Your Story
          </p>

          <h2 className="futura-light text-[2rem] leading-none tracking-[0.04em] text-white md:text-[2.5rem]">

            Get your Story{" "}

            <span className="futura-bold">
              Scripted
            </span>

            <span className="ml-2">
              &gt;&gt;
            </span>

          </h2>

          <p className="futura-light mx-auto mt-4 max-w-[600px] text-[14px] leading-[1.55] tracking-wide text-white/85 md:text-[15px]">
            Tell us a little about your story, and let us help you
            transform memories into a lasting legacy.
          </p>

        </div>


        {/* ================= FORM CARD ================= */}
        <div
          className="mx-auto mt-7 rounded-[20px] border border-white/25 p-4 shadow-[0_20px_60px_rgba(20,8,14,0.35)] md:p-6"
          style={{
            background: "rgba(35, 12, 23, 0.48)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          }}
        >

          <form
            className="grid grid-cols-1 gap-3 md:grid-cols-2"
            onSubmit={(event) => event.preventDefault()}
          >

            {/* ================= NAME ================= */}
            <FormField
              icon={<FiUser size={17} />}
              placeholder="First name*"
            />

            <FormField
              icon={<FiUser size={17} />}
              placeholder="Last name"
            />


            {/* ================= CONTACT ================= */}
            <FormField
              icon={<FiMail size={17} />}
              placeholder="Email*"
              type="email"
            />

            <FormField
              icon={<FiPhone size={17} />}
              placeholder="Phone*"
              type="tel"
            />


            {/* ================= SERVICE ================= */}
            <FormSelect
              placeholder="What service would you like to avail?*"
            />

            <FormField
              placeholder="Documentation purpose"
            />


            {/* ================= MESSAGE ================= */}
            <div
              className="group rounded-xl border p-4 transition-all duration-300 focus-within:border-white/40 focus-within:bg-[rgba(59,20,37,0.68)] md:col-span-2"
              style={{
                background: FIELD_BG,
                borderColor: FIELD_BORDER,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <textarea
                placeholder="Tell us about your story..."
                rows={3}
                className="futura-light w-full resize-none bg-transparent text-[15px] leading-[1.5] tracking-[0.03em] text-white outline-none placeholder:text-white/75"
              />
            </div>


            {/* ================= SUBMIT ================= */}
            <div className="flex justify-center pt-1 md:col-span-2">

              <button
                type="submit"
                className="futura-light group flex items-center gap-3 rounded-full border border-[#3b1425]/30 bg-[#3b1425] px-10 py-3 text-[15px] tracking-[0.05em] text-white shadow-[0_8px_30px_rgba(59,20,37,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4d1a32] hover:shadow-[0_12px_35px_rgba(59,20,37,0.4)]"
              >
                Submit

                <FiArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />

              </button>

            </div>

          </form>

        </div>

      </div>

    </section>
  );
}