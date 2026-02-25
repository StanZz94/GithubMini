import axios from "axios";
import type { GithubUser, GithubRepo } from "../types/github";


const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
});

// ================= USER =================
export const getUser = async (username: string): Promise<GithubUser> => {
  const response = await githubApi.get(`/users/${username}`);
  return response.data;
};

// ================= USER REPOS =================
export const getUserRepos = async (
  username: string
): Promise<GithubRepo[]> => {
  const response = await githubApi.get(`/users/${username}/repos`, {
    params: {
      per_page: 100,
      sort: "updated",
    },
  });

  return response.data;
};

export default githubApi;
