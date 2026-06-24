# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at http://localhost:4321 (HMR enabled)
npm run build      # Type-check with astro check, then build to dist/
npm run preview    # Preview production build locally
```

There are no tests in this project.

## Deploy

Two separate deployment targets, controlled by the `DEPLOY_TARGET` env var in `astro.config.mjs`:

- **Firebase (production)** — triggered by pushes to `main` via `.github/workflows/firebase-deploy.yml`. Manual: `npm run build && firebase deploy`
- **GitHub Pages (staging)** — triggered by pushes to `release` via `.github/workflows/deploy.yml`. Builds with `DEPLOY_TARGET=pages`, which sets a `/sitio-web-plai/` base path. Uses `gh-pages` branch.

When `DEPLOY_TARGET=pages`, the site base is `/sitio-web-plai/`, so all internal links must be relative or use Astro's `base`-aware helpers to avoid 404s on GitHub Pages.

## Architecture

**Astro v5 + Tailwind v4 static site** — zero client-side JS by default. `astro check && astro build` compiles everything to static HTML in `dist/`.

- `src/layouts/Layout.astro` — base HTML shell; imports `src/styles/global.css`, includes Google Fonts and the webchat widget
- `src/styles/global.css` — Tailwind v4 entry point (`@import "tailwindcss"`) and custom `@theme` tokens
- `src/pages/index.astro` — landing page that assembles all section components in order
- `src/pages/politica-de-privacidad.astro` and `terminos-y-condiciones.astro` — standalone legal pages
- `src/components/` — section-level UI blocks (Hero, Services, Pricing, Casos, Contacto, etc.)

## Tailwind Theme

Custom colors defined in `src/styles/global.css` under `@theme`:

| Token | Hex |
|---|---|
| `plai-primary` | `#0064ff` |
| `plai-secondary` | `#00a7ff` |
| `plai-dark` | `#1b004f` |
| `plai-black` | `#0a0a14` |
| `plai-text` | `#393841` |
| `plai-accent` | `#c8a84e` |
| `plai-cyan` | `#00c9b7` |
| `plai-magenta` | `#e855a0` |
| `plai-purple` | `#7c3aed` |

Always use these tokens rather than arbitrary hex values. The `tailwind.config.mjs` file is no longer used — Tailwind v4 reads config from CSS only.
