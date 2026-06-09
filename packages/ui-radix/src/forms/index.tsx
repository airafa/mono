import { Button, Text } from '@radix-ui/themes';
import type { ReactElement } from 'react';
import type {
  FormComponent,
  FormProps,
  TextInputProps,
  SelectProps,
  CheckboxProps,
  RadioGroupProps,
  TextAreaProps,
} from '@wsl-ad/ui-contracts';

export function Form({
  onSubmit,
  'aria-label': ariaLabel,
  children,
  loading,
  id,
}: FormProps): ReactElement {
  return (
    <form
      id={id}
      aria-label={ariaLabel}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({});
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
      {children}
      <Button type="submit" disabled={loading}>
        Submit
      </Button>
    </form>
  );
}

export function TextInput({
  id,
  name,
  label,
  value,
  onChange,
  error,
  required,
  disabled,
  hint,
  type = 'text',
}: TextInputProps): ReactElement {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <Text as="span" size="2" weight="medium">
        {label}
        {required && ' *'}
      </Text>
      <input
        id={id}
        name={name}
        type={type}
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--gray-6)' }}
      />
      {hint && (
        <Text size="1" color="gray">
          {hint}
        </Text>
      )}
      {error && (
        <Text size="1" color="red">
          {error.message}
        </Text>
      )}
    </label>
  );
}

export function Select({
  id,
  name,
  label,
  value,
  onChange,
  options,
  error,
  required,
  disabled,
  hint,
  placeholder,
}: SelectProps): ReactElement {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <Text as="span" size="2" weight="medium">
        {label}
        {required && ' *'}
      </Text>
      <select
        id={id}
        name={name}
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--gray-6)' }}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </select>
      {hint && (
        <Text size="1" color="gray">
          {hint}
        </Text>
      )}
      {error && (
        <Text size="1" color="red">
          {error.message}
        </Text>
      )}
    </label>
  );
}

export function Checkbox({
  id,
  name,
  label,
  checked,
  onChange,
  disabled,
}: CheckboxProps): ReactElement {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <Text as="span" size="2">
        {label}
      </Text>
    </label>
  );
}

export function RadioGroup({
  id,
  name,
  legend,
  options,
  value,
  onChange,
  disabled,
}: RadioGroupProps): ReactElement {
  return (
    <fieldset id={id} style={{ border: 'none', padding: 0, margin: 0 }}>
      <legend>
        <Text size="2" weight="medium">
          {legend}
        </Text>
      </legend>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
        {options.map((opt) => (
          <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              disabled={disabled}
            />
            <Text as="span" size="2">
              {opt.label}
            </Text>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function TextArea({
  id,
  name,
  label,
  value,
  onChange,
  error,
  required,
  disabled,
  hint,
  rows = 4,
}: TextAreaProps): ReactElement {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <Text as="span" size="2" weight="medium">
        {label}
        {required && ' *'}
      </Text>
      <textarea
        id={id}
        name={name}
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        rows={rows}
        style={{
          padding: '8px 12px',
          borderRadius: '6px',
          border: '1px solid var(--gray-6)',
          resize: 'vertical',
        }}
      />
      {hint && (
        <Text size="1" color="gray">
          {hint}
        </Text>
      )}
      {error && (
        <Text size="1" color="red">
          {error.message}
        </Text>
      )}
    </label>
  );
}

export type { FormComponent };
