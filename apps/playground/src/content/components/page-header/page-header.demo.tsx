'use client';

import { createContext, useContext, useState } from 'react';
import { PageHeader } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import * as styles from './page-header.demo.css';

type PageHeaderControlsContextType = {
  injectStyles: boolean;
  setInjectStyles: (value: boolean) => void;
};

const PageHeaderControlsContext =
  createContext<PageHeaderControlsContextType | null>(null);

export function DemoPageHeaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);

  return (
    <PageHeaderControlsContext.Provider
      value={{ injectStyles, setInjectStyles }}
    >
      {children}
    </PageHeaderControlsContext.Provider>
  );
}

export function DemoPageHeaderWithControls() {
  const context = useContext(PageHeaderControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { injectStyles } = context;

  return (
    <div className={styles.demoContainer}>
      <h3 className={styles.demoTitle}>Page Header Variants</h3>

      {/* Basic Header */}
      <div
        className={`${styles.section} ${!injectStyles ? styles.pageHeaderWrapperClass : ''}`}
      >
        <h4 className={styles.sectionTitle}>Basic Header</h4>
        <div className={styles.headerWrapper}>
          <PageHeader
            injectStyles={injectStyles}
            title={<h1 className={styles.title}>Page Title</h1>}
          />
        </div>
      </div>

      {/* Header with Subtitle */}
      <div
        className={`${styles.section} ${!injectStyles ? styles.pageHeaderWrapperClass : ''}`}
      >
        <h4 className={styles.sectionTitle}>With Subtitle</h4>
        <div className={styles.headerWrapper}>
          <PageHeader
            injectStyles={injectStyles}
            title={<h1 className={styles.title}>Dashboard</h1>}
            subtitle={
              <p className={styles.subtitle}>
                Welcome back! Here's your overview.
              </p>
            }
          />
        </div>
      </div>

      {/* Header with Extra Content */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>With Extra Actions</h4>
        <div className={styles.headerWrapper}>
          <PageHeader
            injectStyles={injectStyles}
            title={<h1 className={styles.title}>User Management</h1>}
            subtitle={
              <p className={styles.subtitle}>
                Manage user accounts and permissions
              </p>
            }
            extra={
              <div className={styles.actions}>
                <button className={styles.button}>Add User</button>
                <button className={`${styles.button} ${styles.secondary}`}>
                  Export
                </button>
              </div>
            }
          />
        </div>
      </div>

      {/* Complex Header */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Complex Header</h4>
        <div className={styles.headerWrapper}>
          <PageHeader
            injectStyles={injectStyles}
            title={
              <div className={styles.titleRow}>
                <h1 className={styles.title}>Project Settings</h1>
                <span className={styles.badge}>Active</span>
              </div>
            }
            subtitle={
              <div className={styles.subtitleRow}>
                <p className={styles.subtitle}>
                  Configure your project preferences
                </p>
                <span className={styles.meta}>Last updated: 2 hours ago</span>
              </div>
            }
            extra={
              <div className={styles.actions}>
                <button className={`${styles.button} ${styles.secondary}`}>
                  Preview
                </button>
                <button className={styles.button}>Save Changes</button>
              </div>
            }
          />
        </div>
      </div>

      {/* Minimal Header */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Minimal Header</h4>
        <div className={styles.headerWrapper}>
          <PageHeader
            injectStyles={injectStyles}
            title={
              <h1 className={`${styles.title} ${styles.minimal}`}>
                Simple Page
              </h1>
            }
          />
        </div>
      </div>
    </div>
  );
}

export function DemoPageHeader() {
  return <DemoPageHeaderWithControls />;
}

export function DemoPageHeaderControls() {
  const context = useContext(PageHeaderControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { injectStyles, setInjectStyles } = context;

  return (
    <div className={styles.controls}>
      <p className={styles.controlDescription}>
        Page Header components provide consistent layout for page titles,
        subtitles, and action buttons. They help users understand the current
        page context and available actions.
      </p>
      <Checkbox checked={injectStyles} onChange={setInjectStyles} size="small">
        Inject Styles
      </Checkbox>
    </div>
  );
}
