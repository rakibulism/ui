import { describe, expect, it, vi } from 'vitest';
import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Checkbox } from '../Checkbox/Checkbox';
import { CheckboxGroup } from '../CheckboxGroup/CheckboxGroup';
import { Radio, RadioGroup } from '../Radio/Radio';
import { Switch } from '../Switch/Switch';
import { Textarea } from '../Textarea/Textarea';
import { Select } from '../Select/Select';
import { Toggle } from '../Toggle/Toggle';
import { ToggleGroup } from '../ToggleGroup/ToggleGroup';
import { Fieldset } from '../Fieldset/Fieldset';
import { Slider } from '../Slider/Slider';
import { NumberField } from '../NumberField/NumberField';
import { OtpField } from '../OtpField/OtpField';

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

describe('Toggle', () => {
  it('toggles aria-pressed on click', () => {
    render(<Toggle>Bold</Toggle>);
    const toggle = screen.getByRole('button', { name: 'Bold' });
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
  });

  it('supports controlled usage via pressed/onPressedChange', () => {
    const onPressedChange = vi.fn();
    render(
      <Toggle pressed={false} onPressedChange={onPressedChange}>
        Bold
      </Toggle>,
    );
    const toggle = screen.getByRole('button', { name: 'Bold' });
    fireEvent.click(toggle);
    expect(onPressedChange).toHaveBeenCalledWith(true, expect.anything());
    // still controlled by `pressed`, so it doesn't flip on its own
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
  });
});

describe('ToggleGroup', () => {
  it('single-select mode: pressing one un-presses the others', () => {
    render(
      <ToggleGroup defaultValue={['left']}>
        <Toggle value="left">Left</Toggle>
        <Toggle value="center">Center</Toggle>
      </ToggleGroup>,
    );
    const left = screen.getByRole('button', { name: 'Left' });
    const center = screen.getByRole('button', { name: 'Center' });
    expect(left).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(center);
    expect(center).toHaveAttribute('aria-pressed', 'true');
    expect(left).toHaveAttribute('aria-pressed', 'false');
  });

  it('multiple mode allows more than one pressed toggle at once', () => {
    render(
      <ToggleGroup multiple defaultValue={['bold']}>
        <Toggle value="bold">Bold</Toggle>
        <Toggle value="italic">Italic</Toggle>
      </ToggleGroup>,
    );
    const bold = screen.getByRole('button', { name: 'Bold' });
    const italic = screen.getByRole('button', { name: 'Italic' });
    fireEvent.click(italic);
    expect(bold).toHaveAttribute('aria-pressed', 'true');
    expect(italic).toHaveAttribute('aria-pressed', 'true');
  });
});

describe('Fieldset', () => {
  it('renders a fieldset with its legend', () => {
    render(
      <Fieldset legend="Shipping address">
        <Textarea label="Street" />
      </Fieldset>,
    );
    expect(screen.getByRole('group', { name: 'Shipping address' })).toBeInTheDocument();
  });
});

describe('CheckboxGroup', () => {
  function Controlled() {
    const [value, setValue] = useState<string[]>(['read']);
    return (
      <CheckboxGroup label="Permissions" value={value} onChange={setValue}>
        <Checkbox value="read" label="Read" />
        <Checkbox value="write" label="Write" />
      </CheckboxGroup>
    );
  }

  it('reflects the group value and toggles items in/out of the array', () => {
    render(<Controlled />);
    const read = screen.getByRole('checkbox', { name: 'Read' });
    const write = screen.getByRole('checkbox', { name: 'Write' });
    expect(read).toBeChecked();
    expect(write).not.toBeChecked();
    fireEvent.click(write);
    expect(write).toBeChecked();
    fireEvent.click(read);
    expect(read).not.toBeChecked();
  });

  it('exposes role="group" labelled by its heading', () => {
    render(
      <CheckboxGroup label="Perms" value={[]} onChange={() => {}}>
        <Checkbox value="a" label="A" />
      </CheckboxGroup>,
    );
    expect(screen.getByRole('group', { name: 'Perms' })).toBeInTheDocument();
  });
});

describe('Slider', () => {
  it('renders a labelled slider at the given value', () => {
    render(<Slider label="Volume" defaultValue={40} />);
    const slider = screen.getByRole('slider', { name: 'Volume' });
    expect(slider).toHaveAttribute('aria-valuenow', '40');
  });

  it('steps the value on ArrowRight', () => {
    const onChange = vi.fn();
    render(<Slider label="Volume" defaultValue={40} step={5} onChange={onChange} />);
    const slider = screen.getByRole('slider', { name: 'Volume' });
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith(45);
  });
});

describe('NumberField', () => {
  it('renders a labelled input at the given value', () => {
    render(<NumberField label="Quantity" defaultValue={3} />);
    expect(screen.getByRole('textbox', { name: 'Quantity' })).toHaveValue('3');
  });

  it('increments and decrements via the stepper buttons', () => {
    const onChange = vi.fn();
    render(<NumberField label="Quantity" defaultValue={3} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Increase' }));
    expect(onChange).toHaveBeenCalledWith(4);
    fireEvent.click(screen.getByRole('button', { name: 'Decrease' }));
    expect(onChange).toHaveBeenCalledWith(3);
  });
});

describe('OtpField', () => {
  it('renders the requested number of character slots', () => {
    render(<OtpField label="Code" length={4} />);
    expect(screen.getAllByRole('textbox')).toHaveLength(4);
  });

  it('calls onChange as the user types into a slot', () => {
    const onChange = vi.fn();
    render(<OtpField label="Code" length={4} onChange={onChange} />);
    const slots = screen.getAllByRole('textbox');
    fireEvent.change(slots[0], { target: { value: '1' } });
    expect(onChange).toHaveBeenCalled();
  });
});
