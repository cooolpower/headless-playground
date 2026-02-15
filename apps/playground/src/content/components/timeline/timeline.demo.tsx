'use client';

import React, { createContext, useContext, useState } from 'react';
import { CheckCircle2, Clock } from 'lucide-react';
import { Icon } from '@repo/ui';
import {
  Timeline,
  TimelineItem,
} from '@repo/ui';
import { Input } from '@repo/ui';
import { Select } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import type { SelectOption } from '@repo/ui';
import * as styles from './timeline.demo.css';

// Timeline Controls Context
interface TimelineControlsContextType {
  mode: 'left' | 'right' | 'alternate' | undefined;
  setMode: (mode: 'left' | 'right' | 'alternate' | undefined) => void;
  pending: string;
  setPending: (pending: string) => void;
  usePending: boolean;
  setUsePending: (usePending: boolean) => void;
  injectStyles: boolean;
  setInjectStyles: (value: boolean) => void;
}

const TimelineControlsContext =
  createContext<TimelineControlsContextType | null>(null);

// Provider
export function DemoTimelineBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<'left' | 'right' | 'alternate' | undefined>(
    undefined,
  );
  const [pending, setPending] = useState(
    '더 많은 이벤트가 있을 수 있습니다...',
  );
  const [usePending, setUsePending] = useState(false);
  const [injectStyles, setInjectStyles] = useState(true);

  return (
    <TimelineControlsContext.Provider
      value={{
        mode,
        setMode,
        pending,
        setPending,
        usePending,
        setUsePending,
        injectStyles,
        setInjectStyles,
      }}
    >
      {children}
    </TimelineControlsContext.Provider>
  );
}

// 기본 Timeline (컨트롤러와 함께 사용될 컴포넌트)
export function DemoTimelineBasicWithControls() {
  const context = useContext(TimelineControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { mode, pending, usePending, injectStyles } = context;

  return (
    <div
      className={`${styles.container} ${!injectStyles ? styles.timelineWrapperClass : ''}`}
    >
      <Timeline
        mode={mode}
        pending={usePending ? pending : undefined}
        injectStyles={injectStyles}
        classNames={
          injectStyles
            ? undefined
            : {
                timeline: styles.timeline,
                item: styles.item,
                itemTail: styles.itemTail,
                itemHead: styles.itemHead,
                dot: styles.dot,
                itemContent: styles.itemContent,
                itemLabel: styles.itemLabel,
                itemDescription: styles.itemDescription,
              }
        }
      >
        <TimelineItem label="2024-01-01">프로젝트 시작</TimelineItem>
        <TimelineItem label="2024-01-15">첫 번째 마일스톤 완료</TimelineItem>
        <TimelineItem label="2024-02-01">두 번째 마일스톤 완료</TimelineItem>
      </Timeline>
    </div>
  );
}

// Timeline Controls
export function DemoTimelineBasicControls() {
  const context = useContext(TimelineControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    mode,
    setMode,
    pending,
    setPending,
    usePending,
    setUsePending,
    injectStyles,
    setInjectStyles,
  } = context;

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
        {
          label: '모드 (Mode)',
          control: (
            <Select
              options={[
                { label: 'Default', value: '' },
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
                { label: 'Alternate', value: 'alternate' },
              ]}
              value={mode || ''}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setMode(val === '' ? undefined : (val as typeof mode));
                }
              }}
              placeholder="모드 선택"
              size="small"
            />
          ),
        },
        {
          label: 'Pending 표시',
          control: (
            <Checkbox
              checked={usePending}
              onChange={(checked) => setUsePending(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: 'Pending 텍스트',
          control: (
            <Input
              type="text"
              value={pending}
              onChange={setPending}
              disabled={!usePending}
              placeholder="Pending 텍스트"
              size="small"
            />
          ),
        },
      ]}
    />
  );
}

export function DemoTimelineBasic() {
  // 기본 예제는 demo 전용 classNames를 유지
  return (
    <div className={styles.container}>
      <Timeline
        classNames={{
          timeline: styles.timeline,
          item: styles.item,
          itemTail: styles.itemTail,
          itemHead: styles.itemHead,
          dot: styles.dot,
          itemContent: styles.itemContent,
          itemLabel: styles.itemLabel,
          itemDescription: styles.itemDescription,
        }}
      >
        <TimelineItem label="2024-01-01">프로젝트 시작</TimelineItem>
        <TimelineItem label="2024-01-15">첫 번째 마일스톤 완료</TimelineItem>
        <TimelineItem label="2024-02-01">두 번째 마일스톤 완료</TimelineItem>
      </Timeline>
    </div>
  );
}

export function DemoTimelineWithItems() {
  return (
    <div className={styles.container}>
      <Timeline
        injectStyles={false}
        items={[
          { label: '2024-01-01', children: '프로젝트 시작' },
          { label: '2024-01-15', children: '첫 번째 마일스톤' },
          { label: '2024-02-01', children: '두 번째 마일스톤' },
        ]}
        classNames={{
          timeline: styles.timeline,
          item: styles.item,
          itemTail: styles.itemTail,
          itemHead: styles.itemHead,
          dot: styles.dot,
          itemContent: styles.itemContent,
          itemLabel: styles.itemLabel,
          itemDescription: styles.itemDescription,
        }}
      />
    </div>
  );
}

export function DemoTimelineCustomDot() {
  return (
    <div className={styles.container}>
      <Timeline
        injectStyles={false}
        classNames={{
          timeline: styles.timeline,
          item: styles.item,
          itemTail: styles.itemTail,
          itemHead: styles.itemHead,
          dot: styles.dot,
          itemContent: styles.itemContent,
          itemLabel: styles.itemLabel,
          itemDescription: styles.itemDescription,
        }}
      >
        <TimelineItem
          label="완료"
          dot={
            <span style={{ color: 'var(--color-semantic-success)' }}>
              <Icon icon={CheckCircle2} size="small" />
            </span>
          }
        >
          작업 완료
        </TimelineItem>
        <TimelineItem
          label="진행 중"
          dot={
            <span style={{ color: 'var(--color-semantic-warning)' }}>
              <Icon icon={Clock} size="small" />
            </span>
          }
        >
          작업 진행 중
        </TimelineItem>
        <TimelineItem label="대기">작업 대기 중</TimelineItem>
      </Timeline>
    </div>
  );
}

export function DemoTimelinePending() {
  return (
    <div className={styles.container}>
      <Timeline
        injectStyles={false}
        pending="더 많은 이벤트가 있을 수 있습니다..."
        items={[
          { label: '2024-01-01', children: '이벤트 1' },
          { label: '2024-01-02', children: '이벤트 2' },
        ]}
        classNames={{
          timeline: styles.timeline,
          item: styles.item,
          itemTail: styles.itemTail,
          itemHead: styles.itemHead,
          dot: styles.dot,
          itemContent: styles.itemContent,
          itemLabel: styles.itemLabel,
          itemDescription: styles.itemDescription,
        }}
      />
    </div>
  );
}

export function DemoTimelineModes() {
  const timelineClassNames = {
    timeline: styles.timeline,
    item: styles.item,
    itemTail: styles.itemTail,
    itemHead: styles.itemHead,
    dot: styles.dot,
    itemContent: styles.itemContent,
    itemLabel: styles.itemLabel,
    itemDescription: styles.itemDescription,
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Left Mode</h4>
        <Timeline
          injectStyles={false}
          mode="left"
          classNames={timelineClassNames}
        >
          <TimelineItem label="왼쪽 정렬">내용 1</TimelineItem>
          <TimelineItem label="왼쪽 정렬">내용 2</TimelineItem>
        </Timeline>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Right Mode</h4>
        <Timeline
          injectStyles={false}
          mode="right"
          classNames={timelineClassNames}
        >
          <TimelineItem label="오른쪽 정렬">내용 1</TimelineItem>
          <TimelineItem label="오른쪽 정렬">내용 2</TimelineItem>
        </Timeline>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Alternate Mode</h4>
        <Timeline
          injectStyles={false}
          mode="alternate"
          classNames={timelineClassNames}
        >
          <TimelineItem label="교차 정렬">내용 1</TimelineItem>
          <TimelineItem label="교차 정렬">내용 2</TimelineItem>
          <TimelineItem label="교차 정렬">내용 3</TimelineItem>
        </Timeline>
      </div>
    </div>
  );
}
