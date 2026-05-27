# 大大黄油 · 技术交接文档

> 目标读者：接手本项目的 AI / 工程师 / 内容作者
> 最后更新：2026-05-27 · 项目当前已上线 https://bigbutters.top/

---

## 0. 30 秒摘要

**bigbutters.top** 是一个个人交互式学术策展空间。
**两轴内容**：专题（topics，已发布的成稿系列）+ 研究（research，源材料/综述）。
**主题包系统**：每个专题或研究挂载一位艺术家的视觉系统（席勒 / Basquiat / Haeckel / Matisse / Escher），同一站点不同区域呈现完全不同的视觉气质。

**技术栈**：Astro 5 + Svelte 5 islands + MDX + Sharp 图像处理 + 自托管字体 + EdgeOne Pages。
**部署**：GitHub push → EdgeOne Pages 自动构建（约 1-2 分钟）→ bigbutters.top。

---

## 1. 关键文件指引

```
🪳大大黄油/
├── astro.config.mjs               # Astro 配置，static 输出，svelte+mdx
├── package.json                   # 含 prebuild/postbuild 清理 .DS_Store
├── tsconfig.json                  # path alias: @components @layouts @themes @styles
├── public/
│   ├── fonts/                     # 5 个自托管字体 woff2 + LICENSE.md (OFL/Apache)
│   └── favicon.svg
├── src/
│   ├── env.d.ts
│   ├── content/
│   │   ├── config.ts              # 4 个 Zod schema（topics/issues/research/researchArticles）
│   │   ├── topics/<slug>/         # 专题目录，含 index.md + 期文件
│   │   └── research/<slug>/       # 研究目录，含 index.md + 文章 + images/
│   ├── themes/
│   │   ├── _types.ts              # themeIds as const + ThemePack 接口
│   │   ├── index.ts               # registry + getTheme + tokensToCss
│   │   ├── schiele.ts             # 完整实现
│   │   ├── basquiat.ts            # 完整实现（含装饰组件）
│   │   ├── haeckel.ts             # 占位
│   │   ├── matisse.ts             # 占位
│   │   └── escher.ts              # 占位
│   ├── layouts/
│   │   ├── BaseLayout.astro       # 主题注入 + 字体 preload + OG meta
│   │   ├── HomeLayout.astro       # 首页 V1.1 双轨
│   │   ├── TopicLayout.astro
│   │   ├── IssueLayout.astro
│   │   ├── ResearchLayout.astro   # 含 BasquiatHero theme-aware 切换
│   │   └── ArticleLayout.astro    # 含 hero 大封面 + Basquiat 特化
│   ├── components/
│   │   ├── core/                  # PullQuote / Footnote / Divider + Svelte islands
│   │   ├── chrome/                # Header / Footer / Nav / CoverCard
│   │   └── themes/<theme>/        # 主题专属装饰组件
│   ├── pages/                     # 路由（约定式：基于 content collections）
│   │   ├── index.astro            # 首页
│   │   ├── about.astro
│   │   ├── topics/...
│   │   └── research/...
│   └── styles/
│       ├── reset.css
│       └── base.css               # 含全部主题特化 prose 样式
├── _templates/                    # 5 个 Obsidian 模板
├── tests/                         # Vitest 单测（仅 3 个 Svelte 组件）
└── docs/
    ├── superpowers/specs/...      # 原始设计文档
    ├── superpowers/plans/...      # 原始实施计划
    ├── superpowers/acceptance-... # Phase 1 验收记录
    └── HANDOVER.md                # 本文件
```

---

## 2. 内容模型 · 核心概念

### 2.1 专题（Topic）vs 研究（Research）

**专题** = 成稿、对外发布的研究系列
- 可包含多期（series, planned_issues 必填）或单期（single）
- URL: `/topics/<slug>/` + `/topics/<slug>/<issue-slug>/`

**研究** = 源材料 / 综述 / 读书笔记 / 思考片段
- 可以独立存在或关联到某专题
- URL: `/research/<slug>/` + `/research/<slug>/<article-slug>/`

**关键约定**：两者完全独立，没有 1:1 关系。可以双向引用（related_topic / related_research）但不强制。

### 2.2 文件夹结构约定

```
src/content/topics/<topic-slug>/
├── index.md            # 专题元数据 + 简介
├── 01-foo.md           # 期 · 编号要和 frontmatter issue 字段对齐
├── 02-bar.mdx          # 用组件时改 .mdx
└── cover.jpg           # 可选 · 专题主封面

src/content/research/<research-slug>/
├── index.md (or .mdx)  # 研究元数据 + 导言
├── 01-foo.md           # 文章 · 同样数字前缀
├── 02-bar.md
└── images/
    ├── hero.png        # 研究 hero 大图（可选）
    ├── 01.png          # 文章 01 封面（可选）
    └── 02.png
```

**slug 规则**：全英文 kebab-case。中文标题写在 frontmatter。glob loader 基于文件夹名生成 collection ID。

### 2.3 4 个 Zod schema（`src/content/config.ts`）

```ts
// topics
{
  title, subtitle?, theme (themeEnum), status (ongoing|planning|completed),
  type (series|single), planned_issues?, summary, cover?, related_research?, started (YYYY-MM)
}
// superRefine: series 必须有 planned_issues，single 不能有

// issues (key: topics/<slug>/<issue-slug>)
{ issue, title, date, status (draft|published), summary?, free_layer? }

// research
{ title, subtitle?, theme, status (ongoing|dormant), summary, cover?, related_topic?, started }

// researchArticles (key: research/<slug>/<article-slug>)
{ title, date, length?, type, tags[], order?, cover?, sources[]? }
```

**重要**：theme 字段是 `themeEnum = z.enum(themeIds)`，`themeIds` 在 `src/themes/_types.ts` 定义。加新主题 = 改这里 + index.ts registry。

### 2.4 Collection ID 格式（很容易踩坑）

glob loader `base: './src/content/topics'` + `pattern: '*/index.{md,mdx}'`：
- 文件 `src/content/topics/regulation-archipelago/index.md`
- → ID `regulation-archipelago/index`（或 `regulation-archipelago`，Astro 5 strip index）
- 拿 slug：`entry.id.split('/')[0]` ← **永远用这个，不要 hardcode 路径**

类似的 issues 用 `pattern: '*/!(index).{md,mdx}'`，ID = `<topic-slug>/<issue-slug>`。

---

## 3. 常见操作 · How-To

### 3.1 添加一个新专题

```bash
mkdir -p src/content/topics/new-topic-slug
# 复制 _templates/新建专题.md 到 src/content/topics/new-topic-slug/index.md
# 改 frontmatter
```

frontmatter 模板：
```yaml
---
title: 新专题中文标题
subtitle: 副标题（可省）
theme: schiele                # schiele | basquiat | haeckel | matisse | escher
status: planning              # planning | ongoing | completed
type: series                  # series | single
planned_issues: 10            # series 时必填
summary: 一句话简介
related_research:             # 可选
  - some-research-slug
started: 2026-05
---

简介正文（可选）。
```

build 时 Zod 自动校验。

### 3.2 添加一期（issue）到现有专题

```bash
# 文件名：<NN>-<slug>.md 或 .mdx
# 例 src/content/topics/regulation-archipelago/04-classroom-discipline.md
```

frontmatter：
```yaml
---
issue: 4
title: 教室作为最小的监狱
date: 2026-06-15
status: published          # 或 draft（不公开生成路由）
summary: 一句话提要
free_layer: false
---

正文……
```

⚠️ **如果文章里用组件（`<Radar>` `<BloodHighlight>` 等）**：文件后缀必须是 **.mdx**，且需要在 frontmatter 后 import：

```mdx
---
issue: 4
title: ...
---

import Radar from '@components/core/Radar.svelte';
import BloodHighlight from '@components/themes/schiele/BloodHighlight.astro';

正文 <BloodHighlight>这里高亮</BloodHighlight>。
```

### 3.3 添加一个新研究

类似专题，但路径 `src/content/research/<slug>/`：

```yaml
---
title: 研究标题
subtitle: 副标题
theme: schiele
status: ongoing             # ongoing | dormant
summary: 一句话简介
related_topic: some-topic   # 可选反向关联
started: 2026-05
cover:
  hero_image: ./images/hero.png   # 可选，放在 images/ 子目录
---

简介。
```

### 3.4 添加一篇研究文章

文件名 `<NN>-<slug>.md`，frontmatter：

```yaml
---
title: 文章标题
order: 1                     # 与文件名前缀对齐，决定列表顺序
date: 2026-05-24
length: 1500
type: 文献综述               # 自由文本：读书笔记 / 文献综述 / 思考片段 / 人物思想综述
tags:
  - "AI"
  - "对齐"                   # 数字 tag 必须加引号防 YAML 解析为 number
cover:
  hero_image: ./images/01.png       # 可选
sources:                     # 可选
  - title: 规训与惩罚
    author: 米歇尔·福柯
    year: 1975
---

正文（如有 [[wiki-link]] 形式的引用，自己手动改为 markdown 链接：
[01 · 标题](/research/<research-slug>/01-foo/))
```

### 3.5 添加图片

1. 把图（PNG/JPG）放进 `src/content/<topics|research>/<slug>/images/`
2. 在 markdown frontmatter 用相对路径：
   ```yaml
   cover:
     hero_image: ./images/01.png
   ```
3. Astro Sharp pipeline 自动生成多倍 WebP（320/640/960/1280 widths）。原 3MB PNG → ~280KB WebP。

**注意**：图片必须放在 `src/content/<collection>/<slug>/images/` 或同级目录内（schema 的 `image()` 函数要求相对内容文件路径）。**不要**放 `public/`（那里不被优化）。

### 3.6 添加一个新主题包（例如 Klimt）

**步骤 1**：在 `src/themes/_types.ts` 的 `themeIds` 数组加 'klimt'：
```ts
export const themeIds = ['schiele', 'basquiat', 'haeckel', 'matisse', 'escher', 'klimt'] as const;
```
这会同时更新 `ThemeId` 类型 + `themeEnum` Zod 校验。

**步骤 2**：创建 `src/themes/klimt.ts`：
```ts
import type { ThemePack } from './_types';
export const klimt: ThemePack = {
  id: 'klimt',
  name: 'Klimt',
  tokens: { bg, bgSoft, bgDeep, ink, inkSoft, inkFaint, accent, accentSoft, ochre, rule }, // 10 必填
  fonts: { serif?: '...', script?: '...', sans?: '...' },
  decorativeComponents: [],  // 占位用空数组；之后填装饰组件名
  classOverrides: 'theme-klimt',
};
```

**步骤 3**：在 `src/themes/index.ts` 加 import 和 registry：
```ts
import { klimt } from './klimt';
export const themes = { ..., klimt } satisfies Record<ThemeId, ThemePack>;
```

`pnpm check` 后通过。可在专题 / 研究 frontmatter `theme: klimt`。

### 3.7 添加主题专属装饰组件

例如要给 Klimt 加一个 `<GoldOrnament>`：

**步骤 1**：创建 `src/components/themes/klimt/GoldOrnament.astro`
```astro
---
export interface Props { size?: number; }
const { size = 64 } = Astro.props;
---
<svg class="klimt-gold-ornament" width={size} height={size} viewBox="0 0 64 64">
  ...
</svg>
<style>
  /* 用 var(--accent) var(--ink) 等 token，跟随主题色板 */
</style>
```

**步骤 2**：在 `klimt.ts` 的 `decorativeComponents` 数组加 'GoldOrnament'。

**步骤 3**：作者在文章 .mdx 中 `import GoldOrnament from '@components/themes/klimt/GoldOrnament.astro'` 后使用。

### 3.8 主题特化 layout / 整页样式

如果想让某主题下整个 layout 看起来完全不同（例如 Basquiat 的全屏装饰背景）：

**模式**：在 Layout 文件检测 `theme` prop，conditional render：

```astro
---
import BasquiatBackground from '@components/themes/basquiat/BasquiatBackground.astro';
const { theme } = Astro.props;
const isBasquiat = theme === 'basquiat';
---
<BaseLayout {theme} ...>
  {isBasquiat && <BasquiatBackground />}
  <Header />
  <main class:list={{ 'bsq-main': isBasquiat }}>
    {isBasquiat ? <BasquiatHero ... /> : <DefaultHero ... />}
  </main>
</BaseLayout>
```

主题特化 CSS 写在 `src/styles/base.css` 末尾，用 `body.theme-<id> .selector` 命名空间：

```css
body.theme-basquiat .prose h2 { ... }
body.theme-basquiat .site-header { ... }
```

`body` 的 class 由 BaseLayout 注入（来自 `pack.classOverrides`）。

### 3.9 修改主页 / 列表页样式

主页：`src/pages/index.astro` + `src/layouts/HomeLayout.astro`
列表页：`src/pages/topics/index.astro` / `src/pages/research/index.astro`
单专题：`src/pages/topics/[topic]/index.astro`
单期：`src/pages/topics/[topic]/[issue].astro`
单研究：`src/pages/research/[research]/index.astro`
单文章：`src/pages/research/[research]/[article].astro`

**所有动态路由都基于 content collections + `getStaticPaths`**。

### 3.10 修改全站排版默认

`src/styles/base.css` —— 含全局 typography（`body` + 默认 `.prose h1/h2/h3/p/blockquote/...`）。
中性 `.prose` 是 Schiele/默认样式。覆盖特定主题用 `body.theme-XXX .prose ...`。

---

## 4. 构建 + 部署工作流

### 4.1 本地命令

```bash
pnpm install                  # 装依赖
pnpm dev                      # http://localhost:4321 实时预览
pnpm check                    # 类型 + frontmatter Zod 校验（必跑）
pnpm build                    # 生成 dist/，含 Astro Sharp 图像处理
pnpm test                     # Vitest 单元测试（3 个 Svelte 组件）
```

`prebuild` / `postbuild` 自动清理 .DS_Store。

### 4.2 部署管道

```
本地 git commit
  ↓
git push origin main
  ↓
GitHub (wuhabala/bigbutters)
  ↓ webhook
EdgeOne Pages 自动构建（~1-2 分钟）
  · pnpm install
  · pnpm build
  · deploy to CDN
  ↓
https://bigbutters.top/ 上线
```

**EdgeOne 配置**（已设好，仅记录）：
- Build command: `pnpm build`
- Output directory: `dist`
- Node: ≥ 20
- Auto deploy on push to `main`

### 4.3 发布一篇新文章的完整流程

```bash
# 1. 创建文件
vim src/content/research/ai-safety-boundary/10-new-article.md

# 2. 本地预览（可选）
pnpm dev

# 3. 类型检查
pnpm check

# 4. commit + push
git add src/content/research/ai-safety-boundary/10-new-article.md
git commit -m "feat: 新文章 第 10 期"
git push

# 5. 等 1-2 分钟 EdgeOne 构建完成，bigbutters.top 自动更新
```

### 4.4 调试构建失败

`pnpm build` 报错时常见原因：
1. **frontmatter 字段缺失 / 类型错** → Zod 报错指明文件:字段
2. **数字 tag 未加引号** YAML 解析成 number 而 schema 期望 string → tags 全部加 `"双引号"`
3. **图片路径错** → image() schema 找不到文件，检查相对路径
4. **TS 类型错** → CoverCard / Layout props 类型不匹配，看 ts(2322) 错误
5. **Sharp 安装失败** → `pnpm add sharp` 重新安装

---

## 5. 架构约定（不要随意改）

### 5.1 主题包架构

**核心 invariant**：每个 ThemePack 必须提供同样的 10 个 token（`ThemeTokens` 接口）。这让所有页面/组件用 `var(--bg) var(--ink) var(--accent)` 等通用变量，主题切换 = 改 token 值，不改组件代码。

**装饰组件白名单**：`pack.decorativeComponents` 是文档性质，目前未在 build 时强制校验（误用其他主题的组件不会报错）。Phase 2 待加强。

### 5.2 路径别名

```
@components/*  → src/components/*
@layouts/*     → src/layouts/*
@themes/*      → src/themes/*
@themes        → src/themes/index.ts （registry import）
@styles/*      → src/styles/*
@content/*     → src/content/*
```

### 5.3 字体加载策略

- **Preload**: 仅 NotoSerifSC-Regular + EBGaramond-Regular（核心首屏字体）
- **Lazy load**: SemiBold / Italic / Caveat / Permanent Marker（@font-face 声明，按需触发）
- 这是 Checkpoint 1 评审反馈落实，**不要回退把所有字体都 preload**（会触发 2.9MB 中文字体首屏开销）

### 5.4 `.prose` 作用域

`.prose` 类专门给 markdown 渲染内容容器使用（IssueLayout / ArticleLayout / topic-summary 等 slot wrapper）。**chrome 与 UI 组件**（Header / Nav / CoverCard）**不挂 .prose**，自己定义样式。

### 5.5 hero h1 字重

`.prose h1/h2/h3` 字重用 `500` 而非 600/700，**避免触发 SemiBold（1.5MB）加载**。
Basquiat 主题里覆盖为 700 是因为整体气质需要（用户接受了加载成本）。

### 5.6 ID 解析永远用 `.split('/')[0]`

```ts
const slug = entry.id.split('/')[0];   // 永远拿到 slug
// 文件路径不要 hardcode，glob loader 的 base 决定 ID 格式
```

### 5.7 OG type 分流

- 默认 `og:type=website`（首页 / 列表页 / about）
- IssueLayout / ArticleLayout 显式传 `ogType="article"`

---

## 6. 已知坑

### 6.1 路径含 emoji 和中文空格

项目根 `/Users/mac/Library/Mobile Documents/iCloud~md~obsidian/Documents/🪳大大黄油/` 含 emoji 和空格。**Shell 命令必须 quote 路径**。`gh` / `git` / `pnpm` 都能处理但要小心 sub-shells。

### 6.2 Svelte 5 而非 4

`@astrojs/svelte ^7.0.0` 强制 Svelte 5。**所有 Svelte 组件用 runes 语法**：
- `$state()` / `$derived()` / `$props()` / `$effect()`
- 不要 `let count = 0`（在 template 里非响应式）/ `export let prop` / `$: derived = ...`
- 事件用 `onclick={fn}` 不是 `on:click={fn}`

### 6.3 `@testing-library/svelte` 必须 ≥ 5.2 才支持 Svelte 5

不要降级。

### 6.4 vite-plugin-svelte v7 不兼容 Astro 5 的 Vite 6

锁定在 `^5.0.0`。

### 6.5 EdgeOne Preview URL 有签名保护

`*.edgeone.cool` 直接 curl 返回 401（缺 `eo_time` 参数）。**用 bigbutters.top 自定义域名验证生产**。

### 6.6 macOS 用户 .DS_Store

`prebuild` + `postbuild` 钩子自动清理 `public/`、`src/`、`dist/` 里的 `.DS_Store`。`.gitignore` 也排除。如果上 git 还是看到，确认 prebuild 是否跑了。

### 6.7 YAML frontmatter 中数字 tag

`tags: - 2025` 会被 YAML 解析为 number，Zod schema 期望 string 报错。**所有数字 tag 加双引号**：`- "2025"`。

### 6.8 CNAME 解析滞后

`bigbutters.top` 的 CNAME 改了后，DNS 传播到所有 resolver 可能需要 5-30 分钟。EdgeOne A 记录注入也需要域名"激活"过程。期间用 preview URL 或等。

---

## 7. 关键设计决策（防回退）

1. **Markdown + 旁挂自由层**作为内容载体，不是纯 Markdown / 不是 hand-crafted HTML。理由：作者写作流和 Obsidian 自然衔接，重型期可写 `.astro` 自由层。
2. **专题与研究双轨独立**：不是研究 = 专题的草稿。两者各自有 theme、各自有 cover、各自有列表页。
3. **slug 用英文 kebab-case**：避免 URL 编码后丑陋（`%E8%A7%84...`）。
4. **theme 字段允许默认 schiele**：未指定时全站默认席勒（母站门厅调性）。
5. **`order` 字段优先于 `date`** 用于研究文章排序：用户偏好按文件名编号顺序展示。
6. **图片放 `src/content/` 内**而非 `public/`：让 Astro Sharp 自动多倍 WebP。

---

## 8. 关键文档参考

- `docs/superpowers/specs/2026-05-27-bigbutters-design.md` — 完整设计文档（视觉系统 / 数据模型 / 架构）
- `docs/superpowers/plans/2026-05-27-bigbutters-phase1.md` — Phase 1 完整 22 个 task 实施计划
- `docs/superpowers/acceptance-2026-05-27.md` — Phase 1 验收记录（含 3 轮外部评审 20 个 finding 闭环表）
- `public/fonts/LICENSE.md` — 字体来源 + SHA-256 + OFL/Apache 全文

---

## 9. 最近做的事 · Git log 主线

```
6596905 feat(images): 10 张图接入 Astro Image 优化管线
b096f8d feat(Basquiat chrome): 顶端/底部/大标题/日期/eyebrow 全面 Basquiat 化
912b121 feat(Basquiat prose): 正文卡片化 + 排版重塑 + 字号收小
db05f3b fix(01): 三层约束 ASCII 框替换为嵌套 CSS 盒子
a944e43 feat(Basquiat): 全屏装饰背景 + 主题特化 Hero + 摇摆动效
7595559 feat(Basquiat): 主题色升级亮黄 + 排序按 order + 装饰组件 demo
81da225 feat(Phase 2): AI 安全边界研究 · 9 篇 + Basquiat 主题完整开发
```

---

## 10. 还能往哪里继续

### 短期 · 视觉细化

- **MJ 出真封面** 替换 SVG 占位（topics 那 4 个）
- **更多主题包完整化**：Haeckel / Matisse / Escher 当前只占位 token，没装饰组件，没主题特化 hero。开 Klimt / Klee 时重复 Basquiat 流程
- **首页加 hero 大封面** 现在首页只有缩略图墙
- **专题首页（TopicLayout）** 像 ResearchLayout 一样做 theme-aware 处理

### 中期 · 内容生产

- **规训群岛真实文章**（当前只 1 期占位）
- **AIX 教育文献综述** 转入 research/aix-literature/
- **通向实在之路** 启动（如有内容）

### 长期 · 架构升级

- `decorativeComponents` 白名单变成 build 时强制校验（用错主题的组件应报错）
- `related_research` / `related_topic` 升级用 `reference()` 替代 `z.string()`（build 时死链报错）
- `Checker` 组件 verdict key 用稳定 ID 而非 condition 文本拼接
- RSS / Atom feed
- 站内搜索（专题数量增长后）

---

## 11. 紧急联系 / 验证 / 回滚

**Live URL**：https://bigbutters.top/
**Repo**：https://github.com/wuhabala/bigbutters
**Hosting**：腾讯云 EdgeOne Pages
**域名**：bigbutters.top（CNAME 指向 EdgeOne）

**部署回滚**：EdgeOne 控制台 → 项目 → 部署历史 → 选历史版本点"回滚"。
**本地回滚**：`git revert <commit>` 或 `git reset --hard <commit>` + `git push --force`。
**EdgeOne 构建失败**：控制台看 build log，最常见原因看 §4.4。

---

📍 **如果你是接手的 AI**：请先读完本文件，再 `pnpm install && pnpm dev` 跑起来，然后从用户实际诉求出发。本项目所有架构决策都有具体由来，遇到不解的设计先翻 §5（约定）和 §7（决策记录）。
