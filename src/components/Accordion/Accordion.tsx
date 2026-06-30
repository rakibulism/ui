import { createContext, useContext, useId, useState, type ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Accordion.module.css';

interface AccordionContextValue {
  isOpen: (value: string) => boolean;
  toggle: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export interface AccordionProps {
  /** Whether one or multiple items can be open at a time. @default 'single' */
  type?: 'single' | 'multiple';
  /** Open value(s) (controlled). A string for `type="single"`, an array for `type="multiple"`. */
  value?: string | string[];
  /** Initial open value(s) (uncontrolled). */
  defaultValue?: string | string[];
  /** Called with the new open value(s). */
  onChange?: (value: string | string[]) => void;
  children: ReactNode;
  className?: string;
}

/** Groups `AccordionItem`s under shared open/closed state. */
export function Accordion({
  type = 'single',
  value,
  defaultValue,
  onChange,
  children,
  className,
}: AccordionProps) {
  const [internal, setInternal] = useState<string | string[]>(
    defaultValue ?? (type === 'multiple' ? [] : ''),
  );
  const current = value ?? internal;

  function toggle(itemValue: string) {
    let next: string | string[];
    if (type === 'multiple') {
      const arr = Array.isArray(current) ? current : [];
      next = arr.includes(itemValue)
        ? arr.filter((v) => v !== itemValue)
        : [...arr, itemValue];
    } else {
      next = current === itemValue ? '' : itemValue;
    }
    if (value === undefined) setInternal(next);
    onChange?.(next);
  }

  function isOpen(itemValue: string) {
    return Array.isArray(current) ? current.includes(itemValue) : current === itemValue;
  }

  return (
    <AccordionContext.Provider value={{ isOpen, toggle }}>
      <div className={clsx(styles.accordion, className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps {
  /** Unique value identifying this item within the Accordion. */
  value: string;
  /** Always-visible heading; click toggles the panel. */
  title: ReactNode;
  children: ReactNode;
  className?: string;
}

export function AccordionItem({ value, title, children, className }: AccordionItemProps) {
  const baseId = useId();
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error('AccordionItem must be used within Accordion');
  }
  const open = ctx.isOpen(value);
  const panelId = `${baseId}-panel`;
  const triggerId = `${baseId}-trigger`;

  return (
    <div className={clsx(styles.item, className)}>
      <h3 className={styles.heading}>
        <button
          type="button"
          id={triggerId}
          aria-expanded={open}
          aria-controls={panelId}
          className={styles.trigger}
          onClick={() => ctx.toggle(value)}
        >
          <span>{title}</span>
          <svg
            className={clsx(styles.chevron, open && styles.chevronOpen)}
            viewBox="0 0 20 20"
            fill="none"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <path
              d="M5.5 7.5L10 12l4.5-4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </h3>
      {open && (
        <div id={panelId} role="region" aria-labelledby={triggerId} className={styles.panel}>
          {children}
        </div>
      )}
    </div>
  );
}
