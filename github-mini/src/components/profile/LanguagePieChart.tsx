import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { GithubRepo } from "../../types/github";

interface Props {
  repos: GithubRepo[];
}

export default function LanguagePieChart({ repos }: Props) {
  if (!repos.length) return null;

  const languageMap: Record<string, number> = {};

  repos.forEach((repo) => {
    if (!repo.language) return;
    languageMap[repo.language] =
      (languageMap[repo.language] || 0) + 1;
  });

  const data = Object.entries(languageMap).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  // 🔥 If no languages detected
  if (data.length === 0) {
    return (
      <div className="px-6 py-4 bg-gray-200 rounded-2xl text-center">
        <h3 className="text-2xl text-stone-700 font-semibold mb-12">
          Languages Used
        </h3>

        <div className="w-40 h-auto mx-auto">
          <img
            src="/noData.png"
            alt="No data"
            className="mx-auto w-full h-auto"
          />
        </div>

        <p className="text-gray-700 font-semibold text-xl max-w-sm mx-auto">
          No language data available!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 px-6 py-4 rounded-2xl shadow">
      <h3 className="text-2xl text-stone-700 font-semibold mb-4 text-center">
        Languages Used
      </h3>

      <div className="h-68">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={`hsl(${index * 60}, 70%, 50%)`}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}