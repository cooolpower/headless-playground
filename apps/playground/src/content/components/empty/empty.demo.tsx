'use client';

import React, { createContext, useContext, useState } from 'react';
import { Empty } from '@cooolpower/headless-ui';
import { Input } from '@cooolpower/headless-ui';
import { Checkbox } from '@cooolpower/headless-ui';
import { Controls } from '@/components/playground/controls';
import * as styles from './empty.demo.css';

// Empty Controls Context
interface EmptyControlsContextType {
  injectStyles: boolean;
  setInjectStyles: (injectStyles: boolean) => void;
  description: string;
  setDescription: (description: string) => void;
  useImage: boolean;
  setUseImage: (useImage: boolean) => void;
  imageText: string;
  setImageText: (imageText: string) => void;
}

const EmptyControlsContext = createContext<EmptyControlsContextType | null>(
  null,
);

// Provider
export function DemoEmptyBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);
  const [description, setDescription] = useState('데이터가 없습니다');
  const [useImage, setUseImage] = useState(false);
  const [imageText, setImageText] = useState('📭');

  return (
    <EmptyControlsContext.Provider
      value={{
        injectStyles,
        setInjectStyles,
        description,
        setDescription,
        useImage,
        setUseImage,
        imageText,
        setImageText,
      }}
    >
      {children}
    </EmptyControlsContext.Provider>
  );
}

// 기본 Empty (컨트롤러와 함께 사용될 컴포넌트)
export function DemoEmptyBasicWithControls() {
  const context = useContext(EmptyControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { injectStyles, description, useImage, imageText } = context;

  return (
    <div
      className={!injectStyles ? styles.emptyWrapperClass : ''}
      style={{ padding: '2rem' }}
    >
      <Empty
        injectStyles={injectStyles}
        description={description}
        image={
          useImage ? (
            <span style={{ fontSize: '48px' }}>{imageText}</span>
          ) : undefined
        }
      />
    </div>
  );
}

// Empty Controls
export function DemoEmptyBasicControls() {
  const context = useContext(EmptyControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    injectStyles,
    setInjectStyles,
    description,
    setDescription,
    useImage,
    setUseImage,
    imageText,
    setImageText,
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
          label: '설명 (Description)',
          control: (
            <Input
              type="text"
              value={description}
              onChange={setDescription}
              placeholder="설명 텍스트"
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
          label: '이미지 텍스트 (Image Text)',
          control: (
            <Input
              type="text"
              value={imageText}
              onChange={setImageText}
              disabled={!useImage}
              placeholder="이모지 또는 텍스트"
              size="small"
            />
          ),
        },
      ]}
    />
  );
}

export function DemoEmptyBasic() {
  return (
    <div style={{ padding: '2rem' }}>
      <Empty description="데이터가 없습니다" />
    </div>
  );
}

export function DemoEmptyCustomImage() {
  return (
    <div style={{ padding: '2rem' }}>
      <Empty
        image={<span style={{ fontSize: '48px' }}>📭</span>}
        description="메일함이 비어있습니다"
      />
    </div>
  );
}

export function DemoEmptyWithFooter() {
  return (
    <div style={{ padding: '2rem' }}>
      <Empty description="결과를 찾을 수 없습니다">
        <button
          onClick={() => alert('새로고침')}
          style={{
            padding: '8px 16px',
            border: '1px solid var(--color-divider)',
            borderRadius: '4px',
            cursor: 'pointer',
            background: 'var(--color-surface)',
          }}
        >
          새로고침
        </button>
      </Empty>
    </div>
  );
}
