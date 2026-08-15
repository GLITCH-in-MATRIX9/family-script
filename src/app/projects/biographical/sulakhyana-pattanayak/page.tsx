import ProjectDetail from "../../../components/projects/ProjectDetail";

const ASSET_DIR = "/assets/PROJECTS/BIOGRAPHICAL/SULAKHYANA PATTANAYAK";

export default function SulakhyanaPattanayakPage() {
  return (
    <ProjectDetail
      side="right"
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "Biographical", href: "/projects" },
        { label: "Sulakhyana Pattanayak" },
      ]}
      name="SULAKHYANA PATTANAYAK"
      subtitle="A VOICE UNBOUND"
      location="BHUBHANESHWAR, ORISSA"
      leadLine="In the lesser-known stories of individuals often lies the **true essence of wisdom and resilience**. This project documented the remarkable life of a woman whose journey spanned Odisha, Santiniketan, Pune and Mysore, each chapter reflecting grace, cultural richness and quiet strength."
      body={[
        "“Sangeet,” inherited through her maternal lineage, became both an anchor and an expression of her identity, shaping her home and those around her.",
        "Family Script began with intimate conversations and explored a rich collection of personal letters, archival photographs, handwritten notes and newspaper clippings. Interviews with loved ones revealed her curiosity, warmth and calm resolve. Through months of curation, transcription, writing and design, these fragments came together as a layered memoir of legacy, love, courage and enduring presence.",
      ]}
      backdropSrc={`${ASSET_DIR}/Copy of Copy of IMG_4973.JPG`}
      // No book render exists for this project yet — standing in with the
      // generic "Biographical" category cover until a real one is supplied.
      bookCoverSrc="/assets/PROJECTS/BIOGRAPHICAL.png"
      // Only 2 unique photos exist for this project (one had to be converted
      // from HEIC) — cycled to fill 8 slots as placeholders, per explicit
      // instruction.
      gallery={[
        `${ASSET_DIR}/Copy of Copy of IMG_4983-converted.jpg`,
        `${ASSET_DIR}/Copy of Copy of IMG_4973.JPG`,
        `${ASSET_DIR}/Copy of Copy of IMG_4983-converted.jpg`,
        `${ASSET_DIR}/Copy of Copy of IMG_4973.JPG`,
        `${ASSET_DIR}/Copy of Copy of IMG_4983-converted.jpg`,
        `${ASSET_DIR}/Copy of Copy of IMG_4973.JPG`,
        `${ASSET_DIR}/Copy of Copy of IMG_4983-converted.jpg`,
        `${ASSET_DIR}/Copy of Copy of IMG_4973.JPG`,
      ]}
    />
  );
}
