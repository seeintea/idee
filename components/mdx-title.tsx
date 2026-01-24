import { twMerge } from "tailwind-merge";

export function MDXTitle({
  className,
  title,
  date,
  tags = [],
}: {
  className?: string;
  title: string;
  date: string;
  tags: string[];
}) {
  return (
    <div className={twMerge("not-prose pb-4 md:pb-10", className)}>
      <div className={"font-ioskeley text-xs/6 font-medium tracking-widest text-secondary"}>{date}</div>
      <div className="mt-2 text-3xl font-medium tracking-tight text-primary">{title}</div>
      <div
        className={"font-ioskeley text-xs/6 font-medium tracking-widest text-secondary mt-2 flex items-center gap-2"}
      >
        {tags.map((tag) => (
          <span key={tag}>{`#${tag}`}</span>
        ))}
      </div>
    </div>
  );
}
