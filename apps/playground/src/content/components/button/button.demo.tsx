'use client';

import React, { useState } from 'react';
import { Button } from '@repo/ui';
import { Icon } from '@repo/ui';
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from 'lucide-react';
import { Controls } from '@/components/playground/controls';
import { Checkbox } from '@repo/ui';
import * as styles from './button.demo.css';

// Button Controls Context
interface ButtonControlsContextType {
  text: string;
  setText: (text: string) => void;
  type: any;
  setType: (type: any) => void;
  color: any;
  setColor: (color: any) => void;
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  injectStyles: boolean;
  setInjectStyles: (injectStyles: boolean) => void;
}

const ButtonControlsContext =
  React.createContext<ButtonControlsContextType | null>(null);

export function DemoButtonBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [text, setText] = useState('클릭하세요');
  const [type, setType] = useState('primary');
  const [color, setColor] = useState('success');
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [injectStyles, setInjectStyles] = useState(true);

  return (
    <ButtonControlsContext.Provider
      value={{
        text,
        setText,
        type,
        setType,
        color,
        setColor,
        disabled,
        setDisabled,
        loading,
        setLoading,
        injectStyles,
        setInjectStyles,
      }}
    >
      {children}
    </ButtonControlsContext.Provider>
  );
}

export function DemoButtonBasicWithControls() {
  const context = React.useContext(ButtonControlsContext);
  if (!context) return null;

  const { text, type, color, disabled, loading, injectStyles } = context;

  return (
    <div className={styles.buttonWrapperClass}>
      <Button
        injectStyles={injectStyles}
        type={type}
        color={color}
        disabled={disabled}
        loading={loading}
      >
        {text}
      </Button>
    </div>
  );
}

export function DemoButtonBasicControls() {
  const context = React.useContext(ButtonControlsContext);
  if (!context) return null;

  const {
    text,
    setText,
    type,
    setType,
    color,
    setColor,
    disabled,
    setDisabled,
    loading,
    setLoading,
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
          label: 'Text',
          control: (
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ padding: '4px', width: '100%' }}
            />
          ),
        },
        {
          label: 'Type',
          control: (
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{ padding: '4px' }}
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="tertiary">Tertiary</option>
              <option value="dashed">Dashed</option>
              <option value="quaternary">Quaternary</option>
            </select>
          ),
        },
        {
          label: 'Color',
          control: (
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{ padding: '4px' }}
            >
              <option value="success">Success</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          ),
        },
        {
          label: 'States',
          control: (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Checkbox checked={disabled} onChange={setDisabled} size="small">
                Disabled
              </Checkbox>
              <Checkbox checked={loading} onChange={setLoading} size="small">
                Loading
              </Checkbox>
            </div>
          ),
        },
      ]}
    />
  );
}

export function DemoButtonTypes() {
  return <DemoButtonVariants />;
}

export default function ButtonDemo() {
  const [injectStyles, setInjectStyles] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const [buttonText, setButtonText] = useState('클릭하세요');
  const [buttonStyle, setButtonStyle] = useState('primary');
  const [buttonColor, setButtonColor] = useState('success');
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className={styles.demoContainer}>
      <h1 className={styles.demoTitle}>Button Component</h1>

      <div className={styles.controls}>
        <div className={styles.controlItem}>
          <label>
            <input
              type="checkbox"
              checked={injectStyles}
              onChange={(e) => setInjectStyles(e.target.checked)}
            />
            기본 스타일 주입 (injectStyles)
          </label>
        </div>
        <p className={styles.controlDescription}>
          `injectStyles` 옵션을 통해 컴포넌트 내부 CSS를 사용할지 여부를
          결정합니다.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginTop: '0.5rem',
          }}
        >
          <div className={styles.controlItem}>
            <label>Button Text: </label>
            <input
              type="text"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              style={{
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px solid var(--color-divider)',
              }}
            />
          </div>

          <div className={styles.controlItem}>
            <label>Style: </label>
            <select
              value={buttonStyle}
              onChange={(e) => setButtonStyle(e.target.value)}
              style={{ padding: '4px' }}
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="tertiary">Tertiary</option>
              <option value="dashed">Dashed</option>
              <option value="quaternary">Quaternary (Text)</option>
            </select>
          </div>

          <div className={styles.controlItem}>
            <label>Color: </label>
            <select
              value={buttonColor}
              onChange={(e) => setButtonColor(e.target.value)}
              style={{ padding: '4px' }}
            >
              <option value="success">Success</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>

          <div className={styles.controlItem}>
            <label>
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
              />
              Disabled
            </label>
            <label style={{ marginLeft: '12px' }}>
              <input
                type="checkbox"
                checked={loading}
                onChange={(e) => setLoading(e.target.checked)}
              />
              Loading
            </label>
          </div>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <Button
            onClick={() => setClickCount(0)}
            injectStyles={injectStyles}
            style={{
              width: '100%',
            }}
            size="small"
          >
            초기화
          </Button>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Interactive Preview</h2>
        <div
          className={`${styles.section} ${!injectStyles ? styles.buttonWrapperClass : ''}`}
        >
          <div className={styles.buttonGroup}>
            <Button
              injectStyles={injectStyles}
              type={getButtonStyleName()}
              color={getButtonColorName()}
              disabled={disabled}
              loading={loading}
              onClick={() => setClickCount(clickCount + 1)}
            >
              {buttonText}
            </Button>
          </div>
          <p className={styles.discription}>클릭 횟수: {clickCount}</p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Button Variants</h2>
        <DemoButtonVariants />
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Button Colors (Primary)</h2>
        <DemoButtonColors />
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Button Sizes</h2>
        <DemoButtonSize />
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Loading States</h2>
        <DemoButtonLoading />
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Icons & Combinations</h2>
        <DemoButtonIcon />
        <DemoButtonWithIcon />
        <DemoButtonRounded />
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Groups & Navigation</h2>
        <DemoButtonGroups />
      </div>
    </div>
  );
}

export function DemoButtonVariants() {
  return (
    <div className={styles.section}>
      <div className={styles.buttonGroup}>
        <Button
          type="primary"
          color="success"
          onClick={() => alert('Primary button clicked!')}
        >
          Primary
        </Button>
        <Button
          type="secondary"
          color="success"
          onClick={() => alert('Secondary button clicked!')}
        >
          Secondary
        </Button>
        <Button
          type="tertiary"
          color="success"
          onClick={() => alert('Tertiary button clicked!')}
        >
          Tertiary
        </Button>
        <Button
          type="dashed"
          color="success"
          onClick={() => alert('Dashed button clicked!')}
        >
          Dashed
        </Button>
        <Button
          type="quaternary"
          color="success"
          onClick={() => alert('Text button clicked!')}
        >
          Text
        </Button>
      </div>
      <div className={styles.buttonGroup}>
        <Button
          type="primary"
          color="warning"
          onClick={() => alert('Primary button clicked!')}
        >
          Primary
        </Button>
        <Button
          type="secondary"
          color="warning"
          onClick={() => alert('Secondary button clicked!')}
        >
          Secondary
        </Button>
        <Button
          type="tertiary"
          color="warning"
          onClick={() => alert('Tertiary button clicked!')}
        >
          Tertiary
        </Button>
        <Button
          type="dashed"
          color="warning"
          onClick={() => alert('Dashed button clicked!')}
        >
          Dashed
        </Button>
        <Button
          type="quaternary"
          color="warning"
          onClick={() => alert('Text button clicked!')}
        >
          Text
        </Button>
      </div>
      <div className={styles.buttonGroup}>
        <Button
          type="primary"
          color="info"
          onClick={() => alert('Primary button clicked!')}
        >
          Primary
        </Button>
        <Button
          type="secondary"
          color="info"
          onClick={() => alert('Secondary button clicked!')}
        >
          Secondary
        </Button>
        <Button
          type="tertiary"
          color="info"
          onClick={() => alert('Tertiary button clicked!')}
        >
          Tertiary
        </Button>
        <Button
          type="dashed"
          color="info"
          onClick={() => alert('Dashed button clicked!')}
        >
          Dashed
        </Button>
        <Button
          type="quaternary"
          color="info"
          onClick={() => alert('Text button clicked!')}
        >
          Text
        </Button>
      </div>
      <div className={styles.buttonGroup}>
        <Button
          type="primary"
          color="error"
          onClick={() => alert('Primary button clicked!')}
        >
          Primary
        </Button>
        <Button
          type="secondary"
          color="error"
          onClick={() => alert('Secondary button clicked!')}
        >
          Secondary
        </Button>
        <Button
          type="tertiary"
          color="error"
          onClick={() => alert('Tertiary button clicked!')}
        >
          Tertiary
        </Button>
        <Button
          type="dashed"
          color="error"
          onClick={() => alert('Dashed button clicked!')}
        >
          Dashed
        </Button>
        <Button
          type="quaternary"
          color="error"
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
          onClick={() => alert('Primary button clicked!')}
        >
          Primary
        </Button>
        <Button
          type="primary"
          color="info"
          onClick={() => alert('Info button clicked!')}
        >
          Info
        </Button>
        <Button
          type="primary"
          color="success"
          onClick={() => alert('Success button clicked!')}
        >
          Success
        </Button>
        <Button
          type="primary"
          color="warning"
          onClick={() => alert('Warning button clicked!')}
        >
          Warning
        </Button>
        <Button
          type="primary"
          color="error"
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
        <Button disabled>Disabled Button</Button>
        <Button disabled onClick={() => alert('This will not fire')}>
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
          onClick={() => alert('Primary button clicked!')}
        >
          Primary Style
        </Button>
        <Button
          type="dashed"
          color="success"
          onClick={() => alert('Dashed button clicked!')}
        >
          Dashed Style
        </Button>
        <Button
          type="secondary"
          color="error"
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
          onClick={() => alert('Cancel clicked!')}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          color="success"
          onClick={() => alert('Confirm clicked!')}
        >
          Confirm
        </Button>
      </div>
      <div className={styles.buttonGroup} style={{ marginTop: '1rem' }}>
        <Button
          type="quaternary"
          color="success"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <Icon icon={ArrowLeft} size="small"></Icon> Previous
        </Button>
        <span className={styles.currentPageNumber}>Page {currentPage}</span>
        <Button
          type="quaternary"
          color="success"
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
          size="tiny"
          onClick={() => alert('Tiny button clicked!')}
        >
          Tiny
        </Button>
        <Button
          type="primary"
          color="success"
          size="small"
          onClick={() => alert('Small button clicked!')}
        >
          Small
        </Button>
        <Button
          type="primary"
          color="success"
          size="medium"
          onClick={() => alert('Medium button clicked!')}
        >
          Medium
        </Button>
        <Button
          type="primary"
          color="success"
          size="large"
          onClick={() => alert('Large button clicked!')}
        >
          Large
        </Button>
        <Button
          type="primary"
          color="success"
          size="huge"
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
          onClick={() => alert('Up arrow clicked!')}
        >
          <Icon icon={ArrowUp} size="small" />
        </Button>
        <Button
          type="secondary"
          color="success"
          onClick={() => alert('Down arrow clicked!')}
        >
          <Icon icon={ArrowDown} size="small" />
        </Button>
        <Button
          type="secondary"
          color="success"
          onClick={() => alert('Left arrow clicked!')}
        >
          <Icon icon={ArrowLeft} size="small" />
        </Button>
        <Button
          type="secondary"
          color="success"
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
          onClick={() => alert('New Branch clicked!')}
        >
          ⚡ New Branch
        </Button>
        <Button
          type="primary"
          color="error"
          onClick={() => alert('Save clicked!')}
        >
          💾 Save
        </Button>
        <Button
          type="secondary"
          color="success"
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
          size="medium"
          className={styles.rounded}
          onClick={() => alert('Rounded button clicked!')}
        >
          ↑
        </Button>
        <Button
          type="primary"
          color="success"
          size="medium"
          className={styles.rounded}
          onClick={() => alert('Rounded primary clicked!')}
        >
          ✓
        </Button>
        <Button
          type="tertiary"
          color="success"
          size="medium"
          className={styles.rounded}
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
          loading={loading}
          disabled={loading}
          onClick={handleClick}
          type="primary"
          color="success"
        >
          {loading ? 'Loading...' : 'Submit'}
        </Button>
        <Button
          loading={loading}
          disabled={loading}
          onClick={handleClick}
          type="tertiary"
          color="success"
        >
          {loading ? 'Processing...' : 'Save'}
        </Button>
      </div>
    </div>
  );
}
