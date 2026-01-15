import Link from "next/link";

import { documents } from "@/document";

export default function Index() {
  return (
    <div className={"flex flex-col gap-4"}>
      {documents.map((document) => (
        <Link key={document.id} href={`/blog${document.id}`}>
          {document.meta.title}
        </Link>
      ))}
    </div>
  );
}
