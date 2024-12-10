import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import "./App.css";
import { Header } from "./shared/components/Header/Header";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative">
        <Header />
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}

export default App;
