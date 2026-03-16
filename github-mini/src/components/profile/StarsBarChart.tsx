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

interface Props {
  repos: GithubRepo[];
}

/* ================= CUSTOM TOOLTIP ================= */

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
          Stars: {item.value}
        </p>
      ))}
    </div>
  );
}

export default function StarsBarChart({ repos }: Props) {
  const [tooltipActive, setTooltipActive] = useState(false);
  const [tooltipCoord, setTooltipCoord] =
    useState<{ x: number; y: number }>();

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  /* ================= MOBILE DETECT ================= */

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

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

  /* ================= TOUCH HANDLERS ================= */

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
      className="bg-gray-200 px-4 md:px-6 py-4 rounded-2xl shadow relative outline-none"
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
      }}
    >
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

            <Tooltip
              cursor={false}
              content={
                isMobile ? (
                  <CustomTooltip coordinate={tooltipCoord} />
                ) : undefined
              }
              active={isMobile ? tooltipActive : undefined}
            />

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