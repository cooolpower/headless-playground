'use client';

import React, { forwardRef } from 'react';
import { BadgeProps } from './type-badge';
import { useBadge } from './use-badge';
import { badgeCss as _badgeCss } from './badge.styles';

export const BadgeCss = _badgeCss;

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      count,
      dot = false,
      showZero = false,
      maxCount = 99,
      color = 'default',
      size = 'medium',
      processing = false,
      className,
      backgroundColor,
      textColor,
      borderWidth,
      borderColor,
      borderStyle = 'solid',
      injectStyles = true,
      ...props
    },
    ref,
  ) => {
    const { displayCount, shouldShowBadge } = useBadge({
      count,
      maxCount,
      showZero,
    });

    const hasChildren = children !== undefined && children !== null;

    // Dot 스타일일 때는 항상 표시 (count가 없어도)
    const shouldDisplay = dot ? true : shouldShowBadge;

    // 커스텀 색상이 있는지 확인 (color가 BadgeColor 타입인지 문자열인지)
    const isCustomColor =
      typeof color === 'string' &&
      !['default', 'primary', 'success', 'warning', 'danger', 'info'].includes(
        color,
      );

    // className을 조합하여 스타일 적용
    const badgeClassName = [
      className,
      dot ? 'hcBadgeDot' : 'hcBadgeCount',
      !isCustomColor ? `hcBadge-${color}` : undefined,
      `hcBadge-${size}`,
      processing ? 'hcBadgeProcessing' : '',
    ]
      .filter(Boolean)
      .join(' ');

    // 커스텀 스타일 계산
    const customStyle: React.CSSProperties = {
      ...(backgroundColor && { backgroundColor }),
      ...(textColor && { color: textColor }),
      ...(borderStyle === 'none' && { border: 'none' }),
      ...(borderStyle !== 'none' && {
        borderWidth: borderWidth || 'var(--border-width-thin)',
        borderColor: borderColor || 'var(--color-border)',
        borderStyle,
      }),
      ...(isCustomColor && { backgroundColor: color }),
    };

    const styleTag = injectStyles ? (
      <style suppressHydrationWarning>{_badgeCss}</style>
    ) : null;

    const badgeElement = (
      <span ref={ref} className={badgeClassName} style={customStyle} {...props}>
        {!dot && displayCount}
      </span>
    );

    if (!hasChildren) {
      return shouldDisplay ? (
        <>
          {styleTag}
          {badgeElement}
        </>
      ) : null;
    }

    return (
      <span className="hcBadgeContainer">
        {styleTag}
        {children}
        {shouldDisplay && badgeElement}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
