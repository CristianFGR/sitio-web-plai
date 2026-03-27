import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

// Si corre en Github Actions, armamos para Github Pages. Si corre local o en otro CI, armamos para Firebase (root)
export default defineConfig({
  site: isGithubActions ? 'https://CristianFGR.github.io' : 'https://plai.cl',
  base: isGithubActions ? '/sitio-web-plai/' : '/',
  integrations: [tailwind(), sitemap()],
});
