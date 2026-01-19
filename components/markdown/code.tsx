import { type HighlightedCode, highlight, Pre, type RawCode } from "codehike/code";
import { Activity } from "react";
import { twMerge } from "tailwind-merge";

import { wordWrap } from "./word-wrap";

const CODE_WRAPPER_0_CLASS =
  "font-ioskeley rounded-xl bg-gray-950 in-data-stack:mt-0 in-data-stack:rounded-none in-[figure]:-mx-1 in-[figure]:-mb-1 in-data-stack:[:first-child>&]:rounded-t-xl in-data-stack:[:first-child>&]:*:rounded-t-xl in-data-stack:[:last-child>&]:rounded-b-xl in-data-stack:[:last-child>&]:*:rounded-b-xl";

const CODE_WRAPPER_1_CLASS =
  "rounded-xl p-1 text-sm scheme-dark in-data-stack:rounded-none dark:bg-white/5 dark:inset-ring dark:inset-ring-white/10 in-data-stack:dark:inset-ring-0 not-prose";

const CODE_TITLE_CLASS = "px-3 pt-0.5 pb-1.5 text-xs/5 text-gray-400 dark:text-white/50";

const CODE_PRE_CLASS =
  "*:flex *:*:shrink-0 *:*:grow *:overflow-auto *:rounded-lg *:bg-white/10! *:p-3 dark:*:bg-white/5! **:[.line]:isolate **:[.line]:block **:[.line]:not-last:min-h-lh *:inset-ring *:inset-ring-white/10 dark:*:inset-ring-white/5 *:*:max-w-none";

export async function Code({ codeblock }: { codeblock: RawCode | HighlightedCode }) {
  const highlighted = "tokens" in codeblock ? codeblock : await highlight(codeblock, "one-dark-pro");
  return (
    <div className={CODE_WRAPPER_0_CLASS}>
      <div className={CODE_WRAPPER_1_CLASS}>
        <Activity mode={highlighted.meta ? "visible" : "hidden"}>
          <div className="relative">
            <div className={CODE_TITLE_CLASS}>{highlighted.meta}</div>
          </div>
        </Activity>

        <div className={CODE_PRE_CLASS}>
          <Pre code={highlighted} handlers={[wordWrap]} className={"font-ioskeley"} />
        </div>
      </div>
    </div>
  );
}

export async function CodeWithTabs({ tabs }: { tabs: RawCode[] }) {
  const highlighted = await Promise.all(tabs.map((tab) => highlight(tab, "one-dark-pro")));
  return (
    <div className={twMerge(CODE_WRAPPER_0_CLASS, "flex flex-col")}>
      {tabs.map((tab, idx) => (
        <div key={tab.meta} className={CODE_WRAPPER_1_CLASS}>
          <div className="relative">
            <div className={CODE_TITLE_CLASS}>{highlighted[idx].meta}</div>
          </div>
          <div className={CODE_PRE_CLASS}>
            <Pre code={highlighted[idx]} handlers={[wordWrap]} className={"font-ioskeley"} />
          </div>
        </div>
      ))}
    </div>
  );
}
