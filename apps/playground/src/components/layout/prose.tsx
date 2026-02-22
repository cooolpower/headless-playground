import { ReactNode } from 'react';
import * as styles from './prose.css';

interface ProseProps {
  children: ReactNode;
  className?: string;
}

export function Prose({ children, className }: ProseProps) {
  return <div className={`${styles.prose} ${className || ''}`}>{children}</div>;
}
