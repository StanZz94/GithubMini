import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ActivityResponse {
  contributions: ContributionDay[];
}

export const useUserActivity = (username: string) => {
  return useQuery({
    queryKey: ["activity", username],
    queryFn: async () => {
      const { data } = await axios.get<ActivityResponse>(
        `https://github-contributions-api.jogruber.de/v4/${username}`
      );

      return data.contributions;
    },
    enabled: !!username,
  });
};