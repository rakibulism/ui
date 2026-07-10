import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
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
 * selecting an item. Wraps Radix `DropdownMenu` internally, which adds
 * arrow-key navigation between items and portals the menu (the previous
 * hand-rolled version had neither — items were only reachable by pointer,
 * and the menu could be clipped by `overflow: hidden` ancestors).
 */
export function Menu({ trigger, children, align = 'start', className }: MenuProps) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align={align}
          sideOffset={8}
          className={clsx(styles.menu, className)}
        >
          {children}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

export interface MenuItemProps extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  /** Renders with destructive (red) styling for dangerous actions. */
  destructive?: boolean;
}

/**
 * A single actionable row inside a `Menu`. Renders as a Radix menu item
 * (a `div[role="menuitem"]`, not a `<button>` — Radix owns keyboard
 * activation and selection); `onClick` still fires as before.
 */
export function MenuItem({ destructive, className, ...rest }: MenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      className={clsx(styles.item, destructive && styles.destructive, className)}
      {...rest}
    />
  );
}
