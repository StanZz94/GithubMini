import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { GithubRepo } from "../../types/github";

interface Props {
  repos: GithubRepo[];
}

export default function PopularityComparisonChart({ repos }: Props) {
  if (!repos.length) return null;

  const data = repos
    .slice()
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 8)
    .map((repo) => ({
      name: repo.name,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
    }));

  // 🔥 Check if everything is 0
  const allZero = data.every((repo) => repo.stars === 0 && repo.forks === 0);

  if (allZero) {
    return (
      <div className="px-6 py-4 bg-gray-200 rounded-2xl text-center">
        <h3 className="text-2xl text-stone-700 font-semibold mb-12">
          Stars vs Forks (Top Repos)
        </h3>

        <div className="w-40 h-auto mx-auto">
          <img
            src="/noData.png"
            alt="No data"
            className="mx-auto w-full h-auto"
          />
        </div>
        <p className="text-gray-700 font-semibold text-xl max-w-sm mx-auto">
          No stars or forks yet!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 px-6 py-4 rounded-2xl shadow">
      <h3 className="text-2xl text-stone-700 font-semibold mb-4 text-center">
        Stars vs Forks (Top Repos)
      </h3>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="stars" fill="#f59e0b" />
            <Bar dataKey="forks" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
