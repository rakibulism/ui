import { NavigationMenu as NavigationMenuPrimitive } from '@base-ui/react/navigation-menu';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './NavigationMenu.module.css';

export interface NavigationMenuItem {
  label: string;
  /** A plain link — mutually exclusive with `content`. */
  href?: string;
  /** A dropdown panel shown below the trigger — mutually exclusive with `href`. */
  content?: ReactNode;
}

export interface NavigationMenuProps {
  items: NavigationMenuItem[];
  className?: string;
}

/**
 * A horizontal site-navigation bar where items can be plain links or
 * hover/click-triggered dropdown panels, with a shared animated viewport
 * that resizes and cross-fades between panels. Wraps Base UI
 * `NavigationMenu`.
 */
export function NavigationMenu({ items, className }: NavigationMenuProps) {
  return (
    <NavigationMenuPrimitive.Root className={clsx(styles.root, className)}>
      <NavigationMenuPrimitive.List className={styles.list}>
        {items.map((item) =>
          item.content ? (
            <NavigationMenuPrimitive.Item key={item.label}>
              <NavigationMenuPrimitive.Trigger className={styles.trigger}>
                {item.label}
              </NavigationMenuPrimitive.Trigger>
              <NavigationMenuPrimitive.Content className={styles.content}>
                {item.content}
              </NavigationMenuPrimitive.Content>
            </NavigationMenuPrimitive.Item>
          ) : (
            <NavigationMenuPrimitive.Item key={item.label}>
              <NavigationMenuPrimitive.Link href={item.href} className={styles.link}>
                {item.label}
              </NavigationMenuPrimitive.Link>
            </NavigationMenuPrimitive.Item>
          ),
        )}
      </NavigationMenuPrimitive.List>
      <NavigationMenuPrimitive.Portal>
        <NavigationMenuPrimitive.Positioner className={styles.positioner} sideOffset={8}>
          <NavigationMenuPrimitive.Popup className={styles.popup}>
            <NavigationMenuPrimitive.Viewport className={styles.viewport} />
          </NavigationMenuPrimitive.Popup>
        </NavigationMenuPrimitive.Positioner>
      </NavigationMenuPrimitive.Portal>
    </NavigationMenuPrimitive.Root>
  );
}
