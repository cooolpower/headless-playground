import type { ReactNode } from 'react';

/** Class names for Timeline component internal elements */
export interface TimelineClassNames {
  timeline?: string;
  item?: string;
  itemTail?: string;
  itemHead?: string;
  dot?: string;
  itemContent?: string;
  itemLabel?: string;
  itemDescription?: string;
}

export interface TimelineProps {
  items?: TimelineItem[];
  mode?: TimelineMode;
  pending?: boolean | ReactNode;
  pendingDot?: ReactNode;
  reverse?: boolean;
  className?: string;
  classNames?: TimelineClassNames;
  children?: ReactNode;
  injectStyles?: boolean;
}

export interface TimelineItem {
  key?: string | number;
  color?: TimelineItemColor;
  dot?: ReactNode;
  label?: ReactNode;
  children?: ReactNode;
  position?: 'left' | 'right';
}

export type TimelineMode = 'left' | 'alternate' | 'right';

export type TimelineItemColor = 'blue' | 'red' | 'green' | 'gray';

export interface TimelineItemProps extends TimelineItem {
  isLast?: boolean;
  className?: string;
  classNames?: TimelineClassNames;
  children?: ReactNode;
  injectStyles?: boolean;
}
