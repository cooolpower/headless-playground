import type { ReactNode } from 'react';
export interface LoadingBarProps {
  percent?: number;
  show?: boolean;
  color?: string;
  height?: number;
  /** 기본 스타일(CSS) 주입 여부 */
  injectStyles?: boolean;
  className?: string;
  children?: ReactNode;
}

export interface UseLoadingBarProps {
  percent?: number;
  show?: boolean;
}

export interface UseLoadingBarReturn {
  displayPercent: number;
  isVisible: boolean;
  startLoading: () => void;
  finishLoading: () => void;
  errorLoading: () => void;
}
