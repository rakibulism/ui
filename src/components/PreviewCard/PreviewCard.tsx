import { PreviewCard as PreviewCardPrimitive } from '@base-ui/react/preview-card';
import clsx from 'clsx';
import type { ReactElement, ReactNode } from 'react';
import styles from './PreviewCard.module.css';

export type PreviewCardPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PreviewCardProps {
  /** A single hoverable/focusable trigger element (e.g. a link or name). */
  children: ReactElement;
  /** Rich preview content — unlike `Tooltip`, this can contain interactive elements. */
  content: ReactNode;
  /** @default 'bottom' */
  placement?: PreviewCardPlacement;
  className?: string;
}

/**
 * A rich hover preview (e.g. an unfurled link, a user's profile summary)
 * shown after a brief hover delay. Unlike `Tooltip`, the content can be
 * interactive — moving the pointer from the trigger into the popup keeps it
 * open instead of dismissing it. Wraps Base UI `PreviewCard` internally.
 */
export function PreviewCard({ children, content, placement = 'bottom', className }: PreviewCardProps) {
  return (
    <PreviewCardPrimitive.Root>
      <PreviewCardPrimitive.Trigger render={children} />
      <PreviewCardPrimitive.Portal>
        <PreviewCardPrimitive.Positioner side={placement} sideOffset={8}>
          <PreviewCardPrimitive.Popup className={clsx(styles.popup, className)}>
            {content}
          </PreviewCardPrimitive.Popup>
        </PreviewCardPrimitive.Positioner>
      </PreviewCardPrimitive.Portal>
    </PreviewCardPrimitive.Root>
  );
}
