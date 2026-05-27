// src/themes/index.ts
import type { ThemePack, ThemeId } from './_types';
import { schiele } from './schiele';
import { basquiat } from './basquiat';
import { haeckel } from './haeckel';
import { matisse } from './matisse';
import { escher } from './escher';

export const themes: Record<ThemeId, ThemePack> = {
  schiele,
  basquiat,
  haeckel,
  matisse,
  escher,
};

export function getTheme(id: ThemeId | undefined): ThemePack {
  return themes[id ?? 'schiele'] ?? schiele;
}

export function tokensToCss(tokens: ThemePack['tokens']): string {
  const kebab = (s: string) => s.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
  return Object.entries(tokens)
    .map(([k, v]) => `--${kebab(k)}: ${v};`)
    .join(' ');
}

export type { ThemePack, ThemeId, ThemeTokens } from './_types';
