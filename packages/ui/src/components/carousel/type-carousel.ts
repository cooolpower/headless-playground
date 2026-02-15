import type { ReactNode } from 'react';
export interface CarouselProps {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  disabled?: boolean;
  className?: string;
  injectStyles?: boolean;
  children?: ReactNode;
}

export interface UseCarouselProps {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  disabled?: boolean;
}

export interface UseCarouselReturn {
  currentValue: any;
  handleChange: (value: any) => void;
}
