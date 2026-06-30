import clsx from 'clsx';
import styles from './Progress.module.css';

export type ProgressSize = 'sm' | 'md';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current value. */
  value: number;
  /** Maximum value. @default 100 */
  max?: number;
  /** @default 'md' */
  size?: ProgressSize;
}

/** A linear progress bar. */
export function Progress({ value, max = 100, size = 'md', className, ...rest }: ProgressProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={clsx(styles.track, styles[size], className)}
      {...rest}
    >
      <div className={styles.bar} style={{ width: `${percent}%` }} />
    </div>
  );
}
