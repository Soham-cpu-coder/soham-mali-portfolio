import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projectsData } from "@/data/projects";
import { profile } from "@/data/profile";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Tag,
  Share2,
} from "lucide-react";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Soham Mali",
    };
  }

  return {
    title: `${project.title} | Soham Mali Portfolio`,
    description: project.summary,
    openGraph: {
      title: `${project.title} - Case Study`,
      description: project.summary,
      type: "article",
      images: [
        {
          url: project.image,
          width: 800,
          height: 450,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const hasGithub = Boolean(project.github && project.github.trim() !== "");
  const hasDemo = Boolean(project.demo && project.demo.trim() !== "");

  return (
    <main className="min-h-screen bg-[#08090D] text-slate-100 py-16 sm:py-24">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-b from-blue-600/10 via-violet-600/5 to-transparent blur-3xl rounded-full"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all projects</span>
          </Link>
        </div>

        {/* Header Block */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-slate-400 border border-white/10">
              {project.status}
            </span>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 ml-auto">
              <Calendar className="w-3.5 h-3.5" />
              <span>{project.date}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {project.summary}
          </p>

          {/* Action buttons (HIDDEN AUTOMATICALLY IF EMPTY) */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            {hasGithub && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-900 font-semibold text-xs sm:text-sm hover:bg-slate-200 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>View Source Code</span>
              </a>
            )}

            {hasDemo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white font-semibold text-xs sm:text-sm hover:bg-blue-500 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Launch Live Demo</span>
              </a>
            )}

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 font-medium text-xs sm:text-sm hover:bg-white/10 hover:text-white transition-colors"
            >
              <span>Discuss Project</span>
            </Link>
          </div>
        </div>

        {/* Cover Image Showcase */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-[#0A0D16] shadow-2xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Case Study Sections */}
        <div className="space-y-8 pt-4">
          {/* Detailed Overview */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">System Architecture &amp; Overview</h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
          </section>

          {/* Problem vs Solution */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-[#10121A] border border-white/10 p-6 space-y-3">
              <div className="flex items-center gap-2 text-amber-400">
                <AlertCircle className="w-5 h-5" />
                <h3 className="text-sm font-semibold tracking-wide uppercase text-white">The Challenge</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="rounded-2xl bg-[#10121A] border border-white/10 p-6 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="text-sm font-semibold tracking-wide uppercase text-white">Engineering Solution</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </section>

          {/* Key Features */}
          <section className="rounded-2xl bg-[#10121A] border border-white/10 p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-bold text-white">Key Capabilities &amp; Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {project.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-blue-400 mt-2 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack Badges */}
          <section className="rounded-2xl bg-[#10121A] border border-white/10 p-6 space-y-3">
            <div className="flex items-center gap-2 text-blue-400">
              <Tag className="w-4 h-4" />
              <h2 className="text-sm font-semibold text-white">Technologies &amp; Libraries</h2>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {project.tech.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Bottom Navigation */}
        <div className="pt-8 border-t border-white/10 flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-colors"
          >
            <span>Inquire About this Project</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
