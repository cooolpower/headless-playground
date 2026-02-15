'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export type CountdownFormatType = 'time' | 'number' | 'temperature' | 'custom';

export interface UseCountdownProps {
  /**
   * 목표 시간 (타임스탬프 또는 Date 객체)
   */
  targetTime: number | Date;
  /**
   * 활성화 여부
   */
  active?: boolean;
  /**
   * 카운트다운이 끝났을 때 호출되는 콜백
   */
  onFinish?: () => void;
  /**
   * 시간 포맷 (예: 'HH:mm:ss', 'mm:ss')
   */
  format?: string;
  /**
   * 포맷 타입 ('time', 'number', 'temperature', 'custom')
   */
  formatType?: CountdownFormatType;
  /**
   * 카운트다운 완료 시 표시할 내용 (ReactNode)
   */
  finishedContent?: React.ReactNode;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number; // 밀리초 단위
}

// calculateTimeLeft 함수를 컴포넌트 외부로 이동
function calculateTimeLeft(target: number): TimeLeft {
  const now = Date.now();
  const difference = target - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      total: 0,
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    total: difference,
  };
}

export function useCountdown(props: UseCountdownProps) {
  const {
    targetTime,
    active = true,
    onFinish,
    format = 'HH:mm:ss',
    formatType = 'time',
    finishedContent,
  } = props;
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => {
    const target = typeof targetTime === 'number' ? targetTime : targetTime.getTime();
    return calculateTimeLeft(target);
  });

  const onFinishRef = useRef(onFinish);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // onFinish 콜백 최신화
  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  const formatTime = useCallback(
    (time: TimeLeft): string => {
      const { days, hours, minutes, seconds, total } = time;

      if (formatType === 'number') {
        // 총 초 단위로 표시
        const totalSeconds = Math.floor(total / 1000);
        return String(totalSeconds);
      }

      if (formatType === 'temperature') {
        // 온도 형식으로 표시 (예: 25°C)
        const totalSeconds = Math.floor(total / 1000);
        return `${totalSeconds}°C`;
      }

      if (formatType === 'custom') {
        // 사용자 정의 포맷 (format 문자열을 그대로 사용)
        return format;
      }

      // 기본 time 포맷
      if (format.includes('DD')) {
        return format
          .replace('DD', String(days).padStart(2, '0'))
          .replace('HH', String(hours).padStart(2, '0'))
          .replace('mm', String(minutes).padStart(2, '0'))
          .replace('ss', String(seconds).padStart(2, '0'));
      }

      if (format.includes('HH')) {
        return format
          .replace('HH', String(hours).padStart(2, '0'))
          .replace('mm', String(minutes).padStart(2, '0'))
          .replace('ss', String(seconds).padStart(2, '0'));
      }

      if (format.includes('mm')) {
        return format
          .replace('mm', String(minutes).padStart(2, '0'))
          .replace('ss', String(seconds).padStart(2, '0'));
      }

      return format.replace('ss', String(seconds).padStart(2, '0'));
    },
    [format, formatType]
  );

  useEffect(() => {
    if (!active) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const target = typeof targetTime === 'number' ? targetTime : targetTime.getTime();

    // 즉시 계산
    const initialTimeLeft = calculateTimeLeft(target);
    setTimeLeft(initialTimeLeft);

    // 카운트다운이 이미 끝났으면
    if (initialTimeLeft.total <= 0) {
      onFinishRef.current?.();
      return;
    }

    // 1초마다 업데이트
    intervalRef.current = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(target);
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.total <= 0) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        onFinishRef.current?.();
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [targetTime, active]);

  return {
    timeLeft,
    formatted: formatTime(timeLeft),
    isFinished: timeLeft.total <= 0,
    finishedContent,
  };
}
