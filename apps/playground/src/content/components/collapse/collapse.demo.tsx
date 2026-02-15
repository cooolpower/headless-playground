'use client';

import React, { useState, createContext, useContext } from 'react';
import {
  Collapse,
  CollapsePanel,
} from '@repo/ui';
import { Select } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import type { SelectOption } from '@repo/ui';
import * as styles from './collapse.demo.css';

// Collapse Controls Context
interface CollapseControlsContextType {
  accordion: boolean;
  setAccordion: (accordion: boolean) => void;
  expandIconPosition: 'left' | 'right';
  setExpandIconPosition: (position: 'left' | 'right') => void;
  injectStyles: boolean;
  setInjectStyles: (value: boolean) => void;
}

const CollapseControlsContext =
  createContext<CollapseControlsContextType | null>(null);

// Provider
export function DemoCollapseBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [accordion, setAccordion] = useState(false);
  const [expandIconPosition, setExpandIconPosition] = useState<
    'left' | 'right'
  >('left');
  const [injectStyles, setInjectStyles] = useState(true);

  return (
    <CollapseControlsContext.Provider
      value={{
        accordion,
        setAccordion,
        expandIconPosition,
        setExpandIconPosition,
        injectStyles,
        setInjectStyles,
      }}
    >
      {children}
    </CollapseControlsContext.Provider>
  );
}

// 기본 Collapse (컨트롤러와 함께 사용될 컴포넌트)
export function DemoCollapseBasicWithControls() {
  const context = useContext(CollapseControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { accordion, expandIconPosition, injectStyles } = context;

  return (
    <div
      className={!injectStyles ? styles.collapseWrapperClass : ''}
      style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}
    >
      <Collapse
        injectStyles={injectStyles}
        accordion={accordion}
        expandIconPosition={expandIconPosition}
      >
        <CollapsePanel header="Panel 1" key="1">
          <p>Content of panel 1</p>
        </CollapsePanel>
        <CollapsePanel header="Panel 2" key="2">
          <p>Content of panel 2</p>
        </CollapsePanel>
        <CollapsePanel header="Panel 3" key="3">
          <p>Content of panel 3</p>
        </CollapsePanel>
      </Collapse>
    </div>
  );
}

// Collapse Controls
export function DemoCollapseBasicControls() {
  const context = useContext(CollapseControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    accordion,
    setAccordion,
    expandIconPosition,
    setExpandIconPosition,
    injectStyles,
    setInjectStyles,
  } = context;

  return (
    <Controls
      items={[
        {
          label: 'Inject Styles',
          control: (
            <Checkbox
              checked={injectStyles}
              onChange={setInjectStyles}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '아코디언 모드 (Accordion)',
          control: (
            <Checkbox
              checked={accordion}
              onChange={(checked) => setAccordion(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '아이콘 위치 (Expand Icon Position)',
          control: (
            <Select
              options={[
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
              ]}
              value={expandIconPosition}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setExpandIconPosition(val as typeof expandIconPosition);
                }
              }}
              placeholder="아이콘 위치 선택"
              size="small"
            />
          ),
        },
      ]}
    />
  );
}

// 기본 사용법
export function DemoCollapseBasic() {
  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <Collapse>
        <CollapsePanel header="Panel 1" key="1">
          <p>Content of panel 1</p>
        </CollapsePanel>
        <CollapsePanel header="Panel 2" key="2">
          <p>Content of panel 2</p>
        </CollapsePanel>
        <CollapsePanel header="Panel 3" key="3">
          <p>Content of panel 3</p>
        </CollapsePanel>
      </Collapse>
    </div>
  );
}

// Accordion Mode
export function DemoCollapseAccordion() {
  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <Collapse accordion>
        <CollapsePanel header="Panel 1" key="1">
          <p>Content 1</p>
        </CollapsePanel>
        <CollapsePanel header="Panel 2" key="2">
          <p>Content 2</p>
        </CollapsePanel>
        <CollapsePanel header="Panel 3" key="3">
          <p>Content 3</p>
        </CollapsePanel>
      </Collapse>
    </div>
  );
}

// Default Active
export function DemoCollapseDefaultActive() {
  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <Collapse defaultActiveKey={['1', '2']}>
        <CollapsePanel header="Panel 1" key="1">
          <p>Content 1</p>
        </CollapsePanel>
        <CollapsePanel header="Panel 2" key="2">
          <p>Content 2</p>
        </CollapsePanel>
        <CollapsePanel header="Panel 3" key="3">
          <p>Content 3</p>
        </CollapsePanel>
      </Collapse>
    </div>
  );
}

// Controlled
export function DemoCollapseControlled() {
  const [activeKey, setActiveKey] = useState<string[]>(['1']);

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <Collapse
        activeKey={activeKey}
        onChange={(keys) => setActiveKey(keys as string[])}
      >
        <CollapsePanel header="Panel 1" key="1">
          <p>Content 1</p>
        </CollapsePanel>
        <CollapsePanel header="Panel 2" key="2">
          <p>Content 2</p>
        </CollapsePanel>
        <CollapsePanel header="Panel 3" key="3">
          <p>Content 3</p>
        </CollapsePanel>
      </Collapse>
      <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
        Active keys: {activeKey.join(', ')}
      </p>
    </div>
  );
}

// With Extra
export function DemoCollapseWithExtra() {
  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <Collapse>
        <CollapsePanel
          header="Panel 1"
          key="1"
          extra={
            <span style={{ color: 'var(--color-text-secondary)' }}>Extra</span>
          }
        >
          <p>Content 1</p>
        </CollapsePanel>
        <CollapsePanel
          header="Panel 2"
          key="2"
          extra={
            <span style={{ color: 'var(--color-text-secondary)' }}>Extra</span>
          }
        >
          <p>Content 2</p>
        </CollapsePanel>
      </Collapse>
    </div>
  );
}

// Disabled Panel
export function DemoCollapseDisabled() {
  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <Collapse>
        <CollapsePanel header="Panel 1" key="1">
          <p>Content 1</p>
        </CollapsePanel>
        <CollapsePanel header="Panel 2" key="2" disabled>
          <p>Content 2 (disabled)</p>
        </CollapsePanel>
        <CollapsePanel header="Panel 3" key="3">
          <p>Content 3</p>
        </CollapsePanel>
      </Collapse>
    </div>
  );
}
