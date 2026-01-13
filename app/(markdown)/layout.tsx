import { Toc } from "@/component/markdown/toc";

export default function MarkdownLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto w-full grid grid-cols-1 gap-10 lg:max-w-[calc(72ch+14rem+2.5rem)] lg:grid-cols-[minmax(0,72ch)_14rem]">
      <article id="markdown-article" className="prose prose-zinc mx-auto px-6 md:px-0 py-24 lg:max-w-[72ch]">
        {children}
      </article>
      <aside className="hidden lg:block w-56">
        <div className="sticky top-42">
          <Toc rootId="markdown-article" />
        </div>
      </aside>
    </div>
  );
}
