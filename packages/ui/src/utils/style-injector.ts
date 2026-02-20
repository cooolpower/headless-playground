import { defaultThemeCss } from '../styles/theme.styles';

const THEME_ID = 'hc-core-theme';
const refCounts = new Map<string, number>();

export function injectTheme() {
  injectStyle(THEME_ID, defaultThemeCss);
}

export function removeTheme() {
  removeStyle(THEME_ID);
}

export function injectComponentStyles(id: string, css: string) {
  injectStyle(id, css);
}

export function removeStyles(id: string) {
  removeStyle(id);
}

/**
 * 전역 참조 횟수를 관리하며 스타일을 주입합니다.
 */
function injectStyle(id: string, css: string) {
  if (typeof document === 'undefined') return;

  const count = refCounts.get(id) || 0;
  refCounts.set(id, count + 1);

  if (document.getElementById(id)) return;

  const styleElement = document.createElement('style');
  styleElement.id = id;
  styleElement.textContent = css;
  document.head.appendChild(styleElement);
}

/**
 * 참조 횟수를 감소시키고, 0이 되면 스타일을 제거합니다.
 */
function removeStyle(id: string) {
  if (typeof document === 'undefined') return;

  const count = refCounts.get(id) || 0;
  if (count <= 1) {
    refCounts.delete(id);
    const element = document.getElementById(id);
    if (element) {
      element.remove();
    }
  } else {
    refCounts.set(id, count - 1);
  }
}
