import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group';
import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';
import styles from './ToggleGroup.module.css';

export interface ToggleGroupProps
  extends Omit<ComponentPropsWithoutRef<typeof ToggleGroupPrimitive>, 'onValueChange' | 'onChange'> {
  /** Called with the array of currently-pressed values. */
  onChange?: (value: string[]) => void;
}

/**
 * Coordinates a shared pressed-state across a row of `Toggle` buttons —
 * single-select by default (pressing one un-presses the others), or
 * `multiple` for independent toggles. Wraps Base UI `ToggleGroup`
 * internally — adds roving-tabindex arrow-key navigation between the
 * toggles. Renamed Base UI's `onValueChange` to `onChange` to match this
 * library's other grouped components (`Accordion`, `Tabs`, `RadioGroup`).
 */
export function ToggleGroup({ onChange, className, ...rest }: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive
      onValueChange={(value) => onChange?.(value)}
      className={clsx(styles.group, className)}
      {...rest}
    />
  );
}
