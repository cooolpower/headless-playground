import * as styles from './layout.css';
import { Sidebar, COMPONENTS_REGISTRY } from '@/components/layout/sidebar';

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={styles.mainContent}>
        <Sidebar registry={COMPONENTS_REGISTRY} />
        <div className={styles.mainContentInner}>{children}</div>
      </div>
    </>
  );
}
