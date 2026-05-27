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
