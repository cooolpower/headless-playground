'use client';

import React, { forwardRef } from 'react';
import { CollapseProps, CollapsePanelProps } from './type-collapse';
import { useCollapse } from './use-collapse';
import { collapseCss as _collapseCss } from './collapse.styles';

export const CollapseCss = _collapseCss;

function cx(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(' ');
}

export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(
  (
    {
      children,
      accordion = false,
      activeKey,
      defaultActiveKey,
      onChange,
      destroyInactivePanel = false,
      expandIcon,
      expandIconPosition = 'left',
      className,
      injectStyles = true,
      ...props
    },
    ref
  ) => {
    const { activeKeys, onPanelChange, isActive } = useCollapse({
      accordion,
      activeKey,
      defaultActiveKey,
      onChange,
    });

    const defaultExpandIcon = ({ isActive }: { isActive: boolean }) => (
      <span>›</span>
    );

    const icon = expandIcon || defaultExpandIcon;

    return (
      <div ref={ref} className={cx('hcCollapse', className)} {...props}>
        {injectStyles && <style suppressHydrationWarning>{_collapseCss}</style>}
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return null;

          const panelProps = child.props as CollapsePanelProps;
          const panelKey = panelProps.key || `panel-${index}`;
          const panelIsActive = isActive(panelKey);

          return React.cloneElement(child, {
            ...panelProps,
            key: panelKey,
            isActive: panelIsActive,
            onChange: (isActive: boolean) => onPanelChange(panelKey, isActive),
            destroyInactivePanel,
            expandIcon: icon,
            expandIconPosition,
            ...(injectStyles ? { injectStyles: false } : {}),
          } as any);
        })}
      </div>
    );
  }
);

export const CollapsePanel = forwardRef<
  HTMLDivElement,
  CollapsePanelProps & {
    isActive?: boolean;
    onChange?: (isActive: boolean) => void;
    destroyInactivePanel?: boolean;
    expandIcon?: (panelProps: { isActive: boolean }) => React.ReactNode;
    expandIconPosition?: 'left' | 'right';
  }
>(
  (
    {
      header,
      children,
      disabled = false,
      showArrow = true,
      extra,
      isActive = false,
      onChange,
      destroyInactivePanel = false,
      expandIcon,
      expandIconPosition = 'left',
      className,
      injectStyles = true,
      ...props
    },
    ref
  ) => {
    const handleHeaderClick = () => {
      if (!disabled) {
        onChange?.(!isActive);
      }
    };

    return (
      <div
        ref={ref}
        className={cx('hcCollapsePanel', className)}
        data-active={isActive ? 'true' : 'false'}
        data-disabled={disabled ? 'true' : 'false'}
        {...props}
      >
        {injectStyles && <style suppressHydrationWarning>{_collapseCss}</style>}
        <div
          className="hcCollapseHeader"
          onClick={handleHeaderClick}
          role="button"
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleHeaderClick();
            }
          }}
          aria-expanded={isActive}
          aria-disabled={disabled}
        >
          {expandIconPosition === 'left' && showArrow && expandIcon && (
            <div className="hcCollapseArrow">{expandIcon({ isActive })}</div>
          )}

          <div className="hcCollapseHeaderMain">{header}</div>

          {extra && <div className="hcCollapseExtra">{extra}</div>}

          {expandIconPosition === 'right' && showArrow && expandIcon && (
            <div className="hcCollapseArrow">{expandIcon({ isActive })}</div>
          )}
        </div>

        <div
          style={{
            display: isActive ? 'block' : 'none',
          }}
        >
          <div className="hcCollapseContent">
            {(!destroyInactivePanel || isActive) && children}
          </div>
        </div>
      </div>
    );
  }
);

Collapse.displayName = 'Collapse';
CollapsePanel.displayName = 'CollapsePanel';

// Back-compat API used by docs/demos: <Collapse.Panel />
(Collapse as any).Panel = CollapsePanel;
