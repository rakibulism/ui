import { describe, expect, it } from 'vitest';
import { colors } from '../colors';

// WCAG 2.1 relative luminance / contrast ratio (spec formula).
function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(hexToRgb(a));
  const lb = relativeLuminance(hexToRgb(b));
  const [lighter, darker] = la > lb ? [la, lb] : [lb, la];
  return (lighter + 0.05) / (darker + 0.05);
}

const AA_TEXT = 4.5;
const AA_UI = 3;

const LIGHT_SURFACE = colors.white;
const DARK_SURFACE = '#1f2937';

// Semantic tokens as defined in src/styles/globals.css. Dark-mode hex values
// are hand-mirrored from globals.css's [data-theme='dark'] block since that
// file isn't importable here — keep the two in sync when either changes.
const semantic = {
  textMuted: { light: colors.gray[600], dark: '#d1d5db' },
  iconDefault: { light: colors.gray[500], dark: '#9ca3af' },
  borderStrong: { light: colors.gray[500], dark: '#9ca3af' },
  indicatorInfo: { light: colors.primary[500], dark: colors.primary[500] },
  indicatorSuccess: { light: colors.success[600], dark: colors.success[600] },
  indicatorError: { light: colors.error[500], dark: colors.error[500] },
  indicatorWarning: { light: colors.warning[600], dark: colors.warning[600] },
};

describe('WCAG AA contrast — semantic tokens vs surface', () => {
  it.each([
    ['textMuted', semantic.textMuted, AA_TEXT],
    ['iconDefault', semantic.iconDefault, AA_UI],
    ['borderStrong', semantic.borderStrong, AA_UI],
    ['indicatorInfo', semantic.indicatorInfo, AA_UI],
    ['indicatorSuccess', semantic.indicatorSuccess, AA_UI],
    ['indicatorError', semantic.indicatorError, AA_UI],
    ['indicatorWarning', semantic.indicatorWarning, AA_UI],
  ] as const)('%s clears %s:1 against the surface in both themes', (_name, token, threshold) => {
    expect(contrastRatio(token.light, LIGHT_SURFACE)).toBeGreaterThanOrEqual(threshold);
    expect(contrastRatio(token.dark, DARK_SURFACE)).toBeGreaterThanOrEqual(threshold);
  });
});

describe('WCAG AA contrast — solid-fill buttons', () => {
  it('Button.danger (white on error-600) clears 4.5:1', () => {
    expect(contrastRatio(colors.white, colors.error[600])).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it('Button.primary (white on primary-600) clears 4.5:1', () => {
    expect(contrastRatio(colors.white, colors.primary[600])).toBeGreaterThanOrEqual(AA_TEXT);
  });
});
