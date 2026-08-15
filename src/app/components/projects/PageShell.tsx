import Navbar from "../layout/Navbar";
import SocialIcons from "../layout/SocialIcos";
import Breadcrumb, { type BreadcrumbItem } from "./Breadcrumb";
import ScriptedCTA from "./ScriptedCTA";

export default function PageShell({
  breadcrumbItems,
  children,
  contentAlign = "center",
}: {
  breadcrumbItems: BreadcrumbItem[];
  children: React.ReactNode;
  // ProjectDetail's hero-style layout wants its content vertically centered;
  // a listing page (heading + description + card grid flowing top-down)
  // wants to start right below the breadcrumb instead.
  contentAlign?: "center" | "start";
}) {
  return (
    <div
      className="relative flex min-h-screen w-full flex-col overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(circle at 50% 0%, rgba(94, 33, 51, 1) 0%, rgba(52, 18, 30, 1) 45%, rgba(22, 9, 14, 1) 100%)",
      }}
    >
      {/* Scrim behind the (transparent, `fixed`) Navbar — belt-and-suspenders
          legibility insurance for whatever ends up near the top, independent
          of the content padding below. Sits above the page content (z-40)
          but below the Navbar itself (z-50). */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-28 bg-gradient-to-b from-black/55 via-black/20 to-transparent" />

      <Navbar />
      <SocialIcons />

      {/* ================= BREADCRUMB ================= */}
      {/* Navbar is `fixed`, so this needs its own top clearance instead of
          relying on document flow to sit below it. `relative z-10`: a plain
          in-flow element with no position paints BELOW a `position:fixed`
          z-0 sibling (like ProjectDetail's backdrop) per CSS stacking order,
          regardless of DOM order — without this the backdrop photo paints
          over the breadcrumb text. */}
      <div className="relative z-10 px-7 pt-32">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* ================= PAGE CONTENT ================= */}
      <main
        className={`relative z-10 flex flex-1 px-7 py-2 ${contentAlign === "center" ? "items-center" : "items-start"}`}
      >
        {children}
      </main>

      {/* ================= CTA ================= */}
      {/* Same stacking reason as the breadcrumb above. */}
      <div className="relative z-10 flex justify-center pb-4">
        <ScriptedCTA />
      </div>
    </div>
  );
}
