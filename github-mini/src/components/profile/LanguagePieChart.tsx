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

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Languages Used
      </h3>

      <div className="h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
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