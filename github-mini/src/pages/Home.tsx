import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchUsers } from "../hooks/useSearchUsers";

export default function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { data, isLoading, isError } = useSearchUsers(query);

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="w-80 h-65 mx-auto mb-4 mt-4">
        <img
          src="/octocat.png"
          alt="Search Illustration"
          className="w-full h-auto max-w-md mx-auto drop-shadow-[0_0_20px_#ffffff]"
        />
      </div>
      <p className="text-2xl text-center text-gray-300 mb-1">
        Search for GitHub users and explore their statistics.
      </p>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search GitHub username..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-3 mb-6 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:drop-shadow-[0_0_10px_#ffffff]"
      />

      {/* Loading */}
      {isLoading && <p className="text-center text-gray-500">Searching...</p>}

      {/* Error */}
      {isError && (
        <p className="text-center text-red-500">Something went wrong.</p>
      )}

      {/* Results */}
      {data && data.length > 0 && (
        <div className="space-y-3">
          {data.map((user) => (
            <div
              key={user.id}
              onClick={() => navigate(`/profile/${user.login}`)}
              className="flex items-center gap-4 p-4 bg-white rounded-xl shadow hover:shadow-md cursor-pointer transition"
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-12 h-12 rounded-full"
              />

              <div>
                <p className="font-semibold">{user.login}</p>
                <p className="text-sm text-gray-500">View Profile →</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {data && data.length === 0 && query.length > 2 && (
        <p className="text-center text-gray-500">No users found.</p>
      )}
    </div>
  );
}
