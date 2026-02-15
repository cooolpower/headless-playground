import { UseCascaderProps } from './use-cascader';
import type { ReactNode } from 'react';

export interface CascaderProps extends UseCascaderProps {
  injectStyles?: boolean;
  className?: string;
  inputClassName?: string;
}
