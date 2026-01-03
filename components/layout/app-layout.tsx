import type { PropsWithChildren } from "react";
import GlassmorphismCard from "@/components/glassmorphism-card";
import Space from "@/components/space";
import Header from "./header";
import Sidebar from "./sidebar";

export default function AppLayout(props: PropsWithChildren) {
  return (
    <main className={`w-screen h-screen p-base`}>
      <Space className={"max-w-content h-full m-auto"}>
        <Sidebar />
        <Space asChild className={"flex-1 h-full overflow-x-hidden"} direction={"vertical"}>
          <section>
            <Header />
            <GlassmorphismCard className={"w-full flex-1 p-base wrapper-with-scrollbar"}>
              <div>{props.children}</div>
            </GlassmorphismCard>
          </section>
        </Space>
      </Space>
    </main>
  );
}
