import type { Metadata } from "next";

import { Toaster } from "@/component/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "IDÉE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/cn-fontsource-source-han-serif-sc-vf-regular/font.css" />
      </head>
      <body className={"antialiased"}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
