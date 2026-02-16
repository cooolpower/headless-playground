'use client';

import React, { forwardRef } from 'react';
import { DataTableProps } from './type-data-table';
import { useDataTable } from './use-data-table';
import { dataTableCss as _dataTableCss } from './data-table.styles';

export const DataTableCss = _dataTableCss;

import { cx } from '../../utils';

export const DataTable = forwardRef<HTMLDivElement, DataTableProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      disabled = false,
      className,
      children,
      injectStyles = true,
      ...props
    },
    ref,
  ) => {
    const { currentValue, handleChange } = useDataTable({
      // Changed from useDataTable to useMap
      value,
      defaultValue,
      onChange,
      disabled,
    });

    return (
      <div
        ref={ref}
        className={cx('hcDataTable', className)}
        data-disabled={disabled ? 'true' : 'false'}
        {...props}
      >
        {injectStyles && (
          <style suppressHydrationWarning>{_dataTableCss}</style>
        )}
        {children || (
          <div>DataTable Component - Value: {JSON.stringify(currentValue)}</div>
        )}
      </div>
    );
  },
);

DataTable.displayName = 'DataTable';
