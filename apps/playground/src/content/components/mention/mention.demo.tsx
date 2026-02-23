'use client';

import React, { useState } from 'react';
import { Mention } from '@cooolpower/headless-ui';
import { MentionOption } from '@cooolpower/headless-ui';
import * as styles from './mention.demo.css';

// 사용자 목록 데이터
const users: MentionOption[] = [
  { label: '07akioni', value: '07akioni' },
  { label: 'star-kirby', value: 'star-kirby' },
  { label: 'Guilherme-Vasconcelos', value: 'Guilherme-Vasconcelos' },
  { label: 'imagine10255', value: 'imagine10255' },
  { label: 'songjianet', value: 'songjianet' },
  { label: 'YanYuanFE', value: 'YanYuanFE' },
  { label: 'Yidadaa', value: 'Yidadaa' },
  { label: 'Zippy', value: 'Zippy' },
  { label: 'Zippy-zhang', value: 'Zippy-zhang' },
];

// 기본 Mention
export function DemoMentionBasic() {
  const [value, setValue] = useState('');

  return (
    <div style={{ padding: '2rem' }}>
      <Mention
        value={value}
        onChange={setValue}
        options={users}
        placeholder="Type @ to mention someone"
        className={styles.mention}
        inputWrapperClassName={styles.inputWrapper}
        inputClassName={styles.input}
        dropdownClassName={styles.dropdown}
        optionClassName={styles.option}
      />
      <p
        style={{
          marginTop: '1rem',
          color: 'var(--color-text-secondary)',
          fontSize: '14px',
        }}
      >
        현재 값: {value || '(비어있음)'}
      </p>
    </div>
  );
}

// With Default Value
export function DemoMentionDefaultValue() {
  const [value, setValue] = useState('Hello @07akioni, how are you?');

  return (
    <div style={{ padding: '2rem' }}>
      <Mention
        value={value}
        onChange={setValue}
        options={users}
        placeholder="Type @ to mention someone"
        className={styles.mention}
        inputWrapperClassName={styles.inputWrapper}
        inputClassName={styles.input}
        dropdownClassName={styles.dropdown}
        optionClassName={styles.option}
      />
      <p
        style={{
          marginTop: '1rem',
          color: 'var(--color-text-secondary)',
          fontSize: '14px',
        }}
      >
        현재 값: {value || '(비어있음)'}
      </p>
    </div>
  );
}

// Custom Prefix
export function DemoMentionCustomPrefix() {
  const [value, setValue] = useState('');

  return (
    <div style={{ padding: '2rem' }}>
      <Mention
        value={value}
        onChange={setValue}
        options={users}
        prefix="#"
        placeholder="Type # to mention someone"
        className={styles.mention}
        inputWrapperClassName={styles.inputWrapper}
        inputClassName={styles.input}
        dropdownClassName={styles.dropdown}
        optionClassName={styles.option}
      />
      <p
        style={{
          marginTop: '1rem',
          color: 'var(--color-text-secondary)',
          fontSize: '14px',
        }}
      >
        현재 값: {value || '(비어있음)'}
      </p>
    </div>
  );
}

// Custom Separator
export function DemoMentionCustomSeparator() {
  const [value, setValue] = useState('');

  return (
    <div style={{ padding: '2rem' }}>
      <Mention
        value={value}
        onChange={setValue}
        options={users}
        separator="\n"
        placeholder="Type @ to mention (Enter to new line)"
        className={styles.mention}
        inputWrapperClassName={styles.inputWrapper}
        inputClassName={styles.input}
        dropdownClassName={styles.dropdown}
        optionClassName={styles.option}
      />
      <p
        style={{
          marginTop: '1rem',
          color: 'var(--color-text-secondary)',
          fontSize: '14px',
        }}
      >
        현재 값: {value || '(비어있음)'}
      </p>
    </div>
  );
}

// Disabled
export function DemoMentionDisabled() {
  const [value, setValue] = useState('Hello @07akioni');

  return (
    <div style={{ padding: '2rem' }}>
      <Mention
        value={value}
        onChange={setValue}
        options={users}
        disabled
        placeholder="Type @ to mention someone"
        className={styles.mention}
        inputWrapperClassName={styles.inputWrapper}
        inputClassName={styles.input}
        dropdownClassName={styles.dropdown}
        optionClassName={styles.option}
      />
      <p
        style={{
          marginTop: '1rem',
          color: 'var(--color-text-secondary)',
          fontSize: '14px',
        }}
      >
        비활성화 상태
      </p>
    </div>
  );
}

// Custom Get Mention
export function DemoMentionCustomGetMention() {
  const [value, setValue] = useState('');

  return (
    <div style={{ padding: '2rem' }}>
      <Mention
        value={value}
        onChange={setValue}
        options={users}
        getMention={(option) => `@${option.label}`}
        placeholder="Type @ to mention someone"
        className={styles.mention}
        inputWrapperClassName={styles.inputWrapper}
        inputClassName={styles.input}
        dropdownClassName={styles.dropdown}
        optionClassName={styles.option}
      />
      <p
        style={{
          marginTop: '1rem',
          color: 'var(--color-text-secondary)',
          fontSize: '14px',
        }}
      >
        현재 값: {value || '(비어있음)'}
      </p>
    </div>
  );
}

// Load Remote Options
export function DemoMentionLoadRemoteOptions() {
  const [value, setValue] = useState('');

  // 원격 검색 시뮬레이션
  const handleSearch = async (query: string): Promise<MentionOption[]> => {
    // 실제로는 API 호출을 수행합니다
    return new Promise((resolve) => {
      setTimeout(() => {
        // 쿼리로 필터링된 결과 반환
        const filtered = users.filter(
          (user) =>
            user.label.toLowerCase().includes(query.toLowerCase()) ||
            user.value.toLowerCase().includes(query.toLowerCase()),
        );
        resolve(filtered);
      }, 500); // 500ms 지연으로 로딩 상태 시뮬레이션
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Mention
        value={value}
        onChange={setValue}
        onSearch={handleSearch}
        placeholder="Type @ to search users (remote)"
        className={styles.mention}
        inputWrapperClassName={styles.inputWrapper}
        inputClassName={styles.input}
        dropdownClassName={styles.dropdown}
        optionClassName={styles.option}
      />
      <p
        style={{
          marginTop: '1rem',
          color: 'var(--color-text-secondary)',
          fontSize: '14px',
        }}
      >
        현재 값: {value || '(비어있음)'}
      </p>
      <p
        style={{
          marginTop: '0.5rem',
          color: 'var(--color-text-muted)',
          fontSize: '12px',
        }}
      >
        💡 @ 기호 입력 후 사용자 이름을 입력하면 원격에서 검색됩니다.
      </p>
    </div>
  );
}

// Empty Slot
export function DemoMentionEmptySlot() {
  const [value, setValue] = useState('');

  // 항상 빈 결과를 반환하는 검색 함수
  const handleSearch = async (query: string): Promise<MentionOption[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]); // 항상 빈 결과 반환
      }, 300);
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Mention
        value={value}
        onChange={setValue}
        onSearch={handleSearch}
        empty={
          <div
            style={{
              padding: '16px',
              textAlign: 'center',
              color: 'var(--color-text-secondary)',
              fontSize: '14px',
            }}
          >
            <div style={{ marginBottom: '8px' }}>🔍</div>
            <div>검색 결과가 없습니다</div>
            <div
              style={{
                marginTop: '4px',
                fontSize: '12px',
                color: 'var(--color-text-muted)',
              }}
            >
              다른 키워드로 검색해보세요
            </div>
          </div>
        }
        placeholder="Type @ to search (always empty)"
        className={styles.mention}
        inputWrapperClassName={styles.inputWrapper}
        inputClassName={styles.input}
        dropdownClassName={styles.dropdown}
        optionClassName={styles.option}
      />
      <p
        style={{
          marginTop: '1rem',
          color: 'var(--color-text-secondary)',
          fontSize: '14px',
        }}
      >
        현재 값: {value || '(비어있음)'}
      </p>
    </div>
  );
}
