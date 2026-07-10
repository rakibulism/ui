import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { Tooltip } from '../Tooltip/Tooltip';
import { Modal } from '../Modal/Modal';
import { ToastProvider, useToast } from '../Toast/Toast';
import { Menu, MenuItem } from '../Menu/Menu';
import { Button } from '../Button/Button';

// Radix only mounts the tooltip bubble once it's actually shown (hover or
// focus), not unconditionally like the previous CSS-only version, so tests
// focus the trigger first. Placement is reflected via Radix's data-side
// attribute (it can flip the requested side on collision), not a
// requested-placement class.
describe('Tooltip', () => {
  it('links the trigger to the tooltip via aria-describedby', async () => {
    render(
      <Tooltip content="Helpful hint">
        <button>Trigger</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole('button', { name: 'Trigger' });
    fireEvent.focus(trigger);
    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toHaveTextContent('Helpful hint');
    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);
  });

  it('applies the requested placement as the data-side attribute', async () => {
    render(
      <Tooltip content="Hint" placement="right">
        <button>T</button>
      </Tooltip>,
    );
    fireEvent.focus(screen.getByRole('button', { name: 'T' }));
    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip.closest('[data-side]')).toHaveAttribute('data-side', 'right');
  });
});

describe('Modal', () => {
  it('renders nothing while closed', () => {
    render(
      <Modal isOpen={false} onClose={() => {}} title="Hidden">
        Body
      </Modal>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders a labelled dialog', () => {
    render(
      <Modal isOpen onClose={() => {}} title="Confirm">
        Body
      </Modal>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByRole('heading', { name: 'Confirm' })).toBeInTheDocument();
  });

  it('closes on Escape and the close button', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Confirm">
        Body
      </Modal>,
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);

    onClose.mockClear();
    render(
      <Modal isOpen onClose={onClose} title="Confirm 2">
        Body
      </Modal>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // Radix renders the overlay and the dialog panel as siblings (not
  // parent/child like the previous hand-rolled backdrop), so the backdrop
  // is queried by its class rather than `dialog.parentElement`. Radix's
  // outside-pointerdown listener attaches via a `setTimeout(0)` (to avoid
  // catching the same click that opened the dialog) and defers the actual
  // dismiss to the following click event (to avoid closing on a
  // drag-to-select gesture), so the test waits a tick and fires both.
  it('closes on backdrop click', async () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Confirm">
        Body
      </Modal>,
    );
    await new Promise((resolve) => setTimeout(resolve, 0));
    const backdrop = document.querySelector('[class*="backdrop"]')!;
    fireEvent.pointerDown(backdrop);
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  it('does not close on backdrop click when closeOnBackdropClick is false', async () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Confirm" closeOnBackdropClick={false}>
        Body
      </Modal>,
    );
    await new Promise((resolve) => setTimeout(resolve, 0));
    const backdrop = document.querySelector('[class*="backdrop"]')!;
    fireEvent.pointerDown(backdrop);
    fireEvent.click(backdrop);
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe('Toast', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  function Trigger({ duration }: { duration?: number }) {
    const { show } = useToast();
    return (
      <Button
        onClick={() =>
          show({ title: 'Saved', description: 'All good', variant: 'success', duration })
        }
      >
        Notify
      </Button>
    );
  }

  // Radix's toast viewport also renders its own visually-hidden live-region
  // announcer with role="status", so queries are scoped to the visible
  // region (role="region" — Radix appends a "(F8)" keyboard-shortcut hint
  // to whatever aria-label is passed) to find just the rendered toast.
  function getVisibleToast() {
    return within(screen.getByRole('region', { name: /Notifications/ })).getByRole('status');
  }

  it('shows a toast with title, description, and variant styling', () => {
    render(
      <ToastProvider>
        <Trigger duration={0} />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Notify' }));
    const toast = getVisibleToast();
    expect(toast).toHaveTextContent('Saved');
    expect(toast).toHaveTextContent('All good');
    expect(toast.className).toContain('success');
  });

  it('dismisses via the dismiss button', () => {
    render(
      <ToastProvider>
        <Trigger duration={0} />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Notify' }));
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(
      within(screen.getByRole('region', { name: /Notifications/ })).queryByRole('status'),
    ).not.toBeInTheDocument();
  });

  it('auto-dismisses after the configured duration', () => {
    vi.useFakeTimers();
    render(
      <ToastProvider>
        <Trigger duration={1000} />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Notify' }));
    expect(getVisibleToast()).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1100);
    });
    expect(
      within(screen.getByRole('region', { name: /Notifications/ })).queryByRole('status'),
    ).not.toBeInTheDocument();
  });

  it('throws when useToast is used outside a provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Trigger />)).toThrow(/within a ToastProvider/);
    spy.mockRestore();
  });
});

// Radix DropdownMenu.Trigger opens on pointerdown (for responsiveness), not
// click, so tests use fireEvent.pointerDown to open the menu.
describe('Menu', () => {
  it('opens on trigger click and closes after selecting an item', () => {
    const onEdit = vi.fn();
    render(
      <Menu trigger={<Button>Actions</Button>}>
        <MenuItem onClick={onEdit}>Edit</MenuItem>
        <MenuItem destructive>Delete</MenuItem>
      </Menu>,
    );
    const trigger = screen.getByRole('button', { name: 'Actions' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.pointerDown(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('menuitem', { name: 'Edit' }));
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  // Same deferred outside-pointerdown listener as Modal (see above) — wait
  // a tick before firing the outside interaction.
  it('closes on outside click and Escape', async () => {
    render(
      <Menu trigger={<Button>Actions</Button>}>
        <MenuItem>Edit</MenuItem>
      </Menu>,
    );
    const trigger = screen.getByRole('button', { name: 'Actions' });

    fireEvent.pointerDown(trigger);
    await new Promise((resolve) => setTimeout(resolve, 0));
    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    fireEvent.pointerDown(trigger);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('styles destructive items', () => {
    render(
      <Menu trigger={<Button>Actions</Button>}>
        <MenuItem destructive>Delete</MenuItem>
      </Menu>,
    );
    fireEvent.pointerDown(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.getByRole('menuitem', { name: 'Delete' }).className).toContain(
      'destructive',
    );
  });
});
