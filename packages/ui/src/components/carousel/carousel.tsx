'use client';

import React, { forwardRef } from 'react';
import { CarouselProps } from './type-carousel';
import { useCarousel } from './use-carousel';
import { carouselCss as _carouselCss } from './carousel.styles';

export const CarouselCss = _carouselCss;

import { cx } from '../../utils';

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
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
    const { currentValue, handleChange } = useCarousel({
      value,
      defaultValue,
      onChange,
      disabled,
    });

    return (
      <div
        ref={ref}
        className={cx('hcCarousel', className)}
        data-disabled={disabled ? 'true' : 'false'}
        {...props}
      >
        {injectStyles && <style suppressHydrationWarning>{_carouselCss}</style>}
        {children || (
          <div>Carousel Component - Value: {JSON.stringify(currentValue)}</div>
        )}
      </div>
    );
  },
);

Carousel.displayName = 'Carousel';
