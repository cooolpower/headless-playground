'use client';

// components/headless/table/use-table.ts

export interface TableColumn<T = any> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  ellipsis?: boolean;
}

export interface UseTableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  rowKey?: string | ((record: T, index: number) => string);
  size?: 'small' | 'medium' | 'large';
  bordered?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  loading?: boolean;
  pagination?: {
    current?: number;
    pageSize?: number;
    total?: number;
    showSizeChanger?: boolean;
    showQuickJumper?: boolean;
    onChange?: (page: number, pageSize: number) => void;
  };
  onRow?: (
    record: T,
    index: number
  ) => {
    onClick?: (event: React.MouseEvent) => void;
    onDoubleClick?: (event: React.MouseEvent) => void;
    className?: string;
  };
}

export function useTable<T = any>({
  data,
  columns,
  rowKey = 'key',
  size = 'medium',
  bordered = false,
  striped = false,
  hoverable = true,
  loading = false,
  pagination,
  onRow,
}: UseTableProps<T>) {
  // Row key 생성 함수
  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record, index);
    }
    return (record as any)[rowKey] || index.toString();
  };

  // 정렬된 데이터 (현재는 정렬 로직 생략)
  const sortedData = data;

  // 페이징 처리
  const currentPage = pagination?.current || 1;
  const pageSize = pagination?.pageSize || 10;
  const total = pagination?.total || data.length;

  const paginatedData = pagination
    ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedData;

  return {
    data: paginatedData,
    columns,
    getRowKey,
    pagination: {
      ...pagination,
      current: currentPage,
      pageSize,
      total,
    },

    tableProps: {
      role: 'table',
      className: 'hcTable',
      'data-size': size,
      'data-bordered': bordered ? 'true' : 'false',
      'data-striped': striped ? 'true' : 'false',
      'data-hoverable': hoverable ? 'true' : 'false',
    },

    theadProps: {
      className: 'hcTableHead',
    },

    tbodyProps: {
      className: 'hcTableBody',
    },

    getRowProps: (record: T, index: number) => ({
      key: getRowKey(record, index),
      role: 'row',
      ...onRow?.(record, index),
      className: ['hcTableRow', onRow?.(record, index)?.className]
        .filter(Boolean)
        .join(' '),
    }),

    getCellProps: (
      column: TableColumn<T>,
      record: T,
      rowIndex: number,
      cellIndex: number
    ) => ({
      key: `${column.key}-${rowIndex}-${cellIndex}`,
      role: 'cell',
      className: 'hcTableCell',
      'data-align': column.align || 'left',
      'data-ellipsis': column.ellipsis ? 'true' : 'false',
      style: {
        width: column.width,
        maxWidth: column.width,
      },
    }),

    getHeaderCellProps: (column: TableColumn<T>, index: number) => ({
      key: `header-${column.key}-${index}`,
      role: 'columnheader',
      className: 'hcTableHeaderCell',
      'data-align': column.align || 'left',
      style: {
        width: column.width,
        maxWidth: column.width,
      },
    }),

    loadingProps: loading
      ? {
          className: 'hcTableLoading',
        }
      : null,
  };
}
