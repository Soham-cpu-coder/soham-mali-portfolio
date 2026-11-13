"use client";

import { GraduationCap, Briefcase, Award } from "lucide-react";
import { timelineData, TimelineItemType } from "@/data/education";
import { SectionHeader } from "@/components/SectionHeader";
import { SpotlightCard } from "@/components/SpotlightCard";

const typeIcons: Record<TimelineItemType, React.ReactNode> = {
  education: <GraduationCap className="w-4 h-4 text-accent-blue" />,
  experience: <Briefcase className="w-4 h-4 text-emerald-400" />,
  certification: <Award className="w-4 h-4 text-accent-violet" />,
};

const typeColors: Record<TimelineItemType, string> = {
  education: "text-accent-blue bg-accent-blue/10 border-accent-blue/30",
  experience: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
  certification: "text-accent-violet bg-accent-violet/10 border-accent-violet/30",
};

export function JourneyTimeline() {
  return (
    <section id="journey" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-12">
        {/* Unified Section Header */}
        <SectionHeader
          number="05"
          label="Timeline"
          title="Academic & Professional Journey"
          subtitle="A factual timeline of engineering education, programs, and internships extracted from my resume."
        />

        {/* Timeline Container with glowing vertical spine */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-border-subtle space-y-10 text-left">
          {timelineData.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline Node Point */}
              <div className="absolute -left-[33px] sm:-left-[41px] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-surface border border-accent-blue/50 text-accent-blue shadow-lg shadow-accent-blue/20 group-hover:scale-110 group-hover:border-accent-violet transition-all">
                {typeIcons[item.type]}
              </div>

              {/* Timeline Card with Spotlight */}
              <SpotlightCard
                spotlightColor="rgba(59, 130, 246, 0.15)"
                className="p-6 sm:p-7 space-y-4 max-w-3xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="space-y-1">
                    <span
                      className={`text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${typeColors[item.type]}`}
                    >
                      {item.type}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white pt-1">{item.title}</h3>
                    <p className="text-sm font-medium text-gray-300">{item.institution}</p>
                  </div>

                  <div className="text-right">
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-border-subtle text-gray-300">
                      {item.startYear} {item.endYear !== item.startYear && `– ${item.endYear}`}
                    </span>
                    {item.location && (
                      <p className="text-xs text-gray-500 font-mono mt-1">📍 {item.location}</p>
                    )}
                  </div>
                </div>

                {item.description && (
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                )}

                {item.skills && item.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border-subtle">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-surface-light border border-border-subtle text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
