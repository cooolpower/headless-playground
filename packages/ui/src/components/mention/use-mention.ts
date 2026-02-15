'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { UsementionProps, UsementionReturn, MentionOption } from './type-mention';

export function usemention({
  value,
  defaultValue = '',
  onChange,
  options = [],
  onSearch,
  disabled = false,
  prefix = '@',
  separator = ' ',
  getMention = (option) => `${prefix}${option.value}`,
}: UsementionProps): UsementionReturn {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mentionStart, setMentionStart] = useState(-1);
  const [mentionEnd, setMentionEnd] = useState(-1);
  const [remoteOptions, setRemoteOptions] = useState<MentionOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  // 현재 입력값에서 멘션 부분 추출
  const getMentionQuery = useCallback(
    (text: string, cursorPos: number): string => {
      const beforeCursor = text.substring(0, cursorPos);
      const mentionMatch = beforeCursor.match(
        new RegExp(`${prefix}([^${separator}]*)$`)
      );
      return mentionMatch ? mentionMatch[1] : '';
    },
    [prefix, separator]
  );

  // 필터링된 옵션 계산
  const filteredOptions = (onSearch ? remoteOptions : options).filter((option) => {
    if (mentionStart === -1) return false;
    const query = getMentionQuery(currentValue, mentionEnd);
    if (onSearch) {
      // onSearch를 사용하는 경우 모든 원격 옵션을 표시 (이미 필터링됨)
      return true;
    }
    return (
      option.label.toLowerCase().includes(query.toLowerCase()) ||
      option.value.toLowerCase().includes(query.toLowerCase())
    );
  });

  // 멘션 추출 함수
  const extractMentions = useCallback(
    (text: string): Array<{ start: number; end: number; value: string }> => {
      const mentions: Array<{ start: number; end: number; value: string }> = [];
      const regex = new RegExp(`${prefix}([^${separator}\\n]+)`, 'g');
      let match;

      while ((match = regex.exec(text)) !== null) {
        const mentionValue = match[1];
        // 옵션에 존재하는 멘션인지 확인
        const option = options.find(
          (opt) => opt.value === mentionValue || opt.label === mentionValue
        );
        if (option) {
          mentions.push({
            start: match.index,
            end: match.index + match[0].length,
            value: mentionValue,
          });
        }
      }

      return mentions;
    },
    [prefix, separator, options]
  );

  // 입력 변경 핸들러
  const handleInputChange = useCallback(
    (newValue: string, event?: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (disabled) return;

      // event가 있으면 event.target에서 cursorPos를 가져오고, 없으면 newValue.length 사용
      const cursorPos =
        (event?.target as HTMLTextAreaElement)?.selectionStart || newValue.length;
      const beforeCursor = newValue.substring(0, cursorPos);
      const mentionMatch = beforeCursor.match(
        new RegExp(`${prefix}([^${separator}]*)$`)
      );

      if (mentionMatch) {
        const start = cursorPos - mentionMatch[0].length;
        setMentionStart(start);
        setMentionEnd(cursorPos);
        setShowDropdown(true);
        setSelectedIndex(0);

        // onSearch가 있으면 비동기 검색 수행
        if (onSearch) {
          const query = mentionMatch[1];
          // 이전 검색 취소
          if (abortControllerRef.current) {
            abortControllerRef.current.abort();
          }
          // 이전 타이머 취소
          if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
          }
          // 디바운싱
          searchTimeoutRef.current = setTimeout(async () => {
            setIsLoading(true);
            abortControllerRef.current = new AbortController();
            try {
              const results = await onSearch(query);
              if (!abortControllerRef.current.signal.aborted) {
                setRemoteOptions(Array.isArray(results) ? results : []);
                setIsLoading(false);
              }
            } catch (error) {
              if (!abortControllerRef.current.signal.aborted) {
                console.error('Search error:', error);
                setRemoteOptions([]);
                setIsLoading(false);
              }
            }
          }, 300);
        }
      } else {
        setShowDropdown(false);
        setMentionStart(-1);
        setMentionEnd(-1);
        if (onSearch) {
          setRemoteOptions([]);
          setIsLoading(false);
        }
      }

      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [disabled, isControlled, onChange, prefix, separator, getMentionQuery]
  );

  // 옵션 선택 핸들러
  const handleOptionSelect = useCallback(
    (option: MentionOption) => {
      if (disabled || mentionStart === -1) return;

      const beforeMention = currentValue.substring(0, mentionStart);
      const afterMention = currentValue.substring(mentionEnd);
      const mentionText = getMention(option);
      const newValue = beforeMention + mentionText + separator + afterMention;

      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);

      setShowDropdown(false);
      setMentionStart(-1);
      setMentionEnd(-1);
      setSelectedIndex(0);
    },
    [
      disabled,
      isControlled,
      onChange,
      currentValue,
      mentionStart,
      mentionEnd,
      getMention,
      separator,
    ]
  );

  // 키보드 이벤트 핸들러
  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!showDropdown || filteredOptions.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
      } else if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        if (filteredOptions[selectedIndex]) {
          handleOptionSelect(filteredOptions[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        setShowDropdown(false);
        setMentionStart(-1);
        setMentionEnd(-1);
      }
    },
    [showDropdown, filteredOptions, selectedIndex, handleOptionSelect]
  );

  const handleInputFocus = useCallback(
    (event?: React.FocusEvent<HTMLTextAreaElement>) => {
      if (disabled) return;
      const cursorPos =
        (event?.target as HTMLTextAreaElement)?.selectionStart ||
        currentValue.length;
      const query = getMentionQuery(currentValue, cursorPos);
      if (query !== '') {
        const beforeCursor = currentValue.substring(0, cursorPos);
        const mentionMatch = beforeCursor.match(
          new RegExp(`${prefix}([^${separator}]*)$`)
        );
        if (mentionMatch) {
          const start = cursorPos - mentionMatch[0].length;
          setMentionStart(start);
          setMentionEnd(cursorPos);
          setShowDropdown(true);
        }
      }
    },
    [disabled, currentValue, prefix, separator, getMentionQuery]
  );

  const handleInputBlur = useCallback(() => {
    // 약간의 지연을 두어 클릭 이벤트가 먼저 처리되도록 함
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  }, []);


  const mentions = extractMentions(currentValue);

  // 클린업
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    currentValue,
    inputValue: currentValue,
    showDropdown,
    filteredOptions,
    selectedIndex,
    isLoading,
    handleInputChange,
    handleInputKeyDown,
    handleOptionSelect,
    handleInputFocus,
    handleInputBlur,
    mentionStart,
    mentionEnd,
    mentions,
  };
}
