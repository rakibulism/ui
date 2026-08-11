import { ComponentsGrid } from '../ComponentsGrid';
import { CATALOG } from '../catalog';

export function Components() {
  return (
    <main>
      <section className="header-section">
        <div className="header-text-and-description">
          <h1 className="header-title">Components</h1>
          <p className="header-description">
            {CATALOG.length === 0
              ? 'The component library is being rebuilt from Figma.'
              : `Every one of the ${CATALOG.length} components in rakibulism-ui, illustrated.`}
          </p>
        </div>
      </section>

      <ComponentsGrid />
    </main>
  );
}
