'use client';

import React, { forwardRef } from 'react';
import { mapProps } from './type-map';
import { usemap } from './use-map';
import { mapCss as _mapCss } from './map.styles';

export const MapCss = _mapCss;

function cx(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(' ');
}

export const Map = forwardRef<HTMLDivElement, mapProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      disabled = false,
      className,
      injectStyles = true,
      children,
      ...props
    },
    ref
  ) => {
    const { currentValue, handleChange } = usemap({
      value,
      defaultValue,
      onChange,
      disabled,
    });

    return (
      <div
        ref={ref}
        className={injectStyles ? cx('hcMap', className) : className}
        data-disabled={disabled ? 'true' : 'false'}
        {...props}
      >
        {injectStyles && <style suppressHydrationWarning>{_mapCss}</style>}
        {children ?? <div>Map Component - Value: {JSON.stringify(currentValue)}</div>}
      </div>
    );
  }
);

Map.displayName = 'Map';
