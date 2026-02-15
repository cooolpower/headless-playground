import type { ReactNode } from 'react';
import type { TreeClassNames } from '../tree/type-tree';

/** Class names for Menu component internal elements */
export interface MenuClassNames extends TreeClassNames {
  menu?: string;
}

export interface MenuProps {
  injectStyles?: boolean;
  items?: MenuItem[];
  mode?: MenuMode;
  theme?: MenuTheme;
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  openKeys?: string[];
  defaultOpenKeys?: string[];
  onSelect?: (info: MenuInfo) => void;
  onOpenChange?: (openKeys: string[]) => void;
  onClick?: (info: MenuInfo) => void;
  inlineCollapsed?: boolean;
  className?: string;
  classNames?: MenuClassNames;
  children?: ReactNode;
}

export interface MenuItem {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  children?: MenuItem[];
  disabled?: boolean;
  danger?: boolean;
  type?: 'group' | 'divider';
}

export interface MenuItemProps extends Omit<MenuItem, 'key'> {
  itemKey: string; // key는 React 특수 prop이므로 itemKey로 변경
  level?: number;
  isSelected?: boolean;
  isOpen?: boolean;
  onClick?: (info: MenuInfo) => void;
  onTitleClick?: (key: string) => void;
}

export interface MenuInfo {
  key: string;
  keyPath: string[];
  item: MenuItem;
  domEvent: React.MouseEvent;
}

export type MenuMode = 'vertical' | 'horizontal' | 'inline';

export type MenuTheme = 'light' | 'dark';

export interface UseMenuProps {
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  openKeys?: string[];
  defaultOpenKeys?: string[];
  mode?: MenuMode;
  onSelect?: (info: MenuInfo) => void;
  onOpenChange?: (openKeys: string[]) => void;
  onClick?: (info: MenuInfo) => void;
}

export interface UseMenuReturn {
  selectedKeys: string[];
  openKeys: string[];
  handleSelect: (info: MenuInfo) => void;
  handleOpenChange: (key: string, isOpen: boolean) => void;
  isSelected: (key: string) => boolean;
  isOpen: (key: string) => boolean;
}
