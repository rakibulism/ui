/**
 * Color palette — the single source of truth for all color values.
 *
 * `success`/`error`/`warning`/`gray` are sourced from Tailwind CSS's default
 * palette (emerald/red/amber/gray) so they're battle-tested and consistent
 * with what most consumers already know. `primary` is this project's own
 * brand color (#0F453C, a deep teal-green) — the scale is generated with
 * #0F453C anchored exactly at the 600 step, since that's the step consumed
 * for solid fills (e.g. the primary Button variant), so the brand hex shows
 * up pixel-for-pixel where it matters most.
 * Each scale runs 50 (lightest) to 950 (darkest).
 */
export const colors = {
  primary: {
    50: '#ECFDFA',
    100: '#D6FAF4',
    200: '#AFF3E8',
    300: '#74E7D3',
    400: '#29D6B9',
    500: '#1C8776',
    600: '#0F453C', // brand anchor — exact input hex
    700: '#0B3830', // hover state
    800: '#072E28', // active state
    900: '#05241F',
    950: '#031714',
  },
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#030712',
  },
  success: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
    950: '#022C22',
  },
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
    950: '#450A0A',
  },
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
    950: '#451A03',
  },
  white: '#FFFFFF',
  black: '#000000',
} as const;

export type Colors = typeof colors;
