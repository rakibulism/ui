import { Slider as SliderPrimitive } from '@base-ui/react/slider';
import { useId } from 'react';
import clsx from 'clsx';
import styles from './Slider.module.css';

export interface SliderProps {
  /** Optional label rendered above the slider. */
  label?: string;
  /** Single value (controlled). For a range slider, pass a two-element array instead. */
  value?: number | readonly number[];
  /** Uncontrolled initial value. */
  defaultValue?: number | readonly number[];
  /** Called with the new value on every change. */
  onChange?: (value: number | number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  /** Shows the current numeric value next to the label. @default false */
  showValue?: boolean;
  name?: string;
  id?: string;
  className?: string;
}

/**
 * A draggable control for selecting a numeric value (or a range, given a
 * two-element `value`/`defaultValue` array) within `min`/`max`. Wraps Base
 * UI `Slider`, which owns keyboard stepping (arrow keys, Page Up/Down,
 * Home/End) and multi-thumb collision handling for ranges.
 */
export function Slider({
  label,
  value,
  defaultValue = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  showValue = false,
  name,
  id,
  className,
}: SliderProps) {
  const generatedId = useId();
  const sliderId = id ?? generatedId;
  const isRange = Array.isArray(value ?? defaultValue);

  return (
    <SliderPrimitive.Root
      id={sliderId}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next) => onChange?.(next as number | number[])}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      name={name}
      className={clsx(styles.root, className)}
    >
      {(label || showValue) && (
        <div className={styles.header}>
          {label && (
            <SliderPrimitive.Label className={styles.label}>{label}</SliderPrimitive.Label>
          )}
          {showValue && <SliderPrimitive.Value className={styles.value} />}
        </div>
      )}
      <SliderPrimitive.Control className={styles.control}>
        <SliderPrimitive.Track className={styles.track}>
          <SliderPrimitive.Indicator className={styles.indicator} />
          {isRange ? (
            <>
              <SliderPrimitive.Thumb index={0} className={styles.thumb} />
              <SliderPrimitive.Thumb index={1} className={styles.thumb} />
            </>
          ) : (
            <SliderPrimitive.Thumb className={styles.thumb} />
          )}
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}
