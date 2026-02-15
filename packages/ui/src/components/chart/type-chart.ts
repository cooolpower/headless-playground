import type { ReactNode } from 'react';
export interface ChartProps {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  disabled?: boolean;
  className?: string;
  injectStyles?: boolean;
  children?: ReactNode;
}

export interface UseChartProps {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  disabled?: boolean;
}

export interface UseChartReturn {
  currentValue: any;
  handleChange: (value: any) => void;
}
