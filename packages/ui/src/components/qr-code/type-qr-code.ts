import type { ReactNode } from 'react';
export interface qrcodeProps {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  disabled?: boolean;
  className?: string;
  injectStyles?: boolean;
  children?: ReactNode;
}

export interface UseqrcodeProps {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  disabled?: boolean;
}

export interface UseqrcodeReturn {
  currentValue: any;
  handleChange: (value: any) => void;
}
