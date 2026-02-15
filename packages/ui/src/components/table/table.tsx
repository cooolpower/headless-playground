'use client';

// components/headless/table/table.tsx
import { useTable, type TableColumn } from './use-table';
import { TableProps } from './type-table';
import { tableCss as _tableCss } from './table.styles';

export const TableCss = _tableCss;

export function Table<T = any>(props: TableProps<T>) {
  const {
    data,
    columns,
    tableProps,
    theadProps,
    tbodyProps,
    getRowProps,
    getCellProps,
    getHeaderCellProps,
    loadingProps,
  } = useTable(props);

  const { className, injectStyles = true } = props;

  return (
    <div className={['hcTableWrap', className].filter(Boolean).join(' ')}>
      {injectStyles && <style suppressHydrationWarning>{_tableCss}</style>}
      <table {...tableProps} className={tableProps.className}>
        <thead {...theadProps} className={theadProps.className}>
          <tr>
            {columns.map((column, index) => (
              <th
                {...getHeaderCellProps(column, index)}
                className={getHeaderCellProps(column, index).className}
                key={column.key}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody {...tbodyProps} className={tbodyProps.className}>
          {data.map((record, rowIndex) => (
            <tr
              {...getRowProps(record, rowIndex)}
              key={getRowProps(record, rowIndex).key}
            >
              {columns.map((column, cellIndex) => {
                const value = column.dataIndex
                  ? (record as any)[column.dataIndex]
                  : undefined;
                const content = column.render
                  ? column.render(value, record, rowIndex)
                  : value;

                return (
                  <td
                    {...getCellProps(column, record, rowIndex, cellIndex)}
                    className={
                      getCellProps(column, record, rowIndex, cellIndex).className
                    }
                    key={`${column.key}-${rowIndex}-${cellIndex}`}
                  >
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {loadingProps && (
        <div {...loadingProps} className={loadingProps.className}>
          <div>Loading...</div>
        </div>
      )}
    </div>
  );
}
