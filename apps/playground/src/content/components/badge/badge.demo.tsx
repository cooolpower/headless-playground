'use client';

import React, {
  useState,
  createContext,
  useContext,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import { Badge } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import { Input } from '@repo/ui';
import { Select } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import type { SelectOption } from '@repo/ui';
import * as styles from './badge.demo.css';

const STORAGE_KEY = 'headless-badge-demo-state';

// Badge Controls Context
interface BadgeControlsContextType {
  injectStyles: boolean;
  setInjectStyles: (injectStyles: boolean) => void;
  count: number | string;
  setCount: (count: number | string) => void;
  showZero: boolean;
  setShowZero: (showZero: boolean) => void;
  maxCount: number | undefined;
  setMaxCount: (maxCount: number | undefined) => void;
  color:
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | string;
  setColor: (
    color:
      | 'default'
      | 'primary'
      | 'success'
      | 'warning'
      | 'danger'
      | 'info'
      | string,
  ) => void;
  size: 'small' | 'medium' | 'large';
  setSize: (size: 'small' | 'medium' | 'large') => void;
  dot: boolean;
  setDot: (dot: boolean) => void;
  processing: boolean;
  setProcessing: (processing: boolean) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  backgroundColorMode: 'select' | 'custom';
  setBackgroundColorMode: (mode: 'select' | 'custom') => void;
  textColor: string;
  setTextColor: (color: string) => void;
  borderWidth: string;
  setBorderWidth: (width: string) => void;
  borderWidthMode: 'select' | 'custom';
  setBorderWidthMode: (mode: 'select' | 'custom') => void;
  borderColor: string;
  setBorderColor: (color: string) => void;
  borderColorMode: 'select' | 'custom';
  setBorderColorMode: (mode: 'select' | 'custom') => void;
  borderStyle: 'none' | 'solid' | 'dashed' | 'dotted';
  setBorderStyle: (style: 'none' | 'solid' | 'dashed' | 'dotted') => void;
}

const BadgeControlsContext = createContext<BadgeControlsContextType | null>(
  null,
);

// Provider
export function DemoBadgeBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);
  const [count, setCount] = useState<number | string>(5);
  const [showZero, setShowZero] = useState(false);
  const [maxCount, setMaxCount] = useState<number | undefined>(undefined);
  const [color, setColor] = useState<
    'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | string
  >('default');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [dot, setDot] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('');
  const [backgroundColorMode, setBackgroundColorMode] = useState<
    'select' | 'custom'
  >('select');
  const [textColor, setTextColor] = useState('');
  const [borderWidth, setBorderWidth] = useState('var(--border-width-thin)');
  const [borderWidthMode, setBorderWidthMode] = useState<'select' | 'custom'>(
    'select',
  );
  const [borderColor, setBorderColor] = useState('');
  const [borderColorMode, setBorderColorMode] = useState<'select' | 'custom'>(
    'select',
  );
  const [borderStyle, setBorderStyle] = useState<
    'none' | 'solid' | 'dashed' | 'dotted'
  >('solid');

  const contextValue = useMemo(
    () => ({
      injectStyles,
      setInjectStyles,
      count,
      setCount,
      showZero,
      setShowZero,
      maxCount,
      setMaxCount,
      color,
      setColor,
      size,
      setSize,
      dot,
      setDot,
      processing,
      setProcessing,
      backgroundColor,
      setBackgroundColor,
      backgroundColorMode,
      setBackgroundColorMode,
      textColor,
      setTextColor,
      borderWidth,
      setBorderWidth,
      borderWidthMode,
      setBorderWidthMode,
      borderColor,
      setBorderColor,
      borderColorMode,
      setBorderColorMode,
      borderStyle,
      setBorderStyle,
    }),
    [
      injectStyles,
      count,
      showZero,
      maxCount,
      color,
      size,
      dot,
      processing,
      backgroundColor,
      backgroundColorMode,
      textColor,
      borderWidth,
      borderWidthMode,
      borderColor,
      borderColorMode,
      borderStyle,
    ],
  );

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
        if (parsed.count !== undefined) setCount(parsed.count);
        if (parsed.showZero !== undefined) setShowZero(parsed.showZero);
        if (parsed.maxCount !== undefined) setMaxCount(parsed.maxCount);
        if (parsed.color !== undefined) setColor(parsed.color);
        if (parsed.size !== undefined) setSize(parsed.size);
        if (parsed.dot !== undefined) setDot(parsed.dot);
        if (parsed.processing !== undefined) setProcessing(parsed.processing);
        if (parsed.backgroundColor !== undefined)
          setBackgroundColor(parsed.backgroundColor);
        if (parsed.backgroundColorMode !== undefined)
          setBackgroundColorMode(parsed.backgroundColorMode);
        if (parsed.textColor !== undefined) setTextColor(parsed.textColor);
        if (parsed.borderWidth !== undefined)
          setBorderWidth(parsed.borderWidth);
        if (parsed.borderWidthMode !== undefined)
          setBorderWidthMode(parsed.borderWidthMode);
        if (parsed.borderColor !== undefined)
          setBorderColor(parsed.borderColor);
        if (parsed.borderColorMode !== undefined)
          setBorderColorMode(parsed.borderColorMode);
        if (parsed.borderStyle !== undefined)
          setBorderStyle(parsed.borderStyle);
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
        count,
        showZero,
        maxCount,
        color,
        size,
        dot,
        processing,
        backgroundColor,
        backgroundColorMode,
        textColor,
        borderWidth,
        borderWidthMode,
        borderColor,
        borderColorMode,
        borderStyle,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.warn('Failed to save state to localStorage:', error);
    }
  });

  return (
    <BadgeControlsContext.Provider value={contextValue}>
      {children}
    </BadgeControlsContext.Provider>
  );
}

// 기본 Badge (컨트롤러와 함께 사용될 컴포넌트)
export function DemoBadgeBasicWithControls() {
  const context = useContext(BadgeControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    injectStyles,
    count,
    showZero,
    maxCount,
    color,
    size,
    dot,
    processing,
    backgroundColor,
    textColor,
    borderWidth,
    borderColor,
    borderStyle,
  } = context;

  const [countNumber, setCountNumber] = useState<number>(
    typeof count === 'number' ? count : Number(count),
  );

  useEffect(() => {
    setCountNumber(typeof count === 'number' ? count : Number(count));
  }, [count]);

  return (
    <div
      className={`${styles.container} ${!injectStyles ? styles.badgeWrapperClass : ''}`}
    >
      <Badge
        injectStyles={injectStyles}
        count={dot ? undefined : countNumber}
        showZero={showZero}
        maxCount={maxCount}
        color={color}
        size={size}
        dot={dot}
        processing={processing}
        backgroundColor={backgroundColor || undefined}
        textColor={textColor || undefined}
        borderWidth={
          borderStyle === 'none' ? undefined : borderWidth || undefined
        }
        borderColor={
          borderStyle === 'none' ? undefined : borderColor || undefined
        }
        borderStyle={borderStyle}
      >
        <button
          className={styles.button}
          onClick={() => setCountNumber((prev) => prev + 1)}
        >
          Messages
        </button>
      </Badge>
    </div>
  );
}

// Badge Controls
export function DemoBadgeBasicControls() {
  const context = useContext(BadgeControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    injectStyles,
    setInjectStyles,
    count,
    setCount,
    showZero,
    setShowZero,
    maxCount,
    setMaxCount,
    color,
    setColor,
    size,
    setSize,
    dot,
    setDot,
    processing,
    setProcessing,
    backgroundColor,
    setBackgroundColor,
    backgroundColorMode,
    setBackgroundColorMode,
    textColor,
    setTextColor,
    borderWidth,
    setBorderWidth,
    borderWidthMode,
    setBorderWidthMode,
    borderColor,
    setBorderColor,
    borderColorMode,
    setBorderColorMode,
    borderStyle,
    setBorderStyle,
  } = context;

  const colorOptions: SelectOption[] = [
    { label: 'Default', value: 'default' },
    { label: 'Primary', value: 'primary' },
    { label: 'Success', value: 'success' },
    { label: 'Warning', value: 'warning' },
    { label: 'Danger', value: 'danger' },
    { label: 'Info', value: 'info' },
    { label: 'Custom (직접 입력)', value: 'custom' },
  ];

  const sizeOptions: SelectOption[] = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
  ];

  const borderStyleOptions: SelectOption[] = [
    { label: 'None', value: 'none' },
    { label: 'Solid', value: 'solid' },
    { label: 'Dashed', value: 'dashed' },
    { label: 'Dotted', value: 'dotted' },
  ];

  // 배지 배경색 옵션
  const backgroundColorOptions: SelectOption[] = [
    { label: '기본값', value: '', colorPreview: 'transparent' },
    {
      label: 'var(--color-brand-primary)',
      value: 'var(--color-brand-primary)',
      colorPreview: 'var(--color-brand-primary)',
    },
    {
      label: 'var(--color-semantic-success)',
      value: 'var(--color-semantic-success)',
      colorPreview: 'var(--color-semantic-success)',
    },
    {
      label: 'var(--color-semantic-warning)',
      value: 'var(--color-semantic-warning)',
      colorPreview: 'var(--color-semantic-warning)',
    },
    {
      label: 'var(--color-semantic-error)',
      value: 'var(--color-semantic-error)',
      colorPreview: 'var(--color-semantic-error)',
    },
    {
      label: 'var(--color-semantic-info)',
      value: 'var(--color-semantic-info)',
      colorPreview: 'var(--color-semantic-info)',
    },
    {
      label: 'var(--color-surface)',
      value: 'var(--color-surface)',
      colorPreview: 'var(--color-surface)',
    },
    {
      label: 'var(--color-surface-hover)',
      value: 'var(--color-surface-hover)',
      colorPreview: 'var(--color-surface-hover)',
    },
    { label: '커스텀 입력', value: 'custom' },
  ];

  // 테두리 색상 옵션
  const borderColorOptions: SelectOption[] = [
    { label: '기본값', value: '', colorPreview: 'var(--color-border)' },
    {
      label: 'var(--color-border)',
      value: 'var(--color-border)',
      colorPreview: 'var(--color-border)',
    },
    {
      label: 'var(--color-border-hover)',
      value: 'var(--color-border-hover)',
      colorPreview: 'var(--color-border-hover)',
    },
    {
      label: 'var(--color-border-focus)',
      value: 'var(--color-border-focus)',
      colorPreview: 'var(--color-border-focus)',
    },
    {
      label: 'var(--color-divider)',
      value: 'var(--color-divider)',
      colorPreview: 'var(--color-divider)',
    },
    {
      label: 'var(--color-brand-primary)',
      value: 'var(--color-brand-primary)',
      colorPreview: 'var(--color-brand-primary)',
    },
    {
      label: 'var(--color-semantic-success)',
      value: 'var(--color-semantic-success)',
      colorPreview: 'var(--color-semantic-success)',
    },
    {
      label: 'var(--color-semantic-warning)',
      value: 'var(--color-semantic-warning)',
      colorPreview: 'var(--color-semantic-warning)',
    },
    {
      label: 'var(--color-semantic-error)',
      value: 'var(--color-semantic-error)',
      colorPreview: 'var(--color-semantic-error)',
    },
    {
      label: 'var(--color-semantic-info)',
      value: 'var(--color-semantic-info)',
      colorPreview: 'var(--color-semantic-info)',
    },
    { label: '커스텀 입력', value: 'custom' },
  ];

  // 테두리 두께 옵션
  const borderWidthOptions: SelectOption[] = [
    { label: 'var(--border-width-none)', value: 'var(--border-width-none)' },
    { label: 'var(--border-width-thin)', value: 'var(--border-width-thin)' },
    {
      label: 'var(--border-width-medium)',
      value: 'var(--border-width-medium)',
    },
    { label: 'var(--border-width-thick)', value: 'var(--border-width-thick)' },
    { label: '커스텀 입력', value: 'custom' },
  ];

  const isColorCustom =
    typeof color === 'string' &&
    !['default', 'primary', 'success', 'warning', 'danger', 'info'].includes(
      color,
    );

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
          label: '카운트 (Count)',
          control: (
            <Input
              type="text"
              value={String(count)}
              onChange={(value) => {
                if (value === '') {
                  setCount('');
                } else if (!isNaN(Number(value))) {
                  setCount(Number(value));
                } else {
                  setCount(value);
                }
              }}
              placeholder="숫자 또는 문자열"
              size="small"
            />
          ),
        },
        {
          label: '0 표시 (Show Zero)',
          control: (
            <Checkbox
              checked={showZero}
              onChange={(checked) => setShowZero(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '최대 카운트 (Max Count)',
          control: (
            <Input
              type="number"
              value={maxCount ? String(maxCount) : ''}
              onChange={(value) =>
                setMaxCount(value ? Number(value) : undefined)
              }
              placeholder="제한 없음"
              size="small"
            />
          ),
        },
        {
          label: '색상 (Color)',
          control: (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <Select
                options={colorOptions}
                value={isColorCustom ? 'custom' : color}
                onChange={(val) => {
                  if (!Array.isArray(val)) {
                    if (val === 'custom') {
                      setColor('var(--color-semantic-info)');
                    } else {
                      setColor(val as typeof color);
                    }
                  }
                }}
                placeholder="색상 선택"
                size="small"
              />
              {isColorCustom && (
                <Input
                  type="text"
                  value={typeof color === 'string' ? color : ''}
                  onChange={(value) => setColor(value)}
                  placeholder="커스텀 색상 (예: var(--color-semantic-info))"
                  size="small"
                />
              )}
            </div>
          ),
        },
        {
          label: '배지 배경색 (Background Color)',
          control: (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <Select
                options={backgroundColorOptions}
                value={
                  backgroundColorMode === 'custom'
                    ? 'custom'
                    : backgroundColor || ''
                }
                onChange={(val) => {
                  if (!Array.isArray(val)) {
                    if (val === 'custom') {
                      setBackgroundColorMode('custom');
                      setBackgroundColor('var(--color-semantic-info)');
                    } else if (typeof val === 'string') {
                      setBackgroundColorMode('select');
                      setBackgroundColor(val);
                    }
                  }
                }}
                placeholder="배경색 선택"
                size="small"
              />
              {backgroundColorMode === 'custom' && (
                <>
                  <Input
                    type="text"
                    value={backgroundColor}
                    onChange={(value) => setBackgroundColor(value)}
                    placeholder="예: var(--color-semantic-info) 또는 #3b82f6"
                    size="small"
                  />
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    CSS 변수 (var(--color-...)) 또는 색상 코드 (#hex, rgb, oklch
                    등)를 입력하세요.
                  </div>
                </>
              )}
            </div>
          ),
        },
        {
          label: '폰트 색상 (Text Color)',
          control: (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <Select
                options={[
                  {
                    label: '기본값',
                    value: '',
                    colorPreview: 'var(--color-text)',
                  },
                  {
                    label: 'var(--color-text)',
                    value: 'var(--color-text)',
                    colorPreview: 'var(--color-text)',
                  },
                  {
                    label: 'var(--color-text-secondary)',
                    value: 'var(--color-text-secondary)',
                    colorPreview: 'var(--color-text-secondary)',
                  },
                  {
                    label: 'var(--color-neutral-0)',
                    value: 'var(--color-neutral-0)',
                    colorPreview: 'var(--color-neutral-0)',
                  },
                  {
                    label: 'var(--color-neutral-1000)',
                    value: 'var(--color-neutral-1000)',
                    colorPreview: 'var(--color-neutral-1000)',
                  },
                  { label: '커스텀 입력', value: 'custom' },
                ]}
                value={
                  !textColor ||
                  [
                    'var(--color-text)',
                    'var(--color-text-secondary)',
                    'var(--color-neutral-0)',
                    'var(--color-neutral-1000)',
                  ].includes(textColor)
                    ? textColor || ''
                    : 'custom'
                }
                onChange={(val) => {
                  if (!Array.isArray(val)) {
                    if (val === 'custom') {
                      setTextColor('');
                    } else if (typeof val === 'string') {
                      setTextColor(val);
                    }
                  }
                }}
                placeholder="폰트 색상 선택"
                size="small"
              />
              {textColor &&
                textColor !== '' &&
                ![
                  'var(--color-text)',
                  'var(--color-text-secondary)',
                  'var(--color-neutral-0)',
                  'var(--color-neutral-1000)',
                ].includes(textColor) && (
                  <Input
                    type="text"
                    value={textColor}
                    onChange={(value) => setTextColor(value)}
                    placeholder="커스텀 폰트 색상"
                    size="small"
                  />
                )}
            </div>
          ),
        },
        {
          label: '크기 (Size)',
          control: (
            <Select
              options={sizeOptions}
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
          label: '점 표시 (Dot)',
          control: (
            <Checkbox
              checked={dot}
              onChange={(checked) => setDot(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '처리 중 (Processing)',
          control: (
            <Checkbox
              checked={processing}
              onChange={(checked) => setProcessing(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '테두리 스타일 (Border Style)',
          control: (
            <Select
              options={borderStyleOptions}
              value={borderStyle}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setBorderStyle(val as typeof borderStyle);
                }
              }}
              placeholder="테두리 스타일 선택"
              size="small"
            />
          ),
        },
        {
          label: '테두리 두께 (Border Width)',
          control: (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <Select
                options={borderWidthOptions}
                value={
                  borderWidthMode === 'custom'
                    ? 'custom'
                    : borderWidth || 'var(--border-width-thin)'
                }
                onChange={(val) => {
                  if (!Array.isArray(val)) {
                    if (val === 'custom') {
                      setBorderWidthMode('custom');
                      setBorderWidth('1px');
                    } else if (typeof val === 'string') {
                      setBorderWidthMode('select');
                      setBorderWidth(val);
                    }
                  }
                }}
                placeholder="테두리 두께 선택"
                size="small"
                disabled={borderStyle === 'none'}
              />
              {borderWidthMode === 'custom' && (
                <>
                  <Input
                    type="text"
                    value={borderWidth}
                    onChange={(value) => setBorderWidth(value)}
                    placeholder="예: 1px, 2px, var(--border-width-thin)"
                    size="small"
                    disabled={borderStyle === 'none'}
                  />
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    숫자와 단위를 함께 입력하세요 (예: 1px, 2px, 0.5rem). CSS
                    변수도 사용 가능합니다.
                  </div>
                </>
              )}
            </div>
          ),
        },
        {
          label: '테두리 색상 (Border Color)',
          control: (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <Select
                options={borderColorOptions}
                value={
                  borderColorMode === 'custom' ? 'custom' : borderColor || ''
                }
                onChange={(val) => {
                  if (!Array.isArray(val)) {
                    if (val === 'custom') {
                      setBorderColorMode('custom');
                      setBorderColor('var(--color-border)');
                    } else if (typeof val === 'string') {
                      setBorderColorMode('select');
                      setBorderColor(val);
                    }
                  }
                }}
                placeholder="테두리 색상 선택"
                size="small"
                disabled={borderStyle === 'none'}
              />
              {borderColorMode === 'custom' && (
                <>
                  <Input
                    type="text"
                    value={borderColor}
                    onChange={(value) => setBorderColor(value)}
                    placeholder="예: var(--color-border) 또는 #3b82f6"
                    size="small"
                    disabled={borderStyle === 'none'}
                  />
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    CSS 변수 (var(--color-...)) 또는 색상 코드 (#hex, rgb, oklch
                    등)를 입력하세요.
                  </div>
                </>
              )}
            </div>
          ),
        },
      ]}
    />
  );
}

// Export individual demo components for MDX
export function DemoBadgeBasic() {
  const [count, setCount] = useState(5);

  return (
    <div className={styles.container}>
      <Badge count={count}>
        <button className={styles.button} onClick={() => setCount(count + 1)}>
          Messages
        </button>
      </Badge>

      <Badge count={0} showZero>
        <span className={styles.span}>No messages</span>
      </Badge>
    </div>
  );
}

export function DemoBadgeStandalone() {
  return (
    <div className={styles.container}>
      <Badge count={99} />
      <Badge count={100} />
      <Badge count={1000} maxCount={999} />
      <Badge count="hot" />
      <Badge count="new" />
    </div>
  );
}

export function DemoBadgeColors() {
  return (
    <div className={styles.flexContainer}>
      <Badge count={3} color="default">
        <span className={styles.span}>Default</span>
      </Badge>

      <Badge count={5} color="primary">
        <span className={styles.span}>Primary</span>
      </Badge>

      <Badge count={2} color="success">
        <span className={styles.span}>Success</span>
      </Badge>

      <Badge count={1} color="warning">
        <span className={styles.span}>Warning</span>
      </Badge>

      <Badge count={7} color="danger">
        <span className={styles.span}>Danger</span>
      </Badge>

      <Badge count={4} color="info">
        <span className={styles.span}>Info</span>
      </Badge>
    </div>
  );
}

export function DemoBadgeDot() {
  return (
    <div className={styles.flexContainer}>
      <Badge dot color="success">
        <span className={styles.span}>Online</span>
      </Badge>

      <Badge dot color="warning">
        <span className={styles.span}>Busy</span>
      </Badge>

      <Badge dot color="danger">
        <span className={styles.span}>Offline</span>
      </Badge>

      <Badge dot color="primary">
        <span className={styles.span}>Active</span>
      </Badge>
    </div>
  );
}

export function DemoBadgeSizes() {
  return (
    <div className={styles.flexContainer}>
      <Badge count={3} size="small">
        <span className={styles.span}>Small</span>
      </Badge>

      <Badge count={5} size="medium">
        <span className={styles.span}>Medium</span>
      </Badge>

      <Badge count={7} size="large">
        <span className={styles.span}>Large</span>
      </Badge>
    </div>
  );
}

export function DemoBadgeProcessing() {
  return (
    <div className={styles.flexContainer}>
      <Badge count={3} processing>
        <span className={styles.span}>Processing</span>
      </Badge>

      <Badge dot processing color="primary">
        <span className={styles.span}>Loading</span>
      </Badge>
    </div>
  );
}

export function DemoBadgeInteractive() {
  const [count, setCount] = useState(5);

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <Badge count={count}>
          <button
            className={styles.button}
            onClick={() => setCount(Math.max(0, count - 1))}
          >
            Decrease
          </button>
        </Badge>

        <Badge count={count}>
          <button className={styles.button} onClick={() => setCount(count + 1)}>
            Increase
          </button>
        </Badge>

        <button className={styles.resetButton} onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
      <div
        style={{
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-secondary)',
        }}
      >
        Current count: {count}
      </div>
    </div>
  );
}

export function BadgeDemo() {
  const [count, setCount] = useState(5);

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h2>Badge 컴포넌트 데모</h2>

      <div style={{ marginBottom: '2rem' }}>
        <h3>기본 사용법</h3>
        <DemoBadgeBasic />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>독립형 뱃지</h3>
        <DemoBadgeStandalone />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>색상 variants</h3>
        <DemoBadgeColors />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>크기 variants</h3>
        <DemoBadgeSizes />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Dot 스타일</h3>
        <DemoBadgeDot />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Processing 애니메이션</h3>
        <DemoBadgeProcessing />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>인터랙티브 데모</h3>
        <DemoBadgeInteractive />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>실제 사용 사례</h3>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {/* 이메일 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '12px', color: 'oklch(51.0% 0.000 0)' }}>
              Email
            </div>
            <Badge count={12}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: 'oklch(60.5% 0.217 257.2)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '20px',
                }}
              >
                ✉️
              </div>
            </Badge>
          </div>

          {/* 알림 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '12px', color: 'oklch(51.0% 0.000 0)' }}>
              Notifications
            </div>
            <Badge count={3} color="danger">
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: 'oklch(98.2% 0.002 247.8)',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'oklch(51.0% 0.000 0)',
                  fontSize: '20px',
                }}
              >
                🔔
              </div>
            </Badge>
          </div>

          {/* 카트 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '12px', color: 'oklch(51.0% 0.000 0)' }}>
              Cart
            </div>
            <Badge count={5} color="success">
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: 'oklch(98.2% 0.002 247.8)',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'oklch(51.0% 0.000 0)',
                  fontSize: '20px',
                }}
              >
                🛒
              </div>
            </Badge>
          </div>

          {/* 온라인 상태 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '12px', color: 'oklch(51.0% 0.000 0)' }}>
              Online Status
            </div>
            <Badge dot color="success">
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: 'oklch(98.2% 0.002 247.8)',
                  border: '1px solid #dee2e6',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'oklch(51.0% 0.000 0)',
                  fontSize: '20px',
                }}
              >
                👤
              </div>
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
