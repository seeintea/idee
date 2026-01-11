export default function EOYReviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <article className="prose prose-zinc mx-auto px-6 md:px-0 py-24 lg:max-w-[72ch]">{children}</article>;
}
