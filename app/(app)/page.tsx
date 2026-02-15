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
        <Link key={document.id} href={`/blog${document.id}`}>
          <div className="flex items-center justify-between">
            <div className={"font-extrabold text-base"}>{document.meta.title}</div>
            <div className={"text-secondary text-sm"}>{document.meta.formatDate}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
