import { useState } from "react";
import CodeRenderer, { CopyButton } from "./code-renderer";
import Space from "./space";
import { cn } from "~/utils/tailwind";

interface CodeRenderTabProps {
  codes: { filename: string; code: string; language: string }[];
  read?: boolean;
}

export default function CodeRenderTab(props: CodeRenderTabProps) {
  const { codes, read = false } = props;
  const [fragment, setFragment] = useState(codes[0]);

  return (
    <div className={"overflow-hidden rounded-xl"}>
      <div
        className={"bg-[#282c34] border-[#393d46] text-white h-10 px-base border-b flex items-center justify-between"}
      >
        <Space className={"pt-3.5 text-[#a1a1aa] gap-3 h-full"}>
          {codes.map((item) => (
            <TabItem
              key={item.filename}
              name={item.filename}
              active={fragment.filename === item.filename}
              change={() => setFragment(item)}
            />
          ))}
        </Space>
        <CopyButton code={fragment.code} read={read} />
      </div>
      <CodeRenderer
        code={fragment.code}
        language={fragment.language}
        className={"rounded-t-none rounded-r-none"}
        read={true}
      />
    </div>
  );
}

interface TabItemProps {
  name: string;
  active: boolean;
  change: () => void;
}

function TabItem(props: TabItemProps) {
  return (
    <div
      className={cn("h-full cursor-pointer", props.active ? "border-b border-white text-white" : "")}
      role="button"
      tabIndex={0}
      onClick={() => props.change()}
      onKeyDown={() => props.change()}
    >
      {props.name}
    </div>
  );
}
