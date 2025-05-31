import { Fragment } from "react/jsx-runtime";
import { Outlet } from "react-router";
import GlassmorphismCard from "~/components/glassmorphism-card";
import Space from "~/components/space";
import { Toaster } from "~/components/ui/toaster";
import Sidebar from "./sidebar";
import Header from "./header";

export default function AppLayout() {
  return (
    <Fragment>
      <div className={`w-screen h-screen p-base background`}>
        <Space className={"max-w-[1440px] h-full m-auto"}>
          <Sidebar />
          <Space asChild className={"flex-1 h-full overflow-x-hidden"} direction={"vertical"}>
            <main>
              <Header />
              <GlassmorphismCard className={"w-full flex-1 p-base wrapper-with-scrollbar"}>
                <div className={"content-with-scrollbar"}>
                  <Outlet />
                </div>
              </GlassmorphismCard>
            </main>
          </Space>
        </Space>
      </div>
      <Toaster />
    </Fragment>
  );
}
