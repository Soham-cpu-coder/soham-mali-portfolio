import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { GitHubActivity } from "@/components/GitHubActivity";
import { JourneyTimeline } from "@/components/JourneyTimeline";
import { CurrentlyExploring } from "@/components/CurrentlyExploring";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { CursorGlow } from "@/components/CursorGlow";
import { ScrollProgress } from "@/components/ScrollProgress";
import { LearningTicker } from "@/components/LearningTicker";
import { Reveal } from "@/components/Reveal";
import { fetchGitHubActivity } from "@/lib/github";

export const revalidate = 3600; // Revalidate page every hour for GitHub activity cache

export default async function Home() {
  const githubData = await fetchGitHubActivity();

  return (
    <main
      id="main-content"
      className="relative min-h-screen bg-background text-gray-100 overflow-x-hidden selection:bg-accent-violet/30 selection:text-white"
    >
      {/* Top neon scroll progress indicator */}
      <ScrollProgress />

      {/* Cyber ambient particle mesh & glows */}
      <BackgroundEffects />

      {/* Interactive Cursor Glow (Desktop Only) */}
      <CursorGlow />

      {/* Sticky Navigation & Command Palette */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Active Focus Learning Ticker */}
      <LearningTicker />

      {/* Staggered Sections Wrapped in Reveal */}
      <div className="relative z-10 space-y-6 sm:space-y-12">
        <Reveal>
          <About />
        </Reveal>

        <Reveal>
          <Skills />
        </Reveal>

        <Reveal>
          <Projects />
        </Reveal>

        <Reveal>
          <GitHubActivity data={githubData} />
        </Reveal>

        <Reveal>
          <JourneyTimeline />
        </Reveal>

        <Reveal>
          <CurrentlyExploring />
        </Reveal>

        <Reveal>
          <Contact />
        </Reveal>
      </div>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />
    </main>
  );
}
