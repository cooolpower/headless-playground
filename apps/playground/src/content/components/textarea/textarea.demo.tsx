'use client';

import { useState, createContext, useContext, useMemo } from 'react';
import { Textarea } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import { Input } from '@repo/ui';
import { Select } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import type { SelectOption } from '@repo/ui';
import * as styles from './textarea.demo.css';

// Textarea Controls Context
interface TextareaControlsContextType {
  injectStyles: boolean;
  setInjectStyles: (injectStyles: boolean) => void;
  value: string;
  setValue: (value: string) => void;
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
  maxLength: number | undefined;
  setMaxLength: (maxLength: number | undefined) => void;
  minLength: number | undefined;
  setMinLength: (minLength: number | undefined) => void;
  required: boolean;
  setRequired: (required: boolean) => void;
  rows: number | undefined;
  setRows: (rows: number | undefined) => void;
  cols: number | undefined;
  setCols: (cols: number | undefined) => void;
  resize: 'none' | 'both' | 'horizontal' | 'vertical';
  setResize: (resize: 'none' | 'both' | 'horizontal' | 'vertical') => void;
  autoResize: boolean;
  setAutoResize: (autoResize: boolean) => void;
}

const TextareaControlsContext =
  createContext<TextareaControlsContextType | null>(null);

// Provider
export function DemoTextareaBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);
  const [value, setValue] = useState('');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [disabled, setDisabled] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [placeholder, setPlaceholder] = useState('텍스트를 입력하세요...');
  const [clearable, setClearable] = useState(false);
  const [maxLength, setMaxLength] = useState<number | undefined>(undefined);
  const [minLength, setMinLength] = useState<number | undefined>(undefined);
  const [required, setRequired] = useState(false);
  const [rows, setRows] = useState<number | undefined>(undefined);
  const [cols, setCols] = useState<number | undefined>(undefined);
  const [resize, setResize] = useState<
    'none' | 'both' | 'horizontal' | 'vertical'
  >('vertical');
  const [autoResize, setAutoResize] = useState(false);

  const contextValue = useMemo(
    () => ({
      injectStyles,
      setInjectStyles,
      value,
      setValue,
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
      maxLength,
      setMaxLength,
      minLength,
      setMinLength,
      required,
      setRequired,
      rows,
      setRows,
      cols,
      setCols,
      resize,
      setResize,
      autoResize,
      setAutoResize,
    }),
    [
      injectStyles,
      value,
      size,
      disabled,
      readonly,
      placeholder,
      clearable,
      maxLength,
      minLength,
      required,
      rows,
      cols,
      resize,
      autoResize,
    ],
  );

  return (
    <TextareaControlsContext.Provider value={contextValue}>
      {children}
    </TextareaControlsContext.Provider>
  );
}

// 기본 Textarea (컨트롤러와 함께 사용될 컴포넌트)
export function DemoTextareaBasicWithControls() {
  const context = useContext(TextareaControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    injectStyles,
    value,
    size,
    disabled,
    readonly,
    placeholder,
    clearable,
    maxLength,
    minLength,
    required,
    rows,
    cols,
    resize,
    autoResize,
  } = context;

  return (
    <div
      className={`${styles.container} ${!injectStyles ? styles.textareaWrapperClass : ''}`}
    >
      <Textarea
        injectStyles={injectStyles}
        size={size}
        disabled={disabled}
        readonly={readonly}
        placeholder={placeholder}
        value={value}
        onChange={(val) => context.setValue(val)}
        clearable={clearable}
        maxLength={maxLength}
        minLength={minLength}
        required={required}
        rows={rows}
        cols={cols}
        resize={resize}
        autoResize={autoResize}
        className={injectStyles ? undefined : styles.textareaWrapper}
      />
      <p className={styles.valueDisplay}>
        현재 값: {value || '(비어있음)'} ({value.length}자)
      </p>
    </div>
  );
}

// Textarea Controls
export function DemoTextareaBasicControls() {
  const context = useContext(TextareaControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    injectStyles,
    setInjectStyles,
    value,
    setValue,
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
    maxLength,
    setMaxLength,
    minLength,
    setMinLength,
    required,
    setRequired,
    rows,
    setRows,
    cols,
    setCols,
    resize,
    setResize,
    autoResize,
    setAutoResize,
  } = context;

  const sizeOptions: SelectOption[] = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
  ];

  const resizeOptions: SelectOption[] = [
    { label: 'None', value: 'none' },
    { label: 'Both', value: 'both' },
    { label: 'Horizontal', value: 'horizontal' },
    { label: 'Vertical', value: 'vertical' },
  ];

  return (
    <Controls
      items={[
        {
          label: 'Inject Styles',
          control: (
            <Checkbox
              checked={injectStyles}
              onChange={(checked) => setInjectStyles(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '값 (Value)',
          control: (
            <Input
              type="text"
              value={value}
              onChange={setValue}
              placeholder="텍스트 입력"
              size="small"
            />
          ),
        },
        {
          label: '크기 (Size)',
          control: (
            <Select
              options={sizeOptions}
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
          label: 'Max Length',
          control: (
            <Input
              type="number"
              value={maxLength ? String(maxLength) : ''}
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
              value={minLength ? String(minLength) : ''}
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
        {
          label: 'Rows',
          control: (
            <Input
              type="number"
              value={rows ? String(rows) : ''}
              onChange={(val) => setRows(val ? Number(val) : undefined)}
              placeholder="기본값"
              size="small"
            />
          ),
        },
        {
          label: 'Cols',
          control: (
            <Input
              type="number"
              value={cols ? String(cols) : ''}
              onChange={(val) => setCols(val ? Number(val) : undefined)}
              placeholder="기본값"
              size="small"
            />
          ),
        },
        {
          label: 'Resize',
          control: (
            <Select
              options={resizeOptions}
              value={resize}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setResize(val as typeof resize);
                }
              }}
              placeholder="Resize 선택"
              size="small"
              disabled={autoResize}
            />
          ),
        },
        {
          label: '자동 크기 조절 (Auto Resize)',
          control: (
            <Checkbox
              checked={autoResize}
              onChange={(checked) => setAutoResize(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
      ]}
    />
  );
}

// 기본 예제들
export function DemoTextareaBasic() {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <Textarea
        placeholder="기본 텍스트 영역"
        value={value}
        onChange={setValue}
        className={styles.textareaWrapper}
      />
      <p className={styles.valueDisplay}>현재 값: {value || '(비어있음)'}</p>
    </div>
  );
}

export function DemoTextareaSizes() {
  const [smallValue, setSmallValue] = useState('');
  const [mediumValue, setMediumValue] = useState('');
  const [largeValue, setLargeValue] = useState('');

  return (
    <div className={styles.sizesContainer}>
      <div>
        <p className={styles.sectionTitle}>Small</p>
        <Textarea
          size="small"
          placeholder="Small 크기"
          value={smallValue}
          onChange={setSmallValue}
          className={styles.textareaWrapper}
        />
      </div>
      <div>
        <p className={styles.sectionTitle}>Medium</p>
        <Textarea
          size="medium"
          placeholder="Medium 크기"
          value={mediumValue}
          onChange={setMediumValue}
          className={styles.textareaWrapper}
        />
      </div>
      <div>
        <p className={styles.sectionTitle}>Large</p>
        <Textarea
          size="large"
          placeholder="Large 크기"
          value={largeValue}
          onChange={setLargeValue}
          className={styles.textareaWrapper}
        />
      </div>
    </div>
  );
}

export function DemoTextareaFeatures() {
  const [clearableValue, setClearableValue] = useState('지울 수 있는 텍스트');
  const [limitedValue, setLimitedValue] = useState('');

  return (
    <div className={styles.container}>
      <div>
        <p className={styles.sectionTitle}>Clearable</p>
        <Textarea
          placeholder="지우기 버튼이 있는 텍스트 영역"
          value={clearableValue}
          onChange={setClearableValue}
          clearable
          className={styles.textareaWrapper}
          clearButtonClassName={styles.clearButton}
        />
      </div>

      <div>
        <p className={styles.sectionTitle}>Max Length (100자 제한)</p>
        <Textarea
          placeholder="최대 100자까지 입력 가능"
          value={limitedValue}
          onChange={setLimitedValue}
          maxLength={100}
          className={styles.textareaWrapper}
        />
        <p className={styles.valueDisplay}>{limitedValue.length} / 100자</p>
      </div>
    </div>
  );
}

export function DemoTextareaResize() {
  const [noneValue, setNoneValue] = useState('');
  const [bothValue, setBothValue] = useState('');
  const [horizontalValue, setHorizontalValue] = useState('');
  const [verticalValue, setVerticalValue] = useState('');

  return (
    <div className={styles.container}>
      <div>
        <p className={styles.sectionTitle}>Resize: None</p>
        <Textarea
          placeholder="크기 조절 불가"
          value={noneValue}
          onChange={setNoneValue}
          resize="none"
          className={styles.textareaWrapper}
        />
      </div>

      <div>
        <p className={styles.sectionTitle}>Resize: Both</p>
        <Textarea
          placeholder="가로/세로 모두 조절 가능"
          value={bothValue}
          onChange={setBothValue}
          resize="both"
          className={styles.textareaWrapper}
        />
      </div>

      <div>
        <p className={styles.sectionTitle}>Resize: Horizontal</p>
        <Textarea
          placeholder="가로만 조절 가능"
          value={horizontalValue}
          onChange={setHorizontalValue}
          resize="horizontal"
          className={styles.textareaWrapper}
        />
      </div>

      <div>
        <p className={styles.sectionTitle}>Resize: Vertical (기본값)</p>
        <Textarea
          placeholder="세로만 조절 가능"
          value={verticalValue}
          onChange={setVerticalValue}
          resize="vertical"
          className={styles.textareaWrapper}
        />
      </div>
    </div>
  );
}

export function DemoTextareaStatus() {
  const [disabledValue, setDisabledValue] = useState('비활성화된 텍스트 영역');
  const [readonlyValue, setReadonlyValue] = useState('읽기 전용 텍스트 영역');

  return (
    <div className={styles.statusContainer}>
      <div>
        <p className={styles.sectionTitle}>Disabled</p>
        <Textarea
          value={disabledValue}
          onChange={setDisabledValue}
          disabled
          className={styles.textareaWrapper}
        />
      </div>

      <div>
        <p className={styles.sectionTitle}>Readonly</p>
        <Textarea
          value={readonlyValue}
          onChange={setReadonlyValue}
          readonly
          className={styles.textareaWrapper}
        />
      </div>
    </div>
  );
}

export function DemoTextareaAutoResize() {
  const [autoResizeValue, setAutoResizeValue] = useState('');

  return (
    <div className={styles.container}>
      <div>
        <p className={styles.sectionTitle}>Auto Resize</p>
        <Textarea
          placeholder="텍스트를 입력하면 자동으로 높이가 늘어납니다..."
          value={autoResizeValue}
          onChange={setAutoResizeValue}
          autoResize
          className={styles.textareaWrapper}
        />
        <p className={styles.valueDisplay}>
          텍스트를 입력하면 자동으로 높이가 조절됩니다.
        </p>
      </div>
    </div>
  );
}
