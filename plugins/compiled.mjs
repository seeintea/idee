import fs from "node:fs/promises";
import path from "node:path";
import { compile } from "@mdx-js/mdx";
import rehypeSlug from "rehype-slug";
import { remarkHeadingId } from "remark-custom-heading-id";
import { remarkMdxToc } from "remark-mdx-toc";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { recmaCodeHike, remarkCodeHike } from "codehike/mdx";

import { lastModified } from "./last-modified.mjs";

import { findAllMDXFile, ensureDir, getMDXCompiledPath, generateExportFile } from "./utils.mjs";

/** @typedef {import('codehike/mdx').CodeHikeConfig} CodeHikeConfig */
const chConfig = {
  components: { code: "Code", codeWithTabs: "CodeWithTabs" },
};

/**
 * 将 mdx 文件编译为 js 代码
 * @param {string} content
 * @returns {Promise<string>}
 */
export async function compiled(content) {
  const code = await compile(content, {
    rehypePlugins: [rehypeSlug],
    remarkPlugins: [remarkHeadingId, remarkMdxToc, remarkFrontmatter, remarkMdxFrontmatter, [remarkCodeHike, chConfig]],
    recmaPlugins: [[recmaCodeHike, chConfig]],
  });
  return code;
}

/**
 * 打包指定 mdx 文件
 * @param {string} mdxPath
 * @param {string} distPath
 */
export async function compiledSingleMDXFile(mdxPath, distPath) {
  const content = await fs.readFile(mdxPath, "utf8");
  let code = await compiled(content);
  await ensureDir(distPath);
  const compiledPath = getMDXCompiledPath(mdxPath, distPath);
  code = await lastModified(mdxPath, code);
  await fs.writeFile(compiledPath, String(code), "utf8");
  return { mdx: mdxPath, js: compiledPath };
}

/**
 * 将目标文件文件夹下的 mdx 文件打包
 * @param {string} targetPath
 * @param {string} distPath
 */
export async function compiledAllMDXFile(targetPath, distPath) {
  const mdxFiles = await findAllMDXFile(targetPath);
  const modules = [];
  const originDirname = path.basename(targetPath);
  const mdxDistPath = path.join(distPath, originDirname);
  for (const file of mdxFiles) {
    modules.push(await compiledSingleMDXFile(file, mdxDistPath));
  }
  await generateExportFile(modules, distPath);
  return modules;
}
