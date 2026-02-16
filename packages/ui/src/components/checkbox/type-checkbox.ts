import { UseCheckboxProps } from './use-checkbox';

import type { ReactNode } from 'react';
export interface CheckboxProps extends UseCheckboxProps {
  injectStyles?: boolean;
  className?: string;
  children?: ReactNode; // Label content
  onClick?: (event: React.MouseEvent<HTMLLabelElement>) => void;
}
