import { Fieldset as FieldsetPrimitive } from '@base-ui/react/fieldset';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './Fieldset.module.css';

export interface FieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /** Heading rendered above the grouped fields. */
  legend?: ReactNode;
}

/**
 * Groups related form fields under a shared legend. Renders a native
 * `<fieldset>`/`<legend>` pair (correct semantics for assistive tech
 * without any extra ARIA wiring) via Base UI `Fieldset`.
 */
export function Fieldset({ legend, className, children, ...rest }: FieldsetProps) {
  return (
    <FieldsetPrimitive.Root className={clsx(styles.fieldset, className)} {...rest}>
      {legend && <FieldsetPrimitive.Legend className={styles.legend}>{legend}</FieldsetPrimitive.Legend>}
      <div className={styles.content}>{children}</div>
    </FieldsetPrimitive.Root>
  );
}
