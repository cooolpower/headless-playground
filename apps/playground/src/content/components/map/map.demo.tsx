'use client';

import React, { createContext, useContext, useState } from 'react';
import { Map } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import * as styles from './map.demo.css';

interface MapControlsContextType {
  injectStyles: boolean;
  setInjectStyles: (value: boolean) => void;
}

const MapControlsContext = createContext<MapControlsContextType | null>(null);

export function DemoMapBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);
  return (
    <MapControlsContext.Provider value={{ injectStyles, setInjectStyles }}>
      {children}
    </MapControlsContext.Provider>
  );
}

export function DemoMapBasicWithControls() {
  const ctx = useContext(MapControlsContext);
  if (!ctx) return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  return <DemoMapBasic />;
}

export function DemoMapBasicControls() {
  const ctx = useContext(MapControlsContext);
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

// Export individual demo components for MDX
export function DemoMapBasic() {
  const ctx = useContext(MapControlsContext);
  const injectStyles = ctx?.injectStyles ?? false;
  return (
    <div
      className={!injectStyles ? styles.mapWrapperClass : ''}
      style={{ padding: '2rem', textAlign: 'center' }}
    >
      <Map
        injectStyles={injectStyles}
        className={injectStyles ? undefined : styles.map}
      >
        Basic map content
      </Map>
    </div>
  );
}

export function mapDemo() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h2>map 컴포넌트 데모</h2>

      <div style={{ marginBottom: '2rem' }}>
        <h3>기본 사용법</h3>
        <DemoMapBasic />
      </div>
    </div>
  );
}
