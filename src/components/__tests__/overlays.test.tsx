import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { Tooltip } from '../Tooltip/Tooltip';
import { Modal } from '../Modal/Modal';
import { ToastProvider, useToast } from '../Toast/Toast';
import { Menu, MenuItem } from '../Menu/Menu';
import { Button } from '../Button/Button';
import { Popover } from '../Popover/Popover';
import { PreviewCard } from '../PreviewCard/PreviewCard';
import { Drawer } from '../Drawer/Drawer';
import { AlertDialog } from '../AlertDialog/AlertDialog';
import { ContextMenu } from '../ContextMenu/ContextMenu';
import { Menubar } from '../Menubar/Menubar';
import { NavigationMenu } from '../NavigationMenu/NavigationMenu';
import { Combobox } from '../Combobox/Combobox';
import { Autocomplete } from '../Autocomplete/Autocomplete';

// Base UI only mounts the tooltip bubble once it's actually shown (hover or
// focus), not unconditionally like the previous CSS-only version, so tests
// focus the trigger first. Placement is reflected via Base UI's data-side
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

  // Base UI renders the backdrop and the dialog panel as siblings (not
  // parent/child like the previous hand-rolled backdrop), so the backdrop
  // is queried by its class rather than `dialog.parentElement`. Its
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

  function getVisibleToast() {
    return within(screen.getByRole('region', { name: /Notifications/ })).getByRole('status');
  }

  // Base UI's Toast.Close is aria-hidden by design while the toast stack
  // isn't "expanded" and unfocused (avoids exposing a close button for a
  // toast that's visually stacked/obscured to assistive tech), so it's
  // queried by attribute rather than role.
  function getDismissButton() {
    return document.querySelector<HTMLButtonElement>('[aria-label="Dismiss"]')!;
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
    fireEvent.click(getDismissButton());
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

  it('defaults to the neutral variant and role="status"', () => {
    function NeutralTrigger() {
      const { show } = useToast();
      return <Button onClick={() => show({ title: 'Heads up', duration: 0 })}>Notify</Button>;
    }
    render(
      <ToastProvider>
        <NeutralTrigger />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Notify' }));
    const toast = getVisibleToast();
    expect(toast.className).toContain('neutral');
  });

  it.each([
    ['alert', 'alert'],
    ['error', 'alert'],
    ['info', 'status'],
  ] as const)('variant="%s" gets role="%s"', (variant, expectedRole) => {
    function VariantTrigger() {
      const { show } = useToast();
      return (
        <Button onClick={() => show({ title: 'Notice', variant, duration: 0 })}>Notify</Button>
      );
    }
    render(
      <ToastProvider>
        <VariantTrigger />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Notify' }));
    const region = screen.getByRole('region', { name: /Notifications/ });
    expect(within(region).getByRole(expectedRole)).toHaveTextContent('Notice');
  });

  it('renders action buttons and dismisses the toast when one is clicked', () => {
    const onUndo = vi.fn();
    function ActionTrigger() {
      const { show } = useToast();
      return (
        <Button
          onClick={() =>
            show({
              title: 'Deleted',
              duration: 0,
              actions: [{ label: 'Undo', onClick: onUndo, variant: 'primary' }],
            })
          }
        >
          Notify
        </Button>
      );
    }
    render(
      <ToastProvider>
        <ActionTrigger />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Notify' }));
    fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
    expect(onUndo).toHaveBeenCalledTimes(1);
    expect(
      within(screen.getByRole('region', { name: /Notifications/ })).queryByRole('status'),
    ).not.toBeInTheDocument();
  });

  it('hides the dismiss button when closable is false', () => {
    function NonClosableTrigger() {
      const { show } = useToast();
      return (
        <Button onClick={() => show({ title: 'Persistent', duration: 0, closable: false })}>
          Notify
        </Button>
      );
    }
    render(
      <ToastProvider>
        <NonClosableTrigger />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Notify' }));
    expect(getVisibleToast()).toBeInTheDocument();
    expect(document.querySelector('[aria-label="Dismiss"]')).not.toBeInTheDocument();
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

  // Same deferred outside-interaction listener as Modal (see above) — wait
  // a tick before firing the outside interaction.
  it('closes on outside click and Escape', async () => {
    render(
      <Menu trigger={<Button>Actions</Button>}>
        <MenuItem>Edit</MenuItem>
      </Menu>,
    );
    const trigger = screen.getByRole('button', { name: 'Actions' });

    fireEvent.click(trigger);
    await new Promise((resolve) => setTimeout(resolve, 0));
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

describe('Popover', () => {
  it('opens on trigger click and shows the title and content', () => {
    render(
      <Popover title="Details" content="More info">
        <button>Open</button>
      </Popover>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('heading', { name: 'Details' })).toBeInTheDocument();
    expect(screen.getByText('More info')).toBeInTheDocument();
  });

  it('closes via the close button', () => {
    render(
      <Popover title="Details" content="More info" defaultOpen>
        <button>Open</button>
      </Popover>,
    );
    expect(screen.getByText('More info')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByText('More info')).not.toBeInTheDocument();
  });

  it('calls onChange when the open state changes', () => {
    const onChange = vi.fn();
    render(
      <Popover title="Details" content="More info" onChange={onChange}>
        <button>Open</button>
      </Popover>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

describe('PreviewCard', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows the preview content after hovering the trigger', () => {
    vi.useFakeTimers();
    render(
      <PreviewCard content="Rich preview">
        <a href="#profile">Profile</a>
      </PreviewCard>,
    );
    fireEvent.mouseEnter(screen.getByRole('link', { name: 'Profile' }));
    act(() => {
      vi.advanceTimersByTime(700);
    });
    expect(screen.getByText('Rich preview')).toBeInTheDocument();
  });
});

describe('Drawer', () => {
  it('renders nothing while closed', () => {
    render(
      <Drawer isOpen={false} onClose={() => {}} title="Hidden">
        Body
      </Drawer>,
    );
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('renders a labelled panel with body content', () => {
    render(
      <Drawer isOpen onClose={() => {}} title="Filters">
        Body content
      </Drawer>,
    );
    expect(screen.getByRole('heading', { name: 'Filters' })).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('closes on Escape and the close button', () => {
    const onClose = vi.fn();
    render(
      <Drawer isOpen onClose={onClose} title="Filters">
        Body
      </Drawer>,
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);

    onClose.mockClear();
    render(
      <Drawer isOpen onClose={onClose} title="Filters 2">
        Body
      </Drawer>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('AlertDialog', () => {
  it('renders nothing while closed', () => {
    render(
      <AlertDialog
        isOpen={false}
        onClose={() => {}}
        title="Delete file?"
        actions={[{ label: 'Cancel', onClick: () => {} }]}
      >
        This cannot be undone.
      </AlertDialog>,
    );
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('renders a labelled alertdialog with actions', () => {
    render(
      <AlertDialog
        isOpen
        onClose={() => {}}
        title="Delete file?"
        actions={[{ label: 'Cancel', onClick: () => {} }, { label: 'Delete', onClick: () => {}, variant: 'danger' }]}
      >
        This cannot be undone.
      </AlertDialog>,
    );
    const dialog = screen.getByRole('alertdialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByRole('heading', { name: 'Delete file?' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  it('calls the action handler and does not close on backdrop click', async () => {
    const onDelete = vi.fn();
    const onClose = vi.fn();
    render(
      <AlertDialog
        isOpen
        onClose={onClose}
        title="Delete file?"
        actions={[{ label: 'Delete', onClick: onDelete, variant: 'danger' }]}
      >
        This cannot be undone.
      </AlertDialog>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(onDelete).toHaveBeenCalledTimes(1);

    await new Promise((resolve) => setTimeout(resolve, 0));
    const backdrop = document.querySelector('[class*="backdrop"]')!;
    fireEvent.pointerDown(backdrop);
    fireEvent.click(backdrop);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes on Escape', () => {
    const onClose = vi.fn();
    render(
      <AlertDialog
        isOpen
        onClose={onClose}
        title="Delete file?"
        actions={[{ label: 'Cancel', onClick: () => {} }]}
      >
        This cannot be undone.
      </AlertDialog>,
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('ContextMenu', () => {
  it('opens on right-click and closes after selecting an item', () => {
    const onEdit = vi.fn();
    render(
      <ContextMenu items={<MenuItem onClick={onEdit}>Edit</MenuItem>}>
        <div>Right-click area</div>
      </ContextMenu>,
    );
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    fireEvent.contextMenu(screen.getByText('Right-click area'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('menuitem', { name: 'Edit' }));
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});

describe('Menubar', () => {
  it('opens a menu on trigger click and selects an item', () => {
    const onSave = vi.fn();
    render(
      <Menubar
        menus={[
          { label: 'File', items: <MenuItem onClick={onSave}>Save</MenuItem> },
          { label: 'Edit', items: <MenuItem>Undo</MenuItem> },
        ]}
      />,
    );
    expect(screen.getByRole('menuitem', { name: 'File' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('menuitem', { name: 'File' }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Save' }));
    expect(onSave).toHaveBeenCalledTimes(1);
  });
});

describe('NavigationMenu', () => {
  it('renders plain links as anchors', () => {
    render(<NavigationMenu items={[{ label: 'Home', href: '/' }]} />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  });

  it('opens a dropdown panel on trigger click', () => {
    render(
      <NavigationMenu
        items={[{ label: 'Products', content: <p>Product list</p> }]}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Products' }));
    expect(screen.getByText('Product list')).toBeInTheDocument();
  });
});

describe('Combobox', () => {
  const items = [
    { value: 'us', label: 'United States' },
    { value: 'bd', label: 'Bangladesh' },
  ];

  it('filters items as the user types and reports selection', () => {
    const onChange = vi.fn();
    render(<Combobox label="Country" items={items} onChange={onChange} />);
    const input = screen.getByLabelText('Country');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.change(input, { target: { value: 'Bang' } });
    expect(screen.queryByRole('option', { name: 'United States' })).not.toBeInTheDocument();
    const option = screen.getByRole('option', { name: 'Bangladesh' });
    fireEvent.pointerDown(option);
    fireEvent.click(option);
    expect(onChange).toHaveBeenCalledWith('bd');
  });
});

describe('Autocomplete', () => {
  it('reports free-typed text even when it matches no suggestion', () => {
    const onChange = vi.fn();
    render(<Autocomplete label="City" items={['Dhaka', 'Berlin']} onChange={onChange} />);
    const input = screen.getByLabelText('City');
    fireEvent.change(input, { target: { value: 'Nowhere' } });
    expect(onChange).toHaveBeenCalledWith('Nowhere');
  });

  it('fills the input when a suggestion is clicked', () => {
    const onChange = vi.fn();
    render(<Autocomplete label="City" items={['Dhaka', 'Berlin']} onChange={onChange} />);
    const input = screen.getByLabelText('City');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.change(input, { target: { value: 'Dha' } });
    const option = screen.getByRole('option', { name: 'Dhaka' });
    fireEvent.pointerDown(option);
    fireEvent.click(option);
    expect(onChange).toHaveBeenCalledWith('Dhaka');
  });
});
