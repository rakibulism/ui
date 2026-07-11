import { Autocomplete as AutocompletePrimitive } from '@base-ui/react/autocomplete';
import { useId } from 'react';
import clsx from 'clsx';
import styles from './Autocomplete.module.css';

export interface AutocompleteProps {
  /** Optional label rendered above the field. */
  label?: string;
  placeholder?: string;
  /** Suggestions shown below the input, filtered as the user types. */
  items: string[];
  /** The free-text input value (controlled). */
  value?: string;
  /** Uncontrolled initial input value. */
  defaultValue?: string;
  /** Called with the input's text on every change, including free typing. */
  onChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
}

/**
 * A free-text input with a filtered suggestion list — unlike `Combobox`,
 * the user isn't required to pick a suggestion; any typed text is a valid
 * value. Wraps Base UI `Autocomplete`.
 */
export function Autocomplete({
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
}: AutocompleteProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={clsx(styles.wrapper, className)}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <AutocompletePrimitive.Root
        items={items}
        value={value}
        defaultValue={defaultValue}
        onValueChange={(next) => onChange?.(next)}
        disabled={disabled}
        name={name}
      >
        <AutocompletePrimitive.InputGroup className={styles.inputGroup}>
          <AutocompletePrimitive.Input id={inputId} placeholder={placeholder} className={styles.input} />
        </AutocompletePrimitive.InputGroup>
        <AutocompletePrimitive.Portal>
          <AutocompletePrimitive.Positioner sideOffset={4} className={styles.positioner}>
            <AutocompletePrimitive.Popup className={styles.popup}>
              <AutocompletePrimitive.Empty className={styles.empty}>No matches.</AutocompletePrimitive.Empty>
              <AutocompletePrimitive.List>
                {(item: string) => (
                  <AutocompletePrimitive.Item key={item} value={item} className={styles.item}>
                    {item}
                  </AutocompletePrimitive.Item>
                )}
              </AutocompletePrimitive.List>
            </AutocompletePrimitive.Popup>
          </AutocompletePrimitive.Positioner>
        </AutocompletePrimitive.Portal>
      </AutocompletePrimitive.Root>
    </div>
  );
}
