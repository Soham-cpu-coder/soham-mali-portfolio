"use client";

import { useEffect, useState, useRef } from "react";
import {
  Search,
  ArrowRight,
  Sparkles,
  FileText,
  Mail,
  Github,
  Linkedin,
  MessageCircle,
  FolderGit2,
  X,
  Palette,
} from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { mailtoLink, whatsappLink } from "@/lib/contact";

interface CommandItem {
  id: string;
  category: "Navigation" | "Projects" | "Actions" | "Theme";
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Toggle on Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    setIsOpen(false);
  };

  const cycleTheme = () => {
    const root = document.documentElement;
    const current = root.style.getPropertyValue("--accent-primary");
    let next = "#3B82F6"; // blue
    if (current === "#3B82F6") next = "#8B5CF6"; // violet
    else if (current === "#8B5CF6") next = "#06B6D4"; // cyan
    else next = "#3B82F6";

    root.style.setProperty("--accent-primary", next);
    setIsOpen(false);
  };

  const allItems: CommandItem[] = [
    // Navigation
    {
      id: "nav-about",
      category: "Navigation",
      title: "Go to About",
      subtitle: "Background & education summary",
      icon: <ArrowRight className="w-4 h-4 text-accent-blue" />,
      action: () => scrollTo("about"),
    },
    {
      id: "nav-skills",
      category: "Navigation",
      title: "Go to Skills",
      subtitle: "Languages, frameworks & tools",
      icon: <ArrowRight className="w-4 h-4 text-accent-blue" />,
      action: () => scrollTo("skills"),
    },
    {
      id: "nav-projects",
      category: "Navigation",
      title: "Go to Projects",
      subtitle: "Software engineering portfolio",
      icon: <ArrowRight className="w-4 h-4 text-accent-blue" />,
      action: () => scrollTo("projects"),
    },
    {
      id: "nav-github",
      category: "Navigation",
      title: "Go to GitHub Activity",
      subtitle: "Live metrics & repositories",
      icon: <ArrowRight className="w-4 h-4 text-accent-blue" />,
      action: () => scrollTo("github"),
    },
    {
      id: "nav-journey",
      category: "Navigation",
      title: "Go to Journey Timeline",
      subtitle: "Degrees, internships & certs",
      icon: <ArrowRight className="w-4 h-4 text-accent-blue" />,
      action: () => scrollTo("journey"),
    },
    {
      id: "nav-exploring",
      category: "Navigation",
      title: "Go to Currently Exploring",
      subtitle: "AI, RAG & system design tracks",
      icon: <ArrowRight className="w-4 h-4 text-accent-blue" />,
      action: () => scrollTo("exploring"),
    },
    {
      id: "nav-contact",
      category: "Navigation",
      title: "Go to Contact",
      subtitle: "Message form & communication channels",
      icon: <ArrowRight className="w-4 h-4 text-accent-blue" />,
      action: () => scrollTo("contact"),
    },
    // Projects
    ...projects.map((p) => ({
      id: `proj-${p.id}`,
      category: "Projects" as const,
      title: p.title,
      subtitle: `${p.category} • ${p.stack.slice(0, 3).join(", ")}`,
      icon: <FolderGit2 className="w-4 h-4 text-accent-violet" />,
      action: () => scrollTo("projects"),
    })),
    // Actions
    {
      id: "act-resume",
      category: "Actions",
      title: "Download Resume",
      subtitle: "PDF format (public/resume.pdf)",
      icon: <FileText className="w-4 h-4 text-emerald-400" />,
      action: () => {
        setIsOpen(false);
        window.open(profile.resumePath, "_blank");
      },
    },
    {
      id: "act-email",
      category: "Actions",
      title: "Copy Email Address",
      subtitle: profile.email,
      icon: <Mail className="w-4 h-4 text-blue-400" />,
      action: copyEmail,
    },
    {
      id: "act-mailto",
      category: "Actions",
      title: "Send Email (mailto)",
      subtitle: "Open default mail client",
      icon: <Mail className="w-4 h-4 text-blue-400" />,
      action: () => {
        setIsOpen(false);
        window.location.href = mailtoLink(profile.email);
      },
    },
    {
      id: "act-whatsapp",
      category: "Actions",
      title: "Chat on WhatsApp",
      subtitle: profile.whatsapp.display,
      icon: <MessageCircle className="w-4 h-4 text-emerald-400" />,
      action: () => {
        setIsOpen(false);
        window.open(whatsappLink(), "_blank");
      },
    },
    {
      id: "act-github",
      category: "Actions",
      title: "Open GitHub Profile",
      subtitle: `github.com/${profile.githubUsername}`,
      icon: <Github className="w-4 h-4 text-gray-300" />,
      action: () => {
        setIsOpen(false);
        window.open(profile.socials.github, "_blank");
      },
    },
    {
      id: "act-linkedin",
      category: "Actions",
      title: "Open LinkedIn Profile",
      subtitle: profile.socials.linkedin,
      icon: <Linkedin className="w-4 h-4 text-blue-400" />,
      action: () => {
        setIsOpen(false);
        window.open(profile.socials.linkedin, "_blank");
      },
    },
    // Theme
    {
      id: "theme-accent",
      category: "Theme",
      title: "Cycle Accent Color",
      subtitle: "Toggle neon theme (Blue / Violet / Cyan)",
      icon: <Palette className="w-4 h-4 text-accent-violet" />,
      action: cycleTheme,
    },
  ];

  const filtered = allItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase())) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  return (
    <>
      {/* Trigger Pill Button in Top Nav or Screen */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-border-subtle transition-colors focus:outline-none focus:ring-1 focus:ring-accent-blue"
        aria-label="Open Command Palette"
      >
        <Search className="w-3.5 h-3.5 text-accent-blue" />
        <span>Search</span>
        <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-white/10 border border-border-subtle text-gray-300">
          ⌘K
        </kbd>
      </button>

      {/* Backdrop Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette"
        >
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-xl bg-[#0F1117] border border-border-subtle rounded-2xl shadow-2xl overflow-hidden z-10 text-left focus:outline-none animate-in fade-in zoom-in-95 duration-150">
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-border-subtle gap-3 bg-surface-light/40">
              <Search className="w-4 h-4 text-accent-blue shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command, project, or section..."
                className="flex-1 bg-transparent text-sm text-white focus:outline-none placeholder-gray-500 font-sans"
              />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-gray-400 hover:text-white transition-colors"
                aria-label="Close Command Palette"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Filtered Results List */}
            <div
              ref={listRef}
              className="max-h-80 overflow-y-auto p-2 space-y-1 terminal-scroll"
            >
              {filtered.length > 0 ? (
                filtered.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer text-xs transition-colors ${
                        isSelected
                          ? "bg-accent-blue/15 text-white border border-accent-blue/30"
                          : "text-gray-300 hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-surface border border-border-subtle">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          {item.subtitle && (
                            <p className="text-[11px] text-gray-400 font-mono">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-500">
                        {item.category}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="py-8 text-center text-xs text-gray-500 font-mono">
                  No matching commands found for &quot;{query}&quot;.
                </div>
              )}
            </div>

            {/* Footer Keyboard Hints */}
            <div className="px-4 py-2.5 bg-[#090A0F] border-t border-border-subtle flex items-center justify-between text-[11px] font-mono text-gray-500">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-accent-blue" />
                Navigate: <kbd className="px-1 rounded bg-white/5">↑</kbd>
                <kbd className="px-1 rounded bg-white/5">↓</kbd> Select:
                <kbd className="px-1 rounded bg-white/5">↵</kbd>
              </span>
              <span>Esc to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
