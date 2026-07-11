import { Menubar as MenubarPrimitive } from '@base-ui/react/menubar';
import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import menuStyles from '../Menu/Menu.module.css';
import styles from './Menubar.module.css';

export interface MenubarMenu {
  /** Rendered as the top-level trigger label. */
  label: string;
  /** `MenuItem` elements (re-exported from `Menu`), shown when this menu opens. */
  items: ReactNode;
}

export interface MenubarProps {
  menus: MenubarMenu[];
  className?: string;
}

/**
 * A horizontal row of menus (e.g. a desktop-app-style File/Edit/View bar),
 * where arrow keys move focus between top-level menus and opening one
 * closes any other that was open. Wraps Base UI `Menubar`, reusing the
 * same popup/item styling as `Menu` for each menu's contents.
 */
export function Menubar({ menus, className }: MenubarProps) {
  return (
    <MenubarPrimitive className={clsx(styles.menubar, className)}>
      {menus.map((menu) => (
        <MenuPrimitive.Root key={menu.label}>
          <MenuPrimitive.Trigger className={styles.trigger}>{menu.label}</MenuPrimitive.Trigger>
          <MenuPrimitive.Portal>
            <MenuPrimitive.Positioner align="start" sideOffset={4}>
              <MenuPrimitive.Popup className={menuStyles.menu}>{menu.items}</MenuPrimitive.Popup>
            </MenuPrimitive.Positioner>
          </MenuPrimitive.Portal>
        </MenuPrimitive.Root>
      ))}
    </MenubarPrimitive>
  );
}
