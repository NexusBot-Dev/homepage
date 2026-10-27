import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const changelogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/changelog" }),
  schema: z.object({
    version: z.string(),
    date: z.date(),
    title: z.string(),
    type: z.enum(['major', 'minor', 'patch']).default('minor'),
  }),
});

export const collections = {
  'changelog': changelogCollection,
};