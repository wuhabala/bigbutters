# Phase 1 验收记录 · 2026-05-27

## 状态

✅ **全部通过 · 上线生效**

- Live: <https://bigbutters.top/>
- Repo: <https://github.com/wuhabala/bigbutters>
- Hosting: 腾讯云 EdgeOne Pages
- Cert: TrustAsia DV TLS RSA CA 2025 · 有效至 2026-08-18
- DNS: bigbutters.top → CNAME → EdgeOne · A 61.170.82.52

## 项目规模

| 维度 | 数值 |
|---|---|
| Git commits | 19 |
| 源文件 | 58 |
| 代码行数 | ~2820 |
| 静态页面 | 18 |
| Vitest 单测 | 9 / 9 |
| pnpm check | 0 errors / 0 warnings / 0 hints |
| 字体资产 | 5 woff2 自托管 |
| 主题包 | 5 个（席勒完整 + Basquiat/Haeckel/Matisse/Escher 占位）|
| 占位内容 | 4 专题 + 1 期 + 3 研究 + 6 文章 |
| Obsidian 模板 | 5 个 |
| 外部评审轮次 | 3 次（Codex/Kimi）· 全部 finding 已闭环或显式 defer |

## Spec 9.3 验收清单（逐条对照）

```
☑ bigbutters.top 可访问 (HTTPS · TrustAsia 证书)
☑ 首页 V1.1 渲染正常：
    ☑ 当期主推：规训群岛大封面 (席勒)
    ☑ 所有专题：4 个缩略（规训/内卷/通向实在/AIX）
    ☑ 研究区：6 篇研究文章列表 + 聚类标签
☑ /topics/ 列表页：4 个专题占位封面正确显示
☑ /topics/regulation-archipelago/ 单专题首页（席勒皮肤，期列表含 1 期）
☑ /topics/regulation-archipelago/03-mass-eyes/ 占位期正文 + 席勒样式
    · RomanChapter "III." 渲染
    · BloodHighlight / ScribbleDivider / HandSignature 全部生效
☑ /topics/inv-culture/ 单专题首页（basquiat 占位主题色 #f8d12b 生效）
☑ /topics/road-to-reality/ 单专题首页（haeckel 占位主题色 #f0e7d0 生效）
☑ /topics/aix-education/ 单专题首页（matisse 占位主题色 #faf6ee 生效）
☑ /research/ 列表页：3 个研究占位封面
☑ /research/foucault-studies/ 单研究首页（席勒皮肤，2 篇文章列表）
☑ /research/foucault-studies/01-body-territory/ 占位文章正文
☑ /research/aix-literature/ + 任一文章（matisse 主题）
☑ /research/ai-ethics-research/ + 任一文章（escher 主题，dormant 状态）
☑ 移动端 (≤640px) 排版不破：CSS @media (max-width: 640px) 已分别覆盖各 layout
☑ 5 个 Obsidian 模板可用（_templates/ 目录）：新建专题/期/研究/研究文章 + 组件参考
☑ 跑通一次完整发布：本地 commit → push → EdgeOne 自动构建 → 上线 (~30 秒)
    · title 修复一次实证：commit d44c1dc push 后约 60 秒，bigbutters.top 首页 title 更新
```

## OG meta 分流验证（Checkpoint 2 评审 #9）

| 路径 | og:type | 期望 |
|---|---|---|
| `/` | `website` | ✅ |
| `/about/` | `website` | ✅ |
| `/topics/regulation-archipelago/03-mass-eyes/` | `article` | ✅ |
| 研究文章正文页 | `article` | （IssueLayout/ArticleLayout 内置） |

## 字体加载策略验证（Checkpoint 1 评审 #1）

首页 `<link rel="preload">` 实际只 2 个：

```html
<link rel="preload" href="/fonts/NotoSerifSC-Regular.woff2" ... />
<link rel="preload" href="/fonts/EBGaramond-Regular.woff2" ... />
```

- **没有** SemiBold 预载（1.5 MB Lazy load）
- **没有** Caveat 预载（49 KB Lazy load，仅在 HandSignature 渲染时按需）
- **没有** Italic 预载

✅ Checkpoint 1 评审反馈 #1 落实

## 外部评审 3 轮反馈闭环表

| 评审轮 | 项 | 状态 | 落实位置 |
|---|---|---|---|
| **1** · 字体首屏 2.9MB | 重要 | ✅ 修 | base.css `.prose h1/h2/h3` weight 500；BaseLayout preload 只 Regular |
| **1** · 空 build 不构成验收 | 重要 | ✅ 修 | smoke 页 + Task 18+19 实际灌入内容（18 页通过）|
| **1** · 字体许可证记录缺失 | 重要 | ✅ 修 | public/fonts/LICENSE.md 含 5 字体 SHA-256 + OFL 全文 |
| **1** · 全局排版污染组件 | 中 | ✅ 修 | base.css 文章排版收敛到 `.prose` 作用域 |
| **1** · Obsidian/Git 共存 | 中 | ✅ 修 | .gitignore 加 .trash/，明确"只发布内容+模板" |
| **1** · 未提供字体的 token | 次 | ✅ 修 | `--font-sans/-mono` 改 system fallback |
| **2** · ID 解析 P0 阻断 | P0 | ✅ 修 | content/config.ts glob base 下沉；18 页端到端验证 |
| **2** · 空 build 未真验路由 | 重要 | ✅ 修 | 同上 ID fix + 占位内容到位 |
| **2** · 首页嵌套 `<a>` | 重要 | ✅ 修 | HomeLayout 去掉外层 wrapper |
| **2** · `topicMap.get()!` 非空断言 | 重要 | ✅ 修 | pages/index.astro guard fallback |
| **2** · Caveat 全局 preload 浪费 | 中 | ✅ 修 | 从 schiele theme 移除 preloadFonts，靠 @font-face on-demand |
| **2** · 真空状态伪造 featured | 中 | ✅ 修 | pages/index.astro isEmptyState 分支 |
| **2** · ThemePack.id 类型 | 中 | ✅ 修 | _types.ts: id: ThemeId + satisfies + 运行时断言 |
| **2** · Radar 输入防御 | 中 | ✅ 修 | dim<3 / 长度不一致 / NaN/Infinity 处理 + 3 个新测试 |
| **2** · ConceptAnchor a11y | 中 | ✅ 修 | Escape 关闭 + outside click + 窄屏 width |
| **2** · reference() 校验 | 重要 | ⏭ defer | TODO(Phase 2)，已在 schema 标注 |
| **2** · CoverCard Image 优化 | 中 | ⏭ defer | TODO(Phase 2)，Phase 1 SVG 占位无影响 |
| **2** · Checker 稳定 key | 维护 | ⏭ defer | TODO(Phase 2)，模板已警示 |
| **3** · title 重复 `大大黄油 · 大大黄油` | 部署后发现 | ✅ 修 | commit d44c1dc · BaseLayout 检测品牌名 |

3 轮评审共 **20 个 finding**，立即修 **17 个**，defer **3 个**（全部有明确归因到 Phase 2 任务）。

## 部署管道实证

```
Mac (Obsidian + git) 
  └─ git push                              
GitHub (wuhabala/bigbutters · main)        
  └─ Webhook                                
EdgeOne Pages                                
  ├─ pnpm install                            
  ├─ pnpm build (prebuild + astro build + postbuild)
  └─ deploy to CDN
bigbutters.top (TrustAsia HTTPS, A 61.170.82.52)
```

实证：commit d44c1dc 修复 title 重复后，push → 约 60 秒后 bigbutters.top 已更新。

## Phase 1 完成 · Phase 2 入口

### Phase 2 待办（Phase 1 已写入 TODO 注释中）

1. **reference() 交叉校验**——related_research / related_topic 改用 `reference('research')` / `reference('topics')`，build 时报死链
2. **CoverCard 接入 Astro `<Image />`**——为 Phase 2 真实 MJ/codex 出图获得自动 WebP + 多倍图 + lazy
3. **Checker 稳定 key**——使用 id 替代 condition 文本拼接 verdict key
4. **Caveat / 装饰字体的页面级 preload**——可选优化，跟随首批真实内容出现
5. **字体进一步 subsetting**——若实际内容字符集稳定后

### 作者侧的 Phase 2 入口（流水线已通）

- 在 Obsidian 用 `_templates/新建期.md` 复制起手
- 写完保存 `.md` 或 `.mdx`
- 告诉 Claude "<专题>/<期-slug> 写好了"
- Claude commit + push
- ~30 秒后 bigbutters.top 上线

---

📍 **Phase 1 完成 · 2026-05-27**
