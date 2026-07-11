import { Meter as MeterPrimitive } from '@base-ui/react/meter';
import clsx from 'clsx';
import styles from './Meter.module.css';

export type MeterSize = 'sm' | 'md';

export interface MeterProps {
  /** The current value. */
  value: number;
  /** @default 0 */
  min?: number;
  /** @default 100 */
  max?: number;
  /** Accessible label, also shown above the track alongside the formatted value. */
  label?: string;
  /** @default 'md' */
  size?: MeterSize;
  className?: string;
}

/**
 * Visualizes a value within a known range (e.g. disk usage, a rating) —
 * unlike `Progress`, which represents completion of a task over time, a
 * meter's value can move in either direction and isn't tied to a
 * loading/finishing narrative. Wraps Base UI `Meter` internally, which
 * computes the fill percentage and exposes it to screen readers.
 */
export function Meter({ value, min = 0, max = 100, label, size = 'md', className }: MeterProps) {
  return (
    <MeterPrimitive.Root value={value} min={min} max={max} className={clsx(styles.meter, className)}>
      {label && (
        <div className={styles.labelRow}>
          <MeterPrimitive.Label className={styles.label}>{label}</MeterPrimitive.Label>
          <MeterPrimitive.Value className={styles.value} />
        </div>
      )}
      <MeterPrimitive.Track className={clsx(styles.track, styles[size])}>
        <MeterPrimitive.Indicator className={styles.indicator} />
      </MeterPrimitive.Track>
    </MeterPrimitive.Root>
  );
}
