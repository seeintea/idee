import path from "node:path";
import { fileURLToPath } from "node:url";

import { createMdx } from "./start-worker.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let started = false;

export function withMdxWorker(nextConfig = {}, options = {}) {
  const { dir = path.resolve(__dirname, "..", "content") } = options;

  const shouldStart = process.env.NODE_ENV === "development";
  if (shouldStart && !started) {
    started = true;
    createMdx(dir).catch((err) => {
      console.error(err);
    });
  }

  return nextConfig;
}
