import type { Metadata } from "next";
import Script from "next/script";

import "./globals.css";

export const metadata: Metadata = {
  title: "IDÉE",
  description: "My personal website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={"antialiased py-12"}>
        <Script id="idee-theme" strategy="beforeInteractive">
          {`(function(){try{var k="__idee_theme";var p=localStorage.getItem(k)||"system";var d=p==="dark"||(p==="system"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches);var e=document.documentElement;e.classList.toggle("dark",!!d);e.style.colorScheme=d?"dark":"light";}catch(_){}})();`}
        </Script>
        {children}
      </body>
    </html>
  );
}
