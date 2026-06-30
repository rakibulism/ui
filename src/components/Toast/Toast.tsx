import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
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
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback(
    ({ title, description, variant = 'info', duration = 4000 }: ToastOptions) => {
      const id = `toast-${++toastCounter}`;
      setToasts((current) => [...current, { id, title, description, variant }]);
      if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
      }
      return id;
    },
    [dismiss],
  );

  const value = useMemo(() => ({ show, dismiss }), [show, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <div className={styles.viewport} aria-label="Notifications">
            {toasts.map((toast) => (
              <div
                key={toast.id}
                role={toast.variant === 'error' ? 'alert' : 'status'}
                className={clsx(styles.toast, styles[toast.variant])}
              >
                <div className={styles.content}>
                  {toast.title && <p className={styles.title}>{toast.title}</p>}
                  {toast.description && (
                    <p className={styles.description}>{toast.description}</p>
                  )}
                </div>
                <button
                  type="button"
                  className={styles.dismissButton}
                  onClick={() => dismiss(toast.id)}
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
              </div>
            ))}
          </div>,
          document.body,
        )}
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
