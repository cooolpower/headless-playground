'use client';

import React, { useState, createContext, useContext } from 'react';
import { Steps } from '@repo/ui';
import { Input } from '@repo/ui';
import { Select } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import { Checkbox } from '@repo/ui';
import * as styles from './steps.demo.css';

// Steps Controls Context
interface StepsControlsContextType {
  current: number;
  setCurrent: (current: number) => void;
  direction: 'horizontal' | 'vertical';
  setDirection: (direction: 'horizontal' | 'vertical') => void;
  size: 'small' | 'medium' | 'large';
  setSize: (size: 'small' | 'medium' | 'large') => void;
  injectStyles: boolean;
  setInjectStyles: (value: boolean) => void;
}

const StepsControlsContext = createContext<StepsControlsContextType | null>(
  null,
);

// Provider
export function DemoStepsBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [current, setCurrent] = useState(1);
  const [direction, setDirection] = useState<'horizontal' | 'vertical'>(
    'horizontal',
  );
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [injectStyles, setInjectStyles] = useState(true);

  return (
    <StepsControlsContext.Provider
      value={{
        current,
        setCurrent,
        direction,
        setDirection,
        size,
        setSize,
        injectStyles,
        setInjectStyles,
      }}
    >
      {children}
    </StepsControlsContext.Provider>
  );
}

// 기본 Steps (컨트롤러와 함께 사용될 컴포넌트)
export function DemoStepsBasicWithControls() {
  const context = useContext(StepsControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { current, direction, size, injectStyles } = context;

  return (
    <div
      className={!injectStyles ? styles.stepsWrapperClass : ''}
      style={{ padding: '2rem' }}
    >
      <Steps
        injectStyles={injectStyles}
        items={[
          { title: '주문 접수' },
          { title: '결제 완료' },
          { title: '배송 중' },
          { title: '배송 완료' },
        ]}
        current={current}
        direction={direction}
        size={size}
      />
    </div>
  );
}

// Steps Controls
export function DemoStepsBasicControls() {
  const context = useContext(StepsControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    current,
    setCurrent,
    direction,
    setDirection,
    size,
    setSize,
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
          label: '현재 단계 (Current)',
          control: (
            <Input
              type="number"
              value={current.toString()}
              onChange={(val) =>
                setCurrent(Math.min(3, Math.max(0, Number(val) || 0)))
              }
              placeholder="0-3"
              size="small"
            />
          ),
        },
        {
          label: '방향 (Direction)',
          control: (
            <Select
              options={[
                { label: 'Horizontal', value: 'horizontal' },
                { label: 'Vertical', value: 'vertical' },
              ]}
              value={direction}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setDirection(val as typeof direction);
                }
              }}
              placeholder="방향 선택"
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
      ]}
    />
  );
}

export function DemoStepsBasic() {
  return (
    <div style={{ padding: '2rem' }}>
      <Steps
        items={[
          { title: '주문 접수' },
          { title: '결제 완료' },
          { title: '배송 중' },
          { title: '배송 완료' },
        ]}
        current={1}
      />
    </div>
  );
}

export function DemoStepsWithDescription() {
  return (
    <div style={{ padding: '2rem' }}>
      <Steps
        items={[
          { title: '정보 입력', description: '기본 정보를 입력하세요' },
          { title: '검토', description: '입력 내용을 확인하세요' },
          { title: '완료', description: '처리가 완료되었습니다' },
        ]}
        current={0}
      />
    </div>
  );
}

export function DemoStepsVertical() {
  return (
    <div style={{ padding: '2rem', maxWidth: '300px' }}>
      <Steps
        direction="vertical"
        items={[{ title: '1단계' }, { title: '2단계' }, { title: '3단계' }]}
        current={1}
      />
    </div>
  );
}

export function DemoStepsError() {
  return (
    <div style={{ padding: '2rem' }}>
      <Steps
        items={[
          { title: '완료', status: 'finish' },
          { title: '오류', status: 'error' },
          { title: '대기', status: 'wait' },
        ]}
        current={1}
      />
    </div>
  );
}
