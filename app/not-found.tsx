import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Not Found",
  description: "页面未找到",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="px-4 md:px-0 md:max-w-main mx-auto flex flex-col gap-8">
      <Header />
      <section className="flex flex-col items-start gap-6 py-16">
        <p className="font-ioskeley tabular-nums text-secondary text-sm">404</p>
        <h1 className="text-2xl font-bold text-primary">页面未找到</h1>
        <p className="text-secondary text-sm">你访问的链接可能已经被移除、重命名或暂时不可用。</p>
        <Link
          href="/"
          className="inline-flex items-center h-8 px-3 rounded border border-border bg-background text-sm text-primary transition-colors duration-150 hover:bg-foreground/4 focus-visible:outline-2 focus-visible:outline-offset-4 outline-ring/50"
        >
          回到首页
        </Link>
      </section>
      <Footer />
    </main>
  );
}
