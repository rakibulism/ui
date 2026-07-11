import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './Drawer.module.css';

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps {
  /** Whether the drawer is visible. */
  isOpen: boolean;
  /** Called when the drawer requests to close (Escape, backdrop click, or the close button). */
  onClose: () => void;
  /** Optional title rendered in the header and used for `aria-labelledby`. */
  title?: string;
  /** Drawer body content. */
  children: ReactNode;
  /** Which edge the drawer slides in from. @default 'right' */
  side?: DrawerSide;
  className?: string;
}

const OPPOSITE_SIDE: Record<DrawerSide, 'left' | 'right' | 'up' | 'down'> = {
  left: 'left',
  right: 'right',
  top: 'up',
  bottom: 'down',
};

/**
 * A panel that slides in from an edge of the screen, portaled to
 * `document.body`. Closes on Escape and backdrop click, traps focus while
 * open, and renders nothing while `isOpen` is false. Wraps Base UI `Drawer`
 * internally, which adds swipe-to-dismiss on touch devices in the same
 * direction the panel entered from.
 */
export function Drawer({ isOpen, onClose, title, children, side = 'right', className }: DrawerProps) {
  return (
    <DrawerPrimitive.Root
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      swipeDirection={OPPOSITE_SIDE[side]}
    >
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Backdrop className={styles.backdrop} />
        <DrawerPrimitive.Viewport className={clsx(styles.viewport, styles[side])}>
          <DrawerPrimitive.Popup
            className={clsx(styles.panel, styles[side], className)}
            aria-label={title ? undefined : 'Drawer'}
          >
            {title && (
              <div className={styles.header}>
                <DrawerPrimitive.Title className={styles.title}>{title}</DrawerPrimitive.Title>
                <DrawerPrimitive.Close className={styles.closeButton} aria-label="Close">
                  <svg viewBox="0 0 20 20" fill="none" width="16" height="16" aria-hidden="true">
                    <path
                      d="M5 5l10 10M15 5L5 15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </DrawerPrimitive.Close>
              </div>
            )}
            <div className={styles.body}>{children}</div>
          </DrawerPrimitive.Popup>
        </DrawerPrimitive.Viewport>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  );
}
