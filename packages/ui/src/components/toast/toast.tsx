'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useToast } from './use-toast';
import { ToastProps } from './type-toast';
import { toastCss as _toastCss } from './toast.styles';

export function Toast({
  className,
  index = 0,
  maxCount = Infinity,
  injectStyles = true,
  ...props
}: ToastProps) {
  const { icon, placementStyles, duration, onClose, message, showProgress } =
    useToast({ ...props, index, maxCount });

  const [progress, setProgress] = useState(100);
  const startTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const onCloseRef = useRef(onClose);

  // onClose가 변경되면 ref 업데이트
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (duration > 0 && onCloseRef.current) {
      const startTime = Date.now();
      startTimeRef.current = startTime;

      // 프로그레스 바 업데이트
      if (showProgress) {
        const updateProgress = () => {
          const elapsed = Date.now() - startTime;
          const remaining = Math.max(0, duration - elapsed);
          const progressPercent = (remaining / duration) * 100;
          setProgress(progressPercent);

          if (remaining <= 0) {
            onCloseRef.current?.();
          } else {
            progressTimerRef.current = setTimeout(updateProgress, 16); // 약 60fps
          }
        };
        progressTimerRef.current = setTimeout(updateProgress, 16);
      } else {
        // 프로그레스 바 없이 단순 타이머
        timerRef.current = setTimeout(() => {
          onCloseRef.current?.();
        }, duration);
      }

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        if (progressTimerRef.current) {
          clearTimeout(progressTimerRef.current);
        }
      };
    }
  }, [duration, showProgress]); // onClose는 dependency에서 제거

  return (
    <div
      role="alert"
      aria-live="polite"
      className={className ? `hcToast ${className}` : 'hcToast'}
      data-type={props.type ?? 'info'}
      data-show-progress={showProgress && duration > 0 ? 'true' : 'false'}
      style={{
        zIndex: 9999 - index,
        paddingBottom:
          showProgress && duration > 0
            ? 'calc(var(--spacing-base) + 0.375rem)'
            : undefined,
        ...placementStyles,
      }}
    >
      {injectStyles ? (
        <style suppressHydrationWarning>{_toastCss}</style>
      ) : null}
      {icon && <div className="hcToastIcon">{icon}</div>}
      <div className="hcToastBody">
        <div>{message as any}</div>
        {showProgress && duration > 0 && (
          <div className="hcToastProgressTrack">
            <div
              className="hcToastProgressFill"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export const ToastCss = _toastCss;
