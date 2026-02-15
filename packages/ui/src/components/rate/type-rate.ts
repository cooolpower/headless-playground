import type { ReactNode } from 'react';

export interface RateClassNames {
  container?: string;
  starWrapper?: string;
  star?: string;
  starActive?: string;
  starHalf?: string;
  starHalfActive?: string;
}

export interface RateProps {
  count?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  allowHalf?: boolean;
  disabled?: boolean;
  character?: ReactNode;
  className?: string;
  classNames?: RateClassNames;
  injectStyles?: boolean;
  children?: ReactNode;
}

export interface UseRateProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  count?: number;
  allowHalf?: boolean;
  disabled?: boolean;
}

export interface UseRateReturn {
  currentValue: number;
  handleClick: (index: number, isHalf: boolean) => void;
  handleHover: (index: number, isHalf: boolean) => void;
  handleLeave: () => void;
  hoverValue: number | null;
}
