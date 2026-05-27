import type { ThemePack } from './_types';

export const escher: ThemePack = {
  id: 'escher',
  name: 'Escher',
  tokens: {
    bg:          '#ece6dc',
    bgSoft:      '#f0eadf',
    bgDeep:      '#dfd8cb',
    ink:         '#14100a',
    inkSoft:     '#3a342a',
    inkFaint:    '#75706a',
    accent:      '#14100a',
    accentSoft:  '#3a342a',
    ochre:       '#5a5550',
    rule:        '#c8c0b0',
  },
  fonts: {
    serif: "'Inter', 'Noto Serif SC', sans-serif",
  },
  decorativeComponents: [],
  classOverrides: 'theme-escher',
};
