import { createContext } from 'react';
import clsx from 'clsx';
import styles from './CheckboxGroup.module.css';

export interface CheckboxGroupContextValue {
  value: string[];
  onChange: (value: string) => void;
}

export const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

export interface CheckboxGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Optional heading rendered above the group. */
  label?: string;
  /** Currently selected values (controlled). */
  value: string[];
  /** Called with the full updated array when a checkbox inside the group is toggled. */
  onChange: (value: string[]) => void;
}

/**
 * Groups Checkbox inputs under a shared selection array — each Checkbox only
 * needs a `value` and `label`, and toggling one adds/removes it from the
 * group's `value` array.
 */
export function CheckboxGroup({ label, value, onChange, className, children, ...rest }: CheckboxGroupProps) {
  function toggle(item: string) {
    onChange(value.includes(item) ? value.filter((v) => v !== item) : [...value, item]);
  }

  return (
    <CheckboxGroupContext.Provider value={{ value, onChange: toggle }}>
      <div role="group" aria-label={label} className={clsx(styles.group, className)} {...rest}>
        {label && <span className={styles.label}>{label}</span>}
        <div className={styles.items}>{children}</div>
      </div>
    </CheckboxGroupContext.Provider>
  );
}
