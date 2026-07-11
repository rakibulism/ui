import { ComponentsGrid } from '../ComponentsGrid';

export function Home() {
  return (
    <main>
      <section className="header-section">
        <div className="header-text-and-description">
          <h1 className="header-title">Just imagine to build, tell to AI</h1>
          <p className="header-description">
            The design work is done. Fully built, accessible UI library — install &amp; start
            shipping. All that's left is your idea.
          </p>
        </div>
      </section>

      <ComponentsGrid />
    </main>
  );
}
