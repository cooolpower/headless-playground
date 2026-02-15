'use client';

// components/headless/ellipsis/use-ellipsis.ts
export interface UseEllipsisProps {
  lines?: number;
  className?: string;
  injectStyles?: boolean;
}

export function useEllipsis({ lines = 1, className }: UseEllipsisProps) {
  const isSingleLine = lines <= 1;

  return {
    className: [
      isSingleLine ? 'hcEllipsisSingle' : 'hcEllipsisMulti',
      className,
    ]
      .filter(Boolean)
      .join(' '),
    style: isSingleLine
      ? undefined
      : ({
          WebkitLineClamp: lines,
        } as any),
  };
}
