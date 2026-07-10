import { Toast as ToastPrimitive } from '@base-ui/react/toast';
import { createContext, useContext, useMemo, type ReactNode } from 'react';
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

interface ToastContextValue {
  /** Pushes a toast onto the stack and returns its id. */
  show: (toast: ToastOptions) => string;
  /** Dismisses a toast by id before its timer elapses. */
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * Renders the toast viewport (portaled to `document.body`) and provides the
 * `useToast` API to descendants. Mount once near the root of the app.
 *
 * Wraps Base UI `Toast` internally. Base UI's own `useToastManager()` hook
 * already exposes an imperative `add`/`close` API close to what this
 * library hand-built over Radix previously, so this is mostly a thin
 * rename/adapter layer over it (`show`/`dismiss`, `variant` instead of
 * `type`) to keep the public API unchanged. Auto-dismiss timing and
 * pause-on-hover/focus are handled by Base UI's `timeout` option.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <ToastPrimitive.Provider>
      <ToastBridge>{children}</ToastBridge>
    </ToastPrimitive.Provider>
  );
}

function ToastBridge({ children }: { children: ReactNode }) {
  const manager = ToastPrimitive.useToastManager();

  const value = useMemo<ToastContextValue>(
    () => ({
      show: ({ title, description, variant = 'info', duration = 4000 }: ToastOptions) =>
        manager.add({ title, description, type: variant, timeout: duration }),
      dismiss: (id: string) => manager.close(id),
    }),
    [manager],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastPrimitive.Portal>
        <ToastPrimitive.Viewport className={styles.viewport} aria-label="Notifications">
          {manager.toasts.map((toast) => (
            <ToastPrimitive.Root
              key={toast.id}
              toast={toast}
              role={toast.type === 'error' ? 'alert' : 'status'}
              className={clsx(styles.toast, styles[toast.type as ToastVariant])}
            >
              <ToastPrimitive.Content className={styles.content}>
                {toast.title && <ToastPrimitive.Title className={styles.title}>{toast.title}</ToastPrimitive.Title>}
                {toast.description && (
                  <ToastPrimitive.Description className={styles.description}>
                    {toast.description}
                  </ToastPrimitive.Description>
                )}
              </ToastPrimitive.Content>
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
        </ToastPrimitive.Viewport>
      </ToastPrimitive.Portal>
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
