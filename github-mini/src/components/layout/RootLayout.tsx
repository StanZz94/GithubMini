import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useImagePreload } from "../../hooks/useImagePreload";

export default function RootLayout() {

  const imagesLoaded = useImagePreload([
    "/gitlogo.png",
    "/back2.png",
    "/octocat.png",
  ]);

  if (!imagesLoaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-700">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
