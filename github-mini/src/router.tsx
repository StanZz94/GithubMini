import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/profile/:username",
        element: <Profile />,
      },
    ],
  },
]);
