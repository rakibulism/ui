# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.6.4] - 2026-07-10

### Changed

- **Swapped Radix UI for Base UI** as the underlying primitive library for `Modal`, `Menu`, `Tooltip`, `Toast`, `Tabs`, `Accordion`, and `Select` — replaces 7 `@radix-ui/react-*` dependencies with a single `@base-ui/react` package (still externalized, not bundled). Public prop APIs are unchanged from the Radix-backed versions (the `Select` breaking changes from 0.6.3 — `onChange` receiving a value instead of a change event, `ref` pointing to the trigger button — carry over as-is, they're not new).
- `MenuItem` renders as a `div[role="menuitem"]`, same as before.
- `Toast`'s dismiss button is now `aria-hidden` while the toast stack isn't expanded/focused (a deliberate Base UI accessibility default, avoiding exposing a close control for a visually-stacked/obscured toast to assistive tech) — it's still clickable, just not exposed via `role`-based queries until the stack expands.

## [0.6.3] - 2026-07-10

### Changed

- **`Menu`, `Tooltip`, `Toast`, and `Select` now wrap Radix UI primitives internally** (`@radix-ui/react-dropdown-menu`, `@radix-ui/react-tooltip`, `@radix-ui/react-toast`, `@radix-ui/react-select`), completing the Radix migration started in 0.6.2. Added as regular `dependencies`, externalized in the build.
- **`Menu` and `Tooltip` gain real accessibility they lacked before**: `Menu` items are now keyboard-navigable with arrow keys and the menu is portaled (previously mouse-only and clippable by `overflow: hidden` ancestors); `Tooltip` previously had no JS state at all (pure CSS `:hover`/`:focus-within`) and now has a real open/close lifecycle with Escape-to-dismiss and a hover-intent delay.
- **`Toast` auto-dismiss now pauses on hover/focus** (previously a raw, unconditional `setTimeout`).
- **`MenuItem` now renders as a `div[role="menuitem"]`** (Radix's menu item element) instead of a `<button>`; `onClick` still fires as before.

### Breaking

- **`Select` now wraps Radix `Select` instead of a native `<select>`** — trading the platform's native mobile picker UI and plain `<option>` passthrough for a fully custom, consistently-styled listbox across browsers/OSes. `children` are still plain `<option>` elements (parsed internally), but:
  - `onChange` now receives the selected value directly (`(value: string) => void`), not a native change event — update `onChange={(e) => setX(e.target.value)}` to `onChange={setX}` (or `onChange={(value) => setX(value)}`).
  - The forwarded `ref` now points to the trigger `<button>`, not an `HTMLSelectElement`.
  - A new `placeholder` prop controls the trigger's empty-state text.

## [0.6.2] - 2026-07-10

### Changed

- **`Tabs`, `Accordion`, and `Modal` now wrap Radix UI primitives internally** (`@radix-ui/react-tabs`, `@radix-ui/react-accordion`, `@radix-ui/react-dialog`), added as regular `dependencies` and externalized in the build (not bundled) so consumers' own bundlers can dedupe/tree-shake them. Public prop APIs are unchanged.
- **`Modal` gains a real focus trap and focus restoration to the trigger on close** — the previous hand-rolled implementation only set initial focus and let Tab escape to the page behind the dialog.
- `Accordion` gains Up/Down/Home/End keyboard navigation between headers; `Tabs` gains Home/End on top of the existing arrow-key switching, plus `aria-controls`/`aria-labelledby` linking each tab to its panel.
- The `npx rakibulism-ui add` CLI now warns about the correct Radix package(s) to install for `Modal`/`Tabs`/`Accordion`, not just `clsx`.

## [0.6.1] - 2026-07-10

### Fixed

- **WCAG AA color contrast** — a full audit found several confirmed failures: `Button` `danger` variant (white text on `error-500`, ~3.76:1 — now `error-600`, ~4.83:1), placeholder text in `Input`/`Textarea` (`gray-400`, ~2.54:1), icons in `Accordion`/`Toast`/`Modal`/`Select` (`gray-400`, ~2.54:1), the `Breadcrumbs` separator glyph (`gray-300`, ~1.47:1), and `Toast`'s variant left-border indicators (`success-500`/`warning-500` below the 3:1 non-text threshold). Also fixed a **dark-mode-only regression**: `gray-300`, used for `Switch`'s off-state track and other borders, is remapped to a midtone in dark mode and dropped to ~1.94:1 against the dark surface.
- Introduced semantic color tokens (`--color-text-muted`, `--color-icon-default`, `--color-border-default`, `--color-border-strong`, `--color-indicator-{info,success,error,warning}`) in `rakibulism-ui/styles`, calibrated to hold AA contrast in both themes, replacing a recurring pattern of components hardcoding a borderline `gray-500` (~4.83:1, barely over the 4.5:1 minimum) directly.
- Added a contrast-ratio regression test (`src/tokens/__tests__/contrast.test.ts`) so a future token change can't silently reintroduce one of these failures.

## [0.5.0] - 2026-07-10

### Added

- **`npx rakibulism-ui` CLI** — shadcn-style scaffolding tool that copies component source (`.tsx` + CSS module) directly into a consumer project instead of depending on the published package. `init` writes a `rakibulism-ui.json` config and copies design tokens + `globals.css`; `add <component>` copies one or more self-contained component folders; `list` shows what's available. Ships via the package's `bin` field — no extra install needed beyond `npx`.

## [0.4.0] - 2026-07-10

### Added

- **Dark mode** — the global stylesheet now ships a complete dark theme, activated with `data-theme="dark"` on `<html>` or any container (CSS variables cascade, enabling scoped theming). Surfaces, grays, and color tints flip; brand shades 300-600 stay on-brand. New semantic `--color-surface` token backs component surfaces. Showcase site gained a scoped dark-mode demo.

### Changed

- README, npm description/keywords, and site hero copy refreshed to reflect the full 23-component catalog, improving npm discoverability.

## [0.3.0] - 2026-07-02

### Added

- **Alert** component — inline, persistent callout with `info` / `success` / `error` / `warning` variants, optional title, and optional dismiss button. Uses `role="alert"` for urgent variants and `role="status"` otherwise. ([#17])
- **Test suite** — 64 Vitest + Testing Library behavior tests covering all components: aria wiring, keyboard navigation, controlled/uncontrolled state, portals, timers, and fallbacks. ([#16])
- **CI workflow** — type-check, tests, library build, and site build run on every pull request and push to `main`. Publishing (`prepublishOnly`) also runs the full suite. ([#16])

### Changed

- GitHub Actions bumped to `checkout@v5` / `setup-node@v5` on Node 22, clearing deprecation warnings. ([#16])

## [0.2.0] - 2026-06-30

### Added

- **Tier 1 form components**: `Checkbox`, `Radio` + `RadioGroup`, `Switch`, `Textarea`, `Select`. ([#10])
- **Tier 2 overlay components**: `Tooltip`, `Modal`, `Toast` (+ `ToastProvider` / `useToast`), `Menu` + `MenuItem`. ([#11])
- **Tier 3 navigation components**: `Tabs` (+ `TabList` / `Tab` / `TabPanel`), `Accordion` + `AccordionItem`, `Breadcrumbs` + `BreadcrumbItem`, `Pagination`. ([#12])
- **Tier 4 feedback/display components**: `Badge`, `Avatar`, `Spinner`, `Skeleton`, `Progress`, `Divider`. ([#13])
- Showcase site demos for all Tier 1–4 components. ([#14])

### Changed

- Color tokens formalized as **Tailwind CSS's default palette** (`primary` = blue, `success` = emerald, `error` = red, `warning` = amber, `gray` = gray), expanded to the full 50–950 scale in both TypeScript tokens and CSS variables. No Tailwind dependency required. ([#9])
- Build toolchain upgraded to Vite 8 (Rolldown) with plugins bumped to compatible majors; `npm audit` down to 0 vulnerabilities. ([#2])

### Documentation

- Documented the CJS auto-injected CSS requirement (a CSS mock such as `identity-obj-proxy` is needed for raw `require()` in plain Node without a bundler). ([#15])

## [0.1.7] - 2026-06-29

### Added

- Showcase/documentation site (Vite + React) importing the real library components, deployed to Vercel at <https://ui-rakibulism.vercel.app>. ([#5], [#6])
- GitHub Packages publishing (`@rakibulism/ui`) alongside npm. Publish workflows run on `v*` tags.
- `homepage`, live-demo badge, and Deploy-with-Vercel button in the README. ([#8])

> Versions 0.1.1–0.1.6 were process/CI iterations while setting up tag-driven publishing; no library code changes.

## [0.1.0] - 2026-06-29

### Added

- Initial release as **`rakibulism-ui`** (unscoped; the `@rakibulism` npm scope was unavailable).
- Components: `Button` (4 variants × 3 sizes, loading/disabled), `Input` (label / error / helper text with full aria wiring), `Card` (elevated / outlined / filled).
- Design tokens: `colors`, `spacing`, `typography`, `shadows`, `radius` — exported as `as const` TypeScript objects with matching CSS variables in the optional global stylesheet (`rakibulism-ui/styles`).
- Dual ESM + CJS build with auto-generated type declarations; component CSS auto-injects.

[#2]: https://github.com/rakibulism/ui/pull/2
[#5]: https://github.com/rakibulism/ui/pull/5
[#6]: https://github.com/rakibulism/ui/pull/6
[#8]: https://github.com/rakibulism/ui/pull/8
[#9]: https://github.com/rakibulism/ui/pull/9
[#10]: https://github.com/rakibulism/ui/pull/10
[#11]: https://github.com/rakibulism/ui/pull/11
[#12]: https://github.com/rakibulism/ui/pull/12
[#13]: https://github.com/rakibulism/ui/pull/13
[#14]: https://github.com/rakibulism/ui/pull/14
[#15]: https://github.com/rakibulism/ui/pull/15
[#16]: https://github.com/rakibulism/ui/pull/16
[#17]: https://github.com/rakibulism/ui/pull/17
[Unreleased]: https://github.com/rakibulism/ui/compare/v0.6.4...HEAD
[0.6.4]: https://github.com/rakibulism/ui/compare/v0.6.3...v0.6.4
[0.6.3]: https://github.com/rakibulism/ui/compare/v0.6.2...v0.6.3
[0.6.2]: https://github.com/rakibulism/ui/compare/v0.6.1...v0.6.2
[0.6.1]: https://github.com/rakibulism/ui/compare/v0.5.0...v0.6.1
[0.5.0]: https://github.com/rakibulism/ui/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/rakibulism/ui/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/rakibulism/ui/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/rakibulism/ui/compare/v0.1.7...v0.2.0
[0.1.7]: https://github.com/rakibulism/ui/compare/v0.1.0...v0.1.7
[0.1.0]: https://github.com/rakibulism/ui/releases/tag/v0.1.0
