"use client";
import { twMerge } from "tailwind-merge";

export function MDXEnd({ className, lastModified }: { className?: string; lastModified?: string }) {
  return (
    <footer className={twMerge("border-t py-6 w-full flex flex-col gap-1 text-sm font-ioskeley", className)}>
      {lastModified && <div>最后修改时间：{lastModified}</div>}
      <div>
        本文采用
        <a
          href={"https://creativecommons.org/licenses/by-nc-sa/4.0/"}
          target="_blank"
          rel="noreferrer"
          className={"px-0.5"}
        >
          CC BY-NC-SA 4.0-非商业性使用-相同方式共享 4.0 国际
        </a>
        进行许可
      </div>
      <div>idee by leviegu</div>
      <div>@{new Date().getFullYear()}</div>
    </footer>
  );
}
