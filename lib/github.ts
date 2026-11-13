import { profile } from "@/data/profile";

export interface GitHubUserStats {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
}

export interface GitHubActivityData {
  stats: GitHubUserStats | null;
  repos: GitHubRepo[];
  isAvailable: boolean;
  error?: string;
}

export async function fetchGitHubActivity(
  username: string = profile.githubUsername
): Promise<GitHubActivityData> {
  try {
    const token = process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Soham-Mali-Portfolio",
    };

    if (token && token.trim() !== "") {
      headers.Authorization = `Bearer ${token.trim()}`;
    }

    // Short 4-second timeout to prevent stalling builds
    const signal = AbortSignal.timeout(4000);

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        signal,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6&type=owner`, {
        headers,
        signal,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok && userRes.status === 404) {
      return { stats: null, repos: [], isAvailable: false, error: "GitHub user not found" };
    }

    if (!userRes.ok || !reposRes.ok) {
      return {
        stats: null,
        repos: [],
        isAvailable: false,
        error: "GitHub API rate limit or service unavailable",
      };
    }

    const stats: GitHubUserStats | null = await userRes.json();
    const rawRepos: unknown = await reposRes.json();

    const repos: GitHubRepo[] = Array.isArray(rawRepos)
      ? rawRepos
          .filter((repo: Record<string, unknown>) => !repo.fork)
          .slice(0, 6)
          .map((repo: Record<string, unknown>) => ({
            id: Number(repo.id),
            name: String(repo.name ?? ""),
            full_name: String(repo.full_name ?? ""),
            description: repo.description ? String(repo.description) : null,
            html_url: String(repo.html_url ?? `https://github.com/${username}`),
            stargazers_count: Number(repo.stargazers_count ?? 0),
            forks_count: Number(repo.forks_count ?? 0),
            language: repo.language ? String(repo.language) : null,
            updated_at: String(repo.updated_at ?? ""),
            fork: Boolean(repo.fork),
          }))
      : [];

    return { stats, repos, isAvailable: true };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Failed to fetch GitHub activity";
    return {
      stats: null,
      repos: [],
      isAvailable: false,
      error: errorMessage,
    };
  }
}
