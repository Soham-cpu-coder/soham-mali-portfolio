"use client";

import React from "react";
import { profile } from "@/data/profile";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  if (!profile.whatsapp.enabled || !profile.whatsapp.number) {
    return null;
  }

  const whatsappUrl = `https://wa.me/${profile.whatsapp.number}?text=${encodeURIComponent(
    profile.whatsapp.prefilledMessage
  )}`;

  return (
    <aside
      aria-label="Instant WhatsApp Contact"
      className="fixed bottom-6 right-6 z-40 pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)]"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Soham Mali on WhatsApp"
        className="group relative flex items-center gap-2.5 px-3.5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_10px_25px_rgba(16,185,129,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-emerald-400"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-semibold group-hover:max-w-xs transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
}
