'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Icon } from '@repo/ui';
import * as styles from './theme-toggle.css';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // layout.tsx의 스크립트에서 이미 테마가 적용되어 있으므로
    // 현재 적용된 테마를 읽어와서 상태 동기화
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme) {
      setIsDark(currentTheme === 'dark');
    } else {
      // 테마가 설정되지 않았다면 localStorage 또는 시스템 설정 확인
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setIsDark(savedTheme === 'dark');
        document.documentElement.setAttribute('data-theme', savedTheme);
      } else {
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)',
        ).matches;
        setIsDark(prefersDark);
        const theme = prefersDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
      }
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    const theme = newIsDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  if (!mounted) {
    // SSR 방지: 클라이언트에서만 렌더링
    return (
      <div
        className={styles.themeToggle}
        style={{ opacity: 0, pointerEvents: 'none' }}
      >
        <Icon icon={Moon} size="medium" />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={styles.themeToggle}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      title={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      <Icon
        icon={isDark ? Sun : Moon}
        size="medium"
        className={styles.themeIcon}
      />
    </button>
  );
}
