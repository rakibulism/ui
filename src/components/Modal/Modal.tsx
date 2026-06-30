import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import styles from './Modal.module.css';

export interface ModalProps {
  /** Whether the modal is visible. */
  isOpen: boolean;
  /** Called when the modal requests to close (Escape, backdrop click, or the close button). */
  onClose: () => void;
  /** Optional title rendered in the header and used for `aria-labelledby`. */
  title?: string;
  /** Modal body content. */
  children: React.ReactNode;
  /** Closes the modal on backdrop click. @default true */
  closeOnBackdropClick?: boolean;
  className?: string;
}

/**
 * A dialog rendered into a portal at `document.body`. Closes on Escape and
 * (by default) backdrop click, traps body scroll while open, and renders
 * nothing while `isOpen` is false.
 */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  closeOnBackdropClick = true,
  className,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);
    panelRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (closeOnBackdropClick && event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        className={clsx(styles.panel, className)}
      >
        {title && (
          <div className={styles.header}>
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close"
            >
              <svg viewBox="0 0 20 20" fill="none" width="16" height="16" aria-hidden="true">
                <path
                  d="M5 5l10 10M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        )}
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
