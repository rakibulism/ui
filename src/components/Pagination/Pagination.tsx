import clsx from 'clsx';
import styles from './Pagination.module.css';

export interface PaginationProps {
  /** Current page (1-indexed). */
  page: number;
  /** Total number of pages. */
  totalPages: number;
  /** Called with the newly selected page number. */
  onPageChange: (page: number) => void;
  /** Pages shown on each side of the current page. @default 1 */
  siblingCount?: number;
  className?: string;
}

type PageItem = number | 'ellipsis';

function getPageRange(page: number, totalPages: number, siblingCount: number): PageItem[] {
  const totalVisible = siblingCount * 2 + 5; // first + last + current + 2 possible ellipses
  if (totalPages <= totalVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, totalPages);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  const range: PageItem[] = [1];
  if (showLeftEllipsis) range.push('ellipsis');
  for (let p = Math.max(leftSibling, 2); p <= Math.min(rightSibling, totalPages - 1); p++) {
    range.push(p);
  }
  if (showRightEllipsis) range.push('ellipsis');
  if (totalPages > 1) range.push(totalPages);
  return range;
}

/** Page-number navigation with previous/next controls and ellipsis collapsing. */
export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps) {
  const range = getPageRange(page, totalPages, siblingCount);

  return (
    <nav aria-label="Pagination" className={clsx(styles.nav, className)}>
      <button
        type="button"
        className={styles.navButton}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        ‹
      </button>
      {range.map((item, index) =>
        item === 'ellipsis' ? (
          <span key={`ellipsis-${index}`} className={styles.ellipsis}>
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            className={clsx(styles.pageButton, item === page && styles.pageButtonActive)}
            aria-current={item === page ? 'page' : undefined}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        ),
      )}
      <button
        type="button"
        className={styles.navButton}
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  );
}
