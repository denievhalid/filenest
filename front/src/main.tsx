import { App } from "./App.tsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FileProvider } from "@/components/Providers/FileProvider";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <FileProvider>
        <App />
      </FileProvider>
    </QueryClientProvider>
    <Toaster />
  </BrowserRouter>,
);
