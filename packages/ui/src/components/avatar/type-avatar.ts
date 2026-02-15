import type { ReactNode } from 'react';

export interface UseAvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'small' | 'medium' | 'large';
  name?: string; // for generating fallback initials
  /** 기본 스타일(CSS) 주입 여부 */
  injectStyles?: boolean;
  className?: string;
  children?: ReactNode;
}
