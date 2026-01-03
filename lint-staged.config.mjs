/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  "*.{js,jsx,ts,tsx}": ["biome lint", "prettier --write"],
  "*.{json,md,mdx}": ["prettier --write"],
};
