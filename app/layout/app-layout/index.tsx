import { Fragment } from "react/jsx-runtime";
import { Outlet } from "react-router";
import GlassmorphismCard from "~/components/glassmorphism-card";
import Space from "~/components/space";
import { Toaster } from "~/components/ui/toaster";
import Sidebar from "./sidebar";
import Header from "./header";

const grid =
  "bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]";
const before =
  "before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[radial-gradient(circle_800px_at_100%_200px,#3e3e3e,transparent)]";

export default function AppLayout() {
  return (
    <Fragment>
      <Space className={`w-screen h-screen p-base ${grid} ${before}`}>
        <Sidebar />
        <Space asChild className={"flex-1 h-full"} direction={"vertical"}>
          <main>
            <Header />
            <GlassmorphismCard className={"w-full flex-1 p-base scroll-wrapper"}>
              <div className={"scroll-ctx"}>
                <Outlet />
              </div>
            </GlassmorphismCard>
          </main>
        </Space>
      </Space>
      <Toaster />
    </Fragment>
  );
}
