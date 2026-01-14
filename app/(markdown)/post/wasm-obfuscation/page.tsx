import content from "content";

import { Code } from "@/component/markdown/code";

const { mdx } = content;

const Comp = mdx[1].default;

export default function Page() {
  return (
    <div>
      {/* @ts-ignore */}
      <Comp components={{ Code }} />
    </div>
  );
}
