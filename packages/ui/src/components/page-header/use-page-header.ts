'use client';

// components/headless/page-header/use-page-header.ts
import type { ReactNode } from 'react';

export interface UsePageHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  extra?: ReactNode;
  className?: string;
  injectStyles?: boolean;
}

export function usePageHeader({ className }: UsePageHeaderProps) {
  return {
    containerProps: {
      className: ['hcPageHeader', className].filter(Boolean).join(' '),
    },

    titleProps: {
      className: 'hcPageHeaderTitle',
    },

    subtitleProps: {
      className: 'hcPageHeaderSubtitle',
    },

    extraProps: {
      className: 'hcPageHeaderExtra',
    },
  };
}
