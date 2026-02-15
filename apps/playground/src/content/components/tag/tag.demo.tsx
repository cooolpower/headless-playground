'use client';

import { useState, createContext, useContext, useMemo } from 'react';
import { Tag } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import { Input } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Select } from '@repo/ui';
import type { SelectOption } from '@repo/ui';
import { Icon } from '@repo/ui';
import {
  X,
  Star,
  Tag as TagIcon,
  AlertCircle,
  CheckCircle,
  Info,
} from 'lucide-react';
import * as styles from './tag.demo.css';

// Tag Controls Context
interface TagControlsContextType {
  injectStyles: boolean;
  setInjectStyles: (injectStyles: boolean) => void;
  tagText: string;
  setTagText: (text: string) => void;
  closable: boolean;
  setClosable: (closable: boolean) => void;
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
  variant: 'default' | 'primary' | 'success' | 'warning' | 'error';
  setVariant: (
    variant: 'default' | 'primary' | 'success' | 'warning' | 'error',
  ) => void;
  size: 'small' | 'medium' | 'large';
  setSize: (size: 'small' | 'medium' | 'large') => void;
  tags: string[];
  setTags: (tags: string[]) => void;
}

const TagControlsContext = createContext<TagControlsContextType | null>(null);

// Provider
export function DemoTagBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);
  const [tagText, setTagText] = useState('Tag');
  const [closable, setClosable] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [variant, setVariant] = useState<
    'default' | 'primary' | 'success' | 'warning' | 'error'
  >('default');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [tags, setTags] = useState<string[]>(['Tag 1', 'Tag 2', 'Tag 3']);

  const contextValue = useMemo(
    () => ({
      injectStyles,
      setInjectStyles,
      tagText,
      setTagText,
      closable,
      setClosable,
      disabled,
      setDisabled,
      variant,
      setVariant,
      size,
      setSize,
      tags,
      setTags,
    }),
    [injectStyles, tagText, closable, disabled, variant, size, tags],
  );

  return (
    <TagControlsContext.Provider value={contextValue}>
      {children}
    </TagControlsContext.Provider>
  );
}

// 기본 Tag (컨트롤러와 함께 사용될 컴포넌트)
export function DemoTagBasicWithControls() {
  const context = useContext(TagControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    injectStyles,
    tagText,
    closable,
    disabled,
    variant,
    size,
    tags,
    setTags,
  } = context;

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const addTag = () => {
    if (tagText.trim() && !tags.includes(tagText.trim())) {
      setTags([...tags, tagText.trim()]);
    }
  };

  return (
    <div
      className={`${styles.section} ${!injectStyles ? styles.tagWrapperClass : ''}`}
    >
      <div className={styles.content}>
        <div className={styles.tagGroup}>
          {tags.map((tag, index) => (
            // <div key={`${tag}-${index}`} className={styles.tagWrapper}>
            <Tag
              key={`${tag}-${index}`}
              injectStyles={injectStyles}
              onClose={closable ? () => removeTag(tag) : undefined}
              closable={closable}
              disabled={disabled}
              variant={variant}
              size={size}
            >
              {tag}
            </Tag>
            // </div>
          ))}
        </div>
        {tags.length === 0 && (
          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '14px',
              marginTop: '16px',
            }}
          >
            태그가 없습니다. 태그를 추가해보세요.
          </p>
        )}
        <div
          style={{
            marginTop: '16px',
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          <Input
            type="text"
            value={tagText}
            onChange={(value) => context.setTagText(value)}
            placeholder="새 태그 입력"
            size="small"
            style={{ flex: 1 }}
          />
          <button
            onClick={addTag}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              border: 'var(--border-width-thin) solid var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              cursor: 'pointer',
              fontSize: '14px',
              whiteSpace: 'nowrap',
            }}
          >
            태그 추가
          </button>
        </div>
      </div>
    </div>
  );
}

// Tag Controls
export function DemoTagBasicControls() {
  const context = useContext(TagControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    injectStyles,
    setInjectStyles,
    tagText,
    setTagText,
    closable,
    setClosable,
    disabled,
    setDisabled,
    variant,
    setVariant,
    size,
    setSize,
  } = context;

  const variantOptions: SelectOption[] = [
    { label: 'Default', value: 'default' },
    { label: 'Primary', value: 'primary' },
    { label: 'Success', value: 'success' },
    { label: 'Warning', value: 'warning' },
    { label: 'Error', value: 'error' },
  ];

  const sizeOptions: SelectOption[] = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
  ];

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
          label: '태그 텍스트 (Tag Text)',
          control: (
            <Input
              type="text"
              value={tagText}
              onChange={(value) => setTagText(value)}
              placeholder="태그 텍스트 입력"
              size="small"
            />
          ),
        },
        {
          label: '타입 (Variant)',
          control: (
            <Select
              options={variantOptions}
              value={variant}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setVariant(val as typeof variant);
                }
              }}
              placeholder="타입 선택"
              size="small"
            />
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
          label: '비활성화 (Disabled)',
          control: (
            <Checkbox
              checked={disabled}
              onChange={(checked) => setDisabled(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
      ]}
    />
  );
}

// Basic Tags Demo
export function DemoTagBasic() {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.tagGroup}>
          <Tag>Default Tag</Tag>
          <Tag>React</Tag>
          <Tag>TypeScript</Tag>
          <Tag>Next.js</Tag>
        </div>
      </div>
    </div>
  );
}

// Closable Tags Demo
export function DemoTagClosable() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Next.js']);

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const addTag = () => {
    const newTags = ['Vue', 'Angular', 'Svelte', 'Remix', 'Astro'];
    const randomTag = newTags[Math.floor(Math.random() * newTags.length)];
    if (!tags.includes(randomTag)) {
      setTags([...tags, randomTag]);
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.tagGroup}>
          {tags.map((tag) => (
            <Tag key={tag} closable onClose={() => removeTag(tag)}>
              {tag}
            </Tag>
          ))}
        </div>
        {tags.length === 0 && (
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
            모든 태그가 제거되었습니다.
          </p>
        )}
        <button
          onClick={addTag}
          style={{
            marginTop: '16px',
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            border: 'var(--border-width-thin) solid var(--color-border)',
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text)',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          태그 추가
        </button>
      </div>
    </div>
  );
}

// Type Variants Demo
export function DemoTagTypes() {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.tagGroup}>
          <Tag variant="default">Default</Tag>
          <Tag variant="primary">Primary</Tag>
          <Tag variant="success">Success</Tag>
          <Tag variant="warning">Warning</Tag>
          <Tag variant="error">Error</Tag>
        </div>
      </div>
    </div>
  );
}

// Size Variants Demo
export function DemoTagSizes() {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.tagGroup}>
          <Tag size="small">Small</Tag>
          <Tag size="medium">Medium</Tag>
          <Tag size="large">Large</Tag>
        </div>
      </div>
    </div>
  );
}

// With Icons Demo
export function DemoTagWithIcons() {
  const [tags, setTags] = useState([
    { label: 'Label', icon: TagIcon, clickable: true },
    { label: 'Favorite', icon: Star, clickable: false },
    { label: 'Information', icon: Info, clickable: true },
    { label: 'Success', icon: CheckCircle, clickable: true },
    { label: 'Warning', icon: AlertCircle, clickable: true },
  ]);

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag.label !== tagToRemove));
  };

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.tagGroup}>
          {tags.map((tag) => (
            <Tag
              key={tag.label}
              closable={tag.clickable}
              onClose={tag.clickable ? () => removeTag(tag.label) : undefined}
              size="small"
            >
              <Icon icon={tag.icon} size="small" />
              {tag.label}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
}

// Disabled Tags Demo
export function DemoTagDisabled() {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.tagGroup}>
          <div className={styles.tagWrapper}>
            <Tag disabled>Disabled Tag</Tag>
          </div>
          <div className={styles.tagWrapper}>
            <Tag disabled closable>
              Disabled Closable
            </Tag>
          </div>
          <div className={styles.tagWrapper}>
            <Tag disabled>
              <Icon icon={Info} size="small" />
              Disabled with Icon
            </Tag>
          </div>
        </div>
      </div>
    </div>
  );
}

// Multiple Tags Demo
export function DemoTagMultiple() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const availableTags = [
    'React',
    'TypeScript',
    'Next.js',
    'Vue',
    'Angular',
    'Svelte',
    'Node.js',
    'Python',
    'JavaScript',
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <p
          style={{ marginBottom: '16px', color: 'var(--color-text-secondary)' }}
        >
          선택된 태그:{' '}
          {selectedTags.length > 0 ? selectedTags.join(', ') : '없음'}
        </p>
        <div className={styles.tagGroup}>
          {availableTags.map((tag) => (
            <div
              key={tag}
              className={styles.tagWrapper}
              onClick={() => !selectedTags.includes(tag) && toggleTag(tag)}
              style={{ cursor: 'pointer' }}
            >
              <Tag
                closable={selectedTags.includes(tag)}
                onClose={() => toggleTag(tag)}
              >
                {tag}
              </Tag>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DemoTag() {
  return (
    <div className={styles.demoContainer}>
      <h3 className={styles.demoTitle}>Tag Variants</h3>
    </div>
  );
}

export function TagControls() {
  return (
    <div className={styles.controls}>
      <p className={styles.controlDescription}>
        Tags are used to categorize content. Click the × button to remove tags.
        Use the "Add Random Tag" button to add new tags.
      </p>
    </div>
  );
}
