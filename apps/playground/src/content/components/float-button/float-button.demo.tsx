'use client';

import { createContext, useContext, useRef, useState } from 'react';
import {
  FloatButton,
  FloatButtonGroup,
  FloatButtonBackTop,
} from '@repo/ui';
import { Checkbox } from '@repo/ui';
import * as styles from './float-button.demo.css';

type FloatButtonControlsContextType = {
  injectStyles: boolean;
  setInjectStyles: (value: boolean) => void;
};

const FloatButtonControlsContext =
  createContext<FloatButtonControlsContextType | null>(null);

export function DemoFloatButtonProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);

  return (
    <FloatButtonControlsContext.Provider
      value={{ injectStyles, setInjectStyles }}
    >
      {children}
    </FloatButtonControlsContext.Provider>
  );
}

function useDemoFloatButtonControls() {
  const context = useContext(FloatButtonControlsContext);
  if (!context) {
    return null;
  }
  return context;
}

// Basic Float Button Demo
export function DemoFloatButtonBasic() {
  const context = useDemoFloatButtonControls();
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { injectStyles } = context;

  const handleClick = (action: string) => {
    alert(`Clicked: ${action}`);
  };

  return (
    <div
      className={`${styles.section} ${!injectStyles ? styles.floatButtonWrapperClass : ''}`}
    >
      <div className={styles.demoArea}>
        <p className={styles.demoAreaText}>Basic floating button examples.</p>

        {/* Default */}
        <FloatButton
          injectStyles={injectStyles}
          position="bottom-right"
          onClick={() => handleClick('Default Action')}
          tooltip="Default button"
        >
          <span className={styles.buttonIcon}>➕</span>
        </FloatButton>

        {/* Primary */}
        <FloatButton
          injectStyles={injectStyles}
          position="bottom-left"
          type="primary"
          onClick={() => handleClick('Primary Action')}
          tooltip="Primary button"
        >
          <span className={styles.buttonIcon}>🚀</span>
        </FloatButton>

        {/* Info */}
        <FloatButton
          injectStyles={injectStyles}
          position="top-right"
          type="info"
          onClick={() => handleClick('Info Action')}
          tooltip="Info button"
        >
          <span className={styles.buttonIcon}>ℹ️</span>
        </FloatButton>
      </div>
    </div>
  );
}

// Type Variants Demo
export function DemoFloatButtonTypes() {
  const context = useDemoFloatButtonControls();
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { injectStyles } = context;

  const handleClick = (type: string) => {
    alert(`${type} button clicked!`);
  };

  return (
    <div className={styles.section}>
      <div className={styles.demoArea}>
        <p className={styles.demoAreaText}>
          Different button types and colors.
        </p>

        <FloatButtonGroup injectStyles={injectStyles} direction="row">
          <FloatButton
            position="bottom-right"
            type="default"
            onClick={() => handleClick('Default')}
            tooltip="Default"
          >
            <span className={styles.buttonIcon}>📄</span>
          </FloatButton>

          <FloatButton
            position="bottom-right"
            type="primary"
            onClick={() => handleClick('Primary')}
            tooltip="Primary"
          >
            <span className={styles.buttonIcon}>🔵</span>
          </FloatButton>

          <FloatButton
            position="bottom-right"
            type="info"
            onClick={() => handleClick('Info')}
            tooltip="Info"
          >
            <span className={styles.buttonIcon}>🔷</span>
          </FloatButton>

          <FloatButton
            position="bottom-right"
            type="success"
            onClick={() => handleClick('Success')}
            tooltip="Success"
          >
            <span className={styles.buttonIcon}>🟢</span>
          </FloatButton>

          <FloatButton
            position="bottom-right"
            type="warning"
            onClick={() => handleClick('Warning')}
            tooltip="Warning"
          >
            <span className={styles.buttonIcon}>🟡</span>
          </FloatButton>

          <FloatButton
            position="bottom-right"
            type="error"
            onClick={() => handleClick('Error')}
            tooltip="Error"
          >
            <span className={styles.buttonIcon}>🔴</span>
          </FloatButton>
        </FloatButtonGroup>
      </div>
    </div>
  );
}

// Shape Variants Demo
export function DemoFloatButtonShapes() {
  const context = useDemoFloatButtonControls();
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { injectStyles } = context;

  return (
    <div className={styles.section}>
      <div className={styles.demoArea}>
        <p className={styles.demoAreaText}>Circle and square button shapes.</p>
        <FloatButtonGroup injectStyles={injectStyles} direction="row">
          <FloatButton
            position="bottom-left"
            shape="circle"
            onClick={() => alert('Circle button!')}
            tooltip="Circle shape"
          >
            <span className={styles.buttonIcon}>⭕</span>
          </FloatButton>

          <FloatButton
            position="bottom-left"
            shape="square"
            onClick={() => alert('Square button!')}
            tooltip="Square shape"
          >
            <span className={styles.buttonIcon}>⬜</span>
          </FloatButton>
        </FloatButtonGroup>
      </div>
    </div>
  );
}

// State Variants Demo (Loading, Disabled)
export function DemoFloatButtonStates() {
  const context = useDemoFloatButtonControls();
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { injectStyles } = context;

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className={styles.section}>
      <div className={styles.demoArea}>
        <p className={styles.demoAreaText}>
          Loading and disabled button states.
        </p>

        <FloatButton
          injectStyles={injectStyles}
          position="bottom-right"
          loading={loading}
          onClick={handleLoadingClick}
          tooltip={loading ? 'Loading...' : 'Click to load'}
        >
          {loading ? (
            <span className={styles.buttonIcon}>⏳</span>
          ) : (
            <span className={styles.buttonIcon}>⚡</span>
          )}
        </FloatButton>

        <FloatButton
          injectStyles={injectStyles}
          position="bottom-left"
          disabled={disabled}
          onClick={() => alert('This should not work')}
          tooltip="Disabled button"
        >
          <span className={styles.buttonIcon}>🚫</span>
        </FloatButton>

        <div className={styles.controls}>
          <Checkbox
            checked={disabled}
            onChange={(checked) => setDisabled(checked)}
            size="small"
          >
            Disable button
          </Checkbox>
        </div>
      </div>
    </div>
  );
}

// Size Variants Demo
export function DemoFloatButtonSizes() {
  const context = useDemoFloatButtonControls();
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { injectStyles } = context;

  return (
    <div className={styles.section}>
      <div className={styles.sizeDemo}>
        <div className={styles.sizeItem}>
          <FloatButton
            injectStyles={injectStyles}
            position="bottom-center"
            size="small"
            onClick={() => alert('Small button!')}
            tooltip="Small size"
          >
            <span className={styles.buttonIconSmall}>⭐</span>
          </FloatButton>
          <span className={styles.sizeLabel}>Small</span>
        </div>
        <div className={styles.sizeItem}>
          <FloatButton
            injectStyles={injectStyles}
            position="bottom-center"
            size="medium"
            onClick={() => alert('Medium button!')}
            tooltip="Medium size"
          >
            <span className={styles.buttonIcon}>⭐</span>
          </FloatButton>
          <span className={styles.sizeLabel}>Medium</span>
        </div>
        <div className={styles.sizeItem}>
          <FloatButton
            injectStyles={injectStyles}
            position="bottom-center"
            size="large"
            onClick={() => alert('Large button!')}
            tooltip="Large size"
          >
            <span className={styles.buttonIconLarge}>⭐</span>
          </FloatButton>
          <span className={styles.sizeLabel}>Large</span>
        </div>
      </div>
    </div>
  );
}

// Back to Top Demo
export function DemoFloatButtonBackTop() {
  const context = useDemoFloatButtonControls();
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { injectStyles } = context;

  const demoAreaRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.section}>
      <div className={styles.demoArea} ref={demoAreaRef}>
        <p className={styles.demoAreaText}>
          Scroll down to see the back-to-top button appear.
        </p>
        <div style={{ height: '1000px', padding: '20px' }}>
          <p>Scroll down...</p>
          <p>Keep scrolling...</p>
          <p>Almost there...</p>
          <p>Now you can see the back-to-top button!</p>
        </div>

        <FloatButtonBackTop
          injectStyles={injectStyles}
          tooltip="Back to top"
          target={() => demoAreaRef.current!}
        >
          <span className={styles.buttonIcon}>⬆️</span>
        </FloatButtonBackTop>
      </div>
    </div>
  );
}

// Group Demo
export function DemoFloatButtonGroup() {
  const context = useDemoFloatButtonControls();
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { injectStyles } = context;

  return (
    <div className={styles.section}>
      <div className={styles.demoArea}>
        <p className={styles.demoAreaText}>Grouped floating buttons.</p>

        <FloatButtonGroup injectStyles={injectStyles} direction="row">
          <FloatButton type="primary" tooltip="Primary action">
            <span className={styles.buttonIcon}>➕</span>
          </FloatButton>
          <FloatButton type="success" tooltip="Success action">
            <span className={styles.buttonIcon}>✓</span>
          </FloatButton>
          <FloatButton type="warning" tooltip="Warning action">
            <span className={styles.buttonIcon}>⚠️</span>
          </FloatButton>
        </FloatButtonGroup>
      </div>
    </div>
  );
}

export function DemoFloatButtonControls() {
  const context = useContext(FloatButtonControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { injectStyles, setInjectStyles } = context;

  return (
    <div className={styles.controls}>
      <p className={styles.controlDescription}>
        Float buttons provide quick access to common actions. They can be
        positioned anywhere on screen and support various states.
      </p>
      <Checkbox checked={injectStyles} onChange={setInjectStyles} size="small">
        Inject Styles
      </Checkbox>
    </div>
  );
}
