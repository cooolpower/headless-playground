'use client';

import React, { createContext, useContext, useState } from 'react';
import {
  Descriptions,
  DescriptionsItem,
} from '@repo/ui';
import { Input } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import * as styles from './descriptions.demo.css';

// Descriptions Controls Context
interface DescriptionsControlsContextType {
  title: string;
  setTitle: (title: string) => void;
  bordered: boolean;
  setBordered: (bordered: boolean) => void;
  column: number;
  setColumn: (column: number) => void;
  injectStyles: boolean;
  setInjectStyles: (value: boolean) => void;
}

const DescriptionsControlsContext =
  createContext<DescriptionsControlsContextType | null>(null);

// Provider
export function DemoDescriptionsBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [title, setTitle] = useState('사용자 정보');
  const [bordered, setBordered] = useState(false);
  const [column, setColumn] = useState(3);
  const [injectStyles, setInjectStyles] = useState(true);

  return (
    <DescriptionsControlsContext.Provider
      value={{
        title,
        setTitle,
        bordered,
        setBordered,
        column,
        setColumn,
        injectStyles,
        setInjectStyles,
      }}
    >
      {children}
    </DescriptionsControlsContext.Provider>
  );
}

// 기본 Descriptions (컨트롤러와 함께 사용될 컴포넌트)
export function DemoDescriptionsBasicWithControls() {
  const context = useContext(DescriptionsControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { title, bordered, column, injectStyles } = context;

  return (
    <div
      className={!injectStyles ? styles.descriptionsWrapperClass : ''}
      style={{ padding: '2rem' }}
    >
      <Descriptions
        title={title}
        bordered={bordered}
        column={column}
        injectStyles={injectStyles}
      >
        <DescriptionsItem label="이름">홍길동</DescriptionsItem>
        <DescriptionsItem label="이메일">hong@example.com</DescriptionsItem>
        <DescriptionsItem label="전화번호">010-1234-5678</DescriptionsItem>
        <DescriptionsItem label="주소">서울시 강남구</DescriptionsItem>
        <DescriptionsItem label="직업">개발자</DescriptionsItem>
      </Descriptions>
    </div>
  );
}

// Descriptions Controls
export function DemoDescriptionsBasicControls() {
  const context = useContext(DescriptionsControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    title,
    setTitle,
    bordered,
    setBordered,
    column,
    setColumn,
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
          label: '제목 (Title)',
          control: (
            <Input
              type="text"
              value={title}
              onChange={setTitle}
              placeholder="제목 텍스트"
              size="small"
            />
          ),
        },
        {
          label: '테두리 (Bordered)',
          control: (
            <Checkbox
              checked={bordered}
              onChange={(checked) => setBordered(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '열 개수 (Column)',
          control: (
            <Input
              type="number"
              value={column.toString()}
              onChange={(val) =>
                setColumn(Math.min(6, Math.max(1, Number(val) || 1)))
              }
              placeholder="1-6"
              size="small"
            />
          ),
        },
      ]}
    />
  );
}

export function DemoDescriptionsBasic() {
  return (
    <div style={{ padding: '2rem' }}>
      <Descriptions title="사용자 정보">
        <DescriptionsItem label="이름">홍길동</DescriptionsItem>
        <DescriptionsItem label="이메일">hong@example.com</DescriptionsItem>
        <DescriptionsItem label="전화번호">010-1234-5678</DescriptionsItem>
      </Descriptions>
    </div>
  );
}

export function DemoDescriptionsWithItems() {
  return (
    <div style={{ padding: '2rem' }}>
      <Descriptions
        title="주문 정보"
        items={[
          { key: 'orderId', label: '주문번호', children: 'ORD-12345' },
          { key: 'date', label: '주문일자', children: '2024-01-15' },
          { key: 'amount', label: '주문금액', children: '₩50,000' },
        ]}
      />
    </div>
  );
}

export function DemoDescriptionsBordered() {
  return (
    <div style={{ padding: '2rem' }}>
      <Descriptions
        title="상품 정보"
        bordered
        items={[
          { key: 'name', label: '상품명', children: '노트북' },
          { key: 'price', label: '가격', children: '₩1,200,000' },
          { key: 'stock', label: '재고', children: '5개' },
        ]}
      />
    </div>
  );
}

export function DemoDescriptionsCustomColumns() {
  return (
    <div style={{ padding: '2rem' }}>
      <Descriptions
        column={2}
        items={[
          { key: 'field1', label: '필드 1', children: '값 1' },
          { key: 'field2', label: '필드 2', children: '값 2' },
          { key: 'field3', label: '필드 3', children: '값 3', span: 2 },
        ]}
      />
    </div>
  );
}
