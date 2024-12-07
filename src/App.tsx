import { Outlet } from "react-router-dom";
import "./App.css";
import { Header } from "./shared/components/Header/Header";

function App() {
  return (
    <div className="relative">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
