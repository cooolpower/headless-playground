'use client';

import { useState, createContext, useContext, useEffect } from 'react';
import { Tabs } from '@repo/ui';
import type { TabItem } from '@repo/ui';
import { Icon } from '@repo/ui';
import { Home, Settings, User, FileText } from 'lucide-react';
import { Controls } from '@/components/playground/controls';
import { Select } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import type { SelectOption } from '@repo/ui';
import * as styles from './tabs.demo.css';

// Tabs Controls Context
interface TabsControlsContextType {
  activeKey: string;
  setActiveKey: (key: string) => void;
  type: 'line' | 'card' | 'button';
  setType: (type: 'line' | 'card' | 'button') => void;
  size: 'small' | 'medium' | 'large';
  setSize: (size: 'small' | 'medium' | 'large') => void;
  tabPosition: 'top' | 'bottom' | 'left' | 'right';
  setTabPosition: (position: 'top' | 'bottom' | 'left' | 'right') => void;
  useIcons: boolean;
  setUseIcons: (useIcons: boolean) => void;
  useClosable: boolean;
  setUseClosable: (useClosable: boolean) => void;
  useDisabled: boolean;
  setUseDisabled: (useDisabled: boolean) => void;
  tabBorderRadius: string;
  setTabBorderRadius: (radius: string) => void;
  useLoading: boolean;
  setUseLoading: (loading: boolean) => void;
  loadedTabs: Set<string>;
  injectStyles: boolean;
  setInjectStyles: (inject: boolean) => void;
}

const TabsControlsContext = createContext<TabsControlsContextType | null>(null);

// Provider
export function DemoTabsBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeKey, setActiveKey] = useState('1');
  const [type, setType] = useState<'line' | 'card' | 'button'>('line');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [tabPosition, setTabPosition] = useState<
    'top' | 'bottom' | 'left' | 'right'
  >('top');
  const [useIcons, setUseIcons] = useState(false);
  const [useClosable, setUseClosable] = useState(false);
  const [useDisabled, setUseDisabled] = useState(false);
  const [tabBorderRadius, setTabBorderRadius] = useState('var(--radius-lg)');
  const [useLoading, setUseLoading] = useState(false);
  const [loadedTabs, setLoadedTabs] = useState<Set<string>>(new Set());
  const [injectStyles, setInjectStyles] = useState(true);

  // 로딩 상태가 true이고 현재 활성 탭이 아직 로딩 완료되지 않았으면 2초 후 완료 처리
  useEffect(() => {
    if (useLoading && !loadedTabs.has(activeKey)) {
      const timer = setTimeout(() => {
        setLoadedTabs((prev) => new Set(prev).add(activeKey));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [useLoading, activeKey, loadedTabs]);

  // useLoading이 false로 변경되면 로딩 완료 상태 초기화
  useEffect(() => {
    if (!useLoading) {
      setLoadedTabs(new Set());
    }
  }, [useLoading]);

  return (
    <TabsControlsContext.Provider
      value={{
        activeKey,
        setActiveKey,
        type,
        setType,
        size,
        setSize,
        tabPosition,
        setTabPosition,
        useIcons,
        setUseIcons,
        useClosable,
        setUseClosable,
        useDisabled,
        setUseDisabled,
        tabBorderRadius,
        setTabBorderRadius,
        useLoading,
        setUseLoading,
        loadedTabs,
        injectStyles,
        setInjectStyles,
      }}
    >
      {children}
    </TabsControlsContext.Provider>
  );
}

// 기본 Tabs (컨트롤러와 함께 사용될 컴포넌트)
export function DemoTabsBasicWithControls() {
  const context = useContext(TabsControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    activeKey,
    setActiveKey,
    type,
    size,
    tabPosition,
    useIcons,
    useClosable,
    useDisabled,
    tabBorderRadius,
    useLoading,
    loadedTabs,
    injectStyles,
  } = context;

  const items: TabItem[] = [
    {
      key: '1',
      label: '탭 1',
      content: <div>탭 1의 콘텐츠입니다.</div>,
      icon: useIcons ? <Icon icon={Home} size="small" /> : undefined,
      closable: useClosable,
      disabled: false, // 첫 번째 탭은 항상 활성화
      loading: useLoading && !loadedTabs.has('1'),
    },
    {
      key: '2',
      label: '탭 2',
      content: <div>탭 2의 콘텐츠입니다.</div>,
      icon: useIcons ? <Icon icon={User} size="small" /> : undefined,
      closable: useClosable,
      disabled: useDisabled, // 두 번째 탭만 비활성화
      loading: useLoading && !loadedTabs.has('2'),
    },
    {
      key: '3',
      label: '탭 3',
      content: <div>탭 3의 콘텐츠입니다.</div>,
      icon: useIcons ? <Icon icon={Settings} size="small" /> : undefined,
      closable: useClosable,
      disabled: false, // 세 번째 탭은 항상 활성화
      loading: useLoading && !loadedTabs.has('3'),
    },
  ];

  const handleTabClose = useClosable
    ? (key: string) => {
        // 탭이 닫혀도 activeKey는 유지 (실제로는 items에서 제거해야 함)
        console.log('Tab closed:', key);
      }
    : undefined;

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.tabsWrapper}>
          <Tabs
            items={items}
            activeKey={activeKey}
            onChange={setActiveKey}
            type={type}
            size={size}
            tabPosition={tabPosition}
            tabBorderRadius={tabBorderRadius}
            onTabClose={handleTabClose}
            injectStyles={injectStyles}
          />
        </div>
        <p className={styles.status}>활성 탭: {activeKey}</p>
      </div>
    </div>
  );
}

// Tabs Controls
export function DemoTabsBasicControls() {
  const context = useContext(TabsControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    activeKey,
    setActiveKey,
    type,
    setType,
    size,
    setSize,
    tabPosition,
    setTabPosition,
    useIcons,
    setUseIcons,
    useClosable,
    setUseClosable,
    useDisabled,
    setUseDisabled,
    tabBorderRadius,
    setTabBorderRadius,
    useLoading,
    setUseLoading,
    injectStyles,
    setInjectStyles,
  } = context;

  const activeKeyOptions: SelectOption[] = [
    { label: '탭 1', value: '1' },
    { label: '탭 2', value: '2' },
    { label: '탭 3', value: '3' },
  ];

  const typeOptions: SelectOption[] = [
    { label: 'Line', value: 'line' },
    { label: 'Card', value: 'card' },
    { label: 'Button', value: 'button' },
  ];

  const sizeOptions: SelectOption[] = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
  ];

  const positionOptions: SelectOption[] = [
    { label: 'Top', value: 'top' },
    { label: 'Bottom', value: 'bottom' },
    { label: 'Left', value: 'left' },
    { label: 'Right', value: 'right' },
  ];

  const borderRadiusOptions: SelectOption[] = [
    { label: 'None (0)', value: 'var(--radius-none)' },
    { label: 'Small (2px)', value: 'var(--radius-sm)' },
    { label: 'Medium (4px)', value: 'var(--radius-md)' },
    { label: 'Large (6px)', value: 'var(--radius-lg)' },
    { label: 'XL (8px)', value: 'var(--radius-xl)' },
    { label: '2XL (12px)', value: 'var(--radius-2xl)' },
    { label: '3XL (16px)', value: 'var(--radius-3xl)' },
    { label: 'Full', value: 'var(--radius-full)' },
  ];

  return (
    <Controls
      items={[
        {
          label: '활성 탭 (Active Key)',
          control: (
            <Select
              options={activeKeyOptions}
              value={activeKey}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setActiveKey(String(val));
                }
              }}
              placeholder="탭 선택"
              size="small"
            />
          ),
        },
        {
          label: 'Inject Styles',
          control: (
            <Checkbox
              checked={injectStyles}
              onChange={(checked) => setInjectStyles(checked)}
              size="small"
            >
              기본 스타일 주입
            </Checkbox>
          ),
        },
        {
          label: '타입 (Type)',
          control: (
            <Select
              options={typeOptions}
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
          label: '탭 위치 (Position)',
          control: (
            <Select
              options={positionOptions}
              value={tabPosition}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setTabPosition(val as typeof tabPosition);
                }
              }}
              placeholder="위치 선택"
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
        {
          label: '닫기 버튼',
          control: (
            <Checkbox
              checked={useClosable}
              onChange={(checked) => setUseClosable(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '비활성화 (탭 2)',
          control: (
            <Checkbox
              checked={useDisabled}
              onChange={(checked) => setUseDisabled(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: 'Border Radius',
          control: (
            <Select
              options={borderRadiusOptions}
              value={tabBorderRadius}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setTabBorderRadius(String(val));
                }
              }}
              placeholder="Border Radius 선택"
              size="small"
            />
          ),
        },
        {
          label: '로딩 상태',
          control: (
            <Checkbox
              checked={useLoading}
              onChange={(checked) => setUseLoading(checked)}
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
export function DemoTabsBasic() {
  const [activeKey, setActiveKey] = useState('1');

  const items: TabItem[] = [
    {
      key: '1',
      label: '탭 1',
      content: <div>탭 1의 콘텐츠입니다.</div>,
    },
    {
      key: '2',
      label: '탭 2',
      content: <div>탭 2의 콘텐츠입니다.</div>,
    },
    {
      key: '3',
      label: '탭 3',
      content: <div>탭 3의 콘텐츠입니다.</div>,
    },
  ];

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.tabsWrapper}>
          <Tabs items={items} activeKey={activeKey} onChange={setActiveKey} />
        </div>
        <p className={styles.status}>활성 탭: {activeKey}</p>
      </div>
    </div>
  );
}

export function DemoTabsWithIcons() {
  const [activeKey, setActiveKey] = useState('home');

  const items: TabItem[] = [
    {
      key: 'home',
      label: '홈',
      icon: <Icon icon={Home} size="small" />,
      content: <div>홈 페이지 콘텐츠</div>,
    },
    {
      key: 'user',
      label: '사용자',
      icon: <Icon icon={User} size="small" />,
      content: <div>사용자 페이지 콘텐츠</div>,
    },
    {
      key: 'settings',
      label: '설정',
      icon: <Icon icon={Settings} size="small" />,
      content: <div>설정 페이지 콘텐츠</div>,
    },
  ];

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.tabsWrapper}>
          <Tabs items={items} activeKey={activeKey} onChange={setActiveKey} />
        </div>
      </div>
    </div>
  );
}

export function DemoTabsClosable() {
  const [items, setItems] = useState<TabItem[]>([
    {
      key: '1',
      label: '탭 1',
      closable: true,
      content: <div>탭 1의 콘텐츠입니다.</div>,
    },
    {
      key: '2',
      label: '탭 2',
      closable: true,
      content: <div>탭 2의 콘텐츠입니다.</div>,
    },
    {
      key: '3',
      label: '탭 3',
      closable: true,
      content: <div>탭 3의 콘텐츠입니다.</div>,
    },
  ]);
  const [activeKey, setActiveKey] = useState('1');

  const handleTabClose = (key: string) => {
    const newItems = items.filter((item) => item.key !== key);
    setItems(newItems);
    if (activeKey === key && newItems.length > 0) {
      setActiveKey(newItems[0].key);
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.tabsWrapper}>
          <Tabs
            items={items}
            activeKey={activeKey}
            onChange={setActiveKey}
            onTabClose={handleTabClose}
          />
        </div>
        <p className={styles.status}>
          활성 탭: {activeKey} | 총 탭 수: {items.length}
        </p>
      </div>
    </div>
  );
}

export function DemoTabsDisabled() {
  const [activeKey, setActiveKey] = useState('1');

  const items: TabItem[] = [
    {
      key: '1',
      label: '탭 1',
      content: <div>탭 1의 콘텐츠입니다.</div>,
    },
    {
      key: '2',
      label: '탭 2 (비활성화)',
      disabled: true,
      content: <div>탭 2의 콘텐츠입니다.</div>,
    },
    {
      key: '3',
      label: '탭 3',
      content: <div>탭 3의 콘텐츠입니다.</div>,
    },
  ];

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.tabsWrapper}>
          <Tabs items={items} activeKey={activeKey} onChange={setActiveKey} />
        </div>
      </div>
    </div>
  );
}

export function DemoTabsCardType() {
  const [activeKey, setActiveKey] = useState('1');

  const items: TabItem[] = [
    {
      key: '1',
      label: '탭 1',
      content: <div>탭 1의 콘텐츠입니다.</div>,
    },
    {
      key: '2',
      label: '탭 2',
      content: <div>탭 2의 콘텐츠입니다.</div>,
    },
    {
      key: '3',
      label: '탭 3',
      content: <div>탭 3의 콘텐츠입니다.</div>,
    },
  ];

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.tabsWrapper}>
          <Tabs
            items={items}
            activeKey={activeKey}
            onChange={setActiveKey}
            type="card"
          />
        </div>
      </div>
    </div>
  );
}

export function DemoTabsButtonType() {
  const [activeKey, setActiveKey] = useState('1');

  const items: TabItem[] = [
    {
      key: '1',
      label: '탭 1',
      content: <div>탭 1의 콘텐츠입니다.</div>,
    },
    {
      key: '2',
      label: '탭 2',
      content: <div>탭 2의 콘텐츠입니다.</div>,
    },
    {
      key: '3',
      label: '탭 3',
      content: <div>탭 3의 콘텐츠입니다.</div>,
    },
  ];

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.tabsWrapper}>
          <Tabs
            items={items}
            activeKey={activeKey}
            onChange={setActiveKey}
            type="button"
          />
        </div>
      </div>
    </div>
  );
}

export function DemoTabsSizes() {
  const [activeKey1, setActiveKey1] = useState('1');
  const [activeKey2, setActiveKey2] = useState('1');
  const [activeKey3, setActiveKey3] = useState('1');

  const items: TabItem[] = [
    {
      key: '1',
      label: '탭 1',
      content: <div>콘텐츠</div>,
    },
    {
      key: '2',
      label: '탭 2',
      content: <div>콘텐츠</div>,
    },
  ];

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.tabsWrapper}>
          <Tabs
            items={items}
            activeKey={activeKey1}
            onChange={setActiveKey1}
            size="small"
          />
        </div>
        <div className={styles.tabsWrapper}>
          <Tabs
            items={items}
            activeKey={activeKey2}
            onChange={setActiveKey2}
            size="medium"
          />
        </div>
        <div className={styles.tabsWrapper}>
          <Tabs
            items={items}
            activeKey={activeKey3}
            onChange={setActiveKey3}
            size="large"
          />
        </div>
      </div>
    </div>
  );
}
