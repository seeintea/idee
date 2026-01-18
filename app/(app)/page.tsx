import Link from "next/link";

import { documents } from "@/documents";

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
