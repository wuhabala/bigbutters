# Heckel 主题 · 挂件出图 Prompt 集

把首页 Hero / 背景 / Section 标记里的 SVG 替换为 AI 生成的高保真木刻图像。
所有图都按「Erich Heckel · Die Brücke 木刻」语言出，与现在的 SVG 占位风格保持一致，但更精细。

---

## 0. 通用约束（每个 prompt 都加在末尾）

**Midjourney v6 / Niji 通用 suffix**

```
--style raw --ar 1:1 --v 6 --stylize 50
```

**DALL·E 3 / Sora / Codex Image API 通用 system prompt 前缀**

```
You are generating a single woodcut illustration in the style of Erich Heckel
(German Expressionism, Die Brücke, 1905-1913). Use only these colors:
  - cream paper  #f4ead0
  - deep ink     #0f0a06
  - vermillion   #d92410
  - cobalt blue  #1c4a8a
  - mustard      #f5b800
  - forest green #3a6627
Bold black outlines, angular shapes, visible carving strokes, flat color blocks,
no gradients, no shading, no realism. Transparent background unless specified.
```

**统一负面词（DALL·E 不支持但 SD/MJ 用 `--no`）**

```
--no photorealism, gradient, smooth shading, 3d render, anime, glossy,
neon, pastel, watercolor, cgi, text, watermark, signature
```

---

## 0.5 ⚡ Heckel 笔触签名（**必须注入到每条 prompt**）

只写 "Erich Heckel style" 是不够的——AI 会跑去做泛德国表现主义、或者撞 Kirchner / Nolde / Munch 的风。
必须把 Heckel 的**具体笔触语言**也喂进去，下面这一段是核心识别码：

### `HECKEL_FINGERPRINT`（推荐复制粘贴到每个 prompt 中部）

**英文（图像 API 直接用）**

```
in the specific style of Erich Heckel's color woodcuts 1910-1913
(Fränzi Reclining 1910, Springende Tänzerin 1911, Vor dem Spiegel 1908):
- mask-like angular face influenced by African tribal art, almond eyes,
  triangular jawline, elongated neck, face fragmented into 4-5 flat planes
- ragged splintered outlines with knife-cut burrs and broken edges,
  NOT smooth or curved lines
- DENSE PARALLEL DIAGONAL HATCHING in the background, all strokes at the
  same 45-degree angle, evenly spaced, never crosshatched
- white gouge marks deliberately left inside black areas
  (small unprinted dots/scrapes showing the carving knife path)
- three-block color registration with slight misregistration offset
  between layers (red/blue/yellow blocks shifted 2-4 pixels off the
  black outline block)
- visible wood plank grain texture in pale color areas
- rough, hacked, almost violent carving — NOT clean or decorative
```

**中文笔记（人读，方便你检查输出对不对）**

| Heckel 标志 | 出图后必看 |
|---|---|
| 平行斜线阴影 | 背景是否密集、同角度、不交叉？❌ 出现交叉 = 像 Kirchner |
| 棱角面具脸 | 脸是否被切成 4-5 个平面？❌ 圆脸 = 太通用 |
| 撕裂轮廓 | 黑线是否有毛刺/断裂？❌ 光滑封闭线 = 像数字插画 |
| 白凿点 | 黑色块里是否留白？❌ 全实心 = 像剪影 |
| 套版错位 | 红/蓝是否偏离黑线轮廓 2-4px？❌ 完美贴合 = 太干净 |

### 和其它表现主义画家区分（**写进负面词**）

```
--no Kirchner curving lines, Nolde mystical color washes, Munch spiritual
swirls, Edvard Munch style, Käthe Kollwitz darkness, Vallotton clean
silhouette, Japanese ukiyo-e, modern flat illustration, vector art,
Adobe Illustrator look, perfect symmetry, computer-generated, crosshatching
```

DALL·E 不吃 `--no`，那就在 prompt 里直接说 `"AVOID: ..."`，比如：

```
... AVOID: Kirchner-style curving sinuous lines, Munch-style swirling
emotion, perfect symmetry, vector art look, crosshatching.
```

### ⚠️ Hero 主视觉必须出**两个版本**（竖版 + 横版）

不同页面的 hero 区版式不一样，**同一张图不能通用**：

| 用在哪 | 版式 | 图的版型 | 推荐宽高比 |
|---|---|---|---|
| 主站首页 `/` （HeckelHero 右侧位） | 居中略偏右、独立竖条位 | **竖版（portrait）** | 4:5 或 3:4 |
| 专题子首页 `/topics/<slug>/` （BasquiatHero / EscherHero） | 左文 1.4fr + 右图 1fr | **横版（landscape）** | 16:10 或 3:2 |
| 研究子首页 `/research/<slug>/` | 同上，左文右图 | **横版** | 16:10 或 3:2 |
| 文章页 `cover.hero_image` | 全宽通栏 | **横版** | 16:9 或 2:1 |

**做法**：每个主视觉都跑两个 prompt（仅 `--ar` 与构图描述改），导出两套文件，按下表命名：

| 元素 | 竖版文件 | 横版文件 |
|---|---|---|
| Hero 抽象面孔 | `hero-face-portrait.png` | `hero-face-landscape.png` |
| Hero 全景插画 | `hero-banner-portrait.png` | `hero-banner-landscape.png` |

调用时主站首页用 `-portrait` 后缀，子首页用 `-landscape`；frontmatter 里 `cover.hero_image` 也指 `-landscape` 版即可。装饰类小图（山/日/鸟/树/角落）不分版型，单文件即可。

**完整文件清单与放置**

| 元素 | 文件名 | 推荐画布 | 路径 |
|---|---|---|---|
| 抽象面孔 · 竖版（主站首页用） | `hero-face-portrait.png` | 1024×1280 透明底 | `src/assets/themes/heckel/` |
| 抽象面孔 · 横版（专题/研究子首页用） | `hero-face-landscape.png` | 1600×1000 透明底 | `src/assets/themes/heckel/` |
| 山形 | `mark-mountain.png` | 512×512 透明底 | `src/assets/themes/heckel/` |
| 太阳 | `mark-sun.png` | 512×512 透明底 | `src/assets/themes/heckel/` |
| 乌鸦 | `mark-bird.png` | 512×512 透明底 | `src/assets/themes/heckel/` |
| 棱角树 | `mark-tree.png` | 512×512 透明底 | `src/assets/themes/heckel/` |
| 背景角落 ×4 | `bg-corner-tl/tr/bl/br.png` | 600×600 透明底 | `src/assets/themes/heckel/` |
| 章节横幅（可选） | `section-banner.png` | 1600×320 透明底 | `src/assets/themes/heckel/` |
| Hero 全景插画 · 竖版 | `hero-banner-portrait.png` | 1200×1600 PNG | `src/assets/themes/heckel/` |
| Hero 全景插画 · 横版 | `hero-banner-landscape.png` | 1920×1080 PNG | `src/assets/themes/heckel/` |

Astro 自动转 WebP + 多倍图，不需要手工压缩；只要保留 1× PNG 即可。

---

## 1. Hero 抽象面孔 · `hero-face-{portrait,landscape}.png`

**位置**：`src/components/themes/heckel/HeckelHero.astro` 右侧 `<HeckelMark variant="face" ... />`（主站首页用竖版）；
`BasquiatHero` / `EscherHero` / 未来 `HeckelHero-Subtopic` 的右图位（专题/研究子首页用横版）。
**目标**：替换简化 SVG 棱角脸，做成 Heckel 木刻肖像残片——半截脸庞 + 刀痕 + 偏移套色。

### 1a · 竖版（主站首页）`hero-face-portrait.png`

**Midjourney v6**

```
Color woodcut portrait in the specific style of Erich Heckel's Brücke
period 1910-1913, reference: "Fränzi Reclining" 1910 and "Vor dem Spiegel"
1908. VERTICAL composition 4:5. Single female face filling the frame top
to bottom, MASK-LIKE angular face influenced by African tribal sculpture,
fragmented into 4-5 sharp flat planes, almond half-closed eyes,
triangular jawline, elongated neck cutting into bottom edge,
RAGGED SPLINTERED black outlines (#0f0a06) with visible knife burrs
and broken edges (NOT smooth lines), one vermillion red plane carved on
cheekbone (#d92410) shifted 3 pixels off the black outline (three-block
registration misalignment), one cobalt blue shadow plane under jaw
(#1c4a8a), small WHITE GOUGE MARKS deliberately left inside black areas
(unprinted scrape dots), DENSE PARALLEL DIAGONAL HATCHING at 45 degrees
filling negative space behind the face (evenly spaced, never crossing),
visible wood plank grain texture in cream areas (#f4ead0),
rough hacked carving — violent not decorative, no gradient no shading,
isolated subject, transparent PNG
--style raw --ar 4:5 --v 6 --stylize 60
--no photorealism, gradient, smooth shading, 3d render, Kirchner curves,
Munch swirls, Vallotton silhouette, vector art, crosshatching, symmetry
```

**DALL·E 3 / Codex Image API**

```
A color woodcut portrait illustration in the specific style of Erich
Heckel's Brücke period color woodcuts 1910-1913 (reference works:
"Fränzi Reclining" 1910, "Vor dem Spiegel" 1908). VERTICAL PORTRAIT
FORMAT 4:5, 1024×1280, transparent background.

SUBJECT: A single female face filling the frame from top to bottom.
The face is MASK-LIKE and angular, influenced by African tribal
sculpture — fragmented into 4-5 sharp flat geometric planes, with
almond-shaped half-closed eyes, a triangular jawline, and an
elongated neck cutting into the bottom edge.

LINEWORK: Bold deep-black outlines (#0f0a06) that are RAGGED and
SPLINTERED, showing visible knife burrs and broken edges. Outlines
must NOT be smooth, curved, or vector-clean — they should look hand-
carved with a gouge, with rough termini and small notches.

COLOR BLOCKS: One vermillion-red plane (#d92410) carved on the cheekbone,
deliberately shifted 3 pixels off the black outline (mimicking three-
block color registration misalignment from real Heckel prints). One
cobalt-blue (#1c4a8a) shadow plane under the jaw. Cream paper
background (#f4ead0).

SIGNATURE TEXTURE DETAILS (all required, these distinguish Heckel
from generic woodcut):
- Small WHITE GOUGE MARKS left inside black areas — tiny unprinted
  scrape dots showing the path of the carving knife.
- DENSE PARALLEL DIAGONAL HATCHING at a single 45-degree angle in
  the background negative space, evenly spaced, never crosshatched.
- Faint vertical wood plank grain texture showing through the cream
  paper areas.
- Rough, hacked, almost violent carving aesthetic — NOT clean,
  decorative, or symmetrical.

AVOID: Kirchner's curving sinuous lines, Munch's swirling spiritual
emotion, Vallotton's clean silhouettes, vector illustration look,
Adobe Illustrator polish, perfect symmetry, crosshatching, gradients,
shading, photorealism, anime, watercolor.
```

### 1b · 横版（专题/研究子首页）`hero-face-landscape.png`

**注意构图差异**：横版把人脸偏到画面右侧（占右 ⅓ 到 ½），左侧留作背景元素（小山 / 太阳 / 留白），
因为子首页是左文右图，整张图右侧仍是视觉焦点。

**Midjourney v6**

```
Color woodcut narrative scene in the specific style of Erich Heckel's
Brücke period 1910-1913 (reference: "Fränzi Reclining" 1910,
"Springende Tänzerin" 1911). HORIZONTAL landscape composition 16:10.
LAYOUT: angular MASK-LIKE female face on RIGHT third of frame in
profile facing LEFT, fragmented into 4-5 sharp flat planes, almond
half-closed eyes, triangular jaw, elongated neck. LEFT half of frame:
two layered cobalt blue mountain peaks (#1c4a8a) with a small mustard
yellow sun (#f5b800) low on horizon. RAGGED SPLINTERED black outlines
(#0f0a06) with knife burrs (not smooth), vermillion red plane on
cheekbone (#d92410) shifted 3px off outline (registration misalignment),
small WHITE GOUGE MARKS inside black areas, DENSE PARALLEL DIAGONAL
HATCHING at 45 degrees in the negative space between mountains and
face (evenly spaced, never crossing), faint wood plank grain showing
through cream areas (#f4ead0), rough hacked violent carving — not
decorative, no gradient no shading, transparent PNG
--style raw --ar 16:10 --v 6 --stylize 60
--no photorealism, gradient, smooth shading, 3d render, Kirchner curves,
Munch swirls, Vallotton silhouette, vector art, crosshatching, symmetry
```

**DALL·E 3 / Codex Image API**

```
A color woodcut narrative illustration in the specific style of Erich
Heckel's Brücke period 1910-1913 (reference works: "Fränzi Reclining"
1910, "Springende Tänzerin" 1911). HORIZONTAL LANDSCAPE FORMAT 16:10,
1600×1000, transparent background.

COMPOSITION LAYOUT (strict):
- RIGHT third to right half of the frame: an angular MASK-LIKE female
  face in profile facing LEFT. Face fragmented into 4-5 sharp flat
  geometric planes, with almond half-closed eyes, triangular jaw,
  elongated neck.
- LEFT half of the frame: two layered cobalt-blue (#1c4a8a) mountain
  peaks with a small mustard-yellow (#f5b800) sun low on the horizon.
- A stretch of empty cream paper between the mountains and the face for
  visual breathing room.

LINEWORK: Bold deep-black outlines (#0f0a06) that are RAGGED and
SPLINTERED with visible knife burrs and broken edges. NOT smooth, NOT
curved, NOT vector-clean. Hand-carved gouge aesthetic.

COLOR BLOCKS: Vermillion red (#d92410) plane on the face's cheekbone,
deliberately shifted 3 pixels off the black outline (three-block
registration misalignment). Cream paper background (#f4ead0).

SIGNATURE TEXTURE DETAILS (all required):
- Small WHITE GOUGE MARKS left inside black areas — unprinted scrape
  dots showing the carving knife's path.
- DENSE PARALLEL DIAGONAL HATCHING at a single 45-degree angle in the
  negative space between the mountains and the face, evenly spaced,
  never crosshatched.
- Faint vertical wood plank grain texture in the cream paper areas.
- Rough, hacked, almost violent carving — NOT clean or decorative.

AVOID: Kirchner curving sinuous lines, Munch swirling emotion, Vallotton
clean silhouettes, vector illustration, Adobe Illustrator polish,
perfect symmetry, crosshatching, gradients, shading, photorealism.
```

---

> **下面 #2-#7 是装饰小图**，原 prompt 已能用。若要更逼真的 Heckel 笔触（撕裂轮廓 + 平行斜线 + 凿点留白），
> 把 §0.5 的 `HECKEL_FINGERPRINT` 段（去掉 "mask-like face" 这条，因为这些是物件/景物不是人脸）
> 拼到 prompt 中部即可。小图细节多反而吃力不讨好，按需开关。

## 2. 山形 · `mark-mountain.png`

**位置**：`HeckelMark` 的 `variant="mountain"`；Hero 角落 + 「所有专题」section 标题图记
**目标**：远山钴蓝、近山墨色、太阳朱红，棱角分明。

### Midjourney v6

```
Erich Heckel woodcut mountain landscape, two overlapping angular peaks,
back mountain in cobalt blue (#1c4a8a) flat block, front mountain in deep
black ink (#0f0a06), small vermillion red sun (#d92410) low on horizon,
mustard sky line (#f5b800), cream background (#f4ead0),
bold carved outlines, German Expressionism Die Brücke 1908,
flat color planes, visible gouge marks, no shading,
isolated icon, transparent PNG --style raw --ar 1:1 --v 6 --stylize 50
```

### DALL·E 3

```
Woodcut icon in Erich Heckel style. Two overlapping angular mountain peaks,
back peak filled with cobalt blue (#1c4a8a), front peak filled with deep black
(#0f0a06). Small vermillion-red circular sun (#d92410) above the back peak.
Thin mustard (#f5b800) horizon line. Cream background (#f4ead0). All shapes
filled with flat solid color, no gradients. Bold black outlines 4px wide,
visible carving strokes. Centered, square 512×512, transparent background.
```

---

## 3. 太阳 · `mark-sun.png`

**位置**：Hero 旋转太阳；「当期主推」section 标题图记
**目标**：芥黄圆盘 + 八方光束，每根光束都有刀刻棱角。

### Midjourney v6

```
Erich Heckel style woodcut sun, mustard yellow disc (#f5b800) with thick
black border (#0f0a06), eight angular black rays radiating outward in
cardinal and diagonal directions, ray tips squared off not pointed,
small vermillion red dot at center (#d92410), cream background (#f4ead0),
bold carved outlines, flat color, no shading, isolated symbol,
transparent PNG --style raw --ar 1:1 --v 6 --stylize 50
```

### DALL·E 3

```
Woodcut sun icon in Erich Heckel style. Mustard yellow circular disc
(#f5b800) at center, bordered with a 4-5px deep-black outline (#0f0a06).
Eight thick black rays radiate outward at 45° intervals; each ray is a
flat rectangular block with squared-off ends, not tapered. A small
vermillion-red circle (#d92410) sits exactly at the center. Cream
background (#f4ead0). No gradients, no shading. Square 512×512,
centered, transparent background.
```

---

## 4. 乌鸦 · `mark-bird.png`

**位置**：横向滚动末尾 END 标记；可作章节装饰
**目标**：展翅剪影，棱角化羽毛，朱红喙。

### Midjourney v6

```
Erich Heckel woodcut crow in flight, angular wings spread wide,
silhouette in deep black ink (#0f0a06), faceted wing feathers carved as
flat geometric shapes, small vermillion red beak (#d92410), cream
background (#f4ead0), Die Brücke 1910 style, bold outlines,
no shading, flat blocks, isolated symbol,
transparent PNG --style raw --ar 1:1 --v 6 --stylize 50
```

### DALL·E 3

```
Woodcut crow in flight, Erich Heckel style. Silhouette filled with deep
black (#0f0a06). Wings spread wide and broken into 5-7 flat angular
feather facets. Squared, geometric body. Single vermillion-red triangular
beak (#d92410). Cream background (#f4ead0). Bold visible carving strokes,
no shading, no gradient. Square 512×512, centered, transparent background.
```

---

## 5. 棱角树 · `mark-tree.png`

**位置**：HeckelBackground 右下角；研究 section 标记
**目标**：方角树干 + 红色叶团 + 林绿衬底。

### Midjourney v6

```
Erich Heckel woodcut single tree, thick rectangular black trunk (#0f0a06),
zigzag-edged red canopy of leaves (#d92410), forest green block behind
(#3a6627), cream background (#f4ead0), bold carved outlines,
Die Brücke landscape fragment, flat color planes, no shading,
isolated symbol, transparent PNG --style raw --ar 1:1 --v 6 --stylize 50
```

### DALL·E 3

```
Woodcut tree icon in Erich Heckel style. Thick rectangular tree trunk
filled deep black (#0f0a06) with squared edges. Above the trunk, a
canopy of vermillion-red leaves (#d92410) shaped as a jagged angular
polygon. Behind the canopy, a smaller forest-green block (#3a6627) for
contrast. Cream background (#f4ead0). All flat color, no gradient.
Visible gouge marks on the trunk. Square 512×512, centered, transparent
background.
```

---

## 6. 背景四角装饰 · `bg-corner-{tl,tr,bl,br}.png`

**位置**：`HeckelBackground.astro` 四个角的 SVG
**目标**：每角一个木刻小景，相互呼应但不重复——左上山、右上日、左下鸟、右下树。

> 出 4 张时，把上面 #2/#3/#4/#5 的 prompt 直接用，但改 `--ar 1:1` 为 `--ar 1:1`、
> 加 prompt 后缀 `"composition pushed to bottom-right corner, top-left area empty"`
> （根据角落朝向调整方位）。

**示例：左上角山（`bg-corner-tl.png`）**

```
Erich Heckel woodcut mountain peaks pushed into top-left corner,
two layered angular mountains in cobalt blue and black, small red sun
peeking out, lots of empty cream space in bottom-right two-thirds of the
frame, hand-carved strokes, Die Brücke style, flat blocks, no shading,
transparent PNG --style raw --ar 1:1 --v 6 --stylize 40
```

四张分别让构图偏向 TL / TR / BL / BR 即可。

---

## 7. 章节横幅 · `section-banner.png`（可选）

**位置**：替换 `HeckelSectionTitle` 顶部的纯黑条
**目标**：1600×320 木刻拼贴横条，左侧人脸右侧山景，中间留白给文字。

```
Erich Heckel woodcut horizontal banner, 1600x320, left third shows
abstract angular face fragment in black with red accent, middle third is
empty cream paper for typography, right third shows mountain landscape
with mustard sun, all in cream/black/red/blue/yellow palette only,
bold carved outlines, Die Brücke style, flat blocks, no shading,
high resolution print quality, transparent PNG
--style raw --ar 5:1 --v 6 --stylize 50
```

---

## 8. Hero 全景插画 · `hero-banner-{portrait,landscape}.png`（可选大替换）

**位置**：替换 `HeckelHero.astro` 整个右侧装饰组（face + mountain + sun），或子首页 `cover.hero_image`、文章页通栏封面。
**目标**：单张高保真叙事插画，比 #1 更完整的场景，能独当一面。

### 8a · 竖版（主站首页 hero 右槽 / 移动端通栏）`hero-banner-portrait.png`

```
Color woodcut narrative scene in the specific style of Erich Heckel's Brücke
period 1910-1913 (reference: "Fränzi Reclining" 1910, "Springende Tänzerin"
1911). VERTICAL composition 3:4. An angular MASK-LIKE female figure in
profile facing right, fragmented into 4-5 sharp flat planes, almond half-
closed eyes, triangular jaw, elongated neck, occupying upper two-thirds of
the frame. Lower third: two layered cobalt blue mountain peaks (#1c4a8a)
with a mustard yellow sun (#f5b800) low on the horizon. RAGGED SPLINTERED
black outlines (#0f0a06) with knife burrs (not smooth), one vermillion red
plane on the figure's cheekbone (#d92410) shifted 3px off outline
(three-block registration misalignment), small WHITE GOUGE MARKS inside
black areas, DENSE PARALLEL DIAGONAL HATCHING at 45 degrees in the negative
space between the figure and the mountains (evenly spaced, never crossing),
faint vertical wood plank grain in cream areas (#f4ead0), rough hacked
violent carving — NOT decorative, no gradient no shading, transparent PNG
--style raw --ar 3:4 --v 6 --stylize 60 --quality 2
--no photorealism, gradient, smooth shading, 3d render, Kirchner curves,
Munch swirls, Vallotton silhouette, vector art, crosshatching, symmetry
```

### 8b · 横版（专题/研究子首页 hero · 文章页通栏封面）`hero-banner-landscape.png`

> 子首页 hero 右图槽位（BasquiatHero）和文章页 `cover.hero_image` 通栏都用这版。

```
Color woodcut narrative scene in the specific style of Erich Heckel's Brücke
period 1910-1913 (reference: "Fränzi Reclining" 1910, "Springende Tänzerin"
1911). HORIZONTAL landscape composition 16:9. On the RIGHT half: an angular
MASK-LIKE female figure in profile facing left, fragmented into 4-5 sharp
flat planes, almond half-closed eyes, triangular jaw, elongated neck. On
the LEFT half: two layered cobalt blue mountain peaks (#1c4a8a) with a
mustard yellow sun (#f5b800) rising between them. A single black crow
silhouette (#0f0a06) flying across the upper middle. RAGGED SPLINTERED
black outlines (#0f0a06) with knife burrs (not smooth), one vermillion red
plane on the figure's cheekbone (#d92410) shifted 3px off outline
(three-block registration misalignment), small WHITE GOUGE MARKS inside
black areas, DENSE PARALLEL DIAGONAL HATCHING at 45 degrees in the sky
negative space (evenly spaced, never crossing), faint vertical wood plank
grain in cream areas (#f4ead0), rough hacked violent carving — NOT
decorative, no gradient no shading, transparent PNG
--style raw --ar 16:9 --v 6 --stylize 60 --quality 2
--no photorealism, gradient, smooth shading, 3d render, Kirchner curves,
Munch swirls, Vallotton silhouette, vector art, crosshatching, symmetry
```

> 跑横版时一定要在 prompt 里写 **"HORIZONTAL"** + **构图分区**（左/右/上/下各放什么），
> 否则 AI 容易直接把竖版强行拉宽，元素歪斜。同理跑竖版也要写 **"VERTICAL"** + 元素分层。

---

## 9. 集成方式

出图后放到 `src/assets/themes/heckel/<name>.png`，再改组件。

**例 1：主站首页 HeckelHero 用竖版大图替换 face SVG**

```diff
-import HeckelMark from './HeckelMark.astro';
+import { Image } from 'astro:assets';
+import heroFacePortrait from '@/assets/themes/heckel/hero-face-portrait.png';

   <div class="hk-hero-face">
-    <HeckelMark variant="face" size={220} ink="#0f0a06" accent="#d92410" bg="#f4ead0"/>
+    <Image src={heroFacePortrait} alt="" width={260} height={325} format="webp" loading="eager"/>
   </div>
```

**例 1b：专题/研究子首页 BasquiatHero / 未来 HeckelSubHero 用横版大图**

子首页是「左文 1.4fr + 右图 1fr」两栏，传入的 `heroImage` 必须是横版：

```yaml
# src/content/topics/<slug>/index.md frontmatter
cover:
  hero_image: ../../../assets/themes/heckel/hero-face-landscape.png
  # 或专题自己定制的同版型图
```

或直接在 hero 组件里硬接：

```diff
-import { Image } from 'astro:assets';
+import { Image } from 'astro:assets';
+import heroFaceLandscape from '@/assets/themes/heckel/hero-face-landscape.png';

   <figure class="bsq-hero-image">
-    <Image src={heroImage!} alt={title} widths={[320,480,720]} .../>
+    <Image src={heroImage ?? heroFaceLandscape} alt={title} widths={[480,720,960]} sizes="(max-width: 760px) 100vw, 480px" .../>
   </figure>
```

**例 2：HeckelMark 改成图片优先 + SVG 回退**

```astro
---
import { Image } from 'astro:assets';
const variantImages: Record<string, ImageMetadata | undefined> = {
  mountain: await import('@/assets/themes/heckel/mark-mountain.png').then(m => m.default).catch(() => undefined),
  // ... 其它
};
const img = variantImages[variant];
---
{img ? (
  <Image src={img} alt="" width={size} height={size} format="webp" loading="lazy"/>
) : (
  /* 现有 SVG 回退 */
  ...
)}
```

这样图片缺失时 SVG 占位还在跑，不会断版。

**例 3：HeckelBackground 四角换图**

把每个 `<svg class="hk-bg-tl">…</svg>` 替换为：

```astro
<Image src={cornerTL} alt="" class="hk-bg-tl" width={280} height={280} loading="lazy"/>
```

并保留 `.hk-bg-tl { position:absolute; top:-20px; left:-20px; opacity:0.35; }` 之类的样式。

---

## 10. 出图建议工作流

1. 用 **Midjourney** 先跑 3 张定调：`hero-face-portrait` / `mark-mountain` / `mark-sun`，看风格统一性
2. 风格 OK 后**立刻用相同 `--seed` 跑横版** `hero-face-landscape`，确保竖横两版美学一致（同人脸语言、同色块）
3. 不喜欢的元素用 `--seed <数字>` 锁随机性后微调 prompt
4. 满意后批量出 5-8 张做候选
5. 在 Photopea / Figma 里把多余白底裁掉、统一画布尺寸、导出透明 PNG
6. 丢进 `src/assets/themes/heckel/`，按例 1/1b 改组件即可

> **重要**：竖版给主站首页 hero 槽位、横版给专题/研究子首页和文章页通栏。
> 跑横版 prompt 必须显式写 `HORIZONTAL` + 左右构图分区，否则 MJ / DALL·E 会把竖版强行拉宽，
> 元素歪斜失衡。同理竖版要写 `VERTICAL` + 上下分层。

> **色值**：所有色都在 prompt 里直接给十六进制，比让 AI 自己挑色稳定得多。
> 反复对比就用同一组色，整套画面才统一。
