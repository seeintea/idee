import path from "node:path";

import { createMdxServer } from "./start-worker.mjs";

let started = false;

/**
 * 为 next.js 项目添加 mdx 支持
 * @param {Object} options
 * @param {string} options.dir
 * @param {string} options.output
 * @param {boolean} options.logger
 * @returns {(nextConfig: import('next').NextConfig) => nextConfig}
 */
export function createMDX(options = {}) {
  const { dir = "content", output = ".content", logger = false } = options;

  // https://github.com/vercel/next.js/pull/82654
  // pnpm run dev -> Ctrl + C 之后会再次调用一次 next dev
  // 也许不是这个 pr 引发的，但目前只能到这里结束了
  const [command] = process.argv.slice(2).filter((arg) => !arg.startsWith("-"));
  if (["dev", "start"].includes(command)) {
    return (nextConfig) => nextConfig;
  }

  const dirPath = path.resolve(process.cwd(), dir);
  const outputPath = path.resolve(process.cwd(), output);

  if (!started) {
    started = true;
    createMdxServer({ dirPath, outputPath, logger, command }).catch((err) => {
      console.error(err);
    });
  }

  return (nextConfig) => nextConfig;
}
