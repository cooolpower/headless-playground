import type { ReactNode } from 'react';
export interface CollapseProps {
  children: ReactNode;
  accordion?: boolean;
  activeKey?: string | string[];
  defaultActiveKey?: string | string[];
  onChange?: (activeKey: string | string[]) => void;
  destroyInactivePanel?: boolean;
  expandIcon?: (panelProps: { isActive: boolean }) => ReactNode;
  expandIconPosition?: 'left' | 'right';
  className?: string;
  injectStyles?: boolean;
}

export interface CollapsePanelProps {
  key?: string;
  header: ReactNode;
  children?: ReactNode;
  disabled?: boolean;
  showArrow?: boolean;
  extra?: ReactNode;
  className?: string;
  injectStyles?: boolean;
  // Additional props passed by Collapse component
  isActive?: boolean;
  onChange?: (isActive: boolean) => void;
  destroyInactivePanel?: boolean;
  expandIcon?: (panelProps: { isActive: boolean }) => ReactNode;
  expandIconPosition?: 'left' | 'right';
}

export interface UseCollapseProps {
  accordion?: boolean;
  activeKey?: string | string[];
  defaultActiveKey?: string | string[];
  onChange?: (activeKey: string | string[]) => void;
}

export interface UseCollapseReturn {
  activeKeys: string[];
  onPanelChange: (key: string, isActive: boolean) => void;
  isActive: (key: string) => boolean;
}
