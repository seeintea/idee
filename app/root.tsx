import { Links, Meta, Scripts, ScrollRestoration } from "react-router";

import { AppLayout, ErrorBoundary } from "~/layout";

import type { Route } from "./+types/root";
import "./app.css";

export { ErrorBoundary };

export const meta: Route.MetaFunction = () => [
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  { title: "IDÉE" },
];

export const links: Route.LinksFunction = () => [
  {
    rel: "icon",
    type: "image/svg",
    sizes: "64x64",
    href: "/images/favicon.svg",
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
