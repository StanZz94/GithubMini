import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { GithubRepo } from "../../types/github";

interface Props {
  repos: GithubRepo[];
}

export default function StarsBarChart({ repos }: Props) {
  const topRepos = [...repos]
    .sort(
      (a, b) =>
        b.stargazers_count - a.stargazers_count
    )
    .slice(0, 5)
    .map((repo) => ({
      name: repo.name,
      stars: repo.stargazers_count,
    }));

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Top Starred Repositories
      </h3>

      <div className="h-64">
        <ResponsiveContainer>
          <BarChart data={topRepos}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="stars" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}