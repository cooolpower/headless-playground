'use client';

import React, {
  useState,
  createContext,
  useContext,
  useRef,
  useEffect,
} from 'react';
import type { TreeNodeData } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import { Icon } from '@repo/ui';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Tree } from '@repo/ui';
import * as styles from './tree-select.demo.css';
import * as treeStyles from '../tree/tree.demo.css';
import { TreeSelect } from '@repo/ui';

function findNode(data: TreeNodeData[], key: string): TreeNodeData | null {
  for (const node of data) {
    if (String(node.key) === key) return node;
    if (node.children) {
      const found = findNode(node.children, key);
      if (found) return found;
    }
  }
  return null;
}

const treeSelectData: TreeNodeData[] = [
  {
    key: '1',
    title: '개발팀',
    children: [
      {
        key: '1-1',
        title: '프론트엔드',
        children: [
          { key: '1-1-1', title: 'React 개발자' },
          { key: '1-1-2', title: 'Vue 개발자' },
        ],
      },
      {
        key: '1-2',
        title: '백엔드',
        children: [
          { key: '1-2-1', title: 'Node.js 개발자' },
          { key: '1-2-2', title: 'Python 개발자' },
        ],
      },
    ],
  },
  {
    key: '2',
    title: '디자인팀',
    children: [
      { key: '2-1', title: 'UI 디자이너' },
      { key: '2-2', title: 'UX 디자이너' },
    ],
  },
  {
    key: '3',
    title: '기획팀',
  },
];

const treeClassNames = {
  tree: treeStyles.tree,
  treeNode: treeStyles.treeNode,
  treeNodeContent: treeStyles.treeNodeContent,
  treeNodeSelected: treeStyles.treeNodeSelected,
  treeNodeDisabled: treeStyles.treeNodeDisabled,
  treeNodeChildren: treeStyles.treeNodeChildren,
  treeIndent: treeStyles.treeIndent,
  treeIndentLine: treeStyles.treeIndentLine,
  treeSwitcher: treeStyles.treeSwitcher,
  treeSwitcherButton: treeStyles.treeSwitcherButton,
  treeSwitcherExpanded: treeStyles.treeSwitcherExpanded,
  treeSwitcherLeaf: treeStyles.treeSwitcherLeaf,
  treeCheckbox: treeStyles.treeCheckbox,
  treeIcon: treeStyles.treeIcon,
  treeTitle: treeStyles.treeTitle,
};

// TreeSelect Controls Context
interface TreeSelectControlsContextType {
  multiple: boolean;
  setMultiple: (multiple: boolean) => void;
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
  injectStyles: boolean;
  setInjectStyles: (inject: boolean) => void;
}

const TreeSelectControlsContext =
  createContext<TreeSelectControlsContextType | null>(null);

// Provider
export function DemoTreeSelectBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [multiple, setMultiple] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [injectStyles, setInjectStyles] = useState(true);

  return (
    <TreeSelectControlsContext.Provider
      value={{
        multiple,
        setMultiple,
        disabled,
        setDisabled,
        injectStyles,
        setInjectStyles,
      }}
    >
      {children}
    </TreeSelectControlsContext.Provider>
  );
}

// 기본 TreeSelect (컨트롤러와 함께 사용될 컴포넌트)
export function DemoTreeSelectBasicWithControls() {
  const context = useContext(TreeSelectControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { multiple, disabled, injectStyles } = context;
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const treeSelectClassNames = injectStyles
    ? undefined
    : {
        treeselect: styles.treeSelectWrapper,
        trigger: styles.trigger,
        triggerText: styles.triggerText,
        dropdown: styles.dropdown,
      };

  return (
    <div
      className={`${styles.container} ${!injectStyles ? styles.treeSelectWrapperClass : ''}`}
    >
      <TreeSelect
        injectStyles={injectStyles}
        treeData={treeSelectData}
        value={selectedKeys}
        onChange={setSelectedKeys}
        multiple={multiple}
        disabled={disabled}
        defaultExpandedKeys={['1', '2']}
        classNames={treeSelectClassNames}
        treeClassNames={injectStyles ? undefined : treeClassNames}
      />
      {selectedKeys.length > 0 && (
        <div className={styles.selectedInfo}>
          선택된 값: {selectedKeys.join(', ')}
        </div>
      )}
    </div>
  );
}

// TreeSelect Controls
export function DemoTreeSelectBasicControls() {
  const context = useContext(TreeSelectControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    multiple,
    setMultiple,
    disabled,
    setDisabled,
    injectStyles,
    setInjectStyles,
  } = context;

  return (
    <Controls
      items={[
        {
          label: '다중 선택 (Multiple)',
          control: (
            <Checkbox
              checked={multiple}
              onChange={(checked) => setMultiple(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '비활성화 (Disabled)',
          control: (
            <Checkbox
              checked={disabled}
              onChange={(checked) => setDisabled(checked)}
              size="small"
            >
              비활성화
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
      ]}
    />
  );
}

// Export individual demo components for MDX
export function DemoTreeSelectBasic() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <div className={styles.container}>
      <TreeSelect
        treeData={treeSelectData}
        value={selectedKeys}
        onChange={setSelectedKeys}
        defaultExpandedKeys={['1', '2']}
        classNames={{
          treeselect: styles.treeSelectWrapper,
          trigger: styles.trigger,
          triggerText: styles.triggerText,
          dropdown: styles.dropdown,
        }}
        treeClassNames={treeClassNames}
        injectStyles={false}
      />
      {selectedKeys.length > 0 && (
        <div className={styles.selectedInfo}>
          선택된 값: {selectedKeys.join(', ')}
        </div>
      )}
    </div>
  );
}

export function DemoTreeSelectMultiple() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getSelectedTitles = () => {
    if (selectedKeys.length === 0) return '선택해주세요';
    const titles = selectedKeys
      .map((key) => {
        const node = findNode(treeSelectData, key);
        return node ? String(node.title) : null;
      })
      .filter((title): title is string => title !== null);
    return titles.length > 0 ? titles.join(', ') : '선택해주세요';
  };

  return (
    <div className={styles.container}>
      <div ref={wrapperRef} className={styles.treeSelectWrapper}>
        <button
          type="button"
          className={styles.trigger}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="tree"
        >
          <span className={styles.triggerText}>
            {getSelectedTitles()}
            {selectedKeys.length > 0 && (
              <span className={styles.selectedCount}>
                {' '}
                ({selectedKeys.length})
              </span>
            )}
          </span>
          <Icon icon={isOpen ? ChevronUp : ChevronDown} size="small" />
        </button>

        {isOpen && (
          <div className={styles.dropdown} role="tree">
            <Tree
              treeData={treeSelectData}
              selectable
              multiple
              selectedKeys={selectedKeys}
              onSelect={(keys) => setSelectedKeys(keys)}
              defaultExpandedKeys={['1', '2']}
              classNames={treeClassNames}
            />
          </div>
        )}
      </div>
      {selectedKeys.length > 0 && (
        <div className={styles.selectedInfo}>
          선택된 값: {selectedKeys.join(', ')}
        </div>
      )}
    </div>
  );
}

export function TreeSelectDemo() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h2>TreeSelect 컴포넌트 데모</h2>

      <div style={{ marginBottom: '2rem' }}>
        <h3>기본 사용법</h3>
        <DemoTreeSelectBasic />
      </div>
    </div>
  );
}
