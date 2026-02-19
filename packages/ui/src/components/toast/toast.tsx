'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useToast } from './use-toast';
import { ToastProps } from './type-toast';
import { toastCss as _toastCss } from './toast.styles';
import { Ellipsis } from '../ellipsis/ellipsis';

export function Toast({
  className,
  index = 0,
  maxCount = Infinity,
  injectStyles = true,
  ...props
}: ToastProps) {
  const {
    icon,
    placementStyles,
    duration,
    onClose,
    message,
    title,
    description,
    showProgress,
    showClose,
  } = useToast({ ...props, index, maxCount });

  const [progressWidth, setProgressWidth] = useState(100);
  const onCloseRef = useRef(onClose);

  // onClose가 변경되면 ref 업데이트
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (duration > 0) {
      // 렌더링 직후 100%에서 시작해서 다음 프레임에 0%로 애니메이션 시작
      const requestId = requestAnimationFrame(() => {
        setProgressWidth(0);
      });

      const timer = setTimeout(() => {
        onCloseRef.current?.();
      }, duration);

      return () => {
        cancelAnimationFrame(requestId);
        clearTimeout(timer);
      };
    }
  }, [duration]);

  // 스타일 주입 (한 번만, injectStyles 값에 따라 추가/제거)
  useEffect(() => {
    const styleId = 'hc-toast-styles';
    if (injectStyles) {
      if (!document.getElementById(styleId)) {
        const styleElement = document.createElement('style');
        styleElement.id = styleId;
        styleElement.textContent = _toastCss;
        document.head.appendChild(styleElement);
      }
    } else {
      const styleElement = document.getElementById(styleId);
      if (styleElement) {
        styleElement.remove();
      }
    }
  }, [injectStyles]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const shouldShowClose = showClose || duration === 0;

  if (!mounted) return null;

  const containerId = `hcToastContainer-${props.placement || 'top'}`;
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.className = 'hcToastContainer';
    // 스타일 주입 여부와 관계없이 컨테이너는 기본 위치를 잡아야 하므로 인라인 스타일로 보강
    container.style.position = 'fixed';
    container.style.zIndex = '10000';
    container.style.pointerEvents = 'none';
    container.setAttribute('data-placement', props.placement || 'top');
    document.body.appendChild(container);
  }

  return createPortal(
    <div
      role="alert"
      aria-live="polite"
      className={className ? `hcToast ${className}` : 'hcToast'}
      data-type={props.type ?? 'info'}
      data-color={props.color ?? 'info'}
      data-show-progress={showProgress && duration > 0 ? 'true' : 'false'}
      style={{
        zIndex: 10001 - index,
        ...placementStyles,
      }}
    >
      {icon && <div className="hcToastIcon">{icon}</div>}
      <div className="hcToastBody">
        {!!title && <div className="hcToastTitle">{title as any}</div>}
        {!!description && (
          <Ellipsis lines={2} className="hcToastDescription">
            {description as any}
          </Ellipsis>
        )}
        {!!message && <div className="hcToastMessage">{message as any}</div>}
        {showProgress && duration > 0 && (
          <div className="hcToastProgressTrack">
            <div
              className="hcToastProgressFill"
              style={{
                width: `${progressWidth}%`,
                transition:
                  duration > 0 ? `width ${duration}ms linear` : 'none',
              }}
            />
          </div>
        )}
      </div>
      {shouldShowClose && (
        <button
          className="hcToastClose"
          onClick={() => onCloseRef.current?.()}
          aria-label="Close"
        >
          ✕
        </button>
      )}
    </div>,
    container,
  );
}

export const ToastCss = _toastCss;
