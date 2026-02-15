import { UseSwitchProps } from './use-switch';

import type { ReactNode } from 'react';
export interface SwitchProps extends UseSwitchProps {
  injectStyles?: boolean;
  className?: string;
  children?: ReactNode;
}
