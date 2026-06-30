import { Children, type AnchorHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Breadcrumbs.module.css';

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  /** Custom separator rendered between items. @default '/' */
  separator?: ReactNode;
  children: ReactNode;
}

/** A navigation trail of `BreadcrumbItem`s, separated automatically. */
export function Breadcrumbs({ separator = '/', children, className, ...rest }: BreadcrumbsProps) {
  const items = Children.toArray(children);

  return (
    <nav aria-label="Breadcrumb" className={clsx(styles.nav, className)} {...rest}>
      <ol className={styles.list}>
        {items.map((item, index) => (
          <li key={index} className={styles.listItem}>
            {item}
            {index < items.length - 1 && (
              <span className={styles.separator} aria-hidden="true">
                {separator}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export interface BreadcrumbItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Marks this as the current page — renders as non-interactive text. */
  isCurrent?: boolean;
}

export function BreadcrumbItem({ isCurrent, className, children, ...rest }: BreadcrumbItemProps) {
  if (isCurrent) {
    return (
      <span aria-current="page" className={clsx(styles.current, className)}>
        {children}
      </span>
    );
  }

  return (
    <a className={clsx(styles.link, className)} {...rest}>
      {children}
    </a>
  );
}
