import { Toolbar as ToolbarPrimitive } from '@base-ui/react/toolbar';
import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './Toolbar.module.css';

export interface ToolbarProps {
  children: ReactNode;
  /** @default 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
  className?: string;
}

/**
 * A container for grouping related controls (buttons, links, inputs) with
 * roving-tabindex arrow-key navigation between them, so the whole toolbar
 * is a single Tab stop. Wraps Base UI `Toolbar`.
 */
export function Toolbar({ children, orientation = 'horizontal', disabled, className }: ToolbarProps) {
  return (
    <ToolbarPrimitive.Root
      orientation={orientation}
      disabled={disabled}
      className={clsx(styles.toolbar, className)}
    >
      {children}
    </ToolbarPrimitive.Root>
  );
}

export function ToolbarGroup({
  className,
  ...rest
}: ComponentPropsWithoutRef<typeof ToolbarPrimitive.Group>) {
  return <ToolbarPrimitive.Group className={clsx(styles.group, className)} {...rest} />;
}

export function ToolbarButton({
  className,
  ...rest
}: ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button>) {
  return <ToolbarPrimitive.Button className={clsx(styles.button, className)} {...rest} />;
}

export function ToolbarSeparator({
  className,
  ...rest
}: ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>) {
  return <ToolbarPrimitive.Separator className={clsx(styles.separator, className)} {...rest} />;
}
