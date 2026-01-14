import { notFound } from "next/navigation";

import { documents } from "@/document";
import { components } from "@/mdx-components";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const next = await params;
  const doc = documents.find((d) => d.id === `/post/${next.slug}`);
  if (!doc) notFound();

  const MDXComponent = doc.MDXComponent;
  return <MDXComponent components={components} />;
}

export function generateStaticParams() {
  return documents
    .filter((document) => document.id.startsWith("/post/"))
    .map((document) => ({
      slug: document.id.replace("/post/", ""),
    }));
}
