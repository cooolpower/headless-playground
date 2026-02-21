import type { ReactNode } from 'react';
import { UseCountdownProps } from './use-countdown';

export interface CountdownProps extends UseCountdownProps {
  className?: string;
  injectStyles?: boolean;
  children?: (timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
    total: number;
  }) => ReactNode;
}
