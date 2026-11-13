import { profile } from "@/data/profile";
import { timelineData } from "@/data/education";
import { projects } from "@/data/projects";
import { Code2, Cpu, GraduationCap, Award } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { SpotlightCard } from "@/components/SpotlightCard";

export function About() {
  const education = timelineData.find((item) => item.type === "education");
  const certs = timelineData.filter((item) => item.type === "certification");

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-12">
        {/* Unified Section Header */}
        <SectionHeader
          number="01"
          label="About Me"
          title="Architecting fast, intelligent web systems."
          subtitle="A Computer Engineering student at Pillai University with a strong foundation in systems, machine learning, and modern full-stack web applications."
        />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Bio Card */}
          <SpotlightCard
            spotlightColor="rgba(59, 130, 246, 0.15)"
            className="lg:col-span-7 p-6 sm:p-8 space-y-5 text-left"
          >
            <h3 className="text-xl font-bold text-white tracking-tight">
              Engineering with curiosity and precision
            </h3>

            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              I am a Computer Engineering undergraduate with hands-on experience in C++, Java,
              Python, and modern full-stack technologies. My primary focus centers on scalable software
              architecture, responsive user interfaces, and context-aware machine learning models.
            </p>

            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              Whether building recommendation algorithms with Python and Scikit-learn, developing relational
              data schemas with MySQL, or engineering production-grade frontends in Next.js and TypeScript,
              I treat code structure and user empathy as core priorities.
            </p>

            {/* Quick Feature Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-surface-light/60 border border-border-subtle flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Full-Stack Fluency</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    End-to-end web apps with React, Next.js, and relational database schemas.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-light/60 border border-border-subtle flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-accent-violet/10 text-accent-violet border border-accent-violet/20">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">AI & Systems</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Data pipelines, collaborative filtering engines, and algorithmic problem solving.
                  </p>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Side Cards: Education, Certifications & Real Stats */}
          <div className="lg:col-span-5 space-y-6">
            {/* Education Card */}
            {education && (
              <SpotlightCard
                spotlightColor="rgba(59, 130, 246, 0.2)"
                className="p-6 space-y-4 text-left border-l-4 border-l-accent-blue"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-accent-blue">
                      {education.startYear} &ndash; {education.endYear}
                    </span>
                    <h4 className="text-base font-bold text-white">{education.title}</h4>
                  </div>
                </div>

                <p className="text-sm text-gray-300 font-medium">{education.institution}</p>
                {education.description && (
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {education.description}
                  </p>
                )}
                {education.location && (
                  <p className="text-xs text-gray-500 font-mono">📍 {education.location}</p>
                )}
              </SpotlightCard>
            )}

            {/* Certifications Snapshot Card */}
            {certs.length > 0 && (
              <SpotlightCard
                spotlightColor="rgba(139, 92, 246, 0.15)"
                className="p-5 text-left space-y-3"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-accent-violet uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>Verified Credentials</span>
                </div>
                <div className="space-y-2">
                  {certs.map((c) => (
                    <div key={c.id} className="text-xs">
                      <p className="font-semibold text-white">{c.title}</p>
                      <p className="text-gray-400 text-[11px] font-mono">
                        {c.institution} &bull; {c.startYear}
                      </p>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            )}

            {/* Quick Facts Grid (Derived strictly from real data) */}
            <div className="grid grid-cols-2 gap-4">
              <SpotlightCard className="p-5 text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent font-mono">
                  {projects.length}
                </div>
                <div className="text-xs text-gray-400">Featured Projects</div>
              </SpotlightCard>

              <SpotlightCard className="p-5 text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-indigo-300 to-violet-400 bg-clip-text text-transparent font-mono">
                  {profile.stack.length}+
                </div>
                <div className="text-xs text-gray-400">Core Technologies</div>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
