'use client';

import React, { useState, createContext, useContext } from 'react';
import { Rate } from '@cooolpower/headless-ui';
import { Input } from '@cooolpower/headless-ui';
import { Select } from '@cooolpower/headless-ui';
import { Checkbox } from '@cooolpower/headless-ui';
import { Controls } from '@/components/playground/controls';
import type { SelectOption } from '@cooolpower/headless-ui';
import * as styles from './rate.demo.css';

// Rate Controls Context
interface RateControlsContextType {
  value: number;
  setValue: (value: number) => void;
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
  allowHalf: boolean;
  setAllowHalf: (allowHalf: boolean) => void;
  count: number;
  setCount: (count: number) => void;
  character: string;
  setCharacter: (character: string) => void;
  injectStyles: boolean;
  setInjectStyles: (value: boolean) => void;
}

const RateControlsContext = createContext<RateControlsContextType | null>(null);

// Provider
export function DemoRateBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [value, setValue] = useState(3);
  const [disabled, setDisabled] = useState(false);
  const [allowHalf, setAllowHalf] = useState(false);
  const [count, setCount] = useState(5);
  const [character, setCharacter] = useState('★');
  const [injectStyles, setInjectStyles] = useState(true);

  return (
    <RateControlsContext.Provider
      value={{
        value,
        setValue,
        disabled,
        setDisabled,
        allowHalf,
        setAllowHalf,
        count,
        setCount,
        character,
        setCharacter,
        injectStyles,
        setInjectStyles,
      }}
    >
      {children}
    </RateControlsContext.Provider>
  );
}

// 기본 Rate (컨트롤러와 함께 사용될 컴포넌트)
export function DemoRateBasicWithControls() {
  const context = useContext(RateControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    value,
    setValue,
    disabled,
    allowHalf,
    count,
    character,
    injectStyles,
  } = context;

  return (
    <div
      className={`${styles.container} ${!injectStyles ? styles.rateWrapperClass : ''}`}
    >
      <Rate
        injectStyles={injectStyles}
        value={value}
        onChange={setValue}
        disabled={disabled}
        allowHalf={allowHalf}
        count={count}
        character={character}
        classNames={
          injectStyles
            ? undefined
            : {
                container: styles.rate,
                starWrapper: styles.starWrapper,
                star: styles.star,
                starActive: styles.active,
                starHalf: styles.starHalf,
                starHalfActive: styles.starHalfActive,
              }
        }
      />
      <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
        선택된 값: {value}
      </p>
    </div>
  );
}

// Rate Controls
export function DemoRateBasicControls() {
  const context = useContext(RateControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    value,
    setValue,
    disabled,
    setDisabled,
    allowHalf,
    setAllowHalf,
    count,
    setCount,
    character,
    setCharacter,
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
          label: '값 (Value)',
          control: (
            <Input
              type="number"
              value={value.toString()}
              onChange={(val) =>
                setValue(Math.min(count, Math.max(0, Number(val) || 0)))
              }
              placeholder="0"
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
          label: '반값 허용 (Allow Half)',
          control: (
            <Checkbox
              checked={allowHalf}
              onChange={(checked) => setAllowHalf(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '개수 (Count)',
          control: (
            <Input
              type="number"
              value={count.toString()}
              onChange={(val) =>
                setCount(Math.min(20, Math.max(1, Number(val) || 1)))
              }
              placeholder="1-20"
              size="small"
            />
          ),
        },
        {
          label: '문자 (Character)',
          control: (
            <Select
              options={[
                { label: '★ (별)', value: '★' },
                { label: '❤️ (하트)', value: '❤️' },
                { label: '⭐ (별 반짝)', value: '⭐' },
                { label: '👍 (좋아요)', value: '👍' },
                { label: '🔥 (불)', value: '🔥' },
              ]}
              value={character}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  if (typeof val === 'string') setCharacter(val);
                }
              }}
              placeholder="문자 선택"
              size="small"
            />
          ),
        },
      ]}
    />
  );
}

// 기존 예제들 (props 조합으로만 차별화)
export function DemoRateBasic() {
  const [value, setValue] = useState(3);

  return (
    <div className={styles.container}>
      <Rate
        value={value}
        onChange={setValue}
        classNames={{
          container: styles.rate,
          starWrapper: styles.starWrapper,
          star: styles.star,
          starActive: styles.active,
          starHalf: styles.starHalf,
          starHalfActive: styles.starHalfActive,
        }}
      />
      <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
        선택된 값: {value}
      </p>
    </div>
  );
}

export function DemoRateAllowHalf() {
  const [value, setValue] = useState(2.5);

  return (
    <div className={styles.container}>
      <Rate
        value={value}
        onChange={setValue}
        allowHalf
        classNames={{
          container: styles.rate,
          starWrapper: styles.starWrapper,
          star: styles.star,
          starActive: styles.active,
          starHalf: styles.starHalf,
          starHalfActive: styles.starHalfActive,
        }}
      />
      <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
        선택된 값: {value}
      </p>
    </div>
  );
}

export function DemoRateCustomCharacter() {
  const [value, setValue] = useState(4);

  return (
    <div className={styles.container}>
      <Rate
        value={value}
        onChange={setValue}
        character="❤️"
        count={5}
        classNames={{
          container: styles.rate,
          starWrapper: styles.starWrapper,
          star: styles.star,
          starActive: styles.active,
          starHalf: styles.starHalf,
          starHalfActive: styles.starHalfActive,
        }}
      />
      <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
        선택된 값: {value}
      </p>
    </div>
  );
}

export function DemoRateDisabled() {
  return (
    <div className={styles.container}>
      <Rate
        value={4}
        disabled
        classNames={{
          container: `${styles.rate} ${styles.disabled}`,
          starWrapper: styles.starWrapper,
          star: styles.star,
          starActive: styles.active,
          starHalf: styles.starHalf,
        }}
      />
    </div>
  );
}

export function DemoRateCustomCount() {
  const [value, setValue] = useState(7);

  return (
    <div className={styles.container}>
      <Rate
        value={value}
        onChange={setValue}
        count={10}
        classNames={{
          container: styles.rate,
          starWrapper: styles.starWrapper,
          star: styles.star,
          starActive: styles.active,
          starHalf: styles.starHalf,
          starHalfActive: styles.starHalfActive,
        }}
      />
      <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
        선택된 값: {value} / 10
      </p>
    </div>
  );
}
