'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';
import { List } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import * as styles from './list.demo.css';

const sample = [
  { title: 'Item A', desc: 'Description A' },
  { title: 'Item B', desc: 'Description B' },
  { title: 'Item C', desc: 'Description C' },
];

interface ListControlsContextType {
  injectStyles: boolean;
  setInjectStyles: (v: boolean) => void;
  bordered: boolean;
  setBordered: (v: boolean) => void;
  split: boolean;
  setSplit: (v: boolean) => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
  empty: boolean;
  setEmpty: (v: boolean) => void;
}

const ListControlsContext = createContext<ListControlsContextType | null>(null);

export function DemoListBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);
  const [bordered, setBordered] = useState(true);
  const [split, setSplit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);

  const value = useMemo(
    () => ({
      injectStyles,
      setInjectStyles,
      bordered,
      setBordered,
      split,
      setSplit,
      loading,
      setLoading,
      empty,
      setEmpty,
    }),
    [injectStyles, bordered, split, loading, empty],
  );

  return (
    <ListControlsContext.Provider value={value}>
      {children}
    </ListControlsContext.Provider>
  );
}

export function DemoListBasicWithControls() {
  const ctx = useContext(ListControlsContext);
  if (!ctx) return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;

  return (
    <div
      className={`${styles.container} ${!ctx.injectStyles ? styles.listWrapperClass : ''}`}
    >
      <List
        injectStyles={ctx.injectStyles}
        data={ctx.empty ? [] : sample}
        bordered={ctx.bordered}
        split={ctx.split}
        loading={ctx.loading}
        header="List Header"
        footer="List Footer"
        emptyText="No data"
        renderItem={(item: any) => (
          <div>
            <div className={styles.itemTitle}>{item.title}</div>
            <div className={styles.itemDesc}>{item.desc}</div>
          </div>
        )}
      />
    </div>
  );
}

export function DemoListBasicControls() {
  const ctx = useContext(ListControlsContext);
  if (!ctx) return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;

  return (
    <Controls
      items={[
        {
          label: 'Inject Styles',
          control: (
            <Checkbox
              checked={ctx.injectStyles}
              onChange={(v) => ctx.setInjectStyles(v)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: 'Bordered',
          control: (
            <Checkbox
              checked={ctx.bordered}
              onChange={(v) => ctx.setBordered(v)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: 'Split',
          control: (
            <Checkbox
              checked={ctx.split}
              onChange={(v) => ctx.setSplit(v)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: 'Loading',
          control: (
            <Checkbox
              checked={ctx.loading}
              onChange={(v) => ctx.setLoading(v)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: 'Empty',
          control: (
            <Checkbox
              checked={ctx.empty}
              onChange={(v) => ctx.setEmpty(v)}
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

export function DemoListBasic() {
  return (
    <List
      data={sample}
      header="List Header"
      footer="List Footer"
      bordered
      split
      renderItem={(item: any) => (
        <div>
          <div className={styles.itemTitle}>{item.title}</div>
          <div className={styles.itemDesc}>{item.desc}</div>
        </div>
      )}
    />
  );
}
