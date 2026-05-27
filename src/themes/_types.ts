// src/themes/_types.ts

export interface ThemeTokens {
  bg: string;
  bgSoft: string;
  bgDeep: string;
  ink: string;
  inkSoft: string;
  inkFaint: string;
  accent: string;
  accentSoft: string;
  ochre: string;
  rule: string;
}

export interface ThemeFonts {
  serif?: string;
  sans?: string;
  script?: string;
}

export interface ThemePack {
  /** Slug (matches frontmatter `theme` field). Typed to ThemeId so registry key drift gets caught at build. */
  id: ThemeId;
  /** Human-readable 中文名 */
  name: string;
  /** CSS variable values */
  tokens: ThemeTokens;
  /** Optional font overrides; falls back to base.css 默认 */
  fonts?: ThemeFonts;
  /** Whitelist of decorative components allowed under this theme */
  decorativeComponents: string[];
  /** Optional CSS class to inject on <body> */
  classOverrides?: string;
  /** Extra fonts to preload when this theme is active */
  preloadFonts?: string[];
}

/** Single source of truth for valid theme slugs.
 *  Used both by TypeScript (ThemeId) and Zod (themeEnum in content/config.ts). */
export const themeIds = ['schiele', 'basquiat', 'haeckel', 'matisse', 'escher'] as const;

export type ThemeId = typeof themeIds[number];
