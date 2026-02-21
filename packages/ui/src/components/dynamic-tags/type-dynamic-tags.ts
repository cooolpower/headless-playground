import { ReactNode } from 'react';

export interface DynamicTagsProps {
  /** 제어된 값 */
  value?: string[];
  /** 기본값 */
  defaultValue?: string[];
  /** 값 변경 핸들러 */
  onChange?: (value: string[]) => void;
  /** 최대 태그 개수 */
  max?: number;
  /** 태그 생성 핸들러 */
  onCreate?: (tag: string) => void | boolean | Promise<void | boolean>;
  /** 태그 제거 핸들러 */
  onRemove?: (tag: string, index: number) => void | boolean | Promise<void | boolean>;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 기본 스타일 주입 여부 */
  injectStyles?: boolean;
  /** 내부 요소들에 적용할 클래스명 */
  classNames?: {
    dynamicTags?: string;
    tag?: string;
    tagInput?: string;
    addButton?: string;
  };
  /** 커스텀 렌더 함수 */
  renderTag?: (tag: string, index: number) => ReactNode;
  /** 입력 필드 플레이스홀더 */
  placeholder?: string;
  /** 입력 필드 크기 */
  size?: 'custom' | 'small' | 'medium' | 'large';
  /** 루트 요소 스타일 */
  style?: React.CSSProperties;
  /** 내부 요소별 스타일 */
  styles?: {
    container?: React.CSSProperties;
    tag?: React.CSSProperties;
    tagInput?: React.CSSProperties;
    addButton?: React.CSSProperties;
  };
}
