/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  "*.{js,jsx,ts,tsx}": [
    "tsc",
    "eslint",
    // "prettier --write",
    "prettier --check"
  ],
  "*.{json,md,mdx}": ["prettier --write"],
};
