import type { ReactNode } from 'react';
export interface heatmapProps {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  disabled?: boolean;
  className?: string;
  injectStyles?: boolean;
  children?: ReactNode;
}

export interface UseheatmapProps {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  disabled?: boolean;
  children?: ReactNode;
}

export interface UseheatmapReturn {
  currentValue: any;
  handleChange: (value: any) => void;
}
