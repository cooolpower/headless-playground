'use client';

import { createContext, useContext, useState } from 'react';
import { Table } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import * as styles from './table.demo.css';

const sampleData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Developer',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Designer',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Manager',
    status: 'Inactive',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'Developer',
    status: 'Active',
  },
];

const columns = [
  { key: 'name', title: 'Name', dataIndex: 'name' as const },
  { key: 'email', title: 'Email', dataIndex: 'email' as const },
  { key: 'role', title: 'Role', dataIndex: 'role' as const },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status' as const,
    render: (status: string) => (
      <span
        className={
          status === 'Active' ? styles.badgeActive : styles.badgeInactive
        }
      >
        {status}
      </span>
    ),
  },
];

// Table Controls Context
interface TableControlsContextType {
  injectStyles: boolean;
  setInjectStyles: (injectStyles: boolean) => void;
  bordered: boolean;
  setBordered: (bordered: boolean) => void;
  striped: boolean;
  setStriped: (striped: boolean) => void;
  hoverable: boolean;
  setHoverable: (hoverable: boolean) => void;
}

const TableControlsContext = createContext<TableControlsContextType | null>(
  null,
);

// Provider
export function DemoTableBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);
  const [bordered, setBordered] = useState(false);
  const [striped, setStriped] = useState(false);
  const [hoverable, setHoverable] = useState(false);

  return (
    <TableControlsContext.Provider
      value={{
        injectStyles,
        setInjectStyles,
        bordered,
        setBordered,
        striped,
        setStriped,
        hoverable,
        setHoverable,
      }}
    >
      {children}
    </TableControlsContext.Provider>
  );
}

// 기본 Table (컨트롤러와 함께 사용될 컴포넌트)
export function DemoTableBasicWithControls() {
  const context = useContext(TableControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { injectStyles, bordered, striped, hoverable } = context;

  return (
    <div className={!injectStyles ? styles.tableWrapperClass : ''}>
      <Table
        injectStyles={injectStyles}
        data={sampleData}
        columns={columns}
        bordered={bordered}
        striped={striped}
        hoverable={hoverable}
      />
    </div>
  );
}

// Table Controls
export function DemoTableBasicControls() {
  const context = useContext(TableControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    injectStyles,
    setInjectStyles,
    bordered,
    setBordered,
    striped,
    setStriped,
    hoverable,
    setHoverable,
  } = context;

  return (
    <Controls
      items={[
        {
          label: 'Inject Styles',
          control: (
            <Checkbox
              checked={injectStyles}
              onChange={(checked) => setInjectStyles(checked)}
              size="small"
            >
              사용
            </Checkbox>
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
          label: '줄무늬 (Striped)',
          control: (
            <Checkbox
              checked={striped}
              onChange={(checked) => setStriped(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '호버 효과 (Hoverable)',
          control: (
            <Checkbox
              checked={hoverable}
              onChange={(checked) => setHoverable(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
      ]}
    />
  );
}

export function DemoTableBasic() {
  return <Table data={sampleData} columns={columns} />;
}

export function DemoTableStyled() {
  return (
    <Table data={sampleData} columns={columns} bordered striped hoverable />
  );
}
