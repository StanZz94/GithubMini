import type { GithubRepo } from "../../types/github";
import LanguagePieChart from "./LanguagePieChart";
import StarsBarChart from "./StarsBarChart";

interface Props {
  repos: GithubRepo[];
}

export default function ProfileAnalytics({ repos }: Props) {
  if (!repos.length) return null;

  return (
    <section className="space-y-10 mt-12">
      <h2 className="text-2xl font-bold text-center">
        Developer Analytics
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        <LanguagePieChart repos={repos} />
        <StarsBarChart repos={repos} />
      </div>
    </section>
  );
}