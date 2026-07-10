import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './Accordion.module.css';

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

function toValueArray(value: string | string[] | undefined): string[] | undefined {
  if (value === undefined) return undefined;
  if (Array.isArray(value)) return value;
  return value ? [value] : [];
}

/**
 * Groups `AccordionItem`s under shared open/closed state. Wraps Base UI
 * `Accordion` internally — adds Up/Down/Home/End keyboard navigation
 * between triggers on top of the existing click-to-toggle behavior. Base
 * UI's `value` is always an array internally (even for `type="single"`);
 * this component converts to/from the plain string this library's public
 * API uses for a single open item, and re-clicking the open item in
 * single mode closes it by default (no separate `collapsible` prop needed).
 */
export function Accordion({
  type = 'single',
  value,
  defaultValue,
  onChange,
  children,
  className,
}: AccordionProps) {
  const multiple = type === 'multiple';

  return (
    <AccordionPrimitive.Root
      multiple={multiple}
      value={toValueArray(value)}
      defaultValue={toValueArray(defaultValue) ?? []}
      onValueChange={(next: string[]) => onChange?.(multiple ? next : (next[0] ?? ''))}
      className={clsx(styles.accordion, className)}
    >
      {children}
    </AccordionPrimitive.Root>
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
  return (
    <AccordionPrimitive.Item value={value} className={clsx(styles.item, className)}>
      <AccordionPrimitive.Header className={styles.heading}>
        <AccordionPrimitive.Trigger className={styles.trigger}>
          <span>{title}</span>
          <svg
            className={styles.chevron}
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
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Panel className={styles.panel}>{children}</AccordionPrimitive.Panel>
    </AccordionPrimitive.Item>
  );
}
