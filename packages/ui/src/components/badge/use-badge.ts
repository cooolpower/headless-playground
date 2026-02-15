'use client';

import { useMemo } from 'react';
import { UseBadgeProps, UseBadgeReturn } from './type-badge';

export function useBadge({
  count,
  maxCount = 99,
  showZero = false,
}: UseBadgeProps): UseBadgeReturn {
  const { displayCount, shouldShowBadge } = useMemo(() => {
    // count가 없거나 undefined, null, 빈 문자열인 경우
    if (count === undefined || count === null || count === '') {
      return {
        displayCount: null,
        shouldShowBadge: false,
      };
    }

    // 숫자인 경우
    if (typeof count === 'number') {
      // 0이고 showZero가 false인 경우 숨김
      if (count === 0 && !showZero) {
        return {
          displayCount: null,
          shouldShowBadge: false,
        };
      }

      // maxCount를 초과하는 경우
      if (count > maxCount) {
        return {
          displayCount: `${maxCount}+`,
          shouldShowBadge: true,
        };
      }

      return {
        displayCount: count,
        shouldShowBadge: true,
      };
    }

    // 문자열인 경우
    if (typeof count === 'string') {
      const numValue = parseFloat(count);

      // 숫자로 변환 가능한 경우
      if (!isNaN(numValue)) {
        if (numValue === 0 && !showZero) {
          return {
            displayCount: null,
            shouldShowBadge: false,
          };
        }

        if (numValue > maxCount) {
          return {
            displayCount: `${maxCount}+`,
            shouldShowBadge: true,
          };
        }

        return {
          displayCount: count,
          shouldShowBadge: true,
        };
      }

      // 숫자가 아닌 문자열은 그대로 표시
      return {
        displayCount: count,
        shouldShowBadge: true,
      };
    }

    return {
      displayCount: null,
      shouldShowBadge: false,
    };
  }, [count, maxCount, showZero]);

  return {
    displayCount,
    shouldShowBadge,
  };
}
