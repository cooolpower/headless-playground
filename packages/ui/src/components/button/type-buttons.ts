export interface UseButtonProps {
  disabled?: boolean;
  type?: 'primary' | 'secondary' | 'tertiary' | 'dashed' | 'quaternary';
  color?: 'info' | 'success' | 'warning' | 'error';
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'huge';
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  injectStyles?: boolean;
}
