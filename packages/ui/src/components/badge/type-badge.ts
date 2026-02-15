import type { ReactNode } from 'react';
export interface BadgeProps {
  children?: ReactNode;
  count?: number | string;
  dot?: boolean;
  showZero?: boolean;
  maxCount?: number;
  color?: BadgeColor | string;
  size?: BadgeSize;
  processing?: boolean;
  /** 기본 스타일(CSS) 주입 여부 */
  injectStyles?: boolean;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  borderWidth?: string;
  borderColor?: string;
  borderStyle?: 'none' | 'solid' | 'dashed' | 'dotted';
}

export type BadgeColor =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export type BadgeSize = 'small' | 'medium' | 'large';

export interface UseBadgeProps {
  count?: number | string;
  maxCount?: number;
  showZero?: boolean;
}

export interface UseBadgeReturn {
  displayCount: string | number | null;
  shouldShowBadge: boolean;
}
