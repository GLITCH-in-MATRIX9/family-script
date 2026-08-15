import PersonStory from "../../components/people/PersonStory";

export default function RenuMehraPage() {
  return (
    <PersonStory
      name="RENU MEHRA"
      subtitle="MY SCRIBBLES"
      location="GOLF LINKS, NEW DELHI"
      backgroundImage="/assets/Renu Mehra/RENU MEHRA.png"
      photos={[
        "/assets/Renu Mehra/photo1.jpg",
        "/assets/Renu Mehra/photo2.jpg",
        "/assets/Renu Mehra/photo3.jpg",
        "/assets/Renu Mehra/photo4.jpg",
        "/assets/Renu Mehra/photo5.jpg",
      ]}
      descriptionSide="right"
      description={
        <>
          <p>
            It began with a chance encounter at the DCWA&apos;s Diplomatic
            Bazaar, where the team met Mrs. Renu Mehra, who describes the
            meeting as guided by the hand of God. What followed was a
            year-long journey through memory, unfolding through journals,
            photographs, poetry and clippings spanning generations.
          </p>

          <br />

          <p>
            Family Script carefully digitized journals, restored photographs
            and recorded conversations, bringing together stories of
            Partition, displacement, resilience and renewal. The book evolved
            into a living document of a family&apos;s journey through loss,
            laughter and legacy. Mrs. Mehra&apos;s handwritten scribbles, raw,
            emotional and spontaneous, were preserved as part of the visual
            narrative. My Scribbles celebrates a life lived with depth,
            humour, wisdom and resilience, inviting readers to pause, remember
            and listen.
          </p>
        </>
      }
    />
  );
}