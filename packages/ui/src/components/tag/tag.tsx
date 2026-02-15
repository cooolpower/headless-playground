'use client';

// components/headless/tag/tag.tsx
import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { Icon } from '../icon/icon';
import { useTag, type UseTagProps } from './use-tag';
import { tagCss as _tagCss } from './tag.styles';

export const TagCss = _tagCss;

function injectTagStyles() {
  if (document.getElementById('hc-tag-style')) return;

  const style = document.createElement('style');
  style.id = 'hc-tag-style';
  style.innerHTML = _tagCss;
  document.head.appendChild(style);
}

export function Tag(props: UseTagProps & { children: ReactNode }) {
  const { closable, onClose, disabled, injectStyles = true, className } = props;
  const tag = useTag(props);
  useEffect(() => {
    if (injectStyles) injectTagStyles();
  }, [injectStyles]);

  return (
    <>
      {/* {injectStyles && <style suppressHydrationWarning>{_tagCss}</style>} */}
      <span
        {...tag}
        className={['hcTag', className, tag.className]
          .filter(Boolean)
          .join(' ')}
      >
        {props.children}
        {closable && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (!disabled && onClose) {
                onClose();
              }
            }}
            disabled={disabled}
            className="hcTagClose"
            aria-label="태그 제거"
          >
            <Icon icon={X} size="small" />
          </button>
        )}
      </span>
    </>
  );
}
