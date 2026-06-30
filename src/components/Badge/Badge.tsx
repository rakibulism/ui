import clsx from 'clsx';
import styles from './Badge.module.css';

export type BadgeVariant = 'primary' | 'gray' | 'success' | 'error' | 'warning';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default 'gray' */
  variant?: BadgeVariant;
  /** @default 'md' */
  size?: BadgeSize;
}

/** A small pill-shaped status or count indicator. */
export function Badge({ variant = 'gray', size = 'md', className, ...rest }: BadgeProps) {
  return (
    <span
      className={clsx(styles.badge, styles[variant], styles[size], className)}
      {...rest}
    />
  );
}
