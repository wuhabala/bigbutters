import type { ThemePack } from './_types';

export const basquiat: ThemePack = {
  id: 'basquiat',
  name: 'Basquiat',
  tokens: {
    bg:          '#f8d12b',
    bgSoft:      '#fae27b',
    bgDeep:      '#e8c020',
    ink:         '#0a0a0a',
    inkSoft:     '#2a2a2a',
    inkFaint:    '#555555',
    accent:      '#c43838',
    accentSoft:  '#e85a5a',
    ochre:       '#1a4ba8',
    rule:        '#0a0a0a',
  },
  fonts: {
    serif:  "'Permanent Marker', 'Noto Serif SC', cursive",
    script: "'Permanent Marker', cursive",
  },
  decorativeComponents: [],
  classOverrides: 'theme-basquiat',
};
