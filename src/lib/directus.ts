import { createDirectus, rest, readSingleton, readItems } from '@directus/sdk';

// Liest die Live-Variable aus dem Docker-Container (process.env) oder import.meta.env
const DIRECTUS_URL = 
  process.env.DIRECTUS_URL || 
  import.meta.env.DIRECTUS_URL || 
  'http://nexus-directus:8055';

export const directus = createDirectus(DIRECTUS_URL).with(rest());
export { readSingleton, readItems };