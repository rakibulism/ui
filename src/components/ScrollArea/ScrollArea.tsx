import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './ScrollArea.module.css';

export interface ScrollAreaProps {
  children: ReactNode;
  /** Fixed height of the viewport. @default 240 */
  height?: number | string;
  className?: string;
}

/**
 * A scrollable container with custom, always-consistently-styled
 * scrollbars (native scrollbars vary across OSes and can't be restyled
 * cross-browser). Wraps Base UI `ScrollArea`, which syncs the custom thumb
 * size/position to real scroll state instead of faking it.
 */
export function ScrollArea({ children, height = 240, className }: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root className={clsx(styles.root, className)} style={{ height }}>
      <ScrollAreaPrimitive.Viewport className={styles.viewport}>
        <ScrollAreaPrimitive.Content>{children}</ScrollAreaPrimitive.Content>
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar orientation="vertical" className={styles.scrollbar}>
        <ScrollAreaPrimitive.Thumb className={styles.thumb} />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Scrollbar orientation="horizontal" className={styles.scrollbar}>
        <ScrollAreaPrimitive.Thumb className={styles.thumb} />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Corner className={styles.corner} />
    </ScrollAreaPrimitive.Root>
  );
}
