import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import styles from './Menu.module.css';

export interface MenuProps {
  /** The trigger element — typically a `Button`. Receives `onClick` to toggle the menu. */
  trigger: ReactElement;
  /** `MenuItem` elements. */
  children: ReactNode;
  /** Alignment of the menu relative to the trigger. @default 'start' */
  align?: 'start' | 'end';
  className?: string;
}

/**
 * A click-triggered dropdown menu. Closes on outside click, Escape, or
 * selecting an item. No positioning library — the menu is absolutely
 * positioned relative to the trigger via `align`.
 */
export function Menu({ trigger, children, align = 'start', className }: MenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const triggerElement = cloneElement(trigger, {
    onClick: (event: React.MouseEvent) => {
      trigger.props.onClick?.(event);
      setOpen((current) => !current);
    },
    'aria-haspopup': 'menu',
    'aria-expanded': open,
  });

  return (
    <div ref={rootRef} className={clsx(styles.root, className)}>
      {triggerElement}
      {open && (
        <div role="menu" className={clsx(styles.menu, styles[align])}>
          {Children.map(children, (child) =>
            isValidElement(child)
              ? cloneElement(child, {
                  onClick: (event: React.MouseEvent) => {
                    child.props.onClick?.(event);
                    setOpen(false);
                  },
                })
              : child,
          )}
        </div>
      )}
    </div>
  );
}

export interface MenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Renders with destructive (red) styling for dangerous actions. */
  destructive?: boolean;
}

/** A single actionable row inside a `Menu`. */
export function MenuItem({ destructive, className, ...rest }: MenuItemProps) {
  return (
    <button
      type="button"
      role="menuitem"
      className={clsx(styles.item, destructive && styles.destructive, className)}
      {...rest}
    />
  );
}
