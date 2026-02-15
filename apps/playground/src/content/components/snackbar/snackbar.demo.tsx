'use client';

import { useState } from 'react';
import { Snackbar } from '@repo/ui';
import { Button } from '@repo/ui';
import * as styles from './snackbar.demo.css';

export function DemoSnackbarBasic() {
  const [snackbars, setSnackbars] = useState<
    Array<{ id: number; message: string }>
  >([]);
  const maxCount = 5; // 최대 5개까지 표시

  const showSnackbar = (message: string) => {
    const id = Date.now();
    setSnackbars((prev) => {
      const newSnackbars = [...prev, { id, message }];
      // maxCount를 초과하면 가장 오래된 것부터 제거
      return newSnackbars.slice(-maxCount);
    });
  };

  const removeSnackbar = (id: number) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonGroup}>
        <Button onClick={() => showSnackbar('메시지가 전송되었습니다.')}>
          기본 Snackbar
        </Button>
      </div>
      {snackbars.map((snackbar, index) => (
        <Snackbar
          key={snackbar.id}
          message={snackbar.message}
          onClose={() => removeSnackbar(snackbar.id)}
          duration={4000}
          index={index}
          maxCount={maxCount}
        />
      ))}
    </div>
  );
}

export function DemoSnackbarWithProgress() {
  const [snackbars, setSnackbars] = useState<
    Array<{ id: number; message: string; duration: number }>
  >([]);
  const maxCount = 5;

  const showSnackbar = (message: string, duration: number = 4000) => {
    const id = Date.now();
    setSnackbars((prev) => {
      const newSnackbars = [...prev, { id, message, duration }];
      return newSnackbars.slice(-maxCount);
    });
  };

  const removeSnackbar = (id: number) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonGroup}>
        <Button
          onClick={() => showSnackbar('프로그레스 바가 있는 Snackbar', 4000)}
        >
          Snackbar with Progress (4초)
        </Button>
        <Button onClick={() => showSnackbar('5초 후 사라집니다', 5000)}>
          Snackbar with Progress (5초)
        </Button>
        <Button onClick={() => showSnackbar('3초 후 사라집니다', 3000)}>
          Snackbar with Progress (3초)
        </Button>
        <Button onClick={() => showSnackbar('20초 후 사라집니다', 100000)}>
          Snackbar with Progress (100초)
        </Button>
      </div>
      {snackbars.map((snackbar, index) => (
        <Snackbar
          key={snackbar.id}
          message={snackbar.message}
          onClose={() => removeSnackbar(snackbar.id)}
          duration={snackbar.duration}
          closable={snackbar.duration === 0}
          index={index}
          maxCount={maxCount}
          showProgress
        />
      ))}
    </div>
  );
}

export function DemoSnackbarWithAction() {
  const [snackbars, setSnackbars] = useState<
    Array<{ id: number; message: string }>
  >([]);

  const showSnackbar = (message: string) => {
    const id = Date.now();
    setSnackbars((prev) => [...prev, { id, message }]);
  };

  const removeSnackbar = (id: number) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonGroup}>
        <Button onClick={() => showSnackbar('파일이 삭제되었습니다.')}>
          액션 버튼과 함께
        </Button>
      </div>
      {snackbars.map((snackbar, index) => (
        <Snackbar
          key={snackbar.id}
          message={snackbar.message}
          action={
            <Button
              onClick={() => {
                alert('실행 취소되었습니다.');
                removeSnackbar(snackbar.id);
              }}
              style={{
                color: 'var(--color-brand-primary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 8px',
                fontSize: '14px',
                fontWeight: '500',
                minWidth: 'auto',
              }}
            >
              실행 취소
            </Button>
          }
          onClose={() => removeSnackbar(snackbar.id)}
          duration={4000}
          index={index}
          maxCount={5}
        />
      ))}
    </div>
  );
}

export function DemoSnackbarClosable() {
  const [snackbars, setSnackbars] = useState<
    Array<{ id: number; message: string }>
  >([]);

  const showSnackbar = (message: string) => {
    const id = Date.now();
    setSnackbars((prev) => [...prev, { id, message }]);
  };

  const removeSnackbar = (id: number) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonGroup}>
        <Button
          onClick={() => showSnackbar('닫기 버튼이 있는 Snackbar입니다.')}
        >
          닫기 가능한 Snackbar
        </Button>
      </div>
      {snackbars.map((snackbar, index) => (
        <Snackbar
          key={snackbar.id}
          message={snackbar.message}
          closable
          onClose={() => removeSnackbar(snackbar.id)}
          duration={0}
          index={index}
          maxCount={5}
        />
      ))}
    </div>
  );
}

export function DemoSnackbarPlacement() {
  const [snackbars, setSnackbars] = useState<
    Array<{
      id: number;
      placement: 'bottom' | 'bottom-left' | 'bottom-right';
      message: string;
    }>
  >([]);

  const showSnackbar = (
    placement: 'bottom' | 'bottom-left' | 'bottom-right',
    message: string,
  ) => {
    const id = Date.now();
    setSnackbars((prev) => [...prev, { id, placement, message }]);
  };

  const removeSnackbar = (id: number) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonGroup}>
        <Button
          onClick={() => showSnackbar('bottom', '하단 중앙에 표시됩니다.')}
        >
          Bottom Center
        </Button>
        <Button
          onClick={() => showSnackbar('bottom-left', '하단 왼쪽에 표시됩니다.')}
        >
          Bottom Left
        </Button>
        <Button
          onClick={() =>
            showSnackbar('bottom-right', '하단 오른쪽에 표시됩니다.')
          }
        >
          Bottom Right
        </Button>
      </div>
      {snackbars.map((snackbar) => {
        // 같은 placement를 가진 Snackbar들 중에서의 index 계산
        const samePlacementSnackbars = snackbars.filter(
          (s) => s.placement === snackbar.placement,
        );
        const index = samePlacementSnackbars.findIndex(
          (s) => s.id === snackbar.id,
        );

        return (
          <Snackbar
            key={snackbar.id}
            message={snackbar.message}
            placement={snackbar.placement}
            onClose={() => removeSnackbar(snackbar.id)}
            duration={4000}
            index={index}
            maxCount={5}
          />
        );
      })}
    </div>
  );
}

export function DemoSnackbarDuration() {
  const [snackbars, setSnackbars] = useState<
    Array<{ id: number; duration: number; message: string }>
  >([]);

  const showSnackbar = (duration: number, message: string) => {
    const id = Date.now();
    setSnackbars((prev) => [...prev, { id, duration, message }]);
  };

  const removeSnackbar = (id: number) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonGroup}>
        <Button
          onClick={() => showSnackbar(2000, '2초 후 자동으로 사라집니다.')}
        >
          2초
        </Button>
        <Button
          onClick={() => showSnackbar(4000, '4초 후 자동으로 사라집니다.')}
        >
          4초
        </Button>
        <Button
          onClick={() => showSnackbar(6000, '6초 후 자동으로 사라집니다.')}
        >
          6초
        </Button>
        <Button onClick={() => showSnackbar(0, '자동으로 사라지지 않습니다.')}>
          영구
        </Button>
      </div>
      {snackbars.map((snackbar, index) => (
        <Snackbar
          key={snackbar.id}
          message={snackbar.message}
          duration={snackbar.duration}
          closable={snackbar.duration === 0}
          onClose={() => removeSnackbar(snackbar.id)}
          index={index}
          maxCount={5}
        />
      ))}
    </div>
  );
}

export function DemoSnackbarMaxCount() {
  const [snackbars, setSnackbars] = useState<
    Array<{ id: number; message: string }>
  >([]);
  const maxCount = 3; // 최대 3개까지 표시

  const showSnackbar = (message: string) => {
    const id = Date.now();
    setSnackbars((prev) => {
      const newSnackbars = [...prev, { id, message }];
      // maxCount를 초과하면 가장 오래된 것부터 제거
      return newSnackbars.slice(-maxCount);
    });
  };

  const removeSnackbar = (id: number) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonGroup}>
        <Button onClick={() => showSnackbar('Snackbar 1')}>Snackbar 1</Button>
        <Button onClick={() => showSnackbar('Snackbar 2')}>Snackbar 2</Button>
        <Button onClick={() => showSnackbar('Snackbar 3')}>Snackbar 3</Button>
        <Button onClick={() => showSnackbar('Snackbar 4')}>Snackbar 4</Button>
        <Button onClick={() => showSnackbar('Snackbar 5')}>Snackbar 5</Button>
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
      {snackbars.map((snackbar, index) => (
        <Snackbar
          key={snackbar.id}
          message={snackbar.message}
          onClose={() => removeSnackbar(snackbar.id)}
          duration={4000}
          index={index}
          maxCount={maxCount}
        />
      ))}
    </div>
  );
}
