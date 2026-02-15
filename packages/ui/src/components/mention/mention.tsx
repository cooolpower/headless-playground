'use client';

import React, { forwardRef, useRef, useEffect, useMemo } from 'react';
import { mentionProps } from './type-mention';
import { usemention } from './use-mention';
import { mentionCss as _mentionCss } from './mention.styles';

export const MentionCss = _mentionCss;

export const Mention = forwardRef<HTMLDivElement, mentionProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      options = [],
      onSearch,
      disabled = false,
      placeholder = 'Type @ to mention',
      prefix = '@',
      separator = ' ',
      getMention,
      empty,
      className,
      inputWrapperClassName,
      inputClassName,
      dropdownClassName,
      optionClassName,
      injectStyles = true,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const {
      inputValue,
      showDropdown,
      filteredOptions,
      selectedIndex,
      isLoading,
      handleInputChange,
      handleInputKeyDown,
      handleOptionSelect,
      handleInputFocus,
      handleInputBlur,
      mentions,
    } = usemention({
      value,
      defaultValue,
      onChange,
      options,
      onSearch,
      disabled,
      prefix,
      separator,
      getMention,
    });

    // 외부 ref와 내부 ref 병합
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(containerRef.current);
        } else {
          ref.current = containerRef.current;
        }
      }
    }, [ref]);

    // 하이라이트 레이어 ref
    const highlightRef = useRef<HTMLDivElement>(null);

    // 스크롤 동기화
    useEffect(() => {
      const textarea = textareaRef.current;
      const highlight = highlightRef.current;
      if (textarea && highlight) {
        const syncScroll = () => {
          highlight.scrollTop = textarea.scrollTop;
          highlight.scrollLeft = textarea.scrollLeft;
        };
        textarea.addEventListener('scroll', syncScroll);
        return () => textarea.removeEventListener('scroll', syncScroll);
      }
    }, []);

    // 하이라이트된 텍스트 렌더링
    const renderHighlightedText = useMemo(() => {
      if (mentions.length === 0) {
        return inputValue;
      }

      const parts: Array<{ text: string; isMention: boolean }> = [];
      let lastIndex = 0;

      mentions.forEach((mention) => {
        if (mention.start > lastIndex) {
          parts.push({
            text: inputValue.substring(lastIndex, mention.start),
            isMention: false,
          });
        }
        parts.push({
          text: inputValue.substring(mention.start, mention.end),
          isMention: true,
        });
        lastIndex = mention.end;
      });

      if (lastIndex < inputValue.length) {
        parts.push({
          text: inputValue.substring(lastIndex),
          isMention: false,
        });
      }

      return parts;
    }, [inputValue, mentions]);

    return (
      <div
        ref={containerRef}
        className={['hcMention', className].filter(Boolean).join(' ')}
        data-disabled={disabled ? 'true' : 'false'}
        {...props}
      >
        {injectStyles && <style suppressHydrationWarning>{_mentionCss}</style>}
        <div className={['hcMentionInputWrap', inputWrapperClassName].filter(Boolean).join(' ')}>
          {/* 하이라이트 레이어 */}
          <div
            ref={highlightRef}
            className="hcMentionHighlight"
          >
            {Array.isArray(renderHighlightedText)
              ? renderHighlightedText.map((part, index) =>
                  part.isMention ? (
                    <span
                      key={index}
                      className="hcMentionHighlightMention"
                    >
                      {part.text}
                    </span>
                  ) : (
                    <span key={index} className="hcMentionHighlightText">
                      {part.text}
                    </span>
                  )
                )
              : null}
          </div>
          {/* 실제 textarea */}
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value, e)}
            onKeyDown={handleInputKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            disabled={disabled}
            placeholder={placeholder}
            className={['hcMentionTextarea', inputClassName].filter(Boolean).join(' ')}
          />
          {showDropdown && (filteredOptions.length > 0 || isLoading) && (
            <div
              className={['hcMentionDropdown', dropdownClassName]
                .filter(Boolean)
                .join(' ')}
            >
              {isLoading ? (
                <div className="hcMentionStatus">
                  로딩 중...
                </div>
              ) : (
                filteredOptions.map((option, index) => (
                  <div
                    key={option.value}
                    onClick={() => handleOptionSelect(option)}
                    className={['hcMentionOption', optionClassName]
                      .filter(Boolean)
                      .join(' ')}
                    data-selected={index === selectedIndex ? 'true' : 'false'}
                  >
                    {option.label}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Mention.displayName = 'Mention';
