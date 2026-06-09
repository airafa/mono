import type { CSSProperties, ReactElement } from 'react';
import type {
  FormComponent,
  FormProps,
  TextInputProps,
  SelectProps,
  CheckboxProps,
  RadioGroupProps,
  TextAreaProps,
} from '@wsl-ad/ui-contracts';

const inputStyle: CSSProperties = {
  padding: '8px 12px',
  borderRadius: 'var(--radius-md, 12px)',
  border: '1px solid var(--color-outline, #839496)',
  fontFamily: 'var(--font-body-family, "Rubik", sans-serif)',
  fontSize: 'var(--font-body-size, 14px)',
  width: '100%',
  boxSizing: 'border-box',
};

const labelStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  fontFamily: 'var(--font-label-md-family, "Rubik", sans-serif)',
  fontSize: 'var(--font-label-md-size, 14px)',
  fontWeight: 'var(--font-label-md-weight, 500)' as CSSProperties['fontWeight'],
};

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
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md, 16px)' }}
    >
      {children}
      <button
        type="submit"
        disabled={loading}
        style={{
          padding: '10px 20px',
          borderRadius: 'var(--radius-md, 12px)',
          background: 'var(--color-primary, #268bd2)',
          color: 'var(--color-onPrimary, #fdf6e3)',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontFamily: 'var(--font-label-md-family, "Rubik", sans-serif)',
          fontWeight: 500,
        }}
      >
        Submit
      </button>
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
    <label style={labelStyle}>
      {label}
      {required && ' *'}
      <input
        id={id}
        name={name}
        type={type}
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        style={inputStyle}
      />
      {hint && (
        <span style={{ fontSize: '12px', color: 'var(--color-onSurfaceVariant, #586e75)' }}>
          {hint}
        </span>
      )}
      {error && (
        <span role="alert" style={{ fontSize: '12px', color: 'var(--color-error, #dc322f)' }}>
          {error.message}
        </span>
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
    <label style={labelStyle}>
      {label}
      {required && ' *'}
      <select
        id={id}
        name={name}
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        style={inputStyle}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </select>
      {hint && (
        <span style={{ fontSize: '12px', color: 'var(--color-onSurfaceVariant, #586e75)' }}>
          {hint}
        </span>
      )}
      {error && (
        <span role="alert" style={{ fontSize: '12px', color: 'var(--color-error, #dc322f)' }}>
          {error.message}
        </span>
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
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        fontFamily: 'var(--font-body-family, "Rubik", sans-serif)',
      }}
    >
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        style={{ accentColor: 'var(--color-primary, #268bd2)', width: '16px', height: '16px' }}
      />
      {label}
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
      <legend
        style={{
          fontFamily: 'var(--font-label-md-family, "Rubik", sans-serif)',
          fontWeight: 500,
          marginBlockEnd: '4px',
        }}
      >
        {legend}
      </legend>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {options.map((opt) => (
          <label
            key={opt.value}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-body-family, "Rubik", sans-serif)',
            }}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              disabled={disabled}
              style={{
                accentColor: 'var(--color-primary, #268bd2)',
                width: '16px',
                height: '16px',
              }}
            />
            {opt.label}
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
    <label style={labelStyle}>
      {label}
      {required && ' *'}
      <textarea
        id={id}
        name={name}
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        rows={rows}
        style={{ ...inputStyle, resize: 'vertical' }}
      />
      {hint && (
        <span style={{ fontSize: '12px', color: 'var(--color-onSurfaceVariant, #586e75)' }}>
          {hint}
        </span>
      )}
      {error && (
        <span role="alert" style={{ fontSize: '12px', color: 'var(--color-error, #dc322f)' }}>
          {error.message}
        </span>
      )}
    </label>
  );
}

export type { FormComponent };
