import { type HighlightedCode, highlight, Pre, type RawCode } from "codehike/code";

import { wordWrap } from "./word-wrap";

export async function Code({ codeblock }: { codeblock: RawCode | HighlightedCode }) {
  const highlighted = "tokens" in codeblock ? codeblock : await highlight(codeblock, "github-dark");
  return <Pre code={highlighted} handlers={[wordWrap]} className={"font-ioskeley"} />;
}
