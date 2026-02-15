'use client';

import { useState, createContext, useContext, useRef, useEffect } from 'react';
import { Button } from '@repo/ui';
import { Input } from '@repo/ui';
import { Select } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import * as styles from './button.demo.css';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';
import { Icon } from '@repo/ui';

const STORAGE_KEY = 'headless-button-demo-state';

// Button Controls Context
interface ButtonControlsContextType {
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
  buttonText: string;
  setButtonText: (text: string) => void;
  buttonStyle: 'primary' | 'secondary' | 'tertiary' | 'dashed' | 'quaternary';
  setButtonStyle: (
    style: 'primary' | 'secondary' | 'tertiary' | 'dashed' | 'quaternary',
  ) => void;
  buttonColor: 'info' | 'success' | 'warning' | 'error';
  setButtonColor: (color: 'info' | 'success' | 'warning' | 'error') => void;
  clickCount: number;
  setClickCount: (count: number) => void;
  injectStyles: boolean;
  setInjectStyles: (value: boolean) => void;
}

const ButtonControlsContext = createContext<ButtonControlsContextType | null>(
  null,
);

// Provider
export function DemoButtonBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [disabled, setDisabled] = useState(false);
  const [buttonText, setButtonText] = useState('Click Me');
  const [buttonStyle, setButtonStyle] = useState<
    'primary' | 'secondary' | 'tertiary' | 'dashed' | 'quaternary'
  >('primary');
  const [buttonColor, setButtonColor] = useState<
    'info' | 'success' | 'warning' | 'error'
  >('success');
  const [clickCount, setClickCount] = useState(0);
  const [injectStyles, setInjectStyles] = useState(true);

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
        if (parsed.disabled !== undefined) setDisabled(parsed.disabled);
        if (parsed.buttonText !== undefined) setButtonText(parsed.buttonText);
        if (parsed.buttonStyle !== undefined)
          setButtonStyle(parsed.buttonStyle);
        if (parsed.buttonColor !== undefined)
          setButtonColor(parsed.buttonColor);
        if (parsed.clickCount !== undefined) setClickCount(parsed.clickCount);
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
        disabled,
        buttonText,
        buttonStyle,
        buttonColor,
        clickCount,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.warn('Failed to save state to localStorage:', error);
    }
  });

  return (
    <ButtonControlsContext.Provider
      value={{
        disabled,
        setDisabled,
        buttonText,
        setButtonText,
        buttonStyle,
        setButtonStyle,
        buttonColor,
        setButtonColor,
        clickCount,
        setClickCount,
        injectStyles,
        setInjectStyles,
      }}
    >
      {children}
    </ButtonControlsContext.Provider>
  );
}

// 기본 Button (컨트롤러와 함께 사용될 컴포넌트)
export function DemoButtonBasicWithControls() {
  const context = useContext(ButtonControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    disabled,
    buttonText,
    buttonStyle,
    buttonColor,
    clickCount,
    setClickCount,
    injectStyles,
  } = context;

  const getButtonStyleName = () => {
    switch (buttonStyle) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'secondary';
      case 'tertiary':
        return 'tertiary';
      case 'dashed':
        return 'dashed';
      case 'quaternary':
        return 'quaternary';
      default:
        return 'primary';
    }
  };

  const getButtonColorName = () => {
    switch (buttonColor) {
      case 'info':
        return 'info';
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'success';
    }
  };

  console.log('buttonStyle', getButtonStyleName());

  return (
    <div
      className={`${styles.section} ${!injectStyles ? styles.buttonWrapperClass : ''}`}
    >
      <div className={styles.buttonGroup}>
        <Button
          injectStyles={injectStyles}
          type={injectStyles ? undefined : getButtonStyleName()}
          color={injectStyles ? undefined : getButtonColorName()}
          className={injectStyles ? undefined : styles.demoButton}
          disabled={disabled}
          onClick={() => setClickCount(clickCount + 1)}
        >
          {buttonText}
        </Button>
      </div>
      <p className={styles.discription}>클릭 횟수: {clickCount}</p>
    </div>
  );
}

// Button Controls
export function DemoButtonBasicControls() {
  const context = useContext(ButtonControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    disabled,
    setDisabled,
    buttonText,
    setButtonText,
    buttonStyle,
    setButtonStyle,
    buttonColor,
    setButtonColor,
    clickCount,
    setClickCount,
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
          label: '버튼 텍스트',
          control: (
            <Input
              type="text"
              value={buttonText}
              onChange={setButtonText}
              placeholder="버튼 텍스트"
              size="small"
            />
          ),
        },
        {
          label: '타입 (Type)',
          control: (
            <Select
              options={[
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Tertiary', value: 'tertiary' },
                { label: 'Dashed', value: 'dashed' },
                { label: 'Quaternary', value: 'quaternary' },
              ]}
              value={buttonStyle}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  console.log('selected style:', val);
                  console.log('selected style:', buttonStyle);
                  setButtonStyle(val as typeof buttonStyle);
                }
              }}
              placeholder="스타일 선택"
              size="small"
            />
          ),
        },
        {
          label: '색상 (Color)',
          control: (
            <Select
              options={[
                { label: 'Info', value: 'info' },
                { label: 'Success', value: 'success' },
                { label: 'Warning', value: 'warning' },
                { label: 'Error', value: 'error' },
              ]}
              value={buttonColor}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  console.log('selected style:', val);
                  console.log('selected style:', buttonColor);
                  setButtonColor(val as typeof buttonColor);
                }
              }}
              placeholder="스타일 선택"
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
          label: '클릭 횟수 초기화',
          control: (
            <Button
              onClick={() => setClickCount(0)}
              injectStyles={injectStyles}
              style={{
                width: '100%',
              }}
              className={injectStyles ? undefined : styles.small}
            >
              초기화
            </Button>
          ),
        },
      ]}
    />
  );
}

// 기존 예제들 (props 조합으로만 차별화)
export function DemoButtonTypes() {
  return (
    <div className={styles.section}>
      <div className={styles.buttonGroup}>
        <Button
          type="primary"
          color="success"
          className={styles.demoButton}
          onClick={() => alert('Primary button clicked!')}
        >
          Primary
        </Button>
        <Button
          type="secondary"
          color="success"
          className={styles.demoButton}
          onClick={() => alert('Secondary button clicked!')}
        >
          Secondary
        </Button>
        <Button
          type="tertiary"
          color="success"
          className={styles.demoButton}
          onClick={() => alert('Tertiary button clicked!')}
        >
          Tertiary
        </Button>
        <Button
          type="dashed"
          color="success"
          className={styles.demoButton}
          onClick={() => alert('Dashed button clicked!')}
        >
          Dashed
        </Button>
        <Button
          type="quaternary"
          color="success"
          className={styles.demoButton}
          onClick={() => alert('Text button clicked!')}
        >
          Text
        </Button>
      </div>
      <div className={styles.buttonGroup}>
        <Button
          type="primary"
          color="warn"
          className={styles.demoButton}
          onClick={() => alert('Primary button clicked!')}
        >
          Primary
        </Button>
        <Button
          type="secondary"
          color="warn"
          className={styles.demoButton}
          onClick={() => alert('Secondary button clicked!')}
        >
          Secondary
        </Button>
        <Button
          type="tertiary"
          color="warn"
          className={styles.demoButton}
          onClick={() => alert('Tertiary button clicked!')}
        >
          Tertiary
        </Button>
        <Button
          type="dashed"
          color="warn"
          className={styles.demoButton}
          onClick={() => alert('Dashed button clicked!')}
        >
          Dashed
        </Button>
        <Button
          type="quaternary"
          color="warn"
          className={styles.demoButton}
          onClick={() => alert('Text button clicked!')}
        >
          Text
        </Button>
      </div>
      <div className={styles.buttonGroup}>
        <Button
          type="primary"
          color="info"
          className={styles.demoButton}
          onClick={() => alert('Primary button clicked!')}
        >
          Primary
        </Button>
        <Button
          type="secondary"
          color="info"
          className={styles.demoButton}
          onClick={() => alert('Secondary button clicked!')}
        >
          Secondary
        </Button>
        <Button
          type="tertiary"
          color="info"
          className={styles.demoButton}
          onClick={() => alert('Tertiary button clicked!')}
        >
          Tertiary
        </Button>
        <Button
          type="dashed"
          color="info"
          className={styles.demoButton}
          onClick={() => alert('Dashed button clicked!')}
        >
          Dashed
        </Button>
        <Button
          type="quaternary"
          color="info"
          className={styles.demoButton}
          onClick={() => alert('Text button clicked!')}
        >
          Text
        </Button>
      </div>
      <div className={styles.buttonGroup}>
        <Button
          type="primary"
          color="error"
          className={styles.demoButton}
          onClick={() => alert('Primary button clicked!')}
        >
          Primary
        </Button>
        <Button
          type="secondary"
          color="error"
          className={styles.demoButton}
          onClick={() => alert('Secondary button clicked!')}
        >
          Secondary
        </Button>
        <Button
          type="tertiary"
          color="error"
          className={styles.demoButton}
          onClick={() => alert('Tertiary button clicked!')}
        >
          Tertiary
        </Button>
        <Button
          type="dashed"
          color="error"
          className={styles.demoButton}
          onClick={() => alert('Dashed button clicked!')}
        >
          Dashed
        </Button>
        <Button
          type="quaternary"
          color="error"
          className={styles.demoButton}
          onClick={() => alert('Text button clicked!')}
        >
          Text
        </Button>
      </div>
    </div>
  );
}

export function DemoButtonColors() {
  return (
    <div className={styles.section}>
      <div className={styles.buttonGroup}>
        <Button
          type="primary"
          color="success"
          className={styles.demoButton}
          onClick={() => alert('Primary button clicked!')}
        >
          Primary
        </Button>
        <Button
          type="primary"
          color="info"
          className={styles.demoButton}
          onClick={() => alert('Info button clicked!')}
        >
          Info
        </Button>
        <Button
          type="primary"
          color="success"
          className={styles.demoButton}
          onClick={() => alert('Success button clicked!')}
        >
          Success
        </Button>
        <Button
          type="primary"
          color="warn"
          className={styles.demoButton}
          onClick={() => alert('Warning button clicked!')}
        >
          Warning
        </Button>
        <Button
          type="primary"
          color="error"
          className={styles.demoButton}
          onClick={() => alert('Error button clicked!')}
        >
          Error
        </Button>
      </div>
    </div>
  );
}

export function DemoButtonDefault() {
  return (
    <div className={styles.section}>
      <div className={styles.buttonGroup}>
        <Button onClick={() => alert('Button clicked!')}>Click Me</Button>
        <Button onClick={() => console.log('Clicked')}>Log to Console</Button>
      </div>
    </div>
  );
}

export function DemoButtonDisabled() {
  return (
    <div className={styles.section}>
      <div className={styles.buttonGroup}>
        <Button className={styles.demoButton} disabled>
          Disabled Button
        </Button>
        <Button
          className={styles.demoButton}
          disabled
          onClick={() => alert('This will not fire')}
        >
          Disabled with Handler
        </Button>
      </div>
    </div>
  );
}

export function DemoButtonEvents() {
  const [log, setLog] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLog((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
    setTimeout(() => setLog((prev) => prev.slice(1)), 3000);
  };

  return (
    <div className={styles.section}>
      <div className={styles.buttonGroup}>
        <Button
          type="primary"
          color="success"
          className={styles.demoButton}
          onClick={() => addLog('Clicked!')}
        >
          Interactive Button
        </Button>
      </div>
      {log.length > 0 && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: 'var(--color-surface-hover)',
            borderRadius: '6px',
            maxHeight: '150px',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: 'var(--color-text-secondary)',
            }}
          >
            Event Log:
          </div>
          {log.map((msg, i) => (
            <div
              key={i}
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                marginBottom: '0.25rem',
              }}
            >
              {msg}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function DemoButtonCustom() {
  return (
    <div className={styles.section}>
      <div className={styles.buttonGroup}>
        <Button
          type="primary"
          color="success"
          className={styles.demoButton}
          onClick={() => alert('Primary button clicked!')}
        >
          Primary Style
        </Button>
        <Button
          type="dashed"
          color="success"
          className={styles.demoButton}
          onClick={() => alert('Dashed button clicked!')}
        >
          Dashed Style
        </Button>
        <Button
          type="secondary"
          color="error"
          className={styles.demoButton}
          onClick={() => alert('Error button clicked!')}
        >
          Error Style
        </Button>
      </div>
    </div>
  );
}

export function DemoButtonGroups() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className={styles.section}>
      <div className={styles.buttonGroup}>
        <Button
          type="secondary"
          color="error"
          className={styles.demoButton}
          onClick={() => alert('Cancel clicked!')}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          color="success"
          className={styles.demoButton}
          onClick={() => alert('Confirm clicked!')}
        >
          Confirm
        </Button>
      </div>
      <div className={styles.buttonGroup} style={{ marginTop: '1rem' }}>
        <Button
          type="quaternary"
          color="success"
          className={styles.demoButton}
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <Icon icon={ArrowLeft} size="small"></Icon> Previous
        </Button>
        <span className={styles.currentPageNumber}>Page {currentPage}</span>
        <Button
          type="quaternary"
          color="success"
          className={styles.demoButton}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next <Icon icon={ArrowRight} size="small"></Icon>
        </Button>
      </div>
    </div>
  );
}

// Legacy exports for backward compatibility
export function DemoButton() {
  return <DemoButtonDefault />;
}

export function DemoButtonSize() {
  return (
    <div className={styles.section}>
      <div className={styles.buttonGroup}>
        <Button
          type="primary"
          color="success"
          className={`${styles.demoButton} ${styles.tiny}`}
          onClick={() => alert('Tiny button clicked!')}
        >
          Tiny
        </Button>
        <Button
          type="primary"
          color="success"
          className={`${styles.demoButton} ${styles.small}`}
          onClick={() => alert('Small button clicked!')}
        >
          Small
        </Button>
        <Button
          type="primary"
          color="success"
          className={`${styles.demoButton} ${styles.medium}`}
          onClick={() => alert('Medium button clicked!')}
        >
          Medium
        </Button>
        <Button
          type="primary"
          color="success"
          className={`${styles.demoButton} ${styles.large}`}
          onClick={() => alert('Large button clicked!')}
        >
          Large
        </Button>
        <Button
          type="primary"
          color="success"
          className={`${styles.demoButton} ${styles.huge}`}
          onClick={() => alert('Huge button clicked!')}
        >
          Huge
        </Button>
      </div>
    </div>
  );
}

export function DemoButtonOutline() {
  return (
    <div className={styles.section}>
      <Button
        type="secondary"
        color="success"
        className={styles.demoButton}
        onClick={() => alert('Secondary button clicked!')}
      >
        Secondary
      </Button>
    </div>
  );
}

export function DemoButtonSecondary() {
  return (
    <div className={styles.section}>
      <Button
        type="secondary"
        color="success"
        className={styles.demoButton}
        onClick={() => alert('Secondary button clicked!')}
      >
        Secondary
      </Button>
    </div>
  );
}

export function DemoButtonGhost() {
  return (
    <div className={styles.section}>
      <Button
        type="tertiary"
        color="success"
        className={styles.demoButton}
        onClick={() => alert('Tertiary button clicked!')}
      >
        Tertiary
      </Button>
    </div>
  );
}

export function DemoButtonDestructive() {
  return (
    <div className={styles.section}>
      <Button
        type="tertiary"
        color="error"
        className={styles.demoButton}
        onClick={() => alert('Error button clicked!')}
      >
        Error
      </Button>
    </div>
  );
}

export function DemoButtonLink() {
  return (
    <div className={styles.section}>
      <Button
        type="quaternary"
        color="success"
        className={styles.demoButton}
        onClick={() => alert('Text button clicked!')}
      >
        Text
      </Button>
    </div>
  );
}

export function DemoButtonIcon() {
  return (
    <div className={styles.section}>
      <div className={styles.buttonGroup}>
        <Button
          type="secondary"
          color="success"
          className={`${styles.demoButton} ${styles.icon}`}
          onClick={() => alert('Up arrow clicked!')}
        >
          <Icon icon={ArrowUp} size="small" />
        </Button>
        <Button
          type="secondary"
          color="success"
          className={`${styles.demoButton} ${styles.icon}`}
          onClick={() => alert('Down arrow clicked!')}
        >
          <Icon icon={ArrowDown} size="small" />
        </Button>
        <Button
          type="secondary"
          color="success"
          className={`${styles.demoButton} ${styles.icon}`}
          onClick={() => alert('Left arrow clicked!')}
        >
          <Icon icon={ArrowLeft} size="small" />
        </Button>
        <Button
          type="secondary"
          color="success"
          className={`${styles.demoButton} ${styles.icon}`}
          onClick={() => alert('Right arrow clicked!')}
        >
          <Icon icon={ArrowRight} size="small" />
        </Button>
      </div>
    </div>
  );
}

export function DemoButtonWithIcon() {
  return (
    <div className={styles.section}>
      <div className={styles.buttonGroup}>
        <Button
          type="secondary"
          color="success"
          className={`${styles.demoButton} ${styles.withIcon}`}
          onClick={() => alert('New Branch clicked!')}
        >
          ⚡ New Branch
        </Button>
        <Button
          type="primary"
          color="error"
          className={`${styles.demoButton} ${styles.withIcon}`}
          onClick={() => alert('Save clicked!')}
        >
          💾 Save
        </Button>
        <Button
          type="secondary"
          color="success"
          className={`${styles.demoButton} ${styles.withIcon}`}
          onClick={() => alert('Check clicked!')}
        >
          ✓ Check
        </Button>
      </div>
    </div>
  );
}

export function DemoButtonRounded() {
  return (
    <div className={styles.section}>
      <div className={styles.buttonGroup}>
        <Button
          type="secondary"
          color="success"
          className={`${styles.demoButton} ${styles.icon} ${styles.rounded}`}
          onClick={() => alert('Rounded button clicked!')}
        >
          ↑
        </Button>
        <Button
          type="primary"
          color="success"
          className={`${styles.demoButton} ${styles.icon} ${styles.rounded}`}
          onClick={() => alert('Rounded primary clicked!')}
        >
          ✓
        </Button>
        <Button
          type="tertiary"
          color="success"
          className={`${styles.demoButton} ${styles.icon} ${styles.rounded}`}
          onClick={() => alert('Rounded success clicked!')}
        >
          ✓
        </Button>
      </div>
    </div>
  );
}

export function DemoButtonLoading() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className={styles.section}>
      <div className={styles.buttonGroup}>
        <Button
          disabled={loading}
          onClick={handleClick}
          type="primary"
          color="success"
          className={`${styles.demoButton} ${loading ? styles.loading : ''}`}
        >
          {loading ? 'Loading...' : 'Submit'}
        </Button>
        <Button
          disabled={loading}
          onClick={handleClick}
          type="tertiary"
          color="success"
          className={`${styles.demoButton} ${loading ? styles.loading : ''}`}
        >
          {loading ? 'Processing...' : 'Save'}
        </Button>
      </div>
    </div>
  );
}
