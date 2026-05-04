# Kyochrono

A static site about **Kyoto Animation**: a works catalogue, decade-based timeline and detailed entries.

Built with [Astro](https://astro.build), typed content collections, and localized routes in **English** and **Spanish**.

## Features

- **Internationalization** (`en`, `es`) with locale-prefixed routes and translated UI copy.
- **Timeline and decade gallery** for exploring the studio’s filmography.
- **Tailwind CSS v4** via Vite; typography via `@fontsource-variable/onest`.
- **Static output** suitable for any static site host.

## Requirements

- [Node.js](https://nodejs.org/) **≥ 22.12.0**
- [pnpm](https://pnpm.io/) (recommended; dependencies align with the project’s pnpm lockfile)

## Setup

```bash
pnpm install
```

## Scripts

| Command        | Description |
| -------------- | ----------- |
| `pnpm dev`     | Local dev server (default [localhost:4321](http://localhost:4321)). |
| `pnpm build`   | Production build to `./dist/`. |
| `pnpm preview` | Serves `./dist/` locally after a build. |
| `pnpm astro`   | Astro CLI (`pnpm astro add`, `pnpm astro check`, etc.). |

To build with your own canonical URL (metadata, sitemap, absolute URLs where applicable):

## Project layout

```text
/
├── public/                 # Static assets
├── src/
│   ├── components/         # Astro UI (gallery, layout, etc.)
│   ├── i18n/               # Strings and locale helpers
│   ├── layouts/
│   ├── pages/              # Routes; localized under `[lang]/`
│   └── utils/
├── astro.config.mjs
└── package.json
```

Most pages live under `src/pages/[lang]/` (home, timeline, works, tags, and related routes).

## References

- [Astro documentation](https://docs.astro.build)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [astro-leaflet](https://github.com/withastro/astro-leaflet)

## License

This repository does not include a `LICENSE` file for now; pending to add one in the future.
