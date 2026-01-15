import fs from "node:fs/promises";
import path from "node:path";

/**
 * 查看文件夹是否存在，不存在则创建文件夹
 * @param {string} dir
 */
export async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

/**
 * 查找全部 mdx 文件
 * @param {string} targetPath
 * @return {Promise<string[]>}
 */
export async function findAllMDXFile(targetPath) {
  const list = [];
  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && /\.mdx?$/i.test(entry.name)) {
        list.push(fullPath);
      }
    }
  }
  await walk(targetPath);
  return list;
}

/**
 * 获取打包后的 js 文件地址
 * @param {string} mdxPath
 * @param {string} distPath
 * @return {string}
 */
export function getMDXCompiledPath(mdxPath, distPath) {
  const filename = path.basename(mdxPath, path.extname(mdxPath));
  return path.join(distPath, `${filename}.js`);
}

/**
 * 转换路径格式使其符合 ES 模块规范
 * @param {string} originPath
 * @return {string}
 */
export function getFormatPath(originPath) {
  return originPath.split(path.sep).join("/");
}

/**
 * 生成导出文件
 * @param {object[]} modules
 * @param {string} modules.mdx
 * @param {string} modules.js
 * @param {string} distPath
 */
export async function generateExportFile(modules, distPath) {
  const projectRoot = process.cwd();
  const exportFilePath = path.join(distPath, "index.js");

  const lines = [];
  modules.forEach((m, i) => {
    const relativePath = path.relative(distPath, m.js);
    const formatPath = getFormatPath(relativePath.startsWith(".") ? relativePath : `./${relativePath}`);
    lines.push(`import * as m_${i} from "${formatPath}";`);
  });
  lines.push("");
  lines.push("export default { mdx: [");
  modules.forEach((m, i) => {
    const relativePath = getFormatPath(path.relative(projectRoot, m.mdx));
    lines.push(`  { ...m_${i}, file: "/${relativePath}" },`);
  });
  lines.push("] };");

  await ensureDir(path.dirname(exportFilePath));
  await fs.writeFile(exportFilePath, lines.join("\n"), "utf8");
}
