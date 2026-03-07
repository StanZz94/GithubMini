import { useUserRepos } from "../../hooks/useUserRepos";
import type { GithubRepo } from "../../types/github";    

type Props = {
  username: string;
};

export default function UserRepos({ username }: Props) {
  const { data: repos, isLoading, isError } = useUserRepos(username);

  if (isLoading) {
    return (
      <p className="text-center text-lg text-gray-200 drop-shadow-[0_0_10px_#ffffff] mt-6">
        Loading repositories...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-lg text-red-500 mt-6">
        Failed to load repositories.
      </p>
    );
  }

  if (!repos || repos.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-6">
        No repositories found.
      </p>
    );
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold text-center text-gray-200 mb-6">
        Repositories
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map((repo: GithubRepo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="p-4 bg-gray-300 rounded-xl border-2 border-gray-300 
            hover:border-white hover:drop-shadow-[0_0_10px_#ffffff] transition"
          >
            <h3 className="font-semibold text-lg">{repo.name}</h3>

            {repo.description && (
              <p className="text-sm text-gray-600 mt-1">
                {repo.description}
              </p>
            )}

            <div className="flex gap-4 text-sm text-gray-700 mt-3">
              {repo.language && (
                <span>🟡 {repo.language}</span>
              )}

              <span>⭐ {repo.stargazers_count}</span>

              <span>🍴 {repo.forks_count}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}