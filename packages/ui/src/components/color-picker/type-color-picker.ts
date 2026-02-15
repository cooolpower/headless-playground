import type { ReactNode } from 'react';
export interface ColorPickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  injectStyles?: boolean;
}

export interface UseColorPickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
}

export interface UseColorPickerReturn {
  color: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  handleColorChange: (color: string) => void;
}
