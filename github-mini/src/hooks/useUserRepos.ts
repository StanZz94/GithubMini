import { useQuery } from "@tanstack/react-query";
import { getUserRepos } from "../api/github";

export const useUserRepos = (username: string) => {
  return useQuery({
    queryKey: ["repos", username],
    queryFn: () => getUserRepos(username),
    enabled: !!username,
  });
};