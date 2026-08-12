/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  "*.{js,jsx,ts,tsx}": (files) => {
    const sources = files.filter((file) => !file.includes("/crates/") || !file.includes("/pkg/"));
    if (sources.length === 0) return [];
    const paths = sources.map((file) => JSON.stringify(file)).join(" ");
    return [`biome lint ${paths}`, `prettier --write ${paths}`];
  },
  "*.{json,md,mdx}": ["prettier --write"],
};
