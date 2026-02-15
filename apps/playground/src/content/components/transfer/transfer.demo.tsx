'use client';

import React, { useState, createContext, useContext } from 'react';
import { Transfer } from '@repo/ui';
import type { TransferItem } from '@repo/ui';
import * as styles from './transfer.demo.css';
import { Controls } from '@/components/playground/controls';
import { Checkbox } from '@repo/ui';

const mockData: TransferItem[] = [
  { key: '1', title: '항목 1', description: '첫 번째 항목 설명' },
  { key: '2', title: '항목 2', description: '두 번째 항목 설명' },
  { key: '3', title: '항목 3', description: '세 번째 항목 설명' },
  { key: '4', title: '항목 4', description: '네 번째 항목 설명' },
  { key: '5', title: '항목 5', description: '다섯 번째 항목 설명' },
  { key: '6', title: '항목 6', description: '여섯 번째 항목 설명' },
  { key: '7', title: '항목 7', description: '일곱 번째 항목 설명' },
  { key: '8', title: '항목 8', description: '여덟 번째 항목 설명' },
  { key: '9', title: '항목 9', description: '아홉 번째 항목 설명' },
  { key: '10', title: '항목 10', description: '열 번째 항목 설명' },
];

const transferClassNames = {
  transfer: styles.transfer,
  transferList: styles.transferList,
  transferListHeader: styles.transferListHeader,
  transferListTitle: styles.transferListTitle,
  transferListSearch: styles.transferListSearch,
  searchInput: styles.searchInput,
  transferListBody: styles.transferListBody,
  transferListContent: styles.transferListContent,
  transferListItem: styles.transferListItem,
  checkboxLabel: styles.checkboxLabel,
  itemLabel: styles.itemLabel,
  itemContent: styles.itemContent,
  itemDescription: styles.itemDescription,
  count: styles.count,
  transferOperations: styles.transferOperations,
  operationButton: styles.operationButton,
  operationButtonEnabled: styles.operationButtonEnabled,
};

interface TransferControlsContextType {
  injectStyles: boolean;
  setInjectStyles: (inject: boolean) => void;
}

const TransferControlsContext =
  createContext<TransferControlsContextType | null>(null);

export function DemoTransferBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);
  return (
    <TransferControlsContext.Provider value={{ injectStyles, setInjectStyles }}>
      {children}
    </TransferControlsContext.Provider>
  );
}

// 기본 Transfer 예제
export function DemoTransferBasic() {
  const ctx = useContext(TransferControlsContext);
  const [targetKeys, setTargetKeys] = useState<string[]>(['1', '4']);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const injectStyles = ctx?.injectStyles ?? true;

  return (
    <div className={!injectStyles ? styles.transferWrapperClass : ''}>
      <Transfer
        injectStyles={injectStyles}
        dataSource={mockData}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={(keys) => setTargetKeys(keys)}
        onSelectChange={(sourceKeys, targetKeys) =>
          setSelectedKeys([...sourceKeys, ...targetKeys])
        }
        titles={['사용 가능한 항목', '선택된 항목']}
        operations={['추가 →', '← 제거']}
        classNames={injectStyles ? undefined : transferClassNames}
      />
    </div>
  );
}

export function DemoTransferBasicControls() {
  const ctx = useContext(TransferControlsContext);
  if (!ctx) return null;

  const { injectStyles, setInjectStyles } = ctx;

  return (
    <Controls
      items={[
        {
          label: 'Inject Styles',
          control: (
            <Checkbox
              checked={injectStyles}
              onChange={(checked) => setInjectStyles(checked)}
              size="small"
            >
              기본 스타일 주입
            </Checkbox>
          ),
        },
      ]}
    />
  );
}

// 검색 기능이 있는 Transfer 예제
export function DemoTransferWithSearch() {
  const [targetKeys, setTargetKeys] = useState<string[]>(['2', '3']);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <Transfer
      dataSource={mockData}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={(keys) => setTargetKeys(keys)}
      onSelectChange={(sourceKeys, targetKeys) =>
        setSelectedKeys([...sourceKeys, ...targetKeys])
      }
      showSearch
      filterOption={(inputValue, item) =>
        item.title.indexOf(inputValue) !== -1 ||
        (item.description ? item.description.indexOf(inputValue) !== -1 : false)
      }
      titles={['검색 가능', '선택됨']}
      classNames={transferClassNames}
    />
  );
}

// 커스텀 렌더링 예제
export function DemoTransferCustomRender() {
  const [targetKeys, setTargetKeys] = useState<string[]>(['5', '6']);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <Transfer
      dataSource={mockData.map((item) => ({
        ...item,
        title: `${item.title} - 커스텀`,
      }))}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={(keys) => setTargetKeys(keys)}
      onSelectChange={(sourceKeys, targetKeys) =>
        setSelectedKeys([...sourceKeys, ...targetKeys])
      }
      render={(item) => (
        <div>
          <strong>{item.title}</strong>
          <br />
          <small style={{ color: 'var(--color-text-secondary)' }}>
            {item.description}
          </small>
        </div>
      )}
      titles={['커스텀 아이템', '선택된 커스텀']}
      classNames={transferClassNames}
    />
  );
}

// 비활성화된 항목들 예제
export function DemoTransferDisabled() {
  const [targetKeys, setTargetKeys] = useState<string[]>(['7']);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <Transfer
      dataSource={mockData.map((item, index) => ({
        ...item,
        disabled: index % 3 === 0, // 3의 배수 항목들은 비활성화
      }))}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={(keys) => setTargetKeys(keys)}
      onSelectChange={(sourceKeys, targetKeys) =>
        setSelectedKeys([...sourceKeys, ...targetKeys])
      }
      titles={['일부 비활성화', '선택됨']}
      classNames={transferClassNames}
    />
  );
}

// 전체 선택 숨김 예제
export function DemoTransferNoSelectAll() {
  const [targetKeys, setTargetKeys] = useState<string[]>(['1', '2']);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <Transfer
      dataSource={mockData.slice(0, 6)}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={(keys) => setTargetKeys(keys)}
      onSelectChange={(sourceKeys, targetKeys) =>
        setSelectedKeys([...sourceKeys, ...targetKeys])
      }
      showSelectAll={false}
      titles={['전체 선택 없음', '선택됨']}
      classNames={transferClassNames}
    />
  );
}

// 실제 사용 사례: 권한 관리
export function DemoTransferPermission() {
  const [targetKeys, setTargetKeys] = useState<string[]>(['read', 'write']);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <Transfer
      dataSource={[
        {
          key: 'read',
          title: '읽기 권한',
          description: '데이터 조회 권한',
        },
        {
          key: 'write',
          title: '쓰기 권한',
          description: '데이터 생성/수정 권한',
        },
        {
          key: 'delete',
          title: '삭제 권한',
          description: '데이터 삭제 권한',
        },
        {
          key: 'admin',
          title: '관리자 권한',
          description: '모든 권한 포함',
        },
        {
          key: 'export',
          title: '내보내기 권한',
          description: '데이터 내보내기 권한',
        },
        {
          key: 'import',
          title: '가져오기 권한',
          description: '데이터 가져오기 권한',
        },
      ]}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={(keys) => setTargetKeys(keys)}
      onSelectChange={(sourceKeys, targetKeys) =>
        setSelectedKeys([...sourceKeys, ...targetKeys])
      }
      titles={['사용 가능한 권한', '부여된 권한']}
      operations={['권한 부여 →', '← 권한 제거']}
      showSearch
      filterOption={(inputValue, item) => item.title.indexOf(inputValue) !== -1}
      classNames={transferClassNames}
    />
  );
}

// 실제 사용 사례: 팀 멤버 선택
export function DemoTransferTeam() {
  const [targetKeys, setTargetKeys] = useState<string[]>(['john', 'jane']);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <Transfer
      dataSource={[
        {
          key: 'john',
          title: 'John Doe',
          description: '프론트엔드 개발자',
        },
        {
          key: 'jane',
          title: 'Jane Smith',
          description: '백엔드 개발자',
        },
        {
          key: 'bob',
          title: 'Bob Johnson',
          description: 'UI/UX 디자이너',
        },
        {
          key: 'alice',
          title: 'Alice Brown',
          description: '프로젝트 매니저',
        },
        {
          key: 'charlie',
          title: 'Charlie Wilson',
          description: 'QA 엔지니어',
        },
        {
          key: 'diana',
          title: 'Diana Davis',
          description: 'DevOps 엔지니어',
        },
      ]}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={(keys) => setTargetKeys(keys)}
      onSelectChange={(sourceKeys, targetKeys) =>
        setSelectedKeys([...sourceKeys, ...targetKeys])
      }
      titles={['전체 멤버', '프로젝트 팀']}
      operations={['팀에 추가 →', '← 팀에서 제거']}
      showSearch
      filterOption={(inputValue, item) =>
        item.title.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1 ||
        (item.description
          ? item.description.toLowerCase().indexOf(inputValue.toLowerCase()) !==
            -1
          : false)
      }
      render={(item) => (
        <div>
          <strong>{item.title}</strong>
          <br />
          <small style={{ color: 'var(--color-text-secondary)' }}>
            {item.description}
          </small>
        </div>
      )}
      classNames={transferClassNames}
    />
  );
}

// 실제 사용 사례: 기능 토글
export function DemoTransferFeature() {
  const [targetKeys, setTargetKeys] = useState<string[]>([
    'notifications',
    'auto-save',
  ]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <Transfer
      dataSource={[
        {
          key: 'notifications',
          title: '푸시 알림',
          description: '중요 알림 푸시',
        },
        {
          key: 'dark-mode',
          title: '다크 모드',
          description: '어두운 테마 적용',
        },
        {
          key: 'auto-save',
          title: '자동 저장',
          description: '작업 자동 저장',
        },
        {
          key: 'analytics',
          title: '분석 추적',
          description: '사용 패턴 분석',
        },
        {
          key: 'backup',
          title: '자동 백업',
          description: '데이터 자동 백업',
        },
        {
          key: 'offline',
          title: '오프라인 모드',
          description: '오프라인 작업 지원',
        },
      ]}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={(keys) => setTargetKeys(keys)}
      onSelectChange={(sourceKeys, targetKeys) =>
        setSelectedKeys([...sourceKeys, ...targetKeys])
      }
      titles={['사용 가능한 기능', '활성화된 기능']}
      operations={['활성화 →', '← 비활성화']}
      showSearch={false}
      classNames={transferClassNames}
    />
  );
}

// 전체 데모 (하위 호환성을 위해 유지)
export function TransferDemo() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h2>Transfer 컴포넌트 데모</h2>

      <div style={{ marginBottom: '2rem' }}>
        <h3>기본 Transfer</h3>
        <DemoTransferBasic />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>검색 기능이 있는 Transfer</h3>
        <DemoTransferWithSearch />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>커스텀 렌더링</h3>
        <DemoTransferCustomRender />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>비활성화된 항목들</h3>
        <DemoTransferDisabled />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>전체 선택 숨김</h3>
        <DemoTransferNoSelectAll />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>실제 사용 사례: 권한 관리</h3>
        <div
          style={{
            border: '1px solid var(--color-divider)',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '1rem',
          }}
        >
          <h4>👥 사용자 권한 설정</h4>
          <p
            style={{
              marginBottom: '1rem',
              color: 'var(--color-text-secondary)',
            }}
          >
            사용자가 가질 수 있는 권한들을 선택하세요.
          </p>
          <DemoTransferPermission />
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>실제 사용 사례: 팀 멤버 선택</h3>
        <div
          style={{
            border: '1px solid var(--color-divider)',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '1rem',
          }}
        >
          <h4>👨‍👩‍👧‍👦 프로젝트 팀 멤버 선택</h4>
          <p
            style={{
              marginBottom: '1rem',
              color: 'var(--color-text-secondary)',
            }}
          >
            프로젝트에 참여할 팀 멤버들을 선택하세요.
          </p>
          <DemoTransferTeam />
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>실제 사용 사례: 기능 토글</h3>
        <div
          style={{
            border: '1px solid var(--color-divider)',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '1rem',
          }}
        >
          <h4>⚙️ 애플리케이션 기능 설정</h4>
          <p
            style={{
              marginBottom: '1rem',
              color: 'var(--color-text-secondary)',
            }}
          >
            활성화할 기능들을 선택하세요.
          </p>
          <DemoTransferFeature />
        </div>
      </div>
    </div>
  );
}
