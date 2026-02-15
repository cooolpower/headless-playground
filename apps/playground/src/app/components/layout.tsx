import * as styles from './layout.css';
import { Sidebar } from '@/components/layout/sidebar';

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={styles.mainContent}>
        <Sidebar />
        <div className={styles.mainContentInner}>{children}</div>
      </div>
    </>
  );
}
