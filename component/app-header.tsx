import Image from "next/image";

import { CopiedButton } from "@/component/copied-button";

export function AppHeader() {
  return (
    <header className="flex gap-4 items-center flex-row flex-nowrap">
      <a href="/">
        <Image
          width={50}
          height={50}
          className="rounded border border-zinc-200"
          src="/avatar.webp"
          alt="avatar"
          loading="eager"
        />
      </a>
      <div>
        <p className="font-bold text-primary">leviegu</p>
        <CopiedButton className="text-xs cursor-pointer" copiedText="leviegu@gmail.com" afterCopiedMsg="邮箱已复制" />
      </div>
    </header>
  );
}
