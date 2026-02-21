import { useEffect } from 'react';
import { injectTheme, injectComponentStyles, removeStyles, removeTheme } from '../utils/style-injector';

/**
 * 컴포넌트 본연의 스타일과 배포용 기본 테마(CSS 변수)를 함께 주입하는 훅입니다.
 * @param id 스타일 엘리먼트의 고유 ID
 * @param css 주입할 CSS 문자열
 * @param injectStyles 주입 여부 (기본값: true)
 */
export function useStyles(id: string, css: string, injectStyles: boolean = true) {
  useEffect(() => {
    if (injectStyles) {
      // 1. 기본 테마 변수 주입 (중복 방지 로직 포함)
      injectTheme();
      // 2. 컴포넌트 개별 스타일 주입
      injectComponentStyles(id, css);
    }

    return () => {
      // Unmount 시 혹은 injectStyles가 false가 될 시 주입된 스타일 정리
      if (injectStyles) {
        removeTheme();
        removeStyles(id);
      }
    };
  }, [id, css, injectStyles]);
}
