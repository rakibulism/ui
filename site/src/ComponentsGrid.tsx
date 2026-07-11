import { Link } from 'react-router-dom';
import { Tooltip, useToast } from 'rakibulism-ui';
import { CATALOG, type CatalogEntry } from './catalog';

// RemixIcon (github.com/Remix-Design/RemixIcon, MIT) — sparkling-2-line and
// file-copy-line, used as CSS mask-images so the AI-copy button can paint a
// gradient directly onto the icon's vector shape (see .ai-copy-icon).
const SPARKLING_PATH =
  'M17.0007 1.20825 18.3195 3.68108 20.7923 4.99992 18.3195 6.31876 17.0007 8.79159 15.6818 6.31876 13.209 4.99992 15.6818 3.68108 17.0007 1.20825ZM10.6673 9.33325 15.6673 11.9999 10.6673 14.6666 8.00065 19.6666 5.33398 14.6666.333984 11.9999 5.33398 9.33325 8.00065 4.33325 10.6673 9.33325ZM11.4173 11.9999 9.18905 10.8115 8.00065 8.58325 6.81224 10.8115 4.58398 11.9999 6.81224 13.1883 8.00065 15.4166 9.18905 13.1883 11.4173 11.9999ZM19.6673 16.3333 18.0007 13.2083 16.334 16.3333 13.209 17.9999 16.334 19.6666 18.0007 22.7916 19.6673 19.6666 22.7923 17.9999 19.6673 16.3333Z';

const FILE_COPY_PATH =
  'M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z';

/** Encodes an icon path as a `mask-image: url(...)` data URI. */
function iconMaskUrl(path: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${path}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function AiCopyButton({ prompt, label }: { prompt: string; label: string }) {
  const { show } = useToast();

  async function handleCopy(e: React.MouseEvent) {
    // The button sits inside a card that's otherwise a single stretched
    // link to the doc page — stop the click from also triggering that.
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      /* clipboard unavailable — no-op */
    }
    show({
      title: 'Copied to clipboard',
      description: `Paste this into your AI agent to build the ${label} component.`,
      variant: 'success',
    });
  }

  return (
    <Tooltip
      content="Click to copy the prompt — paste it into your AI agent to quickly get this component."
      placement="top"
    >
      <button
        type="button"
        className="ai-copy-btn"
        onClick={handleCopy}
        aria-label={`Copy an AI prompt for the ${label} component`}
      >
        <span
          className="ai-copy-icon ai-copy-icon-sparkle"
          aria-hidden="true"
          style={{
            maskImage: iconMaskUrl(SPARKLING_PATH),
            WebkitMaskImage: iconMaskUrl(SPARKLING_PATH),
          }}
        />
        <span
          className="ai-copy-icon ai-copy-icon-copy"
          aria-hidden="true"
          style={{
            maskImage: iconMaskUrl(FILE_COPY_PATH),
            WebkitMaskImage: iconMaskUrl(FILE_COPY_PATH),
          }}
        />
      </button>
    </Tooltip>
  );
}

function GalleryCard({ entry }: { entry: CatalogEntry }) {
  const { id, name, description, prompt, Illustration } = entry;
  return (
    <article className="component-card-container">
      <Link
        to={`/docs/components/${id}`}
        className="card-link-overlay"
        aria-label={`View ${name} documentation`}
      />
      <div className="header">
        <div className="heading">
          <span className="metric-title">{name}</span>
          <span className="metric-description">{description}</span>
        </div>
        <AiCopyButton prompt={prompt} label={name} />
      </div>
      {/* `inert` freezes the illustration for pointer, keyboard, and
          assistive tech — it's a picture of the component, not a live demo;
          clicking anywhere on the card navigates via the overlay above. */}
      <div className="container" inert="">
        <Illustration />
      </div>
    </article>
  );
}

/** The grid of component illustration cards — every card links to its doc page. */
export function ComponentsGrid() {
  return (
    <section className="content-container" id="components">
      <div className="dashboard-container">
        {CATALOG.map((entry) => (
          <GalleryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  );
}
