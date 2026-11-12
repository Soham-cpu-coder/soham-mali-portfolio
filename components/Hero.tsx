"use client";

import React, { useState, useEffect } from "react";
import { profile } from "@/data/profile";
import { HeroTerminal } from "./HeroTerminal";
import { ArrowDown, Mail, FileText, Clock, Sparkles } from "lucide-react";

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [istTime, setIstTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  // Rotating roles
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % profile.rotatingRoles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // Hydration-safe live IST clock
  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);
      setIstTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 sm:pt-36 sm:pb-24 flex flex-col justify-center overflow-hidden"
    >
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[650px] h-[400px] bg-gradient-to-b from-blue-600/15 via-violet-600/10 to-transparent blur-3xl rounded-full"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-40 w-[450px] h-[450px] bg-blue-500/10 blur-3xl rounded-full"
        aria-hidden="true"
      />

      {/* Subtle background grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Badges: Status + Live IST */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
          {profile.openToInternships && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Open to Internships</span>
            </div>
          )}

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-slate-400 text-xs font-mono">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>IST (UTC+5:30):</span>
            <span className="text-slate-200 font-semibold min-w-[70px]">
              {mounted ? istTime : "--:--:--"}
            </span>
          </div>
        </div>

        {/* Hero Grid: Left Pitch, Right Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                Hey, I&apos;m{" "}
                <span className="text-white">
                  {profile.name}.
                </span>
              </h1>

              {/* Dynamic Role Line */}
              <div className="h-9 sm:h-11 flex items-center">
                <span className="text-xl sm:text-2xl font-medium text-blue-400 tracking-tight transition-all duration-300">
                  {profile.rotatingRoles[roleIndex]}
                </span>
              </div>
            </div>

            <p className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
              {profile.tagline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-950 font-semibold text-xs sm:text-sm hover:bg-slate-200 active:scale-95 transition-all shadow-md focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <span>View my work</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-white font-medium text-xs sm:text-sm hover:bg-white/10 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span>Contact me</span>
              </a>

              {profile.resume.isAvailable ? (
                <a
                  href={profile.resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 font-medium text-xs sm:text-sm hover:bg-blue-600/20 transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>Resume</span>
                </a>
              ) : (
                <span
                  title="Resume coming soon"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/5 text-slate-500 text-xs sm:text-sm cursor-not-allowed select-none"
                >
                  <FileText className="w-4 h-4" />
                  <span>Resume (Soon)</span>
                </span>
              )}
            </div>

            {/* Recruiter quick info pill */}
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>Seeking Full-Stack &amp; AI/ML Internship Opportunities</span>
            </div>
          </div>

          {/* Right Column: Interactive Terminal */}
          <div className="lg:col-span-6 w-full">
            <HeroTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
