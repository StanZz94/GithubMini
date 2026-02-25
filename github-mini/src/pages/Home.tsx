import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchUsers } from "../hooks/useSearchUsers";

export default function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { data, isLoading, isError } = useSearchUsers(query);

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">
          GitHub Developer Analytics
        </h1>

        <p className="text-gray-600">
          Search for GitHub users and explore their statistics.
        </p>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search GitHub username..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
      />

      {/* Loading */}
      {isLoading && (
        <p className="text-center text-gray-500">Searching...</p>
      )}

      {/* Error */}
      {isError && (
        <p className="text-center text-red-500">
          Something went wrong.
        </p>
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
                <p className="text-sm text-gray-500">
                  View Profile →
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {data && data.length === 0 && query.length > 2 && (
        <p className="text-center text-gray-500">
          No users found.
        </p>
      )}
    </div>
  );
}