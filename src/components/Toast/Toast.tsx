import { Toast as ToastPrimitive } from '@base-ui/react/toast';
import { createContext, useContext, useMemo, type ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Toast.module.css';

export type ToastVariant = 'success' | 'error' | 'alert' | 'info' | 'neutral';

export interface ToastAction {
  label: string;
  onClick: () => void;
  /** 'primary' renders a solid fill, 'secondary' an outline, both tinted to the toast's variant color. @default 'secondary' */
  variant?: 'primary' | 'secondary';
}

export interface ToastOptions {
  title?: string;
  description?: string;
  /** @default 'neutral' */
  variant?: ToastVariant;
  /** Auto-dismiss after this many ms. Set to `0` to require manual dismissal. @default 4000 */
  duration?: number;
  /** Action buttons rendered below the description. Clicking one also dismisses the toast. */
  actions?: ToastAction[];
  /** Shows the close (×) button. @default true */
  closable?: boolean;
}

interface ToastContextValue {
  /** Pushes a toast onto the stack and returns its id. */
  show: (toast: ToastOptions) => string;
  /** Dismisses a toast by id before its timer elapses. */
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

// Custom payload stashed on Base UI's generic `data` field — the only place
// it lets us attach extra, non-standard fields to a toast.
interface ToastData {
  actions?: ToastAction[];
  closable?: boolean;
}

const URGENT_VARIANTS: ReadonlySet<ToastVariant> = new Set(['error', 'alert']);

// Small glyph per variant so meaning doesn't rely on color alone (WCAG
// 1.4.1) — rendered in white inside the colored .iconBadge circle.
const ICON_PATHS: Record<Exclude<ToastVariant, 'neutral'>, string> = {
  success: 'M4 8.5l2.5 2.5L12 5',
  error: 'M5 5l6 6M11 5l-6 6',
  alert: 'M8 4.5v5m0 2.5h.01',
  info: 'M8 4.5h.01M8 7.5v4',
};

function ToastIcon({ variant }: { variant: ToastVariant }) {
  if (variant === 'neutral') {
    return (
      <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
        <circle cx="4" cy="4" r="3" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d={ICON_PATHS[variant]}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
  const manager = ToastPrimitive.useToastManager<ToastData>();

  const value = useMemo<ToastContextValue>(
    () => ({
      show: ({
        title,
        description,
        variant = 'neutral',
        duration = 4000,
        actions,
        closable = true,
      }: ToastOptions) =>
        manager.add({
          title,
          description,
          type: variant,
          timeout: duration,
          // Deliberately NOT setting Base UI's own `priority: 'high'` here —
          // it makes the toast `aria-hidden` until the viewport is focused,
          // which defeats the point of the `role="alert"` set below (an
          // immediate, un-hidden announcement). Urgency is expressed purely
          // through that DOM role, same as this component did pre-rewrite.
          data: { actions, closable },
        }),
      dismiss: (id: string) => manager.close(id),
    }),
    [manager],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastPrimitive.Portal>
        <ToastPrimitive.Viewport className={styles.viewport} aria-label="Notifications">
          {manager.toasts.map((toast) => {
            const variant = (toast.type as ToastVariant) ?? 'neutral';
            const closable = toast.data?.closable ?? true;
            const actions = toast.data?.actions ?? [];

            return (
              <ToastPrimitive.Root
                key={toast.id}
                toast={toast}
                role={URGENT_VARIANTS.has(variant) ? 'alert' : 'status'}
                className={clsx(styles.toast, styles[variant])}
              >
                <span className={styles.iconBadge} aria-hidden="true">
                  <ToastIcon variant={variant} />
                </span>
                <ToastPrimitive.Content className={styles.content}>
                  <div className={styles.headerRow}>
                    {toast.title && (
                      <ToastPrimitive.Title className={styles.title}>
                        {toast.title}
                      </ToastPrimitive.Title>
                    )}
                    {closable && (
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
                    )}
                  </div>
                  {toast.description && (
                    <ToastPrimitive.Description className={styles.description}>
                      {toast.description}
                    </ToastPrimitive.Description>
                  )}
                  {actions.length > 0 && (
                    <div className={styles.actions}>
                      {actions.map((action, index) => (
                        <button
                          key={index}
                          type="button"
                          className={clsx(
                            styles.actionButton,
                            action.variant === 'primary' ? styles.actionPrimary : styles.actionSecondary,
                          )}
                          onClick={() => {
                            action.onClick();
                            manager.close(toast.id);
                          }}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </ToastPrimitive.Content>
              </ToastPrimitive.Root>
            );
          })}
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
