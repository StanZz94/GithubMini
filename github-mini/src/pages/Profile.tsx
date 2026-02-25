import { useParams } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export default function Profile() {
  const { username } = useParams();
  const { data, isLoading, isError } = useUser(username || "");

  if (isLoading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading profile...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-center py-20 text-red-500">
        User not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* HEADER CARD */}
      <div className="bg-white rounded-2xl shadow p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          
          {/* Avatar */}
          <img
            src={data.avatar_url}
            alt={data.login}
            className="w-32 h-32 rounded-full border"
          />

          {/* User Info */}
          <div className="flex-1 space-y-3 text-center md:text-left">
            <div>
              <h1 className="text-3xl font-bold">
                {data.name || data.login}
              </h1>
              <p className="text-gray-500">@{data.login}</p>
            </div>

            {data.bio && (
              <p className="text-gray-700">{data.bio}</p>
            )}

            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-600">
              {data.location && (
                <span>📍 {data.location}</span>
              )}
              {data.company && (
                <span>🏢 {data.company}</span>
              )}
              {data.blog && (
                <a
                  href={data.blog}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  🔗 Website
                </a>
              )}
            </div>

            <a
              href={`https://github.com/${data.login}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-3 px-5 py-2 bg-black text-white rounded-lg text-sm hover:opacity-90 transition"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Repositories" value={data.public_repos} />
        <StatCard label="Followers" value={data.followers} />
        <StatCard label="Following" value={data.following} />
        <StatCard
          label="Member Since"
          value={new Date(data.created_at).getFullYear()}
        />
      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-gray-500 text-sm mt-1">{label}</p>
    </div>
  );
}