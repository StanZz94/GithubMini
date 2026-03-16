import {
  PieChart,
  Pie,
  Cell,
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

function CustomTooltip({
  active,
  payload,
  coordinate,
}: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0]?.payload;

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
      <p className="font-semibold">{data.name}</p>
      <p className="text-gray-700">Repos: {data.value}</p>
    </div>
  );
}

export default function LanguagePieChart({ repos }: Props) {
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
    }, 1000);
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

            <Tooltip
              cursor={false}
              content={
                isMobile ? (
                  <CustomTooltip coordinate={tooltipCoord} />
                ) : undefined
              }
              active={isMobile ? tooltipActive : undefined}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}