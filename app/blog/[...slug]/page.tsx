import { notFound } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { Header } from "@/components/header";
import { components } from "@/components/markdown";
import { MDXEnd } from "@/components/mdx-end";
import { MDXTitle } from "@/components/mdx-title";
import { TableOfContents } from "@/components/table-of-contents";
import { documents } from "@/documents";

const PROSE_CLASSNAME = "prose dark:prose-invert prose-blockquote:not-italic";

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const next = await params;
  const document = documents.find((document) => document.slug.join("/") === next.slug.join("/"));
  if (!document) notFound();
  const { MDXComponent, toc, meta } = document;
  return (
    <>
      <Header className={"px-4 md:0 md:max-w-main mx-auto pb-12"} />
      <div className="w-full grid grid-cols-1 justify-center gap-6 xl:grid-cols-[14rem_auto_14rem]">
        <article
          id="mdx-article"
          className={twMerge("px-4 md:px-0 w-full md:max-w-content mx-auto xl:col-start-2", PROSE_CLASSNAME)}
        >
          <MDXTitle title={meta.title} date={meta.formatDate} />
          <MDXComponent components={components} />
          <MDXEnd lastModified={meta.lastModified} />
        </article>
        <aside className="hidden xl:block w-56 xl:col-start-3">
          <div className="fixed">
            <TableOfContents items={toc} rootId="mdx-article" />
          </div>
        </aside>
      </div>
    </>
  );
}

export function generateStaticParams() {
  return documents.map((document) => ({
    slug: document.slug,
  }));
}
