import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="bg-slate-600 h-full w-full">
      <NavBar />
      <div className="page bg-slate-700 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}
