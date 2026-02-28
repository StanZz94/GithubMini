import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 text-center">
      
      {/* 404 Image */}
      <div className="max-w-md mb-8">
        <img
          src="/404decoration.png"
          alt="404 Not Found"
          className="w-full h-auto drop-shadow-xl"
        />
      </div>

      {/* Text */}
      <h1 className="text-5xl font-bold text-gray-800 mb-4">
        404
      </h1>

      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Oops! The page you’re looking for doesn’t exist or may have been moved.
      </p>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-black text-white rounded-xl font-semibold shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}