import { Popover as PopoverPrimitive } from '@base-ui/react/popover';
import clsx from 'clsx';
import { useId, type ReactElement, type ReactNode } from 'react';
import styles from './Popover.module.css';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverProps {
  /** A single focusable trigger element (typically a `Button`). */
  children: ReactElement;
  /** Popover body content. */
  content: ReactNode;
  /** Optional heading, shown with a close button. */
  title?: string;
  /** @default 'bottom' */
  placement?: PopoverPlacement;
  /** Whether the popover is open (controlled). */
  open?: boolean;
  /** Initial open state (uncontrolled). @default false */
  defaultOpen?: boolean;
  /** Called when the open state changes. */
  onChange?: (open: boolean) => void;
  className?: string;
}

/**
 * A click-triggered floating panel for richer content than a `Tooltip` can
 * hold (forms, menus of information, previews) without the modal focus-trap
 * a `Modal` imposes. Wraps Base UI `Popover` internally — handles portaled
 * rendering, collision-aware positioning, and Escape/outside-click
 * dismissal.
 */
export function Popover({
  children,
  content,
  title,
  placement = 'bottom',
  open,
  defaultOpen = false,
  onChange,
  className,
}: PopoverProps) {
  const titleId = useId();

  return (
    <PopoverPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(next) => onChange?.(next)}
    >
      <PopoverPrimitive.Trigger render={children} />
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Positioner side={placement} sideOffset={8}>
          <PopoverPrimitive.Popup
            className={clsx(styles.popup, className)}
            aria-labelledby={title ? titleId : undefined}
          >
            {title && (
              <div className={styles.header}>
                <PopoverPrimitive.Title id={titleId} className={styles.title}>
                  {title}
                </PopoverPrimitive.Title>
                <PopoverPrimitive.Close className={styles.closeButton} aria-label="Close">
                  <svg viewBox="0 0 20 20" fill="none" width="14" height="14" aria-hidden="true">
                    <path
                      d="M5 5l10 10M15 5L5 15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </PopoverPrimitive.Close>
              </div>
            )}
            <div className={styles.body}>{content}</div>
          </PopoverPrimitive.Popup>
        </PopoverPrimitive.Positioner>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
