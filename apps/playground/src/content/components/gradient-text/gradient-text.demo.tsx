'use client';

import { createContext, useContext, useState } from 'react';
import { GradientText } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import * as styles from './gradient-text.demo.css';

type GradientTextControlsContextType = {
  injectStyles: boolean;
  setInjectStyles: (value: boolean) => void;
};

const GradientTextControlsContext =
  createContext<GradientTextControlsContextType | null>(null);

export function DemoGradientTextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);

  return (
    <GradientTextControlsContext.Provider
      value={{ injectStyles, setInjectStyles }}
    >
      {children}
    </GradientTextControlsContext.Provider>
  );
}

export function DemoGradientText() {
  const context = useContext(GradientTextControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { injectStyles } = context;

  return (
    <div
      className={`${styles.demoContainer} ${!injectStyles ? styles.gradientTextWrapperClass : ''}`}
    >
      <h3 className={styles.demoTitle}>Gradient Text Variants</h3>

      {/* Linear Gradients */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Linear Gradients</h4>
        <div className={styles.gradientWrapper}>
          <div className={styles.gradientItem}>
            <GradientText injectStyles={injectStyles}>
              <span className={styles.linearRainbow}>Rainbow Text</span>
            </GradientText>
          </div>
          <div className={styles.gradientItem}>
            <GradientText injectStyles={injectStyles}>
              <span className={styles.linearSunset}>Sunset Glow</span>
            </GradientText>
          </div>
          <div className={styles.gradientItem}>
            <GradientText injectStyles={injectStyles}>
              <span className={styles.linearOcean}>Ocean Blue</span>
            </GradientText>
          </div>
          <div className={styles.gradientItem}>
            <GradientText injectStyles={injectStyles}>
              <span className={styles.linearForest}>Forest Green</span>
            </GradientText>
          </div>
        </div>
      </div>

      {/* Radial Gradients */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Radial Gradients</h4>
        <div className={styles.gradientWrapper}>
          <div className={styles.gradientItem}>
            <GradientText injectStyles={injectStyles}>
              <span className={styles.radialWarm}>Warm Center</span>
            </GradientText>
          </div>
          <div className={styles.gradientItem}>
            <GradientText injectStyles={injectStyles}>
              <span className={styles.radialCool}>Cool Center</span>
            </GradientText>
          </div>
          <div className={styles.gradientItem}>
            <GradientText injectStyles={injectStyles}>
              <span className={styles.radialPurple}>Primary Blue</span>
            </GradientText>
          </div>
        </div>
      </div>

      {/* Text Sizes */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Different Text Sizes</h4>
        <div className={styles.sizeWrapper}>
          <GradientText injectStyles={injectStyles}>
            <span className={`${styles.linearRainbow} ${styles.small}`}>
              Small Text
            </span>
          </GradientText>
          <GradientText injectStyles={injectStyles}>
            <span className={`${styles.linearRainbow} ${styles.medium}`}>
              Medium Text
            </span>
          </GradientText>
          <GradientText injectStyles={injectStyles}>
            <span className={`${styles.linearRainbow} ${styles.large}`}>
              Large Text
            </span>
          </GradientText>
          <GradientText injectStyles={injectStyles}>
            <span className={`${styles.linearRainbow} ${styles.extraLarge}`}>
              Extra Large
            </span>
          </GradientText>
        </div>
      </div>

      {/* Animated Gradients */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Animated Gradients</h4>
        <div className={styles.gradientWrapper}>
          <div className={styles.gradientItem}>
            <GradientText injectStyles={injectStyles}>
              <span className={styles.animatedRainbow}>Animated Rainbow</span>
            </GradientText>
          </div>
          <div className={styles.gradientItem}>
            <GradientText injectStyles={injectStyles}>
              <span className={styles.animatedShimmer}>Shimmer Effect</span>
            </GradientText>
          </div>
        </div>
      </div>

      {/* Background Text */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Background Text</h4>
        <div className={styles.backgroundWrapper}>
          <p className={styles.normalText}>
            Normal text with{' '}
            <GradientText injectStyles={injectStyles}>
              <span className={styles.inlineGradient}>gradient words</span>
            </GradientText>{' '}
            mixed in.
          </p>
        </div>
      </div>
    </div>
  );
}

export function GradientTextControls() {
  const context = useContext(GradientTextControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { injectStyles, setInjectStyles } = context;

  return (
    <div className={styles.controls}>
      <p className={styles.controlDescription}>
        Gradient Text components apply beautiful color gradients to text
        content. Various gradient types and animations are supported for visual
        enhancement.
      </p>
      <Checkbox checked={injectStyles} onChange={setInjectStyles} size="small">
        Inject Styles
      </Checkbox>
    </div>
  );
}
