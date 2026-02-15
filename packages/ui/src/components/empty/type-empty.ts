import type { ReactNode } from 'react';
export interface EmptyProps {
  image?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  imageStyle?: React.CSSProperties;
  /** 기본 스타일(CSS) 주입 여부 */
  injectStyles?: boolean;
  className?: string;
}

export interface EmptyImageProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface EmptyDescriptionProps {
  className?: string;
}
