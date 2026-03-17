import type { GithubRepo } from "../../types/github";
import LanguagePieChart from "./LanguagePieChart";
import StarsBarChart from "./StarsBarChart";
import RepoSizeChart from "./RepoSizeChart";
import PopularityComparisonChart from "./PopularityComparisonChart";

interface Props {
  repos: GithubRepo[];
}

export default function ProfileAnalytics({ repos }: Props) {
  if (!repos.length) return null;

  return (
    <section className="space-y-6 md:space-y-10 mt-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-300">
        Developer Analytics
      </h2>

      <div className="grid md:grid-cols-2 gap-14 md:gap-10">
        <LanguagePieChart repos={repos} />
        <StarsBarChart repos={repos} />
        <RepoSizeChart repos={repos} />
        <PopularityComparisonChart repos={repos} />
      </div>
    </section>
  );
}