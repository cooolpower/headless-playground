import type { ReactNode } from 'react';
export interface StepsProps {
  items?: StepItem[];
  current?: number;
  direction?: 'horizontal' | 'vertical';
  size?: 'small' | 'medium' | 'large';
  status?: 'wait' | 'process' | 'finish' | 'error';
  onChange?: (current: number) => void;
  className?: string;
  children?: ReactNode;
  injectStyles?: boolean;
}

export interface StepItem {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  status?: 'wait' | 'process' | 'finish' | 'error';
  disabled?: boolean;
}

export interface StepProps extends StepItem {
  stepNumber?: number;
  isLast?: boolean;
  direction?: 'horizontal' | 'vertical';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  injectStyles?: boolean;
}
