'use client';

import { useRef, useEffect, useState, HTMLAttributes } from 'react';
import { CopyButton } from '@/components/ui/copy-button';
import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/vars.css';

// Styles
import * as styles from './pre.css';

interface PreProps extends HTMLAttributes<HTMLPreElement> {
  // rehype-pretty-code might pass custom props like 'data-language'
  raw?: string;
}

export function Pre({ children, className, raw, ...props }: PreProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [textToCopy, setTextToCopy] = useState<string>('');

  useEffect(() => {
    // If a raw string is passed, use it, otherwise extract textContent from DOM
    if (raw) {
      setTextToCopy(raw);
    } else if (preRef.current) {
      setTextToCopy(preRef.current.textContent || '');
    }
  }, [children, raw]);

  return (
    <div className={styles.preWrapper}>
      <pre
        ref={preRef}
        className={`${styles.pre} ${className || ''}`}
        {...props}
      >
        {children}
      </pre>
      <div className={styles.copyButtonWrapper}>
        <CopyButton value={textToCopy} />
      </div>
    </div>
  );
}
