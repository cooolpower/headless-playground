'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { Statistic } from '@repo/ui';
import { Input } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import * as styles from './statistic.demo.css';

// Statistic Controls Context
interface StatisticControlsContextType {
  injectStyles: boolean;
  setInjectStyles: (injectStyles: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  value: number;
  setValue: (value: number) => void;
  prefix: string;
  setPrefix: (prefix: string) => void;
  suffix: string;
  setSuffix: (suffix: string) => void;
  precision: number | undefined;
  setPrecision: (precision: number | undefined) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const StatisticControlsContext =
  createContext<StatisticControlsContextType | null>(null);

// Provider
export function DemoStatisticBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);
  const [title, setTitle] = useState('총 사용자');
  const [value, setValue] = useState(1234567);
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [precision, setPrecision] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  return (
    <StatisticControlsContext.Provider
      value={{
        injectStyles,
        setInjectStyles,
        title,
        setTitle,
        value,
        setValue,
        prefix,
        setPrefix,
        suffix,
        setSuffix,
        precision,
        setPrecision,
        loading,
        setLoading,
      }}
    >
      {children}
    </StatisticControlsContext.Provider>
  );
}

// 기본 Statistic (컨트롤러와 함께 사용될 컴포넌트)
export function DemoStatisticBasicWithControls() {
  const context = useContext(StatisticControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { injectStyles, title, value, prefix, suffix, precision, loading } =
    context;

  return (
    <div
      className={`${styles.container} ${!injectStyles ? styles.statisticWrapperClass : ''}`}
    >
      <Statistic
        injectStyles={injectStyles}
        title={title}
        value={value}
        prefix={prefix || undefined}
        suffix={suffix || undefined}
        precision={precision}
        loading={loading}
        classNames={
          injectStyles
            ? undefined
            : {
                container: styles.statistic,
                title: styles.title,
                content: styles.content,
                value: styles.value,
              }
        }
      />
    </div>
  );
}

// Statistic Controls
export function DemoStatisticBasicControls() {
  const context = useContext(StatisticControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    injectStyles,
    setInjectStyles,
    title,
    setTitle,
    value,
    setValue,
    prefix,
    setPrefix,
    suffix,
    setSuffix,
    precision,
    setPrecision,
    loading,
    setLoading,
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
          label: '제목 (Title)',
          control: (
            <Input
              type="text"
              value={title}
              onChange={setTitle}
              placeholder="제목 텍스트"
              size="small"
            />
          ),
        },
        {
          label: '값 (Value)',
          control: (
            <Input
              type="number"
              value={value.toString()}
              onChange={(val) => setValue(Number(val) || 0)}
              placeholder="값"
              size="small"
            />
          ),
        },
        {
          label: '접두사 (Prefix)',
          control: (
            <Input
              type="text"
              value={prefix}
              onChange={setPrefix}
              placeholder="예: ₩"
              size="small"
            />
          ),
        },
        {
          label: '접미사 (Suffix)',
          control: (
            <Input
              type="text"
              value={suffix}
              onChange={setSuffix}
              placeholder="예: 원"
              size="small"
            />
          ),
        },
        {
          label: '소수점 자릿수 (Precision)',
          control: (
            <Input
              type="number"
              value={precision?.toString() ?? ''}
              onChange={(val) => setPrecision(val ? Number(val) : undefined)}
              placeholder="제한 없음"
              size="small"
            />
          ),
        },
        {
          label: '로딩 (Loading)',
          control: (
            <Checkbox
              checked={loading}
              onChange={(checked) => setLoading(checked)}
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

export function DemoStatisticBasic() {
  return (
    <div className={styles.container}>
      <Statistic
        title="총 사용자"
        value={1234567}
        classNames={{
          container: styles.statistic,
          title: styles.title,
          content: styles.content,
          value: styles.value,
        }}
      />
    </div>
  );
}

export function DemoStatisticWithPrefixSuffix() {
  return (
    <div className={styles.container}>
      <Statistic
        title="매출액"
        value={9876543}
        prefix="₩"
        suffix="원"
        classNames={{
          container: styles.statistic,
          title: styles.title,
          content: styles.content,
          prefix: styles.prefix,
          value: styles.value,
          suffix: styles.suffix,
        }}
      />
    </div>
  );
}

export function DemoStatisticPrecision() {
  return (
    <div className={styles.container}>
      <Statistic
        title="평균 점수"
        value={95.6789}
        precision={2}
        classNames={{
          container: styles.statistic,
          title: styles.title,
          content: styles.content,
          value: styles.value,
        }}
      />
    </div>
  );
}

export function DemoStatisticLoading() {
  return (
    <div className={styles.container}>
      <Statistic
        title="처리 중"
        value={12345}
        loading={true}
        classNames={{
          container: styles.statistic,
          title: styles.title,
          loadingSkeleton: styles.loadingSkeleton,
        }}
      />
    </div>
  );
}

// 숫자 롤링 애니메이션 예제
function useAnimatedValue(targetValue: number, duration: number = 2000) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const startValue = 0;
    const endValue = targetValue;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const newValue = Math.floor(
        startValue + (endValue - startValue) * easeOut,
      );
      setCurrentValue(newValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentValue(endValue);
      }
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [targetValue, duration]);

  return currentValue;
}

export function DemoStatisticAnimated() {
  const [targetValue, setTargetValue] = useState(1234567);
  const animatedValue = useAnimatedValue(targetValue, 2000);

  return (
    <div className={styles.container}>
      <Statistic
        title="총 사용자"
        value={animatedValue}
        classNames={{
          container: styles.statistic,
          title: styles.title,
          content: styles.content,
          value: styles.value,
        }}
      />
      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button
          className={styles.button}
          onClick={() => setTargetValue(Math.floor(Math.random() * 10000000))}
        >
          랜덤 값으로 변경
        </button>
        <button className={styles.button} onClick={() => setTargetValue(0)}>
          초기화
        </button>
      </div>
    </div>
  );
}
