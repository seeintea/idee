import { Outlet } from "react-router";
import Sidebar from "./sidebar";
import Header from "./header";

export default function AppLayout() {
  return (
    <div className={"w-screen h-screen overflow-hidden bg-linear-to-tr from-[#ffffff] to-[#f4f3f8] p-4 flex gap-4"}>
      <Sidebar />
      <main className={"flex-1 flex flex-col gap-4"}>
        <Header />
        <div
          className={"flex-1 rounded-3xl border border-stone-200 backdrop-blur-sm shadow-neumorphic bg-glassmorphism"}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
}
