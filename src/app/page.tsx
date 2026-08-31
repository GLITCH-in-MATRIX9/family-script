// app/page.tsx

import Hero from "./components/homepage/Hero";
import WhoAreWe from "./components/homepage/WhoAreWe";
import WhatWeDo from "./components/homepage/WhatWeDo";
import WhatWeOffer from "./components/homepage/WhatWeOffer";
import OurJourney from "./components/homepage/OurJourney";
import Testimonials from "./components/homepage/testimonials/Testimonials";
import ContactSection from "./components/homepage/ContactSection";

import SocialIcons from "./components/layout/SocialIcos";

import HomepageNavigator from "./components/homepage/HomepageNavigator";
import { RippleProvider } from "./components/homepage/ripple/RippleProvider";

export default function Home() {
  return (
    <RippleProvider>
      <HomepageNavigator>
        <main className="relative w-full">

          {/* ==================================================
              SOCIAL MEDIA
          ================================================== */}

          <SocialIcons />

          {/* ==================================================
              0 — HERO
          ================================================== */}

          <section
            data-home-section="0"
            className="
              relative
              h-screen
              min-h-screen
              w-full
              overflow-hidden
            "
          >
            <Hero />
          </section>

          {/* ==================================================
              1 — WHO ARE WE
          ================================================== */}

          <section
            data-home-section="1"
            data-ripple-background="/assets/Homepage/WHO_WE_ARE.jpg"
            className="
              relative
              h-screen
              min-h-screen
              w-full
              overflow-hidden
            "
          >
            <WhoAreWe />
          </section>

          {/* ==================================================
              2 — WHAT WE DO
          ================================================== */}

          <section
            data-home-section="2"
            data-ripple-background="/assets/Homepage/WHAT_WE_DO.jpg"
            className="
              relative
              h-screen
              min-h-screen
              w-full
              overflow-hidden
            "
          >
            <WhatWeDo />
          </section>

          {/* ==================================================
              3 — WHAT WE OFFER
          ================================================== */}

          <section
            data-home-section="3"
            data-ripple-background="/assets/Homepage/WHAT_WE_OFFER.jpg"
            className="
              relative
              h-screen
              min-h-screen
              w-full
              overflow-hidden
            "
          >
            <WhatWeOffer />
          </section>

          {/* ==================================================
              4 — OUR JOURNEY
          ================================================== */}

          <section
            data-home-section="4"
            data-ripple-color="#000000"
            className="
              relative
              h-screen
              min-h-screen
              w-full
              overflow-hidden
            "
          >
            <OurJourney />
          </section>

          {/* ==================================================
              5 — TESTIMONIALS
          ================================================== */}

          <section
            data-home-section="5"
            data-ripple-background="/assets/testimonials/testimonials-bg.png"
            className="
              relative
              h-screen
              min-h-screen
              w-full
              overflow-hidden
            "
          >
            <Testimonials />
          </section>

          {/* ==================================================
              6 — CONTACT + FOOTER

              IMPORTANT:

              ContactSection ITSELF is the final
              ripple section.

              Do NOT wrap it in another
              data-home-section element.

              ContactSection contains:

                Contact viewport
                       +
                Footer
          ================================================== */}

          <ContactSection />

        </main>
      </HomepageNavigator>
    </RippleProvider>
  );
}