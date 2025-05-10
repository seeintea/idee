import { Highlight, themes as prismTheme, type PrismTheme } from "prism-react-renderer";

interface CodeRendererProps {
  className?: string;
  themes?: PrismTheme;
  code: string;
  language: string;
}

export default function CodeRenderer(props: CodeRendererProps) {
  const { themes = prismTheme.oneDark, className = "", code, language } = props;

  return (
    <Highlight theme={themes} code={code} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style} className={className}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
