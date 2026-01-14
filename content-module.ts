interface TocObject {
  depth: number;
  value: string;
  attributes: unknown;
  children: TocObject[];
}

type MDXContentProps = {
  components?: import("mdx/types").MDXComponents;
} & Record<string, unknown>;

interface Document {
  file: string;
  default(
    props?: MDXContentProps,
  ): import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<unknown>>;
  frontmatter: Record<string, string>;
  toc: TocObject[];
}

interface ContentModule {
  mdx: Document[];
}

declare module "content" {
  const content: ContentModule;
  export default content;
}
