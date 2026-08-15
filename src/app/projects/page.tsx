import PageShell from "../components/projects/PageShell";

export default function ProjectsPreviewPage() {
  return (
    <PageShell
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "Biographical", href: "/projects" },
        { label: "Akhil Bakshi" },
      ]}
    >
      <div className="flex min-h-[50vh] items-center justify-center text-white/40">
        Placeholder — project content goes here
      </div>
    </PageShell>
  );
}
