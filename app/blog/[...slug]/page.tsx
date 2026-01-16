import { notFound } from "next/navigation";

import { AppHeader } from "@/component/app-header";
import { components } from "@/component/mdx-components";
import { TableOfContents } from "@/component/table-of-contents";
import { documents } from "@/document";

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const next = await params;
  const document = documents.find((document) => document.slug.join("/") === next.slug.join("/"));
  if (!document) notFound();

  const { MDXComponent, toc } = document;

  return (
    <>
      <div className={"max-w-2xl mx-auto py-12"}>
        <AppHeader />
      </div>
      <div className="w-full grid auto-cols-max grid-flow-col justify-center gap-6">
        <div className={"hidden lg:block w-56"}></div>

        <article id="mdx-article" className="prose prose-zinc px-6 md:px-0 max-w-2xl">
          <MDXComponent components={components} />
        </article>

        <aside className="hidden lg:block w-56">
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
