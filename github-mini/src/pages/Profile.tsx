import { useParams } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useUserRepos } from "../hooks/useUserRepos";
import ProfileAnalytics from "../components/profile/ProfileAnalytics";
import ActivityHeatmap from "../components/profile/ActivityHeatmap";
import UserRepos from "../components/profile/UserRepos";
import { MapPin, Building2, Link, Github } from "lucide-react";

export default function Profile() {
  const { username } = useParams();

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useUser(username || "");

  const { data: repos, isLoading: reposLoading } = useUserRepos(username || "");

  // ================= LOADING =================

  if (userLoading) {
    return (
      <div className="text-center py-20 text-gray-500">Loading profile...</div>
    );
  }

  if (userError || !user) {
    return (
      <div className="text-center py-20 text-red-500">User not found.</div>
    );
  }

  // ================= UI =================

  return (
    <div className="max-w-6xl mx-auto">
      {/* HEADER CARD */}
      <div className="bg-gray-200 rounded-2xl pt-8 px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar */}
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-32 h-32 rounded-full border"
          />

          {/* User Info */}
          <div className="flex-1 space-y-3 text-center md:text-left">
            <div>
              <h1 className="text-3xl font-bold">{user.name || user.login}</h1>
              <p className="text-gray-500">@{user.login}</p>
            </div>

            {user.bio && <p className="text-gray-700">{user.bio}</p>}

            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-600">
              {user.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={16} /> {user.location}
                </span>
              )}

              {user.company && (
                <span className="flex items-center gap-1">
                  <Building2 size={16} /> {user.company}
                </span>
              )}

              {user.blog && (
                <a
                  href={
                    user.blog.startsWith("http")
                      ? user.blog
                      : `https://${user.blog}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  <Link size={16} />
                  Website
                </a>
              )}
            </div>

            <a
              href={`https://github.com/${user.login}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-3 px-5 py-2 bg-black text-white rounded-lg text-sm hover:opacity-90 transition hover:underline"
            >
              <Github size={16} />
              View on GitHub
            </a>
          </div>
        </div>

        <div className="w-full h-0.5 bg-gray-500 my-4"></div>

        <ActivityHeatmap />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <StatCard label="Repositories" value={user.public_repos} />
        <StatCard label="Followers" value={user.followers} />
        <StatCard label="Following" value={user.following} />
        <StatCard
          label="Member Since"
          value={new Date(user.created_at).getFullYear()}
        />
      </div>

      {/* ANALYTICS */}
      {reposLoading && (
        <div className="text-center text-lg font-semibold text-gray-300 mt-12">
          Loading analytics...
        </div>
      )}

      {repos && repos.length > 0 && <ProfileAnalytics repos={repos} />}

      {/* REPOSITORIES */}
      {repos && <UserRepos repos={repos} />}
    </div>
  );
}

/* ================= STAT CARD ================= */

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-gray-200 p-6 rounded-xl shadow text-center">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-gray-500 text-sm mt-1">{label}</p>
    </div>
  );
}