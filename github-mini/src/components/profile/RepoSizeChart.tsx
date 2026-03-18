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
import CustomTooltip from "./CustomTooltip";

interface Props {
  repos: GithubRepo[];
}

export default function RepoSizeChart({ repos }: Props) {
  const hasRepos = repos.length > 0;

  const [tooltipActive, setTooltipActive] = useState(false);
  const [tooltipCoord, setTooltipCoord] = useState<
    { x: number; y: number } | undefined
  >();
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

  const data = hasRepos
    ? repos
        .slice()
        .sort((a, b) => b.size - a.size)
        .slice(0, 10)
        .map((repo) => ({
          name: repo.name,
          size: repo.size,
        }))
    : [];

  if (!hasRepos || data.length === 0) {
    return (
      <div className="bg-gray-200 px-6 py-4 rounded-2xl shadow text-center">
        <h3 className="text-2xl text-stone-700 font-semibold mb-12">
          Repository Size (Top 10)
        </h3>

        <div className="w-40 mx-auto">
          <img src="/noData.png" alt="No data" className="w-full h-auto" />
        </div>

        <p className="text-gray-700 font-semibold text-xl max-w-sm mx-auto">
          No repository size data available.
        </p>
      </div>
    );
  }

  // ================= TOUCH HANDLERS =================
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isMobile) return;

    const touch = e.touches[0];

    setTooltipCoord({
      x: touch.clientX,
      y: touch.clientY - 20,
    });

    setTooltipActive(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;

    timeoutRef.current = setTimeout(() => {
      setTooltipActive(false);
    }, 350);
  };

  return (
    <div
      className="bg-gray-200 px-4 md:px-6 py-4 rounded-2xl shadow relative outline-none focus:outline-none"
      style={{
        WebkitTapHighlightColor: "transparent",
        touchAction: "none",
      }}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <h3 className="text-xl md:text-2xl text-stone-700 font-semibold mb-12 text-center">
        Repository Size (Top 10)
      </h3>

      <div className="w-full h-55 md:h-65">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 5,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" hide />

            <YAxis width="auto" tick={{ fontSize: 12 }} allowDecimals={false} />

            <Tooltip
              content={
                isMobile ? (
                  <CustomTooltip coordinate={tooltipCoord} />
                ) : undefined
              }
              cursor={false}
              active={isMobile ? tooltipActive : undefined}
            />

            <Bar
              dataKey="size"
              fill="#6366f1"
              radius={[6, 6, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}