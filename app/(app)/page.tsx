import Link from "next/link";

import { documents } from "@/document";

export default function Index() {
  return (
    <div className={"flex flex-col gap-4"}>
      {documents.map((document) => (
        <Link key={document.id} href={`/blog${document.id}`}>
          <div>
            <div className={"font-extrabold text-base"}>{document.meta.title}</div>
            <div className={"text-sm text-secondary"}>{document.meta.date}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
