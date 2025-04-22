import { Outlet } from "react-router";

export default function Content() {
  return (
    <main className={"p-3 grow"}>
      <Outlet />
    </main>
  );
}
