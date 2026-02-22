import * as styles from '../components/layout.css';
import { Sidebar, DOCS_REGISTRY } from '@/components/layout/sidebar';
import { TocProvider } from '@/components/layout/toc-context';
import { TocSidebar } from '@/components/layout/toc';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TocProvider>
      <div className={styles.mainContent}>
        <Sidebar registry={DOCS_REGISTRY} />
        <div className={styles.mainContentInner}>{children}</div>
        <TocSidebar />
      </div>
    </TocProvider>
  );
}
