'use client';

// components/headless/list/use-list.ts

export interface ListItemProps {
  key?: string | number;
  children?: React.ReactNode;
  actions?: React.ReactNode[];
  extra?: React.ReactNode;
  className?: string;
}

export interface UseListProps {
  data?: any[];
  itemLayout?: 'horizontal' | 'vertical';
  size?: 'small' | 'medium' | 'large';
  bordered?: boolean;
  split?: boolean;
  loading?: boolean;
  pagination?: {
    current?: number;
    pageSize?: number;
    total?: number;
    onChange?: (page: number, pageSize: number) => void;
  };
  renderItem?: (item: any, index: number) => React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  emptyText?: React.ReactNode;
}

export function useList({
  data = [],
  itemLayout = 'horizontal',
  size = 'medium',
  bordered = false,
  split = true,
  loading = false,
  pagination,
  renderItem,
  header,
  footer,
  emptyText = 'No data',
}: UseListProps) {
  // 페이징 처리
  const currentPage = pagination?.current || 1;
  const pageSize = pagination?.pageSize || 10;
  const total = pagination?.total || data.length;

  const paginatedData = pagination
    ? data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : data;

  // 스타일 설정
  return {
    data: paginatedData,
    pagination: {
      ...pagination,
      current: currentPage,
      pageSize,
      total,
    },

    containerProps: {
      className: 'hcList',
      'data-size': size,
      'data-bordered': bordered ? 'true' : 'false',
      'data-split': split ? 'true' : 'false',
    },

    headerProps: header
      ? {
          className: 'hcListHeader',
        }
      : null,

    listProps: {
      className: 'hcListUl',
    },

    getItemProps: (index: number) => ({
      className: 'hcListItem',
    }),

    footerProps: footer
      ? {
          className: 'hcListFooter',
        }
      : null,

    loadingProps: loading
      ? {
          className: 'hcListLoading',
        }
      : null,

    emptyProps:
      !loading && paginatedData.length === 0
        ? {
            className: 'hcListEmpty',
          }
        : null,
  };
}
