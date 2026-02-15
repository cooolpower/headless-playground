'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Avatar } from '@repo/ui';
import { Select } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Input } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import type { SelectOption } from '@repo/ui';
import * as styles from './avatar.demo.css';

const STORAGE_KEY = 'headless-avatar-demo-state';

// Avatar Controls Context
interface AvatarControlsContextType {
  injectStyles: boolean;
  setInjectStyles: (injectStyles: boolean) => void;
  size: 'small' | 'medium' | 'large';
  setSize: (size: 'small' | 'medium' | 'large') => void;
  src: string;
  setSrc: (src: string) => void;
  fallback: string;
  setFallback: (fallback: string) => void;
  useImage: boolean;
  setUseImage: (useImage: boolean) => void;
}

const AvatarControlsContext = createContext<AvatarControlsContextType | null>(
  null,
);

// Provider
export function DemoAvatarBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [src, setSrc] = useState(
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
  );
  const [fallback, setFallback] = useState('JD');
  const [useImage, setUseImage] = useState(true);

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
        if (parsed.size !== undefined) setSize(parsed.size);
        if (parsed.src !== undefined) setSrc(parsed.src);
        if (parsed.fallback !== undefined) setFallback(parsed.fallback);
        if (parsed.useImage !== undefined) setUseImage(parsed.useImage);
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
        size,
        src,
        fallback,
        useImage,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.warn('Failed to save state to localStorage:', error);
    }
  });

  return (
    <AvatarControlsContext.Provider
      value={{
        injectStyles,
        setInjectStyles,
        size,
        setSize,
        src,
        setSrc,
        fallback,
        setFallback,
        useImage,
        setUseImage,
      }}
    >
      {children}
    </AvatarControlsContext.Provider>
  );
}

// 기본 Avatar (컨트롤러와 함께 사용될 컴포넌트)
export function DemoAvatarBasicWithControls() {
  const context = useContext(AvatarControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { injectStyles, size, src, fallback, useImage } = context;

  return (
    <div
      className={`${styles.section} ${!injectStyles ? styles.avatarWrapperClass : ''}`}
    >
      <div className={styles.avatarGroup}>
        <div className={`${styles.avatarWrapper} ${styles[size]}`}>
          <Avatar
            injectStyles={injectStyles}
            size={size}
            src={useImage ? src : undefined}
            alt="User Avatar"
            fallback={fallback}
          />
        </div>
      </div>
    </div>
  );
}

// Avatar Controls
export function DemoAvatarBasicControls() {
  const context = useContext(AvatarControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    injectStyles,
    setInjectStyles,
    size,
    setSize,
    src,
    setSrc,
    fallback,
    setFallback,
    useImage,
    setUseImage,
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
        {
          label: '이미지 사용',
          control: (
            <Checkbox
              checked={useImage}
              onChange={(checked) => setUseImage(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '이미지 URL (Image URL)',
          control: (
            <Input
              type="text"
              value={src}
              onChange={setSrc}
              disabled={!useImage}
              placeholder="https://..."
              size="small"
            />
          ),
        },
        {
          label: '대체 텍스트 (Fallback)',
          control: (
            <Input
              type="text"
              value={fallback}
              onChange={setFallback}
              placeholder="JD"
              size="small"
            />
          ),
        },
      ]}
    />
  );
}

// Size Variants Demo
export function DemoAvatarSizes() {
  return (
    <div className={styles.section}>
      <div className={styles.avatarGroup}>
        <div className={`${styles.avatarWrapper} ${styles.small}`}>
          <Avatar size="small" fallback="SM" />
        </div>
        <div className={`${styles.avatarWrapper} ${styles.medium}`}>
          <Avatar size="medium" fallback="MD" />
        </div>
        <div className={`${styles.avatarWrapper} ${styles.large}`}>
          <Avatar size="large" fallback="LG" />
        </div>
      </div>
    </div>
  );
}

// With Images Demo
export function DemoAvatarWithImages() {
  return (
    <div className={styles.section}>
      <div className={styles.avatarGroup}>
        <div className={`${styles.avatarWrapper} ${styles.medium}`}>
          <Avatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
            alt="User Avatar"
            fallback="JD"
          />
        </div>
        <div className={`${styles.avatarWrapper} ${styles.medium}`}>
          <Avatar
            src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=32&h=32&fit=crop&crop=face"
            alt="User Avatar"
            fallback="SJ"
          />
        </div>
        <div className={`${styles.avatarWrapper} ${styles.medium}`}>
          <Avatar
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
            alt="User Avatar"
            fallback="MK"
          />
        </div>
      </div>
    </div>
  );
}

// Fallback Text Demo
export function DemoAvatarFallback() {
  return (
    <div className={styles.section}>
      <div className={styles.avatarGroup}>
        <div className={`${styles.avatarWrapper} ${styles.medium}`}>
          <Avatar fallback="JD" />
        </div>
        <div className={`${styles.avatarWrapper} ${styles.medium}`}>
          <Avatar fallback="AB" />
        </div>
        <div className={`${styles.avatarWrapper} ${styles.medium}`}>
          <Avatar fallback="XY" />
        </div>
        <div className={`${styles.avatarWrapper} ${styles.medium}`}>
          <Avatar fallback="123" />
        </div>
      </div>
    </div>
  );
}

// Avatar Group Demo
export function DemoAvatarGroup() {
  return (
    <div className={styles.section}>
      <div className={styles.avatarGroup}>
        <div
          className={`${styles.avatarWrapper} ${styles.small} ${styles.overlapping}`}
        >
          <Avatar fallback="A" />
        </div>
        <div
          className={`${styles.avatarWrapper} ${styles.small} ${styles.overlapping}`}
        >
          <Avatar fallback="B" />
        </div>
        <div
          className={`${styles.avatarWrapper} ${styles.small} ${styles.overlapping}`}
        >
          <Avatar fallback="C" />
        </div>
        <div
          className={`${styles.avatarWrapper} ${styles.small} ${styles.overlapping}`}
        >
          <Avatar fallback="+2" />
        </div>
      </div>
    </div>
  );
}

export function DemoAvatar() {
  return (
    <div className={styles.demoContainer}>
      <h3 className={styles.demoTitle}>Avatar Variants</h3>
    </div>
  );
}

export function AvatarControls() {
  return (
    <div className={styles.controls}>
      <p className={styles.controlDescription}>
        Avatars display user profile images or fallback text/initials. They
        support different sizes and can be grouped together.
      </p>
    </div>
  );
}
