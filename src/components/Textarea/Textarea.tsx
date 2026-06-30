import { forwardRef, useId } from 'react';
import clsx from 'clsx';
import styles from './Textarea.module.css';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Optional label rendered above the textarea. */
  label?: string;
  /** Error message rendered below the textarea; also styles the field red. */
  error?: string;
  /** Helper text rendered below the textarea when there is no error. */
  helperText?: string;
}

/**
 * A multi-line text input with an optional label, helper text, and error
 * state. Forwards all standard `<textarea>` attributes and a ref.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
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
        <textarea
          ref={ref}
          id={inputId}
          className={clsx(styles.textarea, hasError && styles.hasError)}
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
  },
);
