# @rakibulism/ui

A code-first design system and React component library — type-safe, tree-shakeable, and themeable via design tokens.

[![npm](https://img.shields.io/npm/v/@rakibulism/ui.svg)](https://www.npmjs.com/package/@rakibulism/ui)
[![license](https://img.shields.io/npm/l/@rakibulism/ui.svg)](./LICENSE)

## Features

- 🎨 **Code-first tokens** — colors, spacing, typography, shadows, and radii defined in TypeScript
- ⚛️ **React 18+ components** — `Button`, `Input`, `Card` with full prop typing
- 🧩 **CSS Modules** — scoped styles, no global class pollution; component CSS is auto-injected
- 📦 **ESM + CommonJS** — ships both formats with auto-generated `.d.ts` types
- 🎯 **Themeable** — every component reads CSS variables, so the optional global stylesheet re-themes everything

## Installation

```bash
npm install @rakibulism/ui
# or
yarn add @rakibulism/ui
# or
pnpm add @rakibulism/ui
```

`react` and `react-dom` (v18+) are peer dependencies.

## Quick Start

```tsx
import { useState } from 'react';
import { Button, Input, Card } from '@rakibulism/ui';
import '@rakibulism/ui/styles'; // optional — see "Styling" below

export default function App() {
  const [email, setEmail] = useState('');

  return (
    <Card variant="elevated">
      <h1>Welcome</h1>

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        helperText="We'll never share your email"
      />

      <Button variant="primary" size="lg" onClick={() => console.log(email)}>
        Submit
      </Button>
    </Card>
  );
}
```

## Components

### Button

```tsx
<Button variant="primary" size="md" onClick={() => {}}>Click Me</Button>
<Button variant="danger" isLoading>Saving…</Button>
```

| Prop         | Type                                               | Default     | Description                                  |
| ------------ | -------------------------------------------------- | ----------- | -------------------------------------------- |
| `variant`    | `'primary' \| 'secondary' \| 'ghost' \| 'danger'`  | `'primary'` | Visual style                                 |
| `size`       | `'sm' \| 'md' \| 'lg'`                              | `'md'`      | 32 / 40 / 48px height                        |
| `isLoading`  | `boolean`                                          | `false`     | Shows a spinner and disables interaction     |
| `isDisabled` | `boolean`                                          | `false`     | Disables the button                          |

Also accepts all standard `<button>` attributes and forwards a `ref`.

### Input

```tsx
<Input
  label="Email Address"
  type="email"
  placeholder="you@example.com"
  helperText="We'll never share your email"
  error={emailError}
/>
```

| Prop         | Type     | Description                                           |
| ------------ | -------- | ----------------------------------------------------- |
| `label`      | `string` | Optional label rendered above the input               |
| `error`      | `string` | Error message; also styles the field red              |
| `helperText` | `string` | Helper text shown below the input when there's no error |

Label, input, and message are wired with the correct `htmlFor` / `aria-describedby` / `aria-invalid` associations. Accepts all standard `<input>` attributes and forwards a `ref`.

### Card

```tsx
<Card variant="elevated">
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</Card>
```

| Prop      | Type                                      | Default      | Description  |
| --------- | ----------------------------------------- | ------------ | ------------ |
| `variant` | `'elevated' \| 'outlined' \| 'filled'`    | `'elevated'` | Visual style |

Accepts all standard `<div>` attributes and forwards a `ref`.

## Design Tokens

Import tokens directly to build custom components or styles:

```ts
import { colors, spacing, typography, shadows, radius } from '@rakibulism/ui/tokens';

const customStyle = {
  color: colors.primary[500],           // #3B82F6
  padding: spacing[4],                  // 16px
  fontSize: typography.fontSize.base,   // 16px
  boxShadow: shadows.md,
  borderRadius: radius.lg,              // 12px
};
```

| Token        | Examples                                                        |
| ------------ | --------------------------------------------------------------- |
| `colors`     | `primary` (50–900), `gray` (50–900), `success`, `error`, `warning`, `white`, `black` |
| `spacing`    | `0`–`24` on a 4px scale (`spacing[4]` → `16px`)                  |
| `typography` | `fontFamily`, `fontSize` (`xs`–`4xl`), `fontWeight`, `lineHeight` |
| `shadows`    | `sm`, `base`, `md`, `lg`, `xl`                                   |
| `radius`     | `sm`, `md`, `lg`, `full`                                         |

## Styling

Component styles are **CSS Modules that auto-inject** when you import a component — so the library works out of the box without any CSS import.

The global stylesheet is **optional**. Import it once at your app root to get:

- CSS custom properties (`--color-*`, `--space-*`, `--font-*`, `--shadow-*`, `--radius-*`)
- A light reset (`box-sizing`, margin reset) and font-rendering optimizations

```ts
import '@rakibulism/ui/styles';
```

Because every component reads these CSS variables (with sensible hardcoded fallbacks), overriding a variable re-themes the whole library:

```css
:root {
  --color-primary-600: #7c3aed; /* buttons are now purple */
}
```

## TypeScript

Every component and token ships with types. Component prop types are exported for reuse:

```ts
import type { ButtonProps, InputProps, CardProps } from '@rakibulism/ui';
```

## Development

```bash
npm install        # install dependencies
npm run dev        # start Vite in dev mode
npm run type-check # tsc --noEmit
npm run build      # build ESM + CJS + types into dist/
```

## License

[MIT](./LICENSE) © Rakibul Islam