import createMDX from "@next/mdx";
import type { CodeHikeConfig } from "codehike/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  pageExtensions: ["tsx", "mdx", "ts", "md", "js", "jsx"],
  experimental: {
    viewTransition: true,
  },
};

const chConfig: CodeHikeConfig = {
  components: { code: "Code" },
};

export default createMDX({
  options: {
    remarkPlugins: [["remark-codehike", chConfig]],
    recmaPlugins: [["recma-codehike", chConfig]],
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
