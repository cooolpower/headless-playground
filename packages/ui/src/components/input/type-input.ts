import { UseInputProps } from './use-input';

export interface InputProps extends UseInputProps {
  injectStyles?: boolean;
  className?: string;
  /** Input 요소에 직접 적용할 className */
  inputClassName?: string;
  /** Input 요소에 직접 적용할 style */
  inputStyle?: React.CSSProperties;
  /** Clear 버튼에 적용할 className */
  clearButtonClassName?: string;
  /** Password toggle 버튼에 적용할 className */
  passwordToggleClassName?: string;
  style?: React.CSSProperties;
}
