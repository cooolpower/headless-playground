'use client';

import React, { useState, createContext, useContext } from 'react';
import { Popover } from '@repo/ui';
import { Input } from '@repo/ui';
import { Textarea } from '@repo/ui';
import { Select } from '@repo/ui';
import { Button } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import type { SelectOption } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import * as styles from './popover.demo.css';

// Popover Controls Context
interface PopoverControlsContextType {
  content: string;
  setContent: (content: string) => void;
  title: string;
  setTitle: (title: string) => void;
  placement:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end';
  setPlacement: (
    placement:
      | 'top'
      | 'top-start'
      | 'top-end'
      | 'bottom'
      | 'bottom-start'
      | 'bottom-end'
      | 'left'
      | 'left-start'
      | 'left-end'
      | 'right'
      | 'right-start'
      | 'right-end',
  ) => void;
  trigger: 'hover' | 'click' | 'focus' | 'context-menu';
  setTrigger: (trigger: 'hover' | 'click' | 'focus' | 'context-menu') => void;
  injectStyles: boolean;
  setInjectStyles: (inject: boolean) => void;
}

const PopoverControlsContext = createContext<PopoverControlsContextType | null>(
  null,
);

// Provider
export function DemoPopoverBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [content, setContent] = useState('This is a popover content');
  const [title, setTitle] = useState('');
  const [placement, setPlacement] = useState<
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'
  >('top');
  const [trigger, setTrigger] = useState<
    'hover' | 'click' | 'focus' | 'context-menu'
  >('hover');
  const [injectStyles, setInjectStyles] = useState(true);

  return (
    <PopoverControlsContext.Provider
      value={{
        content,
        setContent,
        title,
        setTitle,
        placement,
        setPlacement,
        trigger,
        setTrigger,
        injectStyles,
        setInjectStyles,
      }}
    >
      {children}
    </PopoverControlsContext.Provider>
  );
}

// 기본 Popover (컨트롤러와 함께 사용될 컴포넌트)
export function DemoPopoverBasicWithControls() {
  const context = useContext(PopoverControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { content, title, placement, trigger, injectStyles } = context;

  return (
    <div
      className={!injectStyles ? styles.popoverWrapperClass : ''}
      style={{ padding: '2rem', textAlign: 'center' }}
    >
      <Popover
        content={content}
        title={title || undefined}
        placement={placement}
        trigger={trigger}
        injectStyles={injectStyles}
      >
        <Button>
          {trigger === 'hover'
            ? 'Hover me'
            : trigger === 'click'
              ? 'Click me'
              : trigger === 'focus'
                ? 'Focus me'
                : 'Right-click me'}
        </Button>
      </Popover>
    </div>
  );
}

// Popover Controls
export function DemoPopoverBasicControls() {
  const context = useContext(PopoverControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    content,
    setContent,
    title,
    setTitle,
    placement,
    setPlacement,
    trigger,
    setTrigger,
    injectStyles,
    setInjectStyles,
  } = context;

  return (
    <Controls
      items={[
        {
          label: '제목 (Title)',
          control: (
            <Input
              type="text"
              value={title}
              onChange={setTitle}
              placeholder="선택사항"
              size="small"
            />
          ),
        },
        {
          label: '내용 (Content)',
          control: (
            <Textarea
              value={content}
              onChange={setContent}
              rows={3}
              placeholder="Popover 내용"
              size="small"
            />
          ),
        },
        {
          label: '위치 (Placement)',
          control: (
            <Select
              options={[
                { label: 'Top', value: 'top' },
                { label: 'Top Start', value: 'top-start' },
                { label: 'Top End', value: 'top-end' },
                { label: 'Bottom', value: 'bottom' },
                { label: 'Bottom Start', value: 'bottom-start' },
                { label: 'Bottom End', value: 'bottom-end' },
                { label: 'Left', value: 'left' },
                { label: 'Left Start', value: 'left-start' },
                { label: 'Left End', value: 'left-end' },
                { label: 'Right', value: 'right' },
                { label: 'Right Start', value: 'right-start' },
                { label: 'Right End', value: 'right-end' },
              ]}
              value={placement}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setPlacement(val as typeof placement);
                }
              }}
              placeholder="위치 선택"
              size="small"
            />
          ),
        },
        {
          label: '트리거 (Trigger)',
          control: (
            <Select
              options={[
                { label: 'Hover', value: 'hover' },
                { label: 'Click', value: 'click' },
                { label: 'Focus', value: 'focus' },
                { label: 'Context Menu', value: 'context-menu' },
              ]}
              value={trigger}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setTrigger(val as typeof trigger);
                }
              }}
              placeholder="트리거 선택"
              size="small"
            />
          ),
        },
        {
          label: 'Inject Styles',
          control: (
            <Checkbox
              checked={injectStyles}
              onChange={(checked) => setInjectStyles(checked)}
              size="small"
            >
              기본 스타일 주입
            </Checkbox>
          ),
        },
      ]}
    />
  );
}

// Export individual demo components for MDX
export function DemoPopoverBasic() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Popover content="Basic popover content">Hover me</Popover>
    </div>
  );
}

export function popoverDemo() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h2>popover 컴포넌트 데모</h2>

      <div style={{ marginBottom: '2rem' }}>
        <h3>기본 사용법</h3>
        <DemoPopoverBasic />
      </div>
    </div>
  );
}
