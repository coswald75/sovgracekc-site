import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sovgracekc.org',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
