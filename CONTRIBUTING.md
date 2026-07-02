# Contributing to rakibulism-ui

Thanks for your interest in contributing! This guide covers the local setup, conventions, and PR flow.

## Setup

```bash
git clone https://github.com/rakibulism/ui.git
cd ui
npm install
```

Requires Node 20+ (CI runs Node 22).

## Scripts

| Command              | What it does                                    |
| -------------------- | ------------------------------------------------ |
| `npm test`           | Run the Vitest suite once                        |
| `npm run test:watch` | Run tests in watch mode                          |
| `npm run type-check` | `tsc --noEmit` over the whole project            |
| `npm run build`      | Build the library (ESM + CJS + types) to `dist/` |
| `npm run site:dev`   | Run the showcase site locally                    |
| `npm run site:build` | Build the showcase site to `site-dist/`          |

CI runs type-check, tests, and both builds on every PR — all four must pass to merge.

## Component conventions

Every component follows the same patterns; match them in new code:

- **One folder per component**: `src/components/<Name>/<Name>.tsx` + `<Name>.module.css`.
- **CSS Modules only** — no global class names, no CSS-in-JS, no Tailwind classes.
- **Token-driven styles**: use CSS variables with hardcoded fallbacks, e.g. `var(--color-primary-600, #2563eb)`. Never hardcode a color/spacing value without the variable. Token values come from Tailwind's default palette (see `src/tokens/`).
- **`forwardRef`** for components that wrap a single DOM element; spread `...rest` so all native attributes pass through.
- **`clsx`** for conditional classes.
- **Accessibility is not optional**: correct roles, `aria-*` wiring (labels, `aria-describedby`, `aria-expanded`, …), keyboard support, and a `prefers-reduced-motion` guard for any animation.
- **No new runtime dependencies.** The library ships with `clsx` only — positioning, portals, and state are handled with React and CSS.
- **Export from the barrel**: add the component and its prop types to `src/components/index.ts`.
- **Tests required**: add behavior tests in `src/components/__tests__/` (grouped by area). Test behavior and a11y contracts, not implementation details.
- **Document it**: add a prop table + example to the README, and a live demo to the showcase site (`site/src/App.tsx`).

## PR flow

1. Branch from `main` (`feat/…`, `fix/…`, or `docs/…`).
2. Make the change, keeping the checklist above in mind.
3. Ensure `npm run type-check && npm test && npm run build` pass locally.
4. Open a PR against `main` describing what changed, why, and how it was verified. CI must be green.
5. PRs are squash-merged.

## Release flow (maintainers)

Releases are tag-driven:

```bash
npm version minor        # or patch/major — bumps, commits, tags vX.Y.Z
git push --follow-tags
```

Pushing a `v*` tag triggers two workflows: publish to npm (`rakibulism-ui`, with provenance) and publish to GitHub Packages (`@rakibulism/ui`). `prepublishOnly` re-runs type-check + tests + build as a final gate. Update `CHANGELOG.md` in the same PR or release commit.

## Reporting bugs / requesting features

Use the [issue templates](https://github.com/rakibulism/ui/issues/new/choose). For bugs, a minimal reproduction (StackBlitz/CodeSandbox or a snippet) makes fixes dramatically faster.

## License

By contributing, you agree that your contributions are licensed under the [MIT License](./LICENSE).
