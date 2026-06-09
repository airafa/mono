import {
  TextInput as MTextInput,
  Select as MSelect,
  Checkbox as MCheckbox,
  Textarea as MTextarea,
  Button,
  Group,
} from '@mantine/core';
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
    >
      {children}
      <Group mt="md">
        <Button type="submit" loading={loading}>
          Submit
        </Button>
      </Group>
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
    <MTextInput
      id={id}
      name={name}
      label={label}
      value={value as string}
      onChange={(e) => onChange(e.currentTarget.value)}
      error={error?.message}
      required={required}
      disabled={disabled}
      description={hint}
      type={type}
    />
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
    <MSelect
      id={id}
      name={name}
      label={label}
      value={value as string}
      onChange={(v) => onChange(v ?? '')}
      data={options.map((o) => ({ value: o.value, label: o.label, disabled: o.disabled }))}
      error={error?.message}
      required={required}
      disabled={disabled}
      description={hint}
      placeholder={placeholder}
    />
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
    <MCheckbox
      id={id}
      name={name}
      label={label}
      checked={checked}
      onChange={(e) => onChange(e.currentTarget.checked)}
      disabled={disabled}
    />
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
      <legend>{legend}</legend>
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
          {opt.label}
        </label>
      ))}
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
  rows,
  resize = 'vertical',
}: TextAreaProps): ReactElement {
  return (
    <MTextarea
      id={id}
      name={name}
      label={label}
      value={value as string}
      onChange={(e) => onChange(e.currentTarget.value)}
      error={error?.message}
      required={required}
      disabled={disabled}
      description={hint}
      rows={rows}
      resize={resize}
    />
  );
}

export type { FormComponent };
