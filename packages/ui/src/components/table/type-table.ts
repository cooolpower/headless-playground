import { UseTableProps } from './use-table';

export interface TableProps<T = any> extends UseTableProps<T> {
  /** 기본 스타일(CSS) 주입 여부 */
  injectStyles?: boolean;
  className?: string;
}
