'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { FlipCountdown } from '@repo/ui';
import { flipCountdownCss } from '@repo/ui';
import { Button } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Input } from '@repo/ui';
import { Select } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import * as styles from './flip-countdown.demo.css';

import type { SelectOption } from '@repo/ui';
import type {
  FlipCountdownDigitSize,
  FlipCountdownMode,
} from '@repo/ui';

function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

function DemoFlipCountdownPlaceholder({ text }: { text: string }) {
  return <div className={styles.placeholder}>{text}</div>;
}

export function DemoFlipCountdownBasic() {
  const mounted = useMounted();
  const [targetTime, setTargetTime] = useState<number>(0);

  useEffect(() => {
    if (!mounted) return;
    setTargetTime(Date.now() + 10_000 + 999);
  }, [mounted]);

  if (!mounted) {
    return <DemoFlipCountdownPlaceholder text="00:00:10" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.content}>
          <div className={styles.previewRow}>
            <FlipCountdown targetTime={targetTime} format="HH:mm:ss" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DemoFlipCountdownNumber() {
  const mounted = useMounted();
  const [targetTime, setTargetTime] = useState<number>(0);

  useEffect(() => {
    if (!mounted) return;
    setTargetTime(Date.now() + 100_000 + 999);
  }, [mounted]);

  if (!mounted) {
    return <DemoFlipCountdownPlaceholder text="100" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.content}>
          <div className={styles.previewRow}>
            <FlipCountdown
              targetTime={targetTime}
              mode="number"
              minDigits={3}
            />
          </div>
          <div className={styles.helperText}>
            mode=&quot;number&quot;는 남은 시간을 &quot;총 초&quot;로
            표시합니다.
          </div>
        </div>
      </div>
    </div>
  );
}

export function DemoFlipCountdownCustomFormat() {
  const mounted = useMounted();
  const [targetTime, setTargetTime] = useState<number>(0);

  useEffect(() => {
    if (!mounted) return;
    setTargetTime(Date.now() + 86_400_000 + 999);
  }, [mounted]);

  if (!mounted) {
    return <DemoFlipCountdownPlaceholder text="01:00:00:00" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.content}>
          <div className={styles.previewRow}>
            <FlipCountdown targetTime={targetTime} format="DD:HH:mm:ss" />
          </div>
          <div className={styles.helperText}>
            format=&quot;DD:HH:mm:ss&quot;로 일/시/분/초를 동시에 표시합니다.
          </div>
        </div>
      </div>
    </div>
  );
}

export function DemoFlipCountdownNoInjectStyles() {
  const mounted = useMounted();
  const [targetTime, setTargetTime] = useState<number>(0);

  useEffect(() => {
    if (!mounted) return;
    setTargetTime(Date.now() + 10_000 + 999);
  }, [mounted]);

  if (!mounted) {
    return <DemoFlipCountdownPlaceholder text="00:00:10" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.content}>
          <style suppressHydrationWarning>{flipCountdownCss}</style>
          <div className={styles.previewRow}>
            <FlipCountdown targetTime={targetTime} injectStyles={false} />
          </div>
          <div className={styles.helperText}>
            injectStyles=false인 경우, 별도로 `flipCountdownCss`를 페이지에
            주입해도 동작합니다.
          </div>
        </div>
      </div>
    </div>
  );
}

interface FlipCountdownControlsContextType {
  seconds: number;
  setSeconds: (seconds: number) => void;
  active: boolean;
  setActive: (active: boolean) => void;
  runId: number;
  restart: () => void;
  mode: FlipCountdownMode;
  setMode: (mode: FlipCountdownMode) => void;
  format: string;
  setFormat: (format: string) => void;
  minDigits: number;
  setMinDigits: (minDigits: number) => void;
  digitSize: FlipCountdownDigitSize;
  setDigitSize: (digitSize: FlipCountdownDigitSize) => void;
  injectStyles: boolean;
  setInjectStyles: (injectStyles: boolean) => void;
}

const FlipCountdownControlsContext =
  createContext<FlipCountdownControlsContextType | null>(null);

export function DemoFlipCountdownBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [seconds, setSeconds] = useState<number>(10);
  const [active, setActive] = useState<boolean>(false);
  const [runId, setRunId] = useState<number>(0);

  const [mode, setMode] = useState<FlipCountdownMode>('time');
  const [format, setFormat] = useState<string>('HH:mm:ss');
  const [minDigits, setMinDigits] = useState<number>(3);
  const [digitSize, setDigitSize] = useState<FlipCountdownDigitSize>('md');
  const [injectStyles, setInjectStyles] = useState<boolean>(true);

  const restart = () => {
    setRunId((v) => v + 1);
    setActive(true);
  };

  const value = useMemo(
    () => ({
      seconds,
      setSeconds,
      active,
      setActive,
      runId,
      restart,
      mode,
      setMode,
      format,
      setFormat,
      minDigits,
      setMinDigits,
      digitSize,
      setDigitSize,
      injectStyles,
      setInjectStyles,
    }),
    [seconds, active, runId, mode, format, minDigits, digitSize, injectStyles],
  );

  return (
    <FlipCountdownControlsContext.Provider value={value}>
      {children}
    </FlipCountdownControlsContext.Provider>
  );
}

export function DemoFlipCountdownBasicWithControls() {
  const mounted = useMounted();
  const context = useContext(FlipCountdownControlsContext);
  const [targetTime, setTargetTime] = useState<number>(0);

  if (!context) return <DemoFlipCountdownBasic />;

  const {
    seconds,
    active,
    mode,
    format,
    minDigits,
    digitSize,
    injectStyles,
    runId,
  } = context;

  useEffect(() => {
    if (!mounted) return;
    if (!active) return;
    setTargetTime(Date.now() + seconds * 1000 + 999);
  }, [mounted, active, seconds, runId]);

  if (!mounted) {
    return <DemoFlipCountdownPlaceholder text="00:00:10" />;
  }

  return (
    <div
      className={`${styles.container} ${!injectStyles ? styles.flipCountdownWrapperClass : ''}`}
    >
      <div className={styles.section}>
        <div className={styles.content}>
          {!injectStyles ? (
            <style suppressHydrationWarning>{flipCountdownCss}</style>
          ) : null}
          <div className={styles.previewRow}>
            <FlipCountdown
              targetTime={targetTime || Date.now()}
              active={active}
              mode={mode}
              format={mode === 'time' ? format : undefined}
              minDigits={mode === 'number' ? minDigits : undefined}
              digitSize={digitSize}
              injectStyles={injectStyles}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DemoFlipCountdownBasicControls() {
  const context = useContext(FlipCountdownControlsContext);
  if (!context) {
    return <div className={styles.helperText}>Provider로 감싸야 합니다.</div>;
  }

  const {
    seconds,
    setSeconds,
    active,
    setActive,
    restart,
    mode,
    setMode,
    format,
    setFormat,
    minDigits,
    setMinDigits,
    digitSize,
    setDigitSize,
    injectStyles,
    setInjectStyles,
  } = context;

  const modeOptions: SelectOption[] = [
    { label: 'time (일/시/분/초)', value: 'time' },
    { label: 'number (총 초)', value: 'number' },
  ];

  const digitSizeOptions: SelectOption[] = [
    { label: 'sm', value: 'sm' },
    { label: 'md', value: 'md' },
    { label: 'lg', value: 'lg' },
    { label: 'xl', value: 'xl' },
  ];

  const formatOptions: SelectOption[] = [
    { label: 'HH:mm:ss', value: 'HH:mm:ss' },
    { label: 'mm:ss', value: 'mm:ss' },
    { label: 'ss', value: 'ss' },
    { label: 'DD:HH:mm:ss', value: 'DD:HH:mm:ss' },
  ];

  return (
    <Controls
      items={[
        {
          label: 'Seconds',
          control: (
            <Input
              value={String(seconds)}
              onChange={(value) => {
                const next = Number(value);
                setSeconds(Number.isFinite(next) ? Math.max(0, next) : 0);
              }}
              placeholder="10"
            />
          ),
        },
        {
          label: 'Mode',
          control: (
            <Select
              value={mode}
              options={modeOptions}
              onChange={(val) => {
                if (val && typeof val === 'string')
                  setMode(val as FlipCountdownMode);
              }}
            />
          ),
        },
        {
          label: 'Format',
          control: (
            <Select
              value={format}
              disabled={mode !== 'time'}
              options={formatOptions}
              onChange={(val) => {
                if (val && typeof val === 'string') setFormat(val);
              }}
            />
          ),
        },
        {
          label: 'Min Digits',
          control: (
            <Input
              value={String(minDigits)}
              disabled={mode !== 'number'}
              onChange={(value) => {
                const next = Number(value);
                setMinDigits(Number.isFinite(next) ? Math.max(1, next) : 1);
              }}
              placeholder="3"
            />
          ),
        },
        {
          label: 'Digit Size',
          control: (
            <Select
              value={digitSize}
              options={digitSizeOptions}
              onChange={(val) => {
                if (val && typeof val === 'string')
                  setDigitSize(val as FlipCountdownDigitSize);
              }}
            />
          ),
        },
        {
          label: 'Inject Styles',
          control: (
            <Checkbox
              checked={injectStyles}
              onChange={(next) => setInjectStyles(next)}
            >
              injectStyles
            </Checkbox>
          ),
        },
        {
          label: 'Active',
          control: (
            <Checkbox checked={active} onChange={(next) => setActive(next)}>
              active
            </Checkbox>
          ),
        },
        {
          label: 'Start',
          control: <Button onClick={restart}>시작</Button>,
        },
      ]}
    />
  );
}
