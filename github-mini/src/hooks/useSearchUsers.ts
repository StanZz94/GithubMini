import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../api/github";

export const useSearchUsers = (query: string) => {
  return useQuery({
    queryKey: ["searchUsers", query],
    queryFn: () => searchUsers(query),
    enabled: query.length > 2, // only search if 3+ characters
  });
};