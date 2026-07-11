import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'rakibulism-ui';
import { CATALOG } from './catalog';
import { SearchIcon } from './layout';

interface ResultItem {
  key: string;
  label: string;
  description?: string;
  href: string;
}

const OVERVIEW_ITEMS: ResultItem[] = [
  { key: 'home', label: 'Home', description: 'The showcase site home page', href: '/' },
  { key: 'components', label: 'Components', description: 'Browse every component', href: '/components' },
  { key: 'docs', label: 'Docs', description: 'Read component documentation', href: '/docs' },
];

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);
  const navigate = useNavigate();

  // Reset on every open so the modal never reopens mid-search.
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setHighlight(0);
    }
  }, [isOpen]);

  const overviewResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return OVERVIEW_ITEMS;
    return OVERVIEW_ITEMS.filter((item) => `${item.label} ${item.description}`.toLowerCase().includes(q));
  }, [query]);

  const componentResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = !q
      ? CATALOG
      : CATALOG.filter((entry) =>
          `${entry.name} ${entry.description} ${entry.keywords}`.toLowerCase().includes(q),
        );
    return matches.map(
      (entry): ResultItem => ({
        key: entry.id,
        label: entry.name,
        description: entry.description,
        href: `/docs/components/${entry.id}`,
      }),
    );
  }, [query]);

  const flatResults = useMemo(
    () => [...overviewResults, ...componentResults],
    [overviewResults, componentResults],
  );

  useEffect(() => {
    setHighlight(0);
  }, [query]);

  function go(href: string) {
    navigate(href);
    onClose();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((i) => Math.min(i + 1, flatResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = flatResults[highlight];
      if (item) go(item.href);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="search-modal">
      <div className="search-modal-input-row">
        <span className="search-modal-icon">
          <SearchIcon />
        </span>
        <input
          type="text"
          className="search-modal-input"
          placeholder="Search components and docs…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          aria-label="Search"
        />
      </div>

      <div className="search-modal-results" role="listbox" aria-label="Search results">
        {flatResults.length === 0 ? (
          <p className="search-modal-empty">No results for &ldquo;{query}&rdquo;.</p>
        ) : (
          <>
            {overviewResults.length > 0 && (
              <div className="search-modal-group">
                <div className="search-modal-group-label">Overview</div>
                {overviewResults.map((item) => (
                  <SearchResultRow
                    key={item.key}
                    item={item}
                    highlighted={flatResults[highlight]?.key === item.key}
                    onClick={() => go(item.href)}
                  />
                ))}
              </div>
            )}
            {componentResults.length > 0 && (
              <div className="search-modal-group">
                <div className="search-modal-group-label">Components</div>
                {componentResults.map((item) => (
                  <SearchResultRow
                    key={item.key}
                    item={item}
                    highlighted={flatResults[highlight]?.key === item.key}
                    onClick={() => go(item.href)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
}

function SearchResultRow({
  item,
  highlighted,
  onClick,
}: {
  item: ResultItem;
  highlighted: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={highlighted}
      className={'search-modal-item' + (highlighted ? ' search-modal-item-highlighted' : '')}
      onClick={onClick}
    >
      <span className="search-modal-item-label">{item.label}</span>
      {item.description && <span className="search-modal-item-description">{item.description}</span>}
    </button>
  );
}
