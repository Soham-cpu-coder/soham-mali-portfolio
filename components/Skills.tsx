import React from "react";
import { profile } from "@/data/profile";
import {
  Code2,
  Layout,
  Server,
  Database,
  BrainCircuit,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Languages: Code2,
  Frontend: Layout,
  Backend: Server,
  Databases: Database,
  "AI / ML": BrainCircuit,
  "Developer Tools": Wrench,
};

// Bento spans for visual variety
const BENTO_SPANS = [
  "col-span-12 md:col-span-6 lg:col-span-4", // Languages
  "col-span-12 md:col-span-6 lg:col-span-4", // Frontend
  "col-span-12 md:col-span-6 lg:col-span-4", // Backend
  "col-span-12 md:col-span-6 lg:col-span-5", // Databases
  "col-span-12 md:col-span-6 lg:col-span-7", // AI / ML
  "col-span-12 lg:col-span-12",             // Developer Tools
];

export function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-28 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
            Technical Skills
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Technologies, libraries, and engineering tools I build with on a daily basis.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-5 sm:gap-6">
          {profile.skills.map((categoryGroup, idx) => {
            const Icon = CATEGORY_ICONS[categoryGroup.category] || Code2;
            const spanClass = BENTO_SPANS[idx] || "col-span-12 md:col-span-6";

            return (
              <div
                key={categoryGroup.category}
                className={`${spanClass} rounded-2xl bg-[#10121A] border border-white/10 p-6 flex flex-col justify-between hover:border-white/20 transition-all`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-semibold text-white">
                      {categoryGroup.category}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-5 leading-normal">
                    {categoryGroup.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {categoryGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#141824] border border-white/5 text-slate-200 hover:border-blue-500/30 hover:text-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
