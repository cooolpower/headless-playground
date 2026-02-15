'use client';

// components/headless/typography/use-typography.ts
export interface UseTypographyProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: 'title' | 'text' | 'paragraph' | 'caption';
  className?: string;
  /** 기본 스타일(CSS) 주입 여부 */
  injectStyles?: boolean;
}

export function useTypography({
  level = 1,
  variant = 'text',
}: UseTypographyProps) {
  return {
    className:
      variant === 'title'
        ? 'hcTypography hcTitle'
        : variant === 'paragraph'
          ? 'hcTypography hcParagraph'
          : variant === 'caption'
            ? 'hcTypography hcCaption'
            : 'hcTypography hcText',
    'data-level': variant === 'title' ? String(level) : undefined,
  };
}
