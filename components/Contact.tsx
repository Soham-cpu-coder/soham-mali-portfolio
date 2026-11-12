import React from "react";
import { profile } from "@/data/profile";
import { ContactForm } from "./ContactForm";
import { Mail, Linkedin, MessageSquare, ArrowUpRight } from "lucide-react";

export function Contact() {
  const whatsappUrl = `https://wa.me/${profile.whatsapp.number}?text=${encodeURIComponent(
    profile.whatsapp.prefilledMessage
  )}`;

  return (
    <section id="contact" className="py-20 sm:py-28 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
            Get in Touch
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            I am currently open to Full-Stack &amp; AI/ML internship inquiries. Reach out directly or dispatch a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Quick Reach Cards (Left Column) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <a
              href={`mailto:${profile.email}`}
              className="block rounded-2xl bg-[#10121A] border border-white/10 p-5 hover:border-blue-500/40 hover:bg-[#121626] transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                      Direct Email
                    </h3>
                    <p className="text-xs font-mono text-slate-300 mt-0.5">{profile.email}</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </div>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                Preferred channel for interview scheduling and official inquiries.
              </p>
            </a>

            {/* LinkedIn Card */}
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl bg-[#10121A] border border-white/10 p-5 hover:border-blue-500/40 hover:bg-[#121626] transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                      LinkedIn
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">Soham Mali</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </div>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                Connect professionally, review background, and send direct messages.
              </p>
            </a>

            {/* WhatsApp Card - Conditionally Rendered */}
            {profile.whatsapp.enabled && profile.whatsapp.number && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl bg-[#10121A] border border-white/10 p-5 hover:border-emerald-500/40 hover:bg-[#101E1A] transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        WhatsApp (Instant)
                      </h3>
                      <p className="text-xs font-mono text-slate-300 mt-0.5">
                        +{profile.whatsapp.number}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </div>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  Fastest response for urgent recruiter conversations. Pre-filled with an introductory message.
                </p>
              </a>
            )}
          </div>

          {/* Form (Right Column) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
