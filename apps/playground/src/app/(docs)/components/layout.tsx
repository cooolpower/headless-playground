import * as styles from './layout.css';
import { Sidebar, COMPONENTS_REGISTRY } from '@/components/layout/sidebar';
import { TocProvider } from '@/components/layout/toc-context';
import { TocSidebar } from '@/components/layout/toc';

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TocProvider>
      <div className={styles.mainContent}>
        <Sidebar registry={COMPONENTS_REGISTRY} />
        <div className={styles.mainContentInner}>{children}</div>
        <TocSidebar />
      </div>
    </TocProvider>
  );
}
