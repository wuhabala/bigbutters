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
  // base 指到 topics/，让生成的 ID 是 <slug>/index 而非 topics/<slug>/index。
  // 这样下游 entry.id.split('/')[0] 直接拿到 slug。
  loader: glob({ pattern: '*/index.{md,mdx}', base: './src/content/topics' }),
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
  // 同上：base 到 topics/，ID = <topic-slug>/<issue-slug>
  loader: glob({ pattern: '*/!(index).{md,mdx}', base: './src/content/topics' }),
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
  loader: glob({ pattern: '*/index.{md,mdx}', base: './src/content/research' }),
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
  loader: glob({ pattern: '*/!(index).{md,mdx}', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    length: z.number().int().positive().optional(),
    type: z.string(),
    tags: z.array(z.string()).default([]),
    /** 期次序号 · 与文件名前缀对齐（如 01-foo.md → order: 1）；
     *  研究专题首页按此升序排序，并在列表显示"第 N 期" */
    order: z.number().int().positive().optional(),
    sources: z.array(z.object({
      title: z.string(),
      author: z.string().optional(),
      year: z.number().int().optional(),
    })).optional(),
  }),
});

export const collections = { topics, issues, research, researchArticles };
