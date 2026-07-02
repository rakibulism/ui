import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Tooltip } from '../Tooltip/Tooltip';
import { Modal } from '../Modal/Modal';
import { ToastProvider, useToast } from '../Toast/Toast';
import { Menu, MenuItem } from '../Menu/Menu';
import { Button } from '../Button/Button';

describe('Tooltip', () => {
  it('links the trigger to the tooltip via aria-describedby', () => {
    render(
      <Tooltip content="Helpful hint">
        <button>Trigger</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole('button', { name: 'Trigger' });
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveTextContent('Helpful hint');
    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);
  });

  it('applies the placement class', () => {
    render(
      <Tooltip content="Hint" placement="right">
        <button>T</button>
      </Tooltip>,
    );
    expect(screen.getByRole('tooltip').className).toContain('right');
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

  it('renders a labelled dialog and locks body scroll while open', () => {
    const { unmount } = render(
      <Modal isOpen onClose={() => {}} title="Confirm">
        Body
      </Modal>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByRole('heading', { name: 'Confirm' })).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('closes on Escape, backdrop click, and the close button', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Confirm">
        Body
      </Modal>,
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    fireEvent.mouseDown(screen.getByRole('dialog').parentElement!);
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(3);
  });

  it('does not close on backdrop click when closeOnBackdropClick is false', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Confirm" closeOnBackdropClick={false}>
        Body
      </Modal>,
    );
    fireEvent.mouseDown(screen.getByRole('dialog').parentElement!);
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

  it('shows a toast with title, description, and variant styling', () => {
    render(
      <ToastProvider>
        <Trigger duration={0} />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Notify' }));
    const toast = screen.getByRole('status');
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
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('auto-dismisses after the configured duration', () => {
    vi.useFakeTimers();
    render(
      <ToastProvider>
        <Trigger duration={1000} />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Notify' }));
    expect(screen.getByRole('status')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1100);
    });
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('throws when useToast is used outside a provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Trigger />)).toThrow(/within a ToastProvider/);
    spy.mockRestore();
  });
});

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
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('menuitem', { name: 'Edit' }));
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes on outside click and Escape', () => {
    render(
      <Menu trigger={<Button>Actions</Button>}>
        <MenuItem>Edit</MenuItem>
      </Menu>,
    );
    const trigger = screen.getByRole('button', { name: 'Actions' });

    fireEvent.click(trigger);
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    fireEvent.click(trigger);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('styles destructive items', () => {
    render(
      <Menu trigger={<Button>Actions</Button>}>
        <MenuItem destructive>Delete</MenuItem>
      </Menu>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.getByRole('menuitem', { name: 'Delete' }).className).toContain(
      'destructive',
    );
  });
});
