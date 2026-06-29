import { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button. @default 'primary' */
  variant?: ButtonVariant;
  /** Size of the button. @default 'md' */
  size?: ButtonSize;
  /** Shows a spinner and disables interaction while true. */
  isLoading?: boolean;
  /** Disables the button. Mirrors the native `disabled` attribute. */
  isDisabled?: boolean;
}

/**
 * A clickable button supporting four variants, three sizes, and a loading
 * state. Forwards all standard `<button>` attributes and a ref.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      isDisabled = false,
      className,
      children,
      type = 'button',
      disabled,
      ...rest
    },
    ref,
  ) {
    const inactive = disabled || isDisabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          styles.button,
          styles[variant],
          styles[size],
          className,
        )}
        disabled={inactive}
        aria-busy={isLoading || undefined}
        {...rest}
      >
        {isLoading && <span className={styles.spinner} aria-hidden="true" />}
        {children}
      </button>
    );
  },
);
