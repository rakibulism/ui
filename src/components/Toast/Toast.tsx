import * as ToastPrimitive from '@radix-ui/react-toast';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import styles from './Toast.module.css';

export type ToastVariant = 'info' | 'success' | 'error' | 'warning';

export interface ToastOptions {
  title?: string;
  description?: string;
  /** @default 'info' */
  variant?: ToastVariant;
  /** Auto-dismiss after this many ms. Set to `0` to require manual dismissal. @default 4000 */
  duration?: number;
}

interface ToastItem {
  id: string;
  title?: string;
  description?: string;
  variant: ToastVariant;
  duration: number;
}

interface ToastContextValue {
  /** Pushes a toast onto the stack and returns its id. */
  show: (toast: ToastOptions) => string;
  /** Dismisses a toast by id before its timer elapses. */
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let toastCounter = 0;

/**
 * Renders the toast viewport (portaled to `document.body`) and provides the
 * `useToast` API to descendants. Mount once near the root of the app.
 *
 * Wraps Radix `Toast` internally: the public `show`/`dismiss` API stays
 * imperative (Radix's own API is declarative per-toast JSX), so this keeps
 * an array of toast items in state and renders one `Toast.Root` per item.
 * Auto-dismiss timing and pause-on-hover/focus are handled by Radix's
 * `duration` prop instead of a raw `setTimeout` — the previous version had
 * no pause-on-hover.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback(
    ({ title, description, variant = 'info', duration = 4000 }: ToastOptions) => {
      const id = `toast-${++toastCounter}`;
      setToasts((current) => [...current, { id, title, description, variant, duration }]);
      return id;
    },
    [],
  );

  const value = useMemo(() => ({ show, dismiss }), [show, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      <ToastPrimitive.Provider>
        {children}
        {toasts.map((toast) => (
          <ToastPrimitive.Root
            key={toast.id}
            role={toast.variant === 'error' ? 'alert' : 'status'}
            className={clsx(styles.toast, styles[toast.variant])}
            duration={toast.duration > 0 ? toast.duration : Infinity}
            onOpenChange={(open) => {
              if (!open) dismiss(toast.id);
            }}
          >
            <div className={styles.content}>
              {toast.title && (
                <ToastPrimitive.Title className={styles.title}>{toast.title}</ToastPrimitive.Title>
              )}
              {toast.description && (
                <ToastPrimitive.Description className={styles.description}>
                  {toast.description}
                </ToastPrimitive.Description>
              )}
            </div>
            <ToastPrimitive.Close className={styles.dismissButton} aria-label="Dismiss">
              <svg viewBox="0 0 20 20" fill="none" width="14" height="14" aria-hidden="true">
                <path
                  d="M5 5l10 10M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport className={styles.viewport} aria-label="Notifications" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}

/** Reads the toast API (`show`/`dismiss`). Must be used within a `ToastProvider`. */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}
