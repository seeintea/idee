import { highlight, Pre, type RawCode } from "codehike/code";

import { wordWrap } from "./word-wrap";

export async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark");
  return <Pre code={highlighted} handlers={[wordWrap]} />;
}
