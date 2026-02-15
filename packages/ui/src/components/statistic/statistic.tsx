'use client';

import React, { forwardRef } from 'react';
import { StatisticProps } from './type-statistic';
import { useStatistic } from './use-statistic';
import { statisticCss as _statisticCss } from './statistic.styles';

export const StatisticCss = _statisticCss;

export const Statistic = forwardRef<HTMLDivElement, StatisticProps>(
  (
    {
      title,
      value,
      prefix,
      suffix,
      precision = 2,
      groupSeparator = ',',
      decimalSeparator = '.',
      loading = false,
      valueStyle,
      className,
      classNames,
      injectStyles = true,
      ...props
    },
    ref
  ) => {
    const { displayValue } = useStatistic({
      value,
      precision,
      groupSeparator,
      decimalSeparator,
    });

    if (loading) {
      return (
        <div
          ref={ref}
          className={className || classNames?.container || 'hcStatistic'}
          {...props}
        >
          {injectStyles && <style suppressHydrationWarning>{_statisticCss}</style>}
          {title && (
            <div className={classNames?.title || 'hcStatisticTitle'}>{title}</div>
          )}
          <div className={classNames?.loadingSkeleton || 'hcStatisticSkeleton'} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={className || classNames?.container || 'hcStatistic'}
        {...props}
      >
        {injectStyles && <style suppressHydrationWarning>{_statisticCss}</style>}
        {title && <div className={classNames?.title || 'hcStatisticTitle'}>{title}</div>}

        <div className={classNames?.content || 'hcStatisticContent'} style={valueStyle}>
          {prefix && <span className={classNames?.prefix || 'hcStatisticPrefix'}>{prefix}</span>}

          <span className={classNames?.value || 'hcStatisticValue'}>{displayValue}</span>

          {suffix && <span className={classNames?.suffix || 'hcStatisticSuffix'}>{suffix}</span>}
        </div>
      </div>
    );
  }
);

Statistic.displayName = 'Statistic';
