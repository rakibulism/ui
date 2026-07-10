import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './Modal.module.css';

export interface ModalProps {
  /** Whether the modal is visible. */
  isOpen: boolean;
  /** Called when the modal requests to close (Escape, backdrop click, or the close button). */
  onClose: () => void;
  /** Optional title rendered in the header and used for `aria-labelledby`. */
  title?: string;
  /** Modal body content. */
  children: ReactNode;
  /** Closes the modal on backdrop click. @default true */
  closeOnBackdropClick?: boolean;
  className?: string;
}

/**
 * A dialog rendered into a portal at `document.body`. Closes on Escape and
 * (by default) backdrop click, traps body scroll while open, and renders
 * nothing while `isOpen` is false. Wraps Radix `Dialog` internally, which
 * adds the focus trap (Tab no longer escapes to the page behind it) and
 * focus restoration to the trigger on close that a hand-rolled version
 * lacked.
 */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  closeOnBackdropClick = true,
  className,
}: ModalProps) {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={styles.backdrop} />
        <DialogPrimitive.Content
          className={clsx(styles.panel, className)}
          aria-modal="true"
          aria-label={title ? undefined : 'Dialog'}
          onPointerDownOutside={(event) => {
            if (!closeOnBackdropClick) event.preventDefault();
          }}
        >
          {title && (
            <div className={styles.header}>
              <DialogPrimitive.Title className={styles.title}>{title}</DialogPrimitive.Title>
              <DialogPrimitive.Close asChild>
                <button type="button" className={styles.closeButton} aria-label="Close">
                  <svg viewBox="0 0 20 20" fill="none" width="16" height="16" aria-hidden="true">
                    <path
                      d="M5 5l10 10M15 5L5 15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </DialogPrimitive.Close>
            </div>
          )}
          <div className={styles.body}>{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
