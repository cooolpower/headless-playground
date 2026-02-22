'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import {
  Toast,
  Button,
  Input,
  Checkbox,
  Slider,
  Textarea,
  InputNumber,
} from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import * as styles from './toast.demo.css';

// Toast 컨트롤을 위한 컨텍스트 정의
interface ToastControlsContextType {
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  type: 'primary' | 'secondary' | 'tertiary' | 'dashed' | 'quaternary';
  setType: (
    v: 'primary' | 'secondary' | 'tertiary' | 'dashed' | 'quaternary',
  ) => void;
  color: 'success' | 'info' | 'warning' | 'error' | 'theme';
  setColor: (v: 'success' | 'info' | 'warning' | 'error' | 'theme') => void;
  placement:
    | 'top'
    | 'top-left'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'
    | 'center';
  setPlacement: (
    v:
      | 'top'
      | 'top-left'
      | 'top-right'
      | 'bottom'
      | 'bottom-left'
      | 'bottom-right'
      | 'center',
  ) => void;
  duration: number;
  setDuration: (v: number) => void;
  showIcon: boolean;
  setShowIcon: (v: boolean) => void;
  showProgress: boolean;
  setShowProgress: (v: boolean) => void;
  showClose: boolean;
  setShowClose: (v: boolean) => void;
  maxCount: number;
  setMaxCount: (v: number) => void;
  injectStyles: boolean;
  setInjectStyles: (v: boolean) => void;
}

const ToastControlsContext = createContext<
  ToastControlsContextType | undefined
>(undefined);

export function ToastControlsProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [title, setTitle] = useState('알림 타이틀');
  const [description, setDescription] = useState(
    '이것은 토스트 알림의 상세 설명글입니다. 2줄이 넘어가면 말줄임표가 표시되는지 확인해 보세요.\n이것은 개행 테스트를 위한 두 번째 줄입니다.',
  );
  const [type, setType] = useState<
    'primary' | 'secondary' | 'tertiary' | 'dashed' | 'quaternary'
  >('primary');
  const [color, setColor] = useState<
    'success' | 'info' | 'warning' | 'error' | 'theme'
  >('theme');
  const [placement, setPlacement] = useState<
    | 'top'
    | 'top-left'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'
    | 'center'
  >('bottom-right');
  const [duration, setDuration] = useState(3000);
  const [showIcon, setShowIcon] = useState(true);
  const [showProgress, setShowProgress] = useState(true);
  const [showClose, setShowClose] = useState(false);
  const [maxCount, setMaxCount] = useState(5);
  const [injectStyles, setInjectStyles] = useState(true);

  // 로컬 스토리지에서 상태 복원
  useEffect(() => {
    const saved = localStorage.getItem('hc-toast-demo-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.title) setTitle(parsed.title);
        if (parsed.description) setDescription(parsed.description);
        if (parsed.type) setType(parsed.type);
        if (parsed.color) setColor(parsed.color);
        if (parsed.placement) setPlacement(parsed.placement);
        if (parsed.duration !== undefined) setDuration(parsed.duration);
        if (parsed.showIcon !== undefined) setShowIcon(parsed.showIcon);
        if (parsed.showProgress !== undefined)
          setShowProgress(parsed.showProgress);
        if (parsed.showClose !== undefined) setShowClose(parsed.showClose);
        if (parsed.maxCount !== undefined) setMaxCount(parsed.maxCount);
        if (parsed.injectStyles !== undefined)
          setInjectStyles(parsed.injectStyles);
      } catch (e) {
        console.error('Failed to parse toast settings', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // 상태 변경 시 로컬 스토리지 저장
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        'hc-toast-demo-settings',
        JSON.stringify({
          title,
          description,
          type,
          color,
          placement,
          duration,
          showIcon,
          showProgress,
          showClose,
          maxCount,
          injectStyles,
        }),
      );
    }
  }, [
    title,
    description,
    type,
    color,
    placement,
    duration,
    showIcon,
    showProgress,
    showClose,
    maxCount,
    injectStyles,
    isLoaded,
  ]);

  return (
    <ToastControlsContext.Provider
      value={{
        title,
        setTitle,
        description,
        setDescription,
        type,
        setType,
        color,
        setColor,
        placement,
        setPlacement,
        duration,
        setDuration,
        showIcon,
        setShowIcon,
        showProgress,
        setShowProgress,
        showClose,
        setShowClose,
        maxCount,
        setMaxCount,
        injectStyles,
        setInjectStyles,
      }}
    >
      {children}
    </ToastControlsContext.Provider>
  );
}

export function ToastInteractiveControls() {
  const context = useContext(ToastControlsContext);
  if (!context) return null;

  const {
    title,
    setTitle,
    description,
    setDescription,
    color,
    setColor,
    placement,
    setPlacement,
    duration,
    setDuration,
    showIcon,
    setShowIcon,
    showProgress,
    setShowProgress,
    showClose,
    setShowClose,
    maxCount,
    setMaxCount,
    injectStyles,
    setInjectStyles,
  } = context;

  return (
    <Controls
      items={[
        {
          label: '타이틀 (Title)',
          control: (
            <Input
              value={title}
              onChange={(v) => setTitle(v)}
              placeholder="알림 타이틀을 입력하세요"
            />
          ),
        },
        {
          label: '설명 (Description)',
          control: (
            <Textarea
              value={description}
              onChange={setDescription}
              placeholder="알림 상세 내용을 입력하세요"
              textareaStyle={{
                minHeight: '80px',
                fontSize: '13px',
              }}
            />
          ),
        },
        {
          label: '색상 (Color)',
          control: (
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {(['info', 'success', 'warning', 'error', 'theme'] as const).map(
                (t) => (
                  <Button
                    key={t}
                    onClick={() => setColor(t)}
                    type={color === t ? 'default' : 'tertiary'}
                    color="default"
                    size="small"
                  >
                    {t}
                  </Button>
                ),
              )}
            </div>
          ),
        },
        {
          label: '위치 (Placement)',
          control: (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '4px',
              }}
            >
              {(
                [
                  'top-left',
                  'top',
                  'top-right',
                  'bottom-left',
                  'bottom',
                  'bottom-right',
                  'center',
                ] as const
              ).map((p) => (
                <Button
                  key={p}
                  onClick={() => setPlacement(p)}
                  type={placement === p ? 'default' : 'tertiary'}
                  style={{
                    fontSize: 'var(--font-size-sm, 12px)',
                    gridColumn: p === 'center' ? '1 / -1' : 'auto',
                  }}
                  color="default"
                  size="small"
                >
                  {p}
                </Button>
              ))}
            </div>
          ),
        },
        {
          label: '지속 시간 (Duration, ms)',
          control: (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Slider
                min={0}
                max={10000}
                step={500}
                value={duration}
                onChange={(v) => setDuration(Array.isArray(v) ? v[0] : v)}
              />
              <span style={{ fontSize: '11px', minWidth: '45px' }}>
                {duration === 0 ? '영구' : `${duration}ms`}
              </span>
            </div>
          ),
        },
        {
          label: '표시 설정 (Display)',
          control: (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
              }}
            >
              <Checkbox checked={showIcon} onChange={setShowIcon}>
                아이콘
              </Checkbox>
              <Checkbox checked={showProgress} onChange={setShowProgress}>
                프로그레스
              </Checkbox>
              <Checkbox checked={showClose} onChange={setShowClose}>
                닫기 버튼
              </Checkbox>
              <Checkbox checked={injectStyles} onChange={setInjectStyles}>
                스타일 주입
              </Checkbox>
            </div>
          ),
        },
        {
          label: '최대 표시 개수 (Max Count)',
          control: (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <InputNumber
                min={1}
                max={10}
                value={maxCount}
                onChange={(v) => setMaxCount(v ?? 5)}
                size="small"
              />
            </div>
          ),
        },
      ]}
    />
  );
}

export function DemoToastBasicWithControls() {
  const context = useContext(ToastControlsContext);
  if (!context) return null;

  const {
    title,
    description,
    color,
    placement,
    duration,
    showIcon,
    showProgress,
    showClose,
    maxCount,
    injectStyles,
  } = context;

  const [toasts, setToasts] = useState<
    Array<{
      id: number;
      title?: string;
      description?: string;
      color: any;
      placement: any;
      duration: number;
      showIcon: boolean;
      showProgress: boolean;
      showClose: boolean;
      injectStyles: boolean;
    }>
  >([]);

  const triggerToast = useCallback(() => {
    const id = Date.now();
    setToasts((prev) => {
      const newList = [
        ...prev,
        {
          id,
          title,
          description,
          color,
          placement,
          duration,
          showIcon,
          showProgress,
          showClose,
          injectStyles,
        },
      ];
      console.log(
        'Toast triggered (interactive):',
        newList[newList.length - 1],
      );
      return newList.slice(-maxCount);
    });
  }, [
    title,
    description,
    color,
    placement,
    duration,
    showIcon,
    showProgress,
    showClose,
    maxCount,
  ]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <div className={styles.container}>
      <Button
        type="primary"
        onClick={triggerToast}
        style={{ width: 'fit-content' }}
      >
        Show Toast
      </Button>

      {toasts.map((t, index) => (
        <Toast
          key={t.id}
          title={t.title}
          description={t.description}
          color={t.color}
          placement={t.placement}
          duration={t.duration}
          showIcon={t.showIcon}
          showProgress={t.showProgress}
          showClose={t.showClose}
          index={index}
          maxCount={maxCount}
          injectStyles={injectStyles}
          onClose={() => removeToast(t.id)}
        />
      ))}
    </div>
  );
}

export function DemoToastBasic() {
  const context = useContext(ToastControlsContext);
  const injectStyles = context?.injectStyles ?? true;
  const [toasts, setToasts] = useState<
    Array<{
      id: number;
      color: 'success' | 'info' | 'warning' | 'error' | 'theme';
      message: string;
      duration?: number;
      showProgress?: boolean;
    }>
  >([]);
  const maxCount = 5; // 최대 5개까지 표시

  const showToast = (
    color: 'success' | 'info' | 'warning' | 'error' | 'theme',
    message: string,
    options?: { duration?: number; showProgress?: boolean },
  ) => {
    const id = Date.now();
    setToasts((prev) => {
      const newToasts = [
        ...prev,
        {
          id,
          color,
          message,
          duration: options?.duration,
          showProgress: options?.showProgress,
        },
      ];
      console.log(`Toast show (${color}):`, message);
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
          type="primary"
          color="success"
          injectStyles={injectStyles}
          onClick={() =>
            showToast('success', '작업이 성공적으로 완료되었습니다!')
          }
        >
          Success Toast
        </Button>
        <Button
          type="primary"
          color="info"
          injectStyles={injectStyles}
          onClick={() => showToast('info', '정보 메시지입니다.')}
        >
          Info Toast
        </Button>
        <Button
          type="primary"
          color="warning"
          injectStyles={injectStyles}
          onClick={() => showToast('warning', '경고 메시지입니다.')}
        >
          Warning Toast
        </Button>
        <Button
          type="primary"
          color="error"
          injectStyles={injectStyles}
          onClick={() => showToast('error', '오류가 발생했습니다.')}
        >
          Error Toast
        </Button>
        <Button
          type="primary"
          color="default"
          injectStyles={injectStyles}
          onClick={() => showToast('theme', '테마 색상 메시지입니다.')}
        >
          Theme Toast
        </Button>
      </div>
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={'primary'}
          color={toast.color}
          onClose={() => removeToast(toast.id)}
          duration={toast.duration ?? 3000}
          index={index}
          maxCount={maxCount}
          showProgress={toast.showProgress ?? false}
          injectStyles={injectStyles}
        />
      ))}
    </div>
  );
}

export function DemoToastWithProgress() {
  const context = useContext(ToastControlsContext);
  const injectStyles = context?.injectStyles ?? true;
  const [toasts, setToasts] = useState<
    Array<{
      id: number;
      //type: 'primary' | 'secondary' | 'tertiary' | 'dashed' | 'quaternary';
      color: 'success' | 'info' | 'warning' | 'error';
      message: string;
      duration?: number;
      showProgress?: boolean;
    }>
  >([]);
  const maxCount = 5;

  const showToast = (
    color: 'success' | 'info' | 'warning' | 'error',
    message: string,
    options?: { duration?: number; showProgress?: boolean },
  ) => {
    const id = Date.now();
    setToasts((prev) => {
      const newToasts = [
        ...prev,
        {
          id,
          color,
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
          type="primary"
          color="default"
          injectStyles={injectStyles}
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
          type="primary"
          color="default"
          injectStyles={injectStyles}
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
          type="primary"
          color="default"
          injectStyles={injectStyles}
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
          color={toast.color}
          onClose={() => removeToast(toast.id)}
          duration={toast.duration ?? 3000}
          index={index}
          maxCount={maxCount}
          showProgress={toast.showProgress ?? true}
          injectStyles={injectStyles}
        />
      ))}
    </div>
  );
}

export function DemoToastWithIcon() {
  const context = useContext(ToastControlsContext);
  const injectStyles = context?.injectStyles ?? true;
  const [toasts, setToasts] = useState<
    Array<{
      id: number;
      color: 'success' | 'info' | 'warning' | 'error';
      message: string;
    }>
  >([]);

  const showToast = (
    color: 'success' | 'info' | 'warning' | 'error',
    message: string,
  ) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, color, message }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonGroup}>
        <Button
          type="primary"
          color="success"
          injectStyles={injectStyles}
          onClick={() =>
            showToast('success', '데이터가 성공적으로 저장되었습니다.')
          }
        >
          Success with Icon
        </Button>
        <Button
          type="primary"
          color="info"
          injectStyles={injectStyles}
          onClick={() => showToast('info', '새로운 업데이트가 있습니다.')}
        >
          Info with Icon
        </Button>
        <Button
          type="primary"
          color="warning"
          injectStyles={injectStyles}
          onClick={() => showToast('warning', '입력을 확인해주세요.')}
        >
          Warning with Icon
        </Button>
        <Button
          type="primary"
          color="error"
          injectStyles={injectStyles}
          onClick={() => showToast('error', '서버에 연결할 수 없습니다.')}
        >
          Error with Icon
        </Button>
      </div>
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          message={toast.message}
          color={toast.color}
          showIcon
          onClose={() => removeToast(toast.id)}
          duration={3000}
          index={index}
          maxCount={5}
          injectStyles={injectStyles}
        />
      ))}
    </div>
  );
}

export function DemoToastPlacement() {
  const context = useContext(ToastControlsContext);
  const injectStyles = context?.injectStyles ?? true;
  const [toasts, setToasts] = useState<
    Array<{
      id: number;
      placement:
        | 'top'
        | 'top-left'
        | 'top-right'
        | 'bottom'
        | 'bottom-left'
        | 'bottom-right'
        | 'center';
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
      | 'bottom-right'
      | 'center',
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
        <Button
          type="primary"
          color="default"
          injectStyles={injectStyles}
          onClick={() => showToast('top-left', '상단 왼쪽에 표시됩니다.')}
        >
          Top Left
        </Button>
        <Button
          type="primary"
          color="default"
          injectStyles={injectStyles}
          onClick={() => showToast('top', '상단 중앙에 표시됩니다.')}
        >
          Top Center
        </Button>
        <Button
          type="primary"
          color="default"
          injectStyles={injectStyles}
          onClick={() => showToast('top-right', '상단 오른쪽에 표시됩니다.')}
        >
          Top Right
        </Button>
      </div>
      <div className={styles.buttonGroup} style={{ justifyContent: 'center' }}>
        <Button
          type="primary"
          color="default"
          injectStyles={injectStyles}
          onClick={() => showToast('center', '정중앙에 표시됩니다.')}
        >
          Center
        </Button>
      </div>
      <div className={styles.buttonGroup}>
        <Button
          type="primary"
          color="default"
          injectStyles={injectStyles}
          onClick={() => showToast('bottom-left', '하단 왼쪽에 표시됩니다.')}
        >
          Bottom Left
        </Button>
        <Button
          type="primary"
          color="default"
          injectStyles={injectStyles}
          onClick={() => showToast('bottom', '하단 중앙에 표시됩니다.')}
        >
          Bottom Center
        </Button>
        <Button
          type="primary"
          color="default"
          injectStyles={injectStyles}
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
            injectStyles={injectStyles}
          />
        );
      })}
    </div>
  );
}

export function DemoToastDuration() {
  const context = useContext(ToastControlsContext);
  const injectStyles = context?.injectStyles ?? true;
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
        <Button
          type="primary"
          color="default"
          injectStyles={injectStyles}
          onClick={() => showToast(1000, '1초 후 자동으로 사라집니다.')}
        >
          1초
        </Button>
        <Button
          type="primary"
          color="default"
          injectStyles={injectStyles}
          onClick={() => showToast(3000, '3초 후 자동으로 사라집니다.')}
        >
          3초
        </Button>
        <Button
          type="primary"
          color="default"
          injectStyles={injectStyles}
          onClick={() => showToast(5000, '5초 후 자동으로 사라집니다.')}
        >
          5초
        </Button>
        <Button
          type="primary"
          color="default"
          injectStyles={injectStyles}
          onClick={() => showToast(0, '자동으로 사라지지 않습니다.')}
        >
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
          injectStyles={injectStyles}
        />
      ))}
    </div>
  );
}

export function DemoToastMaxCount() {
  const context = useContext(ToastControlsContext);
  const injectStyles = context?.injectStyles ?? true;
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
        <Button
          type="primary"
          color="default"
          injectStyles={injectStyles}
          onClick={() => showToast('Toast 1')}
        >
          Toast 1
        </Button>
        <Button
          type="primary"
          color="default"
          injectStyles={injectStyles}
          onClick={() => showToast('Toast 2')}
        >
          Toast 2
        </Button>
        <Button
          type="primary"
          color="default"
          injectStyles={injectStyles}
          onClick={() => showToast('Toast 3')}
        >
          Toast 3
        </Button>
        <Button
          type="primary"
          color="default"
          injectStyles={injectStyles}
          onClick={() => showToast('Toast 4')}
        >
          Toast 4
        </Button>
        <Button
          type="primary"
          color="default"
          injectStyles={injectStyles}
          onClick={() => showToast('Toast 5')}
        >
          Toast 5
        </Button>
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
          color="info"
          onClose={() => removeToast(toast.id)}
          duration={3000}
          index={index}
          maxCount={maxCount}
          injectStyles={injectStyles}
        />
      ))}
    </div>
  );
}
