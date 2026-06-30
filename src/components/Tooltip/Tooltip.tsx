import { cloneElement, useId, type ReactElement } from 'react';
import clsx from 'clsx';
import styles from './Tooltip.module.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Tooltip text or content. */
  content: React.ReactNode;
  /** Where the tooltip renders relative to the trigger. @default 'top' */
  placement?: TooltipPlacement;
  /** A single focusable/hoverable element that triggers the tooltip. */
  children: ReactElement;
  className?: string;
}

/**
 * Wraps a single trigger element and shows a small label on hover/focus.
 * Pure CSS show/hide — no positioning library — so placement is relative to
 * the trigger via the chosen `placement`, not measured at runtime.
 */
export function Tooltip({
  content,
  placement = 'top',
  children,
  className,
}: TooltipProps) {
  const id = useId();
  const trigger = cloneElement(children, { 'aria-describedby': id });

  return (
    <span className={clsx(styles.wrapper, className)}>
      {trigger}
      <span
        role="tooltip"
        id={id}
        className={clsx(styles.bubble, styles[placement])}
      >
        {content}
      </span>
    </span>
  );
}
