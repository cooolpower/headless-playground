'use client';

import { useState, createContext, useContext, useEffect } from 'react';
import { Input } from '@repo/ui';
import { Select } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import type { SelectOption } from '@repo/ui';
import * as styles from './input.demo.css';

// Input Controls Context
interface InputControlsContextType {
  value: string;
  setValue: (value: string) => void;
  type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  setType: (
    type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search',
  ) => void;
  size: 'small' | 'medium' | 'large';
  setSize: (size: 'small' | 'medium' | 'large') => void;
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
  readonly: boolean;
  setReadonly: (readonly: boolean) => void;
  placeholder: string;
  setPlaceholder: (placeholder: string) => void;
  clearable: boolean;
  setClearable: (clearable: boolean) => void;
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
  maxLength: number | undefined;
  setMaxLength: (maxLength: number | undefined) => void;
  minLength: number | undefined;
  setMinLength: (minLength: number | undefined) => void;
  required: boolean;
  setRequired: (required: boolean) => void;
}

const InputControlsContext = createContext<InputControlsContextType | null>(
  null,
);

// Provider
export function DemoInputBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [value, setValue] = useState('');
  const [type, setType] = useState<
    'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
  >('text');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [disabled, setDisabled] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [placeholder, setPlaceholder] = useState('입력하세요...');
  const [clearable, setClearable] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [maxLength, setMaxLength] = useState<number | undefined>(undefined);
  const [minLength, setMinLength] = useState<number | undefined>(undefined);
  const [required, setRequired] = useState(false);

  return (
    <InputControlsContext.Provider
      value={{
        value,
        setValue,
        type,
        setType,
        size,
        setSize,
        disabled,
        setDisabled,
        readonly,
        setReadonly,
        placeholder,
        setPlaceholder,
        clearable,
        setClearable,
        showPassword,
        setShowPassword,
        maxLength,
        setMaxLength,
        minLength,
        setMinLength,
        required,
        setRequired,
      }}
    >
      {children}
    </InputControlsContext.Provider>
  );
}

// 기본 Input (컨트롤러와 함께 사용될 컴포넌트)
export function DemoInputBasicWithControls() {
  const context = useContext(InputControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    value,
    setValue,
    type,
    size,
    disabled,
    readonly,
    placeholder,
    clearable,
    showPassword,
    maxLength,
    minLength,
    required,
  } = context;

  return (
    <div className={styles.container}>
      <Input
        type={type}
        size={size}
        disabled={disabled}
        readonly={readonly}
        placeholder={placeholder}
        value={value}
        onChange={setValue}
        clearable={clearable}
        showPassword={showPassword}
        maxLength={maxLength}
        minLength={minLength}
        required={required}
        className={styles.inputWrapper}
      />
      <p className={styles.valueDisplay}>현재 값: {value || '(비어있음)'}</p>
    </div>
  );
}

// Input Controls
export function DemoInputBasicControls() {
  const context = useContext(InputControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    value,
    setValue,
    type,
    setType,
    size,
    setSize,
    disabled,
    setDisabled,
    readonly,
    setReadonly,
    placeholder,
    setPlaceholder,
    clearable,
    setClearable,
    showPassword,
    setShowPassword,
    maxLength,
    setMaxLength,
    minLength,
    setMinLength,
    required,
    setRequired,
  } = context;

  return (
    <Controls
      items={[
        {
          label: '값 (Value)',
          control: (
            <Input
              type="text"
              value={value}
              onChange={setValue}
              placeholder="값 입력"
              size="small"
            />
          ),
        },
        {
          label: '타입 (Type)',
          control: (
            <Select
              options={[
                { label: 'Text', value: 'text' },
                { label: 'Password', value: 'password' },
                { label: 'Email', value: 'email' },
                { label: 'Number', value: 'number' },
                { label: 'Tel', value: 'tel' },
                { label: 'URL', value: 'url' },
                { label: 'Search', value: 'search' },
              ]}
              value={type}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setType(val as typeof type);
                }
              }}
              placeholder="타입 선택"
              size="small"
            />
          ),
        },
        {
          label: '크기 (Size)',
          control: (
            <Select
              options={[
                { label: 'Small', value: 'small' },
                { label: 'Medium', value: 'medium' },
                { label: 'Large', value: 'large' },
              ]}
              value={size}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setSize(val as typeof size);
                }
              }}
              placeholder="크기 선택"
              size="small"
            />
          ),
        },
        {
          label: '비활성화 (Disabled)',
          control: (
            <Checkbox
              checked={disabled}
              onChange={(checked) => setDisabled(checked)}
              size="small"
            >
              비활성화
            </Checkbox>
          ),
        },
        {
          label: '읽기 전용 (Readonly)',
          control: (
            <Checkbox
              checked={readonly}
              onChange={(checked) => setReadonly(checked)}
              size="small"
            >
              읽기 전용
            </Checkbox>
          ),
        },
        {
          label: 'Placeholder',
          control: (
            <Input
              type="text"
              value={placeholder}
              onChange={setPlaceholder}
              placeholder="Placeholder 텍스트"
              size="small"
            />
          ),
        },
        {
          label: 'Clearable',
          control: (
            <Checkbox
              checked={clearable}
              onChange={(checked) => setClearable(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: 'Show Password',
          control: (
            <Checkbox
              checked={showPassword}
              onChange={(checked) => setShowPassword(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: 'Max Length',
          control: (
            <Input
              type="number"
              value={maxLength?.toString() ?? ''}
              onChange={(val) => setMaxLength(val ? Number(val) : undefined)}
              placeholder="제한 없음"
              size="small"
            />
          ),
        },
        {
          label: 'Min Length',
          control: (
            <Input
              type="number"
              value={minLength?.toString() ?? ''}
              onChange={(val) => setMinLength(val ? Number(val) : undefined)}
              placeholder="제한 없음"
              size="small"
            />
          ),
        },
        {
          label: 'Required',
          control: (
            <Checkbox
              checked={required}
              onChange={(checked) => setRequired(checked)}
              size="small"
            >
              필수
            </Checkbox>
          ),
        },
      ]}
    />
  );
}

// 기존 예제들 (props 조합으로만 차별화)
export function DemoInputBasic() {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <Input
        placeholder="Basic text input"
        value={value}
        onChange={setValue}
        className={styles.inputWrapper}
      />
      <p className={styles.valueDisplay}>Current value: {value}</p>
    </div>
  );
}

export function DemoInputFeatures() {
  const [clearableValue, setClearableValue] = useState('Clear me!');

  return (
    <div className={styles.container}>
      <Input
        placeholder="Input with clear button"
        value={clearableValue}
        onChange={setClearableValue}
        clearable
        className={styles.inputWrapper}
        clearButtonClassName={styles.clearButton}
      />

      <Input
        type="password"
        placeholder="Password with show/hide"
        showPassword
        className={styles.inputWrapper}
        passwordToggleClassName={styles.passwordToggleButton}
      />

      <Input
        placeholder="Limited to 20 characters"
        maxLength={20}
        className={styles.inputWrapper}
      />
    </div>
  );
}
