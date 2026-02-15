'use client';

// components/headless/breadcrumb/breadcrumb.tsx
import { useBreadcrumb, type BreadcrumbItem } from './use-breadcrumb';
import { BreadcrumbProps } from './type-breadcrumb';
import { breadcrumbCss as _breadcrumbCss } from './breadcrumb.styles';

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

  return (
    <nav
      className={['hcBreadcrumbNav', className].filter(Boolean).join(' ')}
      aria-label="Breadcrumb"
    >
      {injectStyles && <style suppressHydrationWarning>{_breadcrumbCss}</style>}
      <ol
        {...containerProps}
        className={containerProps.className}
      >
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
