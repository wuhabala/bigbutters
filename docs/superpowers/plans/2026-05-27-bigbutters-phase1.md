# 大大黄油 Phase 1 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 搭建大大黄油站点的 Phase 1 外壳——可发布、可在 bigbutters.top 访问、含 4 占位专题 + 3 占位研究 + 6 篇研究文章 + 5 个 Obsidian 模板，验证整套作者→构建→部署流水线。

**Architecture:** Astro 5 静态站 + Markdown/MDX 内容载体 + Svelte 4 交互岛屿 + 主题包系统（席勒完整实现 + 4 个占位主题）+ EdgeOne Pages 自动部署。"专题"与"研究"两条独立内容轨道（各自有主题包，期/文章继承）。

**Tech Stack:** Astro 5、Svelte 4、MDX、TypeScript、Zod、Vitest（仅测交互组件）、pnpm、EdgeOne Pages、GitHub。

**Spec reference:** `docs/superpowers/specs/2026-05-27-bigbutters-design.md`

---

## 文件结构总览

实施过程中创建/修改的关键文件：

```
🪳大大黄油/
├── .gitignore                              [Task 1]
├── astro.config.mjs                        [Task 1]
├── package.json                            [Task 1]
├── tsconfig.json                           [Task 2]
├── public/
│   └── fonts/                              [Task 3]
│       ├── NotoSerifSC-Regular.woff2
│       ├── NotoSerifSC-SemiBold.woff2
│       ├── EBGaramond-Regular.woff2
│       ├── EBGaramond-Italic.woff2
│       └── Caveat-Regular.woff2
├── src/
│   ├── content/
│   │   └── config.ts                       [Task 7]
│   ├── themes/
│   │   ├── _types.ts                       [Task 4]
│   │   ├── index.ts                        [Task 4]
│   │   ├── schiele.ts                      [Task 4]
│   │   ├── basquiat.ts                     [Task 6]
│   │   ├── haeckel.ts                      [Task 6]
│   │   ├── matisse.ts                      [Task 6]
│   │   └── escher.ts                       [Task 6]
│   ├── layouts/
│   │   ├── BaseLayout.astro                [Task 5]
│   │   ├── HomeLayout.astro                [Task 14]
│   │   ├── TopicLayout.astro               [Task 13]
│   │   ├── IssueLayout.astro               [Task 13]
│   │   ├── ResearchLayout.astro            [Task 13]
│   │   └── ArticleLayout.astro             [Task 13]
│   ├── styles/
│   │   ├── reset.css                       [Task 3]
│   │   └── base.css                        [Task 3]
│   ├── components/
│   │   ├── core/
│   │   │   ├── PullQuote.astro             [Task 9]
│   │   │   ├── Footnote.astro              [Task 9]
│   │   │   ├── Divider.astro               [Task 9]
│   │   │   ├── Radar.svelte                [Task 10]
│   │   │   ├── Checker.svelte              [Task 11]
│   │   │   └── ConceptAnchor.svelte        [Task 11]
│   │   ├── chrome/
│   │   │   ├── Header.astro                [Task 12]
│   │   │   ├── Footer.astro                [Task 12]
│   │   │   ├── Nav.astro                   [Task 12]
│   │   │   └── CoverCard.astro             [Task 12]
│   │   └── themes/
│   │       └── schiele/
│   │           ├── ScribbleDivider.astro   [Task 8]
│   │           ├── BloodHighlight.astro    [Task 8]
│   │           ├── HandSignature.astro     [Task 8]
│   │           └── RomanChapter.astro      [Task 8]
│   ├── pages/
│   │   ├── index.astro                     [Task 17]
│   │   ├── about.astro                     [Task 17]
│   │   ├── topics/
│   │   │   ├── index.astro                 [Task 15]
│   │   │   └── [topic]/
│   │   │       ├── index.astro             [Task 15]
│   │   │       └── [issue].astro           [Task 15]
│   │   └── research/
│   │       ├── index.astro                 [Task 16]
│   │       └── [research]/
│   │           ├── index.astro             [Task 16]
│   │           └── [article].astro         [Task 16]
│   └── content/
│       ├── topics/
│       │   ├── regulation-archipelago/     [Task 18]
│       │   ├── inv-culture/                [Task 18]
│       │   ├── road-to-reality/            [Task 18]
│       │   └── aix-education/              [Task 18]
│       └── research/
│           ├── foucault-studies/           [Task 19]
│           ├── aix-literature/             [Task 19]
│           └── ai-ethics-research/         [Task 19]
├── _templates/                             [Task 20]
│   ├── 新建专题.md
│   ├── 新建期.md
│   ├── 新建研究.md
│   ├── 新建研究文章.md
│   └── 组件参考.md
└── tests/                                  [Task 10, 11]
    └── components/
        ├── Radar.test.ts
        ├── Checker.test.ts
        └── ConceptAnchor.test.ts
```

---

## Task 1: 项目初始化 + git + 依赖

**Files:**
- Create: `package.json`, `astro.config.mjs`, `.gitignore`, `README.md`

- [ ] **Step 1: 创建 .gitignore（提前避免污染）**

```gitignore
# Node
node_modules/
.pnpm-store/

# Astro build outputs
dist/
.astro/

# Obsidian
.obsidian/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
pnpm-debug.log*

# Local env
.env
.env.local
.env.*.local

# Editor
.vscode/
.idea/

# Superpowers brainstorm artifacts (transient)
.superpowers/
```

写入 `.gitignore`。

- [ ] **Step 2: 初始化 git 仓库**

```bash
cd "/Users/mac/Library/Mobile Documents/iCloud~md~obsidian/Documents/🪳大大黄油"
git init
git branch -M main
```

- [ ] **Step 3: 创建 package.json**

```json
{
  "name": "bigbutters",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@astrojs/check": "^0.9.4",
    "@astrojs/mdx": "^4.0.0",
    "@astrojs/svelte": "^7.0.0",
    "astro": "^5.0.0",
    "svelte": "^4.2.0",
    "typescript": "^5.5.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "vitest": "^2.0.0",
    "@testing-library/svelte": "^5.0.0",
    "jsdom": "^25.0.0"
  },
  "packageManager": "pnpm@9.0.0",
  "engines": {
    "node": ">=20.0.0"
  }
}
```

写入 `package.json`。

- [ ] **Step 4: 安装依赖**

```bash
cd "/Users/mac/Library/Mobile Documents/iCloud~md~obsidian/Documents/🪳大大黄油"
pnpm install
```

Expected: `node_modules/` + `pnpm-lock.yaml` created, no errors.

- [ ] **Step 5: 创建 astro.config.mjs**

```js
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://bigbutters.top',
  integrations: [
    svelte(),
    mdx(),
  ],
  output: 'static',
  build: {
    format: 'directory',
  },
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});
```

写入 `astro.config.mjs`。

- [ ] **Step 6: 创建 README.md**

```markdown
# 大大黄油 · bigbutters.top

个人交互式学术策展空间。

## 开发

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # 生成 dist/
pnpm check    # 类型 + frontmatter schema 校验
pnpm test     # 运行 vitest 单元测试
```

## 文档

- 设计文档：[`docs/superpowers/specs/2026-05-27-bigbutters-design.md`](docs/superpowers/specs/2026-05-27-bigbutters-design.md)
- 实施计划：[`docs/superpowers/plans/2026-05-27-bigbutters-phase1.md`](docs/superpowers/plans/2026-05-27-bigbutters-phase1.md)

## 部署

GitHub push → EdgeOne Pages 自动构建 → bigbutters.top。
```

写入 `README.md`。

- [ ] **Step 7: 验证 Astro 能跑（最小验证）**

创建临时 `src/pages/index.astro`：
```astro
---
---
<html><body><h1>bigbutters dev OK</h1></body></html>
```

```bash
pnpm dev
```

Expected: 终端出 `Local: http://localhost:4321/`，浏览器打开看到 "bigbutters dev OK"。

杀掉 dev server，删掉临时 `src/pages/index.astro`（避免干扰后续 Task 17）。

- [ ] **Step 8: 首次提交**

```bash
git add -A
git commit -m "chore: 项目初始化 Astro 5 + Svelte + MDX + pnpm"
```

---

## Task 2: TypeScript 配置 + path aliases

**Files:**
- Create: `tsconfig.json`, `src/env.d.ts`

- [ ] **Step 1: 创建 tsconfig.json**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@layouts/*":    ["src/layouts/*"],
      "@themes/*":     ["src/themes/*"],
      "@themes":       ["src/themes/index.ts"],
      "@styles/*":     ["src/styles/*"],
      "@content/*":    ["src/content/*"]
    }
  },
  "include": [".astro/types.d.ts", "**/*", "tests/**/*"],
  "exclude": ["dist", "node_modules"]
}
```

写入 `tsconfig.json`。

- [ ] **Step 2: 创建 src/env.d.ts**

```ts
/// <reference path="../.astro/types.d.ts" />
```

写入 `src/env.d.ts`。

- [ ] **Step 3: 验证类型检查能跑**

```bash
pnpm check
```

Expected: 类型检查通过（暂时无内容时会报"no pages"之类，但不会有类型错误）。

- [ ] **Step 4: 提交**

```bash
git add tsconfig.json src/env.d.ts
git commit -m "feat: TypeScript 配置 + path aliases (@components / @layouts / @themes / @styles)"
```

---

## Task 3: 自托管字体 + 基础样式

**Files:**
- Create: `public/fonts/` (5 woff2 files)
- Create: `src/styles/reset.css`, `src/styles/base.css`

- [ ] **Step 1: 下载字体（手动）**

下载以下字体的 woff2 格式（subset 化以减小体积），放进 `public/fonts/`：

| 文件 | 来源 |
|---|---|
| `NotoSerifSC-Regular.woff2` | Google Fonts（subset 仅 GB2312 常用字 + 拉丁） |
| `NotoSerifSC-SemiBold.woff2` | Google Fonts |
| `EBGaramond-Regular.woff2` | Google Fonts |
| `EBGaramond-Italic.woff2` | Google Fonts |
| `Caveat-Regular.woff2` | Google Fonts |

获取方式（推荐）：在 `https://fonts.google.com/` 选字体 → 选 woff2 → 下载。或用 `google-webfonts-helper` 工具批量获取 subset。

注意：Noto Serif SC 不 subset 时单个 weight ~7MB，subset 后 ~1MB。

- [ ] **Step 2: 创建 reset.css**

```css
/* src/styles/reset.css */
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }
html, body { height: 100%; }
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
img, picture, video, canvas, svg { display: block; max-width: 100%; }
input, button, textarea, select { font: inherit; }
p, h1, h2, h3, h4, h5, h6 { overflow-wrap: break-word; }
a { color: inherit; text-decoration: none; }
ul, ol { list-style: none; padding: 0; }
```

写入 `src/styles/reset.css`。

- [ ] **Step 3: 创建 base.css（含 font-face + 排版默认）**

```css
/* src/styles/base.css */

/* ============ font-face ============ */
@font-face {
  font-family: 'Noto Serif SC';
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url('/fonts/NotoSerifSC-Regular.woff2') format('woff2');
}
@font-face {
  font-family: 'Noto Serif SC';
  font-weight: 600;
  font-style: normal;
  font-display: swap;
  src: url('/fonts/NotoSerifSC-SemiBold.woff2') format('woff2');
}
@font-face {
  font-family: 'EB Garamond';
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url('/fonts/EBGaramond-Regular.woff2') format('woff2');
}
@font-face {
  font-family: 'EB Garamond';
  font-weight: 400;
  font-style: italic;
  font-display: swap;
  src: url('/fonts/EBGaramond-Italic.woff2') format('woff2');
}
@font-face {
  font-family: 'Caveat';
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url('/fonts/Caveat-Regular.woff2') format('woff2');
}

/* ============ root tokens (默认 = 席勒) ============ */
:root {
  --bg:           #ece1cf;
  --bg-soft:      #f1e8d6;
  --bg-deep:      #e0d4bc;
  --ink:          #2a1a14;
  --ink-soft:     #5d4a3e;
  --ink-faint:    #8b7d6c;
  --accent:       #7a2820;
  --accent-soft:  #a8463a;
  --ochre:        #8b6438;
  --rule:         #c5b59c;

  --font-serif:   'Noto Serif SC', 'EB Garamond', Georgia, serif;
  --font-sans:    'Inter', 'Noto Sans SC', -apple-system, sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
  --font-script:  'Caveat', cursive;

  --content-max:  760px;
}

/* ============ typography defaults ============ */
body {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-serif);
  font-size: 17px;
  line-height: 1.85;
}
h1 { font-size: clamp(44px, 7vw, 72px); line-height: 1.05; font-weight: 600; letter-spacing: -0.01em; }
h2 { font-size: clamp(28px, 4vw, 40px); line-height: 1.15; font-weight: 600; }
h3 { font-size: 24px; line-height: 1.3; font-weight: 600; }
p  { margin-bottom: 22px; }
em { font-style: italic; }
strong { font-weight: 600; }

blockquote {
  border-left: 2px solid var(--accent);
  padding: 4px 16px;
  margin: 24px 0;
  font-style: italic;
  font-size: 16px;
  color: var(--ink-soft);
}
hr {
  border: 0;
  height: 1px;
  background: var(--rule);
  margin: 32px 0;
}
a {
  border-bottom: 1px solid var(--accent);
  padding-bottom: 1px;
}
a:hover { color: var(--accent); }

/* ============ responsive ============ */
@media (max-width: 640px) {
  body { font-size: 16px; line-height: 1.75; }
  blockquote { font-size: 15px; }
}
```

写入 `src/styles/base.css`。

- [ ] **Step 4: 提交**

```bash
git add public/fonts/ src/styles/
git commit -m "feat: 自托管字体（Noto Serif SC / EB Garamond / Caveat）+ reset + 席勒基础排版"
```

---

## Task 4: 主题包系统 + 席勒完整实现 + registry

**Files:**
- Create: `src/themes/_types.ts`, `src/themes/index.ts`, `src/themes/schiele.ts`

- [ ] **Step 1: 创建 _types.ts**

```ts
// src/themes/_types.ts

export interface ThemeTokens {
  bg: string;
  bgSoft: string;
  bgDeep: string;
  ink: string;
  inkSoft: string;
  inkFaint: string;
  accent: string;
  accentSoft: string;
  ochre: string;
  rule: string;
}

export interface ThemeFonts {
  serif?: string;
  sans?: string;
  script?: string;
}

export interface ThemePack {
  /** Slug (matches frontmatter `theme` field) */
  id: string;
  /** Human-readable 中文名 */
  name: string;
  /** CSS variable values */
  tokens: ThemeTokens;
  /** Optional font overrides; falls back to base.css 默认 */
  fonts?: ThemeFonts;
  /** Whitelist of decorative components allowed under this theme */
  decorativeComponents: string[];
  /** Optional CSS class to inject on <body> */
  classOverrides?: string;
  /** Extra fonts to preload when this theme is active */
  preloadFonts?: string[];
}

export type ThemeId =
  | 'schiele'
  | 'basquiat'
  | 'haeckel'
  | 'matisse'
  | 'escher';
```

写入 `src/themes/_types.ts`。

- [ ] **Step 2: 创建 schiele.ts（完整实现）**

```ts
// src/themes/schiele.ts
import type { ThemePack } from './_types';

export const schiele: ThemePack = {
  id: 'schiele',
  name: '席勒',
  tokens: {
    bg:          '#ece1cf',
    bgSoft:      '#f1e8d6',
    bgDeep:      '#e0d4bc',
    ink:         '#2a1a14',
    inkSoft:     '#5d4a3e',
    inkFaint:    '#8b7d6c',
    accent:      '#7a2820',
    accentSoft:  '#a8463a',
    ochre:       '#8b6438',
    rule:        '#c5b59c',
  },
  fonts: {
    serif:  "'Noto Serif SC', 'EB Garamond', Georgia, serif",
    script: "'Caveat', cursive",
  },
  decorativeComponents: [
    'ScribbleDivider',
    'BloodHighlight',
    'HandSignature',
    'RomanChapter',
  ],
  classOverrides: 'theme-schiele',
  preloadFonts: [
    '/fonts/Caveat-Regular.woff2',
  ],
};
```

写入 `src/themes/schiele.ts`。

- [ ] **Step 3: 创建 registry index.ts（暂时只挂 schiele，占位主题 Task 6 再加）**

```ts
// src/themes/index.ts
import type { ThemePack, ThemeId } from './_types';
import { schiele } from './schiele';

export const themes: Record<ThemeId, ThemePack> = {
  schiele,
  // basquiat, haeckel, matisse, escher 等占位主题在 Task 6 加入
  basquiat: schiele,   // 暂时全部 fallback 到 schiele，Task 6 覆盖
  haeckel:  schiele,
  matisse:  schiele,
  escher:   schiele,
};

export function getTheme(id: ThemeId | undefined): ThemePack {
  return themes[id ?? 'schiele'] ?? schiele;
}

export function tokensToCss(tokens: ThemePack['tokens']): string {
  const kebab = (s: string) => s.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
  return Object.entries(tokens)
    .map(([k, v]) => `--${kebab(k)}: ${v};`)
    .join(' ');
}

export type { ThemePack, ThemeId, ThemeTokens } from './_types';
```

写入 `src/themes/index.ts`。

- [ ] **Step 4: 验证可导入（不报类型错）**

```bash
pnpm check
```

Expected: 无类型错误（可能仍有"no pages"警告，忽略）。

- [ ] **Step 5: 提交**

```bash
git add src/themes/
git commit -m "feat: 主题包系统 + 席勒完整实现 + registry (tokensToCss, getTheme)"
```

---

## Task 5: BaseLayout（主题注入机制）

**Files:**
- Create: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: 创建 BaseLayout.astro**

```astro
---
// src/layouts/BaseLayout.astro
import { getTheme, tokensToCss, type ThemeId } from '@themes';
import '@styles/reset.css';
import '@styles/base.css';

export interface Props {
  title: string;
  description?: string;
  theme?: ThemeId;
  /** OG image absolute or relative URL */
  ogImage?: string;
}

const { title, description = '大大黄油 · 交互式学术策展空间', theme, ogImage } = Astro.props;
const pack = getTheme(theme);
const cssVars = tokensToCss(pack.tokens);
const fontFamilyOverride = [
  pack.fonts?.serif  ? `--font-serif: ${pack.fonts.serif};` : '',
  pack.fonts?.sans   ? `--font-sans: ${pack.fonts.sans};` : '',
  pack.fonts?.script ? `--font-script: ${pack.fonts.script};` : '',
].filter(Boolean).join(' ');
const ogImageUrl = ogImage ? new URL(ogImage, Astro.site).toString() : null;
---
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} · 大大黄油</title>
  {description && <meta name="description" content={description} />}

  {/* OG / 社交分享 */}
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="大大黄油" />
  {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}

  {/* 字体预加载（核心 + 主题特有） */}
  <link rel="preload" href="/fonts/NotoSerifSC-Regular.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/fonts/EBGaramond-Regular.woff2" as="font" type="font/woff2" crossorigin />
  {pack.preloadFonts?.map(href => (
    <link rel="preload" href={href} as="font" type="font/woff2" crossorigin />
  ))}

  {/* 主题 CSS 变量注入 */}
  <style is:inline set:html={`:root { ${cssVars} ${fontFamilyOverride} }`}></style>
</head>
<body class={pack.classOverrides ?? ''} data-theme={pack.id}>
  <slot />
</body>
</html>
```

写入 `src/layouts/BaseLayout.astro`。

- [ ] **Step 2: 类型检查**

```bash
pnpm check
```

Expected: 无类型错误。

- [ ] **Step 3: 提交**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: BaseLayout · 主题 CSS 变量注入 + 字体预加载 + OG meta"
```

---

## Task 6: 4 个占位主题包

**Files:**
- Create: `src/themes/basquiat.ts`, `src/themes/haeckel.ts`, `src/themes/matisse.ts`, `src/themes/escher.ts`
- Modify: `src/themes/index.ts`

每个占位主题只提供最小可工作 token 集（bg + ink + accent + 字体），让首页缩略图能渲染。完整装饰组件留到该主题首次启用时再做。

- [ ] **Step 1: 创建 basquiat.ts（最小占位）**

```ts
// src/themes/basquiat.ts
import type { ThemePack } from './_types';

export const basquiat: ThemePack = {
  id: 'basquiat',
  name: 'Basquiat',
  tokens: {
    bg:          '#f8d12b',
    bgSoft:      '#fae27b',
    bgDeep:      '#e8c020',
    ink:         '#0a0a0a',
    inkSoft:     '#2a2a2a',
    inkFaint:    '#555555',
    accent:      '#c43838',
    accentSoft:  '#e85a5a',
    ochre:       '#1a4ba8',
    rule:        '#0a0a0a',
  },
  fonts: {
    serif:  "'Permanent Marker', 'Noto Serif SC', cursive",
    script: "'Permanent Marker', cursive",
  },
  decorativeComponents: [],  // 占位 · 等首次启用时补
  classOverrides: 'theme-basquiat',
};
```

- [ ] **Step 2: 创建 haeckel.ts**

```ts
// src/themes/haeckel.ts
import type { ThemePack } from './_types';

export const haeckel: ThemePack = {
  id: 'haeckel',
  name: 'Haeckel',
  tokens: {
    bg:          '#f0e7d0',
    bgSoft:      '#f4ecda',
    bgDeep:      '#e6dcc0',
    ink:         '#1a2842',
    inkSoft:     '#3d4860',
    inkFaint:    '#6d7488',
    accent:      '#8b6438',
    accentSoft:  '#a87c4a',
    ochre:       '#1a2842',
    rule:        '#c8bba1',
  },
  fonts: {
    serif: "'EB Garamond', 'Noto Serif SC', serif",
  },
  decorativeComponents: [],
  classOverrides: 'theme-haeckel',
};
```

- [ ] **Step 3: 创建 matisse.ts**

```ts
// src/themes/matisse.ts
import type { ThemePack } from './_types';

export const matisse: ThemePack = {
  id: 'matisse',
  name: 'Matisse',
  tokens: {
    bg:          '#faf6ee',
    bgSoft:      '#fffaef',
    bgDeep:      '#f0e9d8',
    ink:         '#1a1614',
    inkSoft:     '#3d3530',
    inkFaint:    '#7d7670',
    accent:      '#d63a3a',
    accentSoft:  '#e85e5e',
    ochre:       '#2e74b5',
    rule:        '#e0d8c8',
  },
  fonts: {
    serif: "'Noto Serif SC', serif",
  },
  decorativeComponents: [],
  classOverrides: 'theme-matisse',
};
```

- [ ] **Step 4: 创建 escher.ts**

```ts
// src/themes/escher.ts
import type { ThemePack } from './_types';

export const escher: ThemePack = {
  id: 'escher',
  name: 'Escher',
  tokens: {
    bg:          '#ece6dc',
    bgSoft:      '#f0eadf',
    bgDeep:      '#dfd8cb',
    ink:         '#14100a',
    inkSoft:     '#3a342a',
    inkFaint:    '#75706a',
    accent:      '#14100a',
    accentSoft:  '#3a342a',
    ochre:       '#5a5550',
    rule:        '#c8c0b0',
  },
  fonts: {
    serif: "'Inter', 'Noto Serif SC', sans-serif",
  },
  decorativeComponents: [],
  classOverrides: 'theme-escher',
};
```

- [ ] **Step 5: 更新 registry index.ts**

```ts
// src/themes/index.ts
import type { ThemePack, ThemeId } from './_types';
import { schiele } from './schiele';
import { basquiat } from './basquiat';
import { haeckel } from './haeckel';
import { matisse } from './matisse';
import { escher } from './escher';

export const themes: Record<ThemeId, ThemePack> = {
  schiele,
  basquiat,
  haeckel,
  matisse,
  escher,
};

export function getTheme(id: ThemeId | undefined): ThemePack {
  return themes[id ?? 'schiele'] ?? schiele;
}

export function tokensToCss(tokens: ThemePack['tokens']): string {
  const kebab = (s: string) => s.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
  return Object.entries(tokens)
    .map(([k, v]) => `--${kebab(k)}: ${v};`)
    .join(' ');
}

export type { ThemePack, ThemeId, ThemeTokens } from './_types';
```

覆盖原 `src/themes/index.ts`。

- [ ] **Step 6: 类型检查**

```bash
pnpm check
```

Expected: 无类型错误。

- [ ] **Step 7: 提交**

```bash
git add src/themes/
git commit -m "feat: 4 个占位主题包 (basquiat / haeckel / matisse / escher) 含最小可工作 token"
```

---

## Task 7: Content Collections + 4 个 Zod schema

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/.gitkeep`（保留空目录用）

- [ ] **Step 1: 创建 src/content/config.ts**

```ts
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
```

写入 `src/content/config.ts`。

- [ ] **Step 2: 创建 .gitkeep**

```bash
mkdir -p "/Users/mac/Library/Mobile Documents/iCloud~md~obsidian/Documents/🪳大大黄油/src/content/topics"
mkdir -p "/Users/mac/Library/Mobile Documents/iCloud~md~obsidian/Documents/🪳大大黄油/src/content/research"
touch "/Users/mac/Library/Mobile Documents/iCloud~md~obsidian/Documents/🪳大大黄油/src/content/topics/.gitkeep"
touch "/Users/mac/Library/Mobile Documents/iCloud~md~obsidian/Documents/🪳大大黄油/src/content/research/.gitkeep"
```

- [ ] **Step 3: 验证 schema 编译**

```bash
pnpm check
```

Expected: 无类型错误（content collection 还没内容也不会报错）。

- [ ] **Step 4: 提交**

```bash
git add src/content/
git commit -m "feat: Content Collections · 4 个 Zod schema (topics/issues/research/researchArticles)"
```

---

## Task 8: 席勒装饰组件（4 个）

**Files:**
- Create: `src/components/themes/schiele/ScribbleDivider.astro`
- Create: `src/components/themes/schiele/BloodHighlight.astro`
- Create: `src/components/themes/schiele/HandSignature.astro`
- Create: `src/components/themes/schiele/RomanChapter.astro`

- [ ] **Step 1: ScribbleDivider.astro**

```astro
---
// src/components/themes/schiele/ScribbleDivider.astro
// 颤抖手绘风分隔线
---
<svg class="scribble-divider" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
  <path d="M 4 6 Q 20 2, 40 6 T 80 6 T 120 6 T 160 6 T 196 6"
        fill="none" stroke="var(--accent)" stroke-width="1.2" stroke-linecap="round"/>
</svg>
<style>
  .scribble-divider {
    width: 100%; height: 12px;
    margin: 32px auto;
    max-width: 200px;
    display: block;
    opacity: 0.75;
  }
</style>
```

- [ ] **Step 2: BloodHighlight.astro**

```astro
---
// src/components/themes/schiele/BloodHighlight.astro
// 血红下划线高亮
---
<span class="blood-highlight"><slot /></span>
<style>
  .blood-highlight {
    background: linear-gradient(180deg, transparent 65%, var(--accent-soft) 65%);
    padding: 0 2px;
    color: var(--ink);
  }
</style>
```

- [ ] **Step 3: HandSignature.astro**

```astro
---
// src/components/themes/schiele/HandSignature.astro
export interface Props {
  name?: string;
  rotate?: number;
}
const { name = '大大黄油', rotate = -2 } = Astro.props;
---
<div class="hand-signature" style={`transform: rotate(${rotate}deg)`}>
  — {name}
</div>
<style>
  .hand-signature {
    font-family: var(--font-script);
    font-size: 18px;
    color: var(--accent);
    margin: 24px 0 0 0;
    text-align: right;
    display: inline-block;
    width: 100%;
  }
</style>
```

- [ ] **Step 4: RomanChapter.astro**

```astro
---
// src/components/themes/schiele/RomanChapter.astro
export interface Props {
  num: number;
}
const { num } = Astro.props;

const toRoman = (n: number): string => {
  const lookup: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let result = '';
  for (const [val, sym] of lookup) {
    while (n >= val) { result += sym; n -= val; }
  }
  return result;
};
---
<div class="roman-chapter">{toRoman(num)}.</div>
<style>
  .roman-chapter {
    font-family: 'EB Garamond', serif;
    font-size: 56px;
    line-height: 1;
    color: var(--ochre);
    font-weight: 400;
    margin: 32px 0 8px 0;
  }
</style>
```

- [ ] **Step 5: 验证编译**

```bash
pnpm check
```

Expected: 无错误。

- [ ] **Step 6: 提交**

```bash
git add src/components/themes/schiele/
git commit -m "feat: 席勒装饰组件 · ScribbleDivider / BloodHighlight / HandSignature / RomanChapter"
```

---

## Task 9: 核心 Astro 组件（PullQuote / Footnote / Divider）

**Files:**
- Create: `src/components/core/PullQuote.astro`
- Create: `src/components/core/Footnote.astro`
- Create: `src/components/core/Divider.astro`

- [ ] **Step 1: PullQuote.astro**

```astro
---
// src/components/core/PullQuote.astro
export interface Props {
  source?: string;
}
const { source } = Astro.props;
---
<blockquote class="pull-quote">
  <p><slot /></p>
  {source && <cite class="pull-quote-source">— {source}</cite>}
</blockquote>
<style>
  .pull-quote {
    border-left: 2px solid var(--accent);
    padding: 12px 20px;
    margin: 32px 0;
    font-style: italic;
    font-size: 18px;
    line-height: 1.7;
    color: var(--ink);
    background: var(--bg-soft);
  }
  .pull-quote p { margin-bottom: 4px; }
  .pull-quote-source {
    font-family: 'EB Garamond', serif;
    font-size: 13px;
    font-style: normal;
    color: var(--ink-soft);
    letter-spacing: 0.05em;
  }
</style>
```

- [ ] **Step 2: Footnote.astro**

```astro
---
// src/components/core/Footnote.astro
export interface Props {
  num: number;
}
const { num } = Astro.props;
---
<aside class="footnote" id={`fn-${num}`}>
  <span class="footnote-num">{num}.</span>
  <span class="footnote-body"><slot /></span>
</aside>
<style>
  .footnote {
    font-size: 14px;
    line-height: 1.7;
    color: var(--ink-soft);
    display: flex;
    gap: 6px;
    margin: 8px 0;
  }
  .footnote-num {
    color: var(--accent);
    font-weight: 600;
    flex-shrink: 0;
  }
</style>
```

- [ ] **Step 3: Divider.astro**

```astro
---
// src/components/core/Divider.astro
export interface Props {
  variant?: 'dots' | 'line';
}
const { variant = 'dots' } = Astro.props;
---
{variant === 'dots' && (
  <div class="divider-dots">·   ·   ·</div>
)}
{variant === 'line' && (
  <hr class="divider-line" />
)}
<style>
  .divider-dots {
    text-align: center;
    color: var(--rule);
    letter-spacing: 0.8em;
    margin: 32px 0 16px 0;
    font-size: 14px;
  }
  .divider-line {
    width: 60px;
    height: 1px;
    background: var(--accent);
    border: 0;
    margin: 32px auto;
  }
</style>
```

- [ ] **Step 4: 验证**

```bash
pnpm check
```

Expected: 无错误。

- [ ] **Step 5: 提交**

```bash
git add src/components/core/PullQuote.astro src/components/core/Footnote.astro src/components/core/Divider.astro
git commit -m "feat: 核心 Astro 组件 · PullQuote / Footnote / Divider"
```

---

## Task 10: Radar.svelte + 单元测试

**Files:**
- Create: `src/components/core/Radar.svelte`
- Create: `tests/components/Radar.test.ts`
- Create: `vitest.config.ts`

- [ ] **Step 1: 创建 vitest.config.ts**

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte({ hot: false })],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['tests/**/*.test.{ts,js}'],
  },
});
```

如果 `@sveltejs/vite-plugin-svelte` 还没装：
```bash
pnpm add -D @sveltejs/vite-plugin-svelte
```

- [ ] **Step 2: 写失败的单元测试**

```ts
// tests/components/Radar.test.ts
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Radar from '../../src/components/core/Radar.svelte';

describe('Radar', () => {
  it('renders three axis labels when dimensions length is 3', () => {
    const { container } = render(Radar, {
      props: {
        dimensions: ['君主', '规训', '生命'],
        values: [2, 5, 1],
        caption: 'test',
      },
    });
    const labels = container.querySelectorAll('.radar-axis-label');
    expect(labels.length).toBe(3);
    expect(labels[0].textContent).toContain('君主');
  });

  it('clamps out-of-range values to [0, 5]', () => {
    const { container } = render(Radar, {
      props: {
        dimensions: ['A', 'B'],
        values: [-3, 99],
      },
    });
    // polygon points should not contain NaN / extreme values
    const polygon = container.querySelector('polygon.radar-shape');
    expect(polygon).toBeTruthy();
    const pts = polygon!.getAttribute('points')!;
    expect(pts).not.toContain('NaN');
  });
});
```

- [ ] **Step 3: 运行测试，预期失败**

```bash
pnpm test
```

Expected: FAIL — `Cannot find module Radar.svelte` 或类似。

- [ ] **Step 4: 实现 Radar.svelte**

```svelte
<!-- src/components/core/Radar.svelte -->
<script lang="ts">
  export let dimensions: string[] = [];
  export let values: number[] = [];
  export let caption: string = '';
  export let size: number = 220;

  // Clamp values to [0, 5]
  $: clamped = values.map(v => Math.min(5, Math.max(0, v)));

  $: cx = size / 2;
  $: cy = size / 2;
  $: maxR = size / 2 - 30;

  // Polygon points
  $: points = dimensions.map((_, i) => {
    const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2;
    const r = (clamped[i] / 5) * maxR;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  // Axis label positions
  $: axisLabels = dimensions.map((label, i) => {
    const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2;
    const r = maxR + 16;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      label,
    };
  });

  // Background rings (5 levels)
  $: rings = [1, 2, 3, 4, 5].map(lvl => {
    return dimensions.map((_, i) => {
      const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2;
      const r = (lvl / 5) * maxR;
      return `${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`;
    }).join(' ');
  });
</script>

<figure class="radar">
  <svg viewBox="0 0 {size} {size}" aria-label={caption}>
    <!-- background rings -->
    {#each rings as ring}
      <polygon points={ring} fill="none" stroke="var(--rule)" stroke-width="0.5" />
    {/each}
    <!-- axes -->
    {#each dimensions as _, i}
      {@const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2}
      <line
        x1={cx} y1={cy}
        x2={cx + maxR * Math.cos(angle)}
        y2={cy + maxR * Math.sin(angle)}
        stroke="var(--rule)" stroke-width="0.5"
      />
    {/each}
    <!-- data shape -->
    <polygon class="radar-shape" {points}
             fill="var(--accent-soft)" fill-opacity="0.35"
             stroke="var(--accent)" stroke-width="1.4" />
    <!-- labels -->
    {#each axisLabels as { x, y, label }}
      <text class="radar-axis-label" {x} {y}
            text-anchor="middle" dominant-baseline="middle"
            font-family="var(--font-serif)" font-size="13" fill="var(--ink)">
        {label}
      </text>
    {/each}
  </svg>
  {#if caption}
    <figcaption>{caption}</figcaption>
  {/if}
</figure>

<style>
  .radar {
    margin: 24px auto;
    text-align: center;
    max-width: 320px;
  }
  figcaption {
    margin-top: 8px;
    font-family: 'EB Garamond', serif;
    font-size: 12px;
    letter-spacing: 0.15em;
    color: var(--ink-soft);
  }
</style>
```

- [ ] **Step 5: 运行测试，预期通过**

```bash
pnpm test
```

Expected: PASS, 2 tests.

- [ ] **Step 6: 提交**

```bash
git add src/components/core/Radar.svelte tests/components/Radar.test.ts vitest.config.ts package.json pnpm-lock.yaml
git commit -m "feat: Radar 雷达图组件 (Svelte) + Vitest 单元测试"
```

---

## Task 11: Checker.svelte + ConceptAnchor.svelte + 测试

**Files:**
- Create: `src/components/core/Checker.svelte`
- Create: `src/components/core/ConceptAnchor.svelte`
- Create: `tests/components/Checker.test.ts`
- Create: `tests/components/ConceptAnchor.test.ts`

- [ ] **Step 1: 写 Checker 测试**

```ts
// tests/components/Checker.test.ts
import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Checker from '../../src/components/core/Checker.svelte';

describe('Checker', () => {
  it('renders all conditions as checkboxes', () => {
    const { container } = render(Checker, {
      props: {
        conditions: ['公开处决', '群众围观', '即时反馈'],
      },
    });
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes.length).toBe(3);
  });

  it('shows result panel after toggling', async () => {
    const { container, getByText } = render(Checker, {
      props: {
        conditions: ['A', 'B'],
        verdicts: { '': '无', 'A': 'A 命中', 'B': 'B 命中', 'A,B': '两个都命中' },
      },
    });
    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    await fireEvent.click(checkbox);
    expect(getByText('A 命中')).toBeTruthy();
  });
});
```

- [ ] **Step 2: 运行测试，预期失败**

```bash
pnpm test tests/components/Checker.test.ts
```

Expected: FAIL.

- [ ] **Step 3: 实现 Checker.svelte**

```svelte
<!-- src/components/core/Checker.svelte -->
<script lang="ts">
  export let conditions: string[] = [];
  export let verdicts: Record<string, string> = {};
  export let title: string = '勾选你满足的条件';

  let checked: boolean[] = conditions.map(() => false);

  $: activeKey = conditions
    .filter((_, i) => checked[i])
    .join(',');
  $: verdict = verdicts[activeKey] ?? null;
</script>

<div class="checker">
  <p class="checker-title">{title}</p>
  <ul class="checker-list">
    {#each conditions as cond, i}
      <li>
        <label>
          <input type="checkbox" bind:checked={checked[i]} />
          <span>{cond}</span>
        </label>
      </li>
    {/each}
  </ul>
  {#if verdict}
    <div class="checker-verdict">{verdict}</div>
  {/if}
</div>

<style>
  .checker {
    margin: 24px 0;
    padding: 16px 20px;
    background: var(--bg-soft);
    border-left: 2px solid var(--accent);
    font-size: 15px;
  }
  .checker-title {
    margin: 0 0 12px 0;
    font-family: 'EB Garamond', serif;
    font-size: 12px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--accent);
  }
  .checker-list { display: grid; gap: 8px; }
  .checker-list label { display: flex; align-items: center; gap: 8px; cursor: pointer; }
  .checker-list input { accent-color: var(--accent); }
  .checker-verdict {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--rule);
    font-style: italic;
    color: var(--ink);
  }
</style>
```

- [ ] **Step 4: 写 ConceptAnchor 测试**

```ts
// tests/components/ConceptAnchor.test.ts
import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import ConceptAnchor from '../../src/components/core/ConceptAnchor.svelte';

describe('ConceptAnchor', () => {
  it('renders the concept text inline', () => {
    const { getByText } = render(ConceptAnchor, {
      props: {
        concept: '规训',
        definition: '一种纪律化的权力技术',
      },
    });
    expect(getByText('规训')).toBeTruthy();
  });

  it('toggles popup on click', async () => {
    const { container, queryByText } = render(ConceptAnchor, {
      props: { concept: '规训', definition: '权力技术' },
    });
    expect(queryByText('权力技术')).toBeFalsy();
    const btn = container.querySelector('.concept-anchor') as HTMLElement;
    await fireEvent.click(btn);
    expect(queryByText('权力技术')).toBeTruthy();
  });
});
```

- [ ] **Step 5: 实现 ConceptAnchor.svelte**

```svelte
<!-- src/components/core/ConceptAnchor.svelte -->
<script lang="ts">
  export let concept: string = '';
  export let definition: string = '';
  export let source: string = '';

  let open = false;
  function toggle() { open = !open; }
</script>

<span class="concept-anchor-wrap">
  <button class="concept-anchor" on:click={toggle} aria-expanded={open}>
    {concept}
  </button>
  {#if open}
    <span class="concept-popup" role="tooltip">
      <strong>{concept}</strong>
      <em>{definition}</em>
      {#if source}<small>— {source}</small>{/if}
    </span>
  {/if}
</span>

<style>
  .concept-anchor-wrap { position: relative; display: inline; }
  .concept-anchor {
    background: none;
    border: 0;
    border-bottom: 1px dotted var(--accent);
    color: var(--ink);
    cursor: pointer;
    font: inherit;
    padding: 0 2px;
  }
  .concept-anchor:hover { color: var(--accent); }
  .concept-popup {
    position: absolute;
    left: 0;
    top: 100%;
    transform: translateY(4px);
    background: var(--bg-soft);
    border: 1px solid var(--rule);
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    padding: 12px 16px;
    width: 280px;
    z-index: 10;
    font-size: 14px;
    line-height: 1.6;
    color: var(--ink);
    display: block;
  }
  .concept-popup strong { display: block; color: var(--accent); margin-bottom: 4px; }
  .concept-popup em { font-style: italic; color: var(--ink-soft); display: block; margin-bottom: 4px; }
  .concept-popup small { display: block; font-family: 'EB Garamond', serif; font-size: 11px; color: var(--ink-faint); letter-spacing: 0.1em; }
</style>
```

- [ ] **Step 6: 运行所有测试**

```bash
pnpm test
```

Expected: PASS, 至少 6 tests (Radar + Checker + ConceptAnchor).

- [ ] **Step 7: 提交**

```bash
git add src/components/core/Checker.svelte src/components/core/ConceptAnchor.svelte tests/components/
git commit -m "feat: Checker + ConceptAnchor 组件 (Svelte) + 单元测试"
```

---

## Task 12: Chrome 组件（Header / Footer / Nav / CoverCard）

**Files:**
- Create: `src/components/chrome/Header.astro`
- Create: `src/components/chrome/Footer.astro`
- Create: `src/components/chrome/Nav.astro`
- Create: `src/components/chrome/CoverCard.astro`

- [ ] **Step 1: Nav.astro**

```astro
---
// src/components/chrome/Nav.astro
export interface Props {
  active?: 'topics' | 'research' | 'about' | null;
}
const { active = null } = Astro.props;
---
<nav class="site-nav">
  <a href="/topics/" class:list={['nav-link', { active: active === 'topics' }]}>专题</a>
  <a href="/research/" class:list={['nav-link', { active: active === 'research' }]}>研究</a>
  <a href="/about/" class:list={['nav-link', { active: active === 'about' }]}>关于</a>
</nav>
<style>
  .site-nav {
    display: flex;
    gap: 18px;
    font-family: 'EB Garamond', serif;
    font-size: 12px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
  }
  .nav-link {
    border-bottom: none;
    color: var(--ink-soft);
    transition: color 0.15s;
  }
  .nav-link:hover { color: var(--accent); }
  .nav-link.active {
    color: var(--accent);
    border-bottom: 1px solid var(--accent);
    padding-bottom: 2px;
  }
</style>
```

- [ ] **Step 2: Header.astro**

```astro
---
// src/components/chrome/Header.astro
import Nav from './Nav.astro';
export interface Props {
  activeNav?: 'topics' | 'research' | 'about' | null;
}
const { activeNav = null } = Astro.props;
---
<header class="site-header">
  <a href="/" class="brand">🪳 大大黄油</a>
  <Nav active={activeNav} />
</header>
<style>
  .site-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 24px 32px;
    border-bottom: 1px solid var(--rule);
    max-width: 1200px;
    margin: 0 auto;
  }
  .brand {
    font-family: 'EB Garamond', serif;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: var(--ink);
    border-bottom: none;
  }
  @media (max-width: 640px) {
    .site-header { padding: 16px 20px; }
    .brand { font-size: 16px; }
  }
</style>
```

- [ ] **Step 3: Footer.astro**

```astro
---
// src/components/chrome/Footer.astro
const year = new Date().getFullYear();
---
<footer class="site-footer">
  <span class="footer-claim">"读得慢，写得久 —— 把每一段思考当作一处地形。"</span>
  <span class="footer-meta"><em>大大黄油</em> · since MMXXVI · {year}</span>
</footer>
<style>
  .site-footer {
    display: flex;
    justify-content: space-between;
    padding: 24px 32px;
    border-top: 1px solid var(--rule);
    margin-top: 64px;
    font-family: 'EB Garamond', serif;
    font-size: 12px;
    color: var(--ink-faint);
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  .footer-claim { font-style: italic; }
  .footer-meta em { color: var(--accent); font-style: italic; }
  @media (max-width: 640px) {
    .site-footer { flex-direction: column; gap: 8px; padding: 16px 20px; }
  }
</style>
```

- [ ] **Step 4: CoverCard.astro**

```astro
---
// src/components/chrome/CoverCard.astro
// 显示一张专题/研究封面缩略（用于首页 + 列表页）
import { getTheme, type ThemeId } from '@themes';

export interface Props {
  href: string;
  title: string;
  theme: ThemeId;
  meta?: string;
  coverImage?: string;
  aspectRatio?: string;
}
const { href, title, theme, meta, coverImage, aspectRatio = '3 / 4' } = Astro.props;
const pack = getTheme(theme);
---
<a class="cover-card" href={href} data-theme={theme}
   style={`background: ${pack.tokens.bg}; color: ${pack.tokens.ink}; aspect-ratio: ${aspectRatio};`}>
  {coverImage ? (
    <img src={coverImage} alt={title} loading="lazy" />
  ) : (
    <div class="cover-fallback">
      <span class="cover-title" style={`color: ${pack.tokens.ink};`}>{title}</span>
      {meta && <span class="cover-meta" style={`color: ${pack.tokens.accent};`}>{meta}</span>}
    </div>
  )}
</a>
<style>
  .cover-card {
    display: block;
    position: relative;
    overflow: hidden;
    border: 1px solid var(--rule);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    border-bottom: none;
  }
  .cover-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(0,0,0,0.12);
  }
  .cover-card img { width: 100%; height: 100%; object-fit: cover; }
  .cover-fallback {
    position: absolute; inset: 0;
    padding: 12px 14px;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .cover-title {
    font-family: 'Noto Serif SC', serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.1;
  }
  .cover-meta {
    font-family: 'EB Garamond', serif;
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
  }
</style>
```

- [ ] **Step 5: 验证**

```bash
pnpm check
```

Expected: 无错误。

- [ ] **Step 6: 提交**

```bash
git add src/components/chrome/
git commit -m "feat: Chrome 组件 · Header / Footer / Nav / CoverCard"
```

---

## Task 13: 4 个特化 Layout（Topic / Issue / Research / Article）

**Files:**
- Create: `src/layouts/TopicLayout.astro`
- Create: `src/layouts/IssueLayout.astro`
- Create: `src/layouts/ResearchLayout.astro`
- Create: `src/layouts/ArticleLayout.astro`

- [ ] **Step 1: TopicLayout.astro（专题首页）**

```astro
---
// src/layouts/TopicLayout.astro
import BaseLayout from './BaseLayout.astro';
import Header from '@components/chrome/Header.astro';
import Footer from '@components/chrome/Footer.astro';
import type { ThemeId } from '@themes';

export interface Props {
  title: string;
  subtitle?: string;
  theme: ThemeId;
  description?: string;
  ogImage?: string;
}
const { title, subtitle, theme, description, ogImage } = Astro.props;
---
<BaseLayout {title} {description} {theme} {ogImage}>
  <Header activeNav="topics" />
  <main class="topic-main">
    <header class="topic-hero">
      <p class="topic-eyebrow">专题</p>
      <h1 class="topic-title">{title}</h1>
      {subtitle && <p class="topic-subtitle">{subtitle}</p>}
    </header>
    <slot />
  </main>
  <Footer />
</BaseLayout>
<style>
  .topic-main { max-width: 1100px; margin: 0 auto; padding: 48px 32px; }
  .topic-hero { margin-bottom: 48px; max-width: var(--content-max); }
  .topic-eyebrow {
    font-family: 'EB Garamond', serif;
    font-size: 11px;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 12px;
  }
  .topic-title {
    font-size: clamp(40px, 6vw, 64px);
    line-height: 1.05;
    margin-bottom: 16px;
  }
  .topic-subtitle {
    font-family: 'EB Garamond', serif;
    font-style: italic;
    font-size: 18px;
    color: var(--ink-soft);
  }
  @media (max-width: 640px) {
    .topic-main { padding: 24px 20px; }
  }
</style>
```

- [ ] **Step 2: IssueLayout.astro（期正文页）**

```astro
---
// src/layouts/IssueLayout.astro
import BaseLayout from './BaseLayout.astro';
import Header from '@components/chrome/Header.astro';
import Footer from '@components/chrome/Footer.astro';
import RomanChapter from '@components/themes/schiele/RomanChapter.astro';
import type { ThemeId } from '@themes';

export interface Props {
  title: string;
  issueNum: number;
  topicTitle: string;
  topicHref: string;
  date: Date;
  theme: ThemeId;
  description?: string;
  ogImage?: string;
}
const { title, issueNum, topicTitle, topicHref, date, theme, description, ogImage } = Astro.props;
const dateStr = date.toISOString().slice(0, 10);
---
<BaseLayout {title} {description} {theme} {ogImage}>
  <Header activeNav="topics" />
  <article class="issue-main">
    <header class="issue-hero">
      <p class="issue-eyebrow"><a href={topicHref}>{topicTitle}</a> · 第 {issueNum} 期</p>
      {theme === 'schiele' && <RomanChapter num={issueNum} />}
      <h1 class="issue-title">{title}</h1>
      <p class="issue-date">{dateStr}</p>
    </header>
    <div class="issue-body">
      <slot />
    </div>
  </article>
  <Footer />
</BaseLayout>
<style>
  .issue-main {
    max-width: var(--content-max);
    margin: 0 auto;
    padding: 48px 32px;
  }
  .issue-hero { margin-bottom: 40px; }
  .issue-eyebrow {
    font-family: 'EB Garamond', serif;
    font-size: 11px;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 8px;
  }
  .issue-eyebrow a { border-bottom: none; }
  .issue-title {
    font-size: clamp(34px, 5.5vw, 52px);
    line-height: 1.05;
    margin-bottom: 16px;
  }
  .issue-date {
    font-family: 'EB Garamond', serif;
    font-style: italic;
    font-size: 13px;
    color: var(--ink-faint);
    letter-spacing: 0.1em;
  }
  .issue-body { font-size: 17px; line-height: 1.85; }
  .issue-body :global(p) { margin-bottom: 22px; }
  @media (max-width: 640px) {
    .issue-main { padding: 24px 20px; }
    .issue-body { font-size: 16px; line-height: 1.75; }
  }
</style>
```

- [ ] **Step 3: ResearchLayout.astro**

```astro
---
// src/layouts/ResearchLayout.astro
import BaseLayout from './BaseLayout.astro';
import Header from '@components/chrome/Header.astro';
import Footer from '@components/chrome/Footer.astro';
import type { ThemeId } from '@themes';

export interface Props {
  title: string;
  subtitle?: string;
  theme: ThemeId;
  description?: string;
  ogImage?: string;
}
const { title, subtitle, theme, description, ogImage } = Astro.props;
---
<BaseLayout {title} {description} {theme} {ogImage}>
  <Header activeNav="research" />
  <main class="research-main">
    <header class="research-hero">
      <p class="research-eyebrow">研究</p>
      <h1 class="research-title">{title}</h1>
      {subtitle && <p class="research-subtitle">{subtitle}</p>}
    </header>
    <slot />
  </main>
  <Footer />
</BaseLayout>
<style>
  .research-main { max-width: 1100px; margin: 0 auto; padding: 48px 32px; }
  .research-hero { margin-bottom: 48px; max-width: var(--content-max); }
  .research-eyebrow {
    font-family: 'EB Garamond', serif;
    font-size: 11px;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 12px;
  }
  .research-title {
    font-size: clamp(40px, 6vw, 64px);
    line-height: 1.05;
    margin-bottom: 16px;
  }
  .research-subtitle {
    font-family: 'EB Garamond', serif;
    font-style: italic;
    font-size: 18px;
    color: var(--ink-soft);
  }
  @media (max-width: 640px) { .research-main { padding: 24px 20px; } }
</style>
```

- [ ] **Step 4: ArticleLayout.astro（研究文章页）**

```astro
---
// src/layouts/ArticleLayout.astro
import BaseLayout from './BaseLayout.astro';
import Header from '@components/chrome/Header.astro';
import Footer from '@components/chrome/Footer.astro';
import type { ThemeId } from '@themes';

export interface Props {
  title: string;
  researchTitle: string;
  researchHref: string;
  date: Date;
  type: string;
  tags?: string[];
  theme: ThemeId;
  description?: string;
  ogImage?: string;
}
const { title, researchTitle, researchHref, date, type, tags = [], theme, description, ogImage } = Astro.props;
const dateStr = date.toISOString().slice(0, 10);
---
<BaseLayout {title} {description} {theme} {ogImage}>
  <Header activeNav="research" />
  <article class="article-main">
    <header class="article-hero">
      <p class="article-eyebrow"><a href={researchHref}>{researchTitle}</a> · {type}</p>
      <h1 class="article-title">{title}</h1>
      <p class="article-date">{dateStr}</p>
      {tags.length > 0 && (
        <div class="article-tags">
          {tags.map(t => <span class="tag">#{t}</span>)}
        </div>
      )}
    </header>
    <div class="article-body">
      <slot />
    </div>
  </article>
  <Footer />
</BaseLayout>
<style>
  .article-main { max-width: var(--content-max); margin: 0 auto; padding: 48px 32px; }
  .article-hero { margin-bottom: 32px; }
  .article-eyebrow {
    font-family: 'EB Garamond', serif;
    font-size: 11px;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 8px;
  }
  .article-eyebrow a { border-bottom: none; }
  .article-title {
    font-size: clamp(28px, 4.5vw, 40px);
    line-height: 1.1;
    margin-bottom: 12px;
  }
  .article-date {
    font-family: 'EB Garamond', serif;
    font-style: italic;
    font-size: 13px;
    color: var(--ink-faint);
    letter-spacing: 0.1em;
  }
  .article-tags { margin-top: 12px; display: flex; gap: 6px; flex-wrap: wrap; }
  .tag {
    font-family: 'EB Garamond', serif;
    font-size: 11px;
    padding: 2px 8px;
    background: var(--bg-soft);
    border: 1px solid var(--rule);
    color: var(--ink-soft);
  }
  .article-body { font-size: 17px; line-height: 1.85; }
  @media (max-width: 640px) {
    .article-main { padding: 24px 20px; }
    .article-body { font-size: 16px; }
  }
</style>
```

- [ ] **Step 5: 验证**

```bash
pnpm check
```

Expected: 无错误。

- [ ] **Step 6: 提交**

```bash
git add src/layouts/TopicLayout.astro src/layouts/IssueLayout.astro src/layouts/ResearchLayout.astro src/layouts/ArticleLayout.astro
git commit -m "feat: 4 个特化 Layout · Topic / Issue / Research / Article"
```

---

## Task 14: HomeLayout（V1.1 双轨）

**Files:**
- Create: `src/layouts/HomeLayout.astro`

- [ ] **Step 1: 创建 HomeLayout.astro**

HomeLayout 不像其他 layout 那样是简单 chrome——它接收数据 props（featured topic / 所有 topics / 最近 research）并渲染完整 V1.1 双轨结构。

```astro
---
// src/layouts/HomeLayout.astro
import BaseLayout from './BaseLayout.astro';
import Header from '@components/chrome/Header.astro';
import Footer from '@components/chrome/Footer.astro';
import CoverCard from '@components/chrome/CoverCard.astro';
import type { ThemeId } from '@themes';

export interface FeaturedTopic {
  slug: string;
  title: string;
  theme: ThemeId;
  issueTitle: string;     // 当期标题
  issueHref: string;
  issueNum: number;
  blurb: string;
  coverImage?: string;
}

export interface TopicCardData {
  slug: string;
  title: string;
  theme: ThemeId;
  meta: string;         // "3 / 10 期 · 进行中" 等
  coverImage?: string;
}

export interface ResearchEntry {
  href: string;
  title: string;
  date: Date;
  type: string;
  length?: number;
  researchTitle: string;
  researchSlug: string;
}

export interface Props {
  featured: FeaturedTopic;
  allTopics: TopicCardData[];
  recentResearch: ResearchEntry[];
  researchTags: string[];
}
const { featured, allTopics, recentResearch, researchTags } = Astro.props;
---
<BaseLayout title="大大黄油" description="个人交互式学术策展空间">
  <Header activeNav={null} />

  <main class="home-main">

    {/* ============ 专题 · 当期主推 ============ */}
    <section class="home-section">
      <header class="section-label">
        专题 · 当期主推
        <span class="section-count">{allTopics.length} 个专题</span>
      </header>
      <div class="featured">
        <a href={featured.issueHref} class="featured-cover">
          <CoverCard
            href={featured.issueHref}
            title={featured.title}
            theme={featured.theme}
            meta={`${featured.issueNum} 期`}
            coverImage={featured.coverImage}
            aspectRatio="4 / 5"
          />
        </a>
        <div class="featured-meta">
          <p class="top-label">现在正在写 · 第 {featured.issueNum} 期</p>
          <h2 class="featured-title">{featured.issueTitle}</h2>
          <p class="featured-by">{featured.title} · 第 {featured.issueNum} 期</p>
          <p class="featured-blurb">{featured.blurb}</p>
          <div class="featured-actions">
            <a href={featured.issueHref} class="action-primary">↪ 读这期</a>
            <a href={`/topics/${featured.slug}/`} class="action-muted">↪ 看专题全貌</a>
          </div>
        </div>
      </div>
    </section>

    {/* ============ 所有专题 ============ */}
    <section class="home-section">
      <header class="section-label">
        所有专题
        <span class="section-count">{allTopics.length} 个</span>
      </header>
      <div class="topic-row">
        {allTopics.map(t => (
          <div class="topic-row-item">
            <CoverCard
              href={`/topics/${t.slug}/`}
              title={t.title}
              theme={t.theme}
              meta={t.meta}
              coverImage={t.coverImage}
            />
            <div class="topic-row-text">
              <div class="t">{t.title}</div>
              <div class="m">{t.meta}</div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ============ 研究区 ============ */}
    <section class="research-section">
      <header class="section-label research-section-label">
        研究 · 最近
        <span class="section-count">{recentResearch.length} 条</span>
      </header>

      <div class="research-tags">
        <span class="tag tag-active">全部</span>
        {researchTags.map(t => <span class="tag">{t}</span>)}
      </div>

      <ol class="research-list">
        {recentResearch.map(r => {
          const d = r.date.toISOString().slice(5, 10).replace('-', ' · ');
          return (
            <li class="research-entry">
              <a href={r.href}>
                <span class="r-date">{d}</span>
                <span class="r-body">
                  <h3 class="r-title">{r.title}</h3>
                  <span class="r-source">
                    {r.type}{r.length && ` · ${r.length} 字`}
                    <span class="r-ref">→ {r.researchTitle}</span>
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ol>

      <a href="/research/" class="see-all">↪ 看全部研究</a>
    </section>

  </main>
  <Footer />
</BaseLayout>

<style>
  .home-main { max-width: 1100px; margin: 0 auto; padding: 32px; }

  .home-section { margin-bottom: 48px; }
  .section-label {
    font-family: 'EB Garamond', serif;
    font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase;
    color: var(--accent);
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 20px;
  }
  .section-label::after {
    content: ''; flex: 1; height: 1px; background: var(--rule);
  }
  .section-count { color: var(--ink-faint); font-size: 9px; letter-spacing: 0.2em; }

  /* featured */
  .featured { display: grid; grid-template-columns: 1.3fr 1fr; gap: 32px; }
  .featured-cover { display: block; border-bottom: none; }
  .featured-meta { display: flex; flex-direction: column; justify-content: center; }
  .top-label {
    font-family: 'EB Garamond', serif;
    font-size: 11px; letter-spacing: 0.4em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 12px;
  }
  .featured-title { font-size: 32px; line-height: 1.1; margin-bottom: 8px; }
  .featured-by {
    font-family: 'EB Garamond', serif; font-style: italic;
    font-size: 14px; color: var(--ink-soft); margin-bottom: 16px;
  }
  .featured-blurb { font-size: 15px; line-height: 1.7; margin-bottom: 20px; }
  .featured-actions { display: flex; gap: 16px; }
  .action-primary {
    font-family: 'EB Garamond', serif; font-size: 12px;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--accent); border-bottom: 1px solid var(--accent);
  }
  .action-muted {
    font-family: 'EB Garamond', serif; font-size: 12px;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--ink-faint); border-bottom: 1px solid var(--ink-faint);
  }

  /* topic row */
  .topic-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .topic-row-text { margin-top: 8px; }
  .topic-row-text .t { font-family: 'Noto Serif SC', serif; font-size: 13px; font-weight: 500; }
  .topic-row-text .m { font-family: 'EB Garamond', serif; font-size: 10px; letter-spacing: 0.15em; color: var(--ink-faint); margin-top: 2px; }

  /* research */
  .research-section {
    background: var(--bg-soft);
    padding: 32px;
    margin: 0 -32px;     /* 拓宽到 main 边缘 */
    border-top: 1px solid var(--rule);
  }
  .research-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
  .tag {
    font-family: 'EB Garamond', serif; font-size: 12px;
    padding: 3px 12px; border: 1px solid var(--ink-faint);
    color: var(--ink);
  }
  .tag-active { background: var(--ink); color: var(--bg); border-color: var(--ink); }
  .research-list { display: grid; gap: 4px; }
  .research-entry { border-bottom: 1px dotted var(--rule); }
  .research-entry a {
    display: grid; grid-template-columns: 80px 1fr;
    gap: 16px; padding: 10px 0;
    border-bottom: none; color: inherit;
  }
  .r-date {
    font-family: 'EB Garamond', serif;
    font-size: 11px; letter-spacing: 0.15em; color: var(--ink-faint);
  }
  .r-title { font-family: 'Noto Serif SC', serif; font-size: 15px; font-weight: 500; margin-bottom: 4px; }
  .r-source {
    font-family: 'EB Garamond', serif; font-style: italic;
    font-size: 11.5px; color: var(--ink-soft);
  }
  .r-ref {
    background: var(--bg); padding: 1px 6px; color: var(--accent);
    font-style: normal; letter-spacing: 0.05em; font-size: 10.5px;
    margin-left: 6px;
  }
  .see-all {
    margin-top: 20px;
    display: inline-block;
    font-family: 'EB Garamond', serif; font-size: 12px;
    color: var(--accent); border-bottom: 1px solid var(--accent);
    padding-bottom: 2px;
  }

  /* responsive */
  @media (max-width: 768px) {
    .featured { grid-template-columns: 1fr; }
    .topic-row { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 480px) {
    .topic-row { grid-template-columns: 1fr; }
    .research-section { margin: 0 -20px; padding: 24px 20px; }
    .home-main { padding: 20px; }
  }
</style>
```

写入 `src/layouts/HomeLayout.astro`。

- [ ] **Step 2: 验证**

```bash
pnpm check
```

Expected: 无错误。

- [ ] **Step 3: 提交**

```bash
git add src/layouts/HomeLayout.astro
git commit -m "feat: HomeLayout · V1.1 双轨（专题封面墙 + 研究列表 + 标签）+ 响应式"
```

---

## Task 15: Topic 路由（/topics/ /topics/[topic]/ /topics/[topic]/[issue]/）

**Files:**
- Create: `src/pages/topics/index.astro`
- Create: `src/pages/topics/[topic]/index.astro`
- Create: `src/pages/topics/[topic]/[issue].astro`

- [ ] **Step 1: pages/topics/index.astro · 所有专题列表**

```astro
---
// src/pages/topics/index.astro
import BaseLayout from '@layouts/BaseLayout.astro';
import Header from '@components/chrome/Header.astro';
import Footer from '@components/chrome/Footer.astro';
import CoverCard from '@components/chrome/CoverCard.astro';
import { getCollection } from 'astro:content';

const topics = await getCollection('topics');
const sorted = topics
  .filter(t => t.data.status !== 'completed' || true)   // 全部显示
  .sort((a, b) => b.data.started.localeCompare(a.data.started));
---
<BaseLayout title="所有专题" description="大大黄油的全部专题">
  <Header activeNav="topics" />
  <main class="topics-index">
    <header class="page-header">
      <p class="page-eyebrow">专题</p>
      <h1>所有专题</h1>
      <p class="page-meta">{sorted.length} 个专题</p>
    </header>
    <div class="topics-grid">
      {sorted.map(t => {
        const slug = t.id.replace(/\/index$/, '');
        return (
          <div class="topic-item">
            <CoverCard
              href={`/topics/${slug}/`}
              title={t.data.title}
              theme={t.data.theme}
              meta={t.data.status === 'ongoing' ? '进行中' : t.data.status === 'planning' ? '筹备' : '已完结'}
            />
            <div class="topic-text">
              <h3>{t.data.title}</h3>
              {t.data.subtitle && <p class="t-sub">{t.data.subtitle}</p>}
              <p class="t-summary">{t.data.summary}</p>
            </div>
          </div>
        );
      })}
    </div>
  </main>
  <Footer />
</BaseLayout>
<style>
  .topics-index { max-width: 1100px; margin: 0 auto; padding: 48px 32px; }
  .page-header { margin-bottom: 48px; }
  .page-eyebrow {
    font-family: 'EB Garamond', serif;
    font-size: 11px; letter-spacing: 0.4em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 12px;
  }
  .page-header h1 { font-size: clamp(40px, 6vw, 64px); margin-bottom: 8px; }
  .page-meta { font-family: 'EB Garamond', serif; font-style: italic; color: var(--ink-faint); }
  .topics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
  .topic-text { margin-top: 12px; }
  .topic-text h3 { font-size: 17px; font-weight: 500; margin-bottom: 4px; }
  .t-sub { font-family: 'EB Garamond', serif; font-style: italic; font-size: 12px; color: var(--ink-soft); margin-bottom: 6px; }
  .t-summary { font-size: 13px; color: var(--ink-soft); line-height: 1.55; }
  @media (max-width: 768px) { .topics-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 480px) { .topics-grid { grid-template-columns: 1fr; } .topics-index { padding: 24px 20px; } }
</style>
```

- [ ] **Step 2: pages/topics/[topic]/index.astro · 单专题首页**

```astro
---
// src/pages/topics/[topic]/index.astro
import TopicLayout from '@layouts/TopicLayout.astro';
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const topics = await getCollection('topics');
  return topics.map(t => {
    const slug = t.id.replace(/\/index$/, '');
    return {
      params: { topic: slug },
      props: { topic: t },
    };
  });
}

const { topic } = Astro.props;
const slug = topic.id.replace(/\/index$/, '');

// 获取该专题下的所有期
const allIssues = await getCollection('issues');
const issues = allIssues
  .filter(i => i.id.startsWith(slug + '/'))
  .sort((a, b) => a.data.issue - b.data.issue);

const { Content } = await render(topic);
---
<TopicLayout
  title={topic.data.title}
  subtitle={topic.data.subtitle}
  theme={topic.data.theme}
  description={topic.data.summary}
>
  <div class="topic-summary">
    <p>{topic.data.summary}</p>
    <Content />
  </div>

  <section class="issues">
    <h2 class="issues-title">期目录</h2>
    {issues.length === 0 ? (
      <p class="issues-empty">这个专题暂时还没有发布的期。</p>
    ) : (
      <ol class="issues-list">
        {issues.map(i => {
          const issueSlug = i.id.replace(slug + '/', '');
          return (
            <li class="issue-entry">
              <a href={`/topics/${slug}/${issueSlug}/`}>
                <span class="i-num">{String(i.data.issue).padStart(2, '0')}</span>
                <span class="i-body">
                  <h3>{i.data.title}</h3>
                  {i.data.summary && <p>{i.data.summary}</p>}
                </span>
                <span class="i-date">
                  {i.data.date.toISOString().slice(0, 10)}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    )}
  </section>
</TopicLayout>
<style>
  .topic-summary { max-width: var(--content-max); font-size: 17px; line-height: 1.85; margin-bottom: 48px; }
  .issues-title {
    font-family: 'EB Garamond', serif; font-size: 12px;
    letter-spacing: 0.4em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 16px;
    border-bottom: 1px solid var(--rule); padding-bottom: 8px;
  }
  .issues-empty { color: var(--ink-faint); font-style: italic; }
  .issues-list { display: grid; gap: 4px; }
  .issue-entry { border-bottom: 1px dotted var(--rule); }
  .issue-entry a {
    display: grid; grid-template-columns: 60px 1fr auto;
    gap: 20px; padding: 14px 0;
    border-bottom: none; color: inherit;
  }
  .i-num {
    font-family: 'EB Garamond', serif;
    font-size: 24px; color: var(--ochre);
  }
  .i-body h3 { font-size: 17px; font-weight: 500; margin-bottom: 4px; }
  .i-body p { font-size: 13px; color: var(--ink-soft); line-height: 1.6; margin: 0; }
  .i-date { font-family: 'EB Garamond', serif; font-style: italic; font-size: 12px; color: var(--ink-faint); }
</style>
```

- [ ] **Step 3: pages/topics/[topic]/[issue].astro · 期正文**

```astro
---
// src/pages/topics/[topic]/[issue].astro
import IssueLayout from '@layouts/IssueLayout.astro';
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const issues = await getCollection('issues');
  const topics = await getCollection('topics');
  const topicMap = new Map(topics.map(t => [t.id.replace(/\/index$/, ''), t]));

  return issues.map(i => {
    const [topicSlug, issueSlug] = i.id.split('/');
    const topic = topicMap.get(topicSlug);
    return {
      params: { topic: topicSlug, issue: issueSlug },
      props: { issue: i, topic },
    };
  });
}

const { issue, topic } = Astro.props;
if (!topic) throw new Error(`Topic not found for issue ${issue.id}`);

const topicSlug = topic.id.replace(/\/index$/, '');
const { Content } = await render(issue);
---
<IssueLayout
  title={issue.data.title}
  issueNum={issue.data.issue}
  topicTitle={topic.data.title}
  topicHref={`/topics/${topicSlug}/`}
  date={issue.data.date}
  theme={topic.data.theme}
  description={issue.data.summary}
>
  <Content />
</IssueLayout>
```

- [ ] **Step 4: 临时建一个最小专题验证路由（一次性，Task 18 会替换）**

```bash
mkdir -p "/Users/mac/Library/Mobile Documents/iCloud~md~obsidian/Documents/🪳大大黄油/src/content/topics/_smoke"
```

写入 `src/content/topics/_smoke/index.md`：
```markdown
---
title: Smoke 测试专题
theme: schiele
status: planning
type: single
summary: 仅用于路由烟雾测试，Task 18 会被真实内容替换。
started: 2026-05
---

Smoke test body.
```

- [ ] **Step 5: 启动 dev server 验证路由**

```bash
pnpm dev
```

打开浏览器：
- `http://localhost:4321/topics/` → 看见 1 个专题卡片
- `http://localhost:4321/topics/_smoke/` → 看见单专题首页（席勒皮肤、"期目录" 显示空）

杀掉 dev server，删除 `src/content/topics/_smoke/`。

- [ ] **Step 6: 提交**

```bash
git add src/pages/topics/
git commit -m "feat: Topic 三层路由 · /topics/ + /topics/[topic]/ + /topics/[topic]/[issue]/"
```

---

## Task 16: Research 路由

**Files:**
- Create: `src/pages/research/index.astro`
- Create: `src/pages/research/[research]/index.astro`
- Create: `src/pages/research/[research]/[article].astro`

- [ ] **Step 1: pages/research/index.astro**

```astro
---
// src/pages/research/index.astro
import BaseLayout from '@layouts/BaseLayout.astro';
import Header from '@components/chrome/Header.astro';
import Footer from '@components/chrome/Footer.astro';
import CoverCard from '@components/chrome/CoverCard.astro';
import { getCollection } from 'astro:content';

const research = await getCollection('research');
const sorted = research.sort((a, b) => b.data.started.localeCompare(a.data.started));
---
<BaseLayout title="所有研究" description="大大黄油的全部研究">
  <Header activeNav="research" />
  <main class="research-index">
    <header class="page-header">
      <p class="page-eyebrow">研究</p>
      <h1>所有研究</h1>
      <p class="page-meta">{sorted.length} 个研究</p>
    </header>
    <div class="research-grid">
      {sorted.map(r => {
        const slug = r.id.replace(/\/index$/, '');
        return (
          <div class="research-item">
            <CoverCard
              href={`/research/${slug}/`}
              title={r.data.title}
              theme={r.data.theme}
              meta={r.data.status === 'ongoing' ? '进行中' : '已沉淀'}
            />
            <div class="r-text">
              <h3>{r.data.title}</h3>
              {r.data.subtitle && <p class="r-sub">{r.data.subtitle}</p>}
              <p class="r-summary">{r.data.summary}</p>
            </div>
          </div>
        );
      })}
    </div>
  </main>
  <Footer />
</BaseLayout>
<style>
  .research-index { max-width: 1100px; margin: 0 auto; padding: 48px 32px; }
  .page-header { margin-bottom: 48px; }
  .page-eyebrow {
    font-family: 'EB Garamond', serif;
    font-size: 11px; letter-spacing: 0.4em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 12px;
  }
  .page-header h1 { font-size: clamp(40px, 6vw, 64px); margin-bottom: 8px; }
  .page-meta { font-family: 'EB Garamond', serif; font-style: italic; color: var(--ink-faint); }
  .research-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .r-text { margin-top: 12px; }
  .r-text h3 { font-size: 17px; font-weight: 500; margin-bottom: 4px; }
  .r-sub { font-family: 'EB Garamond', serif; font-style: italic; font-size: 12px; color: var(--ink-soft); margin-bottom: 6px; }
  .r-summary { font-size: 13px; color: var(--ink-soft); line-height: 1.55; }
  @media (max-width: 768px) { .research-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 480px) { .research-grid { grid-template-columns: 1fr; } .research-index { padding: 24px 20px; } }
</style>
```

- [ ] **Step 2: pages/research/[research]/index.astro**

```astro
---
// src/pages/research/[research]/index.astro
import ResearchLayout from '@layouts/ResearchLayout.astro';
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const research = await getCollection('research');
  return research.map(r => {
    const slug = r.id.replace(/\/index$/, '');
    return {
      params: { research: slug },
      props: { research: r },
    };
  });
}

const { research } = Astro.props;
const slug = research.id.replace(/\/index$/, '');

const allArticles = await getCollection('researchArticles');
const articles = allArticles
  .filter(a => a.id.startsWith(slug + '/'))
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

const { Content } = await render(research);
---
<ResearchLayout
  title={research.data.title}
  subtitle={research.data.subtitle}
  theme={research.data.theme}
  description={research.data.summary}
>
  <div class="research-summary">
    <p>{research.data.summary}</p>
    <Content />
  </div>

  <section class="articles">
    <h2 class="articles-title">研究文章</h2>
    {articles.length === 0 ? (
      <p class="articles-empty">这个研究暂时还没有发布的文章。</p>
    ) : (
      <ol class="articles-list">
        {articles.map(a => {
          const articleSlug = a.id.replace(slug + '/', '');
          return (
            <li class="article-entry">
              <a href={`/research/${slug}/${articleSlug}/`}>
                <span class="a-date">{a.data.date.toISOString().slice(0, 10)}</span>
                <span class="a-body">
                  <h3>{a.data.title}</h3>
                  <p class="a-meta">{a.data.type}{a.data.length && ` · ${a.data.length} 字`}</p>
                  {a.data.tags.length > 0 && (
                    <p class="a-tags">{a.data.tags.map(t => `#${t}`).join(' ')}</p>
                  )}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    )}
  </section>
</ResearchLayout>
<style>
  .research-summary { max-width: var(--content-max); font-size: 17px; line-height: 1.85; margin-bottom: 48px; }
  .articles-title {
    font-family: 'EB Garamond', serif; font-size: 12px;
    letter-spacing: 0.4em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 16px;
    border-bottom: 1px solid var(--rule); padding-bottom: 8px;
  }
  .articles-empty { color: var(--ink-faint); font-style: italic; }
  .articles-list { display: grid; gap: 4px; }
  .article-entry { border-bottom: 1px dotted var(--rule); }
  .article-entry a {
    display: grid; grid-template-columns: 100px 1fr;
    gap: 20px; padding: 14px 0;
    border-bottom: none; color: inherit;
  }
  .a-date {
    font-family: 'EB Garamond', serif;
    font-size: 12px; letter-spacing: 0.1em; color: var(--ink-faint);
  }
  .a-body h3 { font-size: 16px; font-weight: 500; margin-bottom: 4px; }
  .a-meta { font-family: 'EB Garamond', serif; font-style: italic; font-size: 12px; color: var(--ink-soft); margin: 0 0 4px 0; }
  .a-tags { font-family: 'EB Garamond', serif; font-size: 11px; color: var(--ochre); margin: 0; }
</style>
```

- [ ] **Step 3: pages/research/[research]/[article].astro**

```astro
---
// src/pages/research/[research]/[article].astro
import ArticleLayout from '@layouts/ArticleLayout.astro';
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const articles = await getCollection('researchArticles');
  const research = await getCollection('research');
  const researchMap = new Map(research.map(r => [r.id.replace(/\/index$/, ''), r]));

  return articles.map(a => {
    const [researchSlug, articleSlug] = a.id.split('/');
    const r = researchMap.get(researchSlug);
    return {
      params: { research: researchSlug, article: articleSlug },
      props: { article: a, research: r },
    };
  });
}

const { article, research } = Astro.props;
if (!research) throw new Error(`Research not found for article ${article.id}`);

const researchSlug = research.id.replace(/\/index$/, '');
const { Content } = await render(article);
---
<ArticleLayout
  title={article.data.title}
  researchTitle={research.data.title}
  researchHref={`/research/${researchSlug}/`}
  date={article.data.date}
  type={article.data.type}
  tags={article.data.tags}
  theme={research.data.theme}
>
  <Content />
</ArticleLayout>
```

- [ ] **Step 4: 验证**

```bash
pnpm check
```

Expected: 无错误（暂时无 research 内容，但路由会跑）。

- [ ] **Step 5: 提交**

```bash
git add src/pages/research/
git commit -m "feat: Research 三层路由 · /research/ + /research/[research]/ + /research/[research]/[article]/"
```

---

## Task 17: 首页 + About

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/pages/about.astro`

- [ ] **Step 1: pages/index.astro · 首页 V1.1**

```astro
---
// src/pages/index.astro
import HomeLayout, { type FeaturedTopic, type TopicCardData, type ResearchEntry } from '@layouts/HomeLayout.astro';
import { getCollection } from 'astro:content';

// 拉取专题
const topics = await getCollection('topics');
const topicMap = new Map(topics.map(t => [t.id.replace(/\/index$/, ''), t]));

// 拉取所有期，按日期倒序找最新
const allIssues = await getCollection('issues');
const sortedIssues = [...allIssues].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
const latestIssue = sortedIssues.find(i => i.data.status === 'published');

let featured: FeaturedTopic;
if (latestIssue) {
  const [topicSlug] = latestIssue.id.split('/');
  const featuredTopic = topicMap.get(topicSlug)!;
  featured = {
    slug: topicSlug,
    title: featuredTopic.data.title,
    theme: featuredTopic.data.theme,
    issueTitle: latestIssue.data.title,
    issueHref: `/topics/${topicSlug}/${latestIssue.id.split('/')[1]}/`,
    issueNum: latestIssue.data.issue,
    blurb: latestIssue.data.summary ?? featuredTopic.data.summary,
  };
} else {
  // fallback：无任何已发布期时拿第一个专题做 hero
  const fallbackTopic = topics[0]!;
  const fallbackSlug = fallbackTopic.id.replace(/\/index$/, '');
  featured = {
    slug: fallbackSlug,
    title: fallbackTopic.data.title,
    theme: fallbackTopic.data.theme,
    issueTitle: fallbackTopic.data.title,
    issueHref: `/topics/${fallbackSlug}/`,
    issueNum: 0,
    blurb: fallbackTopic.data.summary,
  };
}

// 所有专题（小封面）
const allTopics: TopicCardData[] = topics
  .sort((a, b) => b.data.started.localeCompare(a.data.started))
  .map(t => {
    const slug = t.id.replace(/\/index$/, '');
    const numIssues = allIssues.filter(i => i.id.startsWith(slug + '/')).length;
    let meta = '';
    if (t.data.status === 'ongoing') {
      meta = t.data.type === 'series'
        ? `${numIssues} / ${t.data.planned_issues ?? '?'} 期 · 进行中`
        : '进行中';
    } else if (t.data.status === 'planning') {
      meta = t.data.type === 'series' ? '筹备 · 多期' : '筹备 · 单期';
    } else {
      meta = '已完结';
    }
    return { slug, title: t.data.title, theme: t.data.theme, meta };
  });

// 最近研究
const allArticles = await getCollection('researchArticles');
const researchAll = await getCollection('research');
const researchMap = new Map(researchAll.map(r => [r.id.replace(/\/index$/, ''), r]));

const recentResearch: ResearchEntry[] = [...allArticles]
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
  .slice(0, 6)
  .map(a => {
    const [researchSlug, articleSlug] = a.id.split('/');
    const r = researchMap.get(researchSlug);
    return {
      href: `/research/${researchSlug}/${articleSlug}/`,
      title: a.data.title,
      date: a.data.date,
      type: a.data.type,
      length: a.data.length,
      researchTitle: r?.data.title ?? researchSlug,
      researchSlug,
    };
  });

// 研究标签聚类
const tagSet = new Set<string>();
allArticles.forEach(a => a.data.tags.forEach(t => tagSet.add(t)));
const researchTags = Array.from(tagSet).slice(0, 8);
---
<HomeLayout
  featured={featured}
  allTopics={allTopics}
  recentResearch={recentResearch}
  researchTags={researchTags}
/>
```

写入 `src/pages/index.astro`。

- [ ] **Step 2: pages/about.astro**

```astro
---
// src/pages/about.astro
import BaseLayout from '@layouts/BaseLayout.astro';
import Header from '@components/chrome/Header.astro';
import Footer from '@components/chrome/Footer.astro';
import HandSignature from '@components/themes/schiele/HandSignature.astro';
---
<BaseLayout title="关于" description="关于大大黄油">
  <Header activeNav="about" />
  <main class="about-main">
    <header class="page-header">
      <p class="page-eyebrow">关于</p>
      <h1>关于大大黄油</h1>
    </header>
    <article class="about-body">
      <p>
        大大黄油是一个个人的<strong>交互式学术策展空间</strong>——
        承载不同方向的研究：福柯/规训、AIX 教育、AI 边界伦理、内卷文化、通向实在之路……
      </p>
      <p>
        每个专题挂载一位艺术家的视觉系统——同一个站，因为研究主题不同而呈现完全不同的"面貌"。
        像一个走在不同展厅里的人，每个展厅是自己的世界。
      </p>
      <p>
        这里首先是为我自己做的研究花园——慢读、慢写、长期沉淀。
        但你既然路过了，也欢迎在某个展厅里停留。
      </p>
      <HandSignature name="大大黄油" />
    </article>
  </main>
  <Footer />
</BaseLayout>
<style>
  .about-main { max-width: var(--content-max); margin: 0 auto; padding: 48px 32px; }
  .page-header { margin-bottom: 32px; }
  .page-eyebrow {
    font-family: 'EB Garamond', serif;
    font-size: 11px; letter-spacing: 0.4em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 12px;
  }
  .page-header h1 { font-size: clamp(40px, 6vw, 64px); }
  .about-body { font-size: 17px; line-height: 1.85; }
  .about-body p { margin-bottom: 22px; }
  @media (max-width: 640px) { .about-main { padding: 24px 20px; } }
</style>
```

- [ ] **Step 3: 验证**

```bash
pnpm check
```

Expected: 无错误（暂无内容时首页会因为找不到任何专题而报错，这是 OK 的——Task 18 灌入内容后修复）。

- [ ] **Step 4: 提交**

```bash
git add src/pages/index.astro src/pages/about.astro
git commit -m "feat: 首页 V1.1 + about 页"
```

---

## Task 18: 占位内容 · 4 个专题 + 1 期

**Files:**
- Create: `src/content/topics/regulation-archipelago/index.md`
- Create: `src/content/topics/regulation-archipelago/03-mass-eyes.md`
- Create: `src/content/topics/regulation-archipelago/cover.svg`
- Create: `src/content/topics/inv-culture/index.md` + `cover.svg`
- Create: `src/content/topics/road-to-reality/index.md` + `cover.svg`
- Create: `src/content/topics/aix-education/index.md` + `cover.svg`

- [ ] **Step 1: regulation-archipelago（席勒）· index.md**

```markdown
---
title: 规训群岛
subtitle: 福柯《规训与惩罚》系列
theme: schiele
status: ongoing
type: series
planned_issues: 10
summary: 重读《规训与惩罚》——把它当作工具，去看今天的微博挂人、教室秩序、绩效考核里那些越细密越无形的权力网。
started: 2025-12
---

这是关于福柯《规训与惩罚》的一组解读，预计 10 期。

每一期从一个当代现象出发——微博挂人、教室秩序、绩效考核、监控、社交平台——
回到福柯的概念工具，再走出来，看清这个现象的形状。

不是"用理论解释现实"——而是"让现实把理论照亮"。
```

- [ ] **Step 2: regulation-archipelago/03-mass-eyes.mdx（占位）**

文件后缀必须用 **`.mdx`**（不是 `.md`）——因为含组件 `import` 语句。

```mdx
---
issue: 3
title: 微博挂人，和群众的眼睛
date: 2026-05-26
status: published
summary: 公开处决退场后，规训没有变弱——它变成了 5 亿支举着的手机。
---

import BloodHighlight from '@components/themes/schiele/BloodHighlight.astro';
import ScribbleDivider from '@components/themes/schiele/ScribbleDivider.astro';
import HandSignature from '@components/themes/schiele/HandSignature.astro';

> **占位内容**——这只是 Phase 1 的占位，真实文章会在 Phase 2 写入。

福柯说，公开处决的退场，留下的不是温和，而是更细密的网。
2026 年的今天，这张网换上了一个新名字——<BloodHighlight>群众的眼睛</BloodHighlight>。

微博上一条挂人贴，几小时之内，五亿支手机投来同样的目光。
被挂的人不需要任何"判决"——围观本身已经是惩罚。

<ScribbleDivider />

这不是"网络暴力"那么简单。
这是规训权力的当代形态——分散的、随机的、却比任何中心化的处决都更彻底。

…… 占位正文 ……

<HandSignature name="大大黄油" />
```

**约定：** 整个项目里，所有需要使用组件的内容文件（含组件 `import` 或 JSX）一律用 `.mdx` 后缀；纯文本内容文件用 `.md`。glob loader 在 Task 7 已经同时匹配两种。

- [ ] **Step 3: regulation-archipelago/cover.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
  <rect width="800" height="1000" fill="#ece1cf"/>
  <text x="40" y="60" font-family="EB Garamond, serif" font-size="14" letter-spacing="4" fill="#7a2820">DISCIPLINARY ARCHIPELAGO · III</text>
  <g fill="none" stroke="#2a1a14" stroke-width="2.5" stroke-linecap="round">
    <path d="M 600 200 q -30 30 -22 60 q 4 25 22 35"/>
    <path d="M 590 300 L 575 500 L 555 800"/>
    <path d="M 610 300 L 625 500 L 645 800"/>
    <path d="M 575 360 L 510 460"/>
    <path d="M 625 360 L 690 460"/>
  </g>
  <ellipse cx="592" cy="225" rx="4" ry="2" fill="#7a2820"/>
  <ellipse cx="608" cy="225" rx="4" ry="2" fill="#7a2820"/>
  <text x="40" y="700" font-family="Noto Serif SC, serif" font-size="90" fill="#2a1a14" font-weight="600">规训</text>
  <text x="40" y="800" font-family="Noto Serif SC, serif" font-size="90" fill="#2a1a14" font-weight="600">群岛</text>
  <text x="40" y="920" font-family="Caveat, cursive" font-size="28" fill="#7a2820" transform="rotate(-2 40 920)">— 大大黄油 · 03</text>
</svg>
```

- [ ] **Step 4: inv-culture（占位 basquiat）· index.md + cover.svg**

`src/content/topics/inv-culture/index.md`:
```markdown
---
title: 内卷文化
subtitle: 当努力变成赌注
theme: basquiat
status: planning
type: series
planned_issues: 6
summary: 内卷不是"卷"——是一场没有人能赢的赌博。从教育、职场、社交，重新审视"努力"这个词的当代含义。
started: 2026-01
---

筹备中。
```

`src/content/topics/inv-culture/cover.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
  <rect width="800" height="1000" fill="#f8d12b"/>
  <polygon points="0,0 800,0 800,300 0,500" fill="#1a4ba8"/>
  <polygon points="800,1000 800,500 200,1000" fill="#c43838"/>
  <text x="60" y="120" font-family="Permanent Marker, cursive" font-size="80" fill="#f8d12b">👑</text>
  <text x="60" y="600" font-family="Permanent Marker, cursive" font-size="100" fill="#0a0a0a" text-decoration="line-through" style="text-decoration-color:#c43838; text-decoration-thickness:6px">努力</text>
  <text x="60" y="720" font-family="Permanent Marker, cursive" font-size="100" fill="#0a0a0a">是赌注</text>
  <text x="60" y="950" font-family="Permanent Marker, cursive" font-size="20" fill="#0a0a0a">内卷 · 筹备</text>
</svg>
```

- [ ] **Step 5: road-to-reality（占位 haeckel）· index.md + cover.svg**

`src/content/topics/road-to-reality/index.md`:
```markdown
---
title: 通向实在之路
subtitle: 三种"懂"的形状
theme: haeckel
status: planning
type: series
planned_issues: 8
summary: 沿着 Penrose 的同名巨著，重走一遍——数学的、物理的、直观的"懂"，是三种完全不同的皮肤。
started: 2026-02
---

筹备中。
```

`src/content/topics/road-to-reality/cover.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
  <rect width="800" height="1000" fill="#f0e7d0"/>
  <rect x="20" y="20" width="760" height="960" fill="none" stroke="#1a2842" stroke-width="2" opacity="0.5"/>
  <rect x="35" y="35" width="730" height="930" fill="none" stroke="#1a2842" stroke-width="0.5" opacity="0.3"/>
  <text x="60" y="100" font-family="EB Garamond, serif" font-size="14" letter-spacing="5" fill="#8b6438">TABULA · MMXXVI</text>
  <text x="60" y="160" font-family="EB Garamond, serif" font-size="40" fill="#8b6438">II.</text>
  <g fill="none" stroke="#1a2842" stroke-width="1" transform="translate(400 500)">
    <circle r="200"/>
    <circle r="140"/>
    <circle r="80"/>
    <circle r="40"/>
    <line x1="-200" y1="0" x2="200" y2="0"/>
    <line x1="0" y1="-200" x2="0" y2="200"/>
    <line x1="-141" y1="-141" x2="141" y2="141"/>
    <line x1="141" y1="-141" x2="-141" y2="141"/>
  </g>
  <text x="60" y="900" font-family="Noto Serif SC, serif" font-size="60" fill="#1a2842">通向</text>
  <text x="60" y="970" font-family="Noto Serif SC, serif" font-size="60" fill="#1a2842">实在之路</text>
</svg>
```

- [ ] **Step 6: aix-education（占位 matisse）· index.md + cover.svg**

`src/content/topics/aix-education/index.md`:
```markdown
---
title: AIX 教育
subtitle: AI 时代的基础教育方法论
theme: matisse
status: planning
type: single
summary: 当 AI 变成孩子的日常工具，"教什么"和"怎么教"的回答都要重写。给家长 + 教师的实操手册。
started: 2026-03
---

筹备中。
```

`src/content/topics/aix-education/cover.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
  <rect width="800" height="1000" fill="#faf6ee"/>
  <circle cx="650" cy="200" r="180" fill="#d63a3a"/>
  <circle cx="150" cy="800" r="160" fill="#2e74b5"/>
  <circle cx="500" cy="600" r="90" fill="#f5c93a"/>
  <ellipse cx="300" cy="350" rx="80" ry="100" fill="#2d6e4b" transform="rotate(20 300 350)"/>
  <text x="60" y="950" font-family="Noto Serif SC, serif" font-size="80" font-weight="700" fill="#1a1614">AIX 教育</text>
</svg>
```

- [ ] **Step 7: 验证内容编译 + dev 看 4 个专题封面**

```bash
pnpm check
pnpm dev
```

- 打开 `http://localhost:4321/topics/` → 看见 4 个专题卡
- 打开 `http://localhost:4321/topics/regulation-archipelago/` → 单专题，含 1 期"群众的眼睛"
- 打开 `http://localhost:4321/topics/regulation-archipelago/03-mass-eyes/` → 期正文（如果 .md 不支持组件调用，把这个文件后缀改成 .mdx 再试）

杀掉 dev server。

- [ ] **Step 8: 提交**

```bash
git add src/content/topics/
git commit -m "feat: 占位内容 · 4 专题 + 1 期 + 4 张 SVG 封面（席勒/basquiat/haeckel/matisse）"
```

---

## Task 19: 占位内容 · 3 个研究 + 6 篇文章

**Files:**
- Create: `src/content/research/foucault-studies/index.md` + `cover.svg` + 2 articles
- Create: `src/content/research/aix-literature/index.md` + `cover.svg` + 2 articles
- Create: `src/content/research/ai-ethics-research/index.md` + `cover.svg` + 2 articles

- [ ] **Step 1: foucault-studies/index.md + cover.svg**

`src/content/research/foucault-studies/index.md`:
```markdown
---
title: 福柯研究
subtitle: 围绕《规训与惩罚》及延伸的源材料
theme: schiele
status: ongoing
summary: 福柯文本的读书笔记 + 现代二手文献综述。规训群岛专题的源材料库。
related_topic: regulation-archipelago
started: 2025-10
---
```

`cover.svg`: 用席勒色板 + 文字"福柯研究"（结构同 regulation-archipelago/cover.svg，文字换掉）：
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
  <rect width="800" height="1000" fill="#ece1cf"/>
  <text x="40" y="60" font-family="EB Garamond, serif" font-size="13" letter-spacing="4" fill="#7a2820">FOUCAULT · STUDIES</text>
  <g fill="none" stroke="#2a1a14" stroke-width="2">
    <path d="M 100 200 q 600 60 0 200"/>
    <path d="M 100 400 q 600 60 0 200"/>
  </g>
  <text x="40" y="800" font-family="Noto Serif SC, serif" font-size="90" fill="#2a1a14" font-weight="600">福柯研究</text>
  <text x="40" y="950" font-family="Caveat, cursive" font-size="22" fill="#7a2820">— 研究 · 进行中</text>
</svg>
```

- [ ] **Step 2: foucault-studies · 2 篇文章**

`src/content/research/foucault-studies/01-body-territory.md`:
```markdown
---
title: 身体作为最后的辖区——福柯 vs 阿甘本
date: 2026-05-24
length: 1200
type: 读书笔记
tags: [福柯, 阿甘本, 身体, 主权]
sources:
  - title: 规训与惩罚
    author: 米歇尔·福柯
    year: 1975
  - title: 神圣人
    author: 吉奥乔·阿甘本
    year: 1995
---

> **占位文章**——Phase 1 仅用于验证流水线。

福柯笔下的身体是<em>规训</em>的产物——通过姿势、节奏、习惯被塑造。
阿甘本的身体则是<em>主权</em>的剩余——是法律暂停时刻才显形的那个"裸命"。

两人都把身体当作权力的最后辖区，但路径不同。

…… 占位正文 200-500 字 lorem ipsum 中文版 ……
```

`src/content/research/foucault-studies/02-panopticon-update.md`:
```markdown
---
title: 全景敞视的当代翻译
date: 2026-05-20
length: 900
type: 读书笔记
tags: [福柯, 监控, 全景敞视]
sources:
  - title: 规训与惩罚
    author: 米歇尔·福柯
---

> **占位文章**。

边沁的全景敞视监狱，到了 2026 年是什么？

不是政府的监控摄像头。是每个人自愿戴上的可穿戴。
不是被强加的目光。是自我注视的内化。

…… 占位正文 ……
```

- [ ] **Step 3: aix-literature/index.md + cover.svg**

`src/content/research/aix-literature/index.md`:
```markdown
---
title: AIX 教育文献
subtitle: AI 时代教育相关的文献综述
theme: matisse
status: ongoing
summary: AIX 教育专题的源材料库——OECD 报告、PISA 数据、近年学术综述、家长访谈记录。
related_topic: aix-education
started: 2025-11
---
```

`cover.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
  <rect width="800" height="1000" fill="#faf6ee"/>
  <circle cx="650" cy="200" r="200" fill="#d63a3a"/>
  <circle cx="150" cy="800" r="180" fill="#2e74b5"/>
  <text x="60" y="500" font-family="Noto Serif SC, serif" font-size="70" font-weight="700" fill="#1a1614">AIX 教育</text>
  <text x="60" y="580" font-family="Noto Serif SC, serif" font-size="40" fill="#1a1614">文献</text>
</svg>
```

- [ ] **Step 4: aix-literature · 2 篇文章**

`src/content/research/aix-literature/01-pisa-bias.md`:
```markdown
---
title: PISA 测评的解读偏差
date: 2026-05-15
length: 1500
type: 文献综述
tags: [PISA, OECD, 教育评测, 基础教育]
sources:
  - title: PISA 2022 Results
    author: OECD
    year: 2023
---

> **占位文章**。

国际学生评估项目（PISA）每三年一次，但媒体的解读经常脱离测评本身的设计假设。

本文综述近 5 年针对 PISA 解读偏差的研究——批评的不是数据，是数据如何被使用。

…… 占位正文 ……
```

`src/content/research/aix-literature/02-ai-as-tutor.md`:
```markdown
---
title: AI 作为辅导者的近年研究
date: 2026-05-10
length: 2000
type: 文献综述
tags: [AI, 辅导, 教育, 一对一]
---

> **占位文章**。

2024-2026 年关于 "AI 作为家庭辅导者" 的实证研究综述——3 个值得注意的发现：

1. ……
2. ……
3. ……

…… 占位正文 ……
```

- [ ] **Step 5: ai-ethics-research/index.md + cover.svg**

`src/content/research/ai-ethics-research/index.md`:
```markdown
---
title: AI 伦理研究
subtitle: 边界、自指、共谋
theme: escher
status: dormant
summary: AI 边界伦理专题的源材料——围绕"工具的反向规训"这个核心问题的素材收集。
started: 2026-04
---
```

`cover.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
  <rect width="800" height="1000" fill="#ece6dc"/>
  <defs>
    <pattern id="fish" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
      <path d="M 0 40 q 20 -24 40 0 q 20 24 40 0 q -20 24 -40 0 q -20 -24 -40 0 z" fill="#14100a"/>
      <path d="M 0 40 q 20 -24 40 0 q 20 24 40 0" fill="#ece6dc"/>
    </pattern>
  </defs>
  <rect x="400" y="0" width="400" height="1000" fill="url(#fish)"/>
  <text x="40" y="700" font-family="Noto Serif SC, serif" font-size="65" font-weight="500" fill="#14100a">AI</text>
  <text x="40" y="780" font-family="Noto Serif SC, serif" font-size="65" font-weight="500" fill="#14100a">伦理研究</text>
</svg>
```

- [ ] **Step 6: ai-ethics-research · 2 篇文章**

`src/content/research/ai-ethics-research/01-reverse-discipline.md`:
```markdown
---
title: 工具的反向规训
date: 2026-04-30
length: 1100
type: 思考片段
tags: [AI, 福柯, 共谋, 规训]
---

> **占位文章**。

当我们使用 AI 来"提高效率"——是 AI 在帮我们，还是我们在被它驯化？

…… 占位正文 ……
```

`src/content/research/ai-ethics-research/02-vibes-trust.md`:
```markdown
---
title: 从 Trust 到 Vibes——"信"的语义衰减
date: 2026-04-15
length: 800
type: 思考片段
tags: [AI, 信任, 语言]
---

> **占位文章**。

互联网早期我们说 trust——是一种正式的、可被验证的关系。
现在我们说 vibes——是一种模糊的、不可言说的"对劲"。

这个语义滑动，和 AI 的崛起恰好同时发生。

…… 占位正文 ……
```

- [ ] **Step 7: 验证 + dev**

```bash
pnpm check
pnpm dev
```

- 打开 `http://localhost:4321/` → 看见完整 V1.1 首页：1 大封面 + 4 小专题 + 6 条研究
- 打开 `http://localhost:4321/research/` → 看见 3 个研究卡
- 打开 `http://localhost:4321/research/foucault-studies/` → 看见 2 篇文章列表
- 点开任意一篇研究文章 → 正文页正确渲染

杀掉 dev server。

- [ ] **Step 8: 提交**

```bash
git add src/content/research/
git commit -m "feat: 占位内容 · 3 研究 + 6 文章 + 3 SVG 封面"
```

---

## Task 20: Obsidian 模板（5 个）

**Files:**
- Create: `_templates/新建专题.md`
- Create: `_templates/新建期.md`
- Create: `_templates/新建研究.md`
- Create: `_templates/新建研究文章.md`
- Create: `_templates/组件参考.md`

- [ ] **Step 1: 新建专题.md**

```markdown
---
# === 填写以下字段 ===
title: 在这里写专题中文标题
subtitle: 副标题（可省）
theme: schiele                # 选一个：schiele | basquiat | haeckel | matisse | escher
status: planning              # planning（筹备）| ongoing（进行中）| completed（已完结）
type: series                  # series（多期）| single（单期）
planned_issues: 10            # series 时填，single 时删
summary: 一句话简介，会显示在专题列表和首页
related_research:             # 可选，关联到哪些研究 slug（数组）
  - foucault-studies
started: 2026-05              # YYYY-MM
---

<!-- 正文从这里开始 -->

这里写专题的"开场白"——为什么做这个、想说什么、读者会经历什么。

这段会显示在 /topics/<slug>/ 页面的 hero 下面。

<!-- 
=== 写好后告诉 Claude ===
告诉 Claude："新专题 <slug> 写好了"
Claude 会处理：检查字段、commit、push。
slug 是文件夹名（英文 kebab-case），不在 frontmatter 里——目录结构定的。
新建时记得：
1. 在 src/content/topics/ 下建一个文件夹（英文名）
2. 把这个模板复制成里面的 index.md
3. 改字段、写正文
4. 完成
-->
```

- [ ] **Step 2: 新建期.md**

```markdown
---
# === 填写以下字段 ===
issue: 4                              # 这是第几期
title: 在这里写期标题
date: 2026-06-30                      # 发布日期 YYYY-MM-DD
status: published                     # published | draft
summary: 一句话提要（首页可能用到）
free_layer: false                     # 一般不改；需要重型可视化页时由 Claude 改 true
---

import Radar from '@components/core/Radar.svelte';
import Checker from '@components/core/Checker.svelte';
import ConceptAnchor from '@components/core/ConceptAnchor.svelte';
import BloodHighlight from '@components/themes/schiele/BloodHighlight.astro';
import ScribbleDivider from '@components/themes/schiele/ScribbleDivider.astro';
import HandSignature from '@components/themes/schiele/HandSignature.astro';
import PullQuote from '@components/core/PullQuote.astro';
import Divider from '@components/core/Divider.astro';

<!-- 正文从这里开始 -->

你的开场段落。

> 这是一个引文块——用 > 起头。引文会显示成左边线 + italic。

正文段落继续。需要强调时这样：<BloodHighlight>这一句被高亮</BloodHighlight>。

<PullQuote source="福柯 1975">
公开处决的退场，留下的不是温和，而是更细密的网。
</PullQuote>

需要分隔的地方放：<ScribbleDivider />

继续段落……

<Radar 
  client:visible
  dimensions={['维度A', '维度B', '维度C']} 
  values={[3, 5, 2]} 
  caption="这张图说明什么"
/>

文章结尾用签名：<HandSignature name="大大黄油" />

<!-- 
=== 重要：文件后缀 ===
如果你这一期"实际用到了组件"（即上面的 import 至少有一行被实际调用），
新建文件时后缀必须用 .mdx 不是 .md。
比如：03-mass-eyes.mdx
如果整篇纯文本不需要任何组件，可以删掉所有 import，后缀用 .md 即可。

=== 完整组件清单见 组件参考.md ===
=== 写好后告诉 Claude："<专题>/<期-slug> 写好了" ===
-->
```

- [ ] **Step 3: 新建研究.md**

```markdown
---
# === 填写以下字段 ===
title: 在这里写研究标题
subtitle: 副标题（可省）
theme: schiele                  # 选一个：schiele | basquiat | haeckel | matisse | escher
status: ongoing                 # ongoing（进行中）| dormant（已沉淀）
summary: 一句话简介
related_topic: regulation-archipelago    # 可选，关联到哪个专题 slug
started: 2026-05                # YYYY-MM
---

<!-- 正文从这里开始（可选） -->

研究主题的导言——这是关于什么的研究、为什么开。

这段会显示在 /research/<slug>/ 页面的 hero 下面。
研究通常 hero 后面就是文章列表，导言不需要太长。

<!-- 
=== 写好后告诉 Claude ===
1. 在 src/content/research/ 下建一个文件夹（英文 slug）
2. 把这个模板复制成里面的 index.md
3. 改字段、写导言（可短）
4. 告诉 Claude
-->
```

- [ ] **Step 4: 新建研究文章.md**

```markdown
---
# === 填写以下字段 ===
title: 在这里写文章标题
date: 2026-06-30                 # YYYY-MM-DD
length: 1500                     # 字数（粗略估计，可省）
type: 读书笔记                   # 自由文本：读书笔记 / 文献综述 / 人物思想综述 / 思考片段 / 章节笔记 等
tags:                            # 标签数组，会用于聚类
  - 福柯
  - 身体
sources:                         # 引用书目（可省）
  - title: 规训与惩罚
    author: 米歇尔·福柯
    year: 1975
---

<!-- 正文从这里开始 -->

研究综述/读书笔记的正文。

注意：研究文章通常**不**用交互装置（雷达图等）——保持轻量、长文阅读。
需要时也可用，参考 组件参考.md。

> 引文块。

<!-- 
=== 写好后告诉 Claude："<研究>/<文章-slug> 写好了" ===
-->
```

- [ ] **Step 5: 组件参考.md**

```markdown
# 组件参考 · 写期/文章时复制粘贴用

> 这个文件不是被发布的——它是给你查阅用的"工具箱"。

---

## 在 .md 文件顶部（frontmatter 之后）import 组件

只 import 你这一期实际用到的组件——没用的不要 import，加载快。

```js
// 核心组件（任何主题可用）
import Radar from '@components/core/Radar.svelte';
import Checker from '@components/core/Checker.svelte';
import ConceptAnchor from '@components/core/ConceptAnchor.svelte';
import PullQuote from '@components/core/PullQuote.astro';
import Footnote from '@components/core/Footnote.astro';
import Divider from '@components/core/Divider.astro';

// 席勒主题装饰组件（仅 theme: schiele 时可用）
import BloodHighlight from '@components/themes/schiele/BloodHighlight.astro';
import ScribbleDivider from '@components/themes/schiele/ScribbleDivider.astro';
import HandSignature from '@components/themes/schiele/HandSignature.astro';
import RomanChapter from '@components/themes/schiele/RomanChapter.astro';
```

---

## 1. 引用块（PullQuote）

```mdx
<PullQuote source="福柯 1975">
公开处决的退场，留下的不是温和，而是更细密的网。
</PullQuote>
```

---

## 2. 雷达图（Radar）· 多维度对比

```mdx
<Radar 
  client:visible
  dimensions={['君主', '规训', '生命']} 
  values={[2, 5, 1]} 
  caption="教室里的三种权力配比"
/>
```

- dimensions: 任意维度数组（3-6 个最舒服）
- values: 0-5 的数字数组，长度匹配 dimensions
- caption: 图说（可省）

---

## 3. 勾选器（Checker）· 多条件诊断

```mdx
<Checker
  client:visible
  title="勾选你满足的条件"
  conditions={['公开处决', '群众围观', '即时反馈']}
  verdicts={{
    '': '无',
    '公开处决': 'A 类规训',
    '公开处决,群众围观': 'B 类规训',
    '公开处决,群众围观,即时反馈': '当代规训完整体'
  }}
/>
```

verdicts 的 key 是条件名（按数组顺序）逗号拼接。

---

## 4. 概念锚点（ConceptAnchor）· hover/click 弹出小卡

```mdx
当我们说<ConceptAnchor client:visible concept="规训" definition="一种纪律化的权力技术，福柯 1975" source="《规训与惩罚》" />的时候……
```

---

## 5. 高亮（BloodHighlight）· 席勒专属

```mdx
正文段落，<BloodHighlight>这一句被血红下划线</BloodHighlight>，继续正文。
```

---

## 6. 分隔（多种）

```mdx
<!-- 颤抖手绘风分隔（席勒专属） -->
<ScribbleDivider />

<!-- 三点分隔 -->
<Divider />

<!-- 短血红线 -->
<Divider variant="line" />

<!-- 原生 markdown 分隔（暗灰长线） -->
---
```

---

## 7. 签名（HandSignature）· 席勒专属

```mdx
<HandSignature name="大大黄油" />
```

可选 `rotate={-2}` 控制倾斜角度。

---

## 8. 罗马章号（RomanChapter）· 席勒专属

```mdx
<RomanChapter num={4} />
```

显示成大号赭黄 "IV." —— 一般 IssueLayout 自动加在 hero 区，正文中需要分章时也可手动用。

---

## 9. 脚注（Footnote）

```mdx
<Footnote num={1}>
这里是脚注内容——尾注或者解释。
</Footnote>
```

---

## 提示

- **本主题** 装饰组件（如 BloodHighlight）只能在 `theme: schiele` 的页面用——build 时如果误用会报错
- **客户端组件**（Radar/Checker/ConceptAnchor）必须加 `client:visible` 才会启用交互
- 不确定用什么时直接告诉 Claude："我想要 X 效果"，Claude 帮你选组件
```

- [ ] **Step 6: 提交**

```bash
git add _templates/
git commit -m "feat: 5 个 Obsidian 模板 · 新建专题/期/研究/研究文章 + 组件参考"
```

---

## Task 21: GitHub + EdgeOne Pages + 域名

**Files:**
- 无新文件创建。这一步是外部服务配置。

⚠️ **这一步需要用户配合**：

- [ ] **Step 1: GitHub 仓库创建**

询问用户：仓库公开还是私有？仓库名 `bigbutters` 是否 OK？

```bash
# 假设用户授权使用 gh cli
gh repo create bigbutters --private --source=. --description="🪳 大大黄油 · 个人交互式学术策展空间"
git remote add origin git@github.com:<user>/bigbutters.git
git branch -M main
git push -u origin main
```

如果用户没装 gh，引导走 github.com 网页创建 + `git remote add` + `git push`。

- [ ] **Step 2: EdgeOne Pages 项目创建**

引导用户在 https://console.cloud.tencent.com/edgeone/pages：

1. 「新建项目」→「从 GitHub 导入」
2. 授权 EdgeOne 访问 `bigbutters` 仓库
3. 框架预设：选 Astro（如果列表里有；否则选"其他"手动配置）
4. Build command: `pnpm build`
5. Output directory: `dist`
6. Node version: 20
7. 触发构建，等成功

- [ ] **Step 3: 自定义域名配置**

EdgeOne 后台：
1. 项目设置 → 域名 → 添加自定义域名 `bigbutters.top`
2. 复制 EdgeOne 给出的 CNAME 目标
3. 到 bigbutters.top 域名注册商后台，添加 CNAME 记录：`@` → EdgeOne 目标
   （或 `www` → EdgeOne，然后做 @ → www 重定向，二选一）
4. 回 EdgeOne 验证域名归属
5. 等待 HTTPS 证书自动签发（5-30 分钟）

- [ ] **Step 4: 验证部署**

```bash
curl -I https://bigbutters.top/
```

Expected: `HTTP/2 200`，且响应头包含 `server: ...edgeone...`（确认走 EdgeOne）。

浏览器打开 https://bigbutters.top/ → 看见首页 V1.1。

- [ ] **Step 5: 验收文件提交（部署说明）**

创建 `docs/superpowers/deployment-notes.md`：

```markdown
# Deployment Notes

## Stack
- GitHub: <user>/bigbutters
- EdgeOne Pages 项目: <项目 ID>
- 域名: bigbutters.top
- Build command: pnpm build
- Output: dist
- Node: 20.x

## DNS
- bigbutters.top  CNAME  <edgeone-target>

## 触发部署
- `git push` 到 main 分支自动触发
- 构建时间约 30-60 秒
- 失败查看 EdgeOne Pages 控制台日志

## 回滚
- EdgeOne 控制台「部署历史」→ 点旧版本「回滚」
```

写入并提交。

```bash
git add docs/superpowers/deployment-notes.md
git commit -m "docs: 部署说明（GitHub + EdgeOne Pages + bigbutters.top DNS）"
git push
```

---

## Task 22: 验收 + 修复 + 最终提交

**Files:**
- 修复发现的 bug
- 可能创建 `docs/superpowers/acceptance-2026-05-27.md`

- [ ] **Step 1: 跑完整验收清单（Spec 9.3）**

逐项核对：
```
☐ bigbutters.top 可访问 (HTTPS)
☐ 首页 V1.1 渲染正常：
    ☐ 当期主推：规训群岛大封面 (席勒)
    ☐ 所有专题：4 个缩略（规训/内卷/通向实在/AIX）
    ☐ 研究区：6 篇研究文章列表 + 聚类标签
☐ /topics/ 列表页：4 个专题占位封面正确显示
☐ /topics/regulation-archipelago/ 单专题首页（席勒皮肤，期列表含 1 期）
☐ /topics/regulation-archipelago/03-mass-eyes/ 占位期正文 + 席勒样式
☐ /topics/inv-culture/ 单专题首页（basquiat 占位主题色生效）
☐ /topics/road-to-reality/ 单专题首页（haeckel 占位主题色生效）
☐ /topics/aix-education/ 单专题首页（matisse 占位主题色生效）
☐ /research/ 列表页：3 个研究占位封面
☐ /research/foucault-studies/ 单研究首页（席勒皮肤，2 篇文章列表）
☐ /research/foucault-studies/01-body-territory/ 占位文章正文
☐ /research/aix-literature/ + 任一文章
☐ /research/ai-ethics-research/ + 任一文章
☐ 移动端 (≤640px) 排版不破：首页 4 专题改单列、研究列表纵向滚
☐ 5 个 Obsidian 模板可用（手动测试：新建一个 .md 应用模板）
☐ 跑通一次完整发布：新建期 → push → EdgeOne 构建 → 上线（< 60 秒）
```

每项打钩，发现的问题列在下面。

- [ ] **Step 2: 修复任何发现的问题**

常见可能问题 + 应对：
- `.md` 中组件调用不渲染 → 改后缀为 `.mdx`，更新 `glob` 模式（如有需要）
- 占位封面 SVG 显示错位 → 检查 viewBox、调整文字坐标
- 移动端导航溢出 → 调 Header.astro 媒体查询
- 中文字体加载慢 → 确认 woff2 subset 化、确认 preload 生效
- EdgeOne 构建失败 → 检查 Node 版本、pnpm 版本、build 输出

每次修复后：
```bash
git add -A
git commit -m "fix: <具体描述>"
git push
```

- [ ] **Step 3: 跑完整测试**

```bash
pnpm check       # 类型 + frontmatter schema
pnpm test        # 单元测试
pnpm build       # 静态构建
```

Expected: 全部通过、build 成功、`dist/` 目录有产出。

- [ ] **Step 4: 跑链接检查（可选但推荐）**

```bash
npx linkinator http://localhost:4321/ --recurse
# 或部署后
npx linkinator https://bigbutters.top/ --recurse
```

修任何 404。

- [ ] **Step 5: 创建验收记录**

写入 `docs/superpowers/acceptance-2026-05-27.md`（仅在所有勾选都打钩后）：

```markdown
# Phase 1 验收 · 2026-05-27

## 状态
✅ 全部通过

## 验收清单
[逐项打钩，复制 spec 9.3 + 实际状态]

## 已知 issue（推迟到 Phase 2）
- ……
- ……

## 链接
- Live: https://bigbutters.top/
- Repo: https://github.com/<user>/bigbutters
- Spec: docs/superpowers/specs/2026-05-27-bigbutters-design.md
- Plan: docs/superpowers/plans/2026-05-27-bigbutters-phase1.md
```

- [ ] **Step 6: 最终提交 + push**

```bash
git add docs/superpowers/acceptance-2026-05-27.md
git commit -m "docs: Phase 1 验收记录 · 所有清单项通过"
git push
```

🎉 Phase 1 完成。

---

## 完成定义

所有 22 个 task 的复选框都勾选完毕，且：

- [ ] `pnpm check` 通过（无类型错误）
- [ ] `pnpm test` 通过（所有 Vitest 测试）
- [ ] `pnpm build` 成功（dist/ 有产出）
- [ ] `https://bigbutters.top/` 返回 200 且首页 V1.1 完整呈现
- [ ] Spec 9.3 验收清单全部勾选
- [ ] 至少一次"新建期 → push → 上线"完整流水线验证

完成后下一步：进入 Phase 2 —— 真实内容灌入（规训群岛真实文章、AIX 文献综述等），按需启用 Basquiat / Haeckel / Matisse / Escher 等主题包的完整装饰组件。
