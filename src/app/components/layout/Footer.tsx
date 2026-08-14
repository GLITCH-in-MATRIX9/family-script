
import Link from "next/link";

const fontStyle = { fontFamily: "futura-pt, sans-serif" };

const COMPANY_LINKS = ["About Us", "Our Team", "Our Story", "Awards & Events"];
const PROJECT_LINKS = ["Portfolio Showcase", "Videos", "Behind The Scenes", "Testimonials"];
const LEGAL_LINKS = ["Privacy Policy", "Terms & Conditions", "FAQs", "Contact Us"];

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="text-white" style={{ ...fontStyle, fontWeight: 400, fontSize: "15px" }}>
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((label) => (
          <li key={label}>
            <Link
              href="#"
              className="text-white/70 transition-colors hover:text-white"
              style={{ ...fontStyle, fontWeight: 300, fontSize: "13px" }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="w-full" style={{ background: "#3b1425" }}>
      <div className="mx-auto max-w-7xl px-10 py-14">

        {/* ================= COLUMNS ================= */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-10 border-t border-white/25 pt-10 md:grid-cols-4">
          <div>
            <h3 className="text-white" style={{ ...fontStyle, fontWeight: 400, fontSize: "15px" }}>
              FamilyScript
            </h3>
            <p className="mt-4 text-white/70" style={{ ...fontStyle, fontWeight: 300, fontSize: "13px" }}>
              Logo + tagline (2-3 lines)
            </p>
            <p className="mt-3 text-white/70" style={{ ...fontStyle, fontWeight: 300, fontSize: "13px" }}>
              Social media icons
            </p>
          </div>

          <FooterColumn title="Company" links={COMPANY_LINKS} />
          <FooterColumn title="Projects" links={PROJECT_LINKS} />
          <FooterColumn title="Legal" links={LEGAL_LINKS} />
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/25 pt-6 text-white/70 md:flex-row">
          <p style={{ ...fontStyle, fontWeight: 300, fontSize: "13px" }}>
            &copy; {new Date().getFullYear()} Family Script by Prarabdha Info Solutions Pvt. Ltd.
          </p>
          <p style={{ ...fontStyle, fontWeight: 300, fontSize: "13px" }}>
            All rights reserved
          </p>
        </div>

      </div>
    </footer>
  );
}

