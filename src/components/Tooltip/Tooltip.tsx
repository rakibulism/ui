import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';
import clsx from 'clsx';
import { cloneElement, useId, type ReactElement, type ReactNode } from 'react';
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
 * Wraps Base UI `Tooltip` internally — the previous version had no JS state
 * at all (pure CSS `:hover`/`:focus-within` show/hide, always mounted),
 * so this adds a real open/close state machine: portaled rendering (no
 * longer clippable by `overflow: hidden` ancestors), Escape-to-dismiss,
 * and a short hover-intent delay before showing. Unlike Radix, Base UI
 * doesn't automatically wire `aria-describedby` from the trigger to the
 * popup, so that's done by hand here.
 */
export function Tooltip({ content, placement = 'top', children, className }: TooltipProps) {
  const id = useId();
  const trigger = cloneElement(children, { 'aria-describedby': id });

  return (
    <TooltipPrimitive.Provider delay={200}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger render={trigger} />
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Positioner side={placement} sideOffset={6}>
            <TooltipPrimitive.Popup
              id={id}
              role="tooltip"
              className={clsx(styles.bubble, className)}
            >
              {content}
            </TooltipPrimitive.Popup>
          </TooltipPrimitive.Positioner>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
