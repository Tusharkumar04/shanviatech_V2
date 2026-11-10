import Navigation from "./components/navigation/Navigation";
import Hero from "./components/hero/Hero";
import AboutSection from "./components/about/AboutSection";
import ApproachSection from "./components/process/ApproachSection";
import ServicesSection from "./components/services/ServicesSection";
import Cursor from "./components/ui/Cursor";
import ScrollProgressBar from "./components/ui/ScrollProgressBar";
import ScrollObserver from "./components/ui/ScrollObserver";

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-abyss)] text-[var(--color-foam)] transition-colors selection:bg-[var(--color-cyan)] selection:text-black">
      {/* Top Page Scroll Reading Progress Bar with Cyan Luminescence */}
      <ScrollProgressBar />

      {/* Global Scroll Reveal & Motion Observer */}
      <ScrollObserver />

      {/* Custom Fluid Cursor with Staggered Multi-Color Trails */}
      <Cursor />

      {/* Top Floating Pill Navigation */}
      <Navigation />

      {/* Hero Section with Interactive 3D Canvas Morphing Matrix */}
      <Hero />

      {/* About Section in Light Mode with Scroll-Active Typography & Dynamic Graph Blocks */}
      <AboutSection />

      {/* Approach Section: Masters of Agile Development with Motion Rings & Graph Displays */}
      <ApproachSection />

      {/* Services Section: 6 High-Tech Cards with Graph Visuals & Scroll-Activated Text (Zero Top Text) */}
      <ServicesSection />

      {/* Contact Section */}
      <section id="contact" className="py-28 px-6 max-w-[1600px] mx-auto border-t border-white/10 mb-32">
        <div className="text-center max-w-xl mx-auto">
          <span className="font-mono text-xs text-[var(--color-cyan)] uppercase tracking-wider">
            Let's Collaborate
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 mb-4">
            Ready to Build Your Solution?
          </h2>
          <p className="text-[var(--color-mist)] mb-8">
            Tell us about your operational roadmap and engineering requirements.
          </p>
          <a
            href="mailto:contact@shanviatech.com"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-[var(--color-ocean)] to-[var(--color-cyan)] hover:brightness-110 shadow-lg shadow-[var(--color-cyan)]/25"
          >
            Start a Conversation
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
