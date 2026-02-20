export interface UseButtonProps {
  disabled?: boolean;
  type?: 'default' | 'primary' | 'secondary' | 'tertiary' | 'dashed' | 'quaternary';
  color?: 'default' | 'info' | 'success' | 'warning' | 'error';
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'huge';
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  injectStyles?: boolean;
  showProgress?: boolean;
}
