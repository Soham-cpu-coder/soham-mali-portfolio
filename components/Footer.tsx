"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { mailtoLink, externalLinkProps } from "@/lib/contact";

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border-subtle bg-[#050608] py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-gray-500">
        {/* Left Branding */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-semibold text-gray-300 font-mono">
            {profile.name} &bull; {profile.role}
          </span>
          <span className="hidden sm:inline text-gray-700">|</span>
          <span>&copy; {currentYear} All rights reserved.</span>
        </div>

        {/* Center Socials */}
        <div className="flex items-center gap-3">
          <a
            href={profile.socials.github}
            {...externalLinkProps}
            className="p-2 rounded-lg bg-surface border border-border-subtle text-gray-400 hover:text-white hover:border-accent-blue/40 transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={profile.socials.linkedin}
            {...externalLinkProps}
            className="p-2 rounded-lg bg-surface border border-border-subtle text-gray-400 hover:text-blue-400 hover:border-blue-400/40 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={mailtoLink(profile.email)}
            className="p-2 rounded-lg bg-surface border border-border-subtle text-gray-400 hover:text-accent-violet hover:border-accent-violet/40 transition-colors"
            aria-label="Email Me"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right Back to Top */}
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border-subtle text-gray-400 hover:text-white hover:border-accent-blue/40 transition-colors"
          aria-label="Back to top of page"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
