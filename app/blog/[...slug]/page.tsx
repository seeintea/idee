import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { twMerge } from "tailwind-merge";

import { Header } from "@/components/header";
import { components } from "@/components/markdown";
import { MDXEnd } from "@/components/mdx-end";
import { MDXTitle } from "@/components/mdx-title";
import { TableOfContents } from "@/components/table-of-contents";
import { documents } from "@/documents";

export const dynamicParams = false;

const PROSE_CLASSNAME = "prose dark:prose-invert prose-blockquote:not-italic";

type PageProps = { params: Promise<{ slug: string[] }> | { slug: string[] } };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : new URL("http://localhost:3000");

function getDocumentBySlug(slug: string[]) {
  return documents.find((document) => document.slug.join("/") === slug.join("/"));
}

export default async function Page({ params }: PageProps) {
  const next = await params;
  const document = getDocumentBySlug(next.slug);
  if (!document) notFound();
  const { MDXComponent, toc, meta } = document;
  const canonicalPath = `/blog/${document.slug.join("/")}`;
  const canonicalUrl = new URL(canonicalPath, siteUrl).toString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    ...(meta.description ? { description: meta.description } : {}),
    datePublished: new Date(meta.date).toISOString(),
    ...(meta.lastModifiedISO ? { dateModified: meta.lastModifiedISO } : {}),
    author: { "@type": "Person", name: "leviegu", url: "https://github.com/seeintea" },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    url: canonicalUrl,
  };
  return (
    <>
      <Script id={`ld-blog-${document.slug.join("-")}`} type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
      <Header className={"px-4 md:px-0 md:max-w-main mx-auto pb-12"} />
      <div className="w-full grid grid-cols-1 justify-center gap-6 xl:grid-cols-[14rem_auto_14rem]">
        <article
          id="mdx-article"
          className={twMerge("px-4 md:px-0 w-full md:max-w-content mx-auto xl:col-start-2", PROSE_CLASSNAME)}
        >
          <MDXTitle title={meta.title} date={meta.formatDate} tags={(meta.tags as unknown as string[]) || []} />
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const next = await params;
  const document = getDocumentBySlug(next.slug);
  if (!document) notFound();

  const canonical = `/blog/${document.slug.join("/")}`;
  const { title, description, lastModifiedISO, date } = document.meta;
  const tags = Array.isArray(document.meta.tags) ? document.meta.tags : [];
  const publishedTime = new Date(date).toISOString();
  const modifiedTime = lastModifiedISO || publishedTime;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      authors: ["leviegu"],
      publishedTime,
      modifiedTime,
      tags: tags.length ? tags : undefined,
    },
    twitter: {
      card: "summary",
      title,
      description,
      creator: "@levie_gu",
    },
    alternates: {
      canonical,
    },
    keywords: tags.length ? tags : undefined,
  };
}
