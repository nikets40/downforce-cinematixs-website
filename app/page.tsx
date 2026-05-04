import Cursor from "./components/Cursor";
import IntroLoader from "./components/IntroLoader";
import GrainOverlay from "./components/GrainOverlay";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Philosophy from "./components/Philosophy";
import WorkShowcase from "./components/WorkShowcase";
import Process from "./components/Process";
import Packages from "./components/Packages";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      {/* Global overlays */}
      <GrainOverlay />
      <Cursor />
      <IntroLoader />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <Services />
        <Philosophy />
        <WorkShowcase />
        <Process />
        <Packages />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
