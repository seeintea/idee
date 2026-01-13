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
      <body className={"antialiased"}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
