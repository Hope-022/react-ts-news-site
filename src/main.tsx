import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from 'react-router'
import "./index.css";
import App from "./App.tsx";
import { RadioProvider } from "./context/RadioProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RadioProvider>
          <App />
        </RadioProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
