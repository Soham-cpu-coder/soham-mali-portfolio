import { Github, Star, GitFork, BookOpen, ExternalLink, ShieldAlert } from "lucide-react";
import { profile } from "@/data/profile";
import { GitHubActivityData } from "@/lib/github";
import { externalLinkProps } from "@/lib/contact";
import { SectionHeader } from "@/components/SectionHeader";
import { SpotlightCard } from "@/components/SpotlightCard";

interface GitHubActivityProps {
  data: GitHubActivityData;
}

export function GitHubActivity({ data }: GitHubActivityProps) {
  const { stats, repos, isAvailable, error } = data;

  return (
    <section id="github" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 text-left">
          <SectionHeader
            number="04"
            label="Open Source"
            title="GitHub Activity & Repositories"
            subtitle="Real-time public repositories and activity fetched directly from the GitHub API."
          />

          <a
            href={profile.socials.github}
            {...externalLinkProps}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-border-subtle text-xs font-mono text-gray-200 hover:text-white hover:border-accent-blue/40 transition-colors self-start sm:self-auto"
          >
            <Github className="w-4 h-4" />
            <span>@{profile.githubUsername}</span>
            <ExternalLink className="w-3 h-3 text-gray-500" />
          </a>
        </div>

        {/* Stats Row */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <SpotlightCard className="p-4 text-left">
              <span className="text-xs font-mono text-gray-400">Public Repos</span>
              <p className="text-2xl font-extrabold text-white mt-1 font-mono">
                {stats.public_repos}
              </p>
            </SpotlightCard>
            <SpotlightCard className="p-4 text-left">
              <span className="text-xs font-mono text-gray-400">Followers</span>
              <p className="text-2xl font-extrabold text-accent-blue mt-1 font-mono">
                {stats.followers}
              </p>
            </SpotlightCard>
            <SpotlightCard className="p-4 text-left">
              <span className="text-xs font-mono text-gray-400">Following</span>
              <p className="text-2xl font-extrabold text-accent-violet mt-1 font-mono">
                {stats.following}
              </p>
            </SpotlightCard>
            <SpotlightCard className="p-4 text-left">
              <span className="text-xs font-mono text-gray-400">Member Since</span>
              <p className="text-2xl font-extrabold text-gray-300 mt-1 font-mono">
                {new Date(stats.created_at).getFullYear()}
              </p>
            </SpotlightCard>
          </div>
        )}

        {/* Repositories Grid */}
        {isAvailable && repos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                {...externalLinkProps}
                className="group block"
              >
                <SpotlightCard
                  spotlightColor="rgba(59, 130, 246, 0.15)"
                  className="p-6 text-left flex flex-col justify-between space-y-4 h-full hover:scale-[1.015]"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white font-bold text-base group-hover:text-accent-blue transition-colors">
                        <BookOpen className="w-4 h-4 text-gray-400 shrink-0" />
                        <span className="truncate">{repo.name}</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" />
                    </div>

                    <p className="text-xs text-gray-400 line-clamp-2 min-h-[2.5rem] leading-relaxed">
                      {repo.description || "No public description provided for this repository."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border-subtle text-xs text-gray-400 font-mono">
                    <div className="flex items-center gap-2">
                      {repo.language && (
                        <span className="flex items-center gap-1.5 text-gray-300">
                          <span className="w-2 h-2 rounded-full bg-accent-blue inline-block" />
                          {repo.language}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5 text-gray-400" />
                        {repo.forks_count}
                      </span>
                    </div>
                  </div>
                </SpotlightCard>
              </a>
            ))}
          </div>
        ) : (
          <SpotlightCard className="p-8 text-center space-y-3 max-w-xl mx-auto">
            <div className="p-3 rounded-full bg-surface-light border border-border-subtle w-fit mx-auto text-gray-400">
              {error ? <ShieldAlert className="w-6 h-6 text-amber-400" /> : <Github className="w-6 h-6 text-gray-400" />}
            </div>
            <h4 className="text-sm font-bold text-white">
              {error ? "GitHub Live Activity Unavailable" : "Repositories Loading"}
            </h4>
            <p className="text-xs text-gray-400 max-w-md mx-auto">
              {error || "Recent repositories and open source contribution activity."}
            </p>
            <a
              href={profile.socials.github}
              {...externalLinkProps}
              className="inline-flex items-center gap-1.5 text-xs text-accent-blue hover:underline font-mono pt-1"
            >
              <span>Visit github.com/{profile.githubUsername}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </SpotlightCard>
        )}
      </div>
    </section>
  );
}
