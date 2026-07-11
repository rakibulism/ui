import { ContextMenu as ContextMenuPrimitive } from '@base-ui/react/context-menu';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import menuStyles from '../Menu/Menu.module.css';
import styles from './ContextMenu.module.css';

export interface ContextMenuProps {
  /** The area that opens the menu on right click or long press. */
  children: ReactNode;
  /** `MenuItem` elements (re-exported from `Menu`), shown at the pointer position. */
  items: ReactNode;
  className?: string;
}

/**
 * Opens a menu at the pointer position on right click (or long press on
 * touch), instead of a fixed trigger element. Reuses the same popup/item
 * styling as `Menu` — pass `MenuItem` children as `items`. Wraps Base UI
 * `ContextMenu`.
 */
export function ContextMenu({ children, items, className }: ContextMenuProps) {
  return (
    <ContextMenuPrimitive.Root>
      <ContextMenuPrimitive.Trigger className={clsx(styles.trigger, className)}>
        {children}
      </ContextMenuPrimitive.Trigger>
      <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.Positioner>
          <ContextMenuPrimitive.Popup className={menuStyles.menu}>{items}</ContextMenuPrimitive.Popup>
        </ContextMenuPrimitive.Positioner>
      </ContextMenuPrimitive.Portal>
    </ContextMenuPrimitive.Root>
  );
}
