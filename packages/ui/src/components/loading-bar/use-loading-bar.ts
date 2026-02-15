'use client';

import { useState, useEffect, useCallback } from 'react';
import { UseLoadingBarProps, UseLoadingBarReturn } from './type-loading-bar';

export function useLoadingBar({
  percent,
  show = false,
}: UseLoadingBarProps): UseLoadingBarReturn {
  const [internalPercent, setInternalPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(show);

  const isControlled = percent !== undefined;
  const displayPercent = isControlled ? percent : internalPercent;

  // 로딩 시작
  const startLoading = useCallback(() => {
    if (!isControlled) {
      setInternalPercent(30); // 초기 진행률
      setIsVisible(true);
    }
  }, [isControlled]);

  // 로딩 완료
  const finishLoading = useCallback(() => {
    if (!isControlled) {
      setInternalPercent(100);
      // 약간의 지연 후 숨기기
      setTimeout(() => {
        setIsVisible(false);
        setInternalPercent(0);
      }, 500);
    }
  }, [isControlled]);

  // 로딩 오류
  const errorLoading = useCallback(() => {
    if (!isControlled) {
      setInternalPercent(100);
      // 빨간색으로 표시하기 위해 약간의 지연
      setTimeout(() => {
        setIsVisible(false);
        setInternalPercent(0);
      }, 1000);
    }
  }, [isControlled]);

  // show prop이 변경되면 visibility 업데이트
  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  // percent가 변경되면 자동으로 visibility 조절
  useEffect(() => {
    if (isControlled && percent !== undefined) {
      setIsVisible(percent > 0 && percent < 100);
      if (percent >= 100) {
        setTimeout(() => setIsVisible(false), 500);
      }
    }
  }, [percent, isControlled]);

  return {
    displayPercent,
    isVisible,
    startLoading,
    finishLoading,
    errorLoading,
  };
}
