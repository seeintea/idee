import chokidar from "chokidar";
import { logger } from "rslog";
import { compiledAllMDXFile } from "./compiled.mjs";

const defaultWatcherRef = { current: null };

/**
 * 监听指定文件夹变动执行 mdx 转换为 jsx
 * @param {Object} options
 * @param {string} options.dirPath
 * @param {string} options.outputPath
 * @param {boolean} options.logger
 * @param {Object} options.ref
 * @param {FSWatcher} options.ref.current
 */
export async function startWorker(options) {
  const { dirPath, outputPath, logger: showLogger, ref = defaultWatcherRef } = options;

  if (ref.current) return ref.current;

  const watcher = chokidar.watch(dirPath, {
    persistent: true,
    ignoreInitial: true,
    atomic: true,
    awaitWriteFinish: { stabilityThreshold: 600, pollInterval: 100 },
  });
  logger.start(`watching ${dirPath}`);

  let debounceTimer = null;
  const schedule = () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      compiledAllMDXFile(dirPath, outputPath).catch((err) => logger.error(err));
    }, 600);
  };

  watcher.on("all", (event, filePath) => {
    if (showLogger) logger.info(`${event} ${filePath}`);
    schedule();
  });

  watcher.once("ready", () => {
    logger.ready(`ready ${dirPath}`);
    compiledAllMDXFile(dirPath, outputPath).catch((err) => logger.error(err));
  });

  watcher.on("error", (err) => {
    logger.error(err);
  });

  const stop = async () => {
    try {
      await watcher.close();
    } finally {
      ref.current = null;
      logger.success(`stopped watching ${dirPath}`);
    }
  };

  process.on("SIGINT", stop);
  process.on("SIGTERM", stop);

  ref.current = watcher;

  return watcher;
}

/**
 * 监听指定文件夹变动执行 mdx 转换为 jsx
 * @param {Object} options
 * @param {string} options.dirPath
 * @param {string} options.outputPath
 * @param {string} options.command
 * @param {boolean} options.logger
 * @param {Object} options.ref
 * @param {FSWatcher} options.ref.current
 */
export async function createMdxServer(options) {
  if (options.command === "build") {
    const startBuild = performance.now();
    await compiledAllMDXFile(options.dirPath, options.outputPath);
    logger.success(`build all mdx files in ${(performance.now() - startBuild).toFixed(2)}ms`);
    return null;
  }
  return startWorker(options);
}
