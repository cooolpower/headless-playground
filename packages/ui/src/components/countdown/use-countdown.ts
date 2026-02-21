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
  /**
   * 밀리초 정밀도 (0-3). 0이면 초 단위, 3이면 밀리초 3자리까지 표시.
   * Naive UI의 Precision 기능과 동일.
   * @default 0
   */
  precision?: 0 | 1 | 2 | 3;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
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
      milliseconds: 0,
      total: 0,
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  const milliseconds = difference % 1000;

  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
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
    precision = 0,
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
      const { days, hours, minutes, seconds, milliseconds, total } = time;

      // 밀리초 접미사 생성
      const msStr = precision > 0
        ? '.' + String(milliseconds).padStart(3, '0').slice(0, precision)
        : '';

      if (formatType === 'number') {
        const totalSeconds = Math.floor(total / 1000);
        return String(totalSeconds) + msStr;
      }

      if (formatType === 'temperature') {
        const totalSeconds = Math.floor(total / 1000);
        return `${totalSeconds}°C`;
      }

      if (formatType === 'custom') {
        return format;
      }

      // 기본 time 포맷
      let result: string;
      if (format.includes('DD')) {
        result = format
          .replace('DD', String(days).padStart(2, '0'))
          .replace('HH', String(hours).padStart(2, '0'))
          .replace('mm', String(minutes).padStart(2, '0'))
          .replace('ss', String(seconds).padStart(2, '0'));
      } else if (format.includes('HH')) {
        result = format
          .replace('HH', String(hours).padStart(2, '0'))
          .replace('mm', String(minutes).padStart(2, '0'))
          .replace('ss', String(seconds).padStart(2, '0'));
      } else if (format.includes('mm')) {
        result = format
          .replace('mm', String(minutes).padStart(2, '0'))
          .replace('ss', String(seconds).padStart(2, '0'));
      } else {
        result = format.replace('ss', String(seconds).padStart(2, '0'));
      }

      return result + msStr;
    },
    [format, formatType, precision]
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

    // precision에 따라 업데이트 주기 결정
    const intervalMs = precision > 0 ? 16 : 1000;
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
    }, intervalMs);

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
