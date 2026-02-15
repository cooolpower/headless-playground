import { UseBreadcrumbProps } from './use-breadcrumb';

export interface BreadcrumbProps extends UseBreadcrumbProps {
  /** 기본 스타일(CSS) 주입 여부 */
  injectStyles?: boolean;
  className?: string;
}
