import clsx from 'clsx';
import styles from './Alert.module.css';

export type AlertVariant = 'info' | 'success' | 'error' | 'warning';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default 'info' */
  variant?: AlertVariant;
  /** Optional bold heading rendered above the body. */
  title?: string;
  /** Called when the dismiss button is clicked; the button only renders when this is set. */
  onDismiss?: () => void;
}

const ICON_PATHS: Record<AlertVariant, string> = {
  info: 'M10 9v5m0-8h.01M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z',
  success: 'M7 10.5l2 2 4-4.5M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z',
  error: 'M10 6.5v4m0 3h.01M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z',
  warning: 'M10 7v4m0 3h.01M8.6 3.2 2.2 14.4a1.6 1.6 0 0 0 1.4 2.4h12.8a1.6 1.6 0 0 0 1.4-2.4L11.4 3.2a1.6 1.6 0 0 0-2.8 0Z',
};

/**
 * An inline, persistent callout for contextual feedback. Unlike Toast (a
 * transient portal notification), Alert renders in place and stays until
 * removed. Uses role="alert" for error/warning so screen readers announce
 * it, and role="status" otherwise.
 */
export function Alert({
  variant = 'info',
  title,
  onDismiss,
  className,
  children,
  ...rest
}: AlertProps) {
  const isUrgent = variant === 'error' || variant === 'warning';

  return (
    <div
      role={isUrgent ? 'alert' : 'status'}
      className={clsx(styles.alert, styles[variant], className)}
      {...rest}
    >
      <svg
        className={styles.icon}
        viewBox="0 0 20 20"
        fill="none"
        width="18"
        height="18"
        aria-hidden="true"
      >
        <path
          d={ICON_PATHS[variant]}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className={styles.content}>
        {title && <p className={styles.title}>{title}</p>}
        {children && <div className={styles.body}>{children}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          className={styles.dismissButton}
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          <svg viewBox="0 0 20 20" fill="none" width="14" height="14" aria-hidden="true">
            <path
              d="M5 5l10 10M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
