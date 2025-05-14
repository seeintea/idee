import { Highlight, themes as themes$ } from "prism-react-renderer";
import { cn } from "~/utils/tailwind";
import CopiedButton from "./copied-button";
import { type Theme } from "./theme-config";

interface CodeBlockProps {
  className?: string;
  readonly?: boolean;
  theme?: Theme;
  code: string;
  language: string;
}

export default function CodeBlock(props: CodeBlockProps) {
  const { className = "", readonly = false, theme = "oneDark", code, language } = props;

  return (
    <Highlight theme={themes$[theme]} code={code} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style} className={cn("relative p-base rounded-base", className)}>
          {tokens.map((line, idx) => (
            <div key={idx} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
          <CopiedButton className={"absolute right-3 top-3"} code={code} readonly={readonly} theme={theme} />
        </pre>
      )}
    </Highlight>
  );
}
