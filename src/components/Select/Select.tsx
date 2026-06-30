import { forwardRef, useId } from 'react';
import clsx from 'clsx';
import styles from './Select.module.css';

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Optional label rendered above the select. */
  label?: string;
  /** Error message rendered below the select; also styles the field red. */
  error?: string;
  /** Helper text rendered below the select when there is no error. */
  helperText?: string;
}

/**
 * A styled native `<select>` — pass `<option>` elements as children as
 * usual. Keeping it native preserves keyboard navigation, screen reader
 * support, and the platform's mobile picker UI.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    { label, error, helperText, className, id, disabled, children, ...rest },
    ref,
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const messageId = `${inputId}-message`;
    const hasError = Boolean(error);
    const message = error ?? helperText;

    return (
      <div className={clsx(styles.wrapper, className)}>
        {label && (
          <label className={styles.label} htmlFor={inputId}>
            {label}
          </label>
        )}
        <div className={styles.control}>
          <select
            ref={ref}
            id={inputId}
            className={clsx(styles.select, hasError && styles.hasError)}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={message ? messageId : undefined}
            {...rest}
          >
            {children}
          </select>
          <svg
            className={styles.chevron}
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5.5 7.5L10 12l4.5-4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
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
