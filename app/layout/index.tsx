import { Outlet } from "react-router";
import Sidebar from "./sidebar";

export default function Layout() {
  return (
    <Sidebar>
      <main className={"p-5"}>
        <Outlet />
      </main>
    </Sidebar>
  );
}
