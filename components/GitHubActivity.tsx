import React from "react";
import Image from "next/image";
import { getGitHubData } from "@/lib/github";
import { profile } from "@/data/profile";
import { Github, Star, GitFork, BookOpen, AlertCircle, Sparkles, ExternalLink } from "lucide-react";

export async function GitHubActivity() {
  const data = await getGitHubData();

  return (
    <section id="github" className="py-20 sm:py-28 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
            Open Source &amp; GitHub Activity
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Live repositories and open source activity fetched directly from the GitHub REST API.
          </p>
        </div>

        {/* Case 1: GitHub Username is not configured yet */}
        {!data.isConfigured && (
          <div className="rounded-2xl bg-[#10121A] border border-white/10 p-8 sm:p-10 relative overflow-hidden">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB_API_READY</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Live GitHub Sync Ready
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Connect your account in one step: set your GitHub handle in{" "}
                <code className="text-xs bg-white/10 px-2 py-0.5 rounded text-blue-300 font-mono">
                  data/profile.ts
                </code>{" "}
                (field: <code className="text-xs font-mono text-slate-300">github.username</code>). Once set, your public repositories, language distribution, and commit updates will render here with 1-hour automated cache revalidation.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                {profile.github.url ? (
                  <a
                    href={profile.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-900 text-xs font-semibold hover:bg-slate-200 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Open GitHub Profile</span>
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span>Awaiting Username in profile.ts</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Case 2: API error or rate limit reached */}
        {data.isConfigured && data.errorMessage && (
          <div className="rounded-2xl bg-[#10121A] border border-white/10 p-8 text-center">
            <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white">GitHub Activity Temporarily Offline</h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">{data.errorMessage}</p>
            {profile.github.url && (
              <a
                href={profile.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-colors"
              >
                <span>Visit GitHub Directly</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}

        {/* Case 3: Successfully loaded GitHub user and repos */}
        {data.isConfigured && data.user && (
          <div className="space-y-6">
            {/* User Profile Card */}
            <div className="rounded-2xl bg-[#10121A] border border-white/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/20">
                  <Image
                    src={data.user.avatar_url}
                    alt={data.user.name || data.user.login}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
                    <span>{data.user.name || data.user.login}</span>
                    <a
                      href={data.user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white"
                      aria-label="GitHub Profile URL"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </h3>
                  <p className="text-xs text-slate-400">@{data.user.login}</p>
                  {data.user.bio && (
                    <p className="text-xs text-slate-300 mt-1 max-w-md">{data.user.bio}</p>
                  )}
                </div>
              </div>

              {/* Stats Counters */}
              <div className="flex items-center gap-4 sm:gap-6 border-t sm:border-t-0 border-white/10 pt-4 sm:pt-0">
                <div className="text-center">
                  <div className="text-lg font-mono font-bold text-white">
                    {data.user.public_repos}
                  </div>
                  <div className="text-[11px] text-slate-400">Repositories</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-mono font-bold text-white">
                    {data.user.followers}
                  </div>
                  <div className="text-[11px] text-slate-400">Followers</div>
                </div>
              </div>
            </div>

            {/* Repositories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-[#10121A] border border-white/10 p-5 flex flex-col justify-between hover:border-blue-500/40 hover:bg-[#121626] transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 text-white font-medium text-sm group-hover:text-blue-400 transition-colors line-clamp-1">
                        <BookOpen className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{repo.name}</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300 shrink-0" />
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                      {repo.description || "No description provided for this repository."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-white/5">
                    {repo.language ? (
                      <span className="flex items-center gap-1.5 font-medium text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-blue-400" />
                        {repo.language}
                      </span>
                    ) : (
                      <span className="text-slate-500">Plain</span>
                    )}

                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3 text-slate-400" />
                        {repo.forks_count}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
