import { OTPField as OTPFieldPrimitive } from '@base-ui/react/otp-field';
import { useId } from 'react';
import clsx from 'clsx';
import styles from './OtpField.module.css';

export interface OtpFieldProps {
  /** Optional label rendered above the field. */
  label?: string;
  /** Number of character slots. @default 6 */
  length?: number;
  /** Current OTP value (controlled). */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  /** Called with the full OTP string on every change. */
  onChange?: (value: string) => void;
  /** Masks entered characters like a password field. @default false */
  mask?: boolean;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
}

/**
 * A row of single-character inputs for entering a one-time passcode.
 * Supports paste-to-fill-all-slots and arrow-key navigation between slots.
 * Wraps Base UI `OTPField`, which owns per-slot focus management and value
 * normalization that a row of independent `<input>`s would otherwise have
 * to reimplement.
 */
export function OtpField({
  label,
  length = 6,
  value,
  defaultValue,
  onChange,
  mask = false,
  disabled,
  name,
  id,
  className,
}: OtpFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={clsx(styles.wrapper, className)}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <OTPFieldPrimitive.Root
        id={inputId}
        length={length}
        value={value}
        defaultValue={defaultValue}
        onValueChange={(next) => onChange?.(next)}
        mask={mask}
        disabled={disabled}
        name={name}
        className={styles.root}
      >
        {Array.from({ length }, (_, index) => (
          <OTPFieldPrimitive.Input key={index} className={styles.slot} />
        ))}
      </OTPFieldPrimitive.Root>
    </div>
  );
}
