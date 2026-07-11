import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './Collapsible.module.css';

export interface CollapsibleProps {
  /** Always-visible heading; click toggles the panel. */
  trigger: ReactNode;
  /** Panel content, shown/hidden as the trigger is toggled. */
  children: ReactNode;
  /** Whether the panel is open (controlled). */
  open?: boolean;
  /** Initial open state (uncontrolled). @default false */
  defaultOpen?: boolean;
  /** Called when the open state changes. */
  onChange?: (open: boolean) => void;
  /** Disables the trigger. @default false */
  disabled?: boolean;
  className?: string;
}

/**
 * A single expandable/collapsible panel with a clickable trigger. Unlike
 * `Accordion` (which coordinates multiple, usually mutually-exclusive
 * panels), this is a standalone show/hide toggle for one piece of content.
 * Wraps Base UI `Collapsible` internally — handles the open/close
 * animation and aria-expanded/aria-controls wiring between the trigger and
 * panel.
 */
export function Collapsible({
  trigger,
  children,
  open,
  defaultOpen = false,
  onChange,
  disabled = false,
  className,
}: CollapsibleProps) {
  return (
    <CollapsiblePrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(next) => onChange?.(next)}
      disabled={disabled}
      className={clsx(styles.collapsible, className)}
    >
      <CollapsiblePrimitive.Trigger className={styles.trigger}>
        <span>{trigger}</span>
        <svg
          className={styles.chevron}
          viewBox="0 0 20 20"
          fill="none"
          width="16"
          height="16"
          aria-hidden="true"
        >
          <path
            d="M5.5 7.5L10 12l4.5-4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </CollapsiblePrimitive.Trigger>
      <CollapsiblePrimitive.Panel className={styles.panel}>{children}</CollapsiblePrimitive.Panel>
    </CollapsiblePrimitive.Root>
  );
}
