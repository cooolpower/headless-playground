'use client';

import React, { forwardRef } from 'react';
import { RateProps } from './type-rate';
import { useRate } from './use-rate';
import { rateCss as _rateCss } from './rate.styles';

export const RateCss = _rateCss;

function cx(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(' ');
}

export const Rate = forwardRef<HTMLDivElement, RateProps>(
  (
    {
      count = 5,
      value,
      defaultValue = 0,
      onChange,
      allowHalf = false,
      disabled = false,
      character = '★',
      className,
      classNames,
      injectStyles = true,
      ...props
    },
    ref
  ) => {
    const { currentValue, handleClick, handleHover, handleLeave, hoverValue } =
      useRate({
        value,
        defaultValue,
        onChange,
        count,
        allowHalf,
        disabled,
      });

    const displayValue = hoverValue ?? currentValue;

    const containerClassName = injectStyles
      ? cx('hcRate', className)
      : className || classNames?.container;

    return (
      <div
        ref={ref}
        className={containerClassName}
        data-disabled={disabled ? 'true' : 'false'}
        onMouseLeave={handleLeave}
        {...props}
      >
        {injectStyles && <style suppressHydrationWarning>{_rateCss}</style>}
        {Array.from({ length: count }, (_, index) => {
          const starValue = index + 1;
          const isActive = displayValue >= starValue;
          const isHalfActive =
            allowHalf &&
            displayValue >= starValue - 0.5 &&
            displayValue < starValue;

          return (
            <div
              key={index}
              className={injectStyles ? 'hcRateStarWrapper' : classNames?.starWrapper}
              onClick={() => handleClick(index, false)}
              onMouseEnter={() => handleHover(index, false)}
            >
              <span
                className={
                  injectStyles
                    ? 'hcRateStar'
                    : isActive
                      ? `${classNames?.star || ''} ${classNames?.starActive || ''}`.trim() || undefined
                      : classNames?.star
                }
                data-active={isActive ? 'true' : 'false'}
              >
                {character}
              </span>

              {allowHalf && (
                <span
                  className={
                    injectStyles
                      ? 'hcRateStarHalf'
                      : isHalfActive
                        ? `${classNames?.starHalf || ''} ${classNames?.starHalfActive || ''}`.trim() || undefined
                        : classNames?.starHalf
                  }
                  data-half-active={isHalfActive ? 'true' : 'false'}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(index, true);
                  }}
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    handleHover(index, true);
                  }}
                >
                  {character}
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

Rate.displayName = 'Rate';
