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

export default function RepoSizeChart({ repos }: Props) {
  const hasRepos = repos.length > 0;

  const data = hasRepos
    ? repos
        .slice()
        .sort((a, b) => b.size - a.size)
        .slice(0, 10)
        .map((repo) => ({
          name: repo.name,
          size: repo.size, // KB
        }))
    : [];

  if (!hasRepos || data.length === 0) {
    return (
      <div className="bg-gray-200 px-6 py-4 rounded-2xl shadow text-center">
        <h3 className="text-2xl text-stone-700 font-semibold mb-12">
          Repository Size (Top 10)
        </h3>

        <div className="w-40 mx-auto">
          <img
            src="/noData.png"
            alt="No data"
            className="w-full h-auto"
          />
        </div>

        <p className="text-gray-700 font-semibold text-xl max-w-sm mx-auto">
          No repository size data available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 px-6 py-4 rounded-2xl shadow">
      <h3 className="text-2xl text-stone-700 font-semibold mb-12 text-center">
        Repository Size (Top 10)
      </h3>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <XAxis dataKey="name" hide />
          <YAxis />
          <Tooltip />
          <Bar dataKey="size" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}