import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { awards, getAwardBySlug } from "../../../data/awards";
import AwardDetails from "../../components/awards/AwardDetails";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return awards.map((award) => ({ slug: award.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const award = getAwardBySlug(slug);

  if (!award) {
    return { title: "Award Not Found | Family Script" };
  }

  return {
    title: `${award.title} | Family Script`,
    description: award.description[0],
  };
}

export default async function AwardPage({ params }: PageProps) {
  const { slug } = await params;
  const award = getAwardBySlug(slug);

  if (!award) {
    notFound();
  }

  return <AwardDetails award={award} />;
}
