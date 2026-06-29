import { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Card.module.css';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual style of the card. @default 'elevated' */
  variant?: CardVariant;
}

/**
 * A surface container with three variants. Forwards all standard `<div>`
 * attributes and a ref.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'elevated', className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={clsx(styles.card, styles[variant], className)}
      {...rest}
    >
      {children}
    </div>
  );
});
