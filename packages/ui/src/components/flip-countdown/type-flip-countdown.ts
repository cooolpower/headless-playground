import type { ReactNode } from 'react';

export type FlipCountdownDigitSize = 'sm' | 'md' | 'lg' | 'xl';
export type FlipCountdownMode = 'time' | 'number';

export type FlipCountdownLabels = Partial<{
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
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
}

