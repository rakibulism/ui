import clsx from 'clsx';
import styles from './Skeleton.module.css';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default 'text' */
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
}

/** An animated placeholder for content that hasn't loaded yet. */
export function Skeleton({
  variant = 'text',
  width,
  height,
  className,
  style,
  ...rest
}: SkeletonProps) {
  return (
    <div
      className={clsx(styles.skeleton, styles[variant], className)}
      style={{ width, height, ...style }}
      aria-hidden="true"
      {...rest}
    />
  );
}
