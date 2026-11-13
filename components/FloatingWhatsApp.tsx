"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { profile } from "@/data/profile";
import { whatsappLink, externalLinkProps } from "@/lib/contact";

export function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip */}
      <div
        className={`px-3 py-1.5 rounded-lg bg-[#0F1117] border border-border-subtle text-xs font-mono text-gray-200 shadow-xl transition-all duration-200 pointer-events-none hidden sm:block ${
          showTooltip ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
        }`}
        aria-hidden="true"
      >
        Chat on WhatsApp
      </div>

      {/* Button with soft pulsing glow */}
      <a
        href={whatsappLink()}
        {...externalLinkProps}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className="relative group p-3.5 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-background"
        aria-label={`Chat on WhatsApp with ${profile.name}`}
      >
        {/* Soft pulse animation ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-40 blur-sm group-hover:opacity-75 transition-opacity animate-pulse-slow" />
        <MessageCircle className="relative w-6 h-6 fill-white text-emerald-500" />
      </a>
    </div>
  );
}
