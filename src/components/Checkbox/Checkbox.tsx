import { forwardRef, useContext, useId } from 'react';
import clsx from 'clsx';
import { CheckboxGroupContext } from '../CheckboxGroup/CheckboxGroup';
import styles from './Checkbox.module.css';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label rendered next to the checkbox. */
  label?: string;
  /** Error message rendered below; also styles the checkbox red. */
  error?: string;
  /** Helper text rendered below when there is no error. */
  helperText?: string;
  /** Value this checkbox represents within an ancestor CheckboxGroup. */
  value?: string;
}

/**
 * A checkbox backed by a native input (full keyboard/screen-reader support)
 * with brand color applied via `accent-color`. Forwards a ref to the input.
 * Reads `checked`/`onChange` from an ancestor `CheckboxGroup` when present
 * (matched via `value`); otherwise behaves like a plain controlled or
 * uncontrolled checkbox input.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { label, error, helperText, value, className, id, disabled, checked, onChange, ...rest },
    ref,
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const messageId = `${inputId}-message`;
    const hasError = Boolean(error);
    const message = error ?? helperText;
    const group = useContext(CheckboxGroupContext);

    const isChecked = group && value !== undefined ? group.value.includes(value) : checked;

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      if (group && value !== undefined) group.onChange(value);
      onChange?.(event);
    }

    return (
      <div className={clsx(styles.wrapper, className)}>
        <label
          className={clsx(styles.row, disabled && styles.disabled)}
          htmlFor={inputId}
        >
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className={clsx(styles.checkbox, hasError && styles.hasError)}
            disabled={disabled}
            checked={isChecked}
            onChange={handleChange}
            aria-invalid={hasError || undefined}
            aria-describedby={message ? messageId : undefined}
            {...rest}
          />
          {label && <span className={styles.label}>{label}</span>}
        </label>
        {message && (
          <span
            id={messageId}
            className={hasError ? styles.errorText : styles.helperText}
          >
            {message}
          </span>
        )}
      </div>
    );
  },
);
