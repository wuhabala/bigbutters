# 自托管字体 · 来源与许可

本目录中所有 `.woff2` 文件均通过 jsdelivr CDN（@fontsource 镜像）于 2026-05-27 下载。
全部字体使用 **SIL Open Font License 1.1 (OFL)**，允许重新分发与嵌入站点。

## 文件清单与来源

| 文件 | 字体 | 字重 / 风格 | 字符覆盖 | 上游来源 |
|---|---|---|---|---|
| `NotoSerifSC-Regular.woff2` | Noto Serif SC | 400 normal | Chinese (Simplified) subset | `@fontsource/noto-serif-sc/files/noto-serif-sc-chinese-simplified-400-normal.woff2` |
| `NotoSerifSC-SemiBold.woff2` | Noto Serif SC | 600 normal | Chinese (Simplified) subset | `@fontsource/noto-serif-sc/files/noto-serif-sc-chinese-simplified-600-normal.woff2` |
| `EBGaramond-Regular.woff2` | EB Garamond | 400 normal | Latin subset | `@fontsource/eb-garamond/files/eb-garamond-latin-400-normal.woff2` |
| `EBGaramond-Italic.woff2` | EB Garamond | 400 italic | Latin subset | `@fontsource/eb-garamond/files/eb-garamond-latin-400-italic.woff2` |
| `Caveat-Regular.woff2` | Caveat | 400 normal | Latin subset | `@fontsource/caveat/files/caveat-latin-400-normal.woff2` |

## 许可证

- **Noto Serif SC** — © Google. SIL Open Font License 1.1. <https://fonts.google.com/noto/specimen/Noto+Serif+SC/license>
- **EB Garamond** — © Georg Duffner. SIL Open Font License 1.1. <https://fonts.google.com/specimen/EB+Garamond/license>
- **Caveat** — © Pablo Impallari / Brenda Gallo. SIL Open Font License 1.1. <https://fonts.google.com/specimen/Caveat/license>

OFL 全文：<https://scripts.sil.org/OFL>

## 子集化（subsetting）说明

当前文件为 @fontsource 上游已做的字符子集化结果：
- Noto Serif SC：`chinese-simplified` 子集（GB2312 常用 + 拉丁基本，~1.5 MB / weight）
- EB Garamond / Caveat：`latin` 子集（仅西文，20-50 KB）

若未来需要进一步压缩 Noto Serif SC，可使用 `glyphhanger` 或 `subset-font` 工具按站点实际使用字符再次子集化。

## 更新流程

1. 升级到新版本：从 `https://cdn.jsdelivr.net/npm/@fontsource/<family>@<version>/files/<file>.woff2` 重新下载
2. 替换 `public/fonts/<file>.woff2`
3. 更新本文件的版本号与下载日期
