import { twMerge } from "tailwind-merge";

export function MDXTitle({ className, title, date }: { className?: string; title: string; date: string }) {
  return (
    <div className={twMerge("not-prose pb-4 md:pb-10", className)}>
      <div className={"flex font-ioskeley items-center gap-2 text-xs/6 font-medium tracking-widest text-secondary"}>
        {date}
      </div>
      <div className="mt-2 text-3xl font-medium tracking-tight text-primary">{title}</div>
    </div>
  );
}
