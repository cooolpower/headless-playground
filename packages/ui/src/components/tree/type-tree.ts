import type { ReactNode } from 'react';

/** Class names for Tree component internal elements */
export interface TreeClassNames {
  tree?: string;
  treeNode?: string;
  treeNodeContent?: string;
  treeNodeSelected?: string;
  treeNodeDisabled?: string;
  treeNodeChildren?: string;
  treeIndent?: string;
  treeIndentLine?: string;
  treeSwitcher?: string;
  treeSwitcherButton?: string;
  treeSwitcherExpanded?: string;
  treeSwitcherLeaf?: string;
  treeCheckbox?: string;
  treeIcon?: string;
  treeTitle?: string;
}

export interface TreeNodeData {
  key: string | number;
  title: ReactNode;
  children?: TreeNodeData[];
  disabled?: boolean;
  selectable?: boolean;
  checkable?: boolean;
  isLeaf?: boolean;
  icon?: ReactNode;
  [key: string]: any;
}

export interface TreeProps {
  injectStyles?: boolean;
  children?: ReactNode;
  treeData?: TreeNodeData[];
  expandedKeys?: string[];
  selectedKeys?: string[];
  checkedKeys?: string[];
  defaultExpandedKeys?: string[];
  defaultSelectedKeys?: string[];
  defaultCheckedKeys?: string[];
  onExpand?: (
    expandedKeys: string[],
    info: { node: TreeNodeData; expanded: boolean; nativeEvent: MouseEvent }
  ) => void;
  onSelect?: (
    selectedKeys: string[],
    info: { node: TreeNodeData; selected: boolean; nativeEvent: MouseEvent }
  ) => void;
  onCheck?: (
    checkedKeys: string[],
    info: { node: TreeNodeData; checked: boolean; nativeEvent: MouseEvent }
  ) => void;
  showLine?: boolean;
  showIcon?: boolean;
  checkable?: boolean;
  selectable?: boolean;
  multiple?: boolean;
  checkStrictly?: boolean;
  disabled?: boolean;
  autoExpandParent?: boolean;
  defaultExpandAll?: boolean;
  expandAction?: 'click' | 'doubleClick';
  titleRender?: (node: TreeNodeData) => ReactNode;
  filterTreeNode?: (node: TreeNodeData) => boolean;
  className?: string;
  classNames?: TreeClassNames;
}

export interface UseTreeProps {
  treeData?: TreeNodeData[];
  expandedKeys?: string[];
  selectedKeys?: string[];
  checkedKeys?: string[];
  defaultExpandedKeys?: string[];
  defaultSelectedKeys?: string[];
  defaultCheckedKeys?: string[];
  onExpand?: (expandedKeys: string[], info: any) => void;
  onSelect?: (selectedKeys: string[], info: any) => void;
  onCheck?: (checkedKeys: string[], info: any) => void;
  checkable?: boolean;
  selectable?: boolean;
  multiple?: boolean;
  checkStrictly?: boolean;
  autoExpandParent?: boolean;
  defaultExpandAll?: boolean;
}

export interface UseTreeReturn {
  expandedKeys: string[];
  selectedKeys: string[];
  checkedKeys: string[];
  setExpandedKeys: (keys: string[]) => void;
  setSelectedKeys: (keys: string[]) => void;
  setCheckedKeys: (keys: string[]) => void;
  handleExpand: (expandedKeys: string[], info: any) => void;
  handleSelect: (selectedKeys: string[], info: any) => void;
  handleCheck: (checkedKeys: string[], info: any) => void;
  getCheckedNodes: () => TreeNodeData[];
  getExpandedNodes: () => TreeNodeData[];
}
