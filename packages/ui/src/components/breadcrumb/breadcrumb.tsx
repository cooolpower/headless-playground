'use client';

// components/headless/breadcrumb/breadcrumb.tsx
import { useBreadcrumb, type BreadcrumbItem } from './use-breadcrumb';
import { BreadcrumbProps } from './type-breadcrumb';
import { breadcrumbCss as _breadcrumbCss } from './breadcrumb.styles';
import { useStyles } from '../../hooks/use-styles';

export const BreadcrumbCss = _breadcrumbCss;

export function Breadcrumb(props: BreadcrumbProps) {
  const {
    displayItems,
    separator,
    containerProps,
    getItemProps,
    separatorProps,
  } = useBreadcrumb(props);

  const { className, injectStyles = true } = props;

  // useStyles 훅을 통해 테마 및 컴포넌트 스타일 주입
  useStyles('hc-breadcrumb-styles', _breadcrumbCss, injectStyles);

  return (
    <nav
      className={['hcBreadcrumbNav', className].filter(Boolean).join(' ')}
      aria-label="Breadcrumb"
    >
      <ol {...containerProps} className={containerProps.className}>
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;

          return (
            <li key={index} className="hcBreadcrumbLi">
              <span {...getItemProps(item, index, isLast)}>
                {'icon' in item && item.icon && (
                  <span className="hcBreadcrumbIcon">{item.icon}</span>
                )}
                {item.title}
              </span>

              {!isLast && (
                <span {...separatorProps} className={separatorProps.className}>
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
