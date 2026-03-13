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
  if (!repos.length) return null;

  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5)
    .map((repo) => ({
      name: repo.name,
      stars: repo.stargazers_count,
    }));

  const allZero = topRepos.every((repo) => repo.stars === 0);

  if (allZero) {
    return (
      <div className="px-6 py-4 bg-gray-200 rounded-2xl text-center">
        <h3 className="text-2xl text-stone-700 font-semibold mb-12">
          Top Starred Repositories
        </h3>

        <div className="w-40 h-auto mx-auto">
          <img
            src="/noData.png"
            alt="No data"
            className="mx-auto w-full h-auto"
          />
        </div>

        <p className="text-gray-700 font-semibold text-xl max-w-sm mx-auto">
          There are no stars yet!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 px-4 md:px-6 py-4 rounded-2xl shadow">
      <h3 className="text-xl md:text-2xl text-stone-700 font-semibold mb-4 text-center">
        Top Starred Repositories
      </h3>

      <div className="w-full h-65 md:h-70">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={topRepos}
            margin={{
              top: 10,
              right: 10,
              left: 5,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" hide />

            <YAxis
              width="auto"
              tick={{ fontSize: 12 }}
              allowDecimals={false}
            />

            <Tooltip />

            <Bar
              dataKey="stars"
              fill="#f59e0b"
              radius={[6, 6, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}