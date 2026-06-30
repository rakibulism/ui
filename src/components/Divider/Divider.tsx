import clsx from 'clsx';
import styles from './Divider.module.css';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
  /** Optional label rendered in the middle. Ignored for vertical dividers. */
  label?: React.ReactNode;
}

/** A thin rule separating content, optionally with a centered label. */
export function Divider({ orientation = 'horizontal', label, className, ...rest }: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={clsx(styles.vertical, className)}
        {...rest}
      />
    );
  }

  if (label) {
    return (
      <div role="separator" className={clsx(styles.labeledRow, className)} {...rest}>
        <span className={styles.line} />
        <span className={styles.label}>{label}</span>
        <span className={styles.line} />
      </div>
    );
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={clsx(styles.horizontal, className)}
      {...rest}
    />
  );
}
