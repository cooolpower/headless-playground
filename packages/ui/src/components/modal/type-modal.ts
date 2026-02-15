import { UseModalProps } from './use-modal';

import type { ReactNode } from 'react';
export interface ModalProps extends UseModalProps {
  injectStyles?: boolean;
  title?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode | null;
  className?: string;
}
