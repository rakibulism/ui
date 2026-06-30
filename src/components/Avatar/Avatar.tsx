import { useState } from 'react';
import clsx from 'clsx';
import styles from './Avatar.module.css';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image source. Falls back to initials if missing or it fails to load. */
  src?: string;
  alt?: string;
  /** Used to derive fallback initials (e.g. "Ada Lovelace" → "AL"). */
  name?: string;
  /** @default 'md' */
  size?: AvatarSize;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

/** A circular avatar that shows an image, falling back to initials. */
export function Avatar({ src, alt, name, size = 'md', className, ...rest }: AvatarProps) {
  const [errored, setErrored] = useState(false);
  const showImage = Boolean(src) && !errored;
  const initials = name ? getInitials(name) : '';

  return (
    <div className={clsx(styles.avatar, styles[size], className)} {...rest}>
      {showImage ? (
        <img
          src={src}
          alt={alt ?? name ?? ''}
          className={styles.image}
          onError={() => setErrored(true)}
        />
      ) : (
        <span className={styles.initials}>{initials || '?'}</span>
      )}
    </div>
  );
}
