import type { ReactNode } from 'react';
export interface PopoverProps {
  injectStyles?: boolean;
  content: ReactNode;
  title?: ReactNode;
  placement?: PopoverPlacement;
  trigger?: PopoverTrigger;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  overlayClassName?: string;
  className?: string;
  children?: ReactNode;
}

export type PopoverPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export type PopoverTrigger = 'hover' | 'click' | 'focus' | 'context-menu';

export interface UsePopoverProps {
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  trigger: PopoverTrigger;
  placement: PopoverPlacement;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
}

export interface UsePopoverReturn {
  isVisible: boolean;
  triggerProps: Record<string, any>;
  popoverProps: Record<string, any>;
}
