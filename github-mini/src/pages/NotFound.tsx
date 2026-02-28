import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-800 px-6 text-center">
      
      {/* 404 Image */}
      <div className="w-80 mb-4">
        <img
          src="/404decoration.png"
          alt="404 Not Found"
          className="w-full h-auto drop-shadow-xl"
        />
      </div>

      {/* Text */}
      <p className="text-2xl font-semibold text-gray-200 mb-10 max-w-md">
        Oops! The page you’re looking for doesn’t exist or may have been moved.
      </p>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-gray-200 border-2 border-gray-400 text-black rounded-xl font-semibold shadow-md hover:bg-gray-300 hover:border-white hover:drop-shadow-[0_0_20px_#ffffff] transition-all duration-300"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}