// src/themes/index.ts
import type { ThemePack, ThemeId } from './_types';
import { schiele } from './schiele';
import { basquiat } from './basquiat';
import { haeckel } from './haeckel';
import { matisse } from './matisse';
import { escher } from './escher';

// `satisfies` 检查 (a) 每个 key 必须是 ThemeId, (b) 每个 value 必须满足 ThemePack
// `id` 字段已通过 ThemePack.id: ThemeId 限制取值范围（评审 #12）
export const themes = {
  schiele,
  basquiat,
  haeckel,
  matisse,
  escher,
} satisfies Record<ThemeId, ThemePack>;

// Runtime sanity check: each pack's `id` field equals its registry key.
// 静态类型层面 TS 不易精准捕获，由此运行时断言兜底。
for (const [key, pack] of Object.entries(themes)) {
  if (pack.id !== key) {
    throw new Error(
      `Theme registry inconsistency: themes['${key}'].id is '${pack.id}', expected '${key}'`
    );
  }
}

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
