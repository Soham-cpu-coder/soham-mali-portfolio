import React from "react";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { GitHubActivity } from "@/components/GitHubActivity";
import { Journey } from "@/components/Journey";
import { CurrentlyExploring } from "@/components/CurrentlyExploring";
import { Contact } from "@/components/Contact";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <GitHubActivity />
      <Journey />
      <CurrentlyExploring />
      <Contact />
    </main>
  );
}
