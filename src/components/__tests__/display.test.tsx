import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Badge } from '../Badge/Badge';
import { Avatar } from '../Avatar/Avatar';
import { Spinner } from '../Spinner/Spinner';
import { Skeleton } from '../Skeleton/Skeleton';
import { Progress } from '../Progress/Progress';
import { Divider } from '../Divider/Divider';

describe('Badge', () => {
  it('renders with variant and size classes', () => {
    render(
      <Badge variant="success" size="sm">
        Active
      </Badge>,
    );
    const badge = screen.getByText('Active');
    expect(badge.className).toContain('success');
    expect(badge.className).toContain('sm');
  });
});

describe('Avatar', () => {
  it('derives initials from the name when there is no image', () => {
    render(<Avatar name="Ada Lovelace" />);
    expect(screen.getByText('AL')).toBeInTheDocument();
  });

  it('renders a single initial for single-word names and ? without a name', () => {
    const { rerender } = render(<Avatar name="Plato" />);
    expect(screen.getByText('P')).toBeInTheDocument();
    rerender(<Avatar />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('renders the image when src is provided', () => {
    render(<Avatar name="Ada Lovelace" src="/ada.jpg" />);
    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toBeInTheDocument();
    expect(screen.queryByText('AL')).not.toBeInTheDocument();
  });

  it('falls back to initials when the image fails to load', () => {
    render(<Avatar name="Ada Lovelace" src="/broken.jpg" />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByText('AL')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});

describe('Spinner', () => {
  it('announces itself as a loading status', () => {
    render(<Spinner size="lg" />);
    const spinner = screen.getByRole('status', { name: 'Loading' });
    expect(spinner.className).toContain('lg');
  });
});

describe('Skeleton', () => {
  it('is hidden from assistive tech and accepts dimensions', () => {
    const { container } = render(
      <Skeleton variant="circular" width={40} height={40} />,
    );
    const skeleton = container.firstElementChild as HTMLElement;
    expect(skeleton).toHaveAttribute('aria-hidden', 'true');
    expect(skeleton.className).toContain('circular');
    expect(skeleton.style.width).toBe('40px');
  });
});

describe('Progress', () => {
  it('exposes progressbar semantics', () => {
    render(<Progress value={40} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '40');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('clamps the fill width between 0% and 100%', () => {
    const { rerender, container } = render(<Progress value={150} />);
    const fill = () =>
      container.querySelector('[role="progressbar"] > div') as HTMLElement;
    expect(fill().style.width).toBe('100%');
    rerender(<Progress value={-10} />);
    expect(fill().style.width).toBe('0%');
    rerender(<Progress value={5} max={20} />);
    expect(fill().style.width).toBe('25%');
  });
});

describe('Divider', () => {
  it('renders a horizontal separator by default', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toHaveAttribute(
      'aria-orientation',
      'horizontal',
    );
  });

  it('renders a vertical separator', () => {
    render(<Divider orientation="vertical" />);
    expect(screen.getByRole('separator')).toHaveAttribute(
      'aria-orientation',
      'vertical',
    );
  });

  it('renders a centered label', () => {
    render(<Divider label="OR" />);
    expect(screen.getByRole('separator')).toHaveTextContent('OR');
  });
});
