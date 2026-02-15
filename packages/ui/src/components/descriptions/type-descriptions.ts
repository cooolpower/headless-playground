import type { ReactNode } from 'react';
export interface DescriptionsProps {
  title?: ReactNode;
  items?: DescriptionsItem[];
  column?:
    | number
    | {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        xxl?: number;
      };
  size?: 'small' | 'medium' | 'large';
  bordered?: boolean;
  layout?: 'horizontal' | 'vertical';
  colon?: boolean;
  className?: string;
  children?: ReactNode;
  injectStyles?: boolean;
}

export interface DescriptionsItem {
  key?: string | number;
  label: ReactNode;
  children: ReactNode;
  span?: number;
}

export interface DescriptionsItemProps extends DescriptionsItem {
  className?: string;
}
