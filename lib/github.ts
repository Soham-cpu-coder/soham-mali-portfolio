import { profile } from "@/data/profile";

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

export interface GitHubDataResult {
  isConfigured: boolean;
  user: GitHubUser | null;
  repos: GitHubRepo[];
  languages: string[];
  errorMessage?: string;
}

export async function getGitHubData(): Promise<GitHubDataResult> {
  const username = profile.github.username?.trim();

  // If username is empty or standard placeholder
  if (!username || username === "YOUR_GITHUB_USERNAME_TODO" || username === "placeholder") {
    return {
      isConfigured: false,
      user: null,
      repos: [],
      languages: [],
    };
  }

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "soham-mali-portfolio",
  };

  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        next: { revalidate: 3600 }, // 1 hour ISR
      }),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      return {
        isConfigured: true,
        user: null,
        repos: [],
        languages: [],
        errorMessage: `GitHub API returned ${userRes.status === 403 ? "Rate limit reached" : "Status " + userRes.status}`,
      };
    }

    const user: GitHubUser = await userRes.json();
    const reposRaw: GitHubRepo[] = await reposRes.json();

    const repos: GitHubRepo[] = Array.isArray(reposRaw) ? reposRaw : [];

    // Extract unique languages
    const langSet = new Set<string>();
    repos.forEach((repo) => {
      if (repo.language) langSet.add(repo.language);
    });

    return {
      isConfigured: true,
      user,
      repos,
      languages: Array.from(langSet),
    };
  } catch (error) {
    return {
      isConfigured: true,
      user: null,
      repos: [],
      languages: [],
      errorMessage: "Could not reach GitHub API at this time.",
    };
  }
}
