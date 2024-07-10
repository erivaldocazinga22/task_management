import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { RouterProvider } from "react-router-dom";
import { Routers } from "./router";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/quiryClient";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Routers} />
      <ToastContainer />
    </QueryClientProvider>
  </React.StrictMode>,
)
