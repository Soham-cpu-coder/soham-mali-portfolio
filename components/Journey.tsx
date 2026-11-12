import React from "react";
import { journeyData, JourneyEntry } from "@/data/education";
import { GraduationCap, Briefcase, Award, Users, Calendar, MapPin } from "lucide-react";

const TYPE_ICONS: Record<JourneyEntry["type"], React.ElementType> = {
  education: GraduationCap,
  internship: Briefcase,
  certification: Award,
  workshop: Users,
};

const TYPE_LABELS: Record<JourneyEntry["type"], string> = {
  education: "Education",
  internship: "Work Experience",
  certification: "Certification",
  workshop: "Workshop / Training",
};

export function Journey() {
  return (
    <section id="journey" className="py-20 sm:py-28 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
            Academic &amp; Professional Journey
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Educational milestones, technical training, and engineering experience.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-white/10 ml-3 sm:ml-6 pl-6 sm:pl-8 space-y-10">
          {journeyData.map((item) => {
            const Icon = TYPE_ICONS[item.type] || GraduationCap;

            return (
              <div key={item.id} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-[#10121A] border border-blue-500/40 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:border-blue-400 transition-transform">
                  <Icon className="w-3 h-3" />
                </div>

                {/* Timeline Content Card */}
                <div className="rounded-2xl bg-[#10121A] border border-white/10 p-6 sm:p-7 hover:border-white/20 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {TYPE_LABELS[item.type]}
                    </span>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">
                    {item.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-4">
                    <span className="font-medium text-slate-300">{item.institution}</span>
                    {item.location && (
                      <span className="flex items-center gap-1 text-slate-500">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {item.highlights && item.highlights.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-white/5">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
