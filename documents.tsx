import content from "content";

const { mdx } = content;

const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const lastModifiedFormatOptions: Intl.DateTimeFormatOptions = {
  ...dateTimeFormatOptions,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

export const documents = mdx
  .map((document) => {
    const { file, default: MDXComponent, frontmatter, toc, lastModified } = document;
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

    frontmatter.formatDate = new Date(frontmatter.date).toLocaleDateString("zh-CN", dateTimeFormatOptions);
    if (lastModified) {
      frontmatter.lastModified = new Date(lastModified).toLocaleDateString("zh-CN", lastModifiedFormatOptions);
    }
    return {
      id,
      toc: flatToc,
      meta: frontmatter,
      slug,
      MDXComponent,
    };
  })
  .sort((perv, next) => new Date(next.meta.date).getTime() - new Date(perv.meta.date).getTime());
