'use client';

import React, { useState } from 'react';
import { DynamicInput } from '@repo/ui';
import { Input } from '@repo/ui';
import * as styles from './dynamic-input.demo.css';

// 기본 Dynamic Input 예제
export function DemoDynamicInputBasic() {
  const [inputs, setInputs] = useState<string[]>(['']);

  return (
    <div className={styles.container}>
      <DynamicInput
        value={inputs}
        onChange={setInputs}
        classNames={{
          dynamicInput: styles.dynamicInput,
          inputItem: styles.inputItem,
          input: styles.input,
          removeButton: styles.removeButton,
          addButton: styles.addButton,
        }}
      />
      <div className={styles.valueDisplay}>값: {JSON.stringify(inputs)}</div>
    </div>
  );
}

// 최소/최대 개수 제한 예제
export function DemoDynamicInputMinMax() {
  const [inputs, setInputs] = useState<string[]>(['Input1', 'Input2']);

  return (
    <div className={styles.container}>
      <DynamicInput
        value={inputs}
        onChange={setInputs}
        min={2}
        max={5}
        classNames={{
          dynamicInput: styles.dynamicInput,
          inputItem: styles.inputItem,
          input: styles.input,
          removeButton: styles.removeButton,
          addButton: styles.addButton,
        }}
      />
      <div className={styles.valueDisplay}>
        값: {JSON.stringify(inputs)} (최소 2개, 최대 5개)
      </div>
    </div>
  );
}

// 비활성화 예제
export function DemoDynamicInputDisabled() {
  const [inputs] = useState<string[]>(['Input1', 'Input2', 'Input3']);

  return (
    <div className={styles.container}>
      <DynamicInput
        value={inputs}
        disabled
        classNames={{
          dynamicInput: styles.dynamicInput,
          inputItem: styles.inputItem,
          input: styles.input,
          removeButton: styles.removeButton,
          addButton: styles.addButton,
        }}
      />
    </div>
  );
}

// 크기 변형 예제
export function DemoDynamicInputSizes() {
  const [smallInputs, setSmallInputs] = useState<string[]>(['Small']);
  const [mediumInputs, setMediumInputs] = useState<string[]>(['Medium']);
  const [largeInputs, setLargeInputs] = useState<string[]>(['Large']);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Small</h3>
        <DynamicInput
          value={smallInputs}
          onChange={setSmallInputs}
          size="small"
          classNames={{
            dynamicInput: styles.dynamicInput,
            inputItem: styles.inputItem,
            input: styles.input,
            removeButton: styles.removeButton,
            addButton: styles.addButton,
          }}
        />
      </div>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Medium</h3>
        <DynamicInput
          value={mediumInputs}
          onChange={setMediumInputs}
          size="medium"
          classNames={{
            dynamicInput: styles.dynamicInput,
            inputItem: styles.inputItem,
            input: styles.input,
            removeButton: styles.removeButton,
            addButton: styles.addButton,
          }}
        />
      </div>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Large</h3>
        <DynamicInput
          value={largeInputs}
          onChange={setLargeInputs}
          size="large"
          classNames={{
            dynamicInput: styles.dynamicInput,
            inputItem: styles.inputItem,
            input: styles.input,
            removeButton: styles.removeButton,
            addButton: styles.addButton,
          }}
        />
      </div>
    </div>
  );
}

// 커스텀 플레이스홀더 예제
export function DemoDynamicInputPlaceholder() {
  const [inputs, setInputs] = useState<string[]>(['']);

  return (
    <div className={styles.container}>
      <DynamicInput
        value={inputs}
        onChange={setInputs}
        placeholder={(index) => `항목 ${index + 1}을 입력하세요`}
        classNames={{
          dynamicInput: styles.dynamicInput,
          inputItem: styles.inputItem,
          input: styles.input,
          removeButton: styles.removeButton,
          addButton: styles.addButton,
        }}
      />
      <div className={styles.valueDisplay}>값: {JSON.stringify(inputs)}</div>
    </div>
  );
}

// 커스텀 생성/제거 핸들러 예제
export function DemoDynamicInputHandlers() {
  const [inputs, setInputs] = useState<string[]>(['Input1']);

  return (
    <div className={styles.container}>
      <DynamicInput
        value={inputs}
        onChange={setInputs}
        onCreate={async () => {
          console.log('입력 필드 생성');
          if (inputs.length >= 5) {
            alert('최대 5개까지만 추가할 수 있습니다.');
            return false;
          }
          return true;
        }}
        onRemove={async (index) => {
          console.log('입력 필드 제거:', index);
          return confirm(`${index + 1}번째 입력 필드를 제거하시겠습니까?`);
        }}
        classNames={{
          dynamicInput: styles.dynamicInput,
          inputItem: styles.inputItem,
          input: styles.input,
          removeButton: styles.removeButton,
          addButton: styles.addButton,
        }}
      />
      <div className={styles.valueDisplay}>값: {JSON.stringify(inputs)}</div>
    </div>
  );
}

// 커스텀 렌더링 예제
export function DemoDynamicInputCustomRender() {
  const [inputs, setInputs] = useState<string[]>(['Custom1', 'Custom2']);

  return (
    <div className={styles.container}>
      <DynamicInput
        value={inputs}
        onChange={setInputs}
        renderInput={(value, index, onChange) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px',
              border: '1px solid var(--color-divider)',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-surface)',
            }}
          >
            <span style={{ color: 'var(--color-text-secondary)' }}>
              {index + 1}.
            </span>
            <Input
              type="text"
              value={value}
              onChange={onChange}
              placeholder={`커스텀 입력 ${index + 1}`}
              size="small"
              inputStyle={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                color: 'var(--color-text)',
              }}
            />
          </div>
        )}
        classNames={{
          dynamicInput: styles.dynamicInput,
          inputItem: styles.inputItem,
          input: styles.input,
          removeButton: styles.removeButton,
          addButton: styles.addButton,
        }}
      />
    </div>
  );
}
