import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Button, type ButtonVariant } from '../Button/Button';
import styles from './AlertDialog.module.css';

export interface AlertDialogAction {
  label: string;
  onClick: () => void;
  variant?: Extract<ButtonVariant, 'primary' | 'secondary' | 'danger'>;
}

export interface AlertDialogProps {
  /** Whether the dialog is visible. */
  isOpen: boolean;
  /** Called when the dialog requests to close (Escape or an action). */
  onClose: () => void;
  /** Heading rendered in the header and used for `aria-labelledby`. */
  title: string;
  /** Dialog body content. */
  children: ReactNode;
  /** Buttons rendered in the footer, e.g. Cancel / Confirm. */
  actions: AlertDialogAction[];
  className?: string;
}

/**
 * An interruptive dialog for confirming a decision (e.g. destructive
 * actions). Unlike `Modal`, it cannot be dismissed by clicking the backdrop
 * — only Escape or an explicit action closes it — matching the
 * `alertdialog` ARIA role's semantics of demanding a response. Wraps Base UI
 * `AlertDialog` internally.
 */
export function AlertDialog({ isOpen, onClose, title, children, actions, className }: AlertDialogProps) {
  return (
    <AlertDialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Backdrop className={styles.backdrop} />
        <AlertDialogPrimitive.Viewport className={styles.viewport}>
          <AlertDialogPrimitive.Popup className={clsx(styles.panel, className)} role="alertdialog" aria-modal="true">
            <div className={styles.header}>
              <AlertDialogPrimitive.Title className={styles.title}>{title}</AlertDialogPrimitive.Title>
            </div>
            <div className={styles.body}>{children}</div>
            <div className={styles.footer}>
              {actions.map((action) => (
                <Button key={action.label} variant={action.variant ?? 'secondary'} onClick={action.onClick}>
                  {action.label}
                </Button>
              ))}
            </div>
          </AlertDialogPrimitive.Popup>
        </AlertDialogPrimitive.Viewport>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}
