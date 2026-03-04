import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../api/github";
import type { GithubSearchResponse } from "../types/github";

export const useSearchUsers = (query: string, page: number) => {
  return useQuery<GithubSearchResponse>({
    queryKey: ["searchUsers", query, page],
    queryFn: () => searchUsers(query, page),
    enabled: query.length > 1,
    placeholderData: (previousData) => previousData,
  });
};