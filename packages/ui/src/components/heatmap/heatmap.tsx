'use client';

import React, { forwardRef } from 'react';
import { heatmapProps } from './type-heatmap';
import { useheatmap } from './use-heatmap';
import { heatmapCss as _heatmapCss } from './heatmap.styles';

export const HeatmapCss = _heatmapCss;

function cx(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(' ');
}

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
    ref
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
        className={injectStyles ? cx('hcHeatmap', className) : className}
        data-disabled={disabled ? 'true' : 'false'}
        {...props}
      >
        {injectStyles && <style suppressHydrationWarning>{_heatmapCss}</style>}
        {children ?? (
          <div>Heatmap Component - Value: {JSON.stringify(currentValue)}</div>
        )}
      </div>
    );
  }
);

Heatmap.displayName = 'Heatmap';
