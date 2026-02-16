'use client';

import React, { forwardRef } from 'react';
import { heatmapProps } from './type-heatmap';
import { useheatmap } from './use-heatmap';
import { heatmapCss as _heatmapCss } from './heatmap.styles';

export const HeatmapCss = _heatmapCss;

import { cx } from '../../utils';

export const Heatmap = forwardRef<HTMLDivElement, heatmapProps>(
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
    const { currentValue, handleChange } = useheatmap({
      value,
      defaultValue,
      onChange,
      disabled,
    });

    return (
      <div
        ref={ref}
        className={cx('hcHeatmap', className)}
        data-disabled={disabled ? 'true' : 'false'}
        {...props}
      >
        {injectStyles && <style suppressHydrationWarning>{_heatmapCss}</style>}
        {children || (
          <div>Heatmap Component - Value: {JSON.stringify(currentValue)}</div>
        )}
      </div>
    );
  },
);

Heatmap.displayName = 'Heatmap';
