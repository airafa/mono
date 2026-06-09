import type { ComponentType, ReactNode } from 'react';

export interface FormFieldError {
  message: string;
  type?: 'required' | 'pattern' | 'min' | 'max' | 'custom';
}

export interface FormFieldProps {
  /** REQUIRED — for label association via `htmlFor` */
  id: string;
  name: string;
  label: string;
  value: unknown;
  onChange: (value: unknown) => void;
  error?: FormFieldError;
  required?: boolean;
  disabled?: boolean;
  'aria-describedby'?: string;
  hint?: string;
}

export interface FormProps {
  onSubmit: (values: Record<string, unknown>) => void;
  /** REQUIRED — accessible name for the form */
  'aria-label': string;
  children: ReactNode;
  loading?: boolean;
  id?: string;
}

export type FormComponent = ComponentType<FormProps>;

// --- Form controls ---

export interface TextInputProps extends FormFieldProps {
  type?: 'text' | 'email' | 'password' | 'search' | 'url' | 'tel';
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends FormFieldProps {
  options: SelectOption[];
  placeholder?: string;
}

export interface CheckboxProps {
  /** REQUIRED — for label association */
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  'aria-describedby'?: string;
}

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  /** REQUIRED */
  id: string;
  name: string;
  /** REQUIRED — accessible group label via `<fieldset>` / `<legend>` */
  legend: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  'aria-describedby'?: string;
}

export interface TextAreaProps extends FormFieldProps {
  rows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}
