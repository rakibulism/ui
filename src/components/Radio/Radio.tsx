import { createContext, forwardRef, useContext, useId } from 'react';
import clsx from 'clsx';
import styles from './Radio.module.css';

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Shared `name` attribute applied to every Radio inside the group. */
  name: string;
  /** Currently selected value (controlled). */
  value?: string;
  /** Called with the newly selected value. */
  onChange?: (value: string) => void;
}

/**
 * Groups Radio buttons under a shared name and selection state, so each
 * Radio only needs a `value` and `label`.
 */
export function RadioGroup({
  name,
  value,
  onChange,
  className,
  children,
  ...rest
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ name, value, onChange }}>
      <div role="radiogroup" className={clsx(styles.group, className)} {...rest}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> {
  /** Value this radio represents within its RadioGroup. */
  value: string;
  /** Label rendered next to the radio. */
  label?: string;
}

/**
 * A single radio input. Reads `name` / `checked` / `onChange` from an
 * ancestor RadioGroup when present; otherwise behaves like a plain
 * controlled or uncontrolled radio input.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { value, label, className, id, disabled, checked, onChange, name, ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const group = useContext(RadioGroupContext);

  const isChecked = group ? group.value === value : checked;
  const resolvedName = group ? group.name : name;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    group?.onChange?.(value);
    onChange?.(event);
  }

  return (
    <label
      className={clsx(styles.row, disabled && styles.disabled, className)}
      htmlFor={inputId}
    >
      <input
        ref={ref}
        id={inputId}
        type="radio"
        name={resolvedName}
        value={value}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        className={styles.radio}
        {...rest}
      />
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
});
