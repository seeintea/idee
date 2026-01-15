import content from "content";

const { mdx } = content;

export const documents = mdx.map((document) => {
  const { file, default: MDXComponent, frontmatter, toc } = document;
  const match = /^\/content(.+)\.mdx$/u.exec(file);
  const id = match ? match[1] : file;
  const slug = id.split("/").slice(1);

  const flatToc: Omit<TocObject, "children">[] = [];
  const visit = (node: TocObject) => {
    const { children, ...rest } = node;
    flatToc.push(rest);
    for (const child of children || []) visit(child);
  };
  for (const node of toc) visit(node);

  return {
    id,
    toc: flatToc,
    meta: frontmatter,
    slug,
    MDXComponent,
  };
});
