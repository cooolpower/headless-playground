'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { LoadingBar } from '@repo/ui';
import { Input } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import * as styles from './loading-bar.demo.css';

// LoadingBar Controls Context
interface LoadingBarControlsContextType {
  injectStyles: boolean;
  setInjectStyles: (injectStyles: boolean) => void;
  percent: number;
  setPercent: (percent: number) => void;
  show: boolean;
  setShow: (show: boolean) => void;
  color: string;
  setColor: (color: string) => void;
  height: number | undefined;
  setHeight: (height: number | undefined) => void;
}

const LoadingBarControlsContext =
  createContext<LoadingBarControlsContextType | null>(null);

// Provider
export function DemoLoadingBarBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);
  const [percent, setPercent] = useState(50);
  const [show, setShow] = useState(true);
  const [color, setColor] = useState('');
  const [height, setHeight] = useState<number | undefined>(undefined);

  return (
    <LoadingBarControlsContext.Provider
      value={{
        injectStyles,
        setInjectStyles,
        percent,
        setPercent,
        show,
        setShow,
        color,
        setColor,
        height,
        setHeight,
      }}
    >
      {children}
    </LoadingBarControlsContext.Provider>
  );
}

// 기본 LoadingBar (컨트롤러와 함께 사용될 컴포넌트)
export function DemoLoadingBarBasicWithControls() {
  const context = useContext(LoadingBarControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { injectStyles, percent, show, color, height } = context;

  return (
    <div
      className={!injectStyles ? styles.loadingBarWrapperClass : ''}
      style={{ padding: '2rem' }}
    >
      <LoadingBar
        injectStyles={injectStyles}
        percent={percent}
        show={show}
        color={color || undefined}
        height={height}
      />
      <p style={{ marginTop: '2rem', color: 'var(--color-text-secondary)' }}>
        진행률: {percent}%
      </p>
    </div>
  );
}

// LoadingBar Controls
export function DemoLoadingBarBasicControls() {
  const context = useContext(LoadingBarControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    injectStyles,
    setInjectStyles,
    percent,
    setPercent,
    show,
    setShow,
    color,
    setColor,
    height,
    setHeight,
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
          label: '진행률 (Percent)',
          control: (
            <Input
              type="number"
              value={percent.toString()}
              onChange={(val) =>
                setPercent(Math.min(100, Math.max(0, Number(val) || 0)))
              }
              placeholder="0-100"
              size="small"
            />
          ),
        },
        {
          label: '표시 (Show)',
          control: (
            <Checkbox
              checked={show}
              onChange={(checked) => setShow(checked)}
              size="small"
            >
              표시
            </Checkbox>
          ),
        },
        {
          label: '색상 (Color)',
          control: (
            <Input
              type="text"
              value={color}
              onChange={setColor}
              placeholder="기본값 사용"
              size="small"
            />
          ),
        },
        {
          label: '높이 (Height)',
          control: (
            <Input
              type="number"
              value={height?.toString() ?? ''}
              onChange={(val) => setHeight(val ? Number(val) : undefined)}
              placeholder="기본값 사용"
              size="small"
            />
          ),
        },
      ]}
    />
  );
}

export function DemoLoadingBarBasic() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <LoadingBar percent={percent} show={true} />
      <p style={{ marginTop: '2rem', color: 'var(--color-text-secondary)' }}>
        진행률: {percent}%
      </p>
    </div>
  );
}

export function DemoLoadingBarCustomColor() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <LoadingBar
        percent={percent}
        show={true}
        color="var(--color-semantic-success)"
      />
      <p style={{ marginTop: '2rem', color: 'var(--color-text-secondary)' }}>
        진행률: {percent}% (초록색)
      </p>
    </div>
  );
}

export function DemoLoadingBarCustomHeight() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <LoadingBar percent={percent} show={true} height={5} />
      <p style={{ marginTop: '2rem', color: 'var(--color-text-secondary)' }}>
        진행률: {percent}% (높이: 5px)
      </p>
    </div>
  );
}

export function DemoLoadingBarAutoHide() {
  const [percent, setPercent] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          setTimeout(() => setShow(false), 500);
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <LoadingBar percent={percent} show={show} />
      <p style={{ marginTop: '2rem', color: 'var(--color-text-secondary)' }}>
        진행률: {percent}% {!show && '(자동 숨김)'}
      </p>
    </div>
  );
}
