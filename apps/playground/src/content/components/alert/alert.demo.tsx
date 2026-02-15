'use client';

import { useState, createContext, useContext, useEffect, useRef } from 'react';
import { Alert } from '@repo/ui';
import { Select } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Input } from '@repo/ui';
import { Textarea } from '@repo/ui';
import { Button } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import type { SelectOption } from '@repo/ui';
import * as styles from './alert.demo.css';

const STORAGE_KEY = 'headless-alert-demo-state';

// Alert Controls Context
interface AlertControlsContextType {
  injectStyles: boolean;
  setInjectStyles: (injectStyles: boolean) => void;
  type: 'success' | 'info' | 'warning' | 'error';
  setType: (type: 'success' | 'info' | 'warning' | 'error') => void;
  showIcon: boolean;
  setShowIcon: (showIcon: boolean) => void;
  closable: boolean;
  setClosable: (closable: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  size: 'small' | 'medium' | 'large';
  setSize: (size: 'small' | 'medium' | 'large') => void;
}

const AlertControlsContext = createContext<AlertControlsContextType | null>(
  null,
);

// Provider
export function DemoAlertBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);
  const [type, setType] = useState<'success' | 'info' | 'warning' | 'error'>(
    'info',
  );
  const [showIcon, setShowIcon] = useState(false);
  const [closable, setClosable] = useState(false);
  const [title, setTitle] = useState('Alert Title');
  const [description, setDescription] = useState(
    'This is an alert description.',
  );
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');

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
        if (parsed.type !== undefined) setType(parsed.type);
        if (parsed.showIcon !== undefined) setShowIcon(parsed.type);
        if (parsed.closable !== undefined) setClosable(parsed.closable);
        if (parsed.title !== undefined) setTitle(parsed.title);
        if (parsed.description !== undefined)
          setDescription(parsed.description);
        if (parsed.size !== undefined) setSize(parsed.size);
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
        type,
        showIcon,
        closable,
        title,
        description,
        size,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.warn('Failed to save state to localStorage:', error);
    }
  });

  return (
    <AlertControlsContext.Provider
      value={{
        injectStyles,
        setInjectStyles,
        type,
        setType,
        showIcon,
        setShowIcon,
        closable,
        setClosable,
        title,
        setTitle,
        description,
        setDescription,
        size,
        setSize,
      }}
    >
      {children}
    </AlertControlsContext.Provider>
  );
}

// 기본 Alert (컨트롤러와 함께 사용될 컴포넌트)
export function DemoAlertBasicWithControls() {
  const context = useContext(AlertControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { injectStyles, type, showIcon, closable, title, description, size } =
    context;
  const [visible, setVisible] = useState(true);

  if (!visible && closable) {
    return (
      <Button
        type="primary"
        color="success"
        className={styles.demoButtons}
        onClick={() => setVisible(true)}
      >
        Show Alert Again
      </Button>
    );
  }

  return (
    <div
      className={`${styles.container} ${!injectStyles ? styles.alertWrapperClass : ''}`}
    >
      <Alert
        injectStyles={injectStyles}
        type={type}
        showIcon={showIcon}
        closable={closable}
        title={title}
        description={description}
        size={size}
        onClose={closable ? () => setVisible(false) : undefined}
      />
    </div>
  );
}

// Alert Controls
export function DemoAlertBasicControls() {
  const context = useContext(AlertControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    injectStyles,
    setInjectStyles,
    type,
    setType,
    showIcon,
    setShowIcon,
    closable,
    setClosable,
    title,
    setTitle,
    description,
    setDescription,
    size,
    setSize,
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
          label: '타입 (Type)',
          control: (
            <Select
              options={[
                { label: 'Success', value: 'success' },
                { label: 'Info', value: 'info' },
                { label: 'Warning', value: 'warning' },
                { label: 'Error', value: 'error' },
              ]}
              value={type}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setType(val as typeof type);
                }
              }}
              placeholder="타입 선택"
              size="small"
            />
          ),
        },
        {
          label: '아이콘 표시 (Show Icon)',
          control: (
            <Checkbox
              checked={showIcon}
              onChange={(checked) => setShowIcon(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '닫기 버튼 (Closable)',
          control: (
            <Checkbox
              checked={closable}
              onChange={(checked) => setClosable(checked)}
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
          label: '설명 (Description)',
          control: (
            <Textarea
              value={description}
              onChange={setDescription}
              rows={3}
              placeholder="설명 텍스트"
              size="small"
            />
          ),
        },
        {
          label: '크기 (Size)',
          control: (
            <Select
              options={[
                { label: 'Small', value: 'small' },
                { label: 'Medium', value: 'medium' },
                { label: 'Large', value: 'large' },
              ]}
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
      ]}
    />
  );
}

export function DemoAlertBasic() {
  return (
    <div className={styles.container}>
      <Alert
        type="success"
        title="Success!"
        description="Operation completed successfully."
      />
      <Alert type="error" title="Error!" description="Something went wrong." />
      <Alert
        type="warning"
        title="Warning!"
        description="Please check your input."
      />
      <Alert type="info" title="Info" description="Here's some information." />
    </div>
  );
}

export function DemoAlertWithIcon() {
  return (
    <div className={styles.container}>
      <Alert
        type="success"
        showIcon
        title="Success!"
        description="Data saved successfully."
      />
      <Alert
        type="error"
        showIcon
        title="Failed!"
        description="Unable to connect to server."
      />
    </div>
  );
}

export function DemoAlertClosable() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <Button
        type="primary"
        color="success"
        onClick={() => setVisible(true)}
        className={styles.demoButtons}
      >
        Show Alert Again
      </Button>
    );
  }

  return (
    <Alert
      type="info"
      showIcon
      closable
      title="Closable Alert"
      description="You can close this alert by clicking the X button."
      onClose={() => setVisible(false)}
    />
  );
}

export function DemoAlertBanner() {
  return (
    <Alert
      type="warning"
      banner
      title="System Maintenance"
      description="Scheduled maintenance will begin at 2 AM EST."
    />
  );
}
