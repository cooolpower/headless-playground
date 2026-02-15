'use client';

import React, { useState, createContext, useContext } from 'react';
import { Drawer } from '@repo/ui';
import { Button } from '@repo/ui';
import { Input } from '@repo/ui';
import { Select } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import type { SelectOption } from '@repo/ui';
import * as styles from './drawer.demo.css';

// Drawer Controls Context
interface DrawerControlsContextType {
  placement: 'left' | 'right' | 'top' | 'bottom';
  setPlacement: (placement: 'left' | 'right' | 'top' | 'bottom') => void;
  width: number | string;
  setWidth: (width: number | string) => void;
  closable: boolean;
  setClosable: (closable: boolean) => void;
  maskClosable: boolean;
  setMaskClosable: (maskClosable: boolean) => void;
  injectStyles: boolean;
  setInjectStyles: (inject: boolean) => void;
}

const DrawerControlsContext = createContext<DrawerControlsContextType | null>(
  null,
);

// Provider
export function DemoDrawerBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [placement, setPlacement] = useState<
    'left' | 'right' | 'top' | 'bottom'
  >('right');
  const [width, setWidth] = useState<number | string>(378);
  const [closable, setClosable] = useState(true);
  const [maskClosable, setMaskClosable] = useState(true);
  const [injectStyles, setInjectStyles] = useState(true);

  return (
    <DrawerControlsContext.Provider
      value={{
        placement,
        setPlacement,
        width,
        setWidth,
        closable,
        setClosable,
        maskClosable,
        setMaskClosable,
        injectStyles,
        setInjectStyles,
      }}
    >
      {children}
    </DrawerControlsContext.Provider>
  );
}

// 기본 Drawer (컨트롤러와 함께 사용될 컴포넌트)
export function DemoDrawerBasicWithControls() {
  const context = useContext(DrawerControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { placement, width, closable, maskClosable, injectStyles } = context;
  const [open, setOpen] = useState(false);

  return (
    <div
      className={!injectStyles ? styles.drawerWrapperClass : ''}
      style={{ padding: '2rem', textAlign: 'center' }}
    >
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="Basic Drawer"
        placement={placement}
        width={width}
        closable={closable}
        maskClosable={maskClosable}
        injectStyles={injectStyles}
      >
        <div style={{ padding: '1rem' }}>
          <p>This is a basic drawer component.</p>
          <p>Click outside or press ESC to close.</p>
        </div>
      </Drawer>
    </div>
  );
}

// Drawer Controls
export function DemoDrawerBasicControls() {
  const context = useContext(DrawerControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    placement,
    setPlacement,
    width,
    setWidth,
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
          label: '위치 (Placement)',
          control: (
            <Select
              options={[
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
                { label: 'Top', value: 'top' },
                { label: 'Bottom', value: 'bottom' },
              ]}
              value={placement}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setPlacement(val as typeof placement);
                }
              }}
              placeholder="위치 선택"
              size="small"
            />
          ),
        },
        {
          label: '너비/높이 (Width/Height)',
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
              placeholder="378 또는 50%"
              size="small"
            />
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

// Export individual demo components for MDX
export function DemoDrawerBasic() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer open={open} onOpenChange={setOpen} title="Basic Drawer">
        <div style={{ padding: '1rem' }}>
          <p>This is a basic drawer component.</p>
          <p>Click outside or press ESC to close.</p>
        </div>
      </Drawer>
    </div>
  );
}

export function DemoDrawerPlacement() {
  const [placement, setPlacement] = useState<
    'left' | 'right' | 'top' | 'bottom'
  >('right');
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      <div
        style={{
          marginBottom: '1rem',
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
        }}
      >
        <Button
          onClick={() => {
            setPlacement('left');
            setOpen(true);
          }}
        >
          Left
        </Button>
        <Button
          onClick={() => {
            setPlacement('right');
            setOpen(true);
          }}
        >
          Right
        </Button>
        <Button
          onClick={() => {
            setPlacement('top');
            setOpen(true);
          }}
        >
          Top
        </Button>
        <Button
          onClick={() => {
            setPlacement('bottom');
            setOpen(true);
          }}
        >
          Bottom
        </Button>
      </div>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        placement={placement}
        title={`Drawer from ${placement}`}
      >
        <div style={{ padding: '1rem' }}>
          <p>This drawer appears from the {placement} side.</p>
        </div>
      </Drawer>
    </div>
  );
}

export function DemoDrawerWithFooter() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Button onClick={() => setOpen(true)}>Open Drawer with Footer</Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="Drawer with Footer"
        footer={
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '0.5rem',
            }}
          >
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </div>
        }
      >
        <div style={{ padding: '1rem' }}>
          <p>This drawer has a footer with action buttons.</p>
        </div>
      </Drawer>
    </div>
  );
}

export function DemoDrawerWithExtra() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Button onClick={() => setOpen(true)}>Open Drawer with Extra</Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="Drawer with Extra Actions"
        extra={
          <Button onClick={() => alert('Extra action clicked!')}>
            Extra Action
          </Button>
        }
      >
        <div style={{ padding: '1rem' }}>
          <p>This drawer has extra actions in the header.</p>
        </div>
      </Drawer>
    </div>
  );
}

export function DemoDrawerCustomSize() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Button onClick={() => setOpen(true)}>Open Wide Drawer</Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="Custom Size Drawer"
        width={600}
      >
        <div style={{ padding: '1rem' }}>
          <p>This drawer has a custom width of 600px.</p>
        </div>
      </Drawer>
    </div>
  );
}

export function DemoDrawerNoMaskClose() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Button onClick={() => setOpen(true)}>Open Drawer (No Mask Close)</Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="Drawer without Mask Close"
        maskClosable={false}
      >
        <div style={{ padding: '1rem' }}>
          <p>This drawer cannot be closed by clicking the mask.</p>
          <p>You can only close it using the close button or ESC key.</p>
        </div>
      </Drawer>
    </div>
  );
}

export function DemoDrawerNoClosable() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Button onClick={() => setOpen(true)}>
        Open Drawer (No Close Button)
      </Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="Drawer without Close Button"
        closable={false}
      >
        <div style={{ padding: '1rem' }}>
          <p>This drawer has no close button in the header.</p>
          <p>You can close it by clicking the mask or pressing ESC.</p>
          <Button onClick={() => setOpen(false)} style={{ marginTop: '1rem' }}>
            Close Drawer
          </Button>
        </div>
      </Drawer>
    </div>
  );
}

export function drawerDemo() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h2>Drawer 컴포넌트 데모</h2>

      <div style={{ marginBottom: '2rem' }}>
        <h3>기본 사용법</h3>
        <DemoDrawerBasic />
      </div>
    </div>
  );
}
