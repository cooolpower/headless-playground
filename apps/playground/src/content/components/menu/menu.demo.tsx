'use client';

import React, { useState, createContext, useContext } from 'react';
import { Home, Settings, User, FileText, Image, Folder } from 'lucide-react';
import { Icon } from '@repo/ui';
import { Menu } from '@repo/ui';
import type { MenuItem } from '@repo/ui';
import { Select } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import type { SelectOption } from '@repo/ui';
import * as styles from './menu.demo.css';
import * as treeStyles from '../tree/tree.demo.css';
import { Checkbox } from '@repo/ui';

const basicMenuItems: MenuItem[] = [
  { key: '1', label: 'Option 1' },
  { key: '2', label: 'Option 2' },
  { key: '3', label: 'Option 3' },
];

const menuItemsWithIcons: MenuItem[] = [
  { key: '1', label: 'Home', icon: <Icon icon={Home} size="small" /> },
  { key: '2', label: 'Settings', icon: <Icon icon={Settings} size="small" /> },
  { key: '3', label: 'Profile', icon: <Icon icon={User} size="small" /> },
];

const menuItemsWithMixedIcons: MenuItem[] = [
  { key: '1', label: 'Home', icon: <Icon icon={Home} size="small" /> },
  { key: '2', label: 'Documents', icon: '📄' },
  { key: '3', label: 'Images', icon: <Icon icon={Image} size="small" /> },
  { key: '4', label: 'Folder', icon: '📁' },
  { key: '5', label: 'Settings', icon: <Icon icon={Settings} size="small" /> },
];

const menuItemsWithSubmenu: MenuItem[] = [
  {
    key: '1',
    label: 'Navigation 1',
    icon: <Icon icon={Folder} size="small" />,
    children: [
      { key: '1-1', label: 'Option 1-1' },
      { key: '1-2', label: 'Option 1-2' },
    ],
  },
  {
    key: '2',
    label: 'Navigation 2',
    icon: <Icon icon={Folder} size="small" />,
    children: [
      { key: '2-1', label: 'Option 2-1' },
      {
        key: '2-2',
        label: 'Option 2-2',
        children: [{ key: '2-2-1', label: 'Option 2-2-1' }],
      },
    ],
  },
  { key: '3', label: 'Navigation 3' },
];

const menuItemsWithDisabled: MenuItem[] = [
  { key: '1', label: 'Option 1' },
  { key: '2', label: 'Option 2', disabled: true },
  { key: '3', label: 'Option 3' },
  { key: '4', label: 'Danger Option', danger: true },
];

const menuClassNames = {
  menu: styles.menu,
  tree: treeStyles.tree,
  treeNode: treeStyles.treeNode,
  treeNodeContent: styles.menuItem,
  treeNodeSelected: styles.selected,
  treeNodeDisabled: styles.disabled,
  treeNodeChildren: treeStyles.treeNodeChildren,
  treeSwitcher: treeStyles.treeSwitcher,
  treeSwitcherButton: treeStyles.treeSwitcherButton,
  treeSwitcherExpanded: treeStyles.treeSwitcherExpanded,
  treeSwitcherLeaf: treeStyles.treeSwitcherLeaf,
  treeIcon: treeStyles.treeIcon,
  treeTitle: treeStyles.treeTitle,
};

// Menu Controls Context
interface MenuControlsContextType {
  mode: 'vertical' | 'horizontal' | 'inline';
  setMode: (mode: 'vertical' | 'horizontal' | 'inline') => void;
  injectStyles: boolean;
  setInjectStyles: (inject: boolean) => void;
}

const MenuControlsContext = createContext<MenuControlsContextType | null>(null);

// Provider
export function DemoMenuBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<'vertical' | 'horizontal' | 'inline'>(
    'vertical',
  );
  const [injectStyles, setInjectStyles] = useState(true);

  return (
    <MenuControlsContext.Provider
      value={{
        mode,
        setMode,
        injectStyles,
        setInjectStyles,
      }}
    >
      {children}
    </MenuControlsContext.Provider>
  );
}

// 기본 Menu (컨트롤러와 함께 사용될 컴포넌트)
export function DemoMenuBasicWithControls() {
  const context = useContext(MenuControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { mode } = context;
  const [selectedKey, setSelectedKey] = useState<string>('1');
  const { injectStyles } = context;

  return (
    <div
      className={`${styles.container} ${!injectStyles ? styles.menuWrapperClass : ''}`}
    >
      <Menu
        items={basicMenuItems}
        mode={mode}
        selectedKeys={[selectedKey]}
        onSelect={(info) => setSelectedKey(info.key)}
        classNames={menuClassNames}
        injectStyles={injectStyles}
      />
    </div>
  );
}

// Menu Controls
export function DemoMenuBasicControls() {
  const context = useContext(MenuControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { mode, setMode, injectStyles, setInjectStyles } = context;

  return (
    <Controls
      items={[
        {
          label: '모드 (Mode)',
          control: (
            <Select
              options={[
                { label: 'Vertical', value: 'vertical' },
                { label: 'Horizontal', value: 'horizontal' },
                { label: 'Inline', value: 'inline' },
              ]}
              value={mode}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setMode(val as typeof mode);
                }
              }}
              placeholder="모드 선택"
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
      ]}
    />
  );
}

// Export individual demo components for MDX
export function DemoMenuBasic() {
  const [selectedKey, setSelectedKey] = useState<string>('1');

  return (
    <div className={styles.container}>
      <Menu
        items={basicMenuItems}
        selectedKeys={[selectedKey]}
        onSelect={(info) => setSelectedKey(info.key)}
        classNames={menuClassNames}
      />
    </div>
  );
}

export function DemoMenuWithIcons() {
  const [selectedKey, setSelectedKey] = useState<string>('1');

  return (
    <div className={styles.container}>
      <Menu
        items={menuItemsWithIcons}
        selectedKeys={[selectedKey]}
        onSelect={(info) => setSelectedKey(info.key)}
        classNames={menuClassNames}
      />
    </div>
  );
}

export function DemoMenuWithMixedIcons() {
  const [selectedKey, setSelectedKey] = useState<string>('1');

  return (
    <div className={styles.container}>
      <Menu
        items={menuItemsWithMixedIcons}
        selectedKeys={[selectedKey]}
        onSelect={(info) => setSelectedKey(info.key)}
        classNames={menuClassNames}
      />
    </div>
  );
}

export function DemoMenuWithSubmenu() {
  const [selectedKey, setSelectedKey] = useState<string>('1-1');
  const [openKeys, setOpenKeys] = useState<string[]>(['1']);

  return (
    <div className={styles.container}>
      <Menu
        items={menuItemsWithSubmenu}
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        onSelect={(info) => setSelectedKey(info.key)}
        onOpenChange={(keys) => setOpenKeys(keys)}
        classNames={menuClassNames}
      />
    </div>
  );
}

export function DemoMenuHorizontal() {
  const [selectedKey, setSelectedKey] = useState<string>('1');

  return (
    <div className={styles.container}>
      <Menu
        items={basicMenuItems}
        mode="horizontal"
        selectedKeys={[selectedKey]}
        onSelect={(info) => setSelectedKey(info.key)}
        classNames={menuClassNames}
      />
    </div>
  );
}

export function DemoMenuWithDisabled() {
  const [selectedKey, setSelectedKey] = useState<string>('1');

  return (
    <div className={styles.container}>
      <Menu
        items={menuItemsWithDisabled}
        selectedKeys={[selectedKey]}
        onSelect={(info) => setSelectedKey(info.key)}
        classNames={menuClassNames}
      />
    </div>
  );
}

export function menuDemo() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h2>menu 컴포넌트 데모</h2>

      <div style={{ marginBottom: '2rem' }}>
        <h3>기본 사용법</h3>
        <DemoMenuBasic />
      </div>
    </div>
  );
}
