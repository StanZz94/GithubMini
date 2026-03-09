import { useState, useMemo } from "react";
import { useUserActivity } from "../../hooks/useUserActivity";
import { useParams } from "react-router-dom";
import { Flame, Zap } from "lucide-react";

export default function ActivityHeatmap() {
  const { username } = useParams();
  const { data = [], isLoading } = useUserActivity(username || "");

  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // ================= YEARS =================

  const years = useMemo(() => {
    return Array.from(
      new Set(data.map((d) => new Date(d.date).getFullYear())),
    ).sort((a, b) => b - a);
  }, [data]);

  const activeYear = selectedYear ?? years[0];

  // ================= FILTERED + SORTED (PER YEAR) =================

  const filteredData = useMemo(() => {
    if (!activeYear) return [];

    return data
      .filter((d) => new Date(d.date).getFullYear() === activeYear)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
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
      currentStreak: current,
      totalContributions: total,
    };
  }, [filteredData]);

  // ================= GLOBAL CURRENT STREAK =================

  const globalCurrentStreak = useMemo(() => {
    if (!data.length) return 0;

    const activityMap = new Map<string, number>(
      data.map((d) => [d.date.slice(0, 10), d.count]),
    );

    const formatDate = (date: Date) =>
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayKey = formatDate(today);
    const todayCount = activityMap.get(todayKey) ?? 0;

    const bonus = todayCount > 0 ? 1 : 0;

    const currentDate = new Date(today);
    currentDate.setDate(currentDate.getDate() - 1);

    let streak = 0;

    while (true) {
      const key = formatDate(currentDate);
      const count = activityMap.get(key) ?? 0;

      if (count > 0) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak + bonus;
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
      <div className="text-center text-gray-600 p-4 font-semibold text-xl">
        Loading activity...
      </div>
    );
  }

  if (!activeYear || filteredData.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-200 py-6">
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
              className={`px-3 py-1 text-sm font-semibold border border-transparent rounded-lg transition hover:underline ${
                activeYear === year
                  ? "bg-black text-white "
                  : "bg-gray-200 hover:bg-gray-300 hover:border-black"
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
        <span className="flex items-center gap-1">
          <Flame size={16} className="text-orange-500" fill="#FFAC1D" />
          {activeYear} Longest streak: {stats.longestStreak} days
        </span>

        <span className="flex items-center gap-1">
          <Zap size={16} className="text-yellow-500" fill="#FFFD55" />
          Current streak: {globalCurrentStreak} days
        </span>
      </div>
    </section>
  );
}