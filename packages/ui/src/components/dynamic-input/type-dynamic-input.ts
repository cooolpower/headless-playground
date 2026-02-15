import { ReactNode } from 'react';

export interface DynamicInputProps {
  /** 제어된 값 */
  value?: string[];
  /** 기본값 */
  defaultValue?: string[];
  /** 값 변경 핸들러 */
  onChange?: (value: string[]) => void;
  /** 최소 입력 필드 개수 */
  min?: number;
  /** 최대 입력 필드 개수 */
  max?: number;
  /** 입력 필드 생성 핸들러 */
  onCreate?: () => void | boolean | Promise<void | boolean>;
  /** 입력 필드 제거 핸들러 */
  onRemove?: (index: number) => void | boolean | Promise<void | boolean>;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 기본 스타일 주입 여부 */
  injectStyles?: boolean;
  /** 내부 요소들에 적용할 클래스명 */
  classNames?: {
    dynamicInput?: string;
    inputItem?: string;
    input?: string;
    removeButton?: string;
    addButton?: string;
  };
  /** 커스텀 렌더 함수 */
  renderInput?: (value: string, index: number, onChange: (value: string) => void) => ReactNode;
  /** 입력 필드 플레이스홀더 */
  placeholder?: string | ((index: number) => string);
  /** 입력 필드 크기 */
  size?: 'small' | 'medium' | 'large';
}
