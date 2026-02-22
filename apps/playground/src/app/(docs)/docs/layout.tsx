import * as styles from '../components/layout.css';
import { Sidebar, DOCS_REGISTRY } from '@/components/layout/sidebar';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={styles.mainContent}>
        <Sidebar registry={DOCS_REGISTRY} />
        <div className={styles.mainContentInner}>{children}</div>
      </div>
    </>
  );
}
