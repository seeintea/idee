import type { Metadata } from "next";
import Script from "next/script";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : new URL("http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: "IDÉE", template: "%s | IDÉE" },
  description: "My personal website.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    title: "IDÉE",
    description: "My personal website.",
    siteName: "IDÉE",
    images: ["/avatar.webp"],
  },
  twitter: {
    card: "summary",
    title: "IDÉE",
    description: "My personal website.",
    creator: "@levie_gu",
    images: ["/avatar.webp"],
  },
  authors: [{ name: "leviegu", url: "https://github.com/seeintea" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={"antialiased py-12"}>
        <Script id="idee-theme" strategy="beforeInteractive">
          {`(function(){try{var k="__idee_theme";var p=localStorage.getItem(k)||"system";var d=p==="dark"||(p==="system"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches);var e=document.documentElement;e.classList.toggle("dark",!!d);e.style.colorScheme=d?"dark":"light";}catch(_){}})();`}
        </Script>
        {children}
      </body>
    </html>
  );
}
