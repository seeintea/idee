import Image from "next/image";
import Link from "next/link";
import GlassmorphismCard from "@/components/glassmorphism-card";
import Space from "@/components/space";
import CopiedEmailButton from "./copied-email-button";

export default function Sidebar() {
  return (
    <Space asChild direction={"vertical"} className={"w-64 h-full py-base"}>
      <GlassmorphismCard>
        <Space align={"center"} className={"px-base"}>
          <Link href="/">
            <Image
              width={32}
              height={32}
              className={"rounded-base w-10 h-10 overflow-hidden border"}
              src="/avatar.webp"
              alt="avatar"
            />
          </Link>
          <div>
            <p className={"font-bold text-primary"}>leviegu</p>
            <CopiedEmailButton />
          </div>
        </Space>
        <div className={"w-full flex-1 pl-base wrapper-with-scrollbar"}>
          <div className={"content-with-scrollbar"}>{/* TODO */}</div>
        </div>
        <div className={"w-full px-base text-xs"}>
          <div className={"pt-base border-t"}>©{new Date().getFullYear()} leviegu</div>
        </div>
      </GlassmorphismCard>
    </Space>
  );
}
