'use client';

import React, { useState, createContext, useContext } from 'react';
import { Pagination } from '@repo/ui';
import { Input } from '@repo/ui';
import { Select } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import type { SelectOption } from '@repo/ui';
import * as styles from './pagination.demo.css';

// Pagination Controls Context
interface PaginationControlsContextType {
  current: number;
  setCurrent: (current: number) => void;
  total: number;
  setTotal: (total: number) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  showSizeChanger: boolean;
  setShowSizeChanger: (show: boolean) => void;
  showQuickJumper: boolean;
  setShowQuickJumper: (show: boolean) => void;
  simple: boolean;
  setSimple: (simple: boolean) => void;
  size: 'small' | 'medium' | 'large';
  setSize: (size: 'small' | 'medium' | 'large') => void;
  injectStyles: boolean;
  setInjectStyles: (inject: boolean) => void;
}

const PaginationControlsContext =
  createContext<PaginationControlsContextType | null>(null);

// Provider
export function DemoPaginationBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(100);
  const [pageSize, setPageSize] = useState(10);
  const [showSizeChanger, setShowSizeChanger] = useState(false);
  const [showQuickJumper, setShowQuickJumper] = useState(false);
  const [simple, setSimple] = useState(false);
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [injectStyles, setInjectStyles] = useState(true);

  return (
    <PaginationControlsContext.Provider
      value={{
        current,
        setCurrent,
        total,
        setTotal,
        pageSize,
        setPageSize,
        showSizeChanger,
        setShowSizeChanger,
        showQuickJumper,
        setShowQuickJumper,
        simple,
        setSimple,
        size,
        setSize,
        injectStyles,
        setInjectStyles,
      }}
    >
      {children}
    </PaginationControlsContext.Provider>
  );
}

// 기본 Pagination (컨트롤러와 함께 사용될 컴포넌트)
export function DemoPaginationBasicWithControls() {
  const context = useContext(PaginationControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    current,
    setCurrent,
    total,
    pageSize,
    setPageSize,
    showSizeChanger,
    showQuickJumper,
    simple,
    size,
    injectStyles,
  } = context;

  return (
    <div
      className={!injectStyles ? styles.paginationWrapperClass : ''}
      style={{ padding: '2rem', textAlign: 'center' }}
    >
      <Pagination
        injectStyles={injectStyles}
        total={total}
        pageSize={pageSize}
        current={current}
        onChange={(page, size) => {
          setCurrent(page);
          if (size) setPageSize(size);
        }}
        showSizeChanger={showSizeChanger}
        onShowSizeChange={(current, size) => {
          setCurrent(1);
          setPageSize(size);
        }}
        showQuickJumper={showQuickJumper}
        simple={simple}
        size={size}
      />
      <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
        현재 페이지: {current} / 총 페이지: {Math.ceil(total / pageSize)}
      </p>
    </div>
  );
}

// Pagination Controls
export function DemoPaginationBasicControls() {
  const context = useContext(PaginationControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    current,
    setCurrent,
    total,
    setTotal,
    pageSize,
    setPageSize,
    showSizeChanger,
    setShowSizeChanger,
    showQuickJumper,
    setShowQuickJumper,
    simple,
    setSimple,
    size,
    setSize,
    injectStyles,
    setInjectStyles,
  } = context;

  return (
    <Controls
      items={[
        {
          label: '현재 페이지 (Current)',
          control: (
            <Input
              type="number"
              value={current.toString()}
              onChange={(val) =>
                setCurrent(
                  Math.min(
                    Math.ceil(total / pageSize),
                    Math.max(1, Number(val) || 1),
                  ),
                )
              }
              placeholder="1"
              size="small"
            />
          ),
        },
        {
          label: '총 항목 수 (Total)',
          control: (
            <Input
              type="number"
              value={total.toString()}
              onChange={(val) => setTotal(Math.max(1, Number(val) || 1))}
              placeholder="총 항목 수"
              size="small"
            />
          ),
        },
        {
          label: '페이지 크기 (Page Size)',
          control: (
            <Input
              type="number"
              value={pageSize.toString()}
              onChange={(val) => setPageSize(Math.max(1, Number(val) || 1))}
              placeholder="페이지 크기"
              size="small"
            />
          ),
        },
        {
          label: '크기 변경 표시 (Show Size Changer)',
          control: (
            <Checkbox
              checked={showSizeChanger}
              onChange={(checked) => setShowSizeChanger(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '빠른 이동 (Show Quick Jumper)',
          control: (
            <Checkbox
              checked={showQuickJumper}
              onChange={(checked) => setShowQuickJumper(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '간단 모드 (Simple)',
          control: (
            <Checkbox
              checked={simple}
              onChange={(checked) => setSimple(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '크기 (Size)',
          control: (
            <Select
              options={[
                { label: 'Small', value: 'small' },
                { label: 'Medium', value: 'medium' },
                { label: 'Large', value: 'large' },
              ]}
              value={size}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setSize(val as typeof size);
                }
              }}
              placeholder="크기 선택"
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

// 기존 예제들 (props 조합으로만 차별화)
export function DemoPaginationBasic() {
  const [current, setCurrent] = useState(1);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Pagination
        total={100}
        pageSize={10}
        current={current}
        onChange={(page) => setCurrent(page)}
      />
    </div>
  );
}

export function DemoPaginationWithTotal() {
  const [current, setCurrent] = useState(1);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Pagination
        total={100}
        pageSize={10}
        current={current}
        onChange={(page) => setCurrent(page)}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
      />
    </div>
  );
}

export function DemoPaginationWithSizeChanger() {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Pagination
        total={100}
        pageSize={pageSize}
        current={current}
        onChange={(page, size) => {
          setCurrent(page);
          setPageSize(size);
        }}
        showSizeChanger
        onShowSizeChange={(current, size) => {
          setCurrent(1);
          setPageSize(size);
        }}
      />
    </div>
  );
}

export function DemoPaginationWithQuickJumper() {
  const [current, setCurrent] = useState(1);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Pagination
        total={100}
        pageSize={10}
        current={current}
        onChange={(page) => setCurrent(page)}
        showQuickJumper
      />
    </div>
  );
}

export function DemoPaginationSimple() {
  const [current, setCurrent] = useState(1);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Pagination
        total={100}
        pageSize={10}
        current={current}
        onChange={(page) => setCurrent(page)}
        simple
      />
    </div>
  );
}

export function DemoPaginationSizes() {
  const [current, setCurrent] = useState(1);

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <Pagination
          total={100}
          pageSize={10}
          current={current}
          onChange={(page) => setCurrent(page)}
          size="small"
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <Pagination
          total={100}
          pageSize={10}
          current={current}
          onChange={(page) => setCurrent(page)}
          size="medium"
        />
      </div>
      <div>
        <Pagination
          total={100}
          pageSize={10}
          current={current}
          onChange={(page) => setCurrent(page)}
          size="large"
        />
      </div>
    </div>
  );
}

export function paginationDemo() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h2>pagination 컴포넌트 데모</h2>

      <div style={{ marginBottom: '2rem' }}>
        <h3>기본 사용법</h3>
        <DemoPaginationBasic />
      </div>
    </div>
  );
}
