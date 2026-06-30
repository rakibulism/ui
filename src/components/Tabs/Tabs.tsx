import {
  createContext,
  useContext,
  useRef,
  useState,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import styles from './Tabs.module.css';

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error(`<${component}> must be used within <Tabs>`);
  }
  return ctx;
}

export interface TabsProps {
  /** Currently active tab value (controlled). */
  value?: string;
  /** Initial active tab value (uncontrolled). */
  defaultValue?: string;
  /** Called when the active tab changes. */
  onChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

/**
 * Groups `TabList`/`Tab`/`TabPanel` under shared selection state. Works
 * controlled (pass `value` + `onChange`) or uncontrolled (`defaultValue`).
 */
export function Tabs({ value, defaultValue, onChange, children, className }: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const activeValue = value ?? internalValue;

  function setValue(next: string) {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  }

  return (
    <TabsContext.Provider value={{ value: activeValue, setValue }}>
      <div className={clsx(styles.tabs, className)}>{children}</div>
    </TabsContext.Provider>
  );
}

/** Roving-tabindex tab strip; arrow keys move focus and selection between tabs. */
export function TabList({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const listRef = useRef<HTMLDivElement>(null);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    const tabs = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? [],
    );
    const currentIndex = tabs.findIndex((tab) => tab === document.activeElement);
    if (currentIndex === -1) return;
    const delta = event.key === 'ArrowRight' ? 1 : -1;
    const next = tabs[(currentIndex + delta + tabs.length) % tabs.length];
    next?.focus();
    next?.click();
    event.preventDefault();
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      className={clsx(styles.list, className)}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface TabProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  /** Value this tab activates. */
  value: string;
}

export function Tab({ value, className, ...rest }: TabProps) {
  const { value: active, setValue } = useTabsContext('Tab');
  const selected = active === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      className={clsx(styles.tab, selected && styles.tabActive, className)}
      onClick={() => setValue(value)}
      {...rest}
    />
  );
}

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Value this panel corresponds to; only rendered when active. */
  value: string;
}

export function TabPanel({ value, children, className, ...rest }: TabPanelProps) {
  const { value: active } = useTabsContext('TabPanel');
  if (active !== value) return null;

  return (
    <div role="tabpanel" className={clsx(styles.panel, className)} {...rest}>
      {children}
    </div>
  );
}
