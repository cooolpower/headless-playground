'use client';

import { ReactNode } from 'react';
import * as styles from './controls.css';

interface ControlItem {
  label: string;
  control: ReactNode;
}

interface ControlsProps {
  title?: string;
  items: ControlItem[];
}

export function Controls({ title = '컨트롤', items }: ControlsProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>
      <h3 className={styles.title}>
        {title}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: '12px' }}>
        {items.map((item, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '4px',}}>
            <label
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: 'oklch(55.1% 0.023 264.4)',
              }}
            >
              {item.label}
            </label>
            <div>{item.control}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
