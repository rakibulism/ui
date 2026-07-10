import { describe, expect, it, vi } from 'vitest';
import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Checkbox } from '../Checkbox/Checkbox';
import { Radio, RadioGroup } from '../Radio/Radio';
import { Switch } from '../Switch/Switch';
import { Textarea } from '../Textarea/Textarea';
import { Select } from '../Select/Select';

describe('Checkbox', () => {
  it('toggles via its label', () => {
    render(<Checkbox label="Subscribe" />);
    const checkbox = screen.getByRole('checkbox', { name: 'Subscribe' });
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('shows an error message and marks the input invalid', () => {
    render(<Checkbox label="Terms" error="You must accept" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(checkbox).toHaveAttribute(
      'aria-describedby',
      screen.getByText('You must accept').id,
    );
  });
});

describe('Radio / RadioGroup', () => {
  function Controlled() {
    const [plan, setPlan] = useState('free');
    return (
      <RadioGroup name="plan" value={plan} onChange={setPlan}>
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>
    );
  }

  it('reflects the group value and updates on selection', () => {
    render(<Controlled />);
    const free = screen.getByRole('radio', { name: 'Free' });
    const pro = screen.getByRole('radio', { name: 'Pro' });
    expect(free).toBeChecked();
    expect(pro).not.toBeChecked();
    fireEvent.click(pro);
    expect(pro).toBeChecked();
    expect(free).not.toBeChecked();
  });

  it('applies the group name to every radio', () => {
    render(
      <RadioGroup name="tier" value="a" onChange={() => {}}>
        <Radio value="a" label="A" />
        <Radio value="b" label="B" />
      </RadioGroup>,
    );
    for (const radio of screen.getAllByRole('radio')) {
      expect(radio).toHaveAttribute('name', 'tier');
    }
  });

  it('exposes role="radiogroup"', () => {
    render(
      <RadioGroup name="g" value="x" onChange={() => {}}>
        <Radio value="x" label="X" />
      </RadioGroup>,
    );
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });
});

describe('Switch', () => {
  it('renders as a switch and toggles', () => {
    render(<Switch label="Notifications" />);
    const toggle = screen.getByRole('switch', { name: 'Notifications' });
    expect(toggle).not.toBeChecked();
    fireEvent.click(toggle);
    expect(toggle).toBeChecked();
  });

  it('respects disabled', () => {
    // fireEvent bypasses the browser's disabled-input activation blocking,
    // so assert the disabled attribute rather than simulating a click.
    render(<Switch label="Off" disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });
});

describe('Textarea', () => {
  it('associates the label and shows error state', () => {
    render(<Textarea label="Bio" error="Too short" />);
    const textarea = screen.getByLabelText('Bio');
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Too short')).toBeInTheDocument();
  });
});

// Select now wraps Base UI's custom listbox instead of a native <select>,
// so interaction is: click the trigger (role="combobox") to open, then
// select an option (role="option"). onChange receives the selected value
// directly rather than a native change event. Base UI's Item only commits
// a plain click as a real selection if a pointerdown preceded it (its
// "was this an intentional click, not a stray one from the trigger open"
// guard), so tests fire pointerDown before click, matching a real click.
describe('Select', () => {
  it('renders options and reports changes', async () => {
    const onChange = vi.fn();
    render(
      <Select label="Country" defaultValue="us" onChange={onChange}>
        <option value="us">United States</option>
        <option value="bd">Bangladesh</option>
      </Select>,
    );
    const trigger = screen.getByLabelText('Country');
    expect(trigger).toHaveTextContent('United States');
    fireEvent.click(trigger);
    const option = await screen.findByRole('option', { name: 'Bangladesh' });
    fireEvent.pointerDown(option);
    fireEvent.click(option);
    expect(onChange).toHaveBeenCalledWith('bd');
    expect(trigger).toHaveTextContent('Bangladesh');
  });

  it('shows helper text when there is no error', () => {
    render(
      <Select label="Choice" helperText="Pick one">
        <option>A</option>
      </Select>,
    );
    expect(screen.getByText('Pick one')).toBeInTheDocument();
  });
});
