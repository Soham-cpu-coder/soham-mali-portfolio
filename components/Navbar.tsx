"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { externalLinkProps, mailtoLink } from "@/lib/contact";
import { CommandPalette } from "@/components/CommandPalette";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Activity", href: "#github" },
  { name: "Journey", href: "#journey" },
  { name: "Exploring", href: "#exploring" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            return;
          }
        }
      }

      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Skip to Content Accessible Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-blue focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#08090D]/85 backdrop-blur-md border-b border-border-subtle py-3 shadow-lg shadow-black/30"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo / Monogram */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none"
              aria-label="Soham Mali Home"
            >
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-accent-blue/30 via-accent-violet/20 to-surface border border-accent-blue/40 flex items-center justify-center font-mono font-bold text-accent-blue group-hover:border-accent-violet transition-colors shadow-sm">
                SM
              </div>
              <span className="font-bold tracking-tight text-white group-hover:text-accent-blue transition-colors text-sm sm:text-base">
                {profile.name}
                <span className="text-accent-blue">.</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-surface/60 border border-border-subtle rounded-full px-3 py-1.5 backdrop-blur-md">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                      isActive
                        ? "text-white bg-white/10"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-accent-blue to-accent-violet rounded-full" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right Action & Search */}
            <div className="hidden sm:flex items-center gap-3">
              <CommandPalette />

              <div className="hidden md:flex items-center gap-1 border-l border-border-subtle pl-3">
                <a
                  href={profile.socials.github}
                  {...externalLinkProps}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={profile.socials.linkedin}
                  {...externalLinkProps}
                  className="p-2 text-gray-400 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={mailtoLink(profile.email)}
                  className="p-2 text-gray-400 hover:text-accent-violet hover:bg-white/5 rounded-lg transition-colors"
                  aria-label="Direct Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-xl bg-gradient-to-r from-accent-blue to-accent-violet text-white hover:opacity-95 transition-all shadow-md shadow-accent-blue/20 active:scale-95"
              >
                <span>Hire Me</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Actions: Menu Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <CommandPalette />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-gray-400 hover:text-white bg-surface border border-border-subtle focus:outline-none"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Polished Full-Width Mobile Menu with Safe Areas */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0F1117]/95 border-b border-border-subtle backdrop-blur-xl px-5 pt-4 pb-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3.5 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                    activeSection === item.href.substring(1)
                      ? "bg-accent-blue/15 text-accent-blue border border-accent-blue/30"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2">
                <a
                  href={profile.socials.github}
                  {...externalLinkProps}
                  className="p-2 text-gray-400 hover:text-white rounded-lg bg-white/5"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={profile.socials.linkedin}
                  {...externalLinkProps}
                  className="p-2 text-gray-400 hover:text-white rounded-lg bg-white/5"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={mailtoLink(profile.email)}
                  className="p-2 text-gray-400 hover:text-white rounded-lg bg-white/5"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
              <span className="text-xs text-gray-500 font-mono">{profile.location}</span>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
