import ProjectDetail from "../../../components/projects/ProjectDetail";

const ASSET_DIR = "/assets/PROJECTS/BIOGRAPHICAL/VINOD KUMAR KHANNA";

export default function VinodKumarKhannaPage() {
  return (
    <ProjectDetail
      side="right"
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "Biographical", href: "/projects" },
        { label: "Vinod Kumar Khanna" },
      ]}
      name="VINOD KUMAR KHANNA"
      subtitle="PORTRAIT OF A LEGACY"
      location="DEFENCE COLONY, NEW DELHI"
      leadLine="**Mr. Vinod Kumar Khanna's** life is a remarkable journey spanning decades, diverse domains, and geographies. His work has left a lasting imprint across regions, reflecting a life anchored in **ambition, perseverance and humility**."
      body={[
        "This biographical documentation project seeks to thoughtfully trace Mr. Khanna's story, from his early life in undivided India and memories of Partition to the personal and professional achievements that shaped his worldview. Through intimate conversations, personal recollections and careful documentation, Family Script captures the experiences, influences, relationships and defining moments that shaped his journey. The story explores the decisions he stood by, the values he upheld and the convictions that guided him through challenges and triumphs. Together, these fragments will create a meaningful portrait of a life lived with purpose, resilience and enduring impact.",
      ]}
      backdropSrc={`${ASSET_DIR}/d11b3fe2-f495-4c15-83b2-eb8b2867a7a3.jpg`}
      // No book render exists for this project yet — standing in with the
      // generic "Biographical" category cover until a real one is supplied.
      bookCoverSrc="/assets/PROJECTS/BIOGRAPHICAL.png"
      // Only 5 unique photos exist for this project — 3 repeat to reach 8,
      // as placeholders, per explicit instruction.
      gallery={[
        `${ASSET_DIR}/WhatsApp Image 2026-07-15 at 6.12.19 PM.jpeg`,
        `${ASSET_DIR}/WhatsApp Image 2026-08-12 at 2.39.18 PM.jpeg`,
        `${ASSET_DIR}/WhatsApp Image 2026-08-12 at 2.39.19 PM.jpeg`,
        `${ASSET_DIR}/WhatsApp Image 2026-08-12 at 2.39.21 PM.jpeg`,
        `${ASSET_DIR}/jpg.jpg`,
        `${ASSET_DIR}/WhatsApp Image 2026-07-15 at 6.12.19 PM.jpeg`,
        `${ASSET_DIR}/WhatsApp Image 2026-08-12 at 2.39.18 PM.jpeg`,
        `${ASSET_DIR}/WhatsApp Image 2026-08-12 at 2.39.19 PM.jpeg`,
      ]}
    />
  );
}
