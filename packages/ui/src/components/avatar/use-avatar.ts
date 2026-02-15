'use client';

// components/headless/avatar/use-avatar.ts
import { useState, useCallback } from 'react';
import { type UseAvatarProps } from './type-avatar';

export function useAvatar({
  src,
  alt = '',
  fallback,
  size = 'medium',
  name,
  className,
}: UseAvatarProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    setImageError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageLoaded(false);
    setImageError(true);
  }, []);

  // Generate fallback text from name or fallback prop
  const generateFallbackText = useCallback(() => {
    if (fallback) return fallback;

    if (name) {
      const parts = name.trim().split(' ');
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return parts[0][0].toUpperCase();
    }

    return 'U'; // Default fallback
  }, [fallback, name]);

  const showImage = src && !imageError;
  const fallbackText = generateFallbackText();

  return {
    showImage,
    fallbackText,

    containerProps: {
      role: 'img',
      'aria-label': alt || (name ? `${name} avatar` : 'Avatar'),
      className: ['hcAvatar', className].filter(Boolean).join(' '),
      'data-size': size,
    },

    imageProps: {
      src,
      alt,
      onLoad: handleImageLoad,
      onError: handleImageError,
      className: 'hcAvatarImg',
    },

    fallbackProps: {
      className: 'hcAvatarFallback',
    },
  };
}
