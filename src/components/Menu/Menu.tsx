import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';
import styles from './Menu.module.css';

export interface MenuProps {
  /** The trigger element — typically a `Button`. Receives `onClick` to toggle the menu. */
  trigger: ReactElement;
  /** `MenuItem` elements. */
  children: ReactNode;
  /** Alignment of the menu relative to the trigger. @default 'start' */
  align?: 'start' | 'end';
  className?: string;
}

/**
 * A click-triggered dropdown menu. Closes on outside click, Escape, or
 * selecting an item. Wraps Base UI `Menu` internally, which adds
 * arrow-key navigation between items and portals the menu (the previous
 * hand-rolled version had neither — items were only reachable by pointer,
 * and the menu could be clipped by `overflow: hidden` ancestors).
 */
export function Menu({ trigger, children, align = 'start', className }: MenuProps) {
  return (
    <MenuPrimitive.Root>
      <MenuPrimitive.Trigger render={trigger} />
      <MenuPrimitive.Portal>
        <MenuPrimitive.Positioner align={align} sideOffset={8}>
          <MenuPrimitive.Popup className={clsx(styles.menu, className)}>
            {children}
          </MenuPrimitive.Popup>
        </MenuPrimitive.Positioner>
      </MenuPrimitive.Portal>
    </MenuPrimitive.Root>
  );
}

export interface MenuItemProps extends ComponentPropsWithoutRef<typeof MenuPrimitive.Item> {
  /** Renders with destructive (red) styling for dangerous actions. */
  destructive?: boolean;
}

/**
 * A single actionable row inside a `Menu`. Renders as a Base UI menu item
 * (a `div[role="menuitem"]`, not a `<button>` — Base UI owns keyboard
 * activation and selection); `onClick` still fires as before.
 */
export function MenuItem({ destructive, className, ...rest }: MenuItemProps) {
  return (
    <MenuPrimitive.Item
      className={clsx(styles.item, destructive && styles.destructive, className)}
      {...rest}
    />
  );
}
