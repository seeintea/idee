import { withMdxWorker } from "./plugins/create-mdx.mjs";

const nextConfig = {
  reactCompiler: true,
  pageExtensions: ["tsx", "mdx", "ts", "md", "js", "jsx"],
  experimental: {
    viewTransition: true,
  },
};

export default withMdxWorker(nextConfig);
