import { forwardRef, useId } from 'react';
import clsx from 'clsx';
import styles from './Switch.module.css';

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label rendered next to the switch. */
  label?: string;
}

/**
 * A toggle switch backed by a native checkbox for full keyboard and screen
 * reader support; the track and thumb are purely visual.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  function Switch({ label, className, id, disabled, ...rest }, ref) {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <label
        className={clsx(styles.row, disabled && styles.disabled, className)}
        htmlFor={inputId}
      >
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          role="switch"
          className={styles.input}
          disabled={disabled}
          {...rest}
        />
        <span className={styles.track}>
          <span className={styles.thumb} />
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  },
);
