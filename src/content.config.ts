import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const pages = defineCollection({
  // File layout: src/content/pages/<lang>/<slug>/index.mdx  ->  id "<lang>/<slug>"
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().min(50).max(165),
    h1: z.string().optional(),
    /** Direct Answer, 50–80 words. Shown in the hero and used for GEO. */
    answer: z.string().refine((s) => { const n = s.trim().split(/\s+/).length; return n >= 50 && n <= 80; }, 'answer must be 50–80 words'),
    kind: z.enum(['pillar', 'spoke', 'article', 'tool', 'legal', 'hub']).default('spoke'),
    /** Page makes health-related statements: adds MedicalWebPage schema + disclaimer. */
    medical: z.boolean().default(false),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    sources: z
      .array(z.object({ title: z.string(), url: z.string().url(), publisher: z.string().optional(), year: z.number().optional() }))
      .default([]),
    /** Language-neutral slugs, e.g. "cannabinoids/cbd". */
    related: z.array(z.string()).default([]),
    howTo: z.array(z.object({ name: z.string(), text: z.string() })).optional(),
    updated: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { pages };
