import { x } from "tinyexec";
import path from "node:path";

const cache = new Map();

/**
 * 在转换后的代码中插入最后修改时间
 * @param {string} mdxPath
 * @param {string} code
 * @returns {Promise<string>}
 */
export async function lastModified(mdxPath, code) {
  const cached = cache.get(mdxPath);
  if (cached) return cached;

  let modifiedDate;
  const cwd = process.cwd();
  const out = await x("git", ["log", "-1", '--pretty="%ai"', path.relative(cwd, mdxPath)], {
    nodeOptions: {
      cwd,
    },
  });
  if (out.exitCode !== 0) return code;
  const date = new Date(out.stdout);
  modifiedDate = date.getTime();
  if (isNaN(modifiedDate)) {
    modifiedDate = undefined;
  }
  return `${code}
export const lastModified = ${modifiedDate}`;
}
