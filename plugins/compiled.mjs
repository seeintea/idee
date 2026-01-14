import { compile } from "@mdx-js/mdx";
import remarkHeadingId from "remark-heading-id";
import rehypeSlug from "rehype-slug";
import { remarkMdxToc } from "remark-mdx-toc";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { recmaCodeHike, remarkCodeHike } from "codehike/mdx";

const chConfig = {
  components: { code: "Code" },
};

/**
 * 将 mdx 文件编译为 js 代码
 * @param {string} mdxPath
 * @returns {Promise<string>}
 */
export async function compiled(mdxPath) {
  const code = await compile(mdxPath, {
    rehypePlugins: [rehypeSlug],
    remarkPlugins: [remarkHeadingId, remarkMdxToc, remarkFrontmatter, remarkMdxFrontmatter, [remarkCodeHike, chConfig]],
    recmaPlugins: [[recmaCodeHike, chConfig]],
  });
  return code;
}
