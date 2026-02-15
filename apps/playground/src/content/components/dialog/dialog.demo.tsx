'use client';

import React, { useState, createContext, useContext } from 'react';
import { Dialog } from '@repo/ui';
import { Button } from '@repo/ui';
import { Input } from '@repo/ui';
import { Textarea } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import * as styles from './dialog.demo.css';

// Dialog Controls Context
interface DialogControlsContextType {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  width: number | string;
  setWidth: (width: number | string) => void;
  centered: boolean;
  setCentered: (centered: boolean) => void;
  closable: boolean;
  setClosable: (closable: boolean) => void;
  maskClosable: boolean;
  setMaskClosable: (maskClosable: boolean) => void;
  injectStyles: boolean;
  setInjectStyles: (inject: boolean) => void;
}

const DialogControlsContext = createContext<DialogControlsContextType | null>(
  null,
);

// Provider
export function DemoDialogBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [title, setTitle] = useState('Dialog Title');
  const [content, setContent] = useState(
    'This is the dialog content. You can customize it through the controls.',
  );
  const [width, setWidth] = useState<number | string>(520);
  const [centered, setCentered] = useState(false);
  const [closable, setClosable] = useState(true);
  const [maskClosable, setMaskClosable] = useState(true);
  const [injectStyles, setInjectStyles] = useState(true);

  return (
    <DialogControlsContext.Provider
      value={{
        title,
        setTitle,
        content,
        setContent,
        width,
        setWidth,
        centered,
        setCentered,
        closable,
        setClosable,
        maskClosable,
        setMaskClosable,
        injectStyles,
        setInjectStyles,
      }}
    >
      {children}
    </DialogControlsContext.Provider>
  );
}

// 기본 Dialog (컨트롤러와 함께 사용될 컴포넌트)
export function DemoDialogBasicWithControls() {
  const context = useContext(DialogControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    title,
    content,
    width,
    centered,
    closable,
    maskClosable,
    injectStyles,
  } = context;
  const [open, setOpen] = useState(false);

  return (
    <div
      className={!injectStyles ? styles.dialogWrapperClass : ''}
      style={{ padding: '2rem', textAlign: 'center' }}
    >
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title={title}
        content={content}
        width={width}
        centered={centered}
        closable={closable}
        maskClosable={maskClosable}
        injectStyles={injectStyles}
      />
    </div>
  );
}

// Dialog Controls
export function DemoDialogBasicControls() {
  const context = useContext(DialogControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    title,
    setTitle,
    content,
    setContent,
    width,
    setWidth,
    centered,
    setCentered,
    closable,
    setClosable,
    maskClosable,
    setMaskClosable,
    injectStyles,
    setInjectStyles,
  } = context;

  return (
    <Controls
      items={[
        {
          label: '제목 (Title)',
          control: (
            <Input
              type="text"
              value={title}
              onChange={setTitle}
              placeholder="제목 텍스트"
              size="small"
            />
          ),
        },
        {
          label: '내용 (Content)',
          control: (
            <Textarea
              value={content}
              onChange={setContent}
              rows={3}
              placeholder="내용 텍스트"
              size="small"
            />
          ),
        },
        {
          label: '너비 (Width)',
          control: (
            <Input
              type="text"
              value={String(width)}
              onChange={(val) => {
                if (val === '') {
                  setWidth('');
                } else if (!isNaN(Number(val))) {
                  setWidth(Number(val));
                } else {
                  setWidth(val);
                }
              }}
              placeholder="520 또는 50%"
              size="small"
            />
          ),
        },
        {
          label: '중앙 정렬 (Centered)',
          control: (
            <Checkbox
              checked={centered}
              onChange={(checked) => setCentered(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '닫기 버튼 (Closable)',
          control: (
            <Checkbox
              checked={closable}
              onChange={(checked) => setClosable(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '마스크 클릭 닫기 (Mask Closable)',
          control: (
            <Checkbox
              checked={maskClosable}
              onChange={(checked) => setMaskClosable(checked)}
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
      ]}
    />
  );
}

// 기본 사용법
export function DemoDialogBasic() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Dialog Title"
        content="This is the dialog content"
      />
    </div>
  );
}

// With Footer
export function DemoDialogWithFooter() {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    alert('Action confirmed!');
    setOpen(false);
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Button onClick={() => setOpen(true)}>Open Dialog with Footer</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Confirm Action"
        content="Are you sure you want to proceed?"
        footer={
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '0.5rem',
            }}
          >
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </div>
        }
      />
    </div>
  );
}

// Centered
export function DemoDialogCentered() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Button onClick={() => setOpen(true)}>Open Centered Dialog</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Centered Dialog"
        content="This dialog is centered"
        centered
      />
    </div>
  );
}

// Custom Size
export function DemoDialogCustomSize() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Button onClick={() => setOpen(true)}>Open Large Dialog</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Large Dialog"
        content="This is a large dialog"
        width={800}
        height={600}
      />
    </div>
  );
}

// With Loading
export function DemoDialogWithLoading() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    setLoading(true);
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    alert('Processing complete!');
    setOpen(false);
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Button onClick={() => setOpen(true)}>Open Dialog with Loading</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Processing"
        content="Please wait..."
        onOk={handleOk}
        confirmLoading={loading}
      />
    </div>
  );
}
