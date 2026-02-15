import type { ReactNode } from 'react';
import { UseFloatButtonProps } from './use-float-button';

export interface UseFloatButtonGroupProps {
  children: ReactNode;
  // position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  direction: 'column' | 'row';
  spacing?: number;
  className?: string;
  injectStyles?: boolean;
}

export interface UseFloatButtonBackTopProps extends Omit<
  UseFloatButtonProps,
  'onClick'
> {
  onClick?: () => void;
  visibilityHeight?: number;
  target?: () => HTMLElement | Window;
}
