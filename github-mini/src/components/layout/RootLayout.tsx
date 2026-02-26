import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";


export default function RootLayout() {
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
