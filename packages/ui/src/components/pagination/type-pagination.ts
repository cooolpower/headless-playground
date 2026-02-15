import type { ReactNode } from 'react';
export interface PaginationProps {
  injectStyles?: boolean;
  current?: number;
  defaultCurrent?: number;
  total?: number;
  pageSize?: number;
  defaultPageSize?: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => ReactNode;
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  simple?: boolean;
  className?: string;
  children?: ReactNode;
}

export interface UsePaginationProps {
  current?: number;
  defaultCurrent?: number;
  total?: number;
  pageSize?: number;
  defaultPageSize?: number;
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
}

export interface UsePaginationReturn {
  current: number;
  pageSize: number;
  total: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  handleSizeChange: (size: number) => void;
  getPageRange: () => { start: number; end: number };
  canGoPrev: () => boolean;
  canGoNext: () => boolean;
  goToPrev: () => void;
  goToNext: () => void;
  goToFirst: () => void;
  goToLast: () => void;
}
