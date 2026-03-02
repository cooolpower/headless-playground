import { HTMLAttributes } from 'react';
import * as styles from './table.css';

export function Table({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className={styles.tableWrapper}>
      <table className={`${styles.table} ${className || ''}`} {...props}>
        {children}
      </table>
    </div>
  );
}
