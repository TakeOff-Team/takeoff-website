import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://takeoff.llc',
  output: 'hybrid',
  adapter: vercel(),
});
