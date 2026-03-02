import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="border-b-2 bg-stone-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
          <img
            src="/gitlogo.png"
            alt="GitHub Mini Logo"
            className="w-18 h-18 inline-block mr-2 drop-shadow-[0_0_20px_#ffffff]"
          />
    

        <h1 className="text-3xl font-extrabold text-gray-400 font-serif">
          GitHub Developer Analytics
        </h1>

        <nav className="flex gap-6 text-lg font-semibold text-gray-400">
          <Link
          to="/"
          className=""
        >
          <img
            src="/back2.png"
            alt="Back Icon"
            className="w-21 h-17 inline-block mr-2 drop-shadow-[0_0_5px_#ffffff] hover:drop-shadow-[0_0_15px_#ffffff]"
          />
        </Link>
        </nav>
      </div>
    </header>
  );
}
