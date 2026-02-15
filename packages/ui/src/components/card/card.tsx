'use client';

// components/headless/card/card.tsx
import type { ReactNode, CSSProperties } from 'react';
import { useCard, type UseCardProps } from './use-card';
import { cardCss as _cardCss } from './card.styles';

export interface CardProps extends UseCardProps {
  children: ReactNode;
  /** 기본 스타일(CSS) 주입 여부 */
  injectStyles?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function Card({ className, style, ...props }: CardProps) {
  const { injectStyles = true, disabled, onClick } = props;
  const card = useCard(props);
  return (
    <div
      {...card}
      className={['hcCard', className].filter(Boolean).join(' ')}
      data-clickable={onClick ? 'true' : 'false'}
      data-disabled={disabled ? 'true' : 'false'}
      style={{
        ...card.style,
        ...style,
      }}
    >
      {injectStyles && <style suppressHydrationWarning>{_cardCss}</style>}
      {props.children}
    </div>
  );
}

export interface CardSubComponentProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function CardHeader({ children, className, style }: CardSubComponentProps) {
  return (
    <div className={['hcCardHeader', className].filter(Boolean).join(' ')} style={style}>
      {children}
    </div>
  );
}

export function CardContent({ children, className, style }: CardSubComponentProps) {
  return (
    <div className={['hcCardContent', className].filter(Boolean).join(' ')} style={style}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, style }: CardSubComponentProps) {
  return (
    <div className={['hcCardFooter', className].filter(Boolean).join(' ')} style={style}>
      {children}
    </div>
  );
}

export const CardCss = _cardCss;
