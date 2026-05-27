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
