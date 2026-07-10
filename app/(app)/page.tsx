import type { Metadata } from "next";
import Link from "next/link";

import { documents } from "@/documents";

export const metadata: Metadata = {
  title: "Blog",
  description: "Posts and notes by leviegu.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "IDÉE",
    description: "Posts and notes by leviegu.",
  },
  twitter: {
    card: "summary",
    title: "IDÉE",
    description: "Posts and notes by leviegu.",
    creator: "@levie_gu",
  },
};

export default function Index() {
  return (
    <div className={"flex flex-col gap-4"}>
      {documents.map((document) => (
        <Link
          key={document.id}
          href={`/blog${document.id}`}
          className="group rounded-sm outline-ring/50 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <div className="flex items-baseline justify-between gap-4">
            <div className="font-bold text-base text-primary underline decoration-transparent underline-offset-4 transition-[text-decoration-color,color] duration-150 group-hover:decoration-current">
              {document.meta.title}
            </div>
            <div className="text-secondary text-sm tabular-nums shrink-0 transition-colors duration-150 group-hover:text-primary">
              {document.meta.formatDate}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
