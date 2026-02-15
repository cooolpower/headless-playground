import { UseImageProps } from './use-image';

export interface ImageProps extends UseImageProps {
  /** 기본 스타일(CSS) 주입 여부 */
  injectStyles?: boolean;
  className?: string;
  /** 로딩 중일 때 플레이스홀더에 표시할 기본 텍스트 */
  placeholderText?: string;
  /** 로딩 실패 시 표시할 기본 텍스트 */
  fallbackText?: string;
  /** 프리뷰 오버레이에 닫기 버튼을 표시할지 여부 */
  previewCloseButton?: boolean;
}
