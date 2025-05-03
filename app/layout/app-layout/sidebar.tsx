import GlassmorphismCard from "~/components/glassmorphism-card";
import Space from "~/components/space";
import { menus } from "~/utils/routes";

import SidebarItem from "./sidebar-item";

export default function Sidebar() {
  return (
    <Space asChild direction={"vertical"} className={"w-64 h-full py-base"}>
      <GlassmorphismCard>
        <Space align={"center"} className={"px-base"}>
          <img className={"rounded-sm w-10 h-10 overflow-hidden border"} src="/images/avatar.jpg" alt="avatar" />
          <div>
            <p className={"font-bold text-primary"}>leviegu</p>
            <p className={"text-xs cursor-pointer"}>leviegu@gmail.com</p>
          </div>
        </Space>
        <div className={"w-full flex-1 overflow-y-auto pl-base pr-base-scroll scrollbar-stable"}>
          {menus.map((menu) => (
            <SidebarItem key={menu.group} {...menu} />
          ))}
        </div>
        <div className={"w-full px-base text-xs"}>
          <div className={"pt-base border-t-1"}>©{new Date().getFullYear()} leviegu</div>
        </div>
      </GlassmorphismCard>
    </Space>
  );
}
