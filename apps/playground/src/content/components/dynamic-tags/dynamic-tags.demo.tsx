'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { DynamicTags } from '@repo/ui';
import { Icon } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import { Checkbox } from '@repo/ui';
import * as styles from './dynamic-tags.demo.css';

const STORAGE_KEY = 'headless-dynamic-tags-demo-state';

// DynamicTags Controls Context
interface DynamicTagsControlsContextType {
  max: number | undefined;
  setMax: (max: number | undefined) => void;
  disabled: boolean;
  setDisabled: (value: boolean) => void;
  size: 'small' | 'medium' | 'large';
  setSize: (size: 'small' | 'medium' | 'large') => void;
  placeholder: string;
  setPlaceholder: (placeholder: string) => void;
  injectStyles: boolean;
  setInjectStyles: (value: boolean) => void;
}

const DynamicTagsControlsContext =
  createContext<DynamicTagsControlsContextType | null>(null);

const getInitialState = () => {
  const defaultState = {
    max: undefined as number | undefined,
    disabled: false,
    size: 'medium' as const,
    placeholder: '태그를 입력하세요',
    injectStyles: true,
  };

  if (typeof window === 'undefined') return defaultState;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultState, ...parsed };
    }
  } catch (error) {
    console.warn('Failed to load state from localStorage:', error);
  }

  return defaultState;
};

export function DemoDynamicTagsBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialState = getInitialState();
  const [max, setMax] = useState(initialState.max);
  const [disabled, setDisabled] = useState(initialState.disabled);
  const [size, setSize] = useState(initialState.size);
  const [placeholder, setPlaceholder] = useState(initialState.placeholder);
  const [injectStyles, setInjectStyles] = useState(initialState.injectStyles);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stateToSave = {
        max,
        disabled,
        size,
        placeholder,
        injectStyles,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.warn('Failed to save state to localStorage:', error);
    }
  }, [max, disabled, size, placeholder, injectStyles]);

  return (
    <DynamicTagsControlsContext.Provider
      value={{
        max,
        setMax,
        disabled,
        setDisabled,
        size,
        setSize,
        placeholder,
        setPlaceholder,
        injectStyles,
        setInjectStyles,
      }}
    >
      {children}
    </DynamicTagsControlsContext.Provider>
  );
}

export function DemoDynamicTagsBasicWithControls() {
  const context = useContext(DynamicTagsControlsContext);
  const [tags, setTags] = useState<string[]>(['Tag1', 'Tag2']);

  if (!context) return <DemoDynamicTagsBasic />;

  const { max, disabled, size, placeholder, injectStyles } = context;

  return (
    <div className={styles.container}>
      <DynamicTags
        value={tags}
        onChange={setTags}
        max={max}
        disabled={disabled}
        size={size}
        placeholder={placeholder}
        injectStyles={injectStyles}
        classNames={{
          dynamicTags: styles.dynamicTags,
          tag: styles.tag,
          tagInput: styles.tagInput,
          addButton: styles.addButton,
        }}
      />
      <div className={styles.valueDisplay}>값: {JSON.stringify(tags)}</div>
    </div>
  );
}

export function DemoDynamicTagsBasicControls() {
  const context = useContext(DynamicTagsControlsContext);

  if (!context) return null;

  const {
    max,
    setMax,
    disabled,
    setDisabled,
    size,
    setSize,
    placeholder,
    setPlaceholder,
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
          label: 'Size',
          control: (
            <select
              value={size}
              onChange={(e) => setSize(e.target.value as any)}
              style={{ padding: '4px' }}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          ),
        },
        {
          label: 'Max Tags',
          control: (
            <input
              type="number"
              value={max ?? ''}
              onChange={(e) =>
                setMax(e.target.value ? Number(e.target.value) : undefined)
              }
              placeholder="무제한"
              min={1}
              style={{ padding: '4px', width: '80px' }}
            />
          ),
        },
        {
          label: 'Placeholder',
          control: (
            <input
              type="text"
              value={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
              style={{ padding: '4px', width: '100%' }}
            />
          ),
        },
        {
          label: 'Disabled',
          control: (
            <Checkbox checked={disabled} onChange={setDisabled} size="small">
              비활성화
            </Checkbox>
          ),
        },
      ]}
    />
  );
}

// 기본 Dynamic Tags 예제
export function DemoDynamicTagsBasic() {
  const [tags, setTags] = useState<string[]>(['Tag1', 'Tag2']);

  return (
    <div className={styles.container}>
      <DynamicTags
        value={tags}
        onChange={setTags}
        classNames={{
          dynamicTags: styles.dynamicTags,
          tag: styles.tag,
          tagInput: styles.tagInput,
          addButton: styles.addButton,
        }}
        size="custom"
      />
      <div className={styles.valueDisplay}>값: {JSON.stringify(tags)}</div>
    </div>
  );
}

// 최대 개수 제한 예제
export function DemoDynamicTagsMax() {
  const [tags, setTags] = useState<string[]>(['Tag1', 'Tag2']);

  return (
    <div className={styles.container}>
      <DynamicTags
        value={tags}
        onChange={setTags}
        max={5}
        classNames={{
          dynamicTags: styles.dynamicTags,
          tag: styles.tag,
          tagInput: styles.tagInput,
          addButton: styles.addButton,
        }}
        size="custom"
      />
      <div className={styles.valueDisplay}>
        값: {JSON.stringify(tags)} (최대 5개)
      </div>
    </div>
  );
}

// 비활성화 예제
export function DemoDynamicTagsDisabled() {
  const [tags] = useState<string[]>(['Tag1', 'Tag2', 'Tag3']);

  return (
    <div className={styles.container}>
      <DynamicTags
        value={tags}
        disabled
        classNames={{
          dynamicTags: styles.dynamicTags,
          tag: styles.tag,
          tagInput: styles.tagInput,
          addButton: styles.addButton,
        }}
        size="custom"
      />
    </div>
  );
}

// 크기 변형 예제
export function DemoDynamicTagsSizes() {
  const [smallTags, setSmallTags] = useState<string[]>(['Small']);
  const [mediumTags, setMediumTags] = useState<string[]>(['Medium']);
  const [largeTags, setLargeTags] = useState<string[]>(['Large']);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Small</h3>
        <DynamicTags
          value={smallTags}
          onChange={setSmallTags}
          size="small"
          classNames={{
            dynamicTags: styles.dynamicTags,
            tag: styles.tag,
            tagInput: styles.tagInput,
            addButton: styles.addButton,
          }}
        />
      </div>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Medium</h3>
        <DynamicTags
          value={mediumTags}
          onChange={setMediumTags}
          size="medium"
          classNames={{
            dynamicTags: styles.dynamicTags,
            tag: styles.tag,
            tagInput: styles.tagInput,
            addButton: styles.addButton,
          }}
        />
      </div>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Large</h3>
        <DynamicTags
          value={largeTags}
          onChange={setLargeTags}
          size="large"
          classNames={{
            dynamicTags: styles.dynamicTags,
            tag: styles.tag,
            tagInput: styles.tagInput,
            addButton: styles.addButton,
          }}
        />
      </div>
    </div>
  );
}

// 커스텀 생성/제거 핸들러 예제
export function DemoDynamicTagsHandlers() {
  const [tags, setTags] = useState<string[]>(['Tag1']);

  return (
    <div className={styles.container}>
      <DynamicTags
        value={tags}
        onChange={setTags}
        onCreate={async (tag) => {
          console.log('태그 생성:', tag);
          if (tag.length < 3) {
            alert('태그는 최소 3글자 이상이어야 합니다.');
            return false;
          }
          return true;
        }}
        onRemove={async (tag, index) => {
          console.log('태그 제거:', tag, index);
          return confirm(`${tag} 태그를 제거하시겠습니까?`);
        }}
        classNames={{
          dynamicTags: styles.dynamicTags,
          tag: styles.tag,
          tagInput: styles.tagInput,
          addButton: styles.addButton,
        }}
      />
      <div className={styles.valueDisplay}>값: {JSON.stringify(tags)}</div>
    </div>
  );
}

// 커스텀 렌더링 예제
export function DemoDynamicTagsCustomRender() {
  const [tags, setTags] = useState<string[]>(['Custom1', 'Custom2']);

  return (
    <div className={styles.container}>
      <DynamicTags
        value={tags}
        onChange={setTags}
        renderTag={(tag, index) => (
          <div
            key={`${tag}-${index}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 12px',
              backgroundColor: 'var(--color-brand-primary)',
              color: 'var(--color-text-on-primary)',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          >
            {tag}
            <button
              type="button"
              onClick={() => {
                const newTags = tags.filter((_, i) => i !== index);
                setTags(newTags);
              }}
              style={{
                marginLeft: '8px',
                background: 'none',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer',
                padding: '0',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              <Icon icon={X} size="small" />
            </button>
          </div>
        )}
        classNames={{
          dynamicTags: styles.dynamicTags,
          tag: styles.renderTag,
          tagInput: styles.tagInput,
          addButton: styles.addButton,
        }}
      />
    </div>
  );
}
