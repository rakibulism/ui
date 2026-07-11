import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';
import { useId, useState } from 'react';
import clsx from 'clsx';
import styles from './Combobox.module.css';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  /** Optional label rendered above the field. */
  label?: string;
  placeholder?: string;
  /** The full list of selectable options — filtered internally as the user types. */
  items: ComboboxOption[];
  /** Selected value (controlled). */
  value?: string | null;
  /** Uncontrolled initial selected value. */
  defaultValue?: string | null;
  /** Called with the newly selected value (or `null` if cleared). */
  onChange?: (value: string | null) => void;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
}

/**
 * A searchable dropdown — typing filters `items` to matching labels, and a
 * value must be picked from the list (free text alone won't be accepted).
 * For a field that accepts arbitrary text with suggestions, use
 * `Autocomplete` instead. Wraps Base UI `Combobox`.
 */
export function Combobox({
  label,
  placeholder,
  items,
  value,
  defaultValue,
  onChange,
  disabled,
  name,
  id,
  className,
}: ComboboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [inputValue, setInputValue] = useState('');
  const filter = ComboboxPrimitive.useFilter();
  const filteredItems = items.filter((item) => filter.contains(item.label, inputValue));

  return (
    <div className={clsx(styles.wrapper, className)}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <ComboboxPrimitive.Root
        items={filteredItems}
        value={value}
        defaultValue={defaultValue}
        onValueChange={(next) => onChange?.(next)}
        inputValue={inputValue}
        onInputValueChange={setInputValue}
        disabled={disabled}
        name={name}
      >
        <ComboboxPrimitive.InputGroup className={styles.inputGroup}>
          <ComboboxPrimitive.Input id={inputId} placeholder={placeholder} className={styles.input} />
          <ComboboxPrimitive.Icon className={styles.chevron}>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M5.5 7.5L10 12l4.5-4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ComboboxPrimitive.Icon>
        </ComboboxPrimitive.InputGroup>
        <ComboboxPrimitive.Portal>
          <ComboboxPrimitive.Positioner sideOffset={4} className={styles.positioner}>
            <ComboboxPrimitive.Popup className={styles.popup}>
              <ComboboxPrimitive.Empty className={styles.empty}>No results found.</ComboboxPrimitive.Empty>
              <ComboboxPrimitive.List>
                {(item: ComboboxOption) => (
                  <ComboboxPrimitive.Item
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled}
                    className={styles.item}
                  >
                    {item.label}
                  </ComboboxPrimitive.Item>
                )}
              </ComboboxPrimitive.List>
            </ComboboxPrimitive.Popup>
          </ComboboxPrimitive.Positioner>
        </ComboboxPrimitive.Portal>
      </ComboboxPrimitive.Root>
    </div>
  );
}
