import type { ReactNode } from 'react';

export type FlipCountdownDigitSize = 'sm' | 'md' | 'lg' | 'xl';
export type FlipCountdownMode = 'time' | 'number';

export type FlipCountdownLabels = Partial<{
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  milliseconds: string;
  number: string;
}>;

export interface FlipCountdownProps {
  targetTime: number | Date;
  active?: boolean;
  mode?: FlipCountdownMode;
  format?: string;
  minDigits?: number;
  labels?: FlipCountdownLabels;
  digitSize?: FlipCountdownDigitSize;
  injectStyles?: boolean;
  className?: string;
  children?: ReactNode;
  /**
   * 밀리초 정밀도 (0-3). 0이면 초 단위, 3이면 밀리초 3자리까지 표시.
   * @default 0
   */
  precision?: 0 | 1 | 2 | 3;
}

