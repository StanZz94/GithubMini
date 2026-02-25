export interface GithubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
  location: string;
  company: string;
  blog: string;
  created_at: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  created_at: string;
  updated_at: string;
}
