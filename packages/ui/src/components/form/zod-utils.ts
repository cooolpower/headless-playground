/**
 * Zod schema를 FormRule로 변환하는 유틸리티 함수
 * zod가 설치되어 있지 않으면 빈 배열을 반환합니다.
 */

import type { FormRule } from './type-form';

/**
 * Zod schema를 FormRule 배열로 변환
 * @param zodSchema - Zod schema (zod가 설치되어 있지 않으면 undefined)
 * @returns FormRule 배열
 */
export function zodSchemaToFormRules(zodSchema: any): FormRule[] {
  // zod가 설치되어 있지 않으면 빈 배열 반환
  if (!zodSchema) {
    return [];
  }

  try {
    // zod를 동적으로 import 시도
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const z = require('zod');

    // zod schema인지 확인
    if (!zodSchema._def || typeof zodSchema.parse !== 'function') {
      return [];
    }

    const rules: FormRule[] = [];
    const def = zodSchema._def;

    // Optional/Nullable 처리 - 내부 schema의 규칙을 가져옴
    if (def.typeName === 'ZodOptional' || def.typeName === 'ZodNullable') {
      return zodSchemaToFormRules(def.innerType);
    }

    // Default 처리
    if (def.typeName === 'ZodDefault') {
      return zodSchemaToFormRules(def.innerType);
    }

    // String schema 처리
    if (def.typeName === 'ZodString') {
      if (def.checks) {
        for (const check of def.checks) {
          switch (check.kind) {
            case 'min':
              rules.push({
                min: check.value,
                message:
                  check.message || `최소 ${check.value}자 이상이어야 합니다`,
              });
              break;
            case 'max':
              rules.push({
                max: check.value,
                message:
                  check.message || `최대 ${check.value}자까지 입력 가능합니다`,
              });
              break;
            case 'length':
              rules.push({
                len: check.value,
                message: check.message || `${check.value}자여야 합니다`,
              });
              break;
            case 'email':
              rules.push({
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: check.message || '올바른 이메일 형식이 아닙니다',
              });
              break;
            case 'url':
              rules.push({
                pattern: /^https?:\/\/.+/,
                message: check.message || '올바른 URL 형식이 아닙니다',
              });
              break;
            case 'regex':
              rules.push({
                pattern: check.regex,
                message: check.message || '올바른 형식이 아닙니다',
              });
              break;
          }
        }
      }
    }

    // Number schema 처리
    if (def.typeName === 'ZodNumber') {
      if (def.checks) {
        for (const check of def.checks) {
          switch (check.kind) {
            case 'min':
              rules.push({
                min: check.value,
                message:
                  check.message || `최소 ${check.value} 이상이어야 합니다`,
              });
              break;
            case 'max':
              rules.push({
                max: check.value,
                message: check.message || `최대 ${check.value} 이하여야 합니다`,
              });
              break;
            case 'int':
              rules.push({
                validator: (rule, value, callback) => {
                  if (value !== undefined && value !== null && value !== '') {
                    const num = Number(value);
                    if (!Number.isInteger(num)) {
                      callback(check.message || '정수만 입력 가능합니다');
                    } else {
                      callback();
                    }
                  } else {
                    callback();
                  }
                },
              });
              break;
          }
        }
      }
    }

    // 모든 경우에 대해 최종 validator 추가 (zod의 모든 검증을 포함)
    // 이렇게 하면 변환되지 않은 검증도 처리됨
    rules.push({
      validator: (rule, value, callback) => {
        try {
          zodSchema.parse(value);
          callback();
        } catch (error: any) {
          // ZodError의 경우 errors 배열에서 메시지 추출
          if (
            error.errors &&
            Array.isArray(error.errors) &&
            error.errors.length > 0
          ) {
            const message = error.errors[0].message || '검증에 실패했습니다';
            callback(message);
          } else {
            callback(error.message || '검증에 실패했습니다');
          }
        }
      },
    });

    return rules;
  } catch (error) {
    // zod가 설치되어 있지 않거나 변환 실패 시
    // validator로 fallback
    return [
      {
        validator: (rule, value, callback) => {
          try {
            zodSchema.parse(value);
            callback();
          } catch (err: any) {
            const message =
              err.errors?.[0]?.message || err.message || '검증에 실패했습니다';
            callback(message);
          }
        },
      },
    ];
  }
}

/**
 * Zod schema로 직접 검증하는 함수
 * @param zodSchema - Zod schema
 * @param value - 검증할 값
 * @returns 에러 메시지 배열 (에러가 없으면 빈 배열)
 */
export async function validateWithZod(
  zodSchema: any,
  value: any
): Promise<string[]> {
  if (!zodSchema) {
    return [];
  }

  try {
    zodSchema.parse(value);
    return [];
  } catch (error: any) {
    if (error.errors && Array.isArray(error.errors)) {
      return error.errors.map(
        (err: any) => err.message || '검증에 실패했습니다'
      );
    }
    return [error.message || '검증에 실패했습니다'];
  }
}
