import { UseFlexProps } from './use-flex';

import type { ReactNode } from 'react';
export interface FlexProps extends UseFlexProps {
  className?: string;
  injectStyles?: boolean;
  children: ReactNode;
}
