import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight hover:opacity-80 transition"
        >
          Github-Mini
        </Link>

        <nav className="flex gap-6 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-black transition">
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}
