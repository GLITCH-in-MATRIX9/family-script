import ProjectDetail from "../../../components/projects/ProjectDetail";

const ASSET_DIR = "/assets/PROJECTS/BIOGRAPHICAL/BELA DEVI";

export default function BelaDeviPage() {
  return (
    <ProjectDetail
      side="left"
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "Biographical", href: "/projects" },
        { label: "Bela Devi" },
      ]}
      name="BELA DEVI"
      subtitle="A Legacy of Love, Learning, and Quiet Strength"
      leadLine="**Some lives unfold like verses**, serene, steady, and full of depth. This project began as a tribute to a woman whose strength shaped generations of her family."
      body={[
        "Born in the early 1900s, she lived through immense change while holding firmly to values of care, education, dignity, and equal opportunity. Her legacy of empowerment and resilience lived on through the memories of her children and grandchildren, across homes in Ghaziabad, Shahdara, and Hauz Qazi.",
        "Over twelve months, Family Script conducted in-depth oral interviews, documented archival photographs, gathered letters, and captured memories of everyday life. Through research, documentation, and thoughtful design, her story emerged as a memoir of devotion, motherhood, learning, and grace. This book is a quiet homage to a woman who transformed obstacles into lessons and lessons into love.",
      ]}
      backdropSrc={`${ASSET_DIR}/Copy of IMG-20240401-WA0108.jpg`}
      // No book render exists for this project yet — standing in with the
      // generic "Biographical" category cover until a real one is supplied.
      bookCoverSrc="/assets/PROJECTS/BIOGRAPHICAL.png"
      // Only 3 unique photos exist for this project — cycled to fill 8 slots
      // as placeholders, per explicit instruction.
      gallery={[
        `${ASSET_DIR}/Copy of IMG-20240401-WA0111.jpg`,
        `${ASSET_DIR}/Copy of PXL_20240412_104035311.jpg`,
        `${ASSET_DIR}/Copy of IMG-20240401-WA0108.jpg`,
        `${ASSET_DIR}/Copy of IMG-20240401-WA0111.jpg`,
        `${ASSET_DIR}/Copy of PXL_20240412_104035311.jpg`,
        `${ASSET_DIR}/Copy of IMG-20240401-WA0108.jpg`,
        `${ASSET_DIR}/Copy of IMG-20240401-WA0111.jpg`,
        `${ASSET_DIR}/Copy of PXL_20240412_104035311.jpg`,
      ]}
    />
  );
}
