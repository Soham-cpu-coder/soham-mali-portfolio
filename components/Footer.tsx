"use client";

import React from "react";
import { profile } from "@/data/profile";
import { ArrowUp, Github, Linkedin, Mail, MessageSquare } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-white/5 bg-[#08090D] text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Branding & Year */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-[10px] font-bold text-white">
            SM
          </div>
          <div>
            <span className="text-slate-300 font-medium">Soham Mali</span> &copy; {currentYear} • All rights reserved.
          </div>
        </div>

        {/* Middle: Social Links */}
        <div className="flex items-center gap-4">
          {profile.github.url && (
            <a
              href={profile.github.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          )}

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="text-slate-400 hover:text-blue-400 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${profile.email}`}
            aria-label="Email Soham Mali"
            className="text-slate-400 hover:text-blue-400 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>

          {profile.whatsapp.enabled && profile.whatsapp.number && (
            <a
              href={`https://wa.me/${profile.whatsapp.number}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Right: Back to top */}
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Scroll back to top"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
