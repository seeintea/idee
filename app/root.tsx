import { Links, Meta, Scripts, ScrollRestoration } from "@remix-run/react";

import { LinksFunction, MetaFunction } from "@remix-run/node";

import AppLayout from "~/layout";
import "~/tailwind.css";

export const meta: MetaFunction = () => [
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  { title: "IDÉE" },
];

export const links: LinksFunction = () => [
  {
    rel: "icon",
    type: "image/svg",
    sizes: "64x64",
    href: "/favicon.svg",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <AppLayout />;
}
