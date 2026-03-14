import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState, useRef, useEffect } from "react";
import type { GithubRepo } from "../../types/github";

interface Props {
  repos: GithubRepo[];
}

// ================= CUSTOM TOOLTIP =================
interface CustomTooltipProps {
  active?: boolean;
  // eslint-disable-next-line
  payload?: any;
  label?: string;
  coordinate?: { x: number; y: number };
}

function CustomTooltip({ active, payload, label, coordinate }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div
      className="bg-white border p-2 rounded shadow text-sm"
      style={{
        position: "absolute",
        left: coordinate?.x,
        top: coordinate?.y,
        pointerEvents: "none",
        transform: "translate(-50%, -100%)",
        whiteSpace: "nowrap",
        zIndex: 1000,
      }}
    >
      <p className="font-semibold">{label}</p>
      {/* eslint-disable-next-line */}
      {payload.map((item: any) => (
        
        <p key={item.dataKey} className="text-gray-700">
          {item.name}: {item.value}
        </p>
      ))}
    </div>
  );
}

export default function PopularityComparisonChart({ repos }: Props) {
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
      <h3 className="text-xl md:text-2xl text-stone-700 font-semibold mb-4 text-center">
        Stars vs Forks (Top Repos)
      </h3>

      <div className="w-full h-64 md:h-70">
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

            <YAxis
              width="auto"
              tick={{ fontSize: 12 }}
              allowDecimals={false}
            />

            <Tooltip
              content={
                isMobile ? (
                  <CustomTooltip coordinate={tooltipCoord} />
                ) : undefined
              }
              cursor={false}
              active={isMobile ? tooltipActive : undefined}
            />

            <Legend />

            <Bar
              dataKey="stars"
              fill="#f59e0b"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
            />

            <Bar
              dataKey="forks"
              fill="#10b981"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}