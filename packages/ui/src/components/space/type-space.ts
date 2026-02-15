import { UseSpaceProps } from './use-space';

import type { ReactNode } from 'react';
export interface SpaceProps extends UseSpaceProps {
  className?: string;
  injectStyles?: boolean;
  children: ReactNode;
}
