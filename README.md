# IDÉE

A personal website/blog built with the Next.js App Router. Content is written in MDX and compiled during build time into importable modules.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- MDX (custom compile pipeline outputting to `.content/`)
- Biome (lint)

## Development

Install dependencies:

```bash
pnpm install
```

Start the dev server:

```bash
pnpm run dev
```

UI-only dev mode (skips some build-time logic):

```bash
pnpm run dev:ui
```

## Build & Run

Build (compiles `content/` into `.content/` during the build phase):

```bash
pnpm run build
```

Run the production build locally:

```bash
pnpm run start
```

## Quality

```bash
pnpm run lint
pnpm run prettier
```

## Content & Routing

- Posts live in `content/**.mdx`
- The blog uses `/blog/[...slug]` and is generated from the content module via `documents.tsx`
- MDX type declarations are in `content-module.ts`

## Acknowledgements

- Tailwind CSS documentation (some UI/code was copied directly from the docs)
- `last-modified` implementation adapted from [fuma-nama/fuma-content](https://github.com/fuma-nama/fuma-content)
- The `plugins/` pipeline was inspired by [fuma-nama/fuma-content](https://github.com/fuma-nama/fuma-content)
- The `remark-github-alerts` integration was inspired by [hyoban/remark-github-alerts](https://github.com/hyoban/remark-github-alerts)
- AI assistance (some parts were implemented via “vibe coding”)

## License

[MIT](./LICENSE)
