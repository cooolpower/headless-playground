import type { ReactNode } from 'react';
import { UseRadioProps, UseRadioGroupProps } from './use-radio';

export interface RadioProps extends UseRadioProps {
  /** 기본 스타일(CSS) 주입 여부 */
  injectStyles?: boolean;
  className?: string;
  children?: ReactNode;
}

export interface RadioGroupProps extends UseRadioGroupProps {
  /** 기본 스타일(CSS) 주입 여부 */
  injectStyles?: boolean;
  className?: string;
  children: ReactNode;
}
