import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const isGithubPages = process.env.DEPLOY_TARGET === 'pages';

// Si corre en Github Actions (Pages), armamos con base url. Si corre local o en CI de Firebase, armamos para Firebase (root).
export default defineConfig({
  site: isGithubPages ? 'https://CristianFGR.github.io' : 'https://plai.cl',
  base: isGithubPages ? '/sitio-web-plai/' : '/',
  integrations: [tailwind(), sitemap()],
});
