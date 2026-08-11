import type { ComponentType } from 'react';

/**
 * The component catalog — the single data source behind the components
 * grid, the docs sidebar, each doc page, and ⌘K search.
 *
 * Currently empty: the component set is being rebuilt from the Figma
 * library on top of Base UI. Add an entry here as each component lands and
 * every one of those surfaces picks it up automatically.
 *
 * The previous 43-entry catalog (with its hand-built illustrations) is in
 * git at tag `v0.9.0` — `git show v0.9.0:site/src/catalog.tsx` — and is
 * worth copying illustration patterns from as components return.
 */
export interface CatalogEntry {
  id: string;
  name: string;
  description: string;
  keywords: string;
  /** Copied to the clipboard by the card's AI-copy button. */
  prompt: string;
  Illustration: ComponentType;
}

const UNSORTED_CATALOG: CatalogEntry[] = [];

export const CATALOG: CatalogEntry[] = [...UNSORTED_CATALOG].sort((a, b) =>
  a.name.localeCompare(b.name),
);
