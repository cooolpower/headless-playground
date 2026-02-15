'use client';

import React, { useState, createContext, useContext } from 'react';
import { InputNumber } from '@repo/ui';
import { Input } from '@repo/ui';
import { Select } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import type { SelectOption } from '@repo/ui';
import * as styles from './input-number.demo.css';

// InputNumber Controls Context
interface InputNumberControlsContextType {
  min: number | undefined;
  setMin: (min: number | undefined) => void;
  max: number | undefined;
  setMax: (max: number | undefined) => void;
  step: number;
  setStep: (step: number) => void;
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
  size: 'small' | 'medium' | 'large';
  setSize: (size: 'small' | 'medium' | 'large') => void;
  controls: boolean;
  setControls: (controls: boolean) => void;
  injectStyles: boolean;
  setInjectStyles: (value: boolean) => void;
}

const InputNumberControlsContext =
  createContext<InputNumberControlsContextType | null>(null);

// Provider
export function DemoInputNumberBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [min, setMin] = useState<number | undefined>(undefined);
  const [max, setMax] = useState<number | undefined>(undefined);
  const [step, setStep] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [controls, setControls] = useState(true);
  const [injectStyles, setInjectStyles] = useState(true);

  return (
    <InputNumberControlsContext.Provider
      value={{
        min,
        setMin,
        max,
        setMax,
        step,
        setStep,
        disabled,
        setDisabled,
        size,
        setSize,
        controls,
        setControls,
        injectStyles,
        setInjectStyles,
      }}
    >
      {children}
    </InputNumberControlsContext.Provider>
  );
}

// 기본 InputNumber (컨트롤러와 함께 사용될 컴포넌트)
export function DemoInputNumberBasicWithControls() {
  const context = useContext(InputNumberControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { min, max, step, disabled, size, controls, injectStyles } = context;
  const [value, setValue] = useState<number | undefined>(0);

  return (
    <div
      className={`${styles.container} ${!injectStyles ? styles.inputNumberWrapperClass : ''}`}
    >
      <InputNumber
        value={value}
        onChange={setValue}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        size={size}
        controls={controls}
        placeholder="Enter a number"
        injectStyles={injectStyles}
        className={injectStyles ? undefined : styles.inputNumber}
        inputClassName={injectStyles ? undefined : styles.input}
        incrementButtonClassName={
          injectStyles ? undefined : styles.incrementButton
        }
        decrementButtonClassName={
          injectStyles ? undefined : styles.decrementButton
        }
      />
      <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
        값: {value ?? 'undefined'}
      </p>
    </div>
  );
}

// InputNumber Controls
export function DemoInputNumberBasicControls() {
  const context = useContext(InputNumberControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    min,
    setMin,
    max,
    setMax,
    step,
    setStep,
    disabled,
    setDisabled,
    size,
    setSize,
    controls,
    setControls,
    injectStyles,
    setInjectStyles,
  } = context;

  return (
    <Controls
      items={[
        {
          label: 'Inject Styles',
          control: (
            <Checkbox
              checked={injectStyles}
              onChange={setInjectStyles}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '최소값 (Min)',
          control: (
            <Input
              type="number"
              value={min?.toString() ?? ''}
              onChange={(val) => setMin(val ? Number(val) : undefined)}
              placeholder="제한 없음"
              size="small"
            />
          ),
        },
        {
          label: '최대값 (Max)',
          control: (
            <Input
              type="number"
              value={max?.toString() ?? ''}
              onChange={(val) => setMax(val ? Number(val) : undefined)}
              placeholder="제한 없음"
              size="small"
            />
          ),
        },
        {
          label: '증감 단위 (Step)',
          control: (
            <Input
              type="number"
              value={step.toString()}
              onChange={(val) => setStep(Number(val) || 1)}
              placeholder="1"
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
          label: '컨트롤 버튼 (Controls)',
          control: (
            <Checkbox
              checked={controls}
              onChange={(checked) => setControls(checked)}
              size="small"
            >
              표시
            </Checkbox>
          ),
        },
      ]}
    />
  );
}

// Export individual demo components for MDX
export function DemoInputNumberBasic() {
  const [value, setValue] = useState<number | undefined>(0);

  return (
    <div className={styles.container}>
      <InputNumber
        value={value}
        onChange={setValue}
        placeholder="Enter a number"
        className={styles.inputNumber}
        inputClassName={styles.input}
        incrementButtonClassName={styles.incrementButton}
        decrementButtonClassName={styles.decrementButton}
      />
    </div>
  );
}

export function DemoInputNumberMinMax() {
  const [value, setValue] = useState<number | undefined>(50);

  return (
    <div className={styles.container}>
      <InputNumber
        value={value}
        onChange={setValue}
        min={0}
        max={100}
        placeholder="0-100"
        className={styles.inputNumber}
        inputClassName={styles.input}
        incrementButtonClassName={styles.incrementButton}
        decrementButtonClassName={styles.decrementButton}
      />
    </div>
  );
}

export function DemoInputNumberStep() {
  const [value, setValue] = useState<number | undefined>(0);

  return (
    <div className={styles.container}>
      <InputNumber
        value={value}
        onChange={setValue}
        step={0.1}
        precision={2}
        placeholder="Step: 0.1"
        className={styles.inputNumber}
        inputClassName={styles.input}
        incrementButtonClassName={styles.incrementButton}
        decrementButtonClassName={styles.decrementButton}
      />
    </div>
  );
}

export function DemoInputNumberNoControls() {
  const [value, setValue] = useState<number | undefined>(0);

  return (
    <div className={styles.container}>
      <InputNumber
        value={value}
        onChange={setValue}
        controls={false}
        placeholder="No controls"
        className={styles.inputNumber}
        inputClassName={styles.input}
      />
    </div>
  );
}

export function DemoInputNumberSizes() {
  const [value, setValue] = useState<number | undefined>(0);

  return (
    <div className={styles.section}>
      <InputNumber
        value={value}
        onChange={setValue}
        size="small"
        placeholder="Small"
        className={`${styles.inputNumber} ${styles.size.small}`}
        inputClassName={styles.input}
        incrementButtonClassName={styles.incrementButtonSmall}
        decrementButtonClassName={styles.decrementButtonSmall}
      />
      <InputNumber
        value={value}
        onChange={setValue}
        size="medium"
        placeholder="Medium"
        className={`${styles.inputNumber} ${styles.size.medium}`}
        inputClassName={styles.input}
        incrementButtonClassName={styles.incrementButtonMedium}
        decrementButtonClassName={styles.decrementButtonMedium}
      />
      <InputNumber
        value={value}
        onChange={setValue}
        size="large"
        placeholder="Large"
        className={`${styles.inputNumber} ${styles.size.large}`}
        inputClassName={styles.input}
        incrementButtonClassName={styles.incrementButtonLarge}
        decrementButtonClassName={styles.decrementButtonLarge}
      />
    </div>
  );
}

export function InputNumberDemo() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h2>input number 컴포넌트 데모</h2>

      <div style={{ marginBottom: '2rem' }}>
        <h3>기본 사용법</h3>
        <DemoInputNumberBasic />
      </div>
    </div>
  );
}
