import fs from "node:fs/promises";
import path from "node:path";

export const CONTENT_DIR = path.join(".content", "content");
export const INDEX_FILE = path.join(".content", "index.js");

export function toImportPath(p) {
  return p.split(path.sep).join("/");
}

export async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

export function rewriteRelativeImports(code, originalDir, outputDir) {
  const patterns = [
    /(import\s+[^;]*?\s+from\s+['"])([^'"]+)(['"];?)/g,
    /(import\s+['"])([^'"]+)(['"];?)/g,
    /(export\s+[^;]*?\s+from\s+['"])([^'"]+)(['"];?)/g,
  ];
  let result = code;
  for (const re of patterns) {
    result = result.replace(re, (full, pre, spec, post) => {
      if (!spec.startsWith(".")) return full;
      const abs = path.resolve(originalDir, spec);
      let rel = path.relative(outputDir, abs);
      if (!rel.startsWith(".")) rel = "./" + rel;
      return pre + toImportPath(rel) + post;
    });
  }
  return result;
}

export async function scanMdxFiles(rootDir) {
  const out = [];
  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) {
        await walk(p);
      } else if (e.isFile() && /\.mdx?$/i.test(e.name)) {
        out.push(p);
      }
    }
  }
  await walk(rootDir);
  return out;
}

export function outFileForMdx(mdxPath) {
  const base = path.basename(mdxPath, path.extname(mdxPath));
  return path.join(CONTENT_DIR, `${base}.js`);
}
