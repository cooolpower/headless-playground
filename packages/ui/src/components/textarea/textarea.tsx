'use client';

// components/headless/textarea/textarea.tsx
import React, { forwardRef, useCallback } from 'react';
import { X } from 'lucide-react';
import { Icon } from '../icon/icon';
import { useTextarea } from './use-textarea';
import { TextareaProps } from './type-textarea';
import { textareaCss as _textareaCss } from './textarea.styles';
import { cx } from '../../utils';
import { useStyles } from '../../hooks/use-styles';

export const TextareaCss = _textareaCss;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const { textareaProps, wrapperProps, clearButtonProps, textareaRef } =
      useTextarea(props);

    const {
      className,
      clearButtonClassName,
      disabled,
      textareaStyle,
      resize,
      autoResize,
      injectStyles = true,
      size = 'medium',
    } = props;

    // ref 병합: 외부 ref와 내부 ref를 모두 지원
    const mergedRef = useCallback(
      (node: HTMLTextAreaElement | null) => {
        textareaRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref, textareaRef],
    );

    // useStyles 훅을 통해 테마 및 컴포넌트 스타일 주입
    useStyles('hc-textarea-styles', _textareaCss, injectStyles);

    return (
      <div
        {...wrapperProps}
        className={cx('hcTextareaWrap', className)}
        data-disabled={disabled ? 'true' : undefined}
      >
        <textarea
          ref={mergedRef}
          {...(textareaProps as any)}
          className={cx('hcTextarea', textareaProps.className)}
          data-size={size}
          data-disabled={disabled ? 'true' : 'false'}
          style={{
            ...textareaProps.style,
            ...(textareaStyle || {}),
            // resize는 항상 props에서 가져온 값으로 설정 (textareaStyle에 의해 덮어씌워지지 않도록)
            // autoResize가 활성화되면 resize는 'none'으로 설정됨
            resize: autoResize ? 'none' : resize || 'vertical',
          }}
        />

        {clearButtonProps && (
          <button
            {...clearButtonProps}
            type="button"
            className={cx('hcTextareaClear', clearButtonClassName)}
            aria-label="텍스트 영역 지우기"
          >
            <Icon icon={X} size="small" />
          </button>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
