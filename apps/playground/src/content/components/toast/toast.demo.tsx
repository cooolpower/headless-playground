'use client';

import { useState } from 'react';
import { Toast } from '@repo/ui';
import { Button } from '@repo/ui';
import * as styles from './toast.demo.css';

export function DemoToastBasic() {
  const [toasts, setToasts] = useState<
    Array<{
      id: number;
      type: 'success' | 'info' | 'warning' | 'error';
      message: string;
      duration?: number;
      showProgress?: boolean;
    }>
  >([]);
  const maxCount = 5; // 최대 5개까지 표시

  const showToast = (
    type: 'success' | 'info' | 'warning' | 'error',
    message: string,
    options?: { duration?: number; showProgress?: boolean },
  ) => {
    const id = Date.now();
    setToasts((prev) => {
      const newToasts = [
        ...prev,
        {
          id,
          type,
          message,
          duration: options?.duration,
          showProgress: options?.showProgress,
        },
      ];
      // maxCount를 초과하면 가장 오래된 것부터 제거
      return newToasts.slice(-maxCount);
    });
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonGroup}>
        <Button
          onClick={() =>
            showToast('success', '작업이 성공적으로 완료되었습니다!')
          }
        >
          Success Toast
        </Button>
        <Button onClick={() => showToast('info', '정보 메시지입니다.')}>
          Info Toast
        </Button>
        <Button onClick={() => showToast('warning', '경고 메시지입니다.')}>
          Warning Toast
        </Button>
        <Button onClick={() => showToast('error', '오류가 발생했습니다.')}>
          Error Toast
        </Button>
      </div>
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
          duration={toast.duration ?? 3000}
          index={index}
          maxCount={maxCount}
          showProgress={toast.showProgress ?? false}
        />
      ))}
    </div>
  );
}

export function DemoToastWithProgress() {
  const [toasts, setToasts] = useState<
    Array<{
      id: number;
      type: 'success' | 'info' | 'warning' | 'error';
      message: string;
      duration?: number;
      showProgress?: boolean;
    }>
  >([]);
  const maxCount = 5;

  const showToast = (
    type: 'success' | 'info' | 'warning' | 'error',
    message: string,
    options?: { duration?: number; showProgress?: boolean },
  ) => {
    const id = Date.now();
    setToasts((prev) => {
      const newToasts = [
        ...prev,
        {
          id,
          type,
          message,
          duration: options?.duration,
          showProgress: options?.showProgress,
        },
      ];
      return newToasts.slice(-maxCount);
    });
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonGroup}>
        <Button
          onClick={() =>
            showToast('success', '프로그레스 바가 있는 Toast', {
              duration: 3000,
              showProgress: true,
            })
          }
        >
          Success with Progress
        </Button>
        <Button
          onClick={() =>
            showToast('info', '5초 후 사라집니다', {
              duration: 5000,
              showProgress: true,
            })
          }
        >
          Info with Progress (5초)
        </Button>
        <Button
          onClick={() =>
            showToast('warning', '3초 후 사라집니다', {
              duration: 3000,
              showProgress: true,
            })
          }
        >
          Warning with Progress (3초)
        </Button>
      </div>
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
          duration={toast.duration ?? 3000}
          index={index}
          maxCount={maxCount}
          showProgress={toast.showProgress ?? true}
        />
      ))}
    </div>
  );
}

export function DemoToastWithIcon() {
  const [toasts, setToasts] = useState<
    Array<{
      id: number;
      type: 'success' | 'info' | 'warning' | 'error';
      message: string;
    }>
  >([]);

  const showToast = (
    type: 'success' | 'info' | 'warning' | 'error',
    message: string,
  ) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonGroup}>
        <Button
          onClick={() =>
            showToast('success', '데이터가 성공적으로 저장되었습니다.')
          }
        >
          Success with Icon
        </Button>
        <Button
          onClick={() => showToast('info', '새로운 업데이트가 있습니다.')}
        >
          Info with Icon
        </Button>
        <Button onClick={() => showToast('warning', '입력을 확인해주세요.')}>
          Warning with Icon
        </Button>
        <Button
          onClick={() => showToast('error', '서버에 연결할 수 없습니다.')}
        >
          Error with Icon
        </Button>
      </div>
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          showIcon
          onClose={() => removeToast(toast.id)}
          duration={3000}
          index={index}
          maxCount={5}
        />
      ))}
    </div>
  );
}

export function DemoToastPlacement() {
  const [toasts, setToasts] = useState<
    Array<{
      id: number;
      placement:
        | 'top'
        | 'top-left'
        | 'top-right'
        | 'bottom'
        | 'bottom-left'
        | 'bottom-right';
      message: string;
    }>
  >([]);

  const showToast = (
    placement:
      | 'top'
      | 'top-left'
      | 'top-right'
      | 'bottom'
      | 'bottom-left'
      | 'bottom-right',
    message: string,
  ) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, placement, message }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonGroup}>
        <Button onClick={() => showToast('top', '상단 중앙에 표시됩니다.')}>
          Top Center
        </Button>
        <Button
          onClick={() => showToast('top-left', '상단 왼쪽에 표시됩니다.')}
        >
          Top Left
        </Button>
        <Button
          onClick={() => showToast('top-right', '상단 오른쪽에 표시됩니다.')}
        >
          Top Right
        </Button>
        <Button onClick={() => showToast('bottom', '하단 중앙에 표시됩니다.')}>
          Bottom Center
        </Button>
        <Button
          onClick={() => showToast('bottom-left', '하단 왼쪽에 표시됩니다.')}
        >
          Bottom Left
        </Button>
        <Button
          onClick={() => showToast('bottom-right', '하단 오른쪽에 표시됩니다.')}
        >
          Bottom Right
        </Button>
      </div>
      {toasts.map((toast) => {
        // 같은 placement를 가진 Toast들 중에서의 index 계산
        const samePlacementToasts = toasts.filter(
          (t) => t.placement === toast.placement,
        );
        const index = samePlacementToasts.findIndex((t) => t.id === toast.id);

        return (
          <Toast
            key={toast.id}
            message={toast.message}
            placement={toast.placement}
            onClose={() => removeToast(toast.id)}
            duration={3000}
            index={index}
            maxCount={5}
          />
        );
      })}
    </div>
  );
}

export function DemoToastDuration() {
  const [toasts, setToasts] = useState<
    Array<{ id: number; duration: number; message: string }>
  >([]);

  const showToast = (duration: number, message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, duration, message }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonGroup}>
        <Button onClick={() => showToast(1000, '1초 후 자동으로 사라집니다.')}>
          1초
        </Button>
        <Button onClick={() => showToast(3000, '3초 후 자동으로 사라집니다.')}>
          3초
        </Button>
        <Button onClick={() => showToast(5000, '5초 후 자동으로 사라집니다.')}>
          5초
        </Button>
        <Button onClick={() => showToast(0, '자동으로 사라지지 않습니다.')}>
          영구
        </Button>
      </div>
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          message={toast.message}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
          index={index}
          maxCount={5}
        />
      ))}
    </div>
  );
}

export function DemoToastMaxCount() {
  const [toasts, setToasts] = useState<Array<{ id: number; message: string }>>(
    [],
  );
  const maxCount = 3; // 최대 3개까지 표시

  const showToast = (message: string) => {
    const id = Date.now();
    setToasts((prev) => {
      const newToasts = [...prev, { id, message }];
      // maxCount를 초과하면 가장 오래된 것부터 제거
      return newToasts.slice(-maxCount);
    });
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonGroup}>
        <Button onClick={() => showToast('Toast 1')}>Toast 1</Button>
        <Button onClick={() => showToast('Toast 2')}>Toast 2</Button>
        <Button onClick={() => showToast('Toast 3')}>Toast 3</Button>
        <Button onClick={() => showToast('Toast 4')}>Toast 4</Button>
        <Button onClick={() => showToast('Toast 5')}>Toast 5</Button>
      </div>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--color-text-secondary)',
          marginTop: '8px',
        }}
      >
        최대 {maxCount}개까지 표시됩니다. 더 많이 추가하면 가장 오래된 것부터
        사라집니다.
      </p>
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type="info"
          onClose={() => removeToast(toast.id)}
          duration={3000}
          index={index}
          maxCount={maxCount}
        />
      ))}
    </div>
  );
}
