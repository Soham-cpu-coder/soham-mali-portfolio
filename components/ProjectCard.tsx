"use client";

import Image from "next/image";
import { ExternalLink, Github, Layers, Brain, Server, Globe } from "lucide-react";
import { Project, ProjectCategory } from "@/data/projects";
import { externalLinkProps } from "@/lib/contact";
import { SpotlightCard } from "@/components/SpotlightCard";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

const categoryIcons: Record<ProjectCategory, React.ReactNode> = {
  Web: <Globe className="w-4 h-4 text-cyan-400" />,
  "AI-ML": <Brain className="w-4 h-4 text-accent-violet" />,
  Systems: <Server className="w-4 h-4 text-emerald-400" />,
};

const categorySpotlights: Record<ProjectCategory, string> = {
  Web: "rgba(6, 182, 212, 0.16)",
  "AI-ML": "rgba(139, 92, 246, 0.16)",
  Systems: "rgba(59, 130, 246, 0.16)",
};

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const hasLinks = Boolean(project.githubUrl || project.liveUrl || project.demoVideoUrl);

  return (
    <SpotlightCard
      onClick={() => onSelect(project)}
      spotlightColor={categorySpotlights[project.category] || "rgba(59, 130, 246, 0.16)"}
      className="group flex flex-col justify-between text-left cursor-pointer transition-all duration-300 hover:scale-[1.015] hover:shadow-2xl hover:shadow-accent-blue/10"
    >
      {/* Top Media: Image or Gradient Placeholder */}
      <div className="relative h-48 w-full overflow-hidden bg-surface-light border-b border-border-subtle">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-surface-light via-[#141824] to-surface flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            {/* Background geometric accents */}
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-accent-blue/10 blur-2xl group-hover:bg-accent-blue/20 transition-all" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-accent-violet/10 blur-2xl group-hover:bg-accent-violet/20 transition-all" />

            <div className="p-3 rounded-2xl bg-white/5 border border-border-subtle mb-3 group-hover:scale-110 group-hover:border-accent-blue/40 transition-all">
              {categoryIcons[project.category] || <Layers className="w-6 h-6 text-accent-blue" />}
            </div>
            <span className="text-lg font-bold text-white tracking-tight line-clamp-1">
              {project.title}
            </span>
            <span className="text-xs font-mono text-gray-500 mt-1">
              {project.category} Architecture
            </span>
          </div>
        )}

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#08090D]/80 backdrop-blur-md border border-border-subtle text-[11px] font-mono text-gray-300">
          {categoryIcons[project.category]}
          <span>{project.category}</span>
        </div>

        {project.featured && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-accent-violet/20 backdrop-blur-md border border-accent-violet/40 text-[10px] font-mono text-accent-violet font-semibold">
            Featured
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white group-hover:text-accent-blue transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[11px] font-mono rounded bg-white/5 border border-border-subtle text-gray-300 group-hover:border-white/20 transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-white/5 text-gray-500">
              +{project.stack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer / Action Links */}
      <div className="px-6 py-3.5 border-t border-border-subtle bg-surface/50 flex items-center justify-between text-xs">
        <span className="text-accent-blue font-medium group-hover:underline flex items-center gap-1">
          View Details &rarr;
        </span>

        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              {...externalLinkProps}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label={`Live demo of ${project.title}`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              {...externalLinkProps}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label={`GitHub repo for ${project.title}`}
            >
              <Github className="w-4 h-4" />
            </a>
          )}

          {!hasLinks && (
            <span className="text-[11px] font-mono text-gray-500 italic">
              Details coming soon
            </span>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}
