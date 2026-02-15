'use client';

import { useState, createContext, useContext } from 'react';
import { Breadcrumb } from '@repo/ui';
import type { BreadcrumbItem } from '@repo/ui';
import { Icon } from '@repo/ui';
import { Home, FileText, Folder } from 'lucide-react';
import { Input } from '@repo/ui';
import { Select } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import type { SelectOption } from '@repo/ui';
import * as styles from './breadcrumb.demo.css';

// Breadcrumb Controls Context
interface BreadcrumbControlsContextType {
  injectStyles: boolean;
  setInjectStyles: (injectStyles: boolean) => void;
  size: 'small' | 'medium' | 'large';
  setSize: (size: 'small' | 'medium' | 'large') => void;
  separator: string | React.ReactNode;
  setSeparator: (separator: string | React.ReactNode) => void;
  maxCount: number | undefined;
  setMaxCount: (maxCount: number | undefined) => void;
  useIcons: boolean;
  setUseIcons: (useIcons: boolean) => void;
}

const BreadcrumbControlsContext =
  createContext<BreadcrumbControlsContextType | null>(null);

// Provider
export function DemoBreadcrumbBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [separator, setSeparator] = useState<string | React.ReactNode>('/');
  const [maxCount, setMaxCount] = useState<number | undefined>(undefined);
  const [useIcons, setUseIcons] = useState(false);

  return (
    <BreadcrumbControlsContext.Provider
      value={{
        injectStyles,
        setInjectStyles,
        size,
        setSize,
        separator,
        setSeparator,
        useIcons,
        setUseIcons,
        maxCount,
        setMaxCount,
      }}
    >
      {children}
    </BreadcrumbControlsContext.Provider>
  );
}

// 기본 Breadcrumb (컨트롤러와 함께 사용될 컴포넌트)
export function DemoBreadcrumbBasicWithControls() {
  const context = useContext(BreadcrumbControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { injectStyles, size, separator, maxCount, useIcons } = context;

  const items: BreadcrumbItem[] = [
    {
      title: '홈',
      href: '/',
      icon: useIcons ? <Icon icon={Home} size="small" /> : undefined,
    },
    {
      title: '카테고리',
      href: '/category',
      icon: useIcons ? <Icon icon={FileText} size="small" /> : undefined,
    },
    {
      title: '서브카테고리',
      href: '/category/sub',
      icon: useIcons ? <Icon icon={Folder} size="small" /> : undefined,
    },
    {
      title: '현재 페이지',
      icon: useIcons ? <Icon icon={FileText} size="small" /> : undefined,
    },
  ];

  return (
    <div
      className={`${styles.section} ${!injectStyles ? styles.breadcrumbWrapperClass : ''}`}
    >
      <div className={styles.content}>
        <div className={styles.breadcrumbWrapper}>
          <Breadcrumb
            injectStyles={injectStyles}
            items={items}
            separator={separator}
            maxCount={maxCount}
            size={size}
          />
        </div>
      </div>
    </div>
  );
}

// Breadcrumb Controls
export function DemoBreadcrumbBasicControls() {
  const context = useContext(BreadcrumbControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    injectStyles,
    setInjectStyles,
    size,
    setSize,
    separator,
    setSeparator,
    maxCount,
    setMaxCount,
    useIcons,
    setUseIcons,
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
          label: '구분자 (Separator)',
          control: (
            <Select
              options={[
                { label: '/', value: '/' },
                { label: '>', value: '>' },
                { label: '→', value: '→' },
                { label: '· (Custom)', value: 'custom' },
              ]}
              value={typeof separator === 'string' ? separator : 'custom'}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  if (val === '/') setSeparator('/');
                  else if (val === '>') setSeparator('>');
                  else if (val === '→') setSeparator('→');
                  else if (val === 'custom')
                    setSeparator(<span style={{ margin: '0 8px' }}>·</span>);
                }
              }}
              placeholder="구분자 선택"
              size="small"
            />
          ),
        },
        {
          label: 'Max Count',
          control: (
            <Input
              type="number"
              value={maxCount?.toString() ?? ''}
              onChange={(val) => setMaxCount(val ? Number(val) : undefined)}
              placeholder="제한 없음"
              size="small"
            />
          ),
        },
        {
          label: '아이콘 사용',
          control: (
            <Checkbox
              checked={useIcons}
              onChange={(checked) => setUseIcons(checked)}
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

// 기존 예제들 (props 조합으로만 차별화)
export function DemoBreadcrumbBasic() {
  const items: BreadcrumbItem[] = [
    { title: '홈', href: '/' },
    { title: '카테고리', href: '/category' },
    { title: '현재 페이지' },
  ];

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.breadcrumbWrapper}>
          <Breadcrumb items={items} />
        </div>
      </div>
    </div>
  );
}

export function DemoBreadcrumbWithIcons() {
  const items: BreadcrumbItem[] = [
    {
      title: '홈',
      href: '/',
      icon: <Icon icon={Home} size="small" />,
    },
    {
      title: '문서',
      href: '/docs',
      icon: <Icon icon={FileText} size="small" />,
    },
    {
      title: '현재 문서',
      icon: <Icon icon={Folder} size="small" />,
    },
  ];

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.breadcrumbWrapper}>
          <Breadcrumb items={items} />
        </div>
      </div>
    </div>
  );
}

export function DemoBreadcrumbCustomSeparator() {
  const items: BreadcrumbItem[] = [
    { title: '홈', href: '/' },
    { title: '카테고리', href: '/category' },
    { title: '현재 페이지' },
  ];

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.breadcrumbWrapper}>
          <Breadcrumb items={items} separator=">" />
        </div>
        <div className={styles.breadcrumbWrapper}>
          <Breadcrumb items={items} separator="→" />
        </div>
        <div className={styles.breadcrumbWrapper}>
          <Breadcrumb
            items={items}
            separator={<span style={{ margin: '0 8px' }}>·</span>}
          />
        </div>
      </div>
    </div>
  );
}

export function DemoBreadcrumbMaxCount() {
  const items: BreadcrumbItem[] = [
    { title: '홈', href: '/' },
    { title: '레벨 1', href: '/level1' },
    { title: '레벨 2', href: '/level2' },
    { title: '레벨 3', href: '/level3' },
    { title: '레벨 4', href: '/level4' },
    { title: '현재 페이지' },
  ];

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.breadcrumbWrapper}>
          <Breadcrumb items={items} maxCount={3} />
        </div>
        <p
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-secondary)',
          }}
        >
          maxCount={3}으로 설정하여 처음과 마지막 2개만 표시
        </p>
      </div>
    </div>
  );
}

export function DemoBreadcrumbSizes() {
  const items: BreadcrumbItem[] = [
    { title: '홈', href: '/' },
    { title: '카테고리', href: '/category' },
    { title: '현재 페이지' },
  ];

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.breadcrumbWrapper}>
          <Breadcrumb items={items} size="small" />
        </div>
        <div className={styles.breadcrumbWrapper}>
          <Breadcrumb items={items} size="medium" />
        </div>
        <div className={styles.breadcrumbWrapper}>
          <Breadcrumb items={items} size="large" />
        </div>
      </div>
    </div>
  );
}

export function DemoBreadcrumbWithOnClick() {
  const items: BreadcrumbItem[] = [
    {
      title: '홈',
      onClick: () => {
        alert('홈 클릭됨');
      },
    },
    {
      title: '카테고리',
      onClick: () => {
        alert('카테고리 클릭됨');
      },
    },
    {
      title: '현재 페이지',
    },
  ];

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.breadcrumbWrapper}>
          <Breadcrumb items={items} />
        </div>
        <p
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-secondary)',
          }}
        >
          각 항목을 클릭하면 알림이 표시됩니다.
        </p>
      </div>
    </div>
  );
}
