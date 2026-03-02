import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./router";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SearchProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </SearchProvider>
  </React.StrictMode>,
);
