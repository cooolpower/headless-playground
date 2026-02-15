'use client';

// components/headless/breadcrumb/use-breadcrumb.ts

export interface BreadcrumbItem {
  title: React.ReactNode;
  href?: string;
  onClick?: (event: React.MouseEvent) => void;
  icon?: React.ReactNode;
}

export interface UseBreadcrumbProps {
  items?: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxCount?: number;
  size?: 'small' | 'medium' | 'large';
  onItemClick?: (item: BreadcrumbItem, index: number) => void;
}

export function useBreadcrumb({
  items = [],
  separator = '/',
  maxCount,
  size = 'medium',
  onItemClick,
}: UseBreadcrumbProps) {
  // maxCount가 설정된 경우 아이템들을 제한
  const displayItems =
    maxCount && items.length > maxCount
      ? [
          items[0],
          { title: '...', disabled: true },
          ...items.slice(-maxCount + 2),
        ]
      : items;

  return {
    displayItems,
    separator,

    containerProps: {
      className: 'hcBreadcrumbList',
      'data-size': size,
    },

    getItemProps: (item: BreadcrumbItem, index: number, isLast: boolean) => ({
      className: 'hcBreadcrumbItem',
      'data-current': isLast ? 'true' : 'false',
      'data-disabled':
        !isLast && 'disabled' in (item as any) && (item as any).disabled
          ? 'true'
          : 'false',
      'data-clickable':
        !isLast && (item.href || item.onClick) && !('disabled' in (item as any) && (item as any).disabled)
          ? 'true'
          : 'false',
      onClick: (event: React.MouseEvent) => {
        if (
          !isLast &&
          (item.href || item.onClick) &&
          !('disabled' in (item as any) && (item as any).disabled)
        ) {
          item.onClick?.(event);
          onItemClick?.(item, index);
        }
      },
      role: isLast ? 'text' : 'link',
      'aria-current': isLast ? ('page' as const) : undefined,
    }),

    separatorProps: {
      className: 'hcBreadcrumbSep',
      'aria-hidden': true,
    },
  };
}
