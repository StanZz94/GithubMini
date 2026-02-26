import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="border-b-2 bg-stone-800">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
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

        <h1 className="text-3xl font-extrabold text-gray-400 font-serif">
          GitHub Developer Analytics
        </h1>

        <nav className="flex gap-6 text-lg font-semibold text-gray-400">
          <Link to="/" className="hover:text-white transition hover:drop-shadow-[0_0_25px_#ffffff]">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
