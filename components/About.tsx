import React from "react";
import { profile } from "@/data/profile";
import { User, Compass, Target, MapPin } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
            About Me
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            A quick overview of my academic foundation, current engineering pursuits, and career targets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Avatar / Monogram Card */}
          <div className="lg:col-span-4 rounded-2xl bg-[#10121A] border border-white/10 p-6 flex flex-col items-center text-center">
            <div className="relative w-36 h-36 rounded-2xl bg-gradient-to-br from-blue-600/20 via-violet-600/10 to-[#10121A] border border-white/15 flex items-center justify-center mb-5 shadow-inner group">
              {profile.avatar.imagePath ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.avatar.imagePath}
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold tracking-widest text-white/90">
                    {profile.avatar.placeholderText}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono mt-1">Photo Placeholder</span>
                </div>
              )}
            </div>

            <h3 className="text-lg font-semibold text-white">{profile.name}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{profile.role}</p>

            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-3 px-3 py-1 rounded-full bg-white/5 border border-white/5">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>{profile.location}</span>
            </div>
          </div>

          {/* Detailed Editorial Blocks */}
          <div className="lg:col-span-8 space-y-6">
            {/* Bio */}
            <div className="rounded-2xl bg-[#10121A] border border-white/10 p-6 sm:p-7">
              <div className="flex items-center gap-2.5 mb-3 text-blue-400">
                <User className="w-4 h-4" />
                <h3 className="text-sm font-semibold tracking-wide text-white">Background</h3>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-[70ch]">
                {profile.about.shortBio}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Focus */}
              <div className="rounded-2xl bg-[#10121A] border border-white/10 p-6">
                <div className="flex items-center gap-2.5 mb-3 text-violet-400">
                  <Compass className="w-4 h-4" />
                  <h3 className="text-sm font-semibold tracking-wide text-white">Current Focus</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed max-w-[65ch]">
                  {profile.about.currentFocus}
                </p>
              </div>

              {/* Goals */}
              <div className="rounded-2xl bg-[#10121A] border border-white/10 p-6">
                <div className="flex items-center gap-2.5 mb-3 text-emerald-400">
                  <Target className="w-4 h-4" />
                  <h3 className="text-sm font-semibold tracking-wide text-white">Internship Goals</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed max-w-[65ch]">
                  {profile.about.goals}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
