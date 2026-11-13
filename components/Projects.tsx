"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projects, Project, ProjectCategory } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { SectionHeader } from "@/components/SectionHeader";

type FilterTab = "All" | ProjectCategory;

const filterTabs: FilterTab[] = ["All", "Web", "AI-ML", "Systems"];

export function Projects() {
  const [selectedFilter, setSelectedFilter] = useState<FilterTab>("All");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter((project) => {
    if (selectedFilter === "All") return true;
    return project.category === selectedFilter;
  });

  const handlePrevProject = () => {
    if (!activeModalProject) return;
    const currentIndex = filteredProjects.findIndex((p) => p.id === activeModalProject.id);
    const prevIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setActiveModalProject(filteredProjects[prevIndex]);
  };

  const handleNextProject = () => {
    if (!activeModalProject) return;
    const currentIndex = filteredProjects.findIndex((p) => p.id === activeModalProject.id);
    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    setActiveModalProject(filteredProjects[nextIndex]);
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-12">
        {/* Section Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <SectionHeader
            number="03"
            label="Portfolio"
            title="Featured Engineering Projects"
            subtitle="Systems architecture, machine learning recommendation engines, and full-stack web platforms."
          />

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface border border-border-subtle self-start md:self-auto">
            {filterTabs.map((tab) => {
              const isActive = selectedFilter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSelectedFilter(tab)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-accent-blue/20 to-accent-violet/20 border border-accent-blue/40 text-white shadow-sm"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard
                  project={project}
                  onSelect={(p) => setActiveModalProject(p)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-gray-500 font-mono text-sm">
            No projects found in this category.
          </div>
        )}
      </div>

      {/* Detail Modal with Arrow Keys Navigation */}
      <ProjectModal
        project={activeModalProject}
        isOpen={Boolean(activeModalProject)}
        onClose={() => setActiveModalProject(null)}
        onPrev={handlePrevProject}
        onNext={handleNextProject}
      />
    </section>
  );
}
