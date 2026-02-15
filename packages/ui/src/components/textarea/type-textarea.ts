import { UseTextareaProps } from './use-textarea';

export interface TextareaProps extends UseTextareaProps {
  /** 기본 스타일(CSS) 주입 여부 */
  injectStyles?: boolean;
  className?: string;
  /** Textarea 요소에 직접 적용할 className */
  textareaClassName?: string;
  /** Textarea 요소에 직접 적용할 style */
  textareaStyle?: React.CSSProperties;
  /** Clear 버튼에 적용할 className */
  clearButtonClassName?: string;
  style?: React.CSSProperties;
}
