import { useState } from "react";
import type { GithubRepo } from "../../types/github";
import { Star, GitFork, Circle } from "lucide-react";

type Props = {
  repos: GithubRepo[];
};

export default function UserRepos({ repos }: Props) {
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

  const INITIAL_COUNT = 6;

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  if (!repos || repos.length === 0) {
    return (
      <p className="text-center font-semibold text-lg text-gray-300 mt-8">
        No repositories found.
      </p>
    );
  }

  const visibleRepos = repos.slice(0, visibleCount);

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, repos.length));
  };

  const showLess = () => {
    setVisibleCount((prev) => Math.max(prev - 6, INITIAL_COUNT));
  };

  return (
    <div className="mt-28">
      <h2 className="text-4xl text-gray-300 font-bold text-center mb-6">
        Public Repositories
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleRepos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="bg-gray-200 p-4 rounded-xl border-2 border-gray-200
            hover:border-gray-400 hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg">{repo.name}</h3>

            {repo.description && (
              <p className="text-sm text-gray-600 mt-1">{repo.description}</p>
            )}

            <div className="flex gap-4 mt-3 text-sm text-gray-600">
              {repo.language && (
                <span className="flex items-center gap-1">
                  <Circle
                    size={14}
                    fill={languageColors[repo.language] || "#9ca3af"}
                    color={languageColors[repo.language] || "#9ca3af"}
                  />{" "}
                  {repo.language}
                </span>
              )}

              <span className="flex items-center gap-1">
                <Star size={14} fill="#facc15" stroke="#facc15" /> {repo.stargazers_count}
              </span>

              <span className="flex items-center gap-1">
                <GitFork size={14} /> {repo.forks_count}
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        {visibleCount < repos.length && (
          <button
            onClick={showMore}
            className="px-4 py-2 bg-black text-white rounded-lg hover:opacity-90"
          >
            Show More
          </button>
        )}

        {visibleCount > INITIAL_COUNT && (
          <button
            onClick={showLess}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
}
