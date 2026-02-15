'use client';

import { useState, createContext, useContext } from 'react';
import { Radio, RadioGroup } from '@repo/ui';
import { Select } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Input } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import type { SelectOption } from '@repo/ui';
import * as styles from './radio.demo.css';

// Radio Controls Context
interface RadioControlsContextType {
  injectStyles: boolean;
  setInjectStyles: (injectStyles: boolean) => void;
  value: string | number;
  setValue: (value: string | number) => void;
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
  size: 'small' | 'medium' | 'large';
  setSize: (size: 'small' | 'medium' | 'large') => void;
  option1Label: string;
  setOption1Label: (label: string) => void;
  option2Label: string;
  setOption2Label: (label: string) => void;
  option3Label: string;
  setOption3Label: (label: string) => void;
}

const RadioControlsContext = createContext<RadioControlsContextType | null>(
  null,
);

// Provider
export function DemoRadioBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);
  const [value, setValue] = useState<string | number>('option1');
  const [disabled, setDisabled] = useState(false);
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [option1Label, setOption1Label] = useState('Radio 1');
  const [option2Label, setOption2Label] = useState('Radio 2');
  const [option3Label, setOption3Label] = useState('Radio 3');

  return (
    <RadioControlsContext.Provider
      value={{
        injectStyles,
        setInjectStyles,
        value,
        setValue,
        disabled,
        setDisabled,
        size,
        setSize,
        option1Label,
        setOption1Label,
        option2Label,
        setOption2Label,
        option3Label,
        setOption3Label,
      }}
    >
      {children}
    </RadioControlsContext.Provider>
  );
}

// 기본 Radio (컨트롤러와 함께 사용될 컴포넌트)
export function DemoRadioBasicWithControls() {
  const context = useContext(RadioControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    injectStyles,
    value,
    setValue,
    disabled,
    size,
    option1Label,
    option2Label,
    option3Label,
  } = context;

  return (
    <div
      className={`${styles.section} ${!injectStyles ? styles.radioWrapperClass : ''}`}
    >
      <div className={styles.content}>
        <RadioGroup
          injectStyles={injectStyles}
          value={value}
          onChange={setValue}
          disabled={disabled}
        >
          <Radio value="option1" size={size}>
            {option1Label}
          </Radio>
          <Radio value="option2" size={size}>
            {option2Label}
          </Radio>
          <Radio value="option3" size={size}>
            {option3Label}
          </Radio>
        </RadioGroup>
        <p className={styles.status}>선택된 값: {value}</p>
      </div>
    </div>
  );
}

// Radio Controls
export function DemoRadioBasicControls() {
  const context = useContext(RadioControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    injectStyles,
    setInjectStyles,
    value,
    setValue,
    disabled,
    setDisabled,
    size,
    setSize,
    option1Label,
    setOption1Label,
    option2Label,
    setOption2Label,
    option3Label,
    setOption3Label,
  } = context;

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
          label: '선택된 값 (Value)',
          control: (
            <Select
              options={[
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
              ]}
              value={String(value)}
              onChange={(val) => {
                if (!Array.isArray(val) && val !== undefined) {
                  setValue(val);
                }
              }}
              placeholder="값 선택"
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
          label: 'Option 1 라벨',
          control: (
            <Input
              type="text"
              value={option1Label}
              onChange={setOption1Label}
              placeholder="Option 1 라벨"
              size="small"
            />
          ),
        },
        {
          label: 'Option 2 라벨',
          control: (
            <Input
              type="text"
              value={option2Label}
              onChange={setOption2Label}
              placeholder="Option 2 라벨"
              size="small"
            />
          ),
        },
        {
          label: 'Option 3 라벨',
          control: (
            <Input
              type="text"
              value={option3Label}
              onChange={setOption3Label}
              placeholder="Option 3 라벨"
              size="small"
            />
          ),
        },
      ]}
    />
  );
}

// 기존 예제들 (props 조합으로만 차별화)
export function DemoRadioBasic() {
  const [value, setValue] = useState<string | number>('option1');

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <RadioGroup value={value} onChange={setValue}>
          <Radio value="option1">Radio 1</Radio>
          <Radio value="option2">Radio 2</Radio>
        </RadioGroup>
      </div>
    </div>
  );
}

export function DemoRadioGroup() {
  const [value, setValue] = useState<string | number>('option1');

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <RadioGroup value={value} onChange={setValue}>
          <Radio value="option1">Radio 1</Radio>
          <Radio value="option2">Radio 2</Radio>
          <Radio value="option3">Radio 3</Radio>
        </RadioGroup>
        <p className={styles.status}>선택된 값: {value}</p>
      </div>
    </div>
  );
}

export function DemoRadioDefaultValue() {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <RadioGroup defaultValue="option2">
          <Radio value="option1">Radio 1</Radio>
          <Radio value="option2">Radio 2</Radio>
          <Radio value="option3">Radio 3</Radio>
        </RadioGroup>
      </div>
    </div>
  );
}

export function DemoRadioDisabled() {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <RadioGroup>
          <Radio value="option1" disabled>
            Disabled Radio 1
          </Radio>
          <Radio value="option2" disabled>
            Disabled Radio 2
          </Radio>
          <Radio value="option3">Enabled Radio 3</Radio>
        </RadioGroup>
      </div>
    </div>
  );
}

export function DemoRadioDisabledGroup() {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <RadioGroup disabled>
          <Radio value="option1">Radio 1</Radio>
          <Radio value="option2">Radio 2</Radio>
          <Radio value="option3">Radio 3</Radio>
        </RadioGroup>
      </div>
    </div>
  );
}

export function DemoRadioSizes() {
  const [value, setValue] = useState<string | number>('small');

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <RadioGroup value={value} onChange={setValue}>
          <Radio value="small" size="small">
            Small
          </Radio>
          <Radio value="medium" size="medium">
            Medium
          </Radio>
          <Radio value="large" size="large">
            Large
          </Radio>
        </RadioGroup>
      </div>
    </div>
  );
}

export function DemoRadioButtonStyle() {
  const [value, setValue] = useState<string | number>('option1');

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <RadioGroup
          value={value}
          onChange={setValue}
          className={styles.radioGroup}
        >
          <Radio value="option1">Option 1</Radio>
          <Radio value="option2">Option 2</Radio>
          <Radio value="option3">Option 3</Radio>
        </RadioGroup>
        <p className={styles.status}>선택된 값: {value}</p>
      </div>
    </div>
  );
}

export function DemoRadioCustomLabel() {
  const [value, setValue] = useState<string | number>('option1');

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <RadioGroup value={value} onChange={setValue}>
          <Radio value="option1">
            <div>
              <div style={{ fontWeight: '600' }}>Custom Label 1</div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                }}
              >
                Description text
              </div>
            </div>
          </Radio>
          <Radio value="option2">
            <div>
              <div style={{ fontWeight: '600' }}>Custom Label 2</div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                }}
              >
                Another description
              </div>
            </div>
          </Radio>
        </RadioGroup>
      </div>
    </div>
  );
}
