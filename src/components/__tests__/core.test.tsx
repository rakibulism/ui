import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Card } from '../Card/Card';

describe('Button', () => {
  it('renders children and defaults to type="button"', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toHaveAttribute('type', 'button');
  });

  it('applies variant and size classes', () => {
    render(
      <Button variant="danger" size="lg">
        Delete
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button.className).toContain('danger');
    expect(button.className).toContain('lg');
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('disables interaction and sets aria-busy while loading', () => {
    const onClick = vi.fn();
    render(
      <Button isLoading onClick={onClick}>
        Saving
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('supports isDisabled and the native disabled prop', () => {
    const { rerender } = render(<Button isDisabled>A</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    rerender(<Button disabled>A</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

describe('Input', () => {
  it('associates the label with the input', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('shows helper text wired via aria-describedby', () => {
    render(<Input label="Email" helperText="We never share it" />);
    const input = screen.getByLabelText('Email');
    const message = screen.getByText('We never share it');
    expect(input).toHaveAttribute('aria-describedby', message.id);
  });

  it('shows the error instead of helper text and sets aria-invalid', () => {
    render(<Input label="Email" helperText="Helper" error="Required" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(screen.queryByText('Helper')).not.toBeInTheDocument();
  });

  it('forwards value changes', () => {
    const onChange = vi.fn();
    render(<Input label="Name" value="" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Ada' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});

describe('Card', () => {
  it('renders children with the variant class', () => {
    render(<Card variant="outlined">Content</Card>);
    const card = screen.getByText('Content');
    expect(card.className).toContain('outlined');
  });

  it('defaults to the elevated variant', () => {
    render(<Card>Content</Card>);
    expect(screen.getByText('Content').className).toContain('elevated');
  });
});
