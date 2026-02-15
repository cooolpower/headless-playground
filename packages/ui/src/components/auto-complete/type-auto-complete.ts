import type { ReactNode } from 'react';
export interface AutocompleteProps {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  disabled?: boolean;
  className?: string;
  injectStyles?: boolean;
  children?: ReactNode;
}

export interface UseAutocompleteProps {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  disabled?: boolean;
}

export interface UseAutocompleteReturn {
  currentValue: any;
  handleChange: (value: any) => void;
}
