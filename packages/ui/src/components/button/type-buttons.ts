export interface UseButtonProps {
  disabled?: boolean;
  type?: string;
  color?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  injectStyles?: boolean;
}
