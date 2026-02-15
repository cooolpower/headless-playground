import { UseListProps } from './use-list';

export interface ListProps extends UseListProps {
  /** 기본 스타일(CSS) 주입 여부 */
  injectStyles?: boolean;
  className?: string;
}
