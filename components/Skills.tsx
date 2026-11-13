"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Code, Globe, Server, Database, Brain, Wrench, CheckCircle } from "lucide-react";
import { skillGroups, SkillGroup } from "@/data/skills";
import { SpotlightCard } from "@/components/SpotlightCard";

const categoryIcons: Record<SkillGroup["category"], React.ReactNode> = {
  Languages: <Code className="w-4 h-4 text-accent-blue" />,
  Frontend: <Globe className="w-4 h-4 text-cyan-400" />,
  Backend: <Server className="w-4 h-4 text-emerald-400" />,
  Databases: <Database className="w-4 h-4 text-amber-400" />,
  "AI/ML": <Brain className="w-4 h-4 text-accent-violet" />,
  Tools: <Wrench className="w-4 h-4 text-rose-400" />,
};

const categoryGlows: Record<SkillGroup["category"], string> = {
  Languages: "rgba(59, 130, 246, 0.15)",
  Frontend: "rgba(6, 182, 212, 0.15)",
  Backend: "rgba(16, 185, 129, 0.15)",
  Databases: "rgba(245, 158, 11, 0.15)",
  "AI/ML": "rgba(139, 92, 246, 0.15)",
  Tools: "rgba(244, 63, 94, 0.15)",
};

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...skillGroups.map((g) => g.category)];
  const displayedGroups =
    activeCategory === "All"
      ? skillGroups
      : skillGroups.filter((g) => g.category === activeCategory);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-10">
        {/* Section Header & Interactive Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-accent-blue uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>02 // Arsenal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Technical Skills & Competencies
            </h2>
            <p className="text-sm sm:text-base text-gray-400 max-w-2xl">
              Battle-tested tools, languages, and frameworks calibrated for building scalable web apps and intelligence systems.
            </p>
          </div>

          {/* Quick Category Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-surface border border-border-subtle self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-accent-blue/20 to-accent-violet/20 border border-accent-blue/40 text-white shadow-sm"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Groups Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {displayedGroups.map((group, index) => (
              <motion.div
                key={group.category}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <SpotlightCard
                  spotlightColor={categoryGlows[group.category]}
                  className="p-6 space-y-5 text-left flex flex-col justify-between h-full hover:scale-[1.015]"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2.5 rounded-xl bg-surface-light border border-border-subtle shadow-inner">
                          {categoryIcons[group.category]}
                        </div>
                        <h3 className="text-lg font-bold text-white tracking-tight">{group.category}</h3>
                      </div>
                      <span className="text-xs font-mono text-gray-500">
                        0{index + 1}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 leading-relaxed min-h-[2.5rem]">
                      {group.description}
                    </p>
                  </div>

                  {/* Skill Badges with interactive hover feedback */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-border-subtle">
                    {group.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="group/badge inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-surface-light/80 text-gray-200 border border-border-subtle hover:border-accent-blue/50 hover:text-white hover:bg-accent-blue/10 transition-all duration-200 cursor-default"
                      >
                        <CheckCircle className="w-3 h-3 text-accent-blue/70 group-hover/badge:text-accent-blue transition-colors" />
                        <span>{skill.name}</span>
                        {skill.level && (
                          <span className="text-[10px] font-mono text-gray-500 group-hover/badge:text-gray-400">
                            &bull; {skill.level}
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
