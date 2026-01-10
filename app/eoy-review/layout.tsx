export default function EOYReviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className={"w-5xl mx-auto py-6"}>{children}</main>;
}
