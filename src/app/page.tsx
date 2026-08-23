import LoadingScreen from "./components/layout/LoadingScreen";

import Hero from "./components/homepage/Hero";
import OurJourney from "./components/homepage/OurJourney";
import WhoAreWe from "./components/homepage/WhoAreWe";
import WhatWeDo from "./components/homepage/WhatWeDo";
import WhatWeOffer from "./components/homepage/WhatWeOffer";
import ContactSection from "./components/homepage/ContactSection";

import SocialIcons from "./components/layout/SocialIcos";

export default function Home() {
  return (
    <main className="relative">

      {/* ================= LOADING SCREEN ================= */}
      <LoadingScreen />


      {/* ================= SOCIAL MEDIA ICONS ================= */}
      <SocialIcons />

      {/* ================= HOMEPAGE ================= */}
      <Hero />

      {/* ================= WHO ARE WE ================= */}
      <WhoAreWe />

      {/* ================= WHAT WE DO ================= */}
      <WhatWeDo />

      {/* ================= WHAT WE OFFER ================= */}
      <WhatWeOffer />

      {/* ================= OUR JOURNEY ================= */}
      <OurJourney />

      {/* ================= CONTACT ================= */}
      <ContactSection />

      

    </main>
  );
}