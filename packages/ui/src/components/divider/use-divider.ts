'use client';

// components/headless/divider/use-divider.ts
export interface UseDividerProps {
  orientation?: 'horizontal' | 'vertical';
  /** 기본 스타일(CSS) 주입 여부 */
  injectStyles?: boolean;
  className?: string;
}

export function useDivider({ orientation = 'horizontal' }: UseDividerProps) {
  return {
    role: 'separator',
    'aria-orientation': orientation,
    'data-orientation': orientation,
  };
}
