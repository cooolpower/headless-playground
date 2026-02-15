'use client';

// components/headless/page-header/page-header.tsx
import type { ReactNode } from 'react';
import { usePageHeader, type UsePageHeaderProps } from './use-page-header';
import { pageHeaderCss as _pageHeaderCss } from './page-header.styles';

export const PageHeaderCss = _pageHeaderCss;

export function PageHeader(props: UsePageHeaderProps) {
  const { injectStyles = true } = props;
  const pageHeader = usePageHeader(props);
  return (
    <div {...pageHeader.containerProps}>
      {injectStyles && (
        <style suppressHydrationWarning>{_pageHeaderCss}</style>
      )}
      <div {...pageHeader.titleProps}>{props.title}</div>
      {props.subtitle && (
        <div {...pageHeader.subtitleProps}>{props.subtitle}</div>
      )}
      {props.extra && <div {...pageHeader.extraProps}>{props.extra}</div>}
    </div>
  );
}
