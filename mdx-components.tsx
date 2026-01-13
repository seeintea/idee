import type { MDXComponents } from "mdx/types";

import { Code } from "@/component/markdown/code";

const components: MDXComponents = {
  Code,
};

export function useMDXComponents(overrideComponents: MDXComponents): MDXComponents {
  return { ...overrideComponents, ...components };
}
