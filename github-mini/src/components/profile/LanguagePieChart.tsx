import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useState, useRef, useEffect } from "react";
import type { GithubRepo } from "../../types/github";

// ================= COLORS =================
const languageColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Vue: "#41b883",
  Svelte: "#ff3e00",
};

// ================= TOOLTIP =================
// eslint-disable-next-line
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;
  const color = languageColors[data.name] || "#8884d8";

  return (
    <div className="bg-white border p-2 rounded shadow text-sm">
      <div className="flex items-center gap-2">
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
        />
        <p className="font-semibold">{data.name}</p>
      </div>

      <p className="text-gray-700 mt-1">
        Repos: {data.value} ({data.percent}%)
      </p>
    </div>
  );
}

interface Props {
  repos: GithubRepo[];
}

export default function LanguageBarChart({ repos }: Props) {
  const [tooltipActive, setTooltipActive] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // ================= MOBILE =================
  // eslint-disable-next-line
  useEffect(() => {setIsMobile(window.innerWidth <= 768);

    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!repos.length) return null;

  // ================= DATA =================
  const languageMap: Record<string, number> = {};

  repos.forEach((repo) => {
    if (!repo.language) return;
    languageMap[repo.language] =
      (languageMap[repo.language] || 0) + 1;
  });

  const total = Object.values(languageMap).reduce((a, b) => a + b, 0);

  const data = Object.entries(languageMap)
    .map(([name, value]) => ({
      name,
      value,
      percent: ((value / total) * 100).toFixed(1),
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  if (data.length === 0) {
    return (
      <div className="px-6 py-4 bg-gray-200 rounded-2xl text-center">
        <h3 className="text-2xl text-stone-700 font-semibold mb-12">
          Languages Used
        </h3>

        <div className="w-40 mx-auto">
          <img src="/noData.png" alt="No data" className="w-full" />
        </div>

        <p className="text-gray-700 font-semibold text-xl max-w-sm mx-auto">
          No language data available!
        </p>
      </div>
    );
  }

  // ================= TOUCH =================
  const handleTouchStart = () => {
    setTooltipActive(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleTouchEnd = () => {
    timeoutRef.current = setTimeout(() => {
      setTooltipActive(false);
    }, 350);
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

      <div className="w-full h-64 md:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <XAxis type="number" hide />

            {/* ✅ COLORED LABELS */}
            <YAxis
              type="category"
              dataKey="name"
              width={90}
              tick={({ x, y, payload }) => {
                const color =
                  languageColors[payload.value] || "#444";

                return (
                  <text
                    x={x}
                    y={y}
                    dy={4}
                    textAnchor="end"
                    fontSize={12}
                    fill={color}
                    fontWeight={600}
                  >
                    {payload.value}
                  </text>
                );
              }}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={false}
              active={isMobile ? tooltipActive : undefined}
            />

            {/* ✅ COLORED BARS */}
            <Bar dataKey="value" radius={[6, 6, 6, 6]} maxBarSize={20}>
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    languageColors[entry.name] || "#8884d8"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}