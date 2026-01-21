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
  ignore: `${process.env.UI_MODE}` === "true", // for ui dev
});

export default withMDX(nextConfig);
