import { UseAlertProps } from './use-alert';

export interface AlertProps extends UseAlertProps {
  /** 기본 스타일(CSS) 주입 여부 */
  injectStyles?: boolean;
  className?: string;
}
