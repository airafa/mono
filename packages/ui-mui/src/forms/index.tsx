import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiCheckbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MuiRadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
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
      <Button type="submit" disabled={loading} variant="contained" sx={{ mt: 2 }}>
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
    <TextField
      id={id}
      name={name}
      label={label}
      value={value as string}
      onChange={(e) => onChange(e.target.value)}
      error={!!error}
      helperText={error?.message ?? hint}
      required={required}
      disabled={disabled}
      type={type}
      fullWidth
      margin="normal"
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
    <TextField
      select
      id={id}
      name={name}
      label={label}
      value={value as string}
      onChange={(e) => onChange(e.target.value)}
      error={!!error}
      helperText={error?.message ?? hint}
      required={required}
      disabled={disabled}
      fullWidth
      margin="normal"
    >
      {placeholder && <MenuItem value="">{placeholder}</MenuItem>}
      {options.map((o) => (
        <MenuItem key={o.value} value={o.value} disabled={o.disabled}>
          {o.label}
        </MenuItem>
      ))}
    </TextField>
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
    <FormControlLabel
      control={
        <MuiCheckbox
          id={id}
          name={name}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
      }
      label={label}
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
    <FormControl component="fieldset" id={id} disabled={disabled}>
      <FormLabel component="legend">{legend}</FormLabel>
      <MuiRadioGroup name={name} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => (
          <FormControlLabel
            key={opt.value}
            value={opt.value}
            control={<Radio />}
            label={opt.label}
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
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
    <TextField
      id={id}
      name={name}
      label={label}
      value={value as string}
      onChange={(e) => onChange(e.target.value)}
      error={!!error}
      helperText={error?.message ?? hint}
      required={required}
      disabled={disabled}
      multiline
      rows={rows}
      fullWidth
      margin="normal"
    />
  );
}

export type { FormComponent };
