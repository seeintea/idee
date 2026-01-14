import fs from "node:fs/promises";
import path from "node:path";
import { compiled } from "./compiled.mjs";
import chokidar from "chokidar";
import { logger } from "rslog";
import {
  CONTENT_DIR,
  INDEX_FILE,
  ensureDir,
  rewriteRelativeImports,
  toImportPath,
  scanMdxFiles,
  outFileForMdx,
} from "./utils.mjs";

export async function compileAndWriteOne(mdxPath) {
  const src = await fs.readFile(mdxPath, "utf8");
  const code = await compiled(src);
  const originalDir = path.dirname(mdxPath);
  await ensureDir(CONTENT_DIR);
  const adjusted = rewriteRelativeImports(String(code), originalDir, CONTENT_DIR);
  const outFile = outFileForMdx(mdxPath);
  await fs.writeFile(outFile, adjusted, "utf8");
  return { mdx: mdxPath, outFile };
}

export async function writeIndex(modules) {
  const projectRoot = process.cwd();
  const indexDir = path.dirname(INDEX_FILE);
  const lines = [];
  modules.forEach((m, i) => {
    const rel = path.relative(indexDir, m.outFile);
    const spec = toImportPath(rel.startsWith(".") ? rel : `./${rel}`);
    lines.push(`import * as p_${i} from "${spec}";`);
  });
  lines.push("");
  lines.push("export default { mdx: [");
  modules.forEach((m, i) => {
    const fileRel = toImportPath(path.relative(projectRoot, m.mdx));
    lines.push(`  { ...p_${i}, file: "/${fileRel}" },`);
  });
  lines.push("] };");
  await ensureDir(path.dirname(INDEX_FILE));
  await fs.writeFile(INDEX_FILE, lines.join("\n"), "utf8");
}

export async function compileAll(dir) {
  const mdxFiles = await scanMdxFiles(dir);
  const modules = [];
  for (const f of mdxFiles) {
    modules.push(await compileAndWriteOne(f));
  }
  await writeIndex(modules);
  return modules;
}

export async function createMdx(dir) {
  await compileAll(dir);
  return startWorker(dir);
}

export async function createMdxIndex(modules) {
  return writeIndex(modules);
}

const defaultWatcherRef = { current: null };
export async function startWorker(dir, watcherRef = defaultWatcherRef) {
  if (watcherRef.current) return watcherRef.current;
  const watcher = chokidar.watch(dir, {
    persistent: true,
    ignoreInitial: true,
    atomic: true,
    awaitWriteFinish: { stabilityThreshold: 600, pollInterval: 100 },
  });
  logger.start(`watching ${dir}`);
  let debounceTimer = null;
  const scheduleAll = () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      compileAll(dir).catch((err) => logger.error(err));
    }, 600);
  };
  watcher.on("all", (event, filePath) => {
    logger.info(`${event} ${filePath}`);
    scheduleAll();
  });
  watcher.once("ready", () => {
    logger.ready(`ready ${dir}`);
    compileAll(dir).catch((err) => logger.error(err));
  });
  watcher.on("error", (err) => {
    logger.error(err);
  });
  const stop = async () => {
    try {
      await watcher.close();
    } finally {
      watcherRef.current = null;
      logger.success(`stopped watching ${dir}`);
    }
  };
  process.on("SIGINT", stop);
  process.on("SIGTERM", stop);
  watcherRef.current = watcher;
  return watcher;
}
