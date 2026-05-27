// src/themes/basquiat.ts
import type { ThemePack } from './_types';

// 完整实现 · 2026-05 · 启用于 "AI 安全边界" 研究专题
// 设计思路：Basquiat 的能量靠"罢工色 + 黑墨 + 王冠"撑起，但长文阅读必须先保证可读性。
//   - 底色用奶黄而非纯黄（#f8d12b 留给 Crown/Stamp 用作 alarm 色）
//   - 正文 Noto Serif SC（中文长文可读）
//   - Permanent Marker 仅用于装饰组件（Latin only，签名/盖戳/批注）
export const basquiat: ThemePack = {
  id: 'basquiat',
  name: 'Basquiat',
  tokens: {
    bg:          '#f5d040',   // Basquiat 标志亮黄底（视觉强差异度 vs schiele 骨色）
    bgSoft:      '#fae278',   // 亮黄软调（卡片底）
    bgDeep:      '#e0bc28',   // 加深黄
    ink:         '#0a0a0a',   // Basquiat 标志性近黑墨
    inkSoft:     '#1f1f1f',
    inkFaint:    '#5a5040',   // 黄底配的暖灰，不是冷灰
    accent:      '#c43838',   // 鲜红 · 划掉 / 强调
    accentSoft:  '#e85a5a',
    ochre:       '#1a4ba8',   // 钴蓝 · 引用 / 副线索
    rule:        '#0a0a0a',   // 粗黑分隔
  },
  fonts: {
    serif:  "'Noto Serif SC', 'EB Garamond', Georgia, serif",
    script: "'Permanent Marker', 'Caveat', cursive",
  },
  decorativeComponents: [
    'Crown',          // Basquiat 标志三角王冠
    'StrikeText',     // 红色粗划掉
    'ScribbleStamp',  // 手写章 + 倾斜
    'MarkerLine',     // 不平直手绘分隔线
    'BasquiatNote',   // 黄底马克笔风边注
  ],
  classOverrides: 'theme-basquiat',
};
