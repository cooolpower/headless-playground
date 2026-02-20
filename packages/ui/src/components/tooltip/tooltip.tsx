'use client';

import React, { forwardRef, useState, useRef } from 'react';
import { TooltipProps } from './type-tooltip';
import { useTooltip } from './use-tooltip';
import { tooltipCss as _tooltipCss } from './tooltip.styles';
import { cx } from '../../utils';
import { useStyles } from '../../hooks/use-styles';

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      content,
      placement = 'top',
      trigger = 'hover',
      visible: controlledVisible,
      onVisibleChange,
      overlayClassName,
      className,
      injectStyles = true,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledVisible, setUncontrolledVisible] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const isControlled = controlledVisible !== undefined;
    const visible = isControlled ? controlledVisible : uncontrolledVisible;

    const { triggerProps, tooltipProps } = useTooltip({
      visible,
      onVisibleChange: (newVisible) => {
        if (!isControlled) {
          setUncontrolledVisible(newVisible);
        }
        onVisibleChange?.(newVisible);
      },
      trigger,
      placement,
      triggerRef: triggerRef as any,
      tooltipRef: tooltipRef as any,
    });

    // useStyles 훅을 통해 테마 및 컴포넌트 스타일 주입
    useStyles('hc-tooltip-styles', _tooltipCss, injectStyles);

    return (
      <>
        <div
          ref={triggerRef}
          className={className}
          {...triggerProps}
          {...props}
        >
          {children}
        </div>

        {visible && (
          <div
            ref={tooltipRef}
            role="tooltip"
            className={cx('hcTooltipOverlay', overlayClassName)}
            {...tooltipProps}
          >
            <div className="hcTooltipArrow" aria-hidden="true" />
            <div className="hcTooltipCard">{content}</div>
          </div>
        )}
      </>
    );
  },
);

Tooltip.displayName = 'Tooltip';

export const TooltipCss = _tooltipCss;
