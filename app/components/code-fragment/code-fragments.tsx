import { useState } from "react";
import { cn } from "~/utils/tailwind";
import Space from "~/components/space";
import CopiedButton from "./copied-button";
import CodeFragment from "./code-fragment";
import themeConfig, { type Theme } from "./theme-config";

interface FragmentItem {
  filename: string;
  code: string;
  language: string;
}

interface CodeFragmentsProps {
  theme?: Theme;
  items: FragmentItem[];
  className?: string;
  readonly?: boolean;
}

export default function CodeFragments(props: CodeFragmentsProps) {
  const { items = [], readonly = false, theme = "oneDark", className = "" } = props;

  const {
    fragments: { container, tabs, active },
  } = themeConfig[theme];

  const [fragment, setFragment] = useState(items[0]);

  if (!items.length) {
    return null;
  }
  return (
    <div className={cn("overflow-hidden rounded-xl", className)}>
      <div className={cn("h-10 px-base border-b flex items-center justify-between", container)}>
        <Space className={cn("pt-3.5 gap-3 h-full", tabs)}>
          {items.map((item) => (
            <TabItem
              key={item.filename}
              className={active}
              name={item.filename}
              active={fragment.filename === item.filename}
              onClick={() => setFragment(item)}
            />
          ))}
        </Space>
        <CopiedButton theme={theme} code={fragment.code} readonly={readonly} />
      </div>
      <CodeFragment
        code={fragment.code}
        language={fragment.language}
        className={"rounded-t-none rounded-r-none"}
        readonly={true}
      />
    </div>
  );
}

interface TabItemProps {
  className: string;
  name: string;
  active: boolean;
  onClick: () => void;
}

function TabItem(props: TabItemProps) {
  const { className, name, active, onClick } = props;

  return (
    <button className={cn("h-full cursor-pointer", active ? `${className} border-b` : "")} onClick={onClick}>
      {name}
    </button>
  );
}
