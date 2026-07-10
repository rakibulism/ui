import * as SelectPrimitive from '@radix-ui/react-select';
import { Children, forwardRef, isValidElement, useId, type ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Select.module.css';

export interface SelectProps {
  /** Optional label rendered above the select. */
  label?: string;
  /** Error message rendered below the select; also styles the field red. */
  error?: string;
  /** Helper text rendered below the select when there is no error. */
  helperText?: string;
  /** Shown in the trigger when nothing is selected. */
  placeholder?: string;
  /** `<option>` elements, same as a native select. */
  children: ReactNode;
  value?: string;
  defaultValue?: string;
  /** Called with the newly selected value (not a change event — Radix's underlying listbox isn't a native `<select>`). */
  onChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  id?: string;
  className?: string;
}

interface OptionData {
  value: string;
  disabled?: boolean;
  label: ReactNode;
}

function optionsFromChildren(children: ReactNode): OptionData[] {
  return Children.toArray(children).flatMap((child) => {
    if (!isValidElement(child) || child.type !== 'option') return [];
    const props = child.props as { value?: string; disabled?: boolean; children?: ReactNode };
    // A native <option> with no `value` attribute defaults to its text
    // content, same as the browser does — Radix Select.Item also rejects
    // an empty-string value (reserved to mean "no selection").
    const value = props.value ?? (typeof props.children === 'string' ? props.children : '');
    return [{ value: String(value), disabled: props.disabled, label: props.children }];
  });
}

/**
 * A styled listbox — pass `<option>` elements as children as usual. Wraps
 * Radix `Select`, trading the native `<select>` (and its platform mobile
 * picker UI) for a fully custom, consistently-styled listbox across
 * browsers/OSes. `onChange` now receives the selected value directly
 * rather than a native change event.
 */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    label,
    error,
    helperText,
    placeholder,
    children,
    value,
    defaultValue,
    onChange,
    disabled,
    name,
    required,
    id,
    className,
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;
  const hasError = Boolean(error);
  const message = error ?? helperText;
  const options = optionsFromChildren(children);

  return (
    <div className={clsx(styles.wrapper, className)}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}
      <SelectPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onChange}
        disabled={disabled}
        name={name}
        required={required}
      >
        <SelectPrimitive.Trigger
          ref={ref}
          id={inputId}
          className={clsx(styles.select, hasError && styles.hasError)}
          aria-invalid={hasError || undefined}
          aria-describedby={message ? messageId : undefined}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon className={styles.chevron} asChild>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M5.5 7.5L10 12l4.5-4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className={styles.menu}>
            <SelectPrimitive.Viewport className={styles.viewport}>
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={styles.item}
                >
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {message && (
        <span id={messageId} className={hasError ? styles.errorText : styles.helperText}>
          {message}
        </span>
      )}
    </div>
  );
});
