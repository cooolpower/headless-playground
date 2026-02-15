import { UseToastProps } from './use-toast';

export interface ToastProps extends UseToastProps {
  injectStyles?: boolean;
  className?: string;
  index?: number; // 현재 Toast의 인덱스 (0부터 시작)
  maxCount?: number; // 최대 표시 개수
}
