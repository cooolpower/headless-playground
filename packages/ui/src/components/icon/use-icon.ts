'use client';

// components/headless/icon/use-icon.ts
export interface UseIconProps {
  size?: 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge';
  className?: string;
}

export function useIcon({ size = 'medium', className }: UseIconProps) {
  return {
    'data-size': size,
    className,
  };
}
