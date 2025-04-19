import { Outlet } from "@remix-run/react";

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
