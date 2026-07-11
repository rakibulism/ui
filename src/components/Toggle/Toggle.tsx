import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import styles from './Toggle.module.css';

export type ToggleSize = 'sm' | 'md' | 'lg';

export interface ToggleProps extends ComponentPropsWithoutRef<typeof TogglePrimitive> {
  /** @default 'md' */
  size?: ToggleSize;
}

/**
 * A two-state button that toggles between pressed and unpressed (e.g. a
 * "bold" button in a toolbar). Standalone by default; nest inside
 * `ToggleGroup` to coordinate several toggles as a single/multiple-select
 * group. Wraps Base UI `Toggle` internally — manages `aria-pressed` and,
 * when grouped, the shared pressed state automatically.
 */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  { size = 'md', className, ...rest },
  ref,
) {
  return (
    <TogglePrimitive
      ref={ref}
      data-slot="toggle"
      className={clsx(styles.toggle, styles[size], className)}
      {...rest}
    />
  );
});
