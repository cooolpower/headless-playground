'use client';

import { useMemo } from 'react';
import { UseStatisticProps, UseStatisticReturn } from './type-statistic';

export function useStatistic({
  value,
  precision = 2,
  groupSeparator = ',',
  decimalSeparator = '.',
}: UseStatisticProps): UseStatisticReturn {
  const { displayValue, formattedValue } = useMemo(() => {
    if (value === undefined || value === null) {
      return {
        displayValue: '0',
        formattedValue: '0',
      };
    }

    let numValue: number;

    if (typeof value === 'string') {
      numValue = parseFloat(value);
      if (isNaN(numValue)) {
        return {
          displayValue: value,
          formattedValue: value,
        };
      }
    } else {
      numValue = value;
    }

    // 정밀도 적용
    const roundedValue = Number(numValue.toFixed(precision));

    // 숫자 포맷팅
    const formatted = new Intl.NumberFormat('ko-KR', {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    }).format(roundedValue);

    return {
      displayValue: formatted,
      formattedValue: formatted,
    };
  }, [value, precision, groupSeparator, decimalSeparator]);

  return {
    displayValue,
    formattedValue,
  };
}
