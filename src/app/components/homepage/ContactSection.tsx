"use client";

import { FiChevronDown, FiMail, FiPhone, FiUser } from "react-icons/fi";

const FIELD_BG = "rgba(72, 58, 70, 0.72)";
const fontStyle = { fontFamily: "futura-pt, sans-serif", fontWeight: 300 };

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
      className={`flex items-center gap-3 rounded-md px-4 py-3 text-white/90 ${className}`}
      style={{ background: FIELD_BG }}
    >
      {icon && <span className="shrink-0 text-white/80">{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent text-[13px] tracking-wide text-white placeholder-white/80 outline-none"
        style={fontStyle}
      />
    </div>
  );
}

function FormSelect({ placeholder }: { placeholder: string }) {
  return (
    <div
      className="flex items-center gap-3 rounded-md px-4 py-3 text-white/90"
      style={{ background: FIELD_BG }}
    >
      <select
        defaultValue=""
        className="w-full appearance-none bg-transparent text-[13px] tracking-wide text-white outline-none"
        style={fontStyle}
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
      <FiChevronDown className="shrink-0 text-white/80" />
    </div>
  );
}

export default function ContactSection() {
  return (
    <section className="relative w-full overflow-hidden py-24 md:py-28">
      {/* ================= BACKGROUND IMAGE ================= */}
      <div className="absolute inset-0">
        <img
          src="/assets/homepage/BIOGRAPHICAL.png"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#efe6d8]/45" />
      </div>

      {/* ================= FORM ================= */}
      <div className="relative z-10 mx-auto w-[90%] max-w-5xl">
        <h2
          className="text-center"
          style={{
            ...fontStyle,
            color: "#3b1425",
            fontSize: "1.4rem",
          }}
        >
          Get your Story <span style={{ fontWeight: 500 }}>Scripted</span>
          &nbsp;&nbsp;&gt;&gt;
        </h2>

        <form
          className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2"
          onSubmit={(event) => event.preventDefault()}
        >
          <FormField icon={<FiUser />} placeholder="First name*" />
          <FormField icon={<FiUser />} placeholder="Last name" />

          <FormField icon={<FiMail />} placeholder="Email*" type="email" />
          <FormField icon={<FiPhone />} placeholder="Phone*" type="tel" />

          <FormSelect placeholder="What service would you like to avail?*" />
          <FormField placeholder="Documentation purpose" />

          <div
            className="flex items-start gap-3 rounded-md px-4 py-3 text-white/90 md:col-span-2"
            style={{ background: FIELD_BG }}
          >
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full resize-none bg-transparent text-[13px] tracking-wide text-white placeholder-white/80 outline-none"
              style={fontStyle}
            />
          </div>

          <div className="flex justify-center md:col-span-2">
            <button
              type="submit"
              className="mt-2 rounded-md px-7 py-2 text-white transition-opacity hover:opacity-90"
              style={{ ...fontStyle, background: "rgba(59, 20, 37, 0.85)", fontSize: "13px" }}
            >
              Submit &#9654;
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
