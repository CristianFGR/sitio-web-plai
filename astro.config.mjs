import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const isReleaseBranch = process.env.GITHUB_REF_NAME === 'release';

// https://astro.build/config
export default defineConfig({
  site: isReleaseBranch ? 'https://sitio-web-plai.web.app' : 'https://plai.cl',
  integrations: [tailwind(), sitemap()],
});
