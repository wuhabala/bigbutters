// src/content/config.ts
import { defineCollection, z, reference } from 'astro:content';
import { glob } from 'astro/loaders';

const themeEnum = z.enum(['schiele', 'basquiat', 'haeckel', 'matisse', 'escher']);

// =================================================================
// 专题 · topics/<slug>/index.{md,mdx}
// =================================================================
const topics = defineCollection({
  loader: glob({ pattern: 'topics/*/index.{md,mdx}', base: './src/content' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    theme: themeEnum.default('schiele'),
    status: z.enum(['ongoing', 'planning', 'completed']),
    type: z.enum(['series', 'single']),
    planned_issues: z.number().int().positive().optional(),
    summary: z.string(),
    cover: z.object({
      hero_image: image().optional(),
    }).optional(),
    related_research: z.array(z.string()).optional(),
    started: z.string().regex(/^\d{4}-\d{2}$/, 'YYYY-MM'),
  }),
});

// =================================================================
// 期 · topics/<topic-slug>/<issue-slug>.{md,mdx}
// =================================================================
const issues = defineCollection({
  loader: glob({ pattern: 'topics/*/!(index).{md,mdx}', base: './src/content' }),
  schema: z.object({
    issue: z.number().int().positive(),
    title: z.string(),
    date: z.coerce.date(),
    status: z.enum(['draft', 'published']).default('published'),
    summary: z.string().optional(),
    free_layer: z.boolean().default(false),
  }),
});

// =================================================================
// 研究 · research/<slug>/index.{md,mdx}
// =================================================================
const research = defineCollection({
  loader: glob({ pattern: 'research/*/index.{md,mdx}', base: './src/content' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    theme: themeEnum.default('schiele'),
    status: z.enum(['ongoing', 'dormant']),
    summary: z.string(),
    cover: z.object({
      hero_image: image().optional(),
    }).optional(),
    related_topic: z.string().optional(),
    started: z.string().regex(/^\d{4}-\d{2}$/, 'YYYY-MM'),
  }),
});

// =================================================================
// 研究文章 · research/<research-slug>/<article-slug>.{md,mdx}
// =================================================================
const researchArticles = defineCollection({
  loader: glob({ pattern: 'research/*/!(index).{md,mdx}', base: './src/content' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    length: z.number().int().positive().optional(),
    type: z.string(),
    tags: z.array(z.string()).default([]),
    sources: z.array(z.object({
      title: z.string(),
      author: z.string().optional(),
      year: z.number().int().optional(),
    })).optional(),
  }),
});

export const collections = { topics, issues, research, researchArticles };
