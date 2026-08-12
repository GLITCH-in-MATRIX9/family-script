import Hero from "./components/homepage/hero";
import WhoAreWe from "./components/homepage/WhoAreWe";
import Navbar from "./components/layout/Navbar";
import SocialIcons from "./components/layout/SocialIcos";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <main className="relative">

      {/* ================= FIXED NAVBAR ================= */}
      <Navbar />

      {/* ================= SOCIAL MEDIA ICONS ================= */}
      <SocialIcons />

      {/* ================= HOMEPAGE ================= */}
      <Hero />

      {/* ================= WHO ARE WE ================= */}
      <WhoAreWe />

      {/* ================= FOOTER ================= */}
      <Footer />

    </main>
  );
}