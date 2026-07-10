# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
[Unreleased]: https://github.com/rakibulism/ui/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/rakibulism/ui/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/rakibulism/ui/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/rakibulism/ui/compare/v0.1.7...v0.2.0
[0.1.7]: https://github.com/rakibulism/ui/compare/v0.1.0...v0.1.7
[0.1.0]: https://github.com/rakibulism/ui/releases/tag/v0.1.0
