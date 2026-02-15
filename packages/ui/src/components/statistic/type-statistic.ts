import type { ReactNode } from 'react';

export interface StatisticClassNames {
  container?: string;
  title?: string;
  content?: string;
  prefix?: string;
  value?: string;
  suffix?: string;
  loading?: string;
  loadingSkeleton?: string;
}

export interface StatisticProps {
  title?: ReactNode;
  value?: string | number;
  prefix?: ReactNode;
  suffix?: ReactNode;
  precision?: number;
  groupSeparator?: string;
  decimalSeparator?: string;
  loading?: boolean;
  valueStyle?: React.CSSProperties;
  /** 기본 스타일(CSS) 주입 여부 */
  injectStyles?: boolean;
  className?: string;
  classNames?: StatisticClassNames;
  children?: ReactNode;
}

export interface UseStatisticProps {
  value?: string | number;
  precision?: number;
  groupSeparator?: string;
  decimalSeparator?: string;
}

export interface UseStatisticReturn {
  displayValue: string;
  formattedValue: string;
}
