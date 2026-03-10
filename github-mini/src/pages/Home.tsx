import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchUsers } from "../hooks/useSearchUsers";
import { useSearch } from "../context/SearchContext";
import { useDebounce } from "../hooks/useDebounce";
import type { GithubSearchUser } from "../types/github";

export default function Home() {
  const navigate = useNavigate();
  const { search, setSearch } = useSearch();

  const debouncedSearch = useDebounce(search, 400);

  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<GithubSearchUser[]>([]);

  const { data, isLoading, isError } = useSearchUsers(debouncedSearch, page);

  // 🔄 Reset when search changes (debounced)
  useEffect(() => {
    // eslint-disable-next-line
    setPage(1);
    setUsers([]);
  }, [debouncedSearch]);

  // ➕ Append users safely
  useEffect(() => {
    if (!data?.items) return;
    // eslint-disable-next-line
    setUsers((prev) => {
      if (page === 1) return data.items;

      const existingIds = new Set(prev.map((u) => u.id));
      const newItems = data.items.filter((user) => !existingIds.has(user.id));

      return [...prev, ...newItems];
    });
  }, [data, page]);

  const hasMore = data ? users.length < data.total : false;

  const handleClear = () => {
    setSearch("");
    setUsers([]);
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto py-2 md:py-6 px-0 md:px-4">
      {/* Illustration */}
      <div className="w-48 sm:w-64 md:w-80 mx-auto mb-6 mt-4">
        <img
          src="/octocat.png"
          alt="Search Illustration"
          className="w-full h-auto drop-shadow-[0_0_20px_#ffffff]"
        />
      </div>

      <p className="text-xl md:text-2xl text-center text-gray-300 mb-4">
        Search for GitHub users and explore their statistics.
      </p>

      {/* Search Input */}
      <div className="max-w-lg md:max-w-2xl mx-auto relative mb-10">
        <input
          type="text"
          placeholder="Search GitHub username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 md:py-3 pr-12 rounded-lg bg-gray-300 
          focus:outline-none focus:ring-2 focus:ring-white 
          focus:drop-shadow-[0_0_10px_#ffffff]"
        />

        {search && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 
            text-gray-600 hover:text-black text-2xl font-bold transition"
          >
            ✕
          </button>
        )}
      </div>

      {/* Loading */}
      {isLoading && page === 1 && (
        <p className="text-center text-xl font-semibold text-gray-200 drop-shadow-[0_0_10px_#ffffff]">
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
          <h1 className="text-2xl md:text-3xl text-center font-semibold text-gray-200 mb-6">
            Search Results
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-0">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => navigate(`/profile/${user.login}`)}
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
                  <p className="font-semibold text-lg">{user.login}</p>
                  <p className="text-sm text-gray-600">View Profile →</p>
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-8 mt-8 md:mt-12">
            {hasMore && (
              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={isLoading}
                className="px-4 md:px-10 py-1 md:py-2 rounded-xl bg-gray-300 border-2 border-gray-300 
                md:text-lg font-semibold cursor-pointer
                hover:border-white hover:drop-shadow-[0_0_20px_#A4EBFF] 
                transition disabled:opacity-50"
              >
                Load More
              </button>
            )}

            {page > 1 && (
              <button
                onClick={() => {
                  setPage(1);
                  setUsers([]);
                }}
                className="px-4 md:px-10 py-1 md:py-2 rounded-xl bg-gray-300 border-2 border-gray-300 
                md:text-lg font-semibold cursor-pointer
                hover:border-white hover:drop-shadow-[0_0_20px_#FCECBD] 
                transition"
              >
                Show Less
              </button>
            )}
          </div>
        </>
      )}

      {/* No Results */}
      {data && users.length === 0 && search.length > 2 && (
        <p className="text-center text-xl font-semibold text-gray-200 drop-shadow-[0_0_10px_#ffffff]">
          No users found.
        </p>
      )}
    </div>
  );
}