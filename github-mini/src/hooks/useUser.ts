import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/github";

export const useUser = (username: string) => {
  return useQuery({
    queryKey: ["user", username],
    queryFn: () => getUser(username),
    enabled: !!username,
    staleTime: 1000 * 60 * 5, // 5 minutes caching
    retry: 1,
  });
};