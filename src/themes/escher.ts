import type { ThemePack } from './_types';

export const escher: ThemePack = {
  id: 'escher',
  name: 'Escher',
  tokens: {
    bg:          '#f3ecdf',
    bgSoft:      '#fbf7ee',
    bgDeep:      '#dccdb7',
    ink:         '#25363a',
    inkSoft:     '#4b6060',
    inkFaint:    '#83908b',
    accent:      '#c96e55',
    accentSoft:  '#e4a183',
    ochre:       '#448d8b',
    rule:        '#c9bca9',
  },
  fonts: {
    sans: "'Source Han Sans SC Escher', 'Source Han Sans SC', 'PingFang SC', -apple-system, sans-serif",
  },
  decorativeComponents: ['EscherBackground', 'EscherHero', 'EscherCover', 'ImpossibleSteps'],
  classOverrides: 'theme-escher',
};
