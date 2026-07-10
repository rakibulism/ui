import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import type { ReactElement, ReactNode } from 'react';
import styles from './Tooltip.module.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Tooltip text or content. */
  content: ReactNode;
  /** Where the tooltip renders relative to the trigger. @default 'top' */
  placement?: TooltipPlacement;
  /** A single focusable/hoverable element that triggers the tooltip. */
  children: ReactElement;
  className?: string;
}

/**
 * Wraps a single trigger element and shows a small label on hover/focus.
 * Wraps Radix `Tooltip` internally — the previous version had no JS state
 * at all (pure CSS `:hover`/`:focus-within` show/hide, always mounted),
 * so this adds a real open/close state machine: portaled rendering (no
 * longer clippable by `overflow: hidden` ancestors), Escape-to-dismiss,
 * and a short hover-intent delay before showing.
 */
export function Tooltip({ content, placement = 'top', children, className }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={placement}
            sideOffset={6}
            className={clsx(styles.bubble, className)}
          >
            {content}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
