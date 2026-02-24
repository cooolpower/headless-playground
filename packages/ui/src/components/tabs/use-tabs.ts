'use client';

// components/headless/tabs/use-tabs.ts
import React, { useState, useCallback } from 'react';

export interface TabItem {
  key: string;
  label: React.ReactNode;
  content?: React.ReactNode;
  disabled?: boolean;
  closable?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
}

export interface UseTabsProps {
  items?: TabItem[];
  activeKey?: string;
  defaultActiveKey?: string;
  type?: 'line' | 'card' | 'button';
  size?: 'small' | 'medium' | 'large';
  tabPosition?: 'top' | 'bottom' | 'left' | 'right';
  tabBorderRadius?: string;
  destroyInactiveTabPane?: boolean;
  animated?: boolean;
  onChange?: (activeKey: string) => void;
  onTabClick?: (key: string, event: React.MouseEvent) => void;
  onTabClose?: (key: string) => void;
}

export function useTabs({
  items = [],
  activeKey: controlledActiveKey,
  defaultActiveKey,
  type = 'line',
  size = 'medium',
  tabPosition = 'top',
  tabBorderRadius,
  destroyInactiveTabPane = false,
  animated = true,
  onChange,
  onTabClick,
  onTabClose,
}: UseTabsProps) {
  const [internalActiveKey, setInternalActiveKey] = useState(
    defaultActiveKey || items[0]?.key || ''
  );

  const isControlled = controlledActiveKey !== undefined;
  const activeKey = isControlled ? controlledActiveKey : internalActiveKey;

  const handleTabClick = useCallback(
    (key: string, event: React.MouseEvent) => {
      if (key === activeKey) return;

      if (!isControlled) {
        setInternalActiveKey(key);
      }

      onChange?.(key);
      onTabClick?.(key, event);
    },
    [activeKey, isControlled, onChange, onTabClick]
  );

  const handleTabClose = useCallback(
    (key: string) => {
      onTabClose?.(key);
      // 탭이 닫힐 때의 로직은 부모 컴포넌트에서 처리하도록 함
    },
    [onTabClose]
  );

  // 현재 활성화된 탭의 콘텐츠
  const activeTab = items.find((item) => item.key === activeKey);

  // 스타일 계산
  const sizeStyles = {
    small: {
      tabHeight: '32px',
      fontSize: '14px',
      padding: '0 12px',
    },
    medium: {
      tabHeight: '40px',
      fontSize: '16px',
      padding: '0 16px',
    },
    large: {
      tabHeight: '48px',
      fontSize: '18px',
      padding: '0 20px',
    },
  };

  const currentSize = sizeStyles[size];

  // border-radius 계산
  const defaultRadius = tabBorderRadius || 'var(--radius-lg)';
  const getTabBarBorderRadius = () => {
    if (type !== 'card') return '0';
    switch (tabPosition) {
      case 'top':
        return `${defaultRadius} ${defaultRadius} 0 0`;
      case 'bottom':
        return `0 0 ${defaultRadius} ${defaultRadius}`;
      case 'left':
        return `${defaultRadius} 0 0 ${defaultRadius}`;
      case 'right':
        return `0 ${defaultRadius} ${defaultRadius} 0`;
      default:
        return '0';
    }
  };

  const getTabBarFlexDirection = (
    position: 'top' | 'bottom' | 'left' | 'right',
  ) => {
    switch (position) {
      case 'top':
      case 'bottom':
        return 'row' as const;
      case 'left':
      case 'right':
        return 'column' as const;
      default:
        return 'row' as const;
    }
  };

  const getTabBarWidth = (position: 'top' | 'bottom' | 'left' | 'right') => {
    switch (position) {
      case 'left':
      case 'right':
        return { width: '200px', flexShrink: 0 };
      case 'top':
      case 'bottom':
      default:
        return {};
    }
  };

  const getTabBarBorder = (
    position: 'top' | 'bottom' | 'left' | 'right',
    tabType: 'line' | 'card' | 'button',
  ) => {
    if (tabType === 'card') return {}; // 카드 타입일 때는 바 자체에 보더를 주지 않고 개별 탭과 컨텐츠 보더가 만남
    if (tabType !== 'line') return {};

    switch (position) {
      case 'top':
        return { borderBottom: 'var(--border-width-thin) solid var(--color-border)' };
      case 'bottom':
        return { borderTop: 'var(--border-width-thin) solid var(--color-border)' };
      case 'left':
        return { borderRight: 'var(--border-width-thin) solid var(--color-border)' };
      case 'right':
        return { borderLeft: 'var(--border-width-thin) solid var(--color-border)' };
      default:
        return {};
    }
  };

  const getTabBarBackgroundColor = (tabType: 'line' | 'card' | 'button') => {
    switch (tabType) {
      case 'card':
        return 'transparent';
      case 'line':
      case 'button':
      default:
        return 'transparent';
    }
  };

  const getTabBorderRadius = (index: number, isLast: boolean) => {
    if (type !== 'card') return defaultRadius;
    if (tabPosition === 'top') {
      if (index === 0) return `${defaultRadius} 0 0 0`;
      if (isLast) return `0 ${defaultRadius} 0 0`;
      return '0';
    }
    if (tabPosition === 'bottom') {
      if (index === 0) return `0 0 0 ${defaultRadius}`;
      if (isLast) return `0 0 ${defaultRadius} 0`;
      return '0';
    }
    if (tabPosition === 'left') {
      if (index === 0) return `${defaultRadius} 0 0 0`;
      if (isLast) return `0 0 0 ${defaultRadius}`;
      return '0';
    }
    // right
    if (index === 0) return `0 ${defaultRadius} 0 0`;
    if (isLast) return `0 0 ${defaultRadius} 0`;
    return '0';
  };

  const getTabBorderRadiusValue = (
    tabType: 'line' | 'card' | 'button',
    currentIndex: number,
    totalItems: number,
  ) => {
    switch (tabType) {
      case 'card':
        return getTabBorderRadius(currentIndex, currentIndex === totalItems - 1);
      case 'line':
        return '0';
      case 'button':
      default:
        return tabBorderRadius || defaultRadius;
    }
  };

  const getTabMarginStyles = (
    position: 'top' | 'bottom' | 'left' | 'right',
    tabType: 'line' | 'card' | 'button',
    currentIndex: number,
    totalItems: number,
    isActive: boolean,
  ) => {
    const isCardType = tabType === 'card';
    const isLineType = tabType === 'line';

    if (isCardType && isActive) {
      switch (position) {
        case 'top': return { marginBottom: '-1px', zIndex: 1 };
        case 'bottom': return { marginTop: '-1px', zIndex: 1 };
        case 'left': return { marginRight: '-1px', zIndex: 1 };
        case 'right': return { marginLeft: '-1px', zIndex: 1 };
      }
    }

    switch (position) {
      case 'top':
      case 'bottom':
        return {
          marginBottom: isLineType && isActive ? '-1px' : '0',
        };
      case 'left':
      case 'right':
        return {
          marginRight: isLineType && isActive ? '-1px' : '0',
        };
      default:
        return {};
    }
  };

  const tabBarStyle = {
    display: 'flex',
    gap: '0',
    flexDirection: getTabBarFlexDirection(tabPosition),
    ...getTabBarWidth(tabPosition),
    ...getTabBarBorder(tabPosition, type),
    backgroundColor: getTabBarBackgroundColor(type),
    borderRadius: type === 'card' ? getTabBarBorderRadius() : '0',
  };

  return {
    activeKey,
    activeTab,
    handleTabClick,
    handleTabClose,
    tabPosition,
    tabBorderRadius: defaultRadius,

    containerProps: {
      style: {
        width: '100%',
        display: 'flex',
        ...(tabPosition === 'top' || tabPosition === 'bottom'
          ? { flexDirection: 'column' as const }
          : { flexDirection: 'row' as const }),
      },
    },

    tabBarProps: {
      role: 'tablist',
      style: tabBarStyle,
    },

    getTabProps: (item: TabItem, index: number) => ({
      role: 'tab',
      'aria-selected': item.key === activeKey,
      'aria-disabled': item.disabled,
      'aria-controls': `tabpanel-${item.key}`,
      id: `tab-${item.key}`,
      onClick: (event: React.MouseEvent) => {
        if (!item.disabled) {
          handleTabClick(item.key, event);
        }
      },
      style: {
        position: 'relative' as const,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(tabPosition === 'top' || tabPosition === 'bottom'
          ? {
              height: type === 'card' && item.key !== activeKey
                ? `calc(${currentSize.tabHeight} - 1px)`
                : currentSize.tabHeight,
              alignSelf: tabPosition === 'top' ? 'flex-end' : 'flex-start'
            }
          : {
              width: type === 'card' && item.key !== activeKey
                ? `calc(100% - 1px)`
                : '100%',
              minHeight: currentSize.tabHeight,
              alignSelf: tabPosition === 'left' ? 'flex-end' : 'flex-start'
            }),
        padding: currentSize.padding,
        fontSize: currentSize.fontSize,
        fontWeight: item.key === activeKey ? '600' : '400',
        color: item.disabled
          ? 'var(--color-text-disabled)'
          : item.key === activeKey && type === 'button'
            ? 'var(--color-neutral-0)'
            : item.key === activeKey
              ? 'var(--color-semantic-info)'
              : 'var(--color-text-secondary)',
        cursor: item.disabled ? 'not-allowed' : 'pointer',
        backgroundColor:
          item.key === activeKey && type === 'button'
            ? 'var(--color-semantic-info)'
            : type === 'card' && item.key === activeKey
              ? 'var(--color-surface)'
              : 'transparent',
        ...(type === 'card'
          ? {
              borderTop: tabPosition === 'bottom' && item.key === activeKey ? 'none' : 'var(--border-width-thin) solid var(--color-border)',
              borderRight: tabPosition === 'left' && item.key === activeKey ? 'none' : 'var(--border-width-thin) solid var(--color-border)',
              borderBottom: tabPosition === 'top' && item.key === activeKey ? 'none' : 'var(--border-width-thin) solid var(--color-border)',
              borderLeft: tabPosition === 'right' && item.key === activeKey ? 'none' : 'var(--border-width-thin) solid var(--color-border)',
            }
          : {}),
        ...(item.key === activeKey && type === 'line'
          ? tabPosition === 'top'
            ? { borderBottom: 'var(--border-width-medium) solid var(--color-semantic-info)' }
            : tabPosition === 'bottom'
              ? { borderTop: 'var(--border-width-medium) solid var(--color-semantic-info)' }
              : tabPosition === 'left'
                ? { borderRight: 'var(--border-width-medium) solid var(--color-semantic-info)' }
                : { borderLeft: 'var(--border-width-medium) solid var(--color-semantic-info)' }
          : type !== 'card'
            ? {
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                borderBottom: 'none',
              }
            : {}),
        borderRadius: getTabBorderRadiusValue(type, index, items.length),
        ...(getTabMarginStyles(
          tabPosition,
          type,
          index,
          items.length,
          item.key === activeKey,
        )),
        transition: 'all 0.2s',
        gap: '8px',
      },
    }),

    contentContainerProps: {
      style: {
        padding: '16px',
        flex: 1,
        ...(type === 'card'
          ? {
              borderTop: tabPosition === 'top' ? 'none' : 'var(--border-width-thin) solid var(--color-border)',
              borderRight: tabPosition === 'right' ? 'none' : 'var(--border-width-thin) solid var(--color-border)',
              borderBottom: tabPosition === 'bottom' ? 'none' : 'var(--border-width-thin) solid var(--color-border)',
              borderLeft: tabPosition === 'left' ? 'none' : 'var(--border-width-thin) solid var(--color-border)',
              ...(tabPosition === 'top' ? { borderRadius: `0 0 ${defaultRadius} ${defaultRadius}` } : {}),
              ...(tabPosition === 'bottom' ? { borderRadius: `${defaultRadius} ${defaultRadius} 0 0` } : {}),
              ...(tabPosition === 'left' ? { borderRadius: `0 ${defaultRadius} ${defaultRadius} 0` } : {}),
              ...(tabPosition === 'right' ? { borderRadius: `${defaultRadius} 0 0 ${defaultRadius}` } : {}),
            }
          : tabPosition === 'top'
            ? {
                borderTop: 'var(--border-width-thin) solid var(--color-border)',
                borderRight: 'none',
                borderBottom: 'none',
                borderLeft: 'none',
              }
            : tabPosition === 'bottom'
              ? {
                  borderBottom: 'var(--border-width-thin) solid var(--color-border)',
                  borderTop: 'none',
                  borderRight: 'none',
                  borderLeft: 'none',
                }
              : tabPosition === 'left'
                ? {
                    borderLeft: 'var(--border-width-thin) solid var(--color-border)',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderBottom: 'none',
                  }
                : {
                    borderRight: 'var(--border-width-thin) solid var(--color-border)',
                    borderTop: 'none',
                    borderBottom: 'none',
                    borderLeft: 'none',
                  }),
        backgroundColor: 'var(--color-surface)',
      },
    },

    tabPanelProps: {
      role: 'tabpanel',
      'aria-labelledby': `tab-${activeKey}`,
      id: `tabpanel-${activeKey}`,
      style: {
        outline: 'none',
      },
    },
  };
}
