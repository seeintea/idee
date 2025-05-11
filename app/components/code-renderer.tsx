import { Highlight, themes } from "prism-react-renderer";
import { GoFileCode, GoCheck } from "react-icons/go";
import { cn } from "~/utils/tailwind";
import { Button } from "./ui/button";
import { useState } from "react";

interface CodeRendererProps {
  className?: string;
  read?: boolean;
  code: string;
  language: string;
}

export default function CodeRenderer(props: CodeRendererProps) {
  const { className = "", code, language, read = false } = props;

  return (
    <Highlight theme={themes.oneDark} code={code} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style} className={cn("relative p-base rounded-xl", className)}>
          {tokens.map((line, idx) => (
            <div key={idx} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
          <CopyButton className={"absolute right-3 top-3"} code={code} read={read} />
        </pre>
      )}
    </Highlight>
  );
}

interface CopyButtonProps {
  code: string;
  className?: string;
  read: boolean;
}

export function CopyButton(props: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const exec = () => {
    navigator.clipboard.writeText(props.code).then(async () => {
      setCopied(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCopied(false);
    });
  };

  if (props.read) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      onClick={exec}
      className={cn("p-1.5 h-auto cursor-pointer hover:bg-[#33373f] hover:text-white", props.className)}
    >
      {copied ? <GoCheck /> : <GoFileCode />}
    </Button>
  );
}
