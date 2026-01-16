import Image from "next/image";

import { CopiedButton } from "@/component/copied-button";

export function AppHeader() {
  return (
    <header className="flex gap-4 items-center flex-row flex-nowrap">
      <a href="/">
        <Image
          width={50}
          height={50}
          className="border border-border"
          src="/avatar.webp"
          alt="avatar"
          loading="eager"
        />
      </a>
      <div className={"leading-[1.2]"}>
        <p className="font-bold text-lg">leviegu</p>
        <CopiedButton
          className="text-sm cursor-pointer text-secondary"
          copiedText="leviegu@gmail.com"
          afterCopiedMsg="邮箱已复制"
        />
      </div>
    </header>
  );
}
