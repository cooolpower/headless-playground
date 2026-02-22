'use client';

import React, { createContext, useContext, useState } from 'react';
import { CheckCircle2, Clock, AlertTriangle, Info, Circle } from 'lucide-react';
import { Icon } from '@repo/ui';
import { Timeline, TimelineItem } from '@repo/ui';
import { Input } from '@repo/ui';
import { Select } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import type { SelectOption } from '@repo/ui';
import * as styles from './timeline.demo.css';

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

export function DemoTimelineBasicProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
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

export function DemoTimelineBasicWithControls(): React.ReactElement {
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
        <TimelineItem color="success" label="2024-01-01">
          프로젝트 킥오프
        </TimelineItem>
        <TimelineItem color="info" label="2024-01-15">
          디자인 시스템 완성
        </TimelineItem>
        <TimelineItem color="warning" label="2024-02-01">
          베타 테스트 시작
        </TimelineItem>
        <TimelineItem color="error" label="2024-02-15">
          크리티컬 버그 발견
        </TimelineItem>
        <TimelineItem label="2024-03-01">정식 출시</TimelineItem>
      </Timeline>
    </div>
  );
}

export function DemoTimelineBasicControls(): React.ReactElement {
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

export function DemoTimelineBasic(): React.ReactElement {
  return (
    <div className={styles.container}>
      <Timeline>
        <TimelineItem label="2024-01-01">프로젝트 시작</TimelineItem>
        <TimelineItem label="2024-01-15">첫 번째 마일스톤 완료</TimelineItem>
        <TimelineItem label="2024-02-01">두 번째 마일스톤 완료</TimelineItem>
      </Timeline>
    </div>
  );
}

export function DemoTimelineWithItems(): React.ReactElement {
  return (
    <div className={styles.container}>
      <Timeline
        items={[
          { color: 'success', label: '완료됨', children: '프로젝트 기획 완료' },
          { color: 'success', label: '완료됨', children: 'UI 디자인 확정' },
          { color: 'warning', label: '진행 중', children: '프론트엔드 개발' },
          { color: 'default', label: '예정', children: '백엔드 API 연동' },
          { color: 'default', label: '예정', children: 'QA 테스트' },
        ]}
      />
    </div>
  );
}

export function DemoTimelineCustomDot(): React.ReactElement {
  return (
    <div className={styles.container}>
      <Timeline>
        <TimelineItem
          color="success"
          label="완료"
          dot={
            <span style={{ color: 'var(--color-semantic-success)' }}>
              <Icon icon={CheckCircle2} size="small" />
            </span>
          }
        >
          코드 리뷰 통과
        </TimelineItem>
        <TimelineItem
          color="warning"
          label="진행 중"
          dot={
            <span style={{ color: 'var(--color-semantic-warning)' }}>
              <Icon icon={Clock} size="small" />
            </span>
          }
        >
          성능 최적화 작업
        </TimelineItem>
        <TimelineItem
          color="error"
          label="주의"
          dot={
            <span style={{ color: 'var(--color-semantic-error)' }}>
              <Icon icon={AlertTriangle} size="small" />
            </span>
          }
        >
          보안 취약점 패치 필요
        </TimelineItem>
        <TimelineItem
          color="info"
          label="참고"
          dot={
            <span style={{ color: 'var(--color-semantic-info)' }}>
              <Icon icon={Info} size="small" />
            </span>
          }
        >
          v2.0 마이그레이션 가이드 발행
        </TimelineItem>
      </Timeline>
    </div>
  );
}

export function DemoTimelinePending(): React.ReactElement {
  return (
    <div className={styles.container}>
      <Timeline
        pending="더 많은 이벤트가 있을 수 있습니다..."
        items={[
          { color: 'success', label: '09:00', children: '서버 배포 시작' },
          {
            color: 'success',
            label: '09:15',
            children: 'DB 마이그레이션 완료',
          },
          { color: 'info', label: '09:30', children: 'API 헬스체크 통과' },
        ]}
      />
    </div>
  );
}

export function DemoTimelineModes(): React.ReactElement {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Left Mode</h4>
        <Timeline mode="left">
          <TimelineItem color="success" label="Step 1">
            요구사항 분석
          </TimelineItem>
          <TimelineItem color="info" label="Step 2">
            아키텍처 설계
          </TimelineItem>
        </Timeline>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Right Mode</h4>
        <Timeline mode="right">
          <TimelineItem color="warning" label="Q3">
            마케팅 캠페인
          </TimelineItem>
          <TimelineItem color="success" label="Q4">
            성과 분석
          </TimelineItem>
        </Timeline>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Alternate Mode</h4>
        <Timeline mode="alternate">
          <TimelineItem color="success" label="Phase 1">
            기획
          </TimelineItem>
          <TimelineItem color="info" label="Phase 2">
            개발
          </TimelineItem>
          <TimelineItem color="warning" label="Phase 3">
            테스트
          </TimelineItem>
          <TimelineItem color="success" label="Phase 4">
            배포
          </TimelineItem>
        </Timeline>
      </div>
    </div>
  );
}
