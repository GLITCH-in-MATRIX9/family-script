import PersonStory from "../../components/people/PersonStory";

export default function SudhaGuptaPage() {
  return (
    <PersonStory
      name="SUDHA GUPTA"
      subtitle="GRIT AND GRACE"
      location=" TUGHLAQ LANE, NEW DELHI"
      backgroundImage="/assets/Sudha Gupta/SUDHA GUPTA.png"
      photos={[
        "/assets/Sudha Gupta/photo1.jpg",
        "/assets/Sudha Gupta/photo2.jpg",
        "/assets/Sudha Gupta/photo3.jpg",
        "/assets/Sudha Gupta/photo4.jpg",
        "/assets/Sudha Gupta/photo5.jpg",
      ]}
      descriptionSide="left"
      description={
        <>
          <p>
            This project celebrated her journey of rebuilding a life of purpose. FS uncovered the emotional depth of her story, looking beyond the grand events to focus on the moments in between.
          </p>

          <br />

          <p>
           It revealed the making of a matriarch and whose strength and values shaped her family and legacy. She was also amongst the first to establish a children’s clothing line in Delhi.

          </p>

          <br />

          <p>
           This project celebrated her resilience and journey of rebuilding a life of purpose. FS uncovered the emotional depth of her story, looking beyond the grand events to focus on the moments in between. 
          </p>
<br/>
          <p>
           It revealed the making of a matriarch, whose strength, grace and enduring values shaped her family and legacy. She was also among the first to establish a children’s clothing line in Delhi.

          </p>
        </>
      }
    />
  );
}