import GlassmorphismCard from "~/components/glassmorphism-card";
import Space from "~/components/space";
import { menus } from "~/utils/routes";
import toast from "~/utils/toast";
import SidebarItem from "./sidebar-item";

export default function Sidebar() {
  const onCopied = () => {
    navigator.clipboard.writeText("leviegu@gmail.com").then(() => {
      toast.success("Copied e-mail to clipboard.");
    });
  };

  return (
    <Space asChild direction={"vertical"} className={"w-64 h-full py-base"}>
      <GlassmorphismCard>
        <Space align={"center"} className={"px-base"}>
          <a href="/">
            <img className={"rounded-base w-10 h-10 overflow-hidden border"} src="/images/avatar.jpg" alt="avatar" />
          </a>
          <div>
            <p className={"font-bold text-primary"}>leviegu</p>
            <button className={"text-xs cursor-pointer"} onClick={onCopied}>
              leviegu@gmail.com
            </button>
          </div>
        </Space>
        <div className={"w-full flex-1 pl-base wrapper-with-scrollbar"}>
          <div className={"content-with-scrollbar"}>
            {menus.map((menu) => (
              <SidebarItem key={menu.group} {...menu} />
            ))}
          </div>
        </div>
        <div className={"w-full px-base text-xs"}>
          <div className={"pt-base border-t-1"}>©{new Date().getFullYear()} leviegu</div>
        </div>
      </GlassmorphismCard>
    </Space>
  );
}
