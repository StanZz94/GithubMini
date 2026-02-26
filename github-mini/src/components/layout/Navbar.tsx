import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="border-b border-gray-500 bg-stone-800">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="hover:opacity-80 transition"
        >
          <img
            src="/gitlogo.png"
            alt="GitHub Mini Logo"
            className="w-16 h-16 inline-block mr-2 drop-shadow-[0_0_20px_#ffffff]"
          />
        </Link>

        <nav className="flex gap-6 text-sm font-medium text-gray-400">
          <Link to="/" className="hover:text-white transition">
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}
