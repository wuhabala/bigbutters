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
  // 注意：Caveat 不在主题包级 preload。
  // 改由 HandSignature 组件按需 fetch (评审 #10：避免列表页/首页空载 49KB)。
};
