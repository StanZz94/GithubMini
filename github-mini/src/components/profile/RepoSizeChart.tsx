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
  if (!repos.length) return null;

  const data = repos
    .slice()
    .sort((a, b) => b.size - a.size)
    .slice(0, 10)
    .map((repo) => ({
      name: repo.name,
      size: repo.size, // size in KB
    }));

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-xl font-bold mb-4 text-center">
        Repository Size (Top 10)
      </h3>

      <ResponsiveContainer width="100%" height={300}>
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