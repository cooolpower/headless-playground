import type { ReactNode } from 'react';
export interface DataTableProps {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  disabled?: boolean;
  className?: string;
  injectStyles?: boolean;
  children?: ReactNode;
}

export interface UseDataTableProps {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  disabled?: boolean;
}

export interface UseDataTableReturn {
  currentValue: any;
  handleChange: (value: any) => void;
}
