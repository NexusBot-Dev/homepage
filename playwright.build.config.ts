import { defineConfig } from '@playwright/test';
import base from './playwright.config';

// Alle E2E-Tests gegen den gebauten Server – inklusive CSP-Tests (die CSP gibt es nur im Build).
export default defineConfig({
  ...base,
  testIgnore: [],
  webServer: {
    command: 'npm run build && node dist/server/entry.mjs',
    url: 'http://127.0.0.1:4321/de/',
    env: { HOST: '127.0.0.1', PORT: '4321' },
    reuseExistingServer: false,
    timeout: 180_000,
  },
});
