import { Toc } from "@/component/toc";
export default function EOYReviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto w-full grid grid-cols-1 gap-10 lg:max-w-[calc(72ch+14rem+2.5rem)] lg:grid-cols-[minmax(0,72ch)_14rem]">
      <article id="eoy-article" className="prose prose-zinc mx-auto px-6 md:px-0 py-24 lg:max-w-[72ch]">
        {children}
      </article>
      <aside className="hidden lg:block w-56">
        <div className="sticky top-42">
          <Toc rootId="eoy-article" />
        </div>
      </aside>
    </div>
  );
}
