import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <header className="border-b-2 bg-stone-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LEFT SIDE */}
        <div className="flex items-center">
          <img
            src="/gitlogo.png"
            alt="GitHub Mini Logo"
            className="w-12 h-12 md:w-18 md:h-18 inline-block mr-2 drop-shadow-[0_0_20px_#ffffff]"
          />
        </div>

        {/* TITLE */}
        <h1 className="hidden md:block text-3xl font-extrabold text-gray-400 font-serif">
          GitHub Developer Analytics
        </h1>

        {/* RIGHT SIDE */}
        <nav className="flex gap-6 text-lg font-semibold text-gray-400">
          {!isHome && (
            <Link to="/">
              <img
                src="/back2.png"
                alt="Back Icon"
                className="w-15 h-12 md:w-21 md:h-17 inline-block drop-shadow-[0_0_5px_#ffffff] hover:drop-shadow-[0_0_15px_#ffffff] transition"
              />
            </Link>
          )}
        </nav>
      </div>
      <h1 className="md:hidden text-base pb-2 font-extrabold text-gray-400 text-center font-serif">
          GitHub Developer Analytics
        </h1>
    </header>
  );
}