"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/projects";
import { ExternalLink, Github, Eye, ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const hasGithub = Boolean(project.github && project.github.trim() !== "");
  const hasDemo = Boolean(project.demo && project.demo.trim() !== "");

  return (
    <article className="group rounded-2xl bg-[#10121A] border border-white/10 overflow-hidden flex flex-col justify-between hover:border-white/25 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
      <div>
        {/* Cover Graphic Container */}
        <div
          onClick={() => onSelect(project)}
          className="relative w-full aspect-[16/9] bg-[#0A0D16] overflow-hidden cursor-pointer border-b border-white/5"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10121A] via-transparent to-transparent opacity-60" />

          {/* Quick View Pill on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-slate-900 text-xs font-semibold shadow-lg">
              <Eye className="w-3.5 h-3.5" />
              Quick View
            </span>
          </div>

          {/* Category Tag */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-[#08090D]/80 border border-white/15 text-blue-400 backdrop-blur-md">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-mono text-slate-400">{project.date}</span>
            <span className="text-[11px] font-mono text-emerald-400/90">{project.status}</span>
          </div>

          <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
            <Link href={`/projects/${project.slug}`}>
              {project.title}
            </Link>
          </h3>

          <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {project.summary}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded text-[11px] font-medium bg-white/5 text-slate-300 border border-white/5"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-white/5 flex items-center justify-between gap-3 text-xs">
        <button
          type="button"
          onClick={() => onSelect(project)}
          className="text-slate-400 hover:text-white font-medium inline-flex items-center gap-1 transition-colors"
        >
          <span>Preview Details</span>
        </button>

        <div className="flex items-center gap-2">
          {/* GitHub button - HIDDEN IF EMPTY */}
          {hasGithub && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source code`}
              className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}

          {/* Demo button - HIDDEN IF EMPTY */}
          {hasDemo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo of ${project.title}`}
              className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {/* Direct page link */}
          <Link
            href={`/projects/${project.slug}`}
            className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={`Open full project page for ${project.title}`}
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
