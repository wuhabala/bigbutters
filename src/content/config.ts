// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { themeIds } from '../themes/_types';

// Zod enum derived from same `as const` source as TypeScript ThemeId.
// Adding a new theme = update src/themes/_types.ts; this stays in sync.
const themeEnum = z.enum(themeIds);

// =================================================================
// 专题 · topics/<slug>/index.{md,mdx}
//
// type=series: planned_issues 必填（多期专题需要排期可见）
// type=single: planned_issues 不应出现（语义冲突）
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
    // TODO(Task 15): consider migrating to reference('research') once we confirm
    // Astro 5 ID format for our glob loader. For now keep as string array,
    // cross-validate manually in page templates if needed.
    related_research: z.array(z.string()).optional(),
    started: z.string().regex(/^\d{4}-\d{2}$/, 'YYYY-MM'),
  }).superRefine((data, ctx) => {
    if (data.type === 'series' && data.planned_issues === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['planned_issues'],
        message: 'series 类型的专题必须填写 planned_issues',
      });
    }
    if (data.type === 'single' && data.planned_issues !== undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['planned_issues'],
        message: 'single 类型的专题不应填写 planned_issues',
      });
    }
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
    // TODO(Task 15): see related_research comment above re: reference() migration
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
