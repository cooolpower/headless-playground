'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { Toast } from '@cooolpower/headless-ui';

interface ToastItem {
  id: number;
  message?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  type?: 'primary' | 'secondary' | 'tertiary' | 'dashed' | 'quaternary';
  color?: 'success' | 'info' | 'warning' | 'error' | 'theme';
  duration?: number;
  onClose?: () => void;
  placement?:
    | 'top'
    | 'top-left'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'
    | 'center';
  showIcon?: boolean;
  showProgress?: boolean;
  showClose?: boolean;
}

interface GlobalToastContextType {
  toast: (options: Omit<ToastItem, 'id'>) => void;
}

const GlobalToastContext = createContext<GlobalToastContextType | undefined>(
  undefined,
);

export function useGlobalToast() {
  const context = useContext(GlobalToastContext);
  if (!context) {
    throw new Error('useGlobalToast must be used within a GlobalToastProvider');
  }
  return context;
}

export function GlobalToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const maxCount = 5;

  const toast = useCallback((options: Omit<ToastItem, 'id'>) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => {
      const newToasts = [...prev, { ...options, id }];
      return newToasts.slice(-maxCount);
    });
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <GlobalToastContext.Provider value={{ toast }}>
      {children}
      {/* 전역 공간 최상단 어딘가에서 Toasts를 렌더링 */}
      {toasts.map((t, index) => {
        // 같은 placement를 가진 Toast들 중에서의 index 계산 (Stacking 용)
        const samePlacementToasts = toasts.filter(
          (item) => (item.placement || 'top') === (t.placement || 'top'),
        );
        const stackIndex = samePlacementToasts.findIndex(
          (item) => item.id === t.id,
        );

        return (
          <Toast
            key={t.id}
            {...t}
            index={stackIndex}
            maxCount={maxCount}
            onClose={() => {
              t.onClose?.();
              removeToast(t.id);
            }}
          />
        );
      })}
    </GlobalToastContext.Provider>
  );
}
