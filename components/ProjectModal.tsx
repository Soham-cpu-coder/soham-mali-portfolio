"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ExternalLink, Github, Video, Layers, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "@/data/projects";
import { externalLinkProps } from "@/lib/contact";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export function ProjectModal({ project, isOpen, onClose, onPrev, onNext }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && onPrev) {
        onPrev();
      } else if (e.key === "ArrowRight" && onNext) {
        onNext();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !project) return null;

  const hasAnyLink = Boolean(project.githubUrl || project.liveUrl || project.demoVideoUrl);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-2xl bg-[#0F1117] border border-border-subtle rounded-2xl shadow-2xl overflow-hidden z-10 text-left focus:outline-none my-8 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Top Header / Navigation / Close Button */}
        <div className="flex items-center justify-between p-6 border-b border-border-subtle bg-surface-light/40">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-accent-blue/15 text-accent-blue border border-accent-blue/30">
              {project.category}
            </span>
            {project.featured && (
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-accent-violet/15 text-accent-violet border border-accent-violet/30">
                Featured
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onPrev && (
              <button
                type="button"
                onClick={onPrev}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
                aria-label="Previous project (Left arrow)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {onNext && (
              <button
                type="button"
                onClick={onNext}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
                aria-label="Next project (Right arrow)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none ml-2"
              aria-label="Close project modal (Escape)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Media or Cyber Monogram Placeholder */}
        {project.image ? (
          <div className="relative h-64 w-full bg-surface border-b border-border-subtle">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
        ) : (
          <div className="relative h-36 w-full bg-gradient-to-r from-accent-blue/20 via-accent-violet/20 to-surface flex items-center justify-center border-b border-border-subtle">
            <div className="text-center space-y-1">
              <span className="text-2xl font-black text-white tracking-tight">
                {project.title}
              </span>
              <p className="text-xs font-mono text-accent-blue">{project.category} Portfolio</p>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto terminal-scroll">
          <div>
            <h3 id="modal-project-title" className="text-2xl font-bold text-white">
              {project.title}
            </h3>
            <p className="text-sm text-gray-300 mt-2 leading-relaxed">
              {project.longDescription || project.shortDescription}
            </p>
          </div>

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-accent-blue" /> Key Features & Technical Highlights
              </h4>
              <ul className="space-y-2">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div className="space-y-2 pt-2 border-t border-border-subtle">
            <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono rounded bg-white/5 border border-border-subtle text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer / Actions */}
        <div className="p-6 border-t border-border-subtle bg-surface-light/40 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                {...externalLinkProps}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-blue text-white text-xs font-medium hover:bg-blue-600 transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                {...externalLinkProps}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border-subtle text-gray-200 text-xs font-medium hover:text-white hover:border-accent-blue/40 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>
            )}

            {project.demoVideoUrl && (
              <a
                href={project.demoVideoUrl}
                {...externalLinkProps}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border-subtle text-gray-200 text-xs font-medium hover:text-white hover:border-accent-violet/40 transition-colors"
              >
                <Video className="w-3.5 h-3.5 text-accent-violet" />
                <span>Watch Walkthrough</span>
              </a>
            )}

            {!hasAnyLink && (
              <span className="text-xs font-mono text-gray-500 italic flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400/80 inline-block animate-pulse" />
                Details & links coming soon
              </span>
            )}
          </div>

          <div className="text-xs text-gray-500 font-mono flex items-center gap-3">
            <span>Arrow keys: ◀ ▶</span>
            <span>Esc to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
