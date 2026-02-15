'use client';

import React, { forwardRef } from 'react';
import { useLoadingBar } from './use-loading-bar';
import { LoadingBarProps } from './type-loading-bar';
import { loadingBarCss as _loadingBarCss } from './loading-bar.styles';

export const LoadingBarCss = _loadingBarCss;

export const LoadingBar = forwardRef<HTMLDivElement, LoadingBarProps>(
  (
    {
      percent,
      show,
      color = 'var(--color-semantic-info)',
      height = 3,
      className,
      children,
      injectStyles = true,
      ...props
    },
    ref
  ) => {
    const { displayPercent, isVisible } = useLoadingBar({
      percent,
      show,
    });

    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        className={['hcLoadingBar', className].filter(Boolean).join(' ')}
        style={
          {
            '--loading-bar-color': color,
            '--loading-bar-height': `${height}px`,
          } as React.CSSProperties
        }
        {...props}
      >
        {injectStyles && <style suppressHydrationWarning>{_loadingBarCss}</style>}
        <div
          className="hcLoadingBarProgress"
          style={{
            width: `${Math.min(displayPercent, 100)}%`,
          }}
        />
      </div>
    );
  }
);

LoadingBar.displayName = 'LoadingBar';
