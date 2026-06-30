import clsx from 'clsx';
import styles from './Spinner.module.css';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default 'md' */
  size?: SpinnerSize;
}

/** A standalone loading spinner. Announces itself to screen readers via `role="status"`. */
export function Spinner({ size = 'md', className, ...rest }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={clsx(styles.spinner, styles[size], className)}
      {...rest}
    />
  );
}
