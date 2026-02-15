import type { ReactNode } from 'react';
export interface TooltipProps {
  injectStyles?: boolean;
  children: ReactNode;
  content: ReactNode;
  placement?: TooltipPlacement;
  trigger?: TooltipTrigger;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  overlayClassName?: string;
  className?: string;
}

export type TooltipPlacement =
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

export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'context-menu';

export interface UseTooltipProps {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  trigger: TooltipTrigger;
  placement: TooltipPlacement;
  triggerRef: React.RefObject<HTMLElement>;
  tooltipRef: React.RefObject<HTMLElement>;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
}

export interface UseTooltipReturn {
  triggerProps: Record<string, any>;
  tooltipProps: Record<string, any>;
}
