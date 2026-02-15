'use client';

import React, { forwardRef, useState, useRef } from 'react';
import { TooltipProps } from './type-tooltip';
import { useTooltip } from './use-tooltip';
import { tooltipCss as _tooltipCss } from './tooltip.styles';

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
    ref
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
      triggerRef: triggerRef as React.RefObject<HTMLElement>,
      tooltipRef: tooltipRef as React.RefObject<HTMLElement>,
    });

    return (
      <>
        <div ref={triggerRef} className={className} {...triggerProps} {...props}>
          {children}
        </div>

        {visible && (
          <div
            ref={tooltipRef}
            role="tooltip"
            className={
              overlayClassName
                ? `hcTooltipOverlay ${overlayClassName}`
                : 'hcTooltipOverlay'
            }
            {...tooltipProps}
          >
            {injectStyles ? (
              <style suppressHydrationWarning>{_tooltipCss}</style>
            ) : null}
            <div className="hcTooltipArrow" aria-hidden="true" />
            <div className="hcTooltipCard">{content}</div>
          </div>
        )}
      </>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export const TooltipCss = _tooltipCss;
