import type { ThemePack } from './_types';

export const haeckel: ThemePack = {
  id: 'haeckel',
  name: 'Haeckel',
  tokens: {
    bg:          '#f0e7d0',
    bgSoft:      '#f4ecda',
    bgDeep:      '#e6dcc0',
    ink:         '#1a2842',
    inkSoft:     '#3d4860',
    inkFaint:    '#6d7488',
    accent:      '#8b6438',
    accentSoft:  '#a87c4a',
    ochre:       '#1a2842',
    rule:        '#c8bba1',
  },
  fonts: {
    serif: "'EB Garamond', 'Noto Serif SC', serif",
  },
  decorativeComponents: [],
  classOverrides: 'theme-haeckel',
};
