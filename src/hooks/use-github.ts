import { useState, useEffect } from "react";

export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  company: string | null;
  blog: string;
  location: string | null;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  archived: boolean;
  open_issues_count: number;
  topics: string[];
  updated_at: string;
  owner: {
    avatar_url: string;
  };
  license: {
    name: string;
  } | null;
}

const CACHE_KEY_USER = "github_user_cache";
const CACHE_KEY_REPOS = "github_repos_cache";
const CACHE_TIME = 1000 * 60 * 60; // 1 hour

export function useGitHub(username: string) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Check Cache
        const cachedUserStr = sessionStorage.getItem(CACHE_KEY_USER);
        const cachedReposStr = sessionStorage.getItem(CACHE_KEY_REPOS);
        const cacheTimeStr = sessionStorage.getItem(`${CACHE_KEY_USER}_time`);

        // Disable cache for real-time updates
        const useCache = false;
        
        if (useCache && cachedUserStr && cachedReposStr && cacheTimeStr) {
          const cacheTime = parseInt(cacheTimeStr, 10);
          if (Date.now() - cacheTime < CACHE_TIME) {
            if (isMounted) {
              setUser(JSON.parse(cachedUserStr));
              setRepos(JSON.parse(cachedReposStr));
              setLoading(false);
            }
            return;
          }
        }

        // Fetch User
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) {
          throw new Error(userRes.status === 403 ? "GitHub API rate limit exceeded." : "Failed to fetch user data.");
        }
        const userData: GitHubUser = await userRes.json();

        // Fetch Repos (handle pagination for up to 100 public repos, which is enough for most portfolios without complicated paginated fetching, but we will fetch per_page=100)
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
        if (!reposRes.ok) {
          throw new Error("Failed to fetch repositories.");
        }
        let reposData: GitHubRepo[] = await reposRes.json();

        // Show all projects without filtering
        // reposData = reposData.filter(repo => !repo.fork && !repo.archived);

        if (isMounted) {
          setUser(userData);
          setRepos(reposData);
          setLoading(false);

          // Save to Cache
          sessionStorage.setItem(CACHE_KEY_USER, JSON.stringify(userData));
          sessionStorage.setItem(CACHE_KEY_REPOS, JSON.stringify(reposData));
          sessionStorage.setItem(`${CACHE_KEY_USER}_time`, Date.now().toString());
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "An error occurred");
          setLoading(false);
        }
      }
    }

    if (username) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [username]);

  return { user, repos, loading, error };
}
