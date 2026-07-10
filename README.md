<img src="./logo/squircle.svg" alt="" width="56" height="56" />

# rakibulism-ui

A code-first design system and React component library — type-safe, tree-shakeable, and themeable via design tokens.

[![npm](https://img.shields.io/npm/v/rakibulism-ui.svg)](https://www.npmjs.com/package/rakibulism-ui)
[![license](https://img.shields.io/npm/l/rakibulism-ui.svg)](./LICENSE)
[![website](https://img.shields.io/website?url=https%3A%2F%2Fui-rakibulism.vercel.app&label=demo)](https://ui-rakibulism.vercel.app)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frakibulism%2Fui)

🔗 **Live demo:** [ui-rakibulism.vercel.app](https://ui-rakibulism.vercel.app)

## Features

- ⚛️ **23 React components** — forms, overlays, navigation, and feedback primitives, all fully typed and accessibility-wired (roles, aria attributes, keyboard navigation)
- 🎨 **Code-first tokens** — colors (a deep-green brand scale plus Tailwind-sourced semantic scales, all 50–950), spacing, typography, shadows, and radii defined in TypeScript
- 🧩 **CSS Modules** — scoped styles, no global class pollution; component CSS is auto-injected
- 📦 **ESM + CommonJS** — tree-shakeable, ships both formats with auto-generated `.d.ts` types
- 🎯 **Themeable** — every component reads CSS variables, so overriding a token re-themes everything
- ✅ **Tested** — 74 behavior tests gate every change and release
- ♿ **Base UI under the hood** — Modal, Menu, Tooltip, Toast, Tabs, Accordion, and Select wrap Base UI primitives for real focus traps, keyboard navigation, and collision-aware positioning, styled with this library's own CSS Modules

**Components:** Button · Input · Textarea · Select · Checkbox · Radio · Switch · Card · Modal · Tooltip · Toast · Menu · Alert · Tabs · Accordion · Breadcrumbs · Pagination · Badge · Avatar · Spinner · Skeleton · Progress · Divider

## Installation

Two ways to use rakibulism-ui: copy component source straight into your
project (**CLI**), or install it as a package dependency (**Manual**).

### CLI — copy component source into your project

Copies a component's `.tsx` + CSS module directly into `src/components/ui`,
shadcn-style, so you own and can edit the code. Each component only depends
on `react`, `react-dom`, and `clsx` — nothing imports from elsewhere in the
package, so a copied component is fully self-contained.

```bash
# npm
npx rakibulism-ui@latest init
npx rakibulism-ui@latest add button

# bun
bunx rakibulism-ui@latest init
bunx rakibulism-ui@latest add button

# pnpm
pnpm dlx rakibulism-ui@latest init
pnpm dlx rakibulism-ui@latest add button

# yarn (Berry/v2+)
yarn dlx rakibulism-ui@latest init
yarn dlx rakibulism-ui@latest add button
```

`init` writes a `rakibulism-ui.json` config and copies design tokens +
`globals.css`. Run `... list` (with any of the runners above) to see all
available components.

### Manual — install as a package

```bash
# npm
npm install rakibulism-ui

# bun
bun add rakibulism-ui

# pnpm
pnpm add rakibulism-ui

# yarn
yarn add rakibulism-ui
```

`react` and `react-dom` (v18+) are peer dependencies.

## Quick Start

```tsx
import { useState } from 'react';
import { Button, Input, Card } from 'rakibulism-ui';
import 'rakibulism-ui/styles'; // optional — see "Styling" below

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

### Checkbox

```tsx
<Checkbox label="Subscribe to updates" defaultChecked />
<Checkbox label="Required field" error="You must accept the terms" />
```

| Prop         | Type     | Description                              |
| ------------ | -------- | ----------------------------------------- |
| `label`      | `string` | Label rendered next to the checkbox       |
| `error`      | `string` | Error message; also styles the checkbox red |
| `helperText` | `string` | Helper text shown when there's no error    |

A native checkbox styled with `accent-color` for full keyboard and screen reader support. Accepts all standard `<input>` attributes and forwards a `ref`.

### Radio / RadioGroup

```tsx
<RadioGroup name="plan" value={plan} onChange={setPlan}>
  <Radio value="free" label="Free" />
  <Radio value="pro" label="Pro" />
</RadioGroup>
```

| Component    | Prop       | Type                          | Description                                  |
| ------------ | ---------- | ------------------------------ | --------------------------------------------- |
| `RadioGroup` | `name`     | `string`                       | Shared `name` applied to every `Radio` inside |
| `RadioGroup` | `value`    | `string`                       | Currently selected value (controlled)         |
| `RadioGroup` | `onChange` | `(value: string) => void`      | Called with the newly selected value          |
| `Radio`      | `value`    | `string`                       | Value this radio represents (required)        |
| `Radio`      | `label`    | `string`                       | Label rendered next to the radio              |

`Radio` reads `name` / `checked` / `onChange` from an ancestor `RadioGroup` automatically — or use it standalone as a plain controlled/uncontrolled radio input.

### Switch

```tsx
<Switch label="Enable notifications" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
```

| Prop    | Type     | Description                  |
| ------- | -------- | ----------------------------- |
| `label` | `string` | Label rendered next to the switch |

Backed by a native checkbox (`role="switch"`) for accessibility; the track and thumb are purely visual. Accepts all standard `<input>` attributes and forwards a `ref`.

### Textarea

```tsx
<Textarea label="Bio" placeholder="Tell us about yourself" helperText="Max 500 characters" />
```

| Prop         | Type     | Description                                |
| ------------ | -------- | -------------------------------------------- |
| `label`      | `string` | Optional label rendered above the textarea    |
| `error`      | `string` | Error message; also styles the field red      |
| `helperText` | `string` | Helper text shown when there's no error        |

Same API shape as `Input`. Accepts all standard `<textarea>` attributes and forwards a `ref`.

### Select

```tsx
<Select label="Country" defaultValue="us">
  <option value="us">United States</option>
  <option value="bd">Bangladesh</option>
</Select>
```

| Prop          | Type                     | Description                              |
| ------------- | ------------------------ | ----------------------------------------- |
| `label`       | `string`                 | Optional label rendered above the select  |
| `error`       | `string`                 | Error message; also styles the field red  |
| `helperText`  | `string`                 | Helper text shown when there's no error    |
| `placeholder` | `string`                 | Shown in the trigger when nothing is selected |
| `onChange`    | `(value: string) => void`| Called with the newly selected value       |

Pass `<option>` children as usual — wraps Base UI `Select` internally, trading the native `<select>` (and its platform mobile picker UI) for a fully custom, consistently-styled listbox across browsers/OSes. `onChange` receives the selected value directly rather than a native change event; the ref forwards to the trigger `<button>`, not a `<select>` element.

### Tooltip

```tsx
<Tooltip content="Saves your changes" placement="top">
  <Button>Save</Button>
</Tooltip>
```

| Prop        | Type                                          | Default | Description                          |
| ----------- | ---------------------------------------------- | ------- | -------------------------------------- |
| `content`   | `ReactNode`                                    | —       | Tooltip text or content                |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'`       | `'top'` | Where the tooltip renders               |
| `children`  | `ReactElement`                                 | —       | A single focusable/hoverable trigger    |

Wraps a single trigger element and shows on hover/focus. Wraps Base UI `Tooltip` internally — portaled, with collision-aware positioning, a short hover-intent delay, and Escape-to-dismiss.

### Modal

```tsx
const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Open</Button>
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm">
  <p>Are you sure?</p>
</Modal>
```

| Prop                   | Type         | Default | Description                                  |
| ---------------------- | ------------ | ------- | --------------------------------------------- |
| `isOpen`                | `boolean`    | —       | Whether the modal is visible                  |
| `onClose`                | `() => void` | —       | Called on Escape, backdrop click, or close ×   |
| `title`                  | `string`     | —       | Optional header title (also sets `aria-labelledby`) |
| `closeOnBackdropClick`   | `boolean`    | `true`  | Closes when clicking outside the panel         |

Rendered into a portal at `document.body`. Locks body scroll while open, traps focus inside while open, and returns focus to the trigger on close. Renders nothing while `isOpen` is `false`. Wraps Base UI `Dialog` internally.

### Toast

```tsx
// once, near your app root
<ToastProvider>
  <App />
</ToastProvider>

// anywhere inside
const { show } = useToast();
show({ title: 'Saved', description: 'Your changes were saved.', variant: 'success' });
```

| Option        | Type                                              | Default  | Description                          |
| ------------- | --------------------------------------------------- | -------- | -------------------------------------- |
| `title`       | `string`                                            | —        | Toast heading                          |
| `description` | `string`                                            | —        | Toast body text                        |
| `variant`     | `'info' \| 'success' \| 'error' \| 'warning'`       | `'info'` | Accent color                           |
| `duration`    | `number`                                            | `4000`   | Auto-dismiss delay in ms; `0` disables it |

`useToast()` returns `{ show, dismiss }` and must be called within a `ToastProvider`. Toasts render into a portal stacked in the top-right corner. Wraps Base UI `Toast` internally — auto-dismiss pauses on hover/focus.

### Menu

```tsx
<Menu trigger={<Button>Actions</Button>}>
  <MenuItem onClick={handleEdit}>Edit</MenuItem>
  <MenuItem destructive onClick={handleDelete}>Delete</MenuItem>
</Menu>
```

| Component  | Prop          | Type                    | Description                                  |
| ---------- | ------------- | ------------------------ | --------------------------------------------- |
| `Menu`     | `trigger`     | `ReactElement`            | Trigger element; receives `onClick` to toggle |
| `Menu`     | `align`       | `'start' \| 'end'`        | Menu alignment relative to the trigger (default `'start'`) |
| `MenuItem` | `destructive` | `boolean`                 | Renders with red, dangerous-action styling     |

A click-triggered dropdown that closes on outside click, Escape, or selecting an item. Wraps Base UI `Menu` internally — adds arrow-key navigation between items and portaled, collision-aware positioning.

### Tabs

```tsx
<Tabs defaultValue="profile">
  <TabList>
    <Tab value="profile">Profile</Tab>
    <Tab value="settings">Settings</Tab>
  </TabList>
  <TabPanel value="profile">Profile content</TabPanel>
  <TabPanel value="settings">Settings content</TabPanel>
</Tabs>
```

| Component  | Prop          | Type                       | Description                          |
| ---------- | ------------- | ---------------------------- | --------------------------------------- |
| `Tabs`     | `value`       | `string`                     | Active tab (controlled)                |
| `Tabs`     | `defaultValue`| `string`                     | Initial active tab (uncontrolled)       |
| `Tabs`     | `onChange`    | `(value: string) => void`    | Called when the active tab changes      |
| `Tab`      | `value`       | `string`                     | Value this tab activates                |
| `TabPanel` | `value`       | `string`                     | Only rendered when its value is active  |

`TabList` implements roving-tabindex keyboard navigation — Left/Right arrows move focus and selection between tabs.

### Accordion

```tsx
<Accordion type="single" defaultValue="item-1">
  <AccordionItem value="item-1" title="What is this?">
    <p>Content for item one</p>
  </AccordionItem>
  <AccordionItem value="item-2" title="Another question">
    <p>Content for item two</p>
  </AccordionItem>
</Accordion>
```

| Prop          | Type                       | Default    | Description                                  |
| ------------- | ---------------------------- | ---------- | --------------------------------------------- |
| `type`        | `'single' \| 'multiple'`      | `'single'` | Whether one or multiple items can be open      |
| `value`       | `string \| string[]`          | —          | Open item(s) (controlled)                      |
| `defaultValue`| `string \| string[]`          | —          | Initial open item(s) (uncontrolled)            |
| `onChange`    | `(value) => void`             | —          | Called with the new open item(s)                |

`AccordionItem` takes a `value` and `title`; its children are the collapsible panel content.

### Breadcrumbs

```tsx
<Breadcrumbs>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
  <BreadcrumbItem isCurrent>Components</BreadcrumbItem>
</Breadcrumbs>
```

| Component        | Prop        | Type        | Description                                  |
| ---------------- | ----------- | ------------- | --------------------------------------------- |
| `Breadcrumbs`     | `separator` | `ReactNode`   | Separator rendered between items (default `'/'`) |
| `BreadcrumbItem`  | `isCurrent` | `boolean`     | Renders as non-interactive text for the current page |

### Pagination

```tsx
<Pagination page={page} totalPages={12} onPageChange={setPage} />
```

| Prop           | Type                       | Default | Description                              |
| -------------- | ---------------------------- | ------- | ------------------------------------------ |
| `page`         | `number`                     | —       | Current page (1-indexed)                   |
| `totalPages`   | `number`                     | —       | Total number of pages                      |
| `onPageChange` | `(page: number) => void`     | —       | Called with the newly selected page         |
| `siblingCount` | `number`                     | `1`     | Pages shown on each side of the current page |

Collapses long ranges with an ellipsis automatically.

### Badge

```tsx
<Badge variant="success">Active</Badge>
<Badge variant="error" size="sm">3</Badge>
```

| Prop      | Type                                                       | Default  | Description |
| --------- | ------------------------------------------------------------ | -------- | ------------ |
| `variant` | `'primary' \| 'gray' \| 'success' \| 'error' \| 'warning'`   | `'gray'` | Color        |
| `size`    | `'sm' \| 'md'`                                                | `'md'`   | Size         |

### Avatar

```tsx
<Avatar name="Ada Lovelace" src="/ada.jpg" />
<Avatar name="Grace Hopper" size="lg" />
```

| Prop   | Type                       | Default | Description                                    |
| ------ | ---------------------------- | ------- | ------------------------------------------------ |
| `src`  | `string`                     | —       | Image source                                     |
| `name` | `string`                     | —       | Used to derive fallback initials (e.g. "Ada Lovelace" → "AL") |
| `size` | `'sm' \| 'md' \| 'lg'`         | `'md'`  | Size                                             |

Falls back to initials automatically if `src` is missing or the image fails to load.

### Spinner

```tsx
<Spinner size="sm" />
```

| Prop   | Type                       | Default | Description |
| ------ | ---------------------------- | ------- | ------------ |
| `size` | `'sm' \| 'md' \| 'lg'`         | `'md'`  | Size         |

A standalone loading indicator (separate from `Button`'s built-in `isLoading` spinner). Announces itself via `role="status"`.

### Skeleton

```tsx
<Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="text" />
```

| Prop      | Type                                      | Default  | Description        |
| --------- | -------------------------------------------- | -------- | -------------------- |
| `variant` | `'text' \| 'circular' \| 'rectangular'`       | `'text'` | Placeholder shape    |
| `width`   | `number \| string`                            | —        | Override width        |
| `height`  | `number \| string`                            | —        | Override height       |

### Progress

```tsx
<Progress value={40} />
```

| Prop    | Type             | Default | Description       |
| ------- | ------------------ | ------- | -------------------- |
| `value` | `number`           | —       | Current value        |
| `max`   | `number`           | `100`   | Maximum value         |
| `size`  | `'sm' \| 'md'`      | `'md'`  | Track thickness       |

### Divider

```tsx
<Divider />
<Divider label="OR" />
<Divider orientation="vertical" />
```

| Prop          | Type                              | Default        | Description                          |
| ------------- | ------------------------------------ | -------------- | --------------------------------------- |
| `orientation` | `'horizontal' \| 'vertical'`          | `'horizontal'` | Direction of the rule                   |
| `label`       | `ReactNode`                           | —              | Optional centered label (horizontal only) |

### Alert

```tsx
<Alert variant="success" title="Saved">Your changes were saved.</Alert>
<Alert variant="error" onDismiss={() => setVisible(false)}>Something went wrong.</Alert>
```

| Prop        | Type                                              | Default  | Description                                    |
| ----------- | --------------------------------------------------- | -------- | ------------------------------------------------ |
| `variant`   | `'info' \| 'success' \| 'error' \| 'warning'`       | `'info'` | Color and icon                                   |
| `title`     | `string`                                            | —        | Optional bold heading                            |
| `onDismiss` | `() => void`                                        | —        | Shows a dismiss button that calls this when clicked |

An inline, persistent callout — unlike `Toast` (transient, portal-rendered), `Alert` renders in place and stays until removed. Uses `role="alert"` for error/warning so screen readers announce it immediately, `role="status"` otherwise.

## Design Tokens

`primary` is this project's own brand color — `#0F453C`, a deep teal-green — generated into a full 50–950 scale anchored exactly at the 600 step (the step used for solid fills like the primary `Button`), so the brand hex renders pixel-for-pixel where it matters most. `success`/`error`/`warning`/`gray` are sourced from Tailwind CSS's default palette (`emerald`/`red`/`amber`/`gray`), so those scales are familiar and battle-tested — no Tailwind dependency required to use any of them.

Import tokens directly to build custom components or styles:

```ts
import { colors, spacing, typography, shadows, radius } from 'rakibulism-ui/tokens';

const customStyle = {
  color: colors.primary[600],           // #0F453C
  padding: spacing[4],                  // 16px
  fontSize: typography.fontSize.base,   // 16px
  boxShadow: shadows.md,
  borderRadius: radius.lg,              // 12px
};
```

| Token        | Examples                                                        |
| ------------ | --------------------------------------------------------------- |
| `colors`     | `primary` (brand), `gray`, `success`, `error`, `warning` (each 50–950), plus `white`, `black` |
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
import 'rakibulism-ui/styles';
```

Because every component reads these CSS variables (with sensible hardcoded fallbacks), overriding a variable re-themes the whole library:

```css
:root {
  --color-primary-600: #7c3aed; /* buttons are now purple */
}
```

### Dark mode

The global stylesheet ships a complete dark theme. Add `data-theme="dark"` to `<html>`, `<body>`, or **any container** — CSS variables cascade, so everything inside it re-themes:

```html
<html data-theme="dark">
  <!-- every component renders dark -->
</html>

<div data-theme="dark">
  <!-- or scope it: only this subtree is dark -->
</div>
```

Surfaces, grays, and color tints flip automatically; brand shades (300–600) keep their values so buttons, focus rings, and icons stay on-brand. Requires the `rakibulism-ui/styles` import. To follow the OS preference, toggle the attribute from a `prefers-color-scheme` media query listener in your app.

### A note on auto-injected CSS in CommonJS

The CJS build (`require()`) auto-injects component styles the same way the ESM build does, via a `require('./assets/...css')` at the top of the bundle. This works wherever a bundler or test runner handles `.css` requires — which is the default in Jest/CRA/Next.js setups, since those already mock CSS imports for your own app's stylesheets. It will fail if you `require()` the package directly in plain Node with no CSS handling at all (rare for a UI library, but possible in custom test runners or scripts) — in that case, mock `.css` requires the same way your own styles are handled, e.g. `moduleNameMapper: { '\\.css$': 'identity-obj-proxy' }` in Jest.

## TypeScript

Every component and token ships with types. Component prop types are exported for reuse:

```ts
import type { ButtonProps, InputProps, CardProps } from 'rakibulism-ui';
```

## Development

```bash
npm install        # install dependencies
npm run dev        # start Vite in dev mode
npm run type-check # tsc --noEmit
npm test           # run the Vitest suite once
npm run test:watch # run tests in watch mode
npm run build      # build ESM + CJS + types into dist/
npm run site:dev   # run the showcase site locally
```

CI runs type-check, tests, the library build, and the site build on every pull request and push to `main`. Publishing (`prepublishOnly`) also runs the full suite.

## Contributing

Contributions are welcome — see [CONTRIBUTING.md](./CONTRIBUTING.md) for setup, component conventions, and the PR flow. Release history lives in the [CHANGELOG](./CHANGELOG.md). Everyone participating is expected to follow the [Code of Conduct](./CODE_OF_CONDUCT.md). Found a security issue? See [SECURITY.md](./SECURITY.md) instead of opening a public issue.

## License

[MIT](./LICENSE) © Rakibul Islam