import { CATALOG } from '../catalog';

export function DocsIndex() {
  return (
    <div className="docs-page">
      <h1 className="docs-title">Documentation</h1>
      <p className="docs-lead">
        Pick a component from the sidebar to see its live demo, description, and usage snippet — or
        jump straight there with the search (⌘K).
      </p>
      <p className="docs-lead">{CATALOG.length} components are documented so far.</p>
    </div>
  );
}
