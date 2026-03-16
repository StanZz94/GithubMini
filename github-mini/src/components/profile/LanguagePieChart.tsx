import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useRef } from "react";
import type { GithubRepo } from "../../types/github";

interface Props {
  repos: GithubRepo[];
}

/* ================= CUSTOM TOOLTIP ================= */
// eslint-disable-next-line
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;

  return (
    <div className="bg-white border p-2 rounded shadow text-sm">
      <p className="font-semibold">{data.name}</p>
      <p className="text-gray-700">Repos: {data.value}</p>
    </div>
  );
}

export default function LanguagePieChart({ repos }: Props) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (!repos.length) return null;

  const languageMap: Record<string, number> = {};

  repos.forEach((repo) => {
    if (!repo.language) return;

    languageMap[repo.language] =
      (languageMap[repo.language] || 0) + 1;
  });

  const data = Object.entries(languageMap).map(([name, value]) => ({
    name,
    value,
  }));

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

  /* ================= MOBILE TOOLTIP DELAY ================= */

  const handleTouchStart = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleTouchEnd = () => {
    timeoutRef.current = setTimeout(() => {
      const tooltip = document.querySelector(
        ".recharts-tooltip-wrapper"
      ) as HTMLElement | null;

      if (tooltip) {
        tooltip.style.opacity = "0";
      }
    }, 1000);
  };

  return (
    <div
      className="bg-gray-200 px-4 md:px-6 py-4 rounded-2xl shadow"
      style={{ WebkitTapHighlightColor: "transparent" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <h3 className="text-xl md:text-2xl text-stone-700 font-semibold mb-4 text-center">
        Languages Used
      </h3>

      <div className="h-68 md:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              isAnimationActive={false}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={`hsl(${index * 60}, 70%, 50%)`}
                  style={{ outline: "none" }}
                />
              ))}
            </Pie>

            <Tooltip
              content={<CustomTooltip />}
              cursor={false}
              wrapperStyle={{ outline: "none" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}