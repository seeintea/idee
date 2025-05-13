import { useState } from "react";
import { GoFileCode, GoCheck } from "react-icons/go";
import { Button } from "~/components/ui/button";
import { cn } from "~/utils/tailwind";
import themeConfig, { type Theme } from "./theme-config";

interface CopiedButtonProps {
  className?: string;
  code: string;
  readonly?: boolean;
  theme?: Theme;
}

export default function CopiedButton(props: CopiedButtonProps) {
  const { className = "", code, readonly = false, theme = "oneDark" } = props;
  const { button } = themeConfig[theme];

  const [copied, setCopied] = useState(false);

  const handle = async () => {
    navigator.clipboard.writeText(code).then(async () => {
      setCopied(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCopied(false);
    });
  };

  if (readonly) {
    return null;
  }

  return (
    <Button variant="ghost" onClick={handle} className={cn("p-1.5 h-auto cursor-pointer", button, className)}>
      {copied ? <GoCheck /> : <GoFileCode />}
    </Button>
  );
}
