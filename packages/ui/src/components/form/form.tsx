'use client';

import React, {
  forwardRef,
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { useForm } from './use-form';
import { Input } from '../input/input';
import { zodSchemaToFormRules, validateWithZod } from './zod-utils';
import { formCss as _formCss } from './form.styles';
import { cx } from '../../utils';
import type {
  FormProps,
  FormItemProps,
  FormRule,
  FormErrors,
  FormInstance,
  UseFormProps,
  UseFormReturn,
  FormContextValue,
  FormFieldInstance,
} from './type-form';

export const FormCss = _formCss;

// Form Context
const FormContext = createContext<FormContextValue | null>(null);
const FormStyleContext = createContext<boolean>(false);

export function useFormContext(): FormContextValue | null {
  return useContext(FormContext);
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  (
    {
      children,
      form: externalForm,
      initialValues,
      onFinish,
      onFinishFailed,
      onValuesChange,
      validateTrigger = 'onChange',
      layout = 'horizontal',
      size = 'small',
      disabled = false,
      className,
      onFormReady,
      injectStyles = true,
      ...props
    },
    ref,
  ) => {
    const internalFormHook = useForm({
      initialValues,
      onFinish,
      onFinishFailed,
      onValuesChange,
      validateTrigger,
    });

    // 외부에서 전달된 form 인스턴스가 있으면 사용, 없으면 내부에서 생성
    const form = externalForm || internalFormHook.form;
    const formContext = internalFormHook.formContext;

    // form 인스턴스를 외부에 노출 (한 번만 호출)
    const onFormReadyRef = useRef(onFormReady);
    const hasCalledRef = useRef(false);

    useEffect(() => {
      onFormReadyRef.current = onFormReady;
    }, [onFormReady]);

    useEffect(() => {
      // form 인스턴스를 한 번만 호출 (form 객체는 안정적인 참조를 유지해야 함)
      if (onFormReadyRef.current && !hasCalledRef.current) {
        onFormReadyRef.current(form);
        hasCalledRef.current = true;
      }
    }, [form]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      form.submit();
    };

    return (
      <FormContext.Provider value={formContext}>
        <FormStyleContext.Provider value={injectStyles}>
          <form
            ref={ref}
            className={cx('hcForm', className)}
            data-layout={layout}
            data-size={size}
            data-disabled={disabled ? 'true' : 'false'}
            onSubmit={handleSubmit}
            {...props}
          >
            {injectStyles && <style suppressHydrationWarning>{_formCss}</style>}
            {children}
          </form>
        </FormStyleContext.Provider>
      </FormContext.Provider>
    );
  },
);

export const FormItem = forwardRef<HTMLDivElement, FormItemProps>(
  (
    {
      children,
      name,
      label,
      rules = [],
      zodSchema,
      required = false,
      tooltip,
      help,
      validateStatus,
      hasFeedback = false,
      className,
      injectStyles = true,
      labelClassName,
      inputWrapperClassName,
      requiredMarkClassName,
      formItemControlClassName,
      formItemControlInputClassName,
      formItemControlStatusClassName,
      formItemHelpClassName,
      statusClassNames,
      ...props
    },
    ref,
  ) => {
    const context = useFormContext();
    const stylesInjectedByForm = useContext(FormStyleContext);
    const fieldName = name ? (Array.isArray(name) ? name : [name]) : undefined;
    const [isValidating, setIsValidating] = useState(false);

    // 필드 값 가져오기
    // fieldValue를 state로 관리하여 리렌더링 보장
    const [fieldValue, setFieldValueState] = useState<any>(() => {
      return fieldName && context
        ? context.getFieldValue(fieldName)
        : undefined;
    });

    // 필드 에러 가져오기
    const fieldErrors = fieldName
      ? context?.getFieldError(fieldName) || []
      : [];
    const hasError = fieldErrors.length > 0;
    const status =
      validateStatus ||
      (isValidating ? 'validating' : hasError ? 'error' : undefined);

    // Status에 따른 CSS 클래스명 반환 함수 (텍스트용)
    const getStatusTextClassName = (
      status?: 'success' | 'warning' | 'error' | 'validating',
    ): string | undefined => {
      if (injectStyles && status) return `hcFormStatusText--${status}`;
      if (!statusClassNames || !status) return undefined;

      // statusClassNames.error는 "textSemanticError statusInput.error" 형태
      // 텍스트에는 textSemanticError만 필요하므로 첫 번째 클래스만 추출
      const fullClassName = (() => {
        switch (status) {
          case 'error':
            return statusClassNames.error;
          case 'success':
            return statusClassNames.success;
          case 'warning':
            return statusClassNames.warning;
          case 'validating':
            return statusClassNames.validating;
          default:
            return undefined;
        }
      })();

      if (!fullClassName) return undefined;

      // 공백으로 분리하여 첫 번째 클래스만 반환 (텍스트 색상용)
      return fullClassName.split(' ')[0];
    };

    // Status에 따른 CSS 클래스명 반환 함수 (Input border 색상용)
    const getStatusInputClassName = (
      status?: 'success' | 'warning' | 'error' | 'validating',
    ): string | undefined => {
      if (injectStyles && status) return `hcFormStatusInput--${status}`;
      if (!statusClassNames || !status) return undefined;

      // statusClassNames.error는 "textSemanticError statusInput.error" 형태
      // Input에는 statusInput.error만 필요하므로 두 번째 클래스만 추출
      const fullClassName = (() => {
        switch (status) {
          case 'error':
            return statusClassNames.error;
          case 'success':
            return statusClassNames.success;
          case 'warning':
            return statusClassNames.warning;
          case 'validating':
            return statusClassNames.validating;
          default:
            return undefined;
        }
      })();

      if (!fullClassName) return undefined;

      // 공백으로 분리하여 두 번째 클래스만 반환 (Input border 색상용)
      const classes = fullClassName.split(' ');
      return classes.length > 1 ? classes[1] : undefined;
    };

    // zod schema를 FormRule로 변환
    const zodRules = useMemo(() => {
      if (zodSchema) {
        return zodSchemaToFormRules(zodSchema);
      }
      return [];
    }, [zodSchema]);

    // 검증 함수
    const validate = useCallback(
      async (value: any): Promise<string[]> => {
        if (!fieldName || !context) return [];

        const errors: string[] = [];

        // zod schema가 있으면 먼저 zod로 검증
        if (zodSchema) {
          const zodErrors = await validateWithZod(zodSchema, value);
          if (zodErrors.length > 0) {
            return zodErrors;
          }
        }

        // 기존 rules와 zod에서 변환된 rules 결합
        const allRules = required
          ? [
              { required: true, message: `${label || '필드'}를 입력해주세요` },
              ...zodRules,
              ...rules,
            ]
          : [...zodRules, ...rules];

        for (const rule of allRules) {
          // Required 검증
          if (rule.required) {
            if (value === undefined || value === null || value === '') {
              errors.push(rule.message || `${label || '필드'}를 입력해주세요`);
              continue;
            }
            if (
              typeof value === 'string' &&
              rule.whitespace !== false &&
              value.trim() === ''
            ) {
              errors.push(rule.message || `${label || '필드'}를 입력해주세요`);
              continue;
            }
          }

          // Type 검증
          if (
            rule.type &&
            value !== undefined &&
            value !== null &&
            value !== ''
          ) {
            const valueType = Array.isArray(value) ? 'array' : typeof value;
            if (valueType !== rule.type) {
              errors.push(
                rule.message || `올바른 ${rule.type} 형식이 아닙니다`,
              );
              continue;
            }
          }

          // String 길이 검증
          if (typeof value === 'string') {
            if (rule.min !== undefined && value.length < rule.min) {
              errors.push(
                rule.message || `최소 ${rule.min}자 이상이어야 합니다`,
              );
              continue;
            }
            if (rule.max !== undefined && value.length > rule.max) {
              errors.push(
                rule.message || `최대 ${rule.max}자까지 입력 가능합니다`,
              );
              continue;
            }
            if (rule.len !== undefined && value.length !== rule.len) {
              errors.push(rule.message || `${rule.len}자여야 합니다`);
              continue;
            }
          }

          // Number 검증
          if (typeof value === 'number') {
            if (rule.min !== undefined && value < rule.min) {
              errors.push(rule.message || `최소 ${rule.min} 이상이어야 합니다`);
              continue;
            }
            if (rule.max !== undefined && value > rule.max) {
              errors.push(rule.message || `최대 ${rule.max} 이하여야 합니다`);
              continue;
            }
          }

          // Pattern 검증
          if (rule.pattern && typeof value === 'string' && value) {
            if (!rule.pattern.test(value)) {
              errors.push(rule.message || '올바른 형식이 아닙니다');
              continue;
            }
          }

          // Custom validator
          if (rule.validator) {
            try {
              await new Promise<void>((resolve, reject) => {
                // validator에 context 접근 가능하도록 rule에 추가
                const ruleWithContext = { ...rule, form: context } as any;
                rule.validator!(ruleWithContext, value, (error?: string) => {
                  if (error) {
                    errors.push(error);
                    reject(new Error(error));
                  } else {
                    resolve();
                  }
                });
              });
            } catch {
              // 에러는 이미 errors 배열에 추가됨
            }
          }
        }

        return errors;
      },
      [fieldName, context, rules, required, label],
    );

    // 필드 등록 및 해제
    useEffect(() => {
      if (!fieldName || !context) return;

      const fieldInstance = {
        validate: async () => {
          setIsValidating(true);
          const value = context.getFieldValue(fieldName);
          const errors = await validate(value);
          context.setFieldError(fieldName, errors);
          setIsValidating(false);
          if (errors.length > 0) {
            throw new Error(errors[0]);
          }
        },
        getValue: () => context.getFieldValue(fieldName),
        setValue: (value: any) => context.setFieldValue(fieldName, value),
        getErrors: () => context.getFieldError(fieldName),
        setErrors: (errors: string[]) =>
          context.setFieldError(fieldName, errors),
        isTouched: () => false, // 간단한 구현
        setTouched: () => {}, // 간단한 구현
      };

      context.registerField(fieldName, fieldInstance);

      return () => {
        context.unregisterField(fieldName);
      };
    }, [fieldName, context, validate]);

    // Input onChange 핸들러 - setFieldValue 호출 후 fieldValue 즉시 업데이트
    const handleInputChange = useCallback(
      (newValue: string, event?: React.ChangeEvent<HTMLInputElement>) => {
        if (!fieldName || !context) return;

        // form context에 값 설정
        context.setFieldValue(fieldName, newValue);

        // fieldValue 즉시 업데이트 (리렌더링 보장)
        setFieldValueState(newValue);

        // 검증 트리거 (onChange)
        if (rules.length > 0 || required) {
          validate(newValue).then((errors) => {
            context.setFieldError(fieldName, errors);
          });
        }
      },
      [fieldName, context, rules, required, validate],
    );

    // Input onBlur 핸들러
    const handleInputBlur = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        if (!fieldName || !context) return;

        const value = context.getFieldValue(fieldName);
        if (rules.length > 0 || required) {
          validate(value).then((errors) => {
            context.setFieldError(fieldName, errors);
          });
        }
      },
      [fieldName, context, rules, required, validate],
    );

    return (
      <div ref={ref} className={cx('hcFormItem', className)} {...props}>
        {injectStyles && !stylesInjectedByForm && (
          <style suppressHydrationWarning>{_formCss}</style>
        )}
        {label && (
          <div className={cx('hcFormItemLabel', labelClassName)}>
            <label>
              {label}
              {required && (
                <span
                  className={cx(
                    'hcFormItemRequiredMark',
                    requiredMarkClassName,
                  )}
                >
                  *
                </span>
              )}
            </label>
            {tooltip && <span>{tooltip}</span>}
          </div>
        )}

        <div className={cx('hcFormItemInputWrapper', inputWrapperClassName)}>
          <div className={cx('hcFormItemControl', formItemControlClassName)}>
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                // Input 컴포넌트인 경우 form context와 연결
                const isInputComponent =
                  child.type === Input ||
                  (typeof child.type === 'function' &&
                    (child.type as any).displayName === 'Input') ||
                  (typeof child.type === 'function' &&
                    child.type.name === 'Input');

                if (isInputComponent) {
                  // Input 컴포넌트는 useInput hook을 사용하므로 value와 onChange를 직접 전달
                  const childProps = child.props as any;
                  const wrapperClassName = cx(
                    childProps.className,
                    'hcFormItemControlInput',
                    formItemControlInputClassName,
                  );

                  // Input 요소에 직접 적용할 className (status에 따른 border 색상)
                  // status가 없으면 기본 borderColor 클래스 사용
                  const inputElementClassName = getStatusInputClassName(status);

                  // name prop에 따라 적절한 autocomplete 값 자동 설정
                  const getAutoCompleteValue = (
                    name: string | string[] | undefined,
                    existingAutoComplete?: string,
                  ): string | undefined => {
                    // 사용자가 명시적으로 설정한 경우 우선
                    if (existingAutoComplete !== undefined) {
                      return existingAutoComplete;
                    }

                    if (!name) return undefined;

                    const fieldName = Array.isArray(name)
                      ? name.join('-')
                      : name;
                    const lowerName = fieldName.toLowerCase();

                    // 일반적인 필드 이름 매핑
                    const autoCompleteMap: Record<string, string> = {
                      username: 'username',
                      email: 'email',
                      password: 'current-password',
                      'confirm-password': 'new-password',
                      confirmpassword: 'new-password',
                      name: 'name',
                      'first-name': 'given-name',
                      firstname: 'given-name',
                      'last-name': 'family-name',
                      lastname: 'family-name',
                      phone: 'tel',
                      'phone-number': 'tel',
                      phonenumber: 'tel',
                      address: 'street-address',
                      city: 'address-level2',
                      state: 'address-level1',
                      country: 'country',
                      zip: 'postal-code',
                      'zip-code': 'postal-code',
                      zipcode: 'postal-code',
                      'postal-code': 'postal-code',
                      postalcode: 'postal-code',
                    };

                    // 정확한 매칭
                    if (autoCompleteMap[lowerName]) {
                      return autoCompleteMap[lowerName];
                    }

                    // 부분 매칭 (예: "basicForm-username" -> "username")
                    for (const [key, value] of Object.entries(
                      autoCompleteMap,
                    )) {
                      if (lowerName.includes(key)) {
                        return value;
                      }
                    }

                    return undefined;
                  };

                  const finalName = fieldName
                    ? Array.isArray(fieldName)
                      ? fieldName.join('.')
                      : fieldName
                    : childProps.name;

                  // fieldName과 context가 있을 때만 controlled로 동작
                  const isControlled = fieldName && context;
                  const inputProps: any = {
                    ...(child.props as object),
                    className: wrapperClassName || undefined,
                    inputClassName: inputElementClassName,
                  };

                  if (isControlled) {
                    // Controlled일 때는 fieldValue가 undefined가 아닐 때만 value 설정
                    // undefined일 때는 value를 설정하지 않아 uncontrolled로 동작
                    if (fieldValue !== undefined) {
                      inputProps.value = String(fieldValue);
                    }
                    inputProps.defaultValue = undefined;
                  } else {
                    // Uncontrolled일 때는 원래 props 사용
                    if (childProps.value !== undefined) {
                      inputProps.value = childProps.value;
                    }
                    if (childProps.defaultValue !== undefined) {
                      inputProps.defaultValue = childProps.defaultValue;
                    }
                  }

                  inputProps.onChange = (
                    value: string,
                    event?: React.ChangeEvent<HTMLInputElement>,
                  ) => {
                    if (isControlled) {
                      handleInputChange(value, event);
                    }
                    // 원래 onChange도 호출
                    if (childProps.onChange) {
                      childProps.onChange(value, event);
                    }
                  };

                  inputProps.onBlur = (
                    event: React.FocusEvent<HTMLInputElement>,
                  ) => {
                    if (isControlled) {
                      handleInputBlur(event);
                    }
                    // 원래 onBlur도 호출
                    if (childProps.onBlur) {
                      childProps.onBlur(event);
                    }
                  };

                  inputProps.name = finalName;
                  inputProps.autoComplete =
                    getAutoCompleteValue(fieldName, childProps.autoComplete) ||
                    childProps.autoComplete;

                  return React.cloneElement(child, inputProps);
                }
                // 일반 input 엘리먼트인 경우
                if (
                  child.type === 'input' ||
                  (typeof child.type === 'string' && child.type === 'input')
                ) {
                  const childProps =
                    child.props as React.InputHTMLAttributes<HTMLInputElement>;
                  return React.cloneElement(child, {
                    ...(child.props as object),
                    value:
                      fieldValue !== undefined
                        ? String(fieldValue || '')
                        : childProps.value,
                    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                      handleInputChange(event.target.value, event);
                      if (childProps.onChange) {
                        childProps.onChange(event);
                      }
                    },
                    onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
                      handleInputBlur(event);
                      if (childProps.onBlur) {
                        childProps.onBlur(event);
                      }
                    },
                    name: fieldName
                      ? Array.isArray(fieldName)
                        ? fieldName.join('.')
                        : fieldName
                      : childProps.name,
                  } as any);
                }
                // 기타 컴포넌트
                return React.cloneElement(child, {
                  ...(child.props as object),
                  name: fieldName,
                } as any);
              }
              return child;
            })}
            {hasFeedback && status && (
              <span
                className={cx(
                  'hcFormItemControlStatus',
                  formItemControlStatusClassName,
                )}
              >
                {status === 'error' && '❌'}
                {status === 'success' && '✅'}
                {status === 'warning' && '⚠️'}
                {status === 'validating' && '⟳'}
              </span>
            )}
          </div>

          {(help || hasError) && (
            <div className={cx('hcFormItemHelp', formItemHelpClassName)}>
              {hasError ? (
                <div className={getStatusTextClassName(status)}>
                  {fieldErrors[0]}
                </div>
              ) : (
                help && (
                  <div className={getStatusTextClassName(status)}>{help}</div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    );
  },
);

Form.displayName = 'Form';
FormItem.displayName = 'FormItem';

// Form.useForm 패턴 지원
type FormComponent = typeof Form & { useForm: typeof useForm };
(Form as FormComponent).useForm = useForm;
