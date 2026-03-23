import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://CristianFGR.github.io',
  base: '/sitio-web-plai',
  integrations: [tailwind(), sitemap()],
});
