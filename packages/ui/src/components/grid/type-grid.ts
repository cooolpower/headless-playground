import { UseGridProps } from './use-grid';

import type { ReactNode } from 'react';
export interface GridProps extends UseGridProps {
  className?: string;
  injectStyles?: boolean;
  children: ReactNode;
}
