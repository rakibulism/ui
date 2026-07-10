import * as TabsPrimitive from '@radix-ui/react-tabs';
import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './Tabs.module.css';

export interface TabsProps {
  /** Currently active tab value (controlled). */
  value?: string;
  /** Initial active tab value (uncontrolled). */
  defaultValue?: string;
  /** Called when the active tab changes. */
  onChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

/**
 * Groups `TabList`/`Tab`/`TabPanel` under shared selection state. Works
 * controlled (pass `value` + `onChange`) or uncontrolled (`defaultValue`).
 * Wraps Radix `Tabs` internally — arrow-key navigation (with Home/End),
 * roving tabindex, and `aria-controls`/`aria-labelledby` linking between
 * tabs and panels are handled by Radix.
 */
export function Tabs({ value, defaultValue, onChange, children, className }: TabsProps) {
  return (
    <TabsPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onChange}
      className={clsx(styles.tabs, className)}
    >
      {children}
    </TabsPrimitive.Root>
  );
}

export function TabList({
  children,
  className,
  ...rest
}: ComponentPropsWithoutRef<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List className={clsx(styles.list, className)} {...rest}>
      {children}
    </TabsPrimitive.List>
  );
}

export interface TabProps extends Omit<ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>, 'value'> {
  /** Value this tab activates. */
  value: string;
}

export function Tab({ value, className, ...rest }: TabProps) {
  return (
    <TabsPrimitive.Trigger value={value} className={clsx(styles.tab, className)} {...rest} />
  );
}

export interface TabPanelProps
  extends Omit<ComponentPropsWithoutRef<typeof TabsPrimitive.Content>, 'value'> {
  /** Value this panel corresponds to; only rendered when active. */
  value: string;
}

export function TabPanel({ value, children, className, ...rest }: TabPanelProps) {
  return (
    <TabsPrimitive.Content value={value} className={clsx(styles.panel, className)} {...rest}>
      {children}
    </TabsPrimitive.Content>
  );
}
