"use client";

import { motion } from "motion/react";
import { ArrowDown, FileText, Send, Code } from "lucide-react";
import { profile } from "@/data/profile";
import { ProfilePhoto } from "@/components/ProfilePhoto";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";
import { useTypewriter } from "@/lib/useTypewriter";

const typingRoles = [
  "Full Stack Developer",
  "AI & ML Builder",
  "Systems & Backend Enthusiast",
  "React & Next.js Engineer",
] as const;

export function Hero() {
  const currentText = useTypewriter({
    words: typingRoles,
    typingSpeed: 70,
    deletingSpeed: 35,
    pauseDuration: 2200,
  });

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Subtle Aurora Glow Mesh strictly localized behind Hero */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[42rem] h-[24rem] rounded-full bg-gradient-to-r from-blue-600/15 via-violet-600/10 to-cyan-500/10 blur-[120px] -z-10"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Heading, Role, Tagline, CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="lg:col-span-7 space-y-6 text-left"
        >
          {/* Animated Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface border border-border-subtle backdrop-blur-md shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-mono text-gray-300">
              Open to Opportunities &bull; {profile.location}
            </span>
          </div>

          {/* Main Title with futuristic gradient */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
                {profile.name}
              </span>
            </h1>

            {/* Dynamic Typing Subtitle */}
            <div className="flex items-center text-xl sm:text-2xl font-mono text-gray-300 min-h-[2.5rem]">
              <span className="text-accent-blue mr-2 font-bold">&gt;</span>
              <span>{currentText}</span>
              <span className="inline-block w-2.5 h-6 bg-accent-blue ml-1 animate-pulse" />
            </div>
          </div>

          {/* Tagline */}
          <p className="text-base sm:text-lg text-gray-400 max-w-xl leading-relaxed">
            {profile.tagline}{" "}
            <span className="text-gray-300">
              Passionate about high-performance web systems, machine learning architectures, and
              elegant developer experiences.
            </span>
          </p>

          {/* Tech Stack Chips with subtle brand glow */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {profile.stack.map((item) => (
              <span
                key={item}
                className="px-2.5 py-1 text-xs font-mono rounded-lg bg-surface border border-border-subtle text-gray-300 hover:border-accent-blue/40 transition-colors"
              >
                {item}
              </span>
            ))}
          </div>

          {/* CTAs with hover tilt/scale */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-accent-blue to-accent-violet text-white font-medium text-sm hover:opacity-95 transition-all shadow-lg shadow-accent-blue/25 hover:scale-[1.02] active:scale-95"
            >
              <Code className="w-4 h-4" />
              <span>View Projects</span>
            </a>

            <a
              href={profile.resumePath}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface border border-border-subtle text-gray-200 font-medium text-sm hover:bg-white/5 hover:border-accent-blue/40 transition-all hover:scale-[1.02] active:scale-95"
            >
              <FileText className="w-4 h-4 text-accent-blue" />
              <span>Download Resume</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-gray-400 hover:text-white font-medium text-sm hover:bg-white/5 transition-colors active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Contact Me</span>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Photo & Interactive Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="lg:col-span-5 flex flex-col items-center gap-6"
        >
          {/* Profile Photo Display with refined glowing cyber frame */}
          <div className="w-44 h-44 sm:w-52 sm:h-52 relative group">
            <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-accent-blue via-cyan-400 to-accent-violet opacity-30 blur-md group-hover:opacity-50 transition-opacity" />
            <ProfilePhoto
              src={profile.photo}
              name={profile.name}
              className="w-full h-full relative z-10"
              priority
            />
          </div>

          {/* Interactive Shell Card */}
          <div className="w-full max-w-lg">
            <InteractiveTerminal />
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Hint */}
      <div className="hidden lg:flex justify-center pt-8">
        <a
          href="#about"
          className="p-2 text-gray-500 hover:text-white transition-colors animate-bounce"
          aria-label="Scroll to about section"
        >
          <ArrowDown className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
