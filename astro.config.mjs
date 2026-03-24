import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Variables inyectadas por GitHub Actions al momento de compilar
const isReleaseBranch = process.env.GITHUB_REF_NAME === 'release';

// https://astro.build/config
export default defineConfig({
  site: isReleaseBranch ? 'https://CristianFGR.github.io' : 'https://plai.cl',
  base: isReleaseBranch ? '/sitio-web-plai' : undefined,
  integrations: [tailwind()],
});
