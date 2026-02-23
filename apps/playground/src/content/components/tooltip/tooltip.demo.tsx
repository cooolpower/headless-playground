'use client';

import React, { useState, createContext, useContext } from 'react';
import { Tooltip } from '@cooolpower/headless-ui';
import { Input } from '@cooolpower/headless-ui';
import { Select } from '@cooolpower/headless-ui';
import { Button } from '@cooolpower/headless-ui';
import { Controls } from '@/components/playground/controls';
import type { SelectOption } from '@cooolpower/headless-ui';
import { Checkbox } from '@cooolpower/headless-ui';
import * as styles from './tooltip.demo.css';

// Tooltip Controls Context
interface TooltipControlsContextType {
  content: string;
  setContent: (content: string) => void;
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

const TooltipControlsContext = createContext<TooltipControlsContextType | null>(
  null,
);

// Provider
export function DemoTooltipBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [content, setContent] = useState('This is a tooltip');
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
    <TooltipControlsContext.Provider
      value={{
        content,
        setContent,
        placement,
        setPlacement,
        trigger,
        setTrigger,
        injectStyles,
        setInjectStyles,
      }}
    >
      {children}
    </TooltipControlsContext.Provider>
  );
}

// 기본 Tooltip (컨트롤러와 함께 사용될 컴포넌트)
export function DemoTooltipBasicWithControls() {
  const context = useContext(TooltipControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { content, placement, trigger, injectStyles } = context;

  return (
    <div
      className={!injectStyles ? styles.tooltipWrapperClass : ''}
      style={{ padding: '2rem', textAlign: 'center' }}
    >
      <Tooltip
        content={content}
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
      </Tooltip>
    </div>
  );
}

// Tooltip Controls
export function DemoTooltipBasicControls() {
  const context = useContext(TooltipControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    content,
    setContent,
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
          label: '내용 (Content)',
          control: (
            <Input
              type="text"
              value={content}
              onChange={setContent}
              placeholder="Tooltip 내용"
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
export function DemoTooltipBasic() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Tooltip content="This is a basic tooltip">
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: 'var(--color-brand-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Hover me
        </button>
      </Tooltip>
    </div>
  );
}

export function DemoTooltipPlacement() {
  return (
    <div
      style={{
        padding: '2rem',
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Tooltip content="Top placement" placement="top">
        <button style={{ padding: '8px 12px', cursor: 'pointer' }}>Top</button>
      </Tooltip>

      <Tooltip content="Bottom placement" placement="bottom">
        <button style={{ padding: '8px 12px', cursor: 'pointer' }}>
          Bottom
        </button>
      </Tooltip>

      <Tooltip content="Left placement" placement="left">
        <button style={{ padding: '8px 12px', cursor: 'pointer' }}>Left</button>
      </Tooltip>

      <Tooltip content="Right placement" placement="right">
        <button style={{ padding: '8px 12px', cursor: 'pointer' }}>
          Right
        </button>
      </Tooltip>
    </div>
  );
}

export function DemoTooltipTrigger() {
  return (
    <div
      style={{
        padding: '2rem',
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Tooltip content="Hover trigger" trigger="hover">
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: 'var(--color-semantic-success)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Hover
        </button>
      </Tooltip>

      <Tooltip content="Click trigger" trigger="click">
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: 'var(--color-semantic-warning)',
            color: 'var(--color-text-on-warning)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Click
        </button>
      </Tooltip>

      <Tooltip
        content="Focus trigger - Tab 키로 포커스해보세요"
        trigger="focus"
      >
        <Input
          type="text"
          placeholder="Focus me"
          size="small"
          inputStyle={{ width: '150px' }}
        />
      </Tooltip>
    </div>
  );
}

export function DemoTooltipRich() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Tooltip
        content={
          <div>
            <strong>Rich Content Tooltip</strong>
            <br />
            You can put any JSX here!
            <br />
            <em>Even formatted text</em>
            <br />
            <span style={{ color: 'var(--color-brand-primary)' }}>
              🎉 And emojis too!
            </span>
          </div>
        }
      >
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: 'var(--color-semantic-info)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Rich Content
        </button>
      </Tooltip>
    </div>
  );
}

export function TooltipDemo() {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h2>Tooltip 컴포넌트 데모</h2>

      <div style={{ marginBottom: '2rem' }}>
        <h3>기본 사용법 (Hover)</h3>
        <Tooltip content="이것은 기본 툴팁입니다!">
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--color-brand-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Hover me
          </button>
        </Tooltip>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>다양한 Placement</h3>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <Tooltip content="Top placement" placement="top">
            <button style={{ padding: '8px 12px', cursor: 'pointer' }}>
              Top
            </button>
          </Tooltip>

          <Tooltip content="Bottom placement" placement="bottom">
            <button style={{ padding: '8px 12px', cursor: 'pointer' }}>
              Bottom
            </button>
          </Tooltip>

          <Tooltip content="Left placement" placement="left">
            <button style={{ padding: '8px 12px', cursor: 'pointer' }}>
              Left
            </button>
          </Tooltip>

          <Tooltip content="Right placement" placement="right">
            <button style={{ padding: '8px 12px', cursor: 'pointer' }}>
              Right
            </button>
          </Tooltip>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Click Trigger</h3>
        <Tooltip content="클릭해서 토글!" trigger="click">
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--color-semantic-success)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Click me
          </button>
        </Tooltip>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Focus Trigger</h3>
        <Tooltip content="Tab 키로 포커스해보세요!" trigger="focus">
          <Input
            type="text"
            placeholder="Focus me"
            size="small"
            inputStyle={{ width: '200px' }}
          />
        </Tooltip>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Controlled Tooltip</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            onClick={() => setVisible(!visible)}
            style={{
              padding: '8px 16px',
              backgroundColor: visible
                ? 'var(--color-semantic-error)'
                : 'var(--color-text-muted)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {visible ? 'Hide' : 'Show'} Tooltip
          </button>

          <Tooltip
            content="수동으로 제어되는 툴팁입니다!"
            visible={visible}
            onVisibleChange={setVisible}
          >
            <span
              style={{
                padding: '8px 12px',
                backgroundColor: 'var(--color-surface-hover)',
                border: '1px solid var(--color-divider)',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Hover me (controlled)
            </span>
          </Tooltip>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Context Menu Trigger</h3>
        <Tooltip content="우클릭해보세요!" trigger="context-menu">
          <div
            style={{
              padding: '2rem',
              backgroundColor: 'var(--color-surface-hover)',
              border: '2px dashed var(--color-divider)',
              borderRadius: '8px',
              textAlign: 'center',
              cursor: 'context-menu',
            }}
          >
            우클릭 영역
          </div>
        </Tooltip>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Rich Content</h3>
        <Tooltip
          content={
            <div>
              <strong>Rich Tooltip!</strong>
              <br />
              HTML 콘텐츠도 지원합니다.
              <br />
              <em>멀티라인 텍스트</em>
            </div>
          }
        >
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--color-semantic-info)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Rich Content
          </button>
        </Tooltip>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Edge Placements</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            maxWidth: '400px',
          }}
        >
          <Tooltip content="Top Start" placement="top-start">
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--color-surface-hover)',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              Top-Start
            </div>
          </Tooltip>

          <Tooltip content="Top" placement="top">
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--color-surface-hover)',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              Top
            </div>
          </Tooltip>

          <Tooltip content="Top End" placement="top-end">
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--color-surface-hover)',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              Top-End
            </div>
          </Tooltip>

          <Tooltip content="Left Start" placement="left-start">
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--color-surface-hover)',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              Left-Start
            </div>
          </Tooltip>

          <div></div>

          <Tooltip content="Right Start" placement="right-start">
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--color-surface-hover)',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              Right-Start
            </div>
          </Tooltip>

          <Tooltip content="Left End" placement="left-end">
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--color-surface-hover)',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              Left-End
            </div>
          </Tooltip>

          <div></div>

          <Tooltip content="Right End" placement="right-end">
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--color-surface-hover)',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              Right-End
            </div>
          </Tooltip>

          <Tooltip content="Bottom Start" placement="bottom-start">
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--color-surface-hover)',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              Bottom-Start
            </div>
          </Tooltip>

          <Tooltip content="Bottom" placement="bottom">
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--color-surface-hover)',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              Bottom
            </div>
          </Tooltip>

          <Tooltip content="Bottom End" placement="bottom-end">
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--color-surface-hover)',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              Bottom-End
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
