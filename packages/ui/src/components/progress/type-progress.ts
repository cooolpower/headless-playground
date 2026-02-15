import { UseProgressProps } from './use-progress';

export interface ProgressProps extends UseProgressProps {
  /** 기본 스타일(CSS) 주입 여부 */
  injectStyles?: boolean;
  className?: string;
}
