import { useState, useMemo } from "react";
import { useUserActivity } from "../../hooks/useUserActivity";
import { useParams } from "react-router-dom";

export default function ActivityHeatmap() {
  const { username } = useParams();
  const { data = [], isLoading } = useUserActivity(username || "");

  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // ================= YEARS =================

  const years = useMemo(() => {
    return Array.from(
      new Set(data.map((d) => new Date(d.date).getFullYear()))
    ).sort((a, b) => b - a);
  }, [data]);

  const activeYear = selectedYear ?? years[0];

  // ================= FILTERED + SORTED =================

  const filteredData = useMemo(() => {
    if (!activeYear) return [];

    return data
      .filter(
        (d) => new Date(d.date).getFullYear() === activeYear
      )
      .sort(
        (a, b) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      );
  }, [data, activeYear]);

  // ================= STREAK + TOTAL =================

  const stats = useMemo(() => {
    let longest = 0;
    let current = 0;
    let running = 0;
    let total = 0;

    for (const day of filteredData) {
      total += day.count;

      if (day.count > 0) {
        running++;
        current = running;
      } else {
        longest = Math.max(longest, running);
        running = 0;
        current = 0;
      }
    }

    longest = Math.max(longest, running);

    return {
      longestStreak: longest,
      currentStreak: current,
      totalContributions: total,
    };
  }, [filteredData]);

  // ================= COLOR SCALE =================

  const getColor = (level: number) => {
    const colors = [
      "bg-gray-200",
      "bg-emerald-200",
      "bg-emerald-400",
      "bg-emerald-600",
      "bg-emerald-800",
    ];
    return colors[level] || "bg-gray-200";
  };

  // ================= LOADING =================

  if (isLoading) {
    return (
      <div className="text-center text-gray-500">
        Loading activity...
      </div>
    );
  }

  if (!activeYear || filteredData.length === 0) {
    return null;
  }

  return (
    <section className="bg-white rounded-2xl shadow p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold">
            Contribution Activity
          </h2>
          <p className="text-sm text-gray-500">
            {stats.totalContributions} contributions in {activeYear}
          </p>
        </div>

        {/* YEAR SELECTOR */}
        <div className="flex gap-2 flex-wrap">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-3 py-1 text-sm rounded-lg transition ${
                activeYear === year
                  ? "bg-black text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* STREAK INFO */}
      <div className="flex gap-6 text-sm text-gray-600">
        <span>🔥 Longest streak: {stats.longestStreak} days</span>
        <span>⚡ Current streak: {stats.currentStreak} days</span>
      </div>

      {/* GITHUB-LIKE GRID (VERTICAL DAYS) */}
      <div className="overflow-x-auto">
        <div
          className="grid grid-rows-7 grid-flow-col gap-1 min-w-225"
        >
          {filteredData.map((day) => (
            <div
              key={day.date}
              className={`w-3 h-3 rounded-sm transition hover:scale-125 ${getColor(
                day.level
              )}`}
              title={`${day.date} — ${day.count} contributions`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}