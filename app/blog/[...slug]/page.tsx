import { notFound } from "next/navigation";

import { components } from "@/component/mdx-components";
import { TableOfContents } from "@/component/table-of-contents";
import { documents } from "@/document";

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const next = await params;
  const document = documents.find((document) => document.slug.join("/") === next.slug.join("/"));
  if (!document) notFound();

  const { MDXComponent, toc } = document;

  return (
    <div className="mx-auto w-full grid grid-cols-1 gap-10 lg:max-w-[calc(72ch+14rem+2.5rem)] lg:grid-cols-[minmax(0,72ch)_14rem]">
      <article id="mdx-article" className="prose prose-zinc mx-auto px-6 md:px-0 py-24 lg:max-w-[72ch]">
        <MDXComponent components={components} />
      </article>
      <aside className="hidden lg:block w-56">
        <div className="sticky top-42">
          <TableOfContents items={toc} rootId="mdx-article" />
        </div>
      </aside>
    </div>
  );
}

export function generateStaticParams() {
  return documents.map((document) => ({
    slug: document.slug,
  }));
}
