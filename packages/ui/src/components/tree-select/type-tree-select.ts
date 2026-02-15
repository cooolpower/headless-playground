import type { ReactNode } from 'react';
import type { TreeNodeData, TreeClassNames } from '../tree/type-tree';

/** Class names for TreeSelect component internal elements */
export interface TreeSelectClassNames {
  treeselect?: string;
  trigger?: string;
  content?: string;
  triggerText?: string;
  dropdown?: string;
}

export interface TreeSelectProps {
  injectStyles?: boolean;
  treeData: TreeNodeData[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  multiple?: boolean;
  disabled?: boolean;
  placeholder?: string;
  defaultExpandedKeys?: string[];
  className?: string;
  classNames?: TreeSelectClassNames;
  treeClassNames?: TreeClassNames;
  children?: ReactNode;
}

export interface UseTreeSelectProps {
  treeData: TreeNodeData[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  multiple?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export interface UseTreeSelectReturn {
  selectedKeys: string[];
  setSelectedKeys: (keys: string[]) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleOpen: () => void;
  close: () => void;
  wrapperRef: React.RefObject<HTMLDivElement>;
  displayText: string;
}
