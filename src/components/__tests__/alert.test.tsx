import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Alert } from '../Alert/Alert';

describe('Alert', () => {
  it('renders title and body with the variant class', () => {
    render(
      <Alert variant="success" title="Saved">
        Your changes were saved.
      </Alert>,
    );
    const alert = screen.getByRole('status');
    expect(alert.className).toContain('success');
    expect(alert).toHaveTextContent('Saved');
    expect(alert).toHaveTextContent('Your changes were saved.');
  });

  it('uses role="alert" for urgent variants and role="status" otherwise', () => {
    const { rerender } = render(<Alert variant="error">Failed</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    rerender(<Alert variant="warning">Careful</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    rerender(<Alert variant="info">FYI</Alert>);
    expect(screen.getByRole('status')).toBeInTheDocument();
    rerender(<Alert variant="success">Done</Alert>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('only renders the dismiss button when onDismiss is provided', () => {
    const { rerender } = render(<Alert>Plain</Alert>);
    expect(screen.queryByRole('button', { name: 'Dismiss' })).not.toBeInTheDocument();

    const onDismiss = vi.fn();
    rerender(<Alert onDismiss={onDismiss}>Dismissible</Alert>);
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('defaults to the info variant', () => {
    render(<Alert>Heads up</Alert>);
    expect(screen.getByRole('status').className).toContain('info');
  });
});
