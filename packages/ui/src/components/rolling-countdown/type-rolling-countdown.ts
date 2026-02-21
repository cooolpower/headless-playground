import { CountdownProps } from '../countdown/type-countdown';

export interface RollingCountdownProps extends CountdownProps {
  /**
   * 숫자가 롤링되는 방향
   * @default 'up'
   */
  direction?: 'up' | 'down';

  /**
   * 각 자릿수의 크기 (반응형 대응 가능)
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
