import type { ReactNode } from 'react';

// Zod schema 타입 (optional dependency)
type ZodSchema = any; // zod가 설치되어 있지 않을 수 있으므로 any로 처리

export interface FormProps<T = any> {
  children: ReactNode;
  form?: FormInstance<T>;
  initialValues?: T;
  onFinish?: (values: T) => void;
  onFinishFailed?: (errors: FormErrors) => void;
  onValuesChange?: (changedValues: Partial<T>, allValues: T) => void;
  validateTrigger?: 'onChange' | 'onBlur' | 'onSubmit';
  layout?: 'horizontal' | 'vertical' | 'inline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  onFormReady?: (form: FormInstance<T>) => void;
  injectStyles?: boolean;
}

export interface FormItemProps {
  children: ReactNode;
  name?: string | string[];
  label?: ReactNode;
  rules?: FormRule[];
  /** Zod schema for validation (optional - requires zod package) */
  zodSchema?: ZodSchema;
  required?: boolean;
  tooltip?: ReactNode;
  help?: ReactNode;
  validateStatus?: 'success' | 'warning' | 'error' | 'validating';
  hasFeedback?: boolean;
  className?: string;
  injectStyles?: boolean;
  /** Class name for the label wrapper div */
  labelClassName?: string;
  /** Class name for the input wrapper div */
  inputWrapperClassName?: string;
  /** Class name for the required mark */
  requiredMarkClassName?: string;
  /** Class name for the form item control wrapper (input + feedback icon) */
  formItemControlClassName?: string;
  /** Class name for the input wrapper div (Input 컴포넌트의 wrapper) */
  formItemControlInputClassName?: string;
  /** Class name for the feedback status icon */
  formItemControlStatusClassName?: string;
  /** Class name for the help/error message wrapper */
  formItemHelpClassName?: string;
  /** Status별 클래스명 객체 (텍스트 색상, Input border 색상 등에 사용) */
  statusClassNames?: {
    error?: string;
    success?: string;
    warning?: string;
    validating?: string;
  };
}

export interface FormRule {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  min?: number;
  max?: number;
  len?: number;
  validator?: (
    rule: FormRule,
    value: any,
    callback: (error?: string) => void
  ) => void;
  whitespace?: boolean;
  type?: 'string' | 'number' | 'boolean' | 'array' | 'object';
}

export interface FormErrors {
  [key: string]: string[];
}

export interface FormInstance<T = any> {
  getFieldValue: (name: string | string[]) => any;
  getFieldsValue: (nameList?: string[] | string[][]) => T;
  setFieldValue: (name: string | string[], value: any) => void;
  setFieldsValue: (values: Partial<T>) => void;
  resetFields: (fields?: string[] | string[][]) => void;
  validateFields: (nameList?: string[] | string[][]) => Promise<T>;
  submit: () => void;
  isFieldTouched: (name: string | string[]) => boolean;
  isFieldsTouched: (nameList?: string[] | string[][]) => boolean;
}

export interface UseFormProps<T = any> {
  initialValues?: T;
  onFinish?: (values: T) => void;
  onFinishFailed?: (errors: FormErrors) => void;
  onValuesChange?: (changedValues: Partial<T>, allValues: T) => void;
  validateTrigger?: 'onChange' | 'onBlur' | 'onSubmit';
}

export interface UseFormReturn<T = any> {
  form: FormInstance<T>;
  formContext: FormContextValue;
}

export interface FormContextValue {
  getFieldValue: (name: string | string[]) => any;
  setFieldValue: (name: string | string[], value: any) => void;
  validateField: (name: string | string[]) => Promise<void>;
  registerField: (name: string | string[], field: FormFieldInstance) => void;
  unregisterField: (name: string | string[]) => void;
  getFieldError: (name: string | string[]) => string[];
  setFieldError: (name: string | string[], errors: string[]) => void;
  getFieldsError: () => FormErrors;
}

export interface FormFieldInstance {
  validate: () => Promise<void>;
  getValue: () => any;
  setValue: (value: any) => void;
  getErrors: () => string[];
  setErrors: (errors: string[]) => void;
  isTouched: () => boolean;
  setTouched: (touched: boolean) => void;
}
