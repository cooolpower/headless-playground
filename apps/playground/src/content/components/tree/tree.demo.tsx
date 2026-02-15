'use client';

import React, { useState, createContext, useContext } from 'react';
import { Folder, File, Image as ImageIcon } from 'lucide-react';
import { Icon } from '@repo/ui';
import { Tree } from '@repo/ui';
import type { TreeNodeData } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Button } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import * as styles from './tree.demo.css';

const basicTreeData: TreeNodeData[] = [
  {
    key: '1',
    title: 'Parent 1',
    children: [
      {
        key: '1-1',
        title: 'Child 1-1',
      },
      {
        key: '1-2',
        title: 'Child 1-2',
      },
    ],
  },
  {
    key: '2',
    title: 'Parent 2',
    children: [
      {
        key: '2-1',
        title: 'Child 2-1',
      },
      {
        key: '2-2',
        title: 'Child 2-2',
        children: [
          {
            key: '2-2-1',
            title: 'Child 2-2-1',
          },
        ],
      },
    ],
  },
  {
    key: '3',
    title: 'Parent 3',
  },
];

const treeDataWithIcons: TreeNodeData[] = [
  {
    key: '1',
    title: 'Documents',
    icon: <Icon icon={Folder} size="small" />,
    children: [
      {
        key: '1-1',
        title: 'Document 1',
        icon: <Icon icon={File} size="small" />,
      },
      {
        key: '1-2',
        title: 'Document 2',
        icon: <Icon icon={File} size="small" />,
      },
    ],
  },
  {
    key: '2',
    title: 'Images',
    icon: <Icon icon={Folder} size="small" />,
    children: [
      {
        key: '2-1',
        title: 'Image 1',
        icon: <Icon icon={ImageIcon} size="small" />,
      },
    ],
  },
];

const treeClassNames = {
  tree: styles.tree,
  treeNode: styles.treeNode,
  treeNodeContent: styles.treeNodeContent,
  treeNodeSelected: styles.treeNodeSelected,
  treeNodeDisabled: styles.treeNodeDisabled,
  treeNodeChildren: styles.treeNodeChildren,
  treeIndent: styles.treeIndent,
  treeIndentLine: styles.treeIndentLine,
  treeSwitcher: styles.treeSwitcher,
  treeSwitcherButton: styles.treeSwitcherButton,
  treeSwitcherExpanded: styles.treeSwitcherExpanded,
  treeSwitcherLeaf: styles.treeSwitcherLeaf,
  treeCheckbox: styles.treeCheckbox,
  treeIcon: styles.treeIcon,
  treeTitle: styles.treeTitle,
};

// 모든 노드 키를 수집하는 헬퍼 함수
function getAllExpandableKeys(treeData: TreeNodeData[]): string[] {
  const keys: string[] = [];

  function traverse(nodes: TreeNodeData[]) {
    for (const node of nodes) {
      if (node.children && node.children.length > 0) {
        keys.push(String(node.key));
        traverse(node.children);
      }
    }
  }

  traverse(treeData);
  return keys;
}

// Tree Controls Context
interface TreeControlsContextType {
  checkable: boolean;
  setCheckable: (checkable: boolean) => void;
  selectable: boolean;
  setSelectable: (selectable: boolean) => void;
  showLine: boolean;
  setShowLine: (showLine: boolean) => void;
  showIcon: boolean;
  setShowIcon: (showIcon: boolean) => void;
  multiple: boolean;
  setMultiple: (multiple: boolean) => void;
  defaultExpandAll: boolean;
  setDefaultExpandAll: (defaultExpandAll: boolean) => void;
  expandedKeys: string[];
  setExpandedKeys: (keys: string[]) => void;
  checkedKeys: string[];
  setCheckedKeys: (keys: string[]) => void;
  selectedKeys: string[];
  setSelectedKeys: (keys: string[]) => void;
  injectStyles: boolean;
  setInjectStyles: (inject: boolean) => void;
}

const TreeControlsContext = createContext<TreeControlsContextType | null>(null);

// Provider
export function DemoTreeBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [checkable, setCheckable] = useState(false);
  const [selectable, setSelectable] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [defaultExpandAll, setDefaultExpandAll] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [injectStyles, setInjectStyles] = useState(true);

  return (
    <TreeControlsContext.Provider
      value={{
        checkable,
        setCheckable,
        selectable,
        setSelectable,
        showLine,
        setShowLine,
        showIcon,
        setShowIcon,
        multiple,
        setMultiple,
        defaultExpandAll,
        setDefaultExpandAll,
        expandedKeys,
        setExpandedKeys,
        checkedKeys,
        setCheckedKeys,
        selectedKeys,
        setSelectedKeys,
        injectStyles,
        setInjectStyles,
      }}
    >
      {children}
    </TreeControlsContext.Provider>
  );
}

// 기본 Tree (컨트롤러와 함께 사용될 컴포넌트)
export function DemoTreeBasicWithControls() {
  const context = useContext(TreeControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    checkable,
    selectable,
    showLine,
    showIcon,
    multiple,
    defaultExpandAll,
    expandedKeys,
    setExpandedKeys,
    checkedKeys,
    setCheckedKeys,
    selectedKeys,
    setSelectedKeys,
    injectStyles,
  } = context;

  const treeData = showIcon ? treeDataWithIcons : basicTreeData;

  const handleExpand = (keys: string[]) => {
    setExpandedKeys(keys);
  };

  return (
    <div
      className={`${styles.container} ${!injectStyles ? styles.treeWrapperClass : ''}`}
    >
      <Tree
        treeData={treeData}
        injectStyles={injectStyles}
        checkable={checkable}
        selectable={selectable}
        showLine={showLine}
        showIcon={showIcon}
        multiple={multiple}
        defaultExpandAll={defaultExpandAll}
        expandedKeys={expandedKeys}
        onExpand={handleExpand}
        checkedKeys={checkable ? checkedKeys : undefined}
        onCheck={checkable ? setCheckedKeys : undefined}
        selectedKeys={selectable ? selectedKeys : undefined}
        onSelect={selectable ? setSelectedKeys : undefined}
        classNames={injectStyles ? undefined : treeClassNames}
      />
      {(checkable || selectable) && (
        <div className={styles.statusContainer}>
          {checkable && <div>Checked: {checkedKeys.join(', ') || 'None'}</div>}
          {selectable && (
            <div>Selected: {selectedKeys.join(', ') || 'None'}</div>
          )}
        </div>
      )}
    </div>
  );
}

// Tree Controls
export function DemoTreeBasicControls() {
  const context = useContext(TreeControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    checkable,
    setCheckable,
    selectable,
    setSelectable,
    showLine,
    setShowLine,
    showIcon,
    setShowIcon,
    multiple,
    setMultiple,
    defaultExpandAll,
    setDefaultExpandAll,
    expandedKeys,
    setExpandedKeys,
    checkedKeys,
    setCheckedKeys,
    selectedKeys,
    setSelectedKeys,
    injectStyles,
    setInjectStyles,
  } = context;

  return (
    <Controls
      items={[
        {
          label: '체크 가능 (Checkable)',
          control: (
            <Checkbox
              checked={checkable}
              onChange={(checked) => {
                setCheckable(checked);
                if (!checked) setCheckedKeys([]);
              }}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '선택 가능 (Selectable)',
          control: (
            <Checkbox
              checked={selectable}
              onChange={(checked) => {
                setSelectable(checked);
                if (!checked) setSelectedKeys([]);
              }}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '라인 표시 (Show Line)',
          control: (
            <Checkbox
              checked={showLine}
              onChange={(checked) => setShowLine(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '아이콘 표시 (Show Icon)',
          control: (
            <Checkbox
              checked={showIcon}
              onChange={(checked) => setShowIcon(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '다중 선택 (Multiple)',
          control: (
            <Checkbox
              checked={multiple}
              onChange={(checked) => setMultiple(checked)}
              disabled={!checkable && !selectable}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '전체 확장 (Default Expand All)',
          control: (
            <Checkbox
              checked={defaultExpandAll}
              onChange={(checked) => setDefaultExpandAll(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
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
        {
          label: '트리 제어 (Tree Control)',
          control: (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Button
                onClick={() => {
                  const allKeys = getAllExpandableKeys(
                    showIcon ? treeDataWithIcons : basicTreeData,
                  );
                  setExpandedKeys(allKeys);
                }}
              >
                전체 확장
              </Button>
              <Button onClick={() => setExpandedKeys([])}>전체 축소</Button>
              <Button onClick={() => setCheckedKeys([])} disabled={!checkable}>
                체크 해제
              </Button>
              <Button
                onClick={() => setSelectedKeys([])}
                disabled={!selectable}
              >
                선택 해제
              </Button>
            </div>
          ),
        },
      ]}
    />
  );
}

// 기존 예제들 (props 조합으로만 차별화)
export function DemoTreeBasic() {
  return (
    <div className={styles.container}>
      <Tree treeData={basicTreeData} classNames={treeClassNames} />
    </div>
  );
}

export function DemoTreeCheckable() {
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

  return (
    <div className={styles.container}>
      <Tree
        treeData={basicTreeData}
        checkable
        checkedKeys={checkedKeys}
        onCheck={(keys) => setCheckedKeys(keys)}
        classNames={treeClassNames}
      />
      <div className={styles.statusContainer}>
        Checked: {checkedKeys.join(', ') || 'None'}
      </div>
    </div>
  );
}

export function DemoTreeSelectable() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <div className={styles.container}>
      <Tree
        treeData={basicTreeData}
        selectable
        selectedKeys={selectedKeys}
        onSelect={(keys) => setSelectedKeys(keys)}
        classNames={treeClassNames}
      />
      <div className={styles.statusContainer}>
        Selected: {selectedKeys.join(', ') || 'None'}
      </div>
    </div>
  );
}

export function DemoTreeWithIcons() {
  return (
    <div className={styles.container}>
      <Tree treeData={treeDataWithIcons} showIcon classNames={treeClassNames} />
    </div>
  );
}

export function DemoTreeShowLine() {
  return (
    <div className={styles.container}>
      <Tree treeData={basicTreeData} showLine classNames={treeClassNames} />
    </div>
  );
}

export function DemoTreeDefaultExpanded() {
  return (
    <div className={styles.container}>
      <Tree
        treeData={basicTreeData}
        defaultExpandedKeys={['1', '2']}
        classNames={treeClassNames}
      />
    </div>
  );
}

export function DemoTreeDisabled() {
  const disabledTreeData: TreeNodeData[] = [
    {
      key: '1',
      title: 'Parent 1',
      children: [
        {
          key: '1-1',
          title: 'Child 1-1',
          disabled: true,
        },
        {
          key: '1-2',
          title: 'Child 1-2',
        },
      ],
    },
    {
      key: '2',
      title: 'Parent 2 (Disabled)',
      disabled: true,
    },
  ];

  return (
    <div className={styles.container}>
      <Tree treeData={disabledTreeData} classNames={treeClassNames} />
    </div>
  );
}

export function TreeDemo() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h2>Tree 컴포넌트 데모</h2>

      <div style={{ marginBottom: '2rem' }}>
        <h3>기본 사용법</h3>
        <DemoTreeBasic />
      </div>
    </div>
  );
}
