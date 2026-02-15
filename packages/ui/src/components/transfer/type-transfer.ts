import type { ReactNode } from 'react';
export interface TransferItem {
  key: string | number;
  title: string;
  description?: string;
  disabled?: boolean;
  [key: string]: any;
}

/** Class names for Transfer component internal elements */
export interface TransferClassNames {
  transfer?: string;
  transferList?: string;
  transferListHeader?: string;
  transferListTitle?: string;
  transferListSearch?: string;
  searchInput?: string;
  transferListBody?: string;
  transferListContent?: string;
  transferListItem?: string;
  checkboxLabel?: string;
  itemLabel?: string;
  itemContent?: string;
  itemDescription?: string;
  count?: string;
  transferOperations?: string;
  operationButton?: string;
  operationButtonEnabled?: string;
}

export interface TransferProps {
  injectStyles?: boolean;
  dataSource: TransferItem[];
  targetKeys: string[];
  selectedKeys: string[];
  onChange?: (
    targetKeys: string[],
    direction: 'left' | 'right',
    moveKeys: string[]
  ) => void;
  onSelectChange?: (
    sourceSelectedKeys: string[],
    targetSelectedKeys: string[]
  ) => void;
  onScroll?: (
    direction: 'left' | 'right',
    e: React.UIEvent<HTMLUListElement>
  ) => void;
  titles?: [ReactNode, ReactNode];
  operations?: [string, string];
  showSearch?: boolean;
  filterOption?: (inputValue: string, item: TransferItem) => boolean;
  render?: (item: TransferItem) => ReactNode;
  disabled?: boolean;
  showSelectAll?: boolean;
  oneWay?: boolean;
  pagination?: boolean | { pageSize?: number };
  className?: string;
  /** Class names for internal elements */
  classNames?: TransferClassNames;
}

export interface UseTransferProps {
  dataSource: TransferItem[];
  targetKeys: string[];
  selectedKeys: string[];
  onChange?: (
    targetKeys: string[],
    direction: 'left' | 'right',
    moveKeys: string[]
  ) => void;
  onSelectChange?: (
    sourceSelectedKeys: string[],
    targetSelectedKeys: string[]
  ) => void;
  disabled?: boolean;
}

export interface UseTransferReturn {
  sourceData: TransferItem[];
  targetData: TransferItem[];
  sourceSelectedKeys: string[];
  targetSelectedKeys: string[];
  handleSelectChange: (
    direction: 'left' | 'right',
    selectedKeys: string[]
  ) => void;
  handleTransfer: (direction: 'left' | 'right') => void;
  handleSelectAll: (direction: 'left' | 'right', selected: boolean) => void;
  canTransfer: (direction: 'left' | 'right') => boolean;
}
