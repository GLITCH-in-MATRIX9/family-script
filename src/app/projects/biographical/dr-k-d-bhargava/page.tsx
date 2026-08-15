import ProjectDetail from "../../../components/projects/ProjectDetail";

const ASSET_DIR = "/assets/PROJECTS/BIOGRAPHICAL/DR. K D BHARGAVA";

export default function DrKDBhargavaPage() {
  return (
    <ProjectDetail
      side="left"
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "Biographical", href: "/projects" },
        { label: "Dr. K D Bhargava" },
      ]}
      name="DR. K D BHARGAVA"
      subtitle="TWIN FLAMES"
      location="NEW DELHI & AUSTRALIA"
      leadLine="This tribute book brings together the poetry, memories and heartfelt messages of loved ones to honour a life shaped by **medicine, mentoring, compassion and quiet reflection**. His days were devoted to healing and teaching, while his handwritten poems offered intimate glimpses into his thoughts on life, sorrow, wonder and time."
      body={[
        "Those who knew him remember his gentle demeanor, thoughtful guidance and belief that healing begins with listening.",
        "Through the process of documentation, Family Script brought together the voices of family members, friends, colleagues and well-wishers, creating a collective portrait of a life deeply cherished. His handwritten poems, preserved in crumpled pages and ink-smudged papers, were carefully digitized and curated alongside photographs, memories and personal messages. The resulting volume is a deeply personal tribute, celebrating his enduring presence through poetry, remembrance, love and the voices of those whose lives he touched.",
      ]}
      backdropSrc={`${ASSET_DIR}/Copy of Copy of IMG_8509-converted.jpg`}
      bookCoverSrc={`${ASSET_DIR}/Copy of Copy of IMG_4713.JPG`}
      // Only 2 unique gallery photos exist beyond the backdrop/book — cycled
      // to fill 8 slots as placeholders, per explicit instruction.
      gallery={[
        `${ASSET_DIR}/Copy of Copy of IMG_4717.JPG`,
        `${ASSET_DIR}/Copy of Copy of IMG_8514-converted.jpg`,
        `${ASSET_DIR}/Copy of Copy of IMG_4717.JPG`,
        `${ASSET_DIR}/Copy of Copy of IMG_8514-converted.jpg`,
        `${ASSET_DIR}/Copy of Copy of IMG_4717.JPG`,
        `${ASSET_DIR}/Copy of Copy of IMG_8514-converted.jpg`,
        `${ASSET_DIR}/Copy of Copy of IMG_4717.JPG`,
        `${ASSET_DIR}/Copy of Copy of IMG_8514-converted.jpg`,
      ]}
    />
  );
}
