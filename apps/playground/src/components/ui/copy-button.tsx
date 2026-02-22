'use client';

import { useState, useCallback } from 'react';
import { Check, Copy } from 'lucide-react';
import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/vars.css';

// Styles (could be moved to a separate .css.ts file for better separation)
import * as styles from './copy-button.css';

interface CopyButtonProps {
  value: string;
  className?: string;
}

export function CopyButton({ value, className }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  }, [value]);

  return (
    <button
      onClick={copy}
      className={`${styles.copyButton} ${className || ''}`}
      aria-label="Copy to clipboard"
      title="Copy to clipboard"
    >
      {isCopied ? (
        <Check className={styles.iconSuccess} size={14} />
      ) : (
        <Copy className={styles.icon} size={14} />
      )}
    </button>
  );
}
