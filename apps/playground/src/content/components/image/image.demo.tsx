'use client';

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useRef,
} from 'react';
import { Image } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import { Input } from '@repo/ui';
import { Select } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import type { SelectOption } from '@repo/ui';
import * as styles from './image.demo.css';

const STORAGE_KEY = 'headless-image-demo-state';

interface ImageControlsContextType {
  injectStyles: boolean;
  setInjectStyles: (v: boolean) => void;
  src: string;
  setSrc: (v: string) => void;
  useInvalidSrc: boolean;
  setUseInvalidSrc: (v: boolean) => void;
  width: string;
  setWidth: (v: string) => void;
  height: string;
  setHeight: (v: string) => void;
  objectFit: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  setObjectFit: (v: ImageControlsContextType['objectFit']) => void;
  preview: boolean;
  setPreview: (v: boolean) => void;
  showPlaceholder: boolean;
  setShowPlaceholder: (v: boolean) => void;
  showFallback: boolean;
  setShowFallback: (v: boolean) => void;
  placeholderText: string;
  setPlaceholderText: (v: string) => void;
  fallbackText: string;
  setFallbackText: (v: string) => void;
  showPreviewCloseButton: boolean;
  setShowPreviewCloseButton: (v: boolean) => void;
}

const ImageControlsContext = createContext<ImageControlsContextType | null>(
  null,
);

export function DemoImageBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // 기본 초기값
  const defaultState = {
    injectStyles: true,
    src: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=600&fit=crop',
    useInvalidSrc: false,
    width: '240',
    height: '160',
    objectFit: 'cover' as const,
    preview: true,
    showPlaceholder: true, // 로딩 중 플레이스홀더 표시 여부
    showFallback: true, // 로딩 실패 시 폴백 표시 여부
    placeholderText: 'Loading…', // 플레이스홀더 텍스트
    fallbackText: 'Failed to load', // 폴백 텍스트
    // 이 외의 모든 컨트롤러의 기본 상태도 이곳에 명시되어야 합니다.
    showPreviewCloseButton: true,
  };

  // 모든 상태를 기본값으로 초기화합니다.
  const [injectStyles, setInjectStyles] = useState(defaultState.injectStyles);
  const [src, setSrc] = useState(defaultState.src);
  const [useInvalidSrc, setUseInvalidSrc] = useState(
    defaultState.useInvalidSrc,
  );
  const [width, setWidth] = useState(defaultState.width);
  const [height, setHeight] = useState(defaultState.height);
  const [objectFit, setObjectFit] = useState<
    ImageControlsContextType['objectFit']
  >(defaultState.objectFit);
  const [preview, setPreview] = useState(defaultState.preview);
  const [showPlaceholder, setShowPlaceholder] = useState(
    defaultState.showPlaceholder,
  );
  const [showFallback, setShowFallback] = useState(defaultState.showFallback);
  const [placeholderText, setPlaceholderText] = useState(
    defaultState.placeholderText,
  );
  const [fallbackText, setFallbackText] = useState(defaultState.fallbackText);
  const [showPreviewCloseButton, setShowPreviewCloseButton] = useState(
    defaultState.showPreviewCloseButton,
  );

  const isFirstSaveRunRef = useRef(true);

  // 마운트 시 로컬스토리지에서 값 로드 (클라이언트에서만 실행)
  // 이 useEffect는 하이드레이션 후에 실행되어 UI 불일치를 방지합니다.
  useEffect(() => {
    if (typeof window === 'undefined') return; // SSR 방지

    try {
      const storedLocal = localStorage.getItem(STORAGE_KEY);
      let parsed = null;

      if (storedLocal) {
        parsed = JSON.parse(storedLocal);
      }

      if (parsed) {
        // localStorage 또는 cookie에서 읽은 값으로 상태를 업데이트합니다.
        if (parsed.injectStyles !== undefined)
          setInjectStyles(parsed.injectStyles);
        if (parsed.src !== undefined) setSrc(parsed.src);
        if (parsed.useInvalidSrc !== undefined)
          setUseInvalidSrc(parsed.useInvalidSrc);
        if (parsed.width !== undefined) setWidth(parsed.width);
        if (parsed.height !== undefined) setHeight(parsed.height);
        if (parsed.objectFit !== undefined)
          setObjectFit(
            parsed.objectFit as ImageControlsContextType['objectFit'],
          );
        if (parsed.preview !== undefined) setPreview(parsed.preview);
        if (parsed.showPlaceholder !== undefined)
          setShowPlaceholder(parsed.showPlaceholder);
        if (parsed.showFallback !== undefined)
          setShowFallback(parsed.showFallback);
        if (parsed.placeholderText !== undefined)
          setPlaceholderText(parsed.placeholderText);
        //setPlaceholderText(parsed.placeholderText);
        if (parsed.fallbackText !== undefined)
          setFallbackText(parsed.fallbackText);
        if (parsed.showPreviewCloseButton !== undefined)
          setShowPreviewCloseButton(parsed.showPreviewCloseButton);
      }
    } catch (error) {
      console.warn('Failed to load state from localStorage:', error);
    }
  }, []); // 빈 배열: 마운트 시 한 번만 실행

  // 상태 변경 시 로컬스토리지에 저장 (마운트 직후 첫 1회는 스킵 → 기본값으로 덮어쓰기 방지)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isFirstSaveRunRef.current) {
      isFirstSaveRunRef.current = false;
      return;
    }

    try {
      const stateToSave = {
        injectStyles,
        src,
        useInvalidSrc,
        width,
        height,
        objectFit,
        preview,
        showPlaceholder,
        showFallback,
        placeholderText,
        fallbackText,
        showPreviewCloseButton,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.warn('Failed to save state to localStorage:', error);
    }
  }, [
    injectStyles,
    src,
    useInvalidSrc,
    width,
    height,
    objectFit,
    preview,
    showPlaceholder,
    showFallback,
    placeholderText,
    fallbackText,
    showPreviewCloseButton,
  ]);

  const value = useMemo(
    () => ({
      injectStyles,
      setInjectStyles,
      src,
      setSrc,
      useInvalidSrc,
      setUseInvalidSrc,
      width,
      setWidth,
      height,
      setHeight,
      objectFit,
      setObjectFit,
      preview,
      setPreview,
      showPlaceholder,
      setShowPlaceholder,
      showFallback,
      setShowFallback,
      placeholderText,
      setPlaceholderText,
      fallbackText,
      setFallbackText,
      showPreviewCloseButton,
      setShowPreviewCloseButton,
    }),
    [
      injectStyles,
      src,
      useInvalidSrc,
      width,
      height,
      objectFit,
      preview,
      showPlaceholder,
      showFallback,
      placeholderText,
      fallbackText,
      showPreviewCloseButton,
    ],
  );

  return (
    <ImageControlsContext.Provider value={value}>
      {children}
    </ImageControlsContext.Provider>
  );
}

export function DemoImageBasicWithControls() {
  const ctx = useContext(ImageControlsContext);

  //console.log('ctx', ctx);
  if (!ctx) return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;

  const w = ctx.width ? Number(ctx.width) : undefined;
  const h = ctx.height ? Number(ctx.height) : undefined;

  return (
    <div
      className={`${styles.container} ${!ctx.injectStyles ? styles.imageWrapperClass : ''}`}
    >
      <div className={styles.previewBox}>
        <p>
          {ctx.placeholderText}
          {}
        </p>
        <Image
          key={`${ctx.useInvalidSrc}-${ctx.src}`}
          injectStyles={ctx.injectStyles}
          src={
            ctx.useInvalidSrc
              ? 'https://example.invalid/not-found.png'
              : ctx.src
          }
          alt="Demo image"
          width={Number.isFinite(w) ? w : undefined}
          height={Number.isFinite(h) ? h : undefined}
          objectFit={ctx.objectFit}
          preview={ctx.preview}
          placeholderText={
            ctx.showPlaceholder ? ctx.placeholderText : undefined
          }
          fallbackText={ctx.showFallback ? ctx.fallbackText : undefined}
          previewCloseButton={ctx.showPreviewCloseButton}
        />
      </div>
      <p className={styles.helper}>
        Preview가 켜져 있으면 이미지를 클릭하면 오버레이가 열립니다.
      </p>
    </div>
  );
}

export function DemoImageBasicControls() {
  const ctx = useContext(ImageControlsContext);
  if (!ctx) return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;

  const fitOptions: SelectOption[] = [
    { label: 'cover', value: 'cover' },
    { label: 'contain', value: 'contain' },
    { label: 'fill', value: 'fill' },
    { label: 'none', value: 'none' },
    { label: 'scale-down', value: 'scale-down' },
  ];

  return (
    <Controls
      items={[
        {
          label: 'Inject Styles',
          control: (
            <Checkbox
              checked={ctx.injectStyles}
              onChange={(v) => ctx.setInjectStyles(v)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: 'Src',
          control: (
            <Input
              type="text"
              value={ctx.src}
              onChange={ctx.setSrc}
              placeholder="https://..."
              size="small"
            />
          ),
        },
        {
          label: 'Invalid Src (에러 유도)',
          control: (
            <Checkbox
              checked={ctx.useInvalidSrc}
              onChange={(v) => ctx.setUseInvalidSrc(v)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: 'Width (px)',
          control: (
            <Input
              type="number"
              value={ctx.width}
              onChange={ctx.setWidth}
              placeholder="예: 240"
              size="small"
            />
          ),
        },
        {
          label: 'Height (px)',
          control: (
            <Input
              type="number"
              value={ctx.height}
              onChange={ctx.setHeight}
              placeholder="예: 160"
              size="small"
            />
          ),
        },
        {
          label: 'Object Fit',
          control: (
            <Select
              options={fitOptions}
              value={ctx.objectFit}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  ctx.setObjectFit(
                    val as ImageControlsContextType['objectFit'],
                  );
                }
              }}
              size="small"
            />
          ),
        },
        {
          label: 'Preview',
          control: (
            <Checkbox
              checked={ctx.preview}
              onChange={(v) => ctx.setPreview(v)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: 'Placeholder',
          control: (
            <Checkbox
              checked={ctx.showPlaceholder}
              onChange={(v) => ctx.setShowPlaceholder(v)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: 'Placeholder Text',
          control: (
            <Input
              type="text"
              value={ctx.placeholderText}
              onChange={ctx.setPlaceholderText}
              placeholder="Loading…"
              size="small"
              disabled={!ctx.showPlaceholder}
            />
          ),
        },
        {
          label: 'Fallback',
          control: (
            <Checkbox
              checked={ctx.showFallback}
              onChange={(v) => ctx.setShowFallback(v)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: 'Fallback Text',
          control: (
            <Input
              type="text"
              value={ctx.fallbackText}
              onChange={ctx.setFallbackText}
              placeholder="Failed to load"
              size="small"
              disabled={!ctx.showFallback}
            />
          ),
        },
        {
          label: 'Preview Close Button',
          control: (
            <Checkbox
              checked={ctx.showPreviewCloseButton}
              onChange={(v) => ctx.setShowPreviewCloseButton(v)}
              size="small"
            >
              표시
            </Checkbox>
          ),
        },
      ]}
    />
  );
}

export function DemoImageBasic() {
  return (
    <div className={styles.row}>
      <Image
        src="https://images.unsplash.com/photo-1520975916090-3105956dac38?w=400&fit=crop"
        alt="Sample"
        width={240}
        height={160}
        preview
        placeholder={<span>Loading…</span>}
        fallback={<span>Failed</span>}
      />
    </div>
  );
}
