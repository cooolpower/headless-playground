import type { ReactNode } from 'react';
export interface DialogProps {
  children?: ReactNode;
  title?: ReactNode;
  content?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  width?: number | string;
  height?: number | string;
  centered?: boolean;
  closable?: boolean;
  maskClosable?: boolean;
  destroyOnClose?: boolean;
  footer?: ReactNode | null;
  okText?: string;
  cancelText?: string;
  onOk?: (e: React.MouseEvent) => void;
  onCancel?: (e: React.MouseEvent) => void;
  confirmLoading?: boolean;
  className?: string;
  injectStyles?: boolean;
  ref?: React.RefObject<HTMLDivElement>;
}

export interface UseDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  maskClosable?: boolean;
}

export interface UseDialogReturn {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleMaskClick: (e: React.MouseEvent) => void;
}
