'use client';

import React, { createContext, useContext, useState } from 'react';
import { DataTable } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import * as styles from './data-table.demo.css';

interface DataTableControlsContextType {
  injectStyles: boolean;
  setInjectStyles: (value: boolean) => void;
}

const DataTableControlsContext =
  createContext<DataTableControlsContextType | null>(null);

export function DemoDataTableProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);
  return (
    <DataTableControlsContext.Provider
      value={{ injectStyles, setInjectStyles }}
    >
      {children}
    </DataTableControlsContext.Provider>
  );
}

export function DemoDataTableControls() {
  const ctx = useContext(DataTableControlsContext);
  if (!ctx) return <div />;

  const { injectStyles, setInjectStyles } = ctx;
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
      ]}
    />
  );
}

function useInjectStyles() {
  return useContext(DataTableControlsContext)?.injectStyles ?? true;
}

export function DemoDataTableBasic() {
  const injectStyles = useInjectStyles();
  const [value, setValue] = useState([]);

  return (
    <div
      className={!injectStyles ? styles.dataTableWrapperClass : ''}
      style={{ padding: '2rem' }}
    >
      <DataTable
        value={value}
        onChange={setValue}
        injectStyles={injectStyles}
        className={injectStyles ? undefined : styles.datatable}
      />
      <p
        style={{
          marginTop: '1rem',
          color: 'var(--color-text-secondary)',
          fontSize: '14px',
        }}
      >
        현재 값: {JSON.stringify(value)}
      </p>
      <p
        style={{
          marginTop: '0.5rem',
          color: 'var(--color-text-muted)',
          fontSize: '12px',
        }}
      >
        ⚠️ 이 컴포넌트는 현재 개발 중입니다.
      </p>
    </div>
  );
}

export function DemoDataTablePagination() {
  const injectStyles = useInjectStyles();
  const [value, setValue] = useState([]);

  return (
    <div
      className={!injectStyles ? styles.dataTableWrapperClass : ''}
      style={{ padding: '2rem' }}
    >
      <DataTable
        value={value}
        onChange={setValue}
        injectStyles={injectStyles}
        className={injectStyles ? undefined : styles.datatable}
      />
      <p
        style={{
          marginTop: '1rem',
          color: 'var(--color-text-secondary)',
          fontSize: '14px',
        }}
      >
        페이지네이션 기능은 개발 중입니다.
      </p>
    </div>
  );
}

export function DemoDataTableSortable() {
  const injectStyles = useInjectStyles();
  const [value, setValue] = useState([]);

  return (
    <div
      className={!injectStyles ? styles.dataTableWrapperClass : ''}
      style={{ padding: '2rem' }}
    >
      <DataTable
        value={value}
        onChange={setValue}
        injectStyles={injectStyles}
        className={injectStyles ? undefined : styles.datatable}
      />
      <p
        style={{
          marginTop: '1rem',
          color: 'var(--color-text-secondary)',
          fontSize: '14px',
        }}
      >
        정렬 기능은 개발 중입니다.
      </p>
    </div>
  );
}
