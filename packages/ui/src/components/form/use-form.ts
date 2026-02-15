'use client';

import { useRef, useCallback, useState, useEffect, useMemo } from 'react';
import {
  UseFormProps,
  UseFormReturn,
  FormInstance,
  FormContextValue,
  FormFieldInstance,
  FormErrors,
  FormRule,
} from './type-form';

export function useForm<T = any>({
  initialValues = {} as T,
  onFinish,
  onFinishFailed,
  onValuesChange,
  validateTrigger = 'onChange',
}: UseFormProps<T> = {}): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const fieldsRef = useRef<Map<string, FormFieldInstance>>(new Map());

  // 필드 값 가져오기
  const getFieldValue = useCallback(
    (name: string | string[]): any => {
      const path = Array.isArray(name) ? name : [name];
      let current = values as any;

      for (const key of path) {
        if (current && typeof current === 'object') {
          current = current[key];
        } else {
          return undefined;
        }
      }

      return current;
    },
    [values]
  );

  // 모든 필드 값 가져오기
  const getFieldsValue = useCallback(
    (nameList?: string[] | string[][]): T => {
      if (!nameList) return values;

      const result = {} as any;
      const paths = nameList.map((name) =>
        Array.isArray(name) ? name : [name]
      );

      for (const path of paths) {
        let current = values as any;
        let target = result;

        for (let i = 0; i < path.length - 1; i++) {
          const key = path[i];
          if (!target[key]) target[key] = {};
          target = target[key];
          current = current?.[key];
        }

        const lastKey = path[path.length - 1];
        if (current && typeof current === 'object') {
          target[lastKey] = current[lastKey];
        }
      }

      return result;
    },
    [values]
  );

  // 필드 값 설정
  const setFieldValue = useCallback(
    (name: string | string[], value: any) => {
      const path = Array.isArray(name) ? name : [name];

      setValues((prev) => {
        const newValues = { ...prev } as any;
        let current = newValues;

        for (let i = 0; i < path.length - 1; i++) {
          const key = path[i];
          if (!current[key] || typeof current[key] !== 'object') {
            current[key] = {};
          }
          current = current[key];
        }

        current[path[path.length - 1]] = value;
        return newValues;
      });

      // 필드 에러 초기화
      setFieldError(name, []);

      // 값 변경 콜백
      onValuesChange?.(
        { [Array.isArray(name) ? name.join('.') : name]: value } as Partial<T>,
        values
      );
    },
    [values, onValuesChange]
  );

  // 여러 필드 값 설정
  const setFieldsValue = useCallback(
    (newValues: Partial<T>) => {
      setValues((prev) => ({ ...prev, ...newValues }));
      onValuesChange?.(newValues, { ...values, ...newValues });
    },
    [values, onValuesChange]
  );

  // 필드 초기화
  const resetFields = useCallback(
    (fields?: string[] | string[][]) => {
      if (!fields) {
        setValues(initialValues);
        setErrors({});
        setTouched({});
        return;
      }

      const paths = fields.map((field) =>
        Array.isArray(field) ? field : [field]
      );

      setValues((prev) => {
        const newValues = { ...prev } as any;

        for (const path of paths) {
          let current = newValues;
          for (let i = 0; i < path.length - 1; i++) {
            const key = path[i];
            if (!current[key] || typeof current[key] !== 'object') {
              current[key] = {};
            }
            current = current[key];
          }

          const lastKey = path[path.length - 1];
          let initialCurrent = initialValues as any;
          for (const key of path.slice(0, -1)) {
            initialCurrent = initialCurrent?.[key];
          }
          current[lastKey] = initialCurrent?.[lastKey];
        }

        return newValues;
      });

      // 에러와 터치 상태 초기화
      setErrors((prev) => {
        const newErrors = { ...prev };
        for (const path of paths) {
          const key = path.join('.');
          delete newErrors[key];
        }
        return newErrors;
      });

      setTouched((prev) => {
        const newTouched = { ...prev };
        for (const path of paths) {
          const key = path.join('.');
          delete newTouched[key];
        }
        return newTouched;
      });
    },
    [initialValues]
  );

  // 필드 검증
  const validateField = useCallback(
    async (name: string | string[]): Promise<void> => {
      const path = Array.isArray(name) ? name : [name];
      const key = path.join('.');
      const field = fieldsRef.current.get(key);

      if (!field) return;

      try {
        await field.validate();
      } catch (error) {
        // 검증 실패는 필드 컴포넌트에서 처리
      }
    },
    []
  );

  // 모든 필드 검증
  const validateFields = useCallback(
    async (nameList?: string[] | string[][]): Promise<T> => {
      const fieldsToValidate = nameList
        ? (nameList as any[]).map((name) =>
            Array.isArray(name) ? name : [name]
          )
        : Array.from(fieldsRef.current.keys()).map((key) => key.split('.'));

      const validationPromises = fieldsToValidate.map((path) =>
        validateField(path)
      );

      try {
        await Promise.all(validationPromises);

        // 에러가 있는지 확인
        const currentErrors = getFieldsError();
        const hasErrors = Object.values(currentErrors).some(
          (errors) => errors.length > 0
        );

        if (hasErrors) {
          onFinishFailed?.(currentErrors);
          throw new Error('Form validation failed');
        }

        onFinish?.(values);
        return values;
      } catch (error) {
        throw error;
      }
    },
    [validateField, values, onFinish, onFinishFailed]
  );

  // 폼 제출
  const submit = useCallback(() => {
    validateFields().catch(() => {
      // 에러는 validateFields에서 처리
    });
  }, [validateFields]);

  // 필드 터치 상태 확인
  const isFieldTouched = useCallback(
    (name: string | string[]): boolean => {
      const key = Array.isArray(name) ? name.join('.') : name;
      return touched[key] || false;
    },
    [touched]
  );

  const isFieldsTouched = useCallback(
    (nameList?: string[] | string[][]): boolean => {
      if (!nameList) {
        return Object.values(touched).some((t) => t);
      }

      const keys = (nameList as any[]).map((name) =>
        Array.isArray(name) ? name.join('.') : name
      );

      return keys.some((key) => touched[key]);
    },
    [touched]
  );

  // 필드 등록/해제
  const registerField = useCallback(
    (name: string | string[], field: FormFieldInstance) => {
      const key = Array.isArray(name) ? name.join('.') : name;
      fieldsRef.current.set(key, field);
    },
    []
  );

  const unregisterField = useCallback((name: string | string[]) => {
    const key = Array.isArray(name) ? name.join('.') : name;
    fieldsRef.current.delete(key);
  }, []);

  // 에러 관리
  const getFieldError = useCallback(
    (name: string | string[]): string[] => {
      const key = Array.isArray(name) ? name.join('.') : name;
      return errors[key] || [];
    },
    [errors]
  );

  const setFieldError = useCallback(
    (name: string | string[], fieldErrors: string[]) => {
      const key = Array.isArray(name) ? name.join('.') : name;
      setErrors((prev) => ({
        ...prev,
        [key]: fieldErrors,
      }));
    },
    []
  );

  const getFieldsError = useCallback((): FormErrors => {
    return errors;
  }, [errors]);

  // Form 인스턴스 (안정적인 참조 유지 - useRef 사용)
  const formRef = useRef<FormInstance<T>>({
    getFieldValue,
    getFieldsValue,
    setFieldValue,
    setFieldsValue,
    resetFields,
    validateFields,
    submit,
    isFieldTouched,
    isFieldsTouched,
  });

  // form 객체의 메서드들을 최신 함수로 업데이트
  formRef.current.getFieldValue = getFieldValue;
  formRef.current.getFieldsValue = getFieldsValue;
  formRef.current.setFieldValue = setFieldValue;
  formRef.current.setFieldsValue = setFieldsValue;
  formRef.current.resetFields = resetFields;
  formRef.current.validateFields = validateFields;
  formRef.current.submit = submit;
  formRef.current.isFieldTouched = isFieldTouched;
  formRef.current.isFieldsTouched = isFieldsTouched;

  const form = formRef.current;

  // Form Context (안정적인 참조 유지 - useRef 사용)
  const formContextRef = useRef<FormContextValue>({
    getFieldValue,
    setFieldValue,
    validateField,
    registerField,
    unregisterField,
    getFieldError,
    setFieldError,
    getFieldsError,
  });

  // formContext 객체의 메서드들을 최신 함수로 업데이트
  formContextRef.current.getFieldValue = getFieldValue;
  formContextRef.current.setFieldValue = setFieldValue;
  formContextRef.current.validateField = validateField;
  formContextRef.current.registerField = registerField;
  formContextRef.current.unregisterField = unregisterField;
  formContextRef.current.getFieldError = getFieldError;
  formContextRef.current.setFieldError = setFieldError;
  formContextRef.current.getFieldsError = getFieldsError;

  const formContext = formContextRef.current;

  return {
    form,
    formContext,
  };
}
