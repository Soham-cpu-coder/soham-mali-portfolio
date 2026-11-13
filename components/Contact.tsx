"use client";

import { useState } from "react";
import { Sparkles, Mail, Copy, Check, Linkedin, MessageCircle, ExternalLink } from "lucide-react";
import { profile } from "@/data/profile";
import { whatsappLink, mailtoLink, externalLinkProps } from "@/lib/contact";
import { ContactForm } from "@/components/ContactForm";
import { SpotlightCard } from "@/components/SpotlightCard";

export function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setCopiedEmail(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-accent-blue uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>07 // Connect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Let&apos;s Build Something Intelligent
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl">
            Whether you have an engineering opening, freelance inquiry, or project proposal, my
            inbox and chat are always open.
          </p>
        </div>

        {/* 3 Large Direct Contact Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Email */}
          <SpotlightCard
            spotlightColor="rgba(59, 130, 246, 0.2)"
            className="p-6 text-left flex flex-col justify-between space-y-4 hover:scale-[1.02]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                  <Mail className="w-5 h-5" />
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-1.5 text-xs font-mono border border-border-subtle active:scale-95"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <h3 className="text-lg font-bold text-white">Direct Email</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Send an asynchronous message or formal inquiry. I typically reply within a few hours.
              </p>
            </div>

            <div className="pt-3 border-t border-border-subtle">
              <a
                href={mailtoLink(profile.email)}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-blue hover:underline break-all"
              >
                <span>{profile.email}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>
          </SpotlightCard>

          {/* Card 2: LinkedIn */}
          <SpotlightCard
            spotlightColor="rgba(37, 99, 235, 0.2)"
            className="p-6 text-left flex flex-col justify-between space-y-4 hover:scale-[1.02]"
          >
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 w-fit">
                <Linkedin className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">LinkedIn Network</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Connect professionally, review experience milestones, and collaborate on software.
              </p>
            </div>

            <div className="pt-3 border-t border-border-subtle">
              <a
                href={profile.socials.linkedin}
                {...externalLinkProps}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 hover:underline"
              >
                <span>linkedin.com/in/soham-mali</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </SpotlightCard>

          {/* Card 3: WhatsApp */}
          <SpotlightCard
            spotlightColor="rgba(16, 185, 129, 0.2)"
            className="p-6 text-left flex flex-col justify-between space-y-4 hover:scale-[1.02]"
          >
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">WhatsApp Chat</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Fastest response for immediate discussions, quick questions, and real-time chat.
              </p>
            </div>

            <div className="pt-3 border-t border-border-subtle">
              <a
                href={whatsappLink()}
                {...externalLinkProps}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:underline"
              >
                <span>Chat ({profile.whatsapp.display})</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </SpotlightCard>
        </div>

        {/* Contact Form Section */}
        <div className="max-w-2xl mx-auto pt-4">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
