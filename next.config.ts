import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  pageExtensions: ["tsx", "mdx", "ts", "md", "js", "jsx"],
  experimental: {
    viewTransition: true,
  },
};

export default createMDX({
  options: {
    rehypePlugins: [
      "rehype-slug",
      [
        "rehype-autolink-headings",
        {
          properties: { className: ["anchor"] },
          behavior: "wrap",
        },
      ],
    ],
  },
})(nextConfig);
