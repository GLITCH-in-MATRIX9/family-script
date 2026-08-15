import CategoryIndex from "../../components/projects/CategoryIndex";

export default function InstitutionalPage() {
  return (
    <CategoryIndex
      title="Institutional"
      description="From memories and archives to beautifully crafted biographies, we preserve stories that matter."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "Institutional" },
      ]}
      items={[
        {
          label: "Vasant Valley School",
          // The INSTITUTIONAL folder itself has no per-project subfolders yet
          // (unlike BIOGRAPHICAL) — this is the actual Vasant Valley building
          // photo, just currently doing double duty as the category cover too.
          image: "/assets/PROJECTS/INSTITUTIONAL.png",
          // Detail page doesn't exist yet — same as-you-go pattern as the
          // rest of the site's not-yet-built routes.
          href: "/projects/institutional/vasant-valley-school",
        },
        {
          label: "Stapati Architects",
          // No Stapati-specific assets exist yet — standing in with a calmer,
          // less crowded shot from another project until real photos are
          // supplied.
          image: "/assets/PROJECTS/BIOGRAPHICAL/VINOD KUMAR KHANNA/WhatsApp Image 2026-07-15 at 6.12.19 PM.jpeg",
          href: "/projects/institutional/stapati-architects",
        },
      ]}
    />
  );
}
