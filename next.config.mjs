import { createMDX } from "./plugins/create-mdx.mjs";

/**
 * @typedef {import('next').NextConfig} NextConfig
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "seeintea.github.io",
        port: "",
        pathname: "/static/images/**",
      },
    ],
  },
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
  // only dev
  // ignore: true,
});

export default withMDX(nextConfig);
