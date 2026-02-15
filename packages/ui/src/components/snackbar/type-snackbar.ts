import { UseSnackbarProps } from './use-snackbar';

export interface SnackbarProps extends UseSnackbarProps {
  injectStyles?: boolean;
  className?: string;
  index?: number; // 현재 Snackbar의 인덱스 (0부터 시작)
  maxCount?: number; // 최대 표시 개수
}
