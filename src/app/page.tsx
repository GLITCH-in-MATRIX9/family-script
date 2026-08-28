import LoadingScreen from "./components/layout/LoadingScreen";

import Hero from "./components/homepage/hero";
import OurJourney from "./components/homepage/OurJourney";
import WhoAreWe from "./components/homepage/WhoAreWe";
import WhatWeDo from "./components/homepage/WhatWeDo";
import WhatWeOffer from "./components/homepage/WhatWeOffer";
import ContactSection from "./components/homepage/ContactSection";

import SocialIcons from "./components/layout/SocialIcos";
import HomepageNavigator from "./components/homepage/HomepageNavigator";
import { RippleProvider } from "./components/homepage/RippleEngine";

export default function Home() {
  return (
    <RippleProvider>
      <HomepageNavigator>
        <main className="relative">
          {/* ================= LOADING SCREEN ================= */}
          <LoadingScreen />

          {/* ================= SOCIAL MEDIA ICONS ================= */}
          <SocialIcons />

          {/* ================= HERO ================= */}
          <div data-home-section="0">
            <Hero />
          </div>

          {/* ================= WHO ARE WE ================= */}
          <div data-home-section="1">
            <WhoAreWe />
          </div>

          {/* ================= WHAT WE DO ================= */}
          <div data-home-section="2">
            <WhatWeDo />
          </div>

          {/* ================= WHAT WE OFFER ================= */}
          <div data-home-section="3">
            <WhatWeOffer />
          </div>

          {/* ================= OUR JOURNEY ================= */}
          <div data-home-section="4">
            <OurJourney />
          </div>

          {/* ================= CONTACT ================= */}
          <div data-home-section="5">
            <ContactSection />
          </div>
        </main>
      </HomepageNavigator>
    </RippleProvider>
  );
}
