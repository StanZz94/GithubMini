import type { GithubRepo } from "../../types/github";

type Props = {
  repos: GithubRepo[];
};

export default function UserRepos({ repos }: Props) {
  if (!repos || repos.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">
        No repositories found.
      </p>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Repositories
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map((repo) => (
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
              <p className="text-sm text-gray-600 mt-1">
                {repo.description}
              </p>
            )}

            <div className="flex gap-4 mt-3 text-sm text-gray-600">
              {repo.language && <span>🟡 {repo.language}</span>}
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}