/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  "*.{js,jsx,ts,tsx}": ["eslint", "prettier --write"],
  "*.{json,md,mdx}": ["prettier --write"],
};
