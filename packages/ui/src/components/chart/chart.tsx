'use client';

import React, { forwardRef } from 'react';
import { ChartProps } from './type-chart';
import { useChart } from './use-chart';
import { chartCss as _chartCss } from './chart.styles';

export const ChartCss = _chartCss;

import { cx } from '../../utils';

export const Chart = forwardRef<HTMLDivElement, ChartProps>(
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
    const { currentValue, handleChange } = useChart({
      value,
      defaultValue,
      onChange,
      disabled,
    });

    return (
      <div
        ref={ref}
        className={cx('hcChart', className)}
        data-disabled={disabled ? 'true' : 'false'}
        {...props}
      >
        {injectStyles && <style suppressHydrationWarning>{_chartCss}</style>}
        {children || (
          <div>Chart Component - Value: {JSON.stringify(currentValue)}</div>
        )}
      </div>
    );
  },
);

Chart.displayName = 'Chart';
