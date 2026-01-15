import { createMDX } from "./plugins/create-mdx.mjs";

/**
 * @typedef {import('next').NextConfig} NextConfig
 */
const nextConfig = {
  reactCompiler: true,
  pageExtensions: ["tsx", "ts", "js", "jsx"],
  experimental: {
    viewTransition: true,
  },
};

const withMDX = createMDX({
  dir: "content",
  output: ".content",
  logger: false,
});

export default withMDX(nextConfig);
