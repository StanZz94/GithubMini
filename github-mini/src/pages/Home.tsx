import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchUsers } from "../hooks/useSearchUsers";
import { useSearch } from "../context/SearchContext";
import type { GithubSearchUser } from "../types/github";

export default function Home() {
  const navigate = useNavigate();
  const { search, setSearch } = useSearch();

  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<GithubSearchUser[]>([]);

  const { data, isLoading, isError } = useSearchUsers(search, page);

  // 🔄 Reset when search changes
  useEffect(() => {
    // eslint-disable-next-line
    setPage(1);
  }, [search]);

  // ➕ Append users safely
  useEffect(() => {
    if (!data?.items) return;

    // eslint-disable-next-line
    setUsers((prev) => {
      // If first page → replace
      if (page === 1) return data.items;

      // Prevent duplicates
      const existingIds = new Set(prev.map((u) => u.id));

      const newItems = data.items.filter(
        (user) => !existingIds.has(user.id)
      );

      return [...prev, ...newItems];
    });
  }, [data, page]);

  const hasMore = data
    ? users.length < data.total
    : false;

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      {/* Illustration */}
      <div className="w-80 mx-auto mb-6 mt-4">
        <img
          src="/octocat.png"
          alt="Search Illustration"
          className="w-full h-auto drop-shadow-[0_0_20px_#ffffff]"
        />
      </div>

      <p className="text-2xl text-center text-gray-300 mb-6">
        Search for GitHub users and explore their statistics.
      </p>

      {/* Search Input */}
      <div className="max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search GitHub username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 mb-10 rounded-lg bg-gray-300 
          focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>

      {/* Loading */}
      {isLoading && page === 1 && (
        <p className="text-center text-xl font-semibold text-gray-200">
          Searching...
        </p>
      )}

      {/* Error */}
      {isError && (
        <p className="text-center text-xl font-semibold text-red-500">
          Something went wrong.
        </p>
      )}

      {/* Results */}
      {users.length > 0 && (
        <>
          <h1 className="text-3xl text-center font-semibold text-gray-200 mb-6">
            Search Results
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() =>
                  navigate(`/profile/${user.login}`)
                }
                className="flex items-center gap-4 p-4 bg-gray-300 rounded-xl shadow 
                hover:drop-shadow-[0_0_10px_#ffffff] cursor-pointer transition 
                border-2 border-gray-300 hover:border-white"
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-14 h-14 rounded-full"
                />

                <div>
                  <p className="font-semibold text-lg">
                    {user.login}
                  </p>
                  <p className="text-sm text-gray-600">
                    View Profile →
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-10">
            {hasMore && (
              <button
                onClick={() =>
                  setPage((prev) => prev + 1)
                }
                disabled={isLoading}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg 
                hover:bg-indigo-700 disabled:opacity-50"
              >
                {isLoading ? "Loading..." : "Load More"}
              </button>
            )}

            {page > 1 && (
              <button
                onClick={() => {
                  setPage(1);
                  setUsers([]);
                }}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg 
                hover:bg-gray-600"
              >
                Hide
              </button>
            )}
          </div>
        </>
      )}

      {/* No Results */}
      {data && users.length === 0 && search.length > 2 && (
        <p className="text-center text-gray-500">
          No users found.
        </p>
      )}
    </div>
  );
}