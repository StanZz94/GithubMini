import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useRef, useEffect } from "react";
import type { GithubRepo } from "../../types/github";

// ================= CUSTOM TOOLTIP =================
// eslint-disable-next-line
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;

  return (
    <div className="bg-white border p-2 rounded shadow text-sm">
      <p className="font-semibold">{data.name}</p>
      <p className="text-gray-700">
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

  // ================= MOBILE DETECTION =================
  useEffect(() => {
    // eslint-disable-next-line
    setIsMobile(window.innerWidth <= 768);

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
    .slice(0, 6); // top 6

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

  // ================= TOUCH HANDLERS =================
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
            margin={{ top: 10, right: 10, left: 20, bottom: 0 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={80}
              tick={{ fontSize: 12 }}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={false}
              active={isMobile ? tooltipActive : undefined}
            />

            <Bar
              dataKey="value"
              radius={[6, 6, 6, 6]}
              maxBarSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}