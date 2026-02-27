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

  // ================= FILTERED + SORTED (PER YEAR) =================

  const filteredData = useMemo(() => {
    if (!activeYear) return [];

    return data
      .filter((d) => new Date(d.date).getFullYear() === activeYear)
      .sort(
        (a, b) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      );
  }, [data, activeYear]);

  // ================= YEAR STATS =================

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
      currentStreak: current, // (kept but not used for UI)
      totalContributions: total,
    };
  }, [filteredData]);

  // ================= GLOBAL CURRENT STREAK (FIX) =================

const globalCurrentStreak = useMemo(() => {
  if (!data.length) return 0;

  // IMPORTANT: do NOT convert to ISO
  const activityMap = new Map(
    data.map((d) => [d.date.slice(0, 10), d.count])
  );

  let streak = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentDate = new Date(today);

  while (true) {
    const key =
      currentDate.getFullYear() +
      "-" +
      String(currentDate.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(currentDate.getDate()).padStart(2, "0");

    const count = activityMap.get(key);

    if (count && count > 0) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}, [data]);

  // ================= COLOR SCALE =================

  const getColor = (level: number) => {
    const colors = [
      "bg-gray-50",
      "bg-emerald-500",
      "bg-emerald-600",
      "bg-emerald-700",
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
    <section className="bg-gray-200 rounded-bl-2xl rounded-br-2xl shadow p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-stone-700">
            Contribution Activity
          </h2>
          <p className="text-sm text-gray-500">
            {stats.totalContributions} contributions in {activeYear}
          </p>
        </div>

        {/* YEAR SELECTOR */}
        <div className="flex gap-2 flex-wrap flex-row-reverse">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-3 py-1 text-sm font-semibold rounded-lg transition ${
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

      {/* GRID */}
      <div className="overflow-x-auto my-4">
        <div className="grid grid-rows-7 grid-flow-col gap-0.5 min-w-225">
          {filteredData.map((day) => (
            <div
              key={day.date}
              className={`w-3 h-3 rounded-xs ${getColor(day.level)}`}
              title={`${day.date} — ${day.count} contributions`}
            />
          ))}
        </div>
      </div>

      {/* STREAK INFO */}
      <div className="flex justify-between text-base text-gray-600">
        <span>
          🔥 {activeYear} Longest streak: {stats.longestStreak} days
        </span>
        <span>
          ⚡ Current streak: {globalCurrentStreak} days
        </span>
      </div>
    </section>
  );
}