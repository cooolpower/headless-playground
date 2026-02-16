'use client';

import React, { forwardRef } from 'react';
import { PopoverProps } from './type-popover';
import { usePopover } from './use-popover';
import { popoverCss as _popoverCss } from './popover.styles';
import { cx } from '../../utils';

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      children,
      content,
      title,
      placement = 'top',
      trigger = 'hover',
      visible,
      onVisibleChange,
      mouseEnterDelay = 100,
      mouseLeaveDelay = 100,
      overlayClassName,
      className,
      injectStyles = true,
      ...props
    },
    ref,
  ) => {
    const { isVisible, triggerProps, popoverProps } = usePopover({
      visible,
      onVisibleChange,
      trigger,
      placement,
      mouseEnterDelay,
      mouseLeaveDelay,
    });

    return (
      <>
        <div ref={ref} className={className} {...triggerProps} {...props}>
          {children}
        </div>

        {isVisible && (
          <div
            className={cx('hcPopoverOverlay', overlayClassName)}
            {...popoverProps}
          >
            {injectStyles ? (
              <style suppressHydrationWarning>{_popoverCss}</style>
            ) : null}
            <div className="hcPopoverArrow" aria-hidden="true" />
            <div className="hcPopoverCard">
              {!!title && <div className="hcPopoverTitle">{title as any}</div>}
              <div className="hcPopoverContent">{content as any}</div>
            </div>
          </div>
        )}
      </>
    );
  },
);

Popover.displayName = 'Popover';

export const PopoverCss = _popoverCss;
