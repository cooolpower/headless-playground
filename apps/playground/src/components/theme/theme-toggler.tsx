import React from 'react';
import { useTheme } from './theme-provider';
import * as styles from './theme-toggler.css';

export interface ThemeTogglerProps {
  className?: string;
  showLabel?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function ThemeToggler({
  className,
  showLabel = true,
  size = 'medium',
}: ThemeTogglerProps) {
  const { isDark, toggleDark } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleDark}
      className={`${styles.themeToggler} ${styles.size[size]} ${className || ''}`}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      <span className={styles.icon}>{isDark ? '☀️' : '🌙'}</span>
      {showLabel && (
        <span className={styles.label}>{isDark ? '라이트' : '다크'}</span>
      )}
    </button>
  );
}

export function ThemeSelector({ className }: { className?: string }) {
  const { theme, themes, setThemeByName } = useTheme();

  return (
    <select
      value={theme.name}
      onChange={(e) => setThemeByName(e.target.value)}
      className={`${styles.themeSelector} ${className || ''}`}
    >
      {Object.keys(themes).map((themeName) => (
        <option key={themeName} value={themeName}>
          {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
        </option>
      ))}
    </select>
  );
}
