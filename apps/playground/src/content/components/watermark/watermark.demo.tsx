'use client';

import { createContext, useContext, useState } from 'react';
import { Watermark } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import * as styles from './watermark.demo.css';

type WatermarkControlsContextType = {
  injectStyles: boolean;
  setInjectStyles: (value: boolean) => void;
};

const WatermarkControlsContext =
  createContext<WatermarkControlsContextType | null>(null);

export function DemoWatermarkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);

  return (
    <WatermarkControlsContext.Provider
      value={{ injectStyles, setInjectStyles }}
    >
      {children}
    </WatermarkControlsContext.Provider>
  );
}

export function DemoWatermark() {
  const context = useContext(WatermarkControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { injectStyles } = context;

  const sampleContent = (
    <div className={styles.content}>
      <h2>Sample Document</h2>
      <p>This is a sample document with watermark background.</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <p>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat.
      </p>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur.
      </p>
      <p>
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </p>
    </div>
  );

  return (
    <div
      className={`${styles.demoContainer} ${!injectStyles ? styles.watermarkWrapperClass : ''}`}
    >
      <h3 className={styles.demoTitle}>Watermark Variants</h3>

      {/* Basic Watermark */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Basic Watermark</h4>
        <div className={styles.watermarkWrapper}>
          <Watermark injectStyles={injectStyles} text="DRAFT">
            <div className={styles.contentArea}>{sampleContent}</div>
          </Watermark>
        </div>
      </div>

      {/* Different Text */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Different Text</h4>
        <div className={styles.watermarkGrid}>
          <div className={styles.watermarkWrapper}>
            <Watermark injectStyles={injectStyles} text="CONFIDENTIAL">
              <div className={styles.contentArea}>
                <div className={styles.miniContent}>
                  <h3>Confidential Document</h3>
                  <p>Important business information...</p>
                </div>
              </div>
            </Watermark>
          </div>
          <div className={styles.watermarkWrapper}>
            <Watermark injectStyles={injectStyles} text="SAMPLE">
              <div className={styles.contentArea}>
                <div className={styles.miniContent}>
                  <h3>Sample Document</h3>
                  <p>Preview content...</p>
                </div>
              </div>
            </Watermark>
          </div>
        </div>
      </div>

      {/* Different Opacity */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Different Opacity</h4>
        <div className={styles.watermarkGrid}>
          <div className={styles.watermarkWrapper}>
            <Watermark injectStyles={injectStyles} text="DRAFT" opacity={0.05}>
              <div className={styles.contentArea}>
                <div className={styles.miniContent}>
                  <h3>Light Watermark</h3>
                  <p>Opacity: 0.05</p>
                </div>
              </div>
            </Watermark>
          </div>
          <div className={styles.watermarkWrapper}>
            <Watermark injectStyles={injectStyles} text="DRAFT" opacity={0.2}>
              <div className={styles.contentArea}>
                <div className={styles.miniContent}>
                  <h3>Heavy Watermark</h3>
                  <p>Opacity: 0.2</p>
                </div>
              </div>
            </Watermark>
          </div>
        </div>
      </div>

      {/* Custom Content */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Custom Content</h4>
        <div className={styles.watermarkWrapper}>
          <Watermark injectStyles={injectStyles} text="© 2024">
            <div className={styles.contentArea}>
              <div className={styles.customContent}>
                <div className={styles.imagePlaceholder}>
                  <span className={styles.imagePlaceholderIcon}>📊</span>
                  <p className={styles.imagePlaceholderText}>Chart Image</p>
                </div>
                <div className={styles.textBlock}>
                  <h3 className={styles.textBlockTitle}>Data Visualization</h3>
                  <p className={styles.textBlockParagraph}>
                    This chart shows important business metrics and KPIs for Q4
                    2024.
                  </p>
                  <ul className={styles.textBlockList}>
                    <li className={styles.textBlockListItem}>
                      Revenue growth: +15%
                    </li>
                    <li className={styles.textBlockListItem}>
                      User acquisition: +25%
                    </li>
                    <li className={styles.textBlockListItem}>
                      Customer satisfaction: 4.8/5
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Watermark>
        </div>
      </div>
    </div>
  );
}

export function WatermarkControls() {
  const context = useContext(WatermarkControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { injectStyles, setInjectStyles } = context;

  return (
    <div className={styles.controls}>
      <p className={styles.controlDescription}>
        Watermark components add background text or images to content areas.
        Useful for indicating document status, copyright, or preview states.
      </p>
      <Checkbox checked={injectStyles} onChange={setInjectStyles} size="small">
        Inject Styles
      </Checkbox>
    </div>
  );
}
