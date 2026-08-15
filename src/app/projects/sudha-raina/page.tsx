import PersonStory from "../../components/people/PersonStory";

export default function SudhaRainaPage() {
  return (
    <PersonStory
      name="SUDHA RAINA"
      subtitle="A FAMILY THAT DREAMED OF RAJASTHAN"
      location="JAIPUR, RAJASTHAN"
      backgroundImage="/assets/Sudha Raina/SUDHA RAINA.png"
      photos={[
        "/assets/Sudha Raina/photo1.jpg",
        "/assets/Sudha Raina/photo2.jpg",
        "/assets/Sudha Raina/photo3.jpg",
        "/assets/Sudha Raina/photo4.jpg",
        "/assets/Sudha Raina/photo5.jpg",
        "/assets/Sudha Raina/photo6.jpg",
      ]}
      descriptionSide="right"
      description={
        <>
          <p>
            A family&apos;s story unfolded as a trilogy, where lived values
            become a lens into social and political history.
          </p>

          <br />

          <p>
            Sudha Raina&apos;s story is a living testament to values practiced,
            transmitted and sustained across generations.
          </p>

          <br />

          <p>
            FS traced the legacies of old Kashmiri Pandits who had migrated to
            Rajasthan, contributed significantly to the Bhoodan Andolan and
            shaped modern Jaipur. FS identified key players and crafted a
            trilogy of family histories, heirlooms and culinary traditions.
          </p>
        </>
      }
    />
  );
}