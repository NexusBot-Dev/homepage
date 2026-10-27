// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),

  site: 'https://trynexus.de',
  base: '/',
  trailingSlash: 'always',

  build: {
    inlineStylesheets: 'always'
  },

  vite: {
    server: {
      allowedHosts: ['trynexus.de', 'www.trynexus.de']
    },
    preview: {
      allowedHosts: ['trynexus.de', 'www.trynexus.de']
    },
    plugins: [tailwindcss()]
  },

  integrations: [mdx()]
});
