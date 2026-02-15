'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { DynamicTags } from '@repo/ui';
import { Icon } from '@repo/ui';
import * as styles from './dynamic-tags.demo.css';

// 기본 Dynamic Tags 예제
export function DemoDynamicTagsBasic() {
  const [tags, setTags] = useState<string[]>(['Tag1', 'Tag2']);

  return (
    <div className={styles.container}>
      <DynamicTags
        value={tags}
        onChange={setTags}
        classNames={{
          dynamicTags: styles.dynamicTags,
          tag: styles.tag,
          tagInput: styles.tagInput,
          addButton: styles.addButton,
        }}
        size="custom"
      />
      <div className={styles.valueDisplay}>값: {JSON.stringify(tags)}</div>
    </div>
  );
}

// 최대 개수 제한 예제
export function DemoDynamicTagsMax() {
  const [tags, setTags] = useState<string[]>(['Tag1', 'Tag2']);

  return (
    <div className={styles.container}>
      <DynamicTags
        value={tags}
        onChange={setTags}
        max={5}
        classNames={{
          dynamicTags: styles.dynamicTags,
          tag: styles.tag,
          tagInput: styles.tagInput,
          addButton: styles.addButton,
        }}
        size="custom"
      />
      <div className={styles.valueDisplay}>
        값: {JSON.stringify(tags)} (최대 5개)
      </div>
    </div>
  );
}

// 비활성화 예제
export function DemoDynamicTagsDisabled() {
  const [tags] = useState<string[]>(['Tag1', 'Tag2', 'Tag3']);

  return (
    <div className={styles.container}>
      <DynamicTags
        value={tags}
        disabled
        classNames={{
          dynamicTags: styles.dynamicTags,
          tag: styles.tag,
          tagInput: styles.tagInput,
          addButton: styles.addButton,
        }}
        size="custom"
      />
    </div>
  );
}

// 크기 변형 예제
export function DemoDynamicTagsSizes() {
  const [smallTags, setSmallTags] = useState<string[]>(['Small']);
  const [mediumTags, setMediumTags] = useState<string[]>(['Medium']);
  const [largeTags, setLargeTags] = useState<string[]>(['Large']);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Small</h3>
        <DynamicTags
          value={smallTags}
          onChange={setSmallTags}
          size="small"
          classNames={{
            dynamicTags: styles.dynamicTags,
            tag: styles.tag,
            tagInput: styles.tagInput,
            addButton: styles.addButton,
          }}
        />
      </div>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Medium</h3>
        <DynamicTags
          value={mediumTags}
          onChange={setMediumTags}
          size="medium"
          classNames={{
            dynamicTags: styles.dynamicTags,
            tag: styles.tag,
            tagInput: styles.tagInput,
            addButton: styles.addButton,
          }}
        />
      </div>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Large</h3>
        <DynamicTags
          value={largeTags}
          onChange={setLargeTags}
          size="large"
          classNames={{
            dynamicTags: styles.dynamicTags,
            tag: styles.tag,
            tagInput: styles.tagInput,
            addButton: styles.addButton,
          }}
        />
      </div>
    </div>
  );
}

// 커스텀 생성/제거 핸들러 예제
export function DemoDynamicTagsHandlers() {
  const [tags, setTags] = useState<string[]>(['Tag1']);

  return (
    <div className={styles.container}>
      <DynamicTags
        value={tags}
        onChange={setTags}
        onCreate={async (tag) => {
          console.log('태그 생성:', tag);
          if (tag.length < 3) {
            alert('태그는 최소 3글자 이상이어야 합니다.');
            return false;
          }
          return true;
        }}
        onRemove={async (tag, index) => {
          console.log('태그 제거:', tag, index);
          return confirm(`${tag} 태그를 제거하시겠습니까?`);
        }}
        classNames={{
          dynamicTags: styles.dynamicTags,
          tag: styles.tag,
          tagInput: styles.tagInput,
          addButton: styles.addButton,
        }}
      />
      <div className={styles.valueDisplay}>값: {JSON.stringify(tags)}</div>
    </div>
  );
}

// 커스텀 렌더링 예제
export function DemoDynamicTagsCustomRender() {
  const [tags, setTags] = useState<string[]>(['Custom1', 'Custom2']);

  return (
    <div className={styles.container}>
      <DynamicTags
        value={tags}
        onChange={setTags}
        renderTag={(tag, index) => (
          <div
            key={`${tag}-${index}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 12px',
              backgroundColor: 'var(--color-brand-primary)',
              color: 'var(--color-text-on-primary)',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          >
            {tag}
            <button
              type="button"
              onClick={() => {
                const newTags = tags.filter((_, i) => i !== index);
                setTags(newTags);
              }}
              style={{
                marginLeft: '8px',
                background: 'none',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer',
                padding: '0',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              <Icon icon={X} size="small" />
            </button>
          </div>
        )}
        classNames={{
          dynamicTags: styles.dynamicTags,
          tag: styles.renderTag,
          tagInput: styles.tagInput,
          addButton: styles.addButton,
        }}
      />
    </div>
  );
}
