'use client';

// components/headless/image/image.tsx
import { useImage } from './use-image';
import { ImageProps } from './type-image';
import { imageCss as _imageCss } from './image.styles';

export const ImageCss = _imageCss;

export function Image(props: ImageProps) {
  const {
    className,
    injectStyles = true,
    placeholderText,
    fallbackText,
    previewCloseButton = true,
    ...imageOptions
  } = props;

  const finalPlaceholder =
    imageOptions.placeholder ??
    (placeholderText ? <span>{placeholderText}</span> : undefined);

  const finalFallback =
    imageOptions.fallback ??
    (fallbackText ? <span>{fallbackText}</span> : undefined);

  const {
    containerProps,
    imageProps,
    placeholderProps,
    fallbackProps,
    previewProps,
    previewImageProps,
    closePreview,
  } = useImage({
    ...imageOptions,
    placeholder: finalPlaceholder,
    fallback: finalFallback,
  });

  return (
    <>
      <div
        {...containerProps}
        className={[containerProps.className, className]
          .filter(Boolean)
          .join(' ')}
      >
        {injectStyles && <style suppressHydrationWarning>{_imageCss}</style>}
        <img {...imageProps} />

        {placeholderProps && (
          <div {...placeholderProps} className={placeholderProps.className}>
            {finalPlaceholder || 'Loading...'}
          </div>
        )}

        {fallbackProps && (
          <div {...fallbackProps} className={fallbackProps.className}>
            {finalFallback || 'Failed to load image'}
          </div>
        )}
      </div>

      {previewProps && (
        <div {...previewProps} className={previewProps.className}>
          {previewCloseButton && (
            <button
              type="button"
              className="hcImagePreviewClose"
              aria-label="Close preview"
              onClick={(event) => {
                event.stopPropagation();
                closePreview();
              }}
            >
              ×
            </button>
          )}
          {previewImageProps && <img {...previewImageProps} />}
        </div>
      )}
    </>
  );
}
