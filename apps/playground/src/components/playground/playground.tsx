// components/playground/playground.tsx
import type { ReactNode } from 'react';
import { cloneElement, isValidElement } from 'react';
import * as styles from './playground.css';

export function Playground({
  preview,
  controls,
}: {
  preview: ReactNode;
  controls?: ReactNode;
}) {
  // preview가 Context Provider를 포함하고 있으면, controls도 같은 Provider 내부에 렌더링
  // 이를 위해 preview를 복제하고 controls를 children으로 추가
  let wrappedPreview = preview;
  let wrappedControls = controls;

  if (controls && isValidElement(preview) && preview.type) {
    // preview가 Context Provider인 경우, controls를 같은 Provider 내부에 렌더링
    const previewType = preview.type as any;
    if (previewType?.$$typeof === Symbol.for('react.provider')) {
      wrappedPreview = cloneElement(preview as any, {
        children: (
          <>
            {(preview.props as any).children}
            <div className={styles.grid}>
              <div className={styles.interactionSection}>{controls}</div>
            </div>
          </>
        ),
      });
      wrappedControls = null;
    }
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: wrappedControls ? '1fr 400px' : '1fr',
        gap: '24px',
      }}
    >
      <div className={styles.interactionSection}>{wrappedPreview}</div>
      {wrappedControls && (
        <div className={styles.interactionSection}>{wrappedControls}</div>
      )}
    </div>
  );
}
