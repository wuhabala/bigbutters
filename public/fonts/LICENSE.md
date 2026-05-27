# 自托管字体 · 来源与许可

本目录中的原有 `.woff2` 文件通过 jsdelivr CDN（@fontsource 镜像）于 2026-05-27 下载；
`ZTZiYouTi-Regular.woff2` 由用户提供的卓特自由体发布版 OTF 转换生成；
`SourceHanSansSC-*-Escher.woff2` 由 Adobe 官方思源黑体 SC OTF 按 Escher 可见标题文本生成子集。
所有字体均允许重新分发与嵌入站点；具体许可见下文。

## 文件清单与来源 · 含 SHA-256 校验

下载日期：2026-05-27 · 上游：jsdelivr CDN（@fontsource 镜像）

| 文件 | 字体 | 字重 / 风格 | 字节 | SHA-256 |
|---|---|---|---|---|
| `NotoSerifSC-Regular.woff2` | Noto Serif SC | 400 normal | 1,507,260 | `7dd5aea2df4644e916c2eb558bc8ed6ad6d8925c2c8e251fe68f7206da211696` |
| `NotoSerifSC-SemiBold.woff2` | Noto Serif SC | 600 normal | 1,528,592 | `510f6000da6f04a1ef48b0e6339c540c603c371f1b415829ff58ad98499717f0` |
| `EBGaramond-Regular.woff2` | EB Garamond | 400 normal | 21,704 | `b63448e2680a0dbde70ebb2f3de78f6c515122835491f938e8a8595b46f29210` |
| `EBGaramond-Italic.woff2` | EB Garamond | 400 italic | 22,172 | `1bd1b20fd55986b334ba42dbcb0d9bed7e2d08fd7a713000e8041bfafa37e8ec` |
| `Caveat-Regular.woff2` | Caveat | 400 normal | 48,836 | `d0b7b931b8980049327e8f8f9ac264617c8200b8422d62e886473d3d9527bad3` |
| `PermanentMarker-Regular.woff2` | Permanent Marker | 400 normal | 29,564 | `4884fec2c73aa52a2461073c1b87d1ceb80f400520391b43f97ca7d3c39eeb24` |
| `ZCOOLQingKeHuangYou-Regular.woff2` | ZCOOL QingKe HuangYou（清刻黄油体） | 400 normal | 1,765,712 | `6fc130d9d508e61fe6fd95f70a8b9251349b0e97810c1d537e3322b45739e3e0` |
| `ZTZiYouTi-Regular.woff2` | ZT ZiYouTi（卓特自由体） | 400 normal | 641,048 | `fbed6a6be33340ff651bb46829afc26eca6add94ca943f231a246d77808fdf4f` |
| `TaipeiSansTCBeta-Light-Nav.woff2` | Taipei Sans TC Beta Light（台北黑体 Beta Light，导航子集） | 300 normal | 2,224 | `ca283da94d6e947b673a32fca9e0c5258eea77b780a002f4b1950697d649c857` |
| `SourceHanSansSC-Light-Escher.woff2` | Source Han Sans SC（思源黑体，Escher 显示子集） | 300 normal | 110,164 | `5a0e8f8f5ed6a070f4ff69f426e20684e0d0055517ae4e18709dbd2d2fa6c01f` |
| `SourceHanSansSC-Regular-Escher.woff2` | Source Han Sans SC（思源黑体，Escher 显示子集） | 400 normal | 110,404 | `d79aacdd5f1bf0b3bdfa5875bf2e2bb1445ef52493b52c80b6b166f38dafc72d` |
| `MaShanZheng-Regular.woff2` | Ma Shan Zheng（马善政毛笔楷书） | 400 normal | 2,709,280 | `36b3f3924ef392b767df54bac30f283ec5b13f81606d26f3c7c8eec9ff638806` |

上游具体路径：
- `https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-sc/files/noto-serif-sc-chinese-simplified-{400,600}-normal.woff2`
- `https://cdn.jsdelivr.net/npm/@fontsource/eb-garamond/files/eb-garamond-latin-400-{normal,italic}.woff2`
- `https://cdn.jsdelivr.net/npm/@fontsource/caveat/files/caveat-latin-400-normal.woff2`
- `ZTZiYouTi-Regular.woff2`：来自 `ZhuoTeZiYouTi-2.otf`（原文件 SHA-256 `2a245815aac745619d0cf18f880926ec9ae4ffc146c2aeef1abb678f71019934`），用 FontTools 转换为 WOFF2。
- `TaipeiSansTCBeta-Light-Nav.woff2`：来自 `Taipei-Sans-TC-Beta-Light-2.ttf`（原文件 SHA-256 `d69a9ea6a77f694c3a1a1fb766c764aa74cb3e2c4c69f1b532edf98b3f2bb662`），以 FontTools 仅保留导航文字 `专题研究关于` 并生成 WOFF2。
- `SourceHanSansSC-{Light,Regular}-Escher.woff2`：来自 Adobe Source Han Sans `2.005R` 官方 `09_SourceHanSansSC.zip` 中的 SC OTF（原文件 SHA-256：Light `b6dfc945aae0daf9b15019f59c2f7b18d17da3b92f00c3ec32fb5f0333696d9c`；Regular `f1d8611151880c6c336aabeac4640ef434fa13cbfbf1ffe82d0a71b2a5637256`），以 FontTools 保留当前 Escher 标题、目录、章节与站点导航可见字符并生成 WOFF2。

字符覆盖：
- Noto Serif SC: `chinese-simplified` 子集（GB2312 常用 + 拉丁基本）
- EB Garamond / Caveat: `latin` 子集（仅西文）

## 许可证

- **Noto Serif SC** — © Google. SIL Open Font License 1.1. <https://fonts.google.com/noto/specimen/Noto+Serif+SC/license>
- **EB Garamond** — © Georg Duffner. SIL Open Font License 1.1. <https://fonts.google.com/specimen/EB+Garamond/license>
- **Caveat** — © Pablo Impallari / Brenda Gallo. SIL Open Font License 1.1. <https://fonts.google.com/specimen/Caveat/license>
- **Permanent Marker** — © Font Diner. Apache License 2.0. <https://fonts.google.com/specimen/Permanent+Marker/about>（注：Apache 2.0 与 OFL 类似，允许嵌入与重新分发）
- **ZCOOL QingKe HuangYou（清刻黄油体）** — © 站酷网 (zcool.com.cn). SIL Open Font License 1.1. <https://fonts.google.com/specimen/ZCOOL+QingKe+HuangYou/license>（名字直译"清刻黄油"，与品牌"大大黄油"同源；中文艺术字体）
- **ZT ZiYouTi（卓特自由体）** — © Beijing Droit Vision Technology Co., Ltd. SIL Open Font License 1.1. <https://www.maoken.com/freefonts/27800.html/comment-page-1>（发布说明明确允许网页嵌入、再分发及修改）
- **Taipei Sans TC Beta Light（台北黑体 Beta Light）** — © JT Foundry / Source Han Sans modified font. SIL Open Font License 1.1（许可信息内嵌于用户提供的 TTF；本站分发的为导航字形子集）
- **Source Han Sans SC（思源黑体）** — © Adobe. SIL Open Font License 1.1. <https://github.com/adobe-fonts/source-han-sans>（本站分发的为 Escher 显示文本字形子集）
- **Ma Shan Zheng（马善政毛笔楷书）** — © Ma Shan Zheng. SIL Open Font License 1.1. <https://fonts.google.com/specimen/Ma+Shan+Zheng/license>（中文行书风格艺术字）

OFL 全文：<https://scripts.sil.org/OFL>

## 子集化（subsetting）说明

当前文件为 @fontsource 上游已做的字符子集化结果：
- Noto Serif SC：`chinese-simplified` 子集（GB2312 常用 + 拉丁基本，~1.5 MB / weight）
- EB Garamond / Caveat：`latin` 子集（仅西文，20-50 KB）

若未来需要进一步压缩 Noto Serif SC，可使用 `glyphhanger` 或 `subset-font` 工具按站点实际使用字符再次子集化。

## 更新流程

1. 升级到新版本：从 `https://cdn.jsdelivr.net/npm/@fontsource/<family>@<version>/files/<file>.woff2` 重新下载
2. 替换 `public/fonts/<file>.woff2`
3. 重新计算 SHA-256：`shasum -a 256 public/fonts/*.woff2`
4. 更新本文件的字节数、校验和、下载日期

## SIL Open Font License 1.1（全文）

```
Copyright (c) <font copyright holders>, with Reserved Font Names <reserved names>.

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
http://scripts.sil.org/OFL

-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded,
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.
```
