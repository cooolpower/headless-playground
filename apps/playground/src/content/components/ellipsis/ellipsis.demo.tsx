'use client';

import { createContext, useContext, useState } from 'react';
import { Ellipsis } from '@repo/ui';
import { Input } from '@repo/ui';
import { Textarea } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import * as styles from './ellipsis.demo.css';

// Ellipsis Controls Context
interface EllipsisControlsContextType {
  text: string;
  setText: (text: string) => void;
  lines: number | undefined;
  setLines: (lines: number | undefined) => void;
  useMultiLine: boolean;
  setUseMultiLine: (useMultiLine: boolean) => void;
  injectStyles: boolean;
  setInjectStyles: (value: boolean) => void;
}

const EllipsisControlsContext =
  createContext<EllipsisControlsContextType | null>(null);

// Provider
export function DemoEllipsisBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [text, setText] = useState(
    'This is a very long text that should be truncated when it exceeds the maximum width or number of lines. The ellipsis component will show three dots (...) to indicate that there is more content.',
  );
  const [lines, setLines] = useState<number | undefined>(undefined);
  const [useMultiLine, setUseMultiLine] = useState(false);
  const [injectStyles, setInjectStyles] = useState(true);

  return (
    <EllipsisControlsContext.Provider
      value={{
        text,
        setText,
        lines,
        setLines,
        useMultiLine,
        setUseMultiLine,
        injectStyles,
        setInjectStyles,
      }}
    >
      {children}
    </EllipsisControlsContext.Provider>
  );
}

// 기본 Ellipsis (컨트롤러와 함께 사용될 컴포넌트)
export function DemoEllipsisBasicWithControls() {
  const context = useContext(EllipsisControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { text, lines, useMultiLine } = context;
  const { injectStyles } = context;

  return (
    <div
      className={`${styles.section} ${!injectStyles ? styles.ellipsisWrapperClass : ''}`}
    >
      <div className={styles.ellipsisWrapper}>
        <Ellipsis
          injectStyles={injectStyles}
          lines={useMultiLine ? lines : undefined}
        >
          <div className={useMultiLine ? styles.multiLine : styles.singleLine}>
            {text}
          </div>
        </Ellipsis>
      </div>
    </div>
  );
}

// Ellipsis Controls
export function DemoEllipsisBasicControls() {
  const context = useContext(EllipsisControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    text,
    setText,
    lines,
    setLines,
    useMultiLine,
    setUseMultiLine,
    injectStyles,
    setInjectStyles,
  } = context;

  console.log('lines', lines);

  return (
    <Controls
      items={[
        {
          label: '텍스트 (Text)',
          control: (
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid oklch(90.0% 0.003 264.5)',
                resize: 'vertical',
              }}
            />
          ),
        },
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
          label: '다중 줄 (Multi-line)',
          control: (
            <Checkbox
              checked={useMultiLine}
              onChange={(checked) => setUseMultiLine(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '줄 수 (Lines)',
          control: (
            <Input
              type="number"
              value={lines?.toString() ?? ''}
              onChange={(val) => setLines(val ? Number(val) : undefined)}
              disabled={!useMultiLine}
              placeholder="단일 줄"
              size="small"
            />
          ),
        },
      ]}
    />
  );
}

// Single Line Ellipsis Demo
export function DemoEllipsisSingleLine() {
  const longText =
    'This is a very long text that should be truncated when it exceeds the maximum width or number of lines. The ellipsis component will show three dots (...) to indicate that there is more content.';

  return (
    <div className={styles.section}>
      <div className={styles.ellipsisWrapper}>
        <Ellipsis>
          <div className={styles.singleLine}>{longText}</div>
        </Ellipsis>
      </div>
    </div>
  );
}

// Multi-line Ellipsis Demo
export function DemoEllipsisMultiLine() {
  const longText =
    'This is a very long text that should be truncated when it exceeds the maximum width or number of lines. The ellipsis component will show three dots (...) to indicate that there is more content.';

  return (
    <div className={styles.section}>
      <div className={styles.ellipsisWrapper}>
        <Ellipsis lines={3}>
          <div className={styles.multiLine}>
            {longText} {longText} {longText}
          </div>
        </Ellipsis>
      </div>
    </div>
  );
}

// Short Text Demo
export function DemoEllipsisShortText() {
  const shortText = 'This is a short text.';

  return (
    <div className={styles.section}>
      <div className={styles.ellipsisWrapper}>
        <Ellipsis>
          <div className={styles.singleLine}>{shortText}</div>
        </Ellipsis>
      </div>
    </div>
  );
}

// Different Sizes Demo
export function DemoEllipsisSizes() {
  const longText =
    'This is a very long text that should be truncated when it exceeds the maximum width or number of lines.';

  return (
    <div className={styles.section}>
      <div className={styles.sizeComparison}>
        <div className={styles.sizeContainer} style={{ width: '200px' }}>
          <Ellipsis>
            <div className={styles.singleLine}>{longText}</div>
          </Ellipsis>
        </div>
        <div className={styles.sizeContainer} style={{ width: '300px' }}>
          <Ellipsis>
            <div className={styles.singleLine}>{longText}</div>
          </Ellipsis>
        </div>
        <div className={styles.sizeContainer} style={{ width: '400px' }}>
          <Ellipsis>
            <div className={styles.singleLine}>{longText}</div>
          </Ellipsis>
        </div>
      </div>
    </div>
  );
}

export function DemoEllipsis() {
  return (
    <div className={styles.demoContainer}>
      <h3 className={styles.demoTitle}>Ellipsis Variants</h3>
    </div>
  );
}

export function EllipsisControls() {
  return (
    <div className={styles.controls}>
      <p className={styles.controlDescription}>
        Ellipsis components truncate text that exceeds the container width or
        specified number of lines. The ellipsis (...) indicates that there is
        more content available.
      </p>
    </div>
  );
}
