import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { queryClient } from "./hooks/react-query/queryClient.ts";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Layout from "./pages/Layout.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>

  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <App />
        </Layout>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  </ThemeProvider>

  // </React.StrictMode>
);
