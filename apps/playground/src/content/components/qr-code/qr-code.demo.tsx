'use client';

import React, { useState, createContext, useContext } from 'react';
import { QrCode } from '@repo/ui';
import { Input } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import * as styles from './qr-code.demo.css';

// QrCode Controls Context
interface QrCodeControlsContextType {
  value: string;
  setValue: (value: string) => void;
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
  injectStyles: boolean;
  setInjectStyles: (value: boolean) => void;
}

const QrCodeControlsContext = createContext<QrCodeControlsContextType | null>(
  null,
);

// Provider
export function DemoQrCodeBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [value, setValue] = useState('https://example.com');
  const [disabled, setDisabled] = useState(false);
  const [injectStyles, setInjectStyles] = useState(true);

  return (
    <QrCodeControlsContext.Provider
      value={{
        value,
        setValue,
        disabled,
        setDisabled,
        injectStyles,
        setInjectStyles,
      }}
    >
      {children}
    </QrCodeControlsContext.Provider>
  );
}

// 기본 QrCode (컨트롤러와 함께 사용될 컴포넌트)
export function DemoQrCodeBasicWithControls() {
  const context = useContext(QrCodeControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { value, disabled, injectStyles } = context;

  return (
    <div
      className={!injectStyles ? styles.qrCodeWrapperClass : ''}
      style={{ padding: '2rem' }}
    >
      <QrCode
        value={value}
        disabled={disabled}
        injectStyles={injectStyles}
        className={injectStyles ? undefined : styles.qrcode}
      />
      <p
        style={{
          marginTop: '1rem',
          color: 'var(--color-text-secondary)',
          fontSize: '14px',
        }}
      >
        현재 값: {value}
      </p>
    </div>
  );
}

// QrCode Controls
export function DemoQrCodeBasicControls() {
  const context = useContext(QrCodeControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    value,
    setValue,
    disabled,
    setDisabled,
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
          label: '값 (Value)',
          control: (
            <Input
              type="text"
              value={value}
              onChange={setValue}
              placeholder="QR 코드 값"
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
      ]}
    />
  );
}

export function DemoQrCodeBasic() {
  const [value, setValue] = useState('https://example.com');

  return (
    <div style={{ padding: '2rem' }}>
      <img
        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
          value,
        )}`}
      />
      <QrCode value={value} onChange={setValue} />
      <p
        style={{
          marginTop: '1rem',
          color: 'var(--color-text-secondary)',
          fontSize: '14px',
        }}
      >
        현재 값: {JSON.stringify(value)}
      </p>
      <p
        style={{
          marginTop: '0.5rem',
          color: 'var(--color-text-muted)',
          fontSize: '12px',
        }}
      >
        ⚠️ 이 컴포넌트는 현재 개발 중입니다.
      </p>
    </div>
  );
}
