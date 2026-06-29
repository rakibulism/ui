import { forwardRef, useId } from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional label rendered above the input. */
  label?: string;
  /** Error message rendered below the input; also styles the field red. */
  error?: string;
  /** Helper text rendered below the input when there is no error. */
  helperText?: string;
}

/**
 * A text input with an optional label, helper text, and error state.
 * Forwards all standard `<input>` attributes and a ref. Label and messages
 * are wired up with the correct `for`/`aria-describedby` associations.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, helperText, className, id, disabled, ...rest },
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
      <input
        ref={ref}
        id={inputId}
        className={clsx(styles.input, hasError && styles.hasError)}
        disabled={disabled}
        aria-invalid={hasError || undefined}
        aria-describedby={message ? messageId : undefined}
        {...rest}
      />
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
});
