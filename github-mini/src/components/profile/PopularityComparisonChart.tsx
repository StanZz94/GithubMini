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
  const allZero = data.every(
    (repo) => repo.stars === 0 && repo.forks === 0
  );

  if (allZero) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow text-center">
        <h3 className="text-xl font-bold mb-2">
          Stars vs Forks (Top Repos)
        </h3>

        <p className="text-gray-500">
          No stars or forks data available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-xl font-bold mb-4 text-center">
        Stars vs Forks (Top Repos)
      </h3>

      <ResponsiveContainer width="100%" height={300}>
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
  );
}