import { NumberField as NumberFieldPrimitive } from '@base-ui/react/number-field';
import { useId } from 'react';
import clsx from 'clsx';
import styles from './NumberField.module.css';

export interface NumberFieldProps {
  /** Optional label rendered above the field. */
  label?: string;
  /** Raw numeric value (controlled). */
  value?: number | null;
  /** Uncontrolled initial value. */
  defaultValue?: number;
  /** Called with the new numeric value (or `null` if the field is cleared). */
  onChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
}

/**
 * A numeric input with increment/decrement stepper buttons, and keyboard
 * (arrow keys, Page Up/Down, Home/End), scroll-wheel, and pointer-scrub
 * support. Wraps Base UI `NumberField`, which clamps and formats the value
 * (`Intl.NumberFormat` under the hood) instead of relying on the native
 * `<input type="number">`, whose stepper UI and locale formatting vary
 * across browsers.
 */
export function NumberField({
  label,
  value,
  defaultValue,
  onChange,
  min,
  max,
  step,
  disabled,
  name,
  id,
  className,
}: NumberFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <NumberFieldPrimitive.Root
      id={inputId}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next) => onChange?.(next)}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      name={name}
      className={clsx(styles.root, className)}
    >
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <NumberFieldPrimitive.Group className={styles.group}>
        <NumberFieldPrimitive.Decrement className={styles.stepper} aria-label="Decrease">
          −
        </NumberFieldPrimitive.Decrement>
        <NumberFieldPrimitive.Input className={styles.input} />
        <NumberFieldPrimitive.Increment className={styles.stepper} aria-label="Increase">
          +
        </NumberFieldPrimitive.Increment>
      </NumberFieldPrimitive.Group>
    </NumberFieldPrimitive.Root>
  );
}
