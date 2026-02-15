'use client';

import React, { createContext, useContext, useState } from 'react';
import { Heatmap } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import * as styles from './heatmap.demo.css';

interface HeatmapControlsContextType {
  injectStyles: boolean;
  setInjectStyles: (value: boolean) => void;
}

const HeatmapControlsContext = createContext<HeatmapControlsContextType | null>(
  null,
);

export function DemoHeatmapBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);
  return (
    <HeatmapControlsContext.Provider value={{ injectStyles, setInjectStyles }}>
      {children}
    </HeatmapControlsContext.Provider>
  );
}

export function DemoHeatmapBasicWithControls() {
  const ctx = useContext(HeatmapControlsContext);
  if (!ctx) return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  return <DemoHeatmapBasic />;
}

export function DemoHeatmapBasicControls() {
  const ctx = useContext(HeatmapControlsContext);
  if (!ctx) return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;

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

export function DemoHeatmapBasic() {
  const ctx = useContext(HeatmapControlsContext);
  const injectStyles = ctx?.injectStyles ?? false;
  const [value, setValue] = useState([]);

  return (
    <div
      className={!injectStyles ? styles.heatmapWrapperClass : ''}
      style={{ padding: '2rem' }}
    >
      <Heatmap
        value={value}
        onChange={setValue}
        injectStyles={injectStyles}
        className={injectStyles ? undefined : styles.heatmap}
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
