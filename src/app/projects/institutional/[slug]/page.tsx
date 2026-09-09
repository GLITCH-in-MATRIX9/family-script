import { notFound } from "next/navigation";

import { projects } from "../../../../data/projects";
import ProjectDetails from "../../../components/projects/ProjectDetails";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function InstitutionalProjectPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const project = projects.find(
    (item) =>
      item.slug === slug &&
      item.category === "institutional"
  );

  if (!project) {
    notFound();
  }

  return <ProjectDetails project={project} />;
}