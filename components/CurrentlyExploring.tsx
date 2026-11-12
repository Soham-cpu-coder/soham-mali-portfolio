import React from "react";
import { profile } from "@/data/profile";
import { Compass, Sparkles } from "lucide-react";

export function CurrentlyExploring() {
  return (
    <section className="py-20 sm:py-28 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>CONTINUOUS LEARNING</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
            Currently Exploring
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Engineering domains, emerging paradigms, and modern architectures I am currently experimenting with.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.currentlyExploring.map((topic) => (
            <div
              key={topic.title}
              className="rounded-2xl bg-[#10121A] border border-white/10 p-6 sm:p-7 flex flex-col justify-between hover:border-white/20 transition-all"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <h3 className="text-base font-semibold text-white">
                    {topic.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  {topic.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                {topic.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 text-slate-400 border border-white/5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
