import { Link, useParams } from 'react-router-dom';
import { CATALOG } from '../catalog';

export function ComponentDoc() {
  const { slug } = useParams<{ slug: string }>();
  const entry = CATALOG.find((e) => e.id === slug);

  if (!entry) {
    return (
      <div className="docs-page">
        <h1 className="docs-title">Not found</h1>
        <p className="docs-lead">
          No component matches &ldquo;{slug}&rdquo;. <Link to="/docs">Back to docs</Link>.
        </p>
      </div>
    );
  }

  const { name, description, Illustration } = entry;
  // The exported identifier has no spaces even when the display name does
  // (e.g. "Toggle Group" → ToggleGroup).
  const importName = name.replace(/\s+/g, '');

  return (
    <div className="docs-page">
      <h1 className="docs-title">{name}</h1>
      <p className="docs-lead">{description}</p>

      <div className="docs-demo">
        <Illustration />
      </div>

      <h2 className="docs-subheading">Usage</h2>
      <pre className="docs-code">
        <code>{`npm install rakibulism-ui`}</code>
      </pre>
      <pre className="docs-code">
        <code>{`import { ${importName} } from 'rakibulism-ui';`}</code>
      </pre>
    </div>
  );
}
