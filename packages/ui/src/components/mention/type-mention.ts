import type { ReactNode } from 'react';

export interface MentionOption {
  label: string;
  value: string;
  [key: string]: any;
}

export interface mentionProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options?: MentionOption[];
  onSearch?: (query: string) => Promise<MentionOption[]> | MentionOption[];
  disabled?: boolean;
  placeholder?: string;
  prefix?: string;
  separator?: string;
  getMention?: (option: MentionOption) => string;
  empty?: ReactNode;
  /** 기본 스타일(CSS) 주입 여부 */
  injectStyles?: boolean;
  className?: string;
  inputWrapperClassName?: string;
  inputClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  children?: ReactNode;
}

export interface UsementionProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options?: MentionOption[];
  onSearch?: (query: string) => Promise<MentionOption[]> | MentionOption[];
  disabled?: boolean;
  prefix?: string;
  separator?: string;
  getMention?: (option: MentionOption) => string;
}

export interface UsementionReturn {
  currentValue: string;
  inputValue: string;
  showDropdown: boolean;
  filteredOptions: MentionOption[];
  selectedIndex: number;
  isLoading: boolean;
  handleInputChange: (value: string, event?: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleInputKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleOptionSelect: (option: MentionOption) => void;
  handleInputFocus: (event?: React.FocusEvent<HTMLTextAreaElement>) => void;
  handleInputBlur: () => void;
  mentionStart: number;
  mentionEnd: number;
  mentions: Array<{ start: number; end: number; value: string }>;
}
