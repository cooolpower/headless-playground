import React, { forwardRef } from 'react';
import { EmptyProps } from './type-empty';
import { emptyCss as _emptyCss } from './empty.styles';

export const EmptyCss = _emptyCss;

const DefaultImage = () => (
  <svg
    width="64"
    height="41"
    viewBox="0 0 64 41"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(0 1)" fill="none" fillRule="evenodd">
      <ellipse fill="var(--color-surface)" cx="32" cy="33" rx="32" ry="7" />
      <g fillRule="nonzero" stroke="var(--color-border)">
        <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" />
        <path
          d="M41.613 15.931c0-1.605.994-2.93 2.227-2.93h1.78c1.232 0 2.227 1.325 2.227 2.93 0 1.605-1.995 2.93-2.227 2.93h-1.78c-1.232 0-2.227-1.325-2.227-2.93zM42.26 35.817c0-1.605.994-2.93 2.227-2.93h1.78c1.232 0 2.227 1.325 2.227 2.93 0 1.605-1.995 2.93-2.227 2.93h-1.78c-1.232 0-2.227-1.325-2.227-2.93zM20.61 35.817c0-1.605.994-2.93 2.227-2.93h1.78c1.232 0 2.227 1.325 2.227 2.93 0 1.605-1.995 2.93-2.227 2.93h-1.78c-1.232 0-2.227-1.325-2.227-2.93zM19.963 15.931c0-1.605.994-2.93 2.227-2.93h1.78c1.232 0 2.227 1.325 2.227 2.93 0 1.605-1.995 2.93-2.227 2.93h-1.78c-1.232 0-2.227-1.325-2.227-2.93z"
          fill="var(--color-surface-hover)"
        />
      </g>
    </g>
  </svg>
);

export const Empty = forwardRef<HTMLDivElement, EmptyProps>(
  (
    {
      image = <DefaultImage />,
      description = '데이터가 없습니다',
      children,
      imageStyle,
      className,
      injectStyles = true,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={['hcEmpty', className].filter(Boolean).join(' ')} {...props}>
        {injectStyles && <style suppressHydrationWarning>{_emptyCss}</style>}
        <div className="hcEmptyImage" style={imageStyle}>
          {image}
        </div>

        {description && <div className="hcEmptyDesc">{description}</div>}

        {children && <div className="hcEmptyFooter">{children}</div>}
      </div>
    );
  }
);

Empty.displayName = 'Empty';
