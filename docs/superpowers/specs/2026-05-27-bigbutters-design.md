# 大大黄油 · 站点设计文档

| | |
|---|---|
| **日期** | 2026-05-27 |
| **品牌** | 大大黄油 (Bigbutters) |
| **域名** | `bigbutters.top` |
| **代号** | 🪳 |
| **状态** | 设计已锁定，待实施计划 |

---

## 0. 一句话定位

**大大黄油是一个个人交互式学术策展空间——一个能让多种研究主题以各自完整视觉世界陈列的橱窗，主轴是个人长期沉淀，次轴是配合公众号传播。**

---

## 1. 目标与非目标

### 1.1 目标（YES）

- 作为作者的**长期研究花园**，承载多种异质题材（福柯/规训、AIX 教育、AI 边界伦理、内卷文化、通向实在之路等）
- 每个**专题/研究**有自己的**艺术家视觉系统**（席勒、Basquiat、Haeckel、Matisse、Escher…），可识别、可记忆
- 内容写作流程极简：**作者写 markdown，AI 协作处理技术细节**
- 静态部署、稳定、可在大陆访问、十年后还能维护
- 配合公众号/社交分享有体面的 URL + 分享卡片

### 1.2 非目标（NO）

- 不做评论 / 订阅 / 用户系统
- 不做实时协作 / 后端服务 / 数据库
- 不追求 SEO 排名或流量指标
- 不追求"读者社区"，访客是路过的旅人不是会员
- 不做暗色模式（V1）
- 不做多语言路由（中文为主，少量西文）

---

## 2. 信息架构

### 2.1 内容类型 · 两条独立轨道

**专题（Topic）** —— 成品、对外发布的研究
- 一个专题可以包含多期，也可以只是单期
- 每个专题有自己的主题包（艺术家视觉）
- 期继承所属专题的主题包

**研究（Research）** —— 综述、源材料、读书笔记类
- 一个研究包含多篇研究文章
- 每个研究有自己的主题包（可与相关专题相同或不同）
- 研究文章继承所属研究的主题包

**专题和研究是两个完全独立的部分**——可选关联，也不一定关联。

### 2.2 URL 结构

```
/                                          首页（V1.1 双轨）

/topics/                                   所有专题
/topics/<topic-slug>/                      单专题首页
/topics/<topic-slug>/<issue-slug>/         某期正文

/research/                                 所有研究
/research/<research-slug>/                 单研究首页
/research/<research-slug>/<article-slug>/  研究文章正文

/about/                                    关于
```

约定：**slug 用英文 kebab-case**，中文标题写在 frontmatter。

### 2.3 首页 V1.1 双轨结构

顶部导航：`专题 · 研究 · 关于`

**上半"专题"区**
- 当期主推：左封面 + 右标题/blurb/进入
- 所有专题：一行小封面缩略（含进行中、筹备、单期、多期混排）

**下半"研究"区**（米色加深背景以示分区）
- 聚类标签栏（标签由内容浮现，不预设）
- 最近研究文章列表：日期 + 标题 + 类型/字数 + 关联（专题）+ 跳转
- 入口："看全部研究"

---

## 3. 数据模型

四种内容实体，每种独立的 Zod schema 校验。

### 3.1 专题 (topic)

文件：`src/content/topics/<slug>/index.md`

```yaml
---
title: 规训群岛
subtitle: 福柯《规训与惩罚》系列
theme: schiele                # 该专题的主题包；所有期继承
status: ongoing               # ongoing | planning | completed
type: series                  # series | single
planned_issues: 10            # series 类型必填，single 不需要
summary: 一句话简介
cover:
  hero_image: ./cover.jpg     # 可选
related_research:             # 可选，关联研究
  - foucault-studies
started: 2025-12              # YYYY-MM
---
```

### 3.2 期 (issue)

文件：`src/content/topics/<topic-slug>/<issue-slug>.md`

```yaml
---
issue: 3                       # 第几期
title: 微博挂人，和群众的眼睛
date: 2026-05-26
status: published              # draft | published
summary: ...
free_layer: false              # true 时此期是 .astro 文件
# theme 字段缺省 → 从父级专题继承
---
```

### 3.3 研究 (research)

文件：`src/content/research/<slug>/index.md`

```yaml
---
title: 福柯研究
subtitle: 围绕《规训与惩罚》及延伸的源材料
theme: haeckel                # 研究有自己的主题包，可独立选择
status: ongoing               # ongoing | dormant
summary: ...
cover:
  hero_image: ./cover.jpg     # 可选
related_topic: regulation-archipelago    # 可选
started: 2025-10
---
```

### 3.4 研究文章 (research-article)

文件：`src/content/research/<research-slug>/<article-slug>.md`

```yaml
---
title: 身体作为最后的辖区——福柯 vs 阿甘本
date: 2025-05-24
length: 1200                   # 字数，可选
type: 读书笔记                 # 自由文本，不预设枚举
tags: [福柯, 阿甘本, 身体]
sources:                       # 可选，引用书目
  - title: 规训与惩罚
    author: 米歇尔·福柯
# theme 缺省 → 从父级研究继承
---
```

### 3.5 设计要点

- **type 字段不预设枚举**——读书笔记 / 文献综述 / 人物思想综述等通过标签和自由文本字段自然浮现
- **专题 ↔ 研究 双向链接**：`related_research` 数组、`related_topic` 单选；build 时交叉验证
- **路由完全自动生成**：新建一个文件夹和 index.md 就有新页面，无需写路由代码
- 所有日期、URL、状态字段在 build 时由 Zod 校验，拼错或漏字段立即报错

---

## 4. 视觉系统

### 4.1 席勒基底（默认主题、母站门厅）

**色板（V1 基准）**

```css
--bg:           #ece1cf  /* 骨色 · 主底 */
--bg-soft:      #f1e8d6  /* 副段底 */
--bg-deep:      #e0d4bc  /* 卡片底 */
--ink:          #2a1a14  /* 墨黑 · 主文本 */
--ink-soft:    #5d4a3e  /* 墨灰 · 次文本 */
--ink-faint:    #8b7d6c  /* 墨淡 · 辅助 */
--accent:       #7a2820  /* 干涸血红 · 强调 */
--accent-soft:  #a8463a  /* 朱砂 */
--ochre:        #8b6438  /* 赭黄 · 次强调 */
--rule:         #c5b59c  /* 分隔线 */
```

**字体栈**

```css
--font-serif:    'Noto Serif SC', 'EB Garamond', Georgia, serif;
--font-sans:     'Inter', 'Noto Sans SC', -apple-system, sans-serif;
--font-mono:     'JetBrains Mono', monospace;
--font-script:   'Caveat', cursive;     /* 手写体 · 仅签名/批注 */
```

**字号节奏（桌面）**

| 元素 | 字号 |
|---|---|
| hero h1 | `clamp(44px, 7vw, 72px)` |
| 专题 h2 | `clamp(28px, 4vw, 40px)` |
| 章 h3 | `24px` |
| 正文 | `17px / 1.85` |
| 小字/标签 | `12-13px · letter-spacing 0.2em-0.4em` |
| 脚注 | `14px / 1.7` |

**排版规则**
- 正文宽度上限 `760px`
- 段落首行不缩进，段间距 `22px`
- 引用块：`2px` 血红左边线 + 内边距 + italic
- 罗马数字章号（I II III…）作为期号显示
- 分隔符：`·   ·   ·`

### 4.2 响应式与降级

- 断点：mobile `< 640px`，tablet `< 1024px`，desktop `≥ 1024px`
- 正文：17px → 16px
- 装饰元素：手机上隐藏或简化，让正文优先
- 首页封面墙：手机改单列纵向滚动

---

## 5. 主题包架构

### 5.1 概念

**主题包** = 一组 CSS 变量值 + 一组字体定义 + 一组主题专属装饰组件。

每个专题/研究的 frontmatter 写 `theme: <name>`，整页（含所有期/文章）继承该主题包。换主题 = 改一行字段。

### 5.2 主题包结构

```ts
// src/themes/_types.ts
export interface ThemePack {
  id: string;
  name: string;
  tokens: Record<string, string>;   // CSS 变量值
  fonts?: {
    serif?: string;
    sans?: string;
    script?: string;
  };
  decorativeComponents: string[];   // 该主题专属组件白名单
  classOverrides?: string;          // 注入 <body> 的额外 class
}

// src/themes/schiele.ts （示例）
export const schiele: ThemePack = {
  id: 'schiele',
  name: '席勒',
  tokens: {
    bg: '#ece1cf',
    bgSoft: '#f1e8d6',
    ink: '#2a1a14',
    inkSoft: '#5d4a3e',
    accent: '#7a2820',
    accentSoft: '#a8463a',
    ochre: '#8b6438',
    rule: '#c5b59c',
  },
  fonts: {
    serif: "'Noto Serif SC', 'EB Garamond', serif",
    script: "'Caveat', cursive",
  },
  decorativeComponents: [
    'ScribbleDivider',
    'BloodHighlight',
    'HandSignature',
    'RomanChapter',
  ],
  classOverrides: 'theme-schiele',
};
```

### 5.3 挂载机制

```
某 .md 文件
  ↓ frontmatter: theme: schiele（或从父级继承）
  ↓
Astro layout 读 theme
  ↓ 找 src/themes/schiele.ts
  ↓ <html> 注入 <style is:inline>:root { --bg:...; --ink:... }</style>
  ↓ <body class="theme-schiele">
  ↓ 按需 preload schiele 需要的字体
  ↓ 主题专属装饰组件可用
```

**全站默认**：theme 缺省 = `schiele`。

### 5.4 主题包阵容（V1）

| 主题包 | 适配方向 | V1 状态 |
|---|---|---|
| **席勒** | 福柯系列、暴力拓扑、母站门厅 | ✅ 完整实现 |
| Basquiat | 内卷文化、当代批评 | 🔲 占位（按需启用） |
| Haeckel | 通向实在之路、教育方法论 | 🔲 占位 |
| Matisse | AIX 教育、写作经验 | 🔲 占位 |
| Escher | AI 边界伦理、自指 | 🔲 占位 |
| Klimt / Klee / Dali | 待议 | ❎ 未确认 |

**策略**：新主题包"按开新专题时再启用"——避免提前过度设计。

### 5.5 字体加载策略

- **核心字体**全站预加载：Noto Serif SC（regular + 600）、EB Garamond
- **主题特有字体**按主题按需加载（preload + crossorigin）
- **格式**：woff2 + `font-display: swap`
- **自托管**：`/fonts/`，不打外部 CDN（保大陆访问）

---

## 6. 组件 + 渲染架构

### 6.1 技术栈

- **Astro 5** 作为站点框架（content collections + 自动路由）
- **Markdown / MDX** 作为内容载体
- **Svelte 4** 作为交互组件岛屿
- **TypeScript** 全程类型校验
- **Tailwind 不用**——纯 CSS 变量 + 手写样式（避免类名臃肿）

### 6.2 项目目录结构

```
bigbutters/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── public/
│   ├── fonts/                  # 自托管字体 woff2
│   └── favicon.svg
├── src/
│   ├── content/                # 所有内容
│   │   ├── config.ts           # 4 个 collection schema
│   │   ├── topics/
│   │   │   └── <slug>/
│   │   │       ├── index.md
│   │   │       ├── cover.jpg
│   │   │       └── <issue-slug>.md
│   │   └── research/
│   │       └── <slug>/
│   │           ├── index.md
│   │           ├── cover.jpg
│   │           └── <article-slug>.md
│   ├── themes/
│   │   ├── _types.ts
│   │   ├── schiele.ts          # ✅ 完整实现
│   │   ├── basquiat.ts         # 🔲 占位
│   │   ├── haeckel.ts          # 🔲 占位
│   │   ├── matisse.ts          # 🔲 占位
│   │   └── escher.ts           # 🔲 占位
│   ├── layouts/
│   │   ├── BaseLayout.astro    # 注入主题 + 字体
│   │   ├── HomeLayout.astro
│   │   ├── TopicLayout.astro
│   │   ├── IssueLayout.astro
│   │   ├── ResearchLayout.astro
│   │   └── ArticleLayout.astro
│   ├── components/
│   │   ├── core/               # 任何主题可用
│   │   │   ├── PullQuote.astro
│   │   │   ├── Footnote.astro
│   │   │   ├── Divider.astro
│   │   │   ├── ConceptAnchor.svelte
│   │   │   ├── Radar.svelte
│   │   │   └── Checker.svelte
│   │   ├── chrome/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Nav.astro
│   │   │   └── CoverCard.astro
│   │   └── themes/
│   │       └── schiele/
│   │           ├── ScribbleDivider.astro
│   │           ├── BloodHighlight.astro
│   │           ├── HandSignature.astro
│   │           └── RomanChapter.astro
│   ├── pages/                  # 路由
│   │   ├── index.astro
│   │   ├── topics/
│   │   │   ├── index.astro
│   │   │   └── [topic]/
│   │   │       ├── index.astro
│   │   │       └── [issue].astro
│   │   ├── research/
│   │   │   ├── index.astro
│   │   │   └── [research]/
│   │   │       ├── index.astro
│   │   │       └── [article].astro
│   │   └── about.astro
│   └── styles/
│       ├── reset.css
│       ├── base.css            # 字号、行高、margin
│       └── theme-injector.css
└── docs/superpowers/specs/
```

### 6.3 Layouts 嵌套

```
BaseLayout (HTML 骨架 + 主题 CSS 变量 + 字体加载)
  ├─ HomeLayout
  ├─ TopicLayout
  ├─ IssueLayout
  ├─ ResearchLayout
  └─ ArticleLayout
```

### 6.4 组件分两层

**核心通用** (`src/components/core/`) —— 任何主题可用
- `<PullQuote />` 引用块
- `<Footnote />` 脚注
- `<ConceptAnchor concept="规训" />` 概念锚点（hover 弹卡）
- `<Radar dimensions={[...]} values={[...]} />` 雷达图
- `<Checker conditions={[...]} />` 多条件勾选器
- `<Divider />` 分隔符

**主题专属** (`src/components/themes/<theme>/`) —— 仅该主题可用
- 席勒：`<ScribbleDivider />`、`<BloodHighlight>...</BloodHighlight>`、`<HandSignature />`、`<RomanChapter num={3} />`
- Build 时校验：用了非本主题组件 → 编译报错

### 6.5 Markdown 中调用组件

文件后缀：`.md`（不含组件）或 `.mdx`（含组件调用）。

```mdx
---
issue: 4
title: 教室作为最小的监狱
---

import Radar from '@components/core/Radar.svelte';
import BloodHighlight from '@components/themes/schiele/BloodHighlight.astro';

正文段……

<Radar
  client:visible
  dimensions={['君主', '规训', '生命']}
  values={[1, 5, 2]}
/>

<BloodHighlight>身体被驯化得越早，规则越无形。</BloodHighlight>

继续正文……
```

**hydration 策略**（仅交互组件需要）
- `client:visible`：滚动可见才加载（默认）
- `client:idle`：浏览器空闲时
- `client:load`：立即（慎用）

### 6.6 自由层（重型期）

某一期需要"可视化论文"级别玩法时，把 `.md` 换成 `.astro`：

```astro
---
import BaseLayout from '@layouts/BaseLayout.astro';
import PanopticonViz from '@components/oneoffs/PanopticonViz.svelte';
---
<BaseLayout theme="schiele" title="圆形监狱可视化">
  <PanopticonViz client:visible />
  <article>……正文……</article>
</BaseLayout>
```

frontmatter 标 `free_layer: true`。**作者不写 .astro 代码——这一类页由 Claude 协作完成**。

### 6.7 图片处理

- 封面图：`1600 × 2000`（4:5），命名 `cover.jpg`，放在专题/研究目录
- 正文内联图：放在同级目录，markdown 写 `![](./image.jpg)`
- Astro 内置 `<Image>` 自动生成多倍图 + WebP + lazy loading
- 社交分享卡（OG image）：Phase 2 自动生成（Phase 1 用封面图直接代替）

---

## 7. 作者工作流

### 7.1 一期内容的发布流程

```
作者（Obsidian）           Claude              系统
────────────             ──────              ────
  打开模板                                       
  填正文                                          
  保存 .md            ─→  读 .md
                          补全组件调用
                          检查 frontmatter
                          跑本地预览，截图
                       ←  发截图
  看截图 → "OK"      ─→  git commit + push
                                              EdgeOne 自动构建
                                              ↓ (~30 秒)
                                              bigbutters.top 上线
  在手机上验证       ←─────────────────────────  ✓
```

**作者只做 3 步：打开模板 / 写正文 / 告诉 Claude**。其余 Claude + 自动化处理。

### 7.2 Obsidian 模板

模板文件存放路径：`🪳大大黄油/_templates/`（项目根下的 `_templates/`，避免与 Astro 的 `src/` 冲突；下划线前缀让它在 Astro build 时被忽略）。

| 模板 | 用途 |
|---|---|
| `新建专题.md` | 创建新专题 |
| `新建期.md` | 写新一期 |
| `新建研究.md` | 创建新研究主题 |
| `新建研究文章.md` | 写新研究文章 |
| `组件参考.md` | 所有可用组件清单 + 复制示例 |

每个模板**已写好所有必填字段 + 注释 + 示例组件调用**。作者复制模板 → 改字段 → 写正文。

### 7.3 Obsidian vault 与 Astro 项目共存

`🪳大大黄油/` 这个目录**同时是**：

- 一个 **Obsidian vault**（作者用来写 markdown 的）
- 一个 **Astro 项目根目录**（代码 + 内容 + 构建产物）
- 一个 **git 仓库**（同步到 GitHub）

互不干扰的关键：
- Obsidian 关心的：`_templates/`、`src/content/topics/*/*.md`、`src/content/research/*/*.md`、`docs/`
- Astro 关心的：`src/`、`public/`、`astro.config.mjs`、`package.json`
- `.gitignore` 包含：`.obsidian/`、`node_modules/`、`dist/`、`.DS_Store`
- `.obsidian/`（Obsidian 配置）不入 git，不影响构建

### 7.3 图片工作流

1. MJ/codex 出图（4:5 / 1600×2000）
2. 拖入 Obsidian 对应专题/研究目录
3. markdown 引用 `![](./image.jpg)`
4. Astro 自动优化（多倍图、WebP、lazy）

---

## 8. 部署管道

### 8.1 拓扑

```
Mac (Obsidian + git)
    ↓ git push
GitHub (private repo: bigbutters)
    ↓ webhook
EdgeOne Pages
    ↓ build (Astro static)
    ↓ deploy
bigbutters.top (Edge CDN, 大陆节点)
```

### 8.2 初始化清单（一次性）

- [ ] GitHub 仓库 `bigbutters` 创建（私有或公开，作者定）
- [ ] 本地 `git clone` 到 Mac，挂为 Obsidian vault（或 vault 内的子目录）
- [ ] EdgeOne Pages 连接 GitHub 仓库
  - Build command: `pnpm build`
  - Output directory: `dist`
  - Node version: ≥ 20
- [ ] EdgeOne 配置自定义域名 `bigbutters.top`
- [ ] DNS：bigbutters.top 域名注册商处添加 CNAME 记录指向 EdgeOne 分配的地址
- [ ] HTTPS 自动验证（EdgeOne 提供证书）

### 8.3 日常发布

- 作者写完 `.md`，告诉 Claude
- Claude `git commit -m "..." && git push`
- EdgeOne 收到 push 自动 build
- ~30 秒后 `bigbutters.top` 更新

### 8.4 本地预览（可选）

- Claude 跑 `pnpm dev`（localhost:4321）
- 截图发给作者
- 作者确认后才 push

---

## 9. Phase 1 范围（"外壳优先"的 MVP）

### 9.1 在范围内

**脚手架**
- ✅ Astro 5 项目 + Svelte / MDX 集成
- ✅ TypeScript + path alias
- ✅ Content Collections + 4 个 Zod schema

**主题系统**
- ✅ `ThemePack` 类型 + theme injector
- ✅ 席勒主题包**完整实现**（含 4 装饰组件）
- ✅ 其他主题包（Basquiat/Haeckel/Matisse/Escher）**仅占位**

**布局**
- ✅ BaseLayout + 5 个特化 layout

**核心组件**
- ✅ Chrome：Header / Footer / Nav / CoverCard
- ✅ 通用：PullQuote / Footnote / Divider / ConceptAnchor / Radar / Checker

**页面**
- ✅ 首页（V1.1）
- ✅ /topics/* 三层路由
- ✅ /research/* 三层路由
- ✅ /about/

**占位内容**（验证 V1.1 首页 + 全部流水线）

为让首页 V1.1 真实呈现"1 当期主推 + 4 专题缩略 + 5-6 条研究"的版式，Phase 1 需要灌入下列**占位结构**（真实文本留到 Phase 2）：

**专题（共 4 个）**

| Slug | 标题 | 主题包 | 状态 | 内容深度 |
|---|---|---|---|---|
| `regulation-archipelago` | 规训群岛 | schiele | ongoing | index + 1 期占位（用作首页当期主推） |
| `inv-culture` | 内卷文化 | basquiat (占位主题) | planning | 仅 index 占位 |
| `road-to-reality` | 通向实在之路 | haeckel (占位主题) | planning | 仅 index 占位 |
| `aix-education` | AIX 教育 | matisse (占位主题) | planning | 仅 index 占位 |

**研究（共 3 个）**

| Slug | 标题 | 主题包 | 状态 |
|---|---|---|---|
| `foucault-studies` | 福柯研究 | schiele | ongoing |
| `aix-literature` | AIX 教育文献 | matisse (占位主题) | ongoing |
| `ai-ethics-research` | AI 伦理研究 | escher (占位主题) | dormant |

**研究文章（共 6 篇，跨上述 3 个研究）**

每篇 200-500 字 lorem ipsum + 真实标题（如"身体作为最后的辖区"、"PISA 测评的解读偏差"等占位标题），跨研究分布以验证首页"最近研究"列表 + 聚类标签。

**封面图（共 7 张）**

- 4 个专题封面 + 3 个研究封面 = 7 张占位封面
- 先用纯色 + 文字的 SVG 占位（Phase 2 替换为 MJ 真图）

**注意：占位主题包（basquiat/haeckel/matisse/escher）只需要导出最小可工作 token 集**（背景 + 主色 + 字体），让首页缩略图不会因为找不到主题报错。完整装饰组件等真启用该专题时再补。

**作者工具**
- ✅ 4 个 Obsidian 模板 + 1 份组件参考

**字体**
- ✅ Noto Serif SC / EB Garamond / Caveat 自托管 woff2

**部署**
- ✅ GitHub repo + EdgeOne Pages + bigbutters.top
- ✅ HTTPS + 首次部署验证

### 9.2 *不* 在范围内

- ❌ 真实内容（规训群岛文章、AIX 文献综述）—— Phase 2
- ❌ 其他主题包完整实现 —— 按需启用
- ❌ 重型期具体页面 —— 按需做
- ❌ OG 分享卡自动生成 —— Phase 2
- ❌ RSS / Atom —— Phase 2 可加
- ❌ 站内搜索 —— Phase 3+
- ❌ 评论 / 订阅 / 分析 —— 永远不做

### 9.3 验收标准

```
☐ bigbutters.top 可访问 (HTTPS)
☐ 首页 V1.1 渲染正常：
    · 当期主推：规训群岛大封面 (席勒)
    · 所有专题：4 个缩略（规训/内卷/通向实在/AIX）
    · 研究区：6 篇研究文章列表 + 聚类标签
☐ /topics/ 列表页：4 个专题占位封面正确显示
☐ /topics/regulation-archipelago/ 单专题首页（席勒皮肤，期列表含 1 期）
☐ /topics/regulation-archipelago/<issue>/ 占位期正文 + 席勒样式
☐ /topics/inv-culture/（等占位专题）单专题首页（对应占位主题包）
☐ /research/ 列表页：3 个研究占位封面
☐ /research/foucault-studies/ 单研究首页（席勒皮肤，文章列表）
☐ /research/foucault-studies/<article>/ 占位文章正文
☐ 移动端 (≤640px) 排版不破：首页 4 专题改单列，研究列表纵向滚
☐ 5 个 Obsidian 模板可用：新建文件 → 编辑 → push → 上线
☐ 跑通一次完整发布：新建期 → push → EdgeOne 构建 → 上线（< 60 秒）
```

### 9.4 QA 方法

- `pnpm astro check`（Zod schema 自动校验 frontmatter）
- Build 时跑 link checker（断链/死引用报错）
- 本地 `pnpm dev` 真实预览
- 视觉冒烟：手动过一遍所有 layout

---

## 10. 估时

| 阶段 | 工作量 |
|---|---|
| 项目脚手架 + content collections + 路由 | 0.5 day |
| 席勒主题包 + BaseLayout + 字体加载 | 1 day |
| Chrome + 核心非交互组件 | 1 day |
| Svelte 岛屿组件（Radar / Checker / ConceptAnchor） | 1.5 day |
| 5 个 layout 实现 | 1 day |
| 占位内容灌入（4 专题 + 3 研究 + 6 文章 + 7 封面占位） | 0.5 day |
| 首页 V1.1 实现 | 1 day |
| Obsidian 模板 + 组件参考 | 0.5 day |
| 部署 + 域名 + HTTPS | 0.5 day |
| 整体调试 + 移动端 + 验收 | 1 day |
| **合计** | **~ 7.5-9.5 个工作日** |

并行子任务可压缩到 3-5 天墙钟时间。

---

## 11. 风险与未决问题

### 11.1 已识别风险

| 风险 | 影响 | 缓解 |
|---|---|---|
| EdgeOne Pages 对 Astro 的支持细节（构建环境、Node 版本） | 中 | 初始化时优先验证，必要时换 Cloudflare Pages 备选 |
| 自托管中文字体首次加载慢（每 weight 几 MB） | 中 | 子集化（subset）+ preload + swap；首页只用 1 weight |
| 大陆 DNS 解析到 EdgeOne 的稳定性 | 低 | EdgeOne 是腾讯系，理应稳定，但需要在多个网络/运营商验证 |
| MDX 中 Svelte 组件 hydration 失败 | 低 | 用 `client:visible` 默认延迟加载，问题局部化 |

### 11.2 未决问题（落实施时再处理）

- Klimt / Dali / Klee 三个主题包**是否进库**——按需启用，开新专题时再定
- 重型期具体怎么做（用 Three.js？D3？Canvas？）——首次重型期立项时决定
- RSS feed 的格式（按专题分还是全站）—— Phase 2
- 数据备份策略（GitHub 之外）—— 暂不必要，GitHub 本身已是版本控制
- 移动端是否需要单独 nav（汉堡菜单）—— Phase 1 用极简单 nav 横排不折叠，移动端用响应式 stack 即可

---

## 12. 决策记录（附录）

按时间顺序，brainstorming 阶段的关键决策。

| # | 决策 | 理由 |
|---|---|---|
| 1 | 站点主轴：**个人研究花园** + 配合公众号传播（次轴） | 不追求读者社区/订阅/评论 |
| 2 | 交互装置：**混合·按选题调档**（默认中量，留重型空间） | 内容驱动复杂度 |
| 3 | 内容载体：**Markdown 优先 + 旁挂自由层** | 不和 Obsidian 写作流打架 |
| 4 | 启动路径：**外壳优先** | 先建结构再灌内容 |
| 5 | 母站调性：**席勒**（骨色 + 干涸血红 + 急促线条） | 个人气最足 |
| 6 | 首页结构：**V1.1 双轨**（专题封面墙 + 研究列表） | 专题与研究分离呈现 |
| 7 | 隐喻：**封面即隐喻**——丢掉"群岛"的统一空间隐喻 | 每个专题自己有视觉宪法 |
| 8 | 主题包列表：**席勒**完整 + Basquiat / Haeckel / Matisse / Escher 占位 | Klimt / Dali / Klee 再议 |
| 9 | 内容数据模型：**专题 / 期 / 研究 / 研究文章**四种 schema，研究和专题独立 | 干净分离 |
| 10 | type 字段：**自由文本** + tag 系统 | 类型让内容浮现，不预设 |
| 11 | 技术栈：**Astro 5 + MDX + Svelte 岛屿** | 内容站 + 装置岛屿的最优解 |
| 12 | 部署：**EdgeOne Pages**（腾讯）+ bigbutters.top | 大陆访问最佳 |
| 13 | 色板：**V1 基准**（#ece1cf / #2a1a14 / #7a2820 / #8b6438） | 中庸偏暖、节制血红 |
| 14 | 作者工作流：**模板写正文 + AI 处理技术细节** | 作者零技术负担 |
| 15 | 重型期"自由层"：**Claude 写 .astro，作者不碰** | 复杂留给工具 |

---

## 13. 下一步

1. **作者审核此 spec**——发现遗漏/异议提出
2. **写 implementation plan**（`writing-plans` skill 接手）—— 把 Phase 1 拆成可执行的子任务，含每步的验收
3. **建 GitHub 仓库 + EdgeOne 项目**（初始化）
4. **进入实施阶段**（`executing-plans` skill 接手）

—— spec 结束 ——
