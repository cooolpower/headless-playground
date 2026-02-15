import type { ReactNode } from 'react';
import { UseSelectProps } from './use-select';

export interface SelectProps extends UseSelectProps {
  injectStyles?: boolean;
  className?: string;
  children?: ReactNode;
}
