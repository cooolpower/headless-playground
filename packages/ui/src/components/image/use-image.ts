'use client';

// components/headless/image/use-image.ts
import { useState, useCallback, useRef, useEffect } from 'react';

export interface UseImageProps {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  loading?: 'lazy' | 'eager';
  placeholder?: React.ReactNode;
  fallback?: React.ReactNode;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
  preview?: boolean;
  previewSrc?: string;
}

export function useImage({
  src,
  alt = '',
  width,
  height,
  objectFit = 'cover',
  loading,
  placeholder,
  fallback,
  onLoad,
  onError,
  onClick,
  preview = false,
  previewSrc,
}: UseImageProps) {
  const resolvedLoading: 'lazy' | 'eager' =
    loading ?? (placeholder ? 'eager' : 'lazy');

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);

  const handleLoad = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      setIsLoading(false);
      setHasError(false);
      onLoad?.(event);
    },
    [onLoad]
  );

  const handleError = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      setIsLoading(false);
      setHasError(true);
      onError?.(event);
    },
    [onError]
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLImageElement>) => {
      if (preview) {
        setShowPreview(true);
      }
      onClick?.(event);
    },
    [preview, onClick]
  );

  const closePreview = useCallback(() => {
    setShowPreview(false);
  }, []);

  useEffect(() => {
    if (!src) return;

    // 새 src가 들어오면 항상 로딩 상태로 초기화
    setIsLoading(true);
    setHasError(false);

    const img = imageRef.current;
    if (!img) return;

    const handleNativeLoad = () => {
      setIsLoading(false);
      setHasError(false);
    };

    const handleNativeError = () => {
      setIsLoading(false);
      setHasError(true);
    };

    // 캐시로 인해 이미 로드가 끝난 이미지 처리
    if (img.complete) {
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        handleNativeLoad();
      } else {
        handleNativeError();
      }
    }

    img.addEventListener('load', handleNativeLoad);
    img.addEventListener('error', handleNativeError);

    return () => {
      img.removeEventListener('load', handleNativeLoad);
      img.removeEventListener('error', handleNativeError);
    };
  }, [src]);

  const currentSrc = src && !hasError ? src : undefined;
  const currentPreviewSrc = previewSrc || src;

  return {
    isLoading,
    hasError,
    showPreview,
    currentSrc,
    closePreview,

    containerProps: {
      className: 'hcImageContainer',
      'data-loading': isLoading ? 'true' : 'false',
      'data-error': hasError ? 'true' : 'false',
      'data-preview': preview ? 'true' : 'false',
      style: {
        ['--hc-image-w' as any]:
          typeof width === 'number' ? `${width}px` : width || 'auto',
        ['--hc-image-h' as any]:
          typeof height === 'number' ? `${height}px` : height || 'auto',
        ['--hc-image-fit' as any]: objectFit,
      },
    },

    imageProps: {
      ref: imageRef,
      src: currentSrc,
      alt,
      loading: resolvedLoading,
      onLoad: handleLoad,
      onError: handleError,
      onClick: handleClick,
      className: 'hcImageImg',
    },

    placeholderProps:
      isLoading && placeholder
        ? {
            className: 'hcImagePlaceholder',
          }
        : null,

    fallbackProps:
      hasError && fallback
        ? {
            className: 'hcImageFallback',
          }
        : null,

    previewProps: showPreview
      ? {
          className: 'hcImagePreviewOverlay',
          onClick: closePreview,
        }
      : null,

    previewImageProps: showPreview
      ? {
          src: currentPreviewSrc,
          alt,
          className: 'hcImagePreviewImg',
        }
      : null,
  };
}
