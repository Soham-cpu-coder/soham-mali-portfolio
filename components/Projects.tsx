"use client";

import React, { useState, useMemo } from "react";
import { projectsData, Project, ProjectCategory } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { FolderGit2 } from "lucide-react";

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Automatically derive categories from data
  const categories = useMemo(() => {
    const set = new Set<string>();
    projectsData.forEach((p) => set.add(p.category));
    return ["all", ...Array.from(set)] as ProjectCategory[];
  }, []);

  // Filter projects and keep featured projects first
  const filteredProjects = useMemo(() => {
    return projectsData
      .filter((p) => {
        if (activeCategory === "all") return true;
        return p.category === activeCategory;
      })
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [activeCategory]);

  return (
    <section id="projects" className="py-20 sm:py-28 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              Featured Projects
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Software engineering systems, machine learning experiments, and full-stack web builds.
            </p>
          </div>

          {/* Dynamic Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-[#10121A] border border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  {cat === "all" ? "All Works" : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                onSelect={(p) => setSelectedProject(p)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-[#10121A] border border-white/10 p-12 text-center">
            <FolderGit2 className="w-8 h-8 text-slate-500 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white">No projects found in this category</h3>
            <p className="text-xs text-slate-400 mt-1">Switch to &apos;All Works&apos; to view all repositories.</p>
          </div>
        )}

        {/* Interactive Modal Preview */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
