'use client';

import React, { useState, useCallback, createContext, useContext } from 'react';
import { type FormErrors } from '@repo/ui';
import { Form, FormItem } from '@repo/ui';
import { Input } from '@repo/ui';
import { Button } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import * as styles from './form.demo.css';

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormControlsContextType {
  injectStyles: boolean;
  setInjectStyles: (value: boolean) => void;
}

const FormControlsContext = createContext<FormControlsContextType | null>(null);

export function DemoFormBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);
  return (
    <FormControlsContext.Provider value={{ injectStyles, setInjectStyles }}>
      {children}
    </FormControlsContext.Provider>
  );
}

export function DemoFormBasicWithControls() {
  const context = useContext(FormControlsContext);
  if (!context)
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  return <DemoFormBasic />;
}

export function DemoFormBasicControls() {
  const context = useContext(FormControlsContext);
  if (!context)
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;

  const { injectStyles, setInjectStyles } = context;

  return (
    <Controls
      items={[
        {
          label: 'Inject Styles',
          control: (
            <Checkbox
              checked={injectStyles}
              onChange={setInjectStyles}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
      ]}
    />
  );
}

export function DemoFormBasic() {
  const controls = useContext(FormControlsContext);
  const injectStyles = controls?.injectStyles ?? false;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);
  const [formInstance, setFormInstance] = useState<any>(null);

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleReset = () => {
    if (formInstance) {
      formInstance.resetFields();
      setSubmitted(false);
      setFormData(null);
    }
  };

  const handleFormReady = useCallback((form: any) => {
    setFormInstance(form);
  }, []);

  return (
    <div
      className={`${styles.section} ${!injectStyles ? styles.formWrapperClass : ''}`}
    >
      <Form
        injectStyles={injectStyles}
        className={
          injectStyles
            ? undefined
            : `${styles.form} ${styles.layout.horizontal} ${styles.size.medium}`
        }
        initialValues={initialValues}
        onFormReady={handleFormReady}
        onFinish={(values: FormValues) => {
          setFormData(values as FormValues);
          setSubmitted(true);
          console.log('Form submitted:', values);
        }}
        onFinishFailed={(errors: FormErrors) => {
          console.log('Form validation failed:', errors);
        }}
      >
        <FormItem
          injectStyles={injectStyles}
          className={injectStyles ? undefined : styles.formItem}
          labelClassName={injectStyles ? undefined : styles.formItemLabel}
          inputWrapperClassName={injectStyles ? undefined : styles.inputWrapper}
          requiredMarkClassName={injectStyles ? undefined : styles.requiredMark}
          formItemControlClassName={
            injectStyles ? undefined : styles.formItemControl
          }
          formItemControlInputClassName={
            injectStyles ? undefined : styles.formItemControlInput
          }
          formItemControlStatusClassName={
            injectStyles ? undefined : styles.formItemControlStatus
          }
          formItemHelpClassName={injectStyles ? undefined : styles.formItemHelp}
          statusClassNames={
            injectStyles
              ? undefined
              : {
                  error:
                    `${styles.textSemanticError} ${styles.statusInput.error}`.trim(),
                  success:
                    `${styles.textSemanticSuccess} ${styles.statusInput.success}`.trim(),
                  warning:
                    `${styles.textSemanticWarning} ${styles.statusInput.warning}`.trim(),
                  validating:
                    `${styles.textSemanticValidating} ${styles.statusInput.validating}`.trim(),
                }
          }
          name="username"
          label="사용자명"
          required
          rules={[
            { required: true, message: '사용자명을 입력해주세요' },
            { min: 3, message: '사용자명은 최소 3자 이상이어야 합니다' },
          ]}
          hasFeedback
        >
          <Input
            placeholder="사용자명을 입력하세요"
            style={
              injectStyles
                ? undefined
                : {
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid var(--color-divider)',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }
            }
          />
        </FormItem>

        <FormItem
          injectStyles={injectStyles}
          className={injectStyles ? undefined : styles.formItem}
          labelClassName={injectStyles ? undefined : styles.formItemLabel}
          inputWrapperClassName={injectStyles ? undefined : styles.inputWrapper}
          requiredMarkClassName={injectStyles ? undefined : styles.requiredMark}
          formItemControlClassName={
            injectStyles ? undefined : styles.formItemControl
          }
          formItemControlInputClassName={
            injectStyles ? undefined : styles.formItemControlInput
          }
          formItemControlStatusClassName={
            injectStyles ? undefined : styles.formItemControlStatus
          }
          formItemHelpClassName={injectStyles ? undefined : styles.formItemHelp}
          statusClassNames={
            injectStyles
              ? undefined
              : {
                  error:
                    `${styles.textSemanticError} ${styles.statusInput.error}`.trim(),
                  success:
                    `${styles.textSemanticSuccess} ${styles.statusInput.success}`.trim(),
                  warning:
                    `${styles.textSemanticWarning} ${styles.statusInput.warning}`.trim(),
                  validating:
                    `${styles.textSemanticValidating} ${styles.statusInput.validating}`.trim(),
                }
          }
          name="email"
          label="이메일"
          required
          rules={[
            { required: true, message: '이메일을 입력해주세요' },
            {
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '올바른 이메일 형식이 아닙니다',
            },
          ]}
          hasFeedback
        >
          <Input
            type="email"
            placeholder="이메일을 입력하세요"
            style={
              injectStyles
                ? undefined
                : {
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid var(--color-divider)',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }
            }
          />
        </FormItem>

        <FormItem
          injectStyles={injectStyles}
          className={injectStyles ? undefined : styles.formItem}
          labelClassName={injectStyles ? undefined : styles.formItemLabel}
          inputWrapperClassName={injectStyles ? undefined : styles.inputWrapper}
          requiredMarkClassName={injectStyles ? undefined : styles.requiredMark}
          formItemControlClassName={
            injectStyles ? undefined : styles.formItemControl
          }
          formItemControlInputClassName={
            injectStyles ? undefined : styles.formItemControlInput
          }
          formItemControlStatusClassName={
            injectStyles ? undefined : styles.formItemControlStatus
          }
          formItemHelpClassName={injectStyles ? undefined : styles.formItemHelp}
          statusClassNames={
            injectStyles
              ? undefined
              : {
                  error:
                    `${styles.textSemanticError} ${styles.statusInput.error}`.trim(),
                  success:
                    `${styles.textSemanticSuccess} ${styles.statusInput.success}`.trim(),
                  warning:
                    `${styles.textSemanticWarning} ${styles.statusInput.warning}`.trim(),
                  validating:
                    `${styles.textSemanticValidating} ${styles.statusInput.validating}`.trim(),
                }
          }
          name="password"
          label="비밀번호"
          required
          rules={[
            { required: true, message: '비밀번호를 입력해주세요' },
            { min: 6, message: '비밀번호는 최소 6자 이상이어야 합니다' },
          ]}
          hasFeedback
        >
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요"
            style={
              injectStyles
                ? undefined
                : {
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid var(--color-divider)',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }
            }
          />
        </FormItem>

        <FormItem
          injectStyles={injectStyles}
          className={injectStyles ? undefined : styles.formItem}
          labelClassName={injectStyles ? undefined : styles.formItemLabel}
          inputWrapperClassName={injectStyles ? undefined : styles.inputWrapper}
          requiredMarkClassName={injectStyles ? undefined : styles.requiredMark}
          formItemControlClassName={
            injectStyles ? undefined : styles.formItemControl
          }
          formItemControlInputClassName={
            injectStyles ? undefined : styles.formItemControlInput
          }
          formItemControlStatusClassName={
            injectStyles ? undefined : styles.formItemControlStatus
          }
          formItemHelpClassName={injectStyles ? undefined : styles.formItemHelp}
          statusClassNames={
            injectStyles
              ? undefined
              : {
                  error:
                    `${styles.textSemanticError} ${styles.statusInput.error}`.trim(),
                  success:
                    `${styles.textSemanticSuccess} ${styles.statusInput.success}`.trim(),
                  warning:
                    `${styles.textSemanticWarning} ${styles.statusInput.warning}`.trim(),
                  validating:
                    `${styles.textSemanticValidating} ${styles.statusInput.validating}`.trim(),
                }
          }
          name="confirmPassword"
          label="비밀번호 확인"
          required
          rules={[
            { required: true, message: '비밀번호 확인을 입력해주세요' },
            {
              validator: (
                rule: any,
                value: string,
                callback: (error?: string) => void,
              ) => {
                const password = rule.form?.getFieldValue('password');
                if (value && password && value !== password) {
                  callback('비밀번호가 일치하지 않습니다');
                } else {
                  callback();
                }
              },
            },
          ]}
          hasFeedback
        >
          <Input
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            style={
              injectStyles
                ? undefined
                : {
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid var(--color-divider)',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }
            }
          />
        </FormItem>

        <div className={styles.buttonGroup}>
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--color-brand-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            제출
          </button>
          <button
            type="button"
            onClick={handleReset}
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--color-surface-hover)',
              color: 'var(--color-text-heading)',
              border: '1px solid var(--color-divider)',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            초기화
          </button>
        </div>

        {submitted && formData && (
          <div className={styles.result}>
            <h4>제출된 데이터:</h4>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </div>
        )}
      </Form>
    </div>
  );
}

export function DemoFormLayout() {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Vertical Layout</h3>
      <Form
        className={`${styles.form} ${styles.layout.vertical} ${styles.size.medium}`}
        layout="vertical"
      >
        <FormItem
          className={styles.formItem}
          labelClassName={styles.formItemLabel}
          inputWrapperClassName={styles.inputWrapper}
          name="field1"
          label="필드 1"
        >
          <Input
            placeholder="입력하세요"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid var(--color-divider)',
              borderRadius: '4px',
            }}
          />
        </FormItem>
        <FormItem
          className={styles.formItem}
          labelClassName={styles.formItemLabel}
          inputWrapperClassName={styles.inputWrapper}
          name="field2"
          label="필드 2"
        >
          <Input
            placeholder="입력하세요"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid var(--color-divider)',
              borderRadius: '4px',
            }}
          />
        </FormItem>
      </Form>

      <h3 className={styles.sectionTitle} style={{ marginTop: '2rem' }}>
        Inline Layout
      </h3>
      <Form
        className={`${styles.form} ${styles.layout.inline} ${styles.size.medium}`}
        layout="inline"
      >
        <FormItem
          className={`${styles.formItem} ${styles.inlineItem}`}
          labelClassName={styles.formItemLabel}
          inputWrapperClassName={styles.inputWrapper}
          name="inline1"
          label="필드 1"
        >
          <Input
            placeholder="입력하세요"
            style={{
              width: '150px',
              padding: '8px 12px',
              border: '1px solid var(--color-divider)',
              borderRadius: '4px',
            }}
          />
        </FormItem>
        <FormItem
          className={`${styles.formItem} ${styles.inlineItem}`}
          labelClassName={styles.formItemLabel}
          inputWrapperClassName={styles.inputWrapper}
          name="inline2"
          label="필드 2"
        >
          <Input
            placeholder="입력하세요"
            style={{
              width: '150px',
              padding: '8px 12px',
              border: '1px solid var(--color-divider)',
              borderRadius: '4px',
            }}
          />
        </FormItem>
        <button
          type="submit"
          style={{
            height: '40px',
            padding: '8px 16px',
            backgroundColor: 'oklch(64.8% 0.188 271.8)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          검색
        </button>
      </Form>
    </div>
  );
}

export function DemoFormValidation() {
  return (
    <div className={styles.section}>
      <Form
        className={`${styles.form} ${styles.layout.horizontal} ${styles.size.medium}`}
        onFinish={(values: any) => {
          alert('검증 성공: ' + JSON.stringify(values));
        }}
        onFinishFailed={(errors: FormErrors) => {
          alert('검증 실패: ' + JSON.stringify(errors));
        }}
      >
        <FormItem
          className={styles.formItem}
          labelClassName={styles.formItemLabel}
          inputWrapperClassName={styles.inputWrapper}
          formItemHelpClassName={styles.formItemHelp}
          requiredMarkClassName={styles.requiredMark}
          formItemControlClassName={styles.formItemControl}
          formItemControlInputClassName={styles.formItemControlInput}
          formItemControlStatusClassName={styles.formItemControlStatus}
          name="required"
          label="필수 필드"
          required
          rules={[{ required: true, message: '이 필드는 필수입니다' }]}
          hasFeedback
        >
          <Input
            placeholder="필수 입력"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid var(--color-divider)',
              borderRadius: '4px',
            }}
          />
        </FormItem>

        <FormItem
          className={styles.formItem}
          labelClassName={styles.formItemLabel}
          inputWrapperClassName={styles.inputWrapper}
          formItemHelpClassName={styles.formItemHelp}
          requiredMarkClassName={styles.requiredMark}
          formItemControlClassName={styles.formItemControl}
          formItemControlInputClassName={styles.formItemControlInput}
          formItemControlStatusClassName={styles.formItemControlStatus}
          required
          name="pattern"
          label="패턴 검증"
          rules={[
            {
              pattern: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
              message: '날짜 형식은 YYYY-MM-DD여야 합니다',
            },
          ]}
          help="예: 2024-01-01"
          hasFeedback
        >
          <Input
            placeholder="YYYY-MM-DD"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid var(--color-divider)',
              borderRadius: '4px',
            }}
          />
        </FormItem>

        <FormItem
          className={styles.formItem}
          labelClassName={styles.formItemLabel}
          inputWrapperClassName={styles.inputWrapper}
          formItemHelpClassName={styles.formItemHelp}
          formItemControlClassName={styles.formItemControl}
          formItemControlInputClassName={styles.formItemControlInput}
          name="length"
          label="길이 검증"
          rules={[
            { min: 5, message: '최소 5자 이상이어야 합니다' },
            { max: 10, message: '최대 10자까지 입력 가능합니다' },
          ]}
          hasFeedback
        >
          <Input
            placeholder="5-10자"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid var(--color-divider)',
              borderRadius: '4px',
            }}
          />
        </FormItem>

        <div className={styles.buttonGroup}>
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--color-brand-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            검증하기
          </button>
        </div>
      </Form>
    </div>
  );
}

export function DemoFormWithZod() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  // zod가 설치되어 있는지 확인하고 사용
  let z: any;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    z = require('zod');
  } catch {
    // zod가 설치되어 있지 않으면 안내 메시지 표시
    return (
      <div className={styles.section}>
        <p style={{ color: 'var(--color-text-secondary)', padding: '1rem' }}>
          Zod를 사용하려면 먼저 설치해주세요: <code>npm install zod</code>
        </p>
      </div>
    );
  }

  const emailSchema = z
    .string()
    .email('올바른 이메일 형식이 아닙니다')
    .min(1, '이메일을 입력해주세요');
  const passwordSchema = z
    .string()
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다')
    .max(20, '비밀번호는 최대 20자까지 입력 가능합니다');
  const ageSchema = z
    .number()
    .min(18, '18세 이상이어야 합니다')
    .max(100, '100세 이하여야 합니다');

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Zod Schema를 사용한 검증</h3>
      <Form
        className={`${styles.form} ${styles.layout.horizontal} ${styles.size.medium}`}
        onFinish={(values: any) => {
          setSubmitted(true);
          setFormData(values);
          console.log('Form submitted:', values);
        }}
        onFinishFailed={(errors: FormErrors) => {
          console.log('Form validation failed:', errors);
        }}
      >
        <FormItem
          className={styles.formItem}
          labelClassName={styles.formItemLabel}
          inputWrapperClassName={styles.inputWrapper}
          formItemControlClassName={styles.formItemControl}
          formItemControlInputClassName={styles.formItemControlInput}
          name="email"
          label="이메일 (Zod)"
          zodSchema={emailSchema}
          hasFeedback
        >
          <Input
            type="email"
            placeholder="이메일을 입력하세요"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid var(--color-divider)',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          />
        </FormItem>

        <FormItem
          className={styles.formItem}
          labelClassName={styles.formItemLabel}
          inputWrapperClassName={styles.inputWrapper}
          formItemControlClassName={styles.formItemControl}
          formItemControlInputClassName={styles.formItemControlInput}
          name="password"
          label="비밀번호 (Zod)"
          zodSchema={passwordSchema}
          hasFeedback
        >
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid var(--color-divider)',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          />
        </FormItem>

        <FormItem
          className={styles.formItem}
          labelClassName={styles.formItemLabel}
          inputWrapperClassName={styles.inputWrapper}
          formItemControlClassName={styles.formItemControl}
          formItemControlInputClassName={styles.formItemControlInput}
          name="age"
          label="나이 (Zod Number)"
          zodSchema={ageSchema}
          hasFeedback
        >
          <Input
            type="number"
            placeholder="나이를 입력하세요"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid var(--color-divider)',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          />
        </FormItem>

        <div className={styles.buttonGroup}>
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--color-brand-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            제출
          </button>
        </div>

        {submitted && formData && (
          <div className={styles.result}>
            <h4>제출된 데이터:</h4>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </div>
        )}
      </Form>
    </div>
  );
}
