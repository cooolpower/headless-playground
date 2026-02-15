'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Divider } from '@repo/ui';
import { Input } from '@repo/ui';
import { Select } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import type { SelectOption } from '@repo/ui';
import * as styles from './divider.demo.css';

const STORAGE_KEY = 'headless-divider-demo-state';

// Divider Controls Context
interface DividerControlsContextType {
  injectStyles: boolean;
  setInjectStyles: (injectStyles: boolean) => void;
  orientation: 'horizontal' | 'vertical';
  setOrientation: (orientation: 'horizontal' | 'vertical') => void;
  text: string;
  setText: (text: string) => void;
  useText: boolean;
  setUseText: (useText: boolean) => void;
}

const DividerControlsContext = createContext<DividerControlsContextType | null>(
  null,
);

// Provider
export function DemoDividerBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>(
    'horizontal',
  );
  const [text, setText] = useState('OR');
  const [useText, setUseText] = useState(false);

  const isFirstSaveRunRef = useRef(true);

  useEffect(() => {
    if (typeof window === 'undefined') return; // SSR 방지

    try {
      const storedLocal = localStorage.getItem(STORAGE_KEY);
      let parsed = null;

      if (storedLocal) {
        parsed = JSON.parse(storedLocal);
      }

      if (parsed) {
        // localStorage 또는 cookie에서 읽은 값으로 상태를 업데이트합니다.
        if (parsed.injectStyles !== undefined)
          setInjectStyles(parsed.injectStyles);
        if (parsed.orientation !== undefined)
          setOrientation(parsed.orientation);
        if (parsed.text !== undefined) setText(parsed.text);
        if (parsed.useText !== undefined) setUseText(parsed.useText);
      }
    } catch (error) {
      console.warn('Failed to load state from localStorage:', error);
    }
  }, []); // 빈 배열: 마운트 시 한 번만 실행

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isFirstSaveRunRef.current) {
      isFirstSaveRunRef.current = false;
      return;
    }

    try {
      const stateToSave = {
        injectStyles,
        orientation,
        text,
        useText,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.warn('Failed to save state to localStorage:', error);
    }
  });

  return (
    <DividerControlsContext.Provider
      value={{
        injectStyles,
        setInjectStyles,
        orientation,
        setOrientation,
        text,
        setText,
        useText,
        setUseText,
      }}
    >
      {children}
    </DividerControlsContext.Provider>
  );
}

// 기본 Divider (컨트롤러와 함께 사용될 컴포넌트)
export function DemoDividerBasicWithControls() {
  const context = useContext(DividerControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { injectStyles, orientation, text, useText } = context;

  if (orientation === 'vertical') {
    return (
      <div
        className={`${styles.section} ${!injectStyles ? styles.dividerWrapperClass : ''}`}
      >
        <div className={styles.verticalContainer}>
          <div className={styles.verticalContent}>
            <p className={styles.contentText}>Left content</p>
          </div>
          <div className={styles.verticalDivider}>
            <Divider injectStyles={injectStyles} orientation="vertical" />
          </div>
          <div className={styles.verticalContent}>
            <p className={styles.contentText}>Right content</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.section} ${!injectStyles ? styles.dividerWrapperClass : ''}`}
    >
      <div className={styles.contentBlock}>
        <p className={styles.contentText}>First section content</p>
        {useText ? (
          <div className={styles.dividerWithText}>
            <Divider injectStyles={injectStyles} />
            <span className={styles.dividerText}>{text}</span>
            <Divider injectStyles={injectStyles} />
          </div>
        ) : (
          <div className={styles.dividerWrapper}>
            <Divider injectStyles={injectStyles} />
          </div>
        )}
        <p className={styles.contentText}>Second section content</p>
      </div>
    </div>
  );
}

// Divider Controls
export function DemoDividerBasicControls() {
  const context = useContext(DividerControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    injectStyles,
    setInjectStyles,
    orientation,
    setOrientation,
    text,
    setText,
    useText,
    setUseText,
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
          label: '방향 (Orientation)',
          control: (
            <Select
              options={[
                { label: 'Horizontal', value: 'horizontal' },
                { label: 'Vertical', value: 'vertical' },
              ]}
              value={orientation}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setOrientation(val as typeof orientation);
                }
              }}
              placeholder="방향 선택"
              size="small"
            />
          ),
        },
        {
          label: '텍스트 표시',
          control: (
            <Checkbox
              checked={useText}
              onChange={(checked) => setUseText(checked)}
              disabled={orientation === 'vertical'}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '텍스트 (Text)',
          control: (
            <Input
              type="text"
              value={text}
              onChange={setText}
              disabled={!useText || orientation === 'vertical'}
              placeholder="텍스트"
              size="small"
            />
          ),
        },
      ]}
    />
  );
}

// Horizontal Dividers Demo
export function DemoDividerHorizontal() {
  return (
    <div className={styles.section}>
      <div className={styles.contentBlock}>
        <p className={styles.contentText}>First section content</p>
        <div className={styles.dividerWrapper}>
          <Divider />
        </div>
        <p className={styles.contentText}>Second section content</p>
      </div>
    </div>
  );
}

// With Text Demo
export function DemoDividerWithText() {
  return (
    <div className={styles.section}>
      <div className={styles.contentBlock}>
        <p className={styles.contentText}>Section A</p>
        <div className={styles.dividerWithText}>
          <Divider />
          <span className={styles.dividerText}>OR</span>
          <Divider />
        </div>
        <p className={styles.contentText}>Section B</p>
      </div>
    </div>
  );
}

// Vertical Dividers Demo
export function DemoDividerVertical() {
  return (
    <div className={styles.section}>
      <div className={styles.verticalContainer}>
        <div className={styles.verticalContent}>
          <p className={styles.contentText}>Left content</p>
        </div>
        <div className={styles.verticalDivider}>
          <Divider orientation="vertical" />
        </div>
        <div className={styles.verticalContent}>
          <p className={styles.contentText}>Right content</p>
        </div>
      </div>
    </div>
  );
}

export function DemoDivider() {
  return (
    <div className={styles.demoContainer}>
      <h3 className={styles.demoTitle}>Divider Variants</h3>
    </div>
  );
}

export function DividerControls() {
  return (
    <div className={styles.controls}>
      <p className={styles.controlDescription}>
        Dividers provide visual separation between content sections. They can be
        horizontal or vertical, and can contain text.
      </p>
    </div>
  );
}
