import type { MetadataRoute } from "next";

import { documents } from "@/documents";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : new URL("http://localhost:3000");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL("/", siteUrl).toString(),
      lastModified: new Date(),
    },
    ...documents.map((document) => {
      const canonicalPath = `/blog/${document.slug.join("/")}`;
      const lastModified = document.meta.lastModifiedISO
        ? new Date(document.meta.lastModifiedISO)
        : new Date(document.meta.date);
      return {
        url: new URL(canonicalPath, siteUrl).toString(),
        lastModified,
      };
    }),
  ];
}
