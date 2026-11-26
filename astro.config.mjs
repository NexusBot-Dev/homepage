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

  // Strikte CSP für Scripts: Astro schreibt pro Seite ein <meta>-Tag mit den Hashes aller eigenen Scripts.
  // Inline-Event-Handler (onclick=…) und eingeschleuste Scripts laufen damit nicht mehr.
  // Gilt zusätzlich zur CSP aus nginx (beide müssen erfüllt sein). Abschalten: csp-Block entfernen.
  security: {
    csp: {
      scriptDirective: {
        resources: ["'self'", 'https://matomo.trynexus.de']
      },
      styleDirective: {
        // style="…"-Attribute und eingebettete Styles bleiben erlaubt – das Risiko liegt bei Scripts
        resources: ["'self'", "'unsafe-inline'"]
      }
    }
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
